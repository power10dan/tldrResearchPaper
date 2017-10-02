from django.test import TestCase
from django.core.files import File 

import requests
import json 
# TODO: Still working on this 
class APITest(TestCase):
	def setup(self):
		myFile = open("/Users/daniellin/Desktop/VerbTenseGuideLine.pdf", "rb")
		self.fileUp = File(myFile)
		self.freeFiles = {'file': fileUp}
		self.urlGet = "http://127.0.0.1:8000/api/getAllFiles/"
		self.urlPost="http://127.0.0.1:8000/api/uploadFile/terb.pdf"
		self.urlDel = "http://127.0.0.1:8000/api/deleteFile/test2.pdf"
		myFile.close()
	def makePost(self):
		r = requests.post(self.urlPost, files=self.freeFiles)
		self.fileUp.close()

	def makeGet(self):
		r = requests.get(self.urlGet)


	def makeDel(self):
		r = requests.delete(self.urlDel)


#print(json.loads(r.text))
#print(rDel)
#print(json.loads(r.text))
#print(r.fileData)


#myFile.close()
#fileUp.close()
# Create your tests here.

