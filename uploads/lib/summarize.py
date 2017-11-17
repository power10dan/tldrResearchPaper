import xmltodict
import dicttoxml
import numpy

from django.conf import settings
from collections import OrderedDict
from uploads.models.models import SectionSummary

from sumy.parsers.plaintext import PlaintextParser #We're choosing a plaintext parser here, other parsers available for HTML etc.
from sumy.nlp.tokenizers import Tokenizer 
from sumy.summarizers.lex_rank import LexRankSummarizer #We're choosing Lexrank, other algorithms are also built in

def summarize(document, file_name):
    summary_dict = {}
    with open(document) as fd:
        doc = xmltodict.parse(fd.read())
        num_sections = len(doc['TEI']['text']['body']['div'])
        sections = doc['TEI']['text']['body']['div']
        for heading in range(num_sections):
            current_heading = sections[heading]['head']
            if(type(current_heading) == OrderedDict):
                current_heading = current_heading['#text']
            text = ""
            if 'p' in sections[heading]:
                for i in sections[heading]['p']:
                    if(type(i) == OrderedDict):
                        text += (i['#text'] + " ")
                    else:
                        text += (i + " ")
                if text.count('.') > 10:
                    plain_text = text.encode('ascii','ignore')
                    parser = PlaintextParser.from_string(plain_text, Tokenizer("english"))
                    summarizer = LexRankSummarizer()
                    summary = summarizer(parser.document, 5)
                    sum_summary = ""
                    for sentence in summary:
                        sum_summary += str(sentence) + " "
                    summary_dict[current_heading] = sum_summary
                    create_DB_summary(file_name, current_heading, sum_summary)
                else:
                    summary_dict[current_heading] = "SECTION TOO SHORT TO SUMMARIZE!"
                    create_DB_summary(file_name, current_heading, "SECTION TOO SHORT TO SUMMARIZE!")
    summary_xml = dicttoxml.dicttoxml(summary_dict)
    out_file = open(settings.SUMMARY_DOCS+file_name+".xml", "wb")
    out_file.write(summary_xml)
    out_file.close()

# Add an auto generated summary to the DB
def create_DB_summary(input_file, current_header, current_summary):
    autoSummary = SectionSummary(filename=input_file, header=current_header,
                                 author="AUTO SUMMARIZER", summary=current_summary, votes=1)
    autoSummary.save()

# Unused for now            
def parse_headings(headings_file):
    with open(headings_file) as headers:
        for line in headers:
            line_split = line.split(';;')
            return line_split

