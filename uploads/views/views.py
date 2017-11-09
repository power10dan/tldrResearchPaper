from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from uploads.models.models import Document
from uploads.permissions.permissions import isAdminOrReadOnly
from uploads.serializers.serializers import UserSerializer
from uploads.lib.summarize import summarize

from django.contrib import messages
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.core import serializers

from wsgiref.util import FileWrapper
from py4j.java_gateway import JavaGateway 

import os
import json
import base64

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
    def post(self, request):
        file_name = request.POST["file_name"]
        section = request.POST["section"]
        summary_text = request.POST["summary_text"]

        file_root = settings.SUMMARY_DOCS + '/' + file_name

        return

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
            fileopened.write(fileUploaded)
            #fileopened.write(base64.decodestring(newString[1]))
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
        if status == 0:
            summarize(outputDir+fileName[:-4]+'.fulltext.tei.xml',fileName[:-4],[])
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
