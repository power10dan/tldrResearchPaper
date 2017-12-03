import glob
from zipfile import ZipFile
import uuid
from io import BytesIO
from django.conf import settings
import os
import shutil


def zipFiles(root_dir="", files=[]):

    # zip directory and zip filename
    zip_path = ""

    # if both arguments are given
    if files and root_dir:

        zip_name = settings.TMP_DOCS + 'zip_file'
        directory_name = root_dir

        # Create 'path\to\zip_file.zip'
        zip_path = shutil.make_archive(zip_name, 'zip', directory_name)

    return (zip_path)
