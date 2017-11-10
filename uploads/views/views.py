from django.conf import settings

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from uploads.permissions.permissions import isAdminOrReadOnly
from uploads.serializers.serializers import UserSerializer
from uploads.lib.summarize import summarize

from django.http import HttpResponse
from django.http import FileResponse

from py4j.java_gateway import JavaGateway 
from uploads.lib.grabFile import grabFileToReq

import os
import json
import base64
import glob
import xml.etree.ElementTree as ET


class SummaryOutputView(APIView):
    """
    Given a request that specifies a filename in the body, this view finds the
    summary file in the filesystem, encodes it to base64, and then sends a
    response holding the xml file
    """
    def get(self, request):
        return grabFileToReq(request, settings.SUMMARY_DOCS)


class SummaryInputView(APIView):
    """
    Given a request that holds, in its body, the file name, the section and the
    user's new summary, this view goes and finds that file and replaces the
    files autogenerated summary with the user defined summary
    """
    def post(self, request):

        # vars
        response = Response(status=status.HTTP_400_BAD_REQUEST)
        matched_files = []

        print(type(request.data), request.data)
        file_name = request.data.get('file_name')
        section = request.data.get('section')
        summary_text = request.data.get('summary_text')

        # if request was well formed get the file from the file system
        if file_name and section and summary_text:
            path = settings.SUMMARY_DOCS + file_name
            matched_files = glob.glob(path)

        if matched_files:
            server_file = matched_files[0]  # get first match

            # parse the xml
            tree = ET.parse(server_file)
            root = tree.getroot()

            for child in root:
                print(child.tag, child.attrib)

        return response


class getXMLFile(APIView):
    """
    Given a valid request that specifies a filename in the body, this view
    finds the xml file in the filesystem, encodes it to base64, and then sends
    a response holding the xml file
    """

    def get(self, request):
        return grabFileToReq(request, settings.XML_DOCS)

class getPDFFile(APIView)
    """
    Given a valid request that specifies a filename in the body, this view
    finds the pdf file in the filesystem, encodes it to base64, and then sends
    a response holding the pdf file
    """

    def get(self, request):
        return grabFileToReq(request, settings.MEDIA_DOCS)

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
        if status == 7:
            summarize(outputDir+filename[:-4]+'.fulltext.tei.xml',filename[:-4],[])
        return Response(status=204)

class GetAllFiles(APIView):
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
