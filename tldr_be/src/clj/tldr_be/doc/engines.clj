(ns tldr-be.doc.engines
  (:require [clojure.java.io :as io]
            [clojure.xml :as xml]
            [tldr-be.db.core :refer [get-headers-id-by-title]]
            [tldr-be.utils.core :refer [collect
                                        get-sections
                                        make-sections
                                        string->xml]]))


(defn insert-xml-engine
  "Given required fields id, filename, and xml content, and a function. Use the
  supplied function to insert the xml in the database that the function
  specifies"
  [f & args]
  (when (not-empty args)
    (if (empty? (get-headers-id-by-title {:title (:title args)})) ;; if doc doesnt exist
      (f args)
      "Your document successfully uploaded")))


(defn get-xml-engine
  "given the name of a file and a function that dictates a database. Use the
  supplied function to pull out the xml from the appropriate database table"
  [title f]
  (when title (f {:title title})))


(defn pdf-to-xml-engine
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function
  to pull out a file from a database by filename, db_get, a function to insert
  into a database, db_put, and a function that connects to the restful pdf
  parser, check if the file has already been processed via db_f, if not then
  process it with pdf_parser_f"
  [filemap db_get db_put pdf_parser_f]
  (let [{id :id fname :filename fileblob :filestuff title :title} filemap
        cached_xml (db_get title)]
    (if cached_xml
      (:xml_content cached_xml) ;; if cached return
      (let [{xml_str :body} (pdf_parser_f fileblob) ;; if not the process
            result (->> xml_str
                       string->xml
                       get-sections
                       make-sections
                       (map collect)
                       second)]
        (db_put result) ;; add to cache
        xml_str)))) ;; and now return
