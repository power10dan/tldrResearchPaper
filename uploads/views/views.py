from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from uploads.models.models import Document
from uploads.permissions.permissions import isAdminOrReadOnly
from uploads.serializers.serializers import UserSerializer

from django.contrib import messages
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.core import serializers

from wsgiref.util import FileWrapper

import os
import json
import base64

#RESTful API view for Django
class FileUploadView(APIView):
    parser_classes=(MultiPartParser,)
    # gets the uploaded file and saves it in "media/documents" folder. TODO: Parse to PDF, and outsource this to Amazon or
    # some file storage solution
    def post(self, request, filename, format=None):
        fileUploaded = request.body
        newString = fileUploaded.split(",")
        path = settings.MEDIA_DOCS + filename
        permission_classes = (isAdminOrReadOnly, )
        with open(path, 'wb') as fileopened:
            fileopened.write(base64.decodestring(newString[1]))
        fileopened.close()
        return Response(status=204)

class GetAllFiles(APIView):
    def get(self, request):
        fileRoot = settings.MEDIA_DOCS
        fileNames = [fileRoot + fileName for
                     fileName in
                     os.listdir(fileRoot) if fileName != ".DS_Store"]
        # get the link to the PDF instead of transfering YUGE PDFs
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
    """
    Create a user
    """

    def post(self, request, format="json"):
        serializer = UserSerializer(data=request.data)

        # if serializer succeeds then save and change the response to success
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
