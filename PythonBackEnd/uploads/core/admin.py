from django.contrib import admin
from .models import Document

# Register your models here.

# This is only for "viewing " on admin page
admin.site.register(Document)
