from django.db import models

# Create your models here.
class ResearchPaperUpload(models.Model):
	Created = models.DateTimeField(auto_now_add=True)
	Owner = models.CharField(max_length=100, blank=True, default='')
	title=models.CharField(max_length=250)
	abstract = models.CharField(max_length=255)
	DataFile = models.FileField("PDFFolder/")

	class Meta:
		ordering= ('Created', 'Owner', 'DataFile', 'title', 'abstract')

