from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from xml.etree import ElementTree as ET


class GetXMLFileTest(APITestCase):
    def setUp(self):

        # create some mock xml
        self.test_xml = "<?xml version="1.0"?>
        <data>
        <country name="Liechtenstein">
        <rank>1</rank>
        <year>2008</year>
        <gdppc>141100</gdppc>
        <neighbor name="Austria" direction="E"/>
        <neighbor name="Switzerland" direction="W"/>
        </country>
        <country name="Singapore">
        <rank>4</rank>
        <year>2011</year>
        <gdppc>59900</gdppc>
        <neighbor name="Malaysia" direction="N"/>
        </country>
        <country name="Panama">
        <rank>68</rank>
        <year>2011</year>
        <gdppc>13600</gdppc>
        <neighbor name="Costa Rica" direction="W"/>
        <neighbor name="Colombia" direction="E"/>
        </country>
        </data>"

        self.file_path = setting.XML_DOCS + "test_xml_file.fulltext.tei.xml"
        self.create_url = reverse('api/getXMLFile')

        # save the xml file to xml media folder
        with open(self.file_path, "w") as f:
            f.write(ET.tostring(self.test_xml))
