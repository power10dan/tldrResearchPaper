import os
from uploads.models.models import SectionSummary
from django.conf import settings

from rest_framework.response import Response
from rest_framework import status
import json
import glob

def cleanUp():
    file_root = settings.MEDIA_DOCS

    ## Get the names of PDF's in file system.
    dir_filenames = [file_name for file_name in os.listdir(file_root) if file_name != ".DS_Store"]

    if (dir_filenames == []):
        SectionSummary.objects.all().delete()

        xml_files = glob.glob(settings.XML_DOCS + '*')
        for xml in xml_files:
            os.remove(xml)

        sum_file = glob.glob(settings.SUMMARY_DOCS + '*')
        for summary in sum_file:
            os.remove(summary)
    else:
        ## Get the summary objects from DB.
        db_objects = SectionSummary.objects.all()

        ## For all summaries in the database objects
        for summary in db_objects:
            ## Get the filename associated with the summary.
            sum_file = summary.filename + '.pdf'
            ## If the file does not exist, delete the summary.
            if (sum_file not in dir_filenames):
                summary.delete()
                cleanUpFile(sum_file)

        ## Create a list of filenames associated with summaries
        ## in the database.
        db_sum_list = []

        for summary in db_objects:
            sum_file = summary.filename + '.pdf'
            db_sum_list.append(sum_file)

        ## This is a list of filenames in the database, without
        ## duplicates.
        sum_filenames = list(set(db_sum_list))

        ## Delete a PDF that does not have summaries associated with it.
        for pdf in dir_filenames:
            if pdf not in sum_filenames:
                cleanUpFile(pdf)


def cleanUpFile(file_name):
    if file_name:
        ## Removes the PDF file from the documents folder.
        pdf_path = settings.MEDIA_DOCS + file_name
        if (os.path.isfile(pdf_path)):
            os.remove(pdf_path)


        ## Removes any XML files associated with the PDF.
        xml_file = file_name[:-4] + '.fulltext.tei.xml'
        xml_path = settings.XML_DOCS + xml_file
        if(os.path.isfile(xml_path)):
            os.remove(xml_path)


        ## Removes any summary files associated with the PDF.
        sum_file = file_name[:-4] + '.xml'
        sum_path = settings.SUMMARY_DOCS + sum_file
        if(os.path.isfile(sum_path)):
            os.remove(sum_path)