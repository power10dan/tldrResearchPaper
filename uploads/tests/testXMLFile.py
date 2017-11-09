from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from xml.etree import ElementTree as ET
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
