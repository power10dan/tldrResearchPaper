from rest_framework.response import Response
from rest_framework import status
import xml.etree.ElementTree as ET

import glob
import os
import json
from bs4 import BeautifulSoup
import re


def grabFileToReq(request, out_name, fdir_one=[], fdir_two=[]):
    """
    Given a request that specifies a filename in the body, and a directory this
    function finds the file in the filesystem, encodes it to base64, and then
    sends a response holding the xml file
    """

    def getFiles(directory, file_names=[]):
        matched_files = []

        if file_names:
            # Then we have one or more files
             # for each file, make the path by joining the directory
            file_paths = map(lambda file_name:
                             os.path.join(directory, file_name), file_names)

            # glob finds all pathnames that match a certain pattern,
            # we just match on the absolute filename with extension, glob
            # returns a list, but I'm only returning first match
            for path in file_paths:
                matches = glob.glob(path + ".*")
                if matches:
                    matched_files.append(matches[0])

        return matched_files

    # shorten the texts to about 15 words summary
    def shortenText(textArr):
        wordList = re.sub("[^\w]", " ",  textArr).split()
        newShorten = []
        count = 0
        for text in wordList:
            if(count < 25):
                newShorten.append(text)
            count = count + 1
        return " ".join(newShorten) + "..."

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
        files = map(lambda f: (f, None), matched_files)

    if matched_summaries and not matched_files:
        files = map(lambda f: (f, None), matched_summaries)

    if matched_summaries and matched_files:
        files = zip(matched_files, matched_summaries)

    # if matched then open the file, encode in base64, and serve
    if files:

        # bundle all the files to tar.bz2 file
        retData = {'Files': []}
        for i, (xml_file, summary_file) in enumerate(files):
            author = []
            title = []
            summary = []

            if xml_file:
                with open(xml_file, 'r') as x:
                    soup = BeautifulSoup(x, 'xml')
                    author = soup.find_all('persName')
                    title = soup.find_all('title')
                    retXML = json.dumps(x.read())

            if summary_file:
                with open(summary_file, 'r') as s:
                    soup = BeautifulSoup(s, 'xml')
                    summary = soup.find_all(re.compile("(INTRODUCTION)",
                                                       flags=re.IGNORECASE))
                    retSum = json.dumps(s.read())

            if summary:
                ret_summary = shortenText(summary[0].get_text())

            else:
                ret_summary = "Needs a summary written!"

            if author:
                ret_author = author[0].get_text()
            else:
                ret_author = "Author was not parsed correctly!"

            if title:
                ret_title = title[0].get_text()
            else:
                ret_title = "title not parsed correctly!"

            retData['Files'].append(
                {os.path.basename("FILES"): {
                    'fileName': file_names[i],
                    'title': json.dumps(ret_title),
                    'author': json.dumps(ret_author),
                    'Intro_summary': json.dumps(ret_summary),
                    'files': [{'xml_file': xml_file},
                              {'summary_file': summary_file}]
                    }})

            response = Response(retData, status.HTTP_200_OK)

    else:
        # files weren't found
        response.reason_phrase = fail_str

    # else we return a bad request
    return response
