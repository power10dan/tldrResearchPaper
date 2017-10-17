package org.grobidExample;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import py4j.GatewayServer;

import org.junit.Test;
import java.io.*;

/**
 *  @author Daniel Lin
 */
public class TestMyGrobid {

	private String testPath = null;

	@Test
	public void testPDFXML() throws Exception{
		String pdfGroup = "/home/daniel/Desktop/tldr/InputTests";
		String pdfOutput = "/home/daniel/Desktop/tldr/OutputXMLs";
		boolean conHead = false;
		boolean conCite = false;
		PDFXML pdfXML = new PDFXML();
		int finish = pdfXML.PDFXMLConverter(pdfGroup, pdfOutput, conHead, conCite);
		assert(finish != 1);
		pdfXML.close();

	}


	/*@Test
	public void testHeaderBibTeX() throws Exception {
		String pdfPath = "./src/test/resources/Wang_paperAVE2008.pdf";
		ExampleBibTex example = new ExampleBibTex();
		String result = example.runGrobid(new File(pdfPath), "header", false);
		assertNotNull(result);
		
		System.out.println(result);
		example.close();
	}
	
	@Test
	public void testCitationBibTeX() throws Exception {
		String pdfPath = "./src/test/resources/Wang_paperAVE2008.pdf";
		ExampleBibTex example = new ExampleBibTex();
		String result = example.runGrobid(new File(pdfPath), "citation", false);
		assertNotNull(result);
		
		System.out.println(result);
		example.close();
	}	*/
}