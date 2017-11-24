import glob
from zipfile import ZipFile
import uuid
from io import BytesIO
from django.conf import settings
import os


def zipFiles(root_dir="", files=[]):

    # zip directory and zip filename
    zip_path = ""

    # if both arguments are given
    if files and root_dir:

        # for each file, open it to memory and write to zip file
        for f in files:

            # match on the file name, glob returns a list of matches
            fpath = root_dir + f
            matches = glob.glob(fpath + ".*")
            print(matches)

            # if we have files matched in the directory then add them to the
            # zip file
            if matches:
                zip_path = settings.TMP_DOCS + str(uuid.uuid4()) + '.zip'

                with ZipFile(zip_path, 'w') as z:
                    z.write(matches[0])

    return (zip_path)
