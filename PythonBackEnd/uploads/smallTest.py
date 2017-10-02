import requests
from django.core.files import File 

myFile = open("/Users/daniellin/Desktop/VerbTenseGuideLine.pdf", "rb")
fileUp = File(myFile)
freeFiles = {'file': fileUp}
url = "http://127.0.0.1:8000/api/uploadFile/testpdf.pdf"
r = requests.post(url, files=freeFiles)
print(r)
myFile.close()
fileUp.close()