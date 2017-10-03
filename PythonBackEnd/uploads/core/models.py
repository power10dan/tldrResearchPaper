from __future__ import unicode_literals
from django.core.files.storage import FileSystemStorage


#fs = FileSystemStorage(location='/media/documents')

from django.db import models


class Document(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='%Y/%m/%d')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=255, blank=True)

class User(models.Model):
    """
    User Model
    Defines attributes of a user
    """

    # These are field for the model. Each field will map to a DB column
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # a simple method, not sure if we need getters or setters yet
    def get_name(self):
        return self.name
