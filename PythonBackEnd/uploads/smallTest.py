import requests
import json 
from django.core.files import File 

myFile = open("/Users/Mihai Dan/Desktop/second.pdf", "rb")
fileUp = File(myFile)
freeFiles = {'file': fileUp}
url = "http://127.0.0.1:8000/api/getAllFiles/"
urlPost="http://127.0.0.1:8000/api/uploadFile/test.pdf"
urlDel = "http://127.0.0.1:8000/api/deleteFile/test.pdf"
r = requests.post(urlPost, files=freeFiles)
r = requests.post(urlPost, files=freeFiles)
r = requests.get(url)
rDel = requests.delete(urlDel)
#print(json.loads(r.text))
print(rDel.text)
#print(json.loads(r.text))
#print(r.fileData)


myFile.close()
fileUp.close()