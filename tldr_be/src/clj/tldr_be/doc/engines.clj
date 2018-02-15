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
  [f data]
  (when (not-empty data)
    (if (empty? (get-headers-id-by-title (select-keys data [:title]))) ;; if doc doesnt exist
      (f data)
      "Your document successfully uploaded")))


(defn pdf-to-xml-engine
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function
  to pull out a file from a database by filename, db_get, a function to insert
  into a database, db_put, and a function that connects to the restful pdf
  parser, check if the file title exists in the database, if it does then return
  the entry, if not then parse the pdf get a trusted title and then check the db
  again if cached then return, else make it "
  [filemap db_get db_put pdf_parser_f]
  (when filemap
    (do
      (when-let [c (db_get filemap)] c) ;; if cached return
      (let [{xml_str :body} (pdf_parser_f (:filestuff filemap)) ;; if not the process
            __result (->> xml_str
                         string->xml
                         get-sections
                         make-sections
                         (map collect)
                         second)
            _result (update-in __result [:title] first)
            result (assoc _result :filename (:filename filemap))] ;; remove title from vector
        (if-let [cached (db_get (:title result))] ;; then we've cached it else make it
          cached
          (do
            (db_put result) ;; add to cache
            (db_get result))))))) ;; and now return with gen'd pgid from db
