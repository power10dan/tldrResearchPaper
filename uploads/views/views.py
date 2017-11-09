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
from wsgiref.util import FileWrapper

from py4j.java_gateway import JavaGateway 

import os
import json
import base64
import glob


class SummaryOutputView(APIView):
    def get(self, request):
        fileRoot = settings.SUMMARY_DOCS
        fileNames = [fileName for
                     fileName in
                     os.listdir(fileRoot) if fileName != ".DS_Store"]

        permission_classes = (isAdminOrReadOnly, )
        fileData = [{'File': filename } for filename in fileNames]
        response = HttpResponse(json.dumps(fileData), content_type="application/json")
        return response

class SummaryInputView(APIView):
    """
    Given a request that holds, in its body, the file name, the section and the
    user's new summary, this view goes and finds that file and replaces the
    files autogenerated summary with the user defined summary
    """
    def post(self, request):
        file_name = request.POST["file_name"]
        section = request.POST["section"]
        summary_text = request.POST["summary_text"]

        file_root = settings.SUMMARY_DOCS + '/' + file_name

        return


class getXMLFile(APIView):
    """
    Given a valid request that specifies a filename in the body, this view
    finds the xml file in the filesystem, encodes it to base64, and then sends
    a response holding the xml file
    """

    def get(self, request):
        # set the permission class
        permission_classes = (isAdminOrReadOnly, )

        # vars
        matched_files = []
        # resp_status = status.HTTP_400_BAD_REQUEST
        response = Response(status=status.HTTP_400_BAD_REQUEST)

        # get filename from request, if not there None is returned
        file_name = request.GET.get("file_name")

        if file_name:
            path = os.path.join(settings.XML_DOCS, file_name)

            # glob finds all pathnames that match a certain pattern, here we
            # just match on only files that grobid will spit out. glob returns
            # a list
            matched_files = glob.glob(path + ".*.tei.xml")

        # if matched then open the file, encode in base64, and serve
        if matched_files:
                # set the response with an encoded the file
                response = FileResponse(base64.encodestring(
                    open(matched_files[0], 'rb').read()))

                # set response fields
                response['Content-Disposition'] = "attachment: filename=%s" \
                                                  % file_name
                response['status_code'] = status.HTTP_200_OK
        else:
            # file wasn't found
            response.write("File can't be found")

        # else we return a bad request
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
