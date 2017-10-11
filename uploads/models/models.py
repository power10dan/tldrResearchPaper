from __future__ import unicode_literals
from django.core.files.storage import FileSystemStorage

#fs = FileSystemStorage(location='/media/documents')

from django.db import models

class Document(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='%Y/%m/%d')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=255, blank=True)
