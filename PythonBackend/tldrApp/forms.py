from django import forms
from tldrApp.models import ResearchPaperUpload
class DocumentForm(forms.ModelForm):
	class Meta:
		model = ResearchPaperUpload
		fields=('title', 'DataFile',)