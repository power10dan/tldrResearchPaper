from __future__ import unicode_literals
from django.core.files.storage import FileSystemStorage
#from django_mysql.models import ListCharField

#fs = FileSystemStorage(location='/media/documents')

from django.db import models

class SectionSummary(models.Model):
	filename = models.CharField(max_length=255)
	header = models.CharField(max_length=255)
	author = models.CharField(max_length=255)
	summary = models.TextField()
	votes = models.IntegerField()