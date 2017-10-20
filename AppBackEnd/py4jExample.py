from py4j.java_gateway import JavaGateway 

def main():
	pdfGroup = "/home/daniel/Desktop/tldr/InputTests";
	pdfOutput = "/home/daniel/Desktop/tldr/OutputXMLs";
	conHead = false;
	conCite = false;
	gateway = JavaGateway()
	grobidParser = gateway.entry_point
	grobidParser.PDFXMLConverter(pdfGroup, pdfOutput, conHead,conCite)
	grobidParser.close()
