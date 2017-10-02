from django.shortcuts import render
from tldrApp.models import ResearchPaperUpload
from tldrApp.serializer import AppSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.response import Response
from tldrApp.forms import DocumentForm


def home(request):
	templatePath = "/home/daniel/Desktop/tldr/AppBackEnd/Django/PythonBackend/tldrApp/Templates/home.html"
	return render(request, templatePath)

def post(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = DocumentForm()
    print("I am here")
    print(form.errors)
    return render(request, '/home/daniel/Desktop/tldr/AppBackEnd/Django/PythonBackend/tldrApp/Templates/uploadFile.html', {
        'form': form
})

def handleUploadFile(f):
	#get name of file
	name = request.FILES['file'].title
	fullPathName = "../PDFFolder/" + name
	# open the file
	with open(fullPathName, 'wb') as destination:
		for chunk in f.chunks():
			destination.write(chunk)
		# TODO: Parse the file into XML format, then out source this file to a file storage service (We use DropBox)
		