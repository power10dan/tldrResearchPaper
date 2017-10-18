package org.grobidExample;

import org.grobid.core.utilities.GrobidPropertyKeys;
import org.grobid.core.data.BiblioItem;
import org.grobid.core.data.BibDataSet;
import org.grobid.core.engines.Engine;
import org.grobid.core.factory.GrobidFactory;
import org.grobid.core.mock.MockContext;
import org.grobid.core.utilities.GrobidProperties;

import java.util.*;
import java.io.*;

import org.apache.commons.io.FileUtils;
import py4j.GatewayServer;

/**
 * Class that contains method to convert PDF to XML in batch. 
 * 
 * @author Daniel Lin
 *
 */
public class PDFXML {
	private static Engine engine = null;

	public PDFXML() {
		try {
			// context variable are read from the project property file grobid-example.properties
			Properties prop = new Properties();
			prop.load(new FileInputStream("system.properties"));
			String pGrobidHome = prop.getProperty("system.pGrobidHome");
			String pGrobidProperties = prop.getProperty("system.pGrobidProperties");
			MockContext.setInitialContext(pGrobidHome, pGrobidProperties);		
			GrobidProperties.getInstance();

			engine = GrobidFactory.getInstance().createEngine();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public int PDFXMLConverter(String input, String output, boolean consolidateHead, boolean consolidateCite) {
		return engine.batchProcessFulltext(input, output, consolidateHead, consolidateCite);

	}

	public void close() {
		try {
			MockContext.destroyInitialContext();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String args[]){
      PDFXML pdf = new PDFXML();
	}


	
}
