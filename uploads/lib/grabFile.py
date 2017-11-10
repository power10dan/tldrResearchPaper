from django.http import FileResponse
from rest_framework.response import Response
from rest_framework import status

import glob
import base64
import os


def grabFileToReq(request, directory):
    """
    Given a request that specifies a filename in the body, and a directory this
    function finds the file in the filesystem, encodes it to base64, and then
    sends a response holding the xml file
    """

    # vars
    matched_files = []
    response = Response(status=status.HTTP_400_BAD_REQUEST)
    fail_str = "File not found"

    # get filename from request, if not there None is returned
    file_name = request.GET.get("file_name")

    if file_name:

        path = os.path.join(directory, file_name)

        # glob finds all pathnames that match a certain pattern, here we
        # just match on only files that grobid will spit out. glob returns
        # a list. This is doing an exact match, glob can match regex though
        matched_files = glob.glob(path)

    # if matched then open the file, encode in base64, and serve
    if matched_files:
        # set the response with an encoded the file
        response = FileResponse(base64.encodestring(open(matched_files[0], 'rb').read()))
        # set response fields
        # content disposition tells the browser to treat the response
        # as a file attachment
        response['Content-Disposition'] = "attachment; filename=%s" % file_name
        response['status_code'] = status.HTTP_200_OK

    else:
        # file wasn't found
        response.reason_phrase = fail_str

    # else we return a bad request
    return response
