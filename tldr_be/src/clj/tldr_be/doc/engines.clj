(ns tldr-be.doc.engines)


(defn insert-xml-engine
  "Given required fields id, filename, and xml content, and a function. Use the
  supplied function to insert the xml in the database that the function
  specifies"
  [id filename xml_content f]
  (when (and id filename xml_content)
    (do ;; if we have all parameters, create an entry
      (f {:id id
          :filename filename
          :xml_content xml_content})
      "Your document successfully uploaded")))


(defn get-xml-engine
  "given the name of a file and a function that dictates a database. Use the
  supplied function to pull out the xml from the appropriate database table"
  [name f]
  (when name (f {:filename name})))


(defn pdf-to-xml-engine
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function
  to pull out a file from a database by filename, db_get, a function to insert
  into a database, db_put, and a function that connects to the restful pdf
  parser, check if the file has already been processed via db_f, if not then
  process it with pdf_parser_f"
  [filemap db_get db_put pdf_parser_f]
  (println "Trying: " filemap db_get db_put pdf_parser_f)
  (let [{id :id fname :filename fileblob :filestuff} filemap
        cached_xml (db_get fname)]
    (if cached_xml
      (:xml_content cached_xml)
      (let [{xml_file :body} (pdf_parser_f fileblob)]
        (db_put id fname xml_file)
        xml_file))))
