from django.conf import settings

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from uploads.models.models import SectionSummary
from uploads.permissions.permissions import isAdminOrReadOnly
from uploads.serializers.serializers import UserSerializer
from uploads.lib.summarize import summarize, create_DB_summary

from django.core import serializers
from django.http import HttpResponse
from django.http import HttpRequest
from django.http import FileResponse
from django.http.request import QueryDict, MultiValueDict

from py4j.java_gateway import JavaGateway
from uploads.lib.grabFile import grabFileToReq

import os
import json
import re
import base64
import glob
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup


class SummaryOutputView(APIView):
    """
    Given a request that specifies a filename in the body, this view finds the
    summary file in the filesystem, encodes it to base64, and then sends a
    response holding the xml file
    """
    def post(self, request):
        permission_classes = (isAdminOrReadOnly, )
        root_dir = settings.SUMMARY_DOCS
        response = Response(status=status.HTTP_400_BAD_REQUEST)
        fail_str = "File not found!"

        filename = request.POST.get("file_name")

        if filename:
            all_summary = SectionSummary.objects.filter(filename=filename)
            qs_json = serializers.serialize('json', all_summary)
            response = HttpResponse(qs_json, content_type='application/json')

        if not filename:
            response.reason_phrase = fail_str

        return response



class SummaryInputView(APIView):
    """
    Given a request that holds, in its body, the file name, the section and the
    user's new summary, this view goes and finds that file and replaces the
    files autogenerated summary with the user defined summary
    """
    def post(self, request):

        # vars
        permission_classes = (isAdminOrReadOnly, )
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        # default python 3.X behavior: request body is a byte string

        # request.data is a dict in the response, the .get method returns none
        # if the fields are not in dict
        file_name = request.POST.get('file_name')
        section = request.POST.get('section')
        summary_text = request.POST.get('summary_text')
        username = request.POST.get('author')

        # if request was well formed get the file from the file system
        if file_name and section and summary_text and username:
            create_DB_summary(file_name, section, summary_text, username)
            response = Response(status=status.HTTP_200_OK)

        return response


class getXMLFile(APIView):
    """
    Given a valid request that specifies a filename in the body, this view
    finds the xml file in the filesystem, encodes it to base64, and then sends
    a response holding the xml file
    """

    def get(self, request):
        permission_classes = (isAdminOrReadOnly, )
        return grabFileToReq(request, "xmlFiles.tar.bz2", settings.XML_DOCS)

class getPDFFile(APIView):
    """
    Given a valid request that specifies a filename in the body, this view
    finds the pdf file in the filesystem, encodes it to base64, and then sends
    a response holding the pdf file
    """

    def get(self, request):
        permission_classes = (isAdminOrReadOnly, )
        return grabFileToReq(request, "pdf_files.tar.bz2", settings.MEDIA_DOCS)


class getXMLAndSums(APIView):
    def get(self, request):

        permission_classes = (isAdminOrReadOnly, )
        num_files = None
        num_files = request.GET.get('num_files')
        file_names = request.GET.getlist("file_names")
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        if file_names:
            response = grabFileToReq(request,
                                     "xml_and_summaries.tar.bz2",
                                     settings.XML_DOCS,
                                     settings.SUMMARY_DOCS)

        if num_files:
            data = {'file_names': []}

            cntr = 0
            for f in os.listdir(settings.XML_DOCS):
                if(f == ".DS_Store"):
                    continue
                #if f.name[0] != ".DS_Store":
                data['file_names'].append(f[:-17]) #remove grobid gen'd stuff
                cntr += 1

                if cntr >= int(num_files):
                    break

            newRequest = HttpRequest()
            newRequest.method = 'GET'
            qdict = QueryDict('', mutable=True)
            qdict.update(MultiValueDict(data))
            newRequest.GET = qdict.copy()
            response = grabFileToReq(
                newRequest,
                "",
                settings.XML_DOCS,
                settings.SUMMARY_DOCS)

        return response



#RESTful API view for Django
class FileUploadView(APIView):
    parser_classes=(MultiPartParser,)
    
    def post(self, request, filename, format=None):
        fileUploaded = request.body
        # need to include b in front of comma due to the string being binary
        newString = fileUploaded.split(b',')
        path = settings.MEDIA_DOCS + filename
        permission_classes = (isAdminOrReadOnly, )
        with open(path, 'wb') as fileopened:
            fileopened.write(base64.decodestring(newString[1]))
        fileopened.close()

        # GROBID STUFF USING PY4J
        print("Grobid Working")
        inputDir = settings.MEDIA_DOCS
        outputDir = settings.XML_DOCS
        gateway = JavaGateway()
        grobidClass = gateway.entry_point
        consolidateHead = False
        consolidateCite = False
        status = grobidClass.PDFXMLConverter(inputDir, outputDir, consolidateHead, consolidateCite)
        print("Grobid Finished")
        summarize(outputDir+filename[:-4]+'.fulltext.tei.xml',filename[:-4])
        return Response(status=204)

class GetAllFileNames(APIView):
    def get(self, request):
        fileRoot = settings.MEDIA_DOCS
        fileNames = [fileRoot + fileName for
                     fileName in
                     os.listdir(fileRoot) if fileName != ".DS_Store"]
        
        permission_classes = (isAdminOrReadOnly, )
        fileData = {"Files": [{'File': filename } for filename in fileNames]}
        response = HttpResponse(json.dumps(fileData), content_type="application/json")
        return response

class DeleteFile(APIView):
    def delete(self, request, filename, format=None):
        fileToBeDel = filename
        filePath = settings.MEDIA_DOCS + filename
        permission_classes = (isAdminOrReadOnly, )
        if(os.path.isfile(filePath)):
            os.remove(filePath)
            return Response(status=204)
        else:
            return Response("File can't be found", status=404)

class CreateUser(APIView):
    def post(self, request, format="json"):
        serializer = UserSerializer(data=request.data)

        # if serializer succeeds create user and save
        if serializer.is_valid():
            user = serializer.save()

            # if user is created
            if user:
                # create a new token for the user
                token = Token.objects.create(user=user)

                # handle token in response data
                resData = serializer.data # var to hold the response data
                resData['token'] = token.key # add new token to response data

                return Response(resData, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
