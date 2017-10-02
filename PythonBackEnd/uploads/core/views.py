from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response

from uploads.core.models import Document

from django.contrib import messages
from django.http import HttpResponse

from wsgiref.util import FileWrapper

import os
import json

#RESTful API view for Django 
class FileUploadView(APIView):
    parser_classes=(MultiPartParser,)
    # gets the uploaded file and saves it in "media/documents" folder. TODO: Parse to PDF, and outsource this to Amazon or 
    # some file storage solution
    def post(self, request, filename, format=None):
        # request.FILES['file'] contains the file that is uploaded
        fileUploaded = request.FILES['file']
        #TODO: Change this to project base dir and not coupled with my machine
        path = "/Users/daniellin/Desktop/tldrApp/tldrResearchPaper/PythonBackEnd/media/documents/"+filename
        with open(path, 'w') as fileToSave:
            for chunk in fileUploaded.read():
                fileToSave.write(chunk)
        fileToSave.close()
        print("file upload")
        return Response(status=204)

class GetAllFiles(APIView):
    def get(self, request):
        fileRoot = "/Users/daniellin/Desktop/tldrApp/tldrResearchPaper/PythonBackEnd/media/documents/"
        fileNames = [fileRoot+ fileName for fileName in os.listdir(fileRoot) if fileName != ".DS_Store"]
        # get the link to the PDF instead of transfering YUGE PDFs
        fileData = {"Files": [{'File': filename } for filename in fileNames]}
        response = HttpResponse(json.dumps(fileData), content_type="application/json")
        return response

class DeleteFile(APIView):
    def delete(self, request, filename, format=None):
        fileToBeDel = filename 
        filePath = "/Users/daniellin/Desktop/tldrApp/tldrResearchPaper/PythonBackEnd/media/documents/" + filename
        if(os.path.isfile(filePath)):
            os.remove(filePath)
            return Response(status=204)  
        else:
            return Response("File can't be found", status=404)      

