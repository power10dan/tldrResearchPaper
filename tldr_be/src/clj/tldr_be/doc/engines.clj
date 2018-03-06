(ns tldr-be.doc.engines
  (:require [clojure.java.io :as io]
            [clojure.xml :as xml]
            [tldr-be.db.core :refer [get-headers-id-by-title]]
            [tldr-be.utils.core :refer [collect
                                        get-sections
                                        make-sections
                                        not-nil-in?
                                        string->xml]]))


(defn pdf-to-xml-headers
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function
  to pull out a file from a database by filename, db_get, a function to insert
  into a database, db_put, and a function that connects to the restful pdf
  parser, check if the file title exists in the database, if it does then return
  the entry, if not then parse the pdf get a trusted title and then check the db
  again if cached then return, else make it "
  [filemap db_get db_put pdf_parser_f]
  (when filemap
    (do
      (if-let [c (db_get filemap)] ;; if given correct title in filemap
        c ;; cached return
        (let [{xml_str :body} (pdf_parser_f (:filestuff filemap)) ;; if not the process
              __result (->> xml_str
                            string->xml
                            get-sections
                            make-sections
                            (map collect)
                            second)
              _result (update-in __result [:title] first) ;; remove title from
              ;; if forname and surname do not exist create them, if they
              ;; do then save the values. Dummy values are required for neo4j
              result (merge {:forename ["dummy"]}
                            {:surname ["dummy"]}
                            _result filemap )]
          (if-let [cached (db_get result)] ;; then we've cached it else make it
            cached
            (when (not-nil-in? result [:title])
              (db_put result) ;; add to cache
              (db_get result)))))))) ;; and now return with gen'd pgid from db


(defn pdf-to-xml-refs
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function
  to pull out a file from a database by filename, db_get, a function to insert
  into a database, db_put, and a function that connects to the restful pdf
  parser, check if the file title exists in the database, if it does then return
  the entry, if not then parse the pdf get a trusted title and then check the db
  again if cached then return, else make it "
  [filemap db_get db_put pdf_parser_f]
  (when filemap
    (if-let [c (db_get filemap)] ;; if given correct title in filemap
      c ;; cached return
      (let [{xml_str :body} (pdf_parser_f (:filestuff filemap)) ;; if not the process
            result (assoc filemap :xml_content xml_str)]
        (db_put result) ;; add to cache
        (db_get result))))) ;; and now return with gen'd pgid from db
