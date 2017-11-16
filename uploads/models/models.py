from __future__ import unicode_literals
from django.core.files.storage import FileSystemStorage
#from django_mysql.models import ListCharField

#fs = FileSystemStorage(location='/media/documents')

from django.db import models

class Document(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='%Y/%m/%d')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=255, blank=True)

class XMLSummary(models.Model):
	filename = models.CharField(max_length=255)
	header = models.CharField(max_length=255)
	author = models.CharField(max_length=255)
	summary = models.TextField()
	votes = models.IntegerField()