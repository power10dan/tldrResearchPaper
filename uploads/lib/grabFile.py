from django.http import FileResponse
from rest_framework.response import Response
from rest_framework import status
from operator import add
from functools import reduce

import glob
import os
import tarfile


def grabFileToReq(request, out_name, fdir_one=[], fdir_two=[]):
    """
    Given a request that specifies a filename in the body, and a directory this
    function finds the file in the filesystem, encodes it to base64, and then
    sends a response holding the xml file
    """

    def getFiles(directory, file_names=[]):
        matched_files = [None]

        if file_names:
            # Then we have one or more files

            if fdir_one:
                # for each file, make the path by joining the directory
                file_paths = map(lambda file_name:
                                 os.path.join(fdir_one, file_name), file_names)

                # glob finds all pathnames that match a certain pattern,
                # we just match on the absolute filename with extension, glob
                # returns a list, but I'm only returning first match
                matched_files = map(lambda path:
                                    glob.glob(path + ".*")[0] if
                                    glob.glob(path) else None,
                                    file_paths)

        return [] if list(matched_files)[0] is None else matched_files

    # vars
    response = Response(status=status.HTTP_400_BAD_REQUEST)
    fail_str = "Files not found"
    files = []

    # get filename from request, if not there None is returned
    file_names = request.GET.getlist("file_names")
    matched_files = getFiles(fdir_one, file_names)
    matched_summaries = getFiles(fdir_two, file_names)

    # this incurs another pass of the lists, which could be done in the closure
    # defined above, that would reduce the closures generality though
    if not matched_summaries and matched_files:
        files = matched_files

    if matched_summaries and not matched_files:
        files = matched_summaries

    if matched_summaries and matched_files:
        files = zip(matched_files, matched_summaries)

    # if matched then open the file, encode in base64, and serve
    if files:

        # bundle all the files to tar.bz2 file
        with tarfile.open(out_name, "w:bz2") as tar:

            for (xml_file, summary_file) in files:
                tar.add(xml_file, os.path.basename(xml_file))
                tar.add(summary_file, os.path.basename(summary_file))

            # set the response with an encoded the file
            response = FileResponse(tar)

            # set response fields
            # content disposition tells the browser to treat the response
            # as a file attachment
            response['Content-Disposition'] = "attachment; filename=%s" % tar
            response['status_code'] = status.HTTP_200_OK

    else:
        # files weren't found
        response.reason_phrase = fail_str

    # else we return a bad request
    return response
