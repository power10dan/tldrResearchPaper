import xmltodict
from collections import OrderedDict
from sumy.parsers.plaintext import PlaintextParser #We're choosing a plaintext parser here, other parsers available for HTML etc.
from sumy.nlp.tokenizers import Tokenizer 
from sumy.summarizers.lex_rank import LexRankSummarizer #We're choosing Lexrank, other algorithms are also built in

def summarize(document, headings_file):
    all_headings = False
    if type(headings_file) == list:
        headings = headings_file
        all_headings = True
    else:
        headings = parse_headings(headings_file)
    with open(document) as fd:
        doc = xmltodict.parse(fd.read())
        num_sections = len(doc['TEI']['text']['body']['div'])
        sections = doc['TEI']['text']['body']['div']
        for heading in range(num_sections):
            current_heading = sections[heading]['head']
            if(type(current_heading) == OrderedDict):
                current_heading = current_heading['#text']
            if (current_heading in headings) or all_headings:
                text = ""
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
                    print("Summary for " + current_heading + ": " + sum_summary)
                else:
                    print("Summary for " + current_heading + ": SECTION TOO SHORT TO SUMMARIZE!")
def parse_headings(headings_file):
    with open(headings_file) as headers:
        for line in headers:
            line_split = line.split(';;')
            return line_split

