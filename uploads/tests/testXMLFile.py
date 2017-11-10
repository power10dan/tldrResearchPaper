from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from rest_framework import status
from django.conf import settings

from os import path


# create some mock xml
test_xml = """
<?xml version=\"1.0\"?>
<data>
<country name=\"Liechtenstein\">
<rank>1</rank>
<year>2008</year>
<gdppc>141100</gdppc>
<neighbor name=\"Austria\" direction=\"E\"/>
<neighbor name=\"Switzerland\" direction=\"W\"/>
</country>
<country name=\"Singapore\">
<rank>4</rank>
<year>2011</year>
<gdppc>59900</gdppc>
<neighbor name=\"Malaysia\" direction=\"N\"/>
</country>
<country name=\"Panama\">
<rank>68</rank>
<year>2011</year>
<gdppc>13600</gdppc>
<neighbor name=\"Costa Rica\" direction=\"W\"/>
<neighbor name=\"Colombia\" direction=\"E\"/>
</country>
</data>
"""


class XMLFileRESTfulTest(APITestCase):
    def setUp(self):
        self.test_xml = test_xml
        self.file_path = settings.XML_DOCS + "test_xml_file.fulltext.tei.xml"
        self.file_name = path.basename(self.file_path)
        self.create_url = reverse('getXMLFile')

        # save the xml file to xml media folder
        with open(self.file_path, "w") as f:
            f.write((self.test_xml))

    def test_no_token(self):
        """
        If request does not have auth token we get back a 401 Unauthorized
        """

        # GET properties for request
        data = {'file_name': self.file_name}

        # send request
        response = self.client.get(self.create_url, data, format='json')

        # now test that we actually get back an Unauthorized
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)


class XMLFileEncTest(APITestCase):
    def setUp(self):

        self.test_xml = test_xml
        self.file_path = settings.XML_DOCS + "test_xml_file.fulltext.tei.xml"
        self.file_name = path.basename(self.file_path)
        self.create_url = reverse('getXMLFile')
        self.client.force_login(User.objects.get_or_create(
            username="testuser")[0])

        # # save the xml file to xml media folder
        # with open(self.file_path, "w") as f:
        #     f.write((self.test_xml))

    def test_bad_request(self):
        """
        IF we are logged in, and send a bad request we receive a 400 in response
        """

        # GET properties for request
        data = {}

        # send request
        response = self.client.get(self.create_url, data, format='json')

        # now test that we actually get back an Unauthorized
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_file_not_found(self):
        """
        If we are logged in, and send a well formed request for a file that has
        has not been processed, we get a file not found error
        """

        data = {'file_name': 'thisfiledoesntexist'}

        response = self.client.get(self.create_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.reason_phrase, "File not found")

    def test_file_found(self):
        """
        If we are logged in, and send a well formed request we get back a
        request that the browser will treat as an attachment i.e. it has a 
        content-disposition field and the proper filename
        """

        data = {'file_name': self.file_name}

        response = self.client.get(self.create_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Disposition'],
                         "attachment; filename=" + self.file_name)
