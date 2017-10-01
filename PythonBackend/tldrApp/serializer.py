from rest_framework import serializers
from tldrApp.models import  ResearchPaperUpload
# Serializer for "GET"
class AppSerializer(serializers.ModelSerializer):
	class Meta:
		model = ResearchPaperUpload
		fields = ('Created', 'Owner', 'DataFile')
