from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response

from uploads.core.models import Document
from uploads.core.forms import DocumentForm

from django.contrib import messages

import os

#RESTful API view for Django 
class FileUploadView(APIView):
    parser_classes=(MultiPartParser,)
    # TODO: Have get, which shows all uploaded file and their links, and delete,
    # which deletes file on the server
    #@csrf_exempt
    def get(self, request):
        print("hello world")
        return Response(status=204)

    # gets the uploaded file and saves it in "media/documents" folder. TODO: Parse to PDF, and outsource this to Amazon or 
    # some file storage solution
    def post(self, request, filename, format=None):
        # request.FILES['file'] contains the file that needs to be 
        # uploaded 
        fileUploaded = request.FILES['file']
        #TODO: Change this to project base dir and not coupled with my machine
        path = "/Users/daniellin/Desktop/DjangoTest/PythonBackEnd/media/documents/"+filename
        #fPath = os.path.join(settings.MEDIA_ROOT, fileUploaded)
        #v#ar = filename.read()
        with open(path, 'w') as fileToSave:
            for chunk in fileUploaded.read():
                fileToSave.write(chunk)
        fileToSave.close()
        print("file upload")
        return Response(status=204)
