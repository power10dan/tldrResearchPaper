(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!
                                     get-doc-by-name
                                     create-xml-refs!
                                     create-xml-headers!
                                     get-xml-refs-by-name
                                     get-xml-headers-by-name]]
            [clojure.string :refer [split]]
            [byte-streams :as bs]
            [tldr-be.config :refer [env]]
            [clojure.xml :as xml]
            [tldr-be.doc.pdf-parse :as pdf]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [clojure.data.xml :as x]
            [clojure.java.io :as io]))

(defn insert-doc!
  "Given params from a request, pull the filename and a blob of file data, insert
  that blob into the db after transforming blob to byte-array"
  [params]
  (let [filename (get-in params [:file :filename])
        file_blob (get-in params [:file :tempfile])]
    (if (and filename file_blob)
      (do ;; if we have both filename and blob then perform the effect
        (create-doc! {:filename (first (split filename #"\.")) ;;fname is basename
                      :filestuff (bs/to-byte-array file_blob)})
        [true "Your document successfully uploaded"])
      [false "Request Malformed"])))


(defn get-doc-by-filename
  "Given the params of a request, pull the filename out, if the filename is good
  then query the db for the corresponding file by the filename"
  [params]
  (if-let [filename (:filename params)]
    [true (get-doc-by-name {:filename filename})]
    [false "file could not be found"]))


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


(defn insert-xml-refs!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml reference table in the db"
  [id fname xml_content]
  (insert-xml-engine id fname xml_content create-xml-refs!))


(defn insert-xml-headers!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml headers table in the db"
  [id fname xml_content]
  (insert-xml-engine id fname xml_content create-xml-headers!))


(defn get-xml-engine
  "given the name of a file and a function that dictates a database. Use the
  supplied function to pull out the xml from the appropriate database table"
  [name f]
  (when name (f {:filename name})))


(defn get-xml-refs-by-filename
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml references by the filename"
  [name]
  (get-xml-engine name get-xml-refs-by-name))


(defn get-xml-headers-by-filename
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml headers by the filename"
  [name]
  (get-xml-engine name get-xml-headers-by-name))


(defn pdf-to-xml-engine
  "given a filemap: {:id id :filename \"filename\" :filestuff bytea}, a function to
  pull out a filename from a database and a function that connects to the
  restful pdf parser, check if the file has already been processed via db_f, if
  not then process it with pdf_parser_f"
  [filemap db_f pdf_parser_f] ;; expecting
  (let [{id :id fname :filename fileblob :filestuff} filemap
        cached_xml (db_f fname)]
    (if cached_xml
      (:xml_content cached_xml)
      (let [{xml_file :body} (pdf_parser_f fileblob)]
        (insert-xml! id fname xml_file)
        xml_file))))

(defn pdf-to-xml-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml references from the file"
  [filemap]
  (pdf-to-xml-engine filemap get-xml-refs-by-filename pdf/pdf-ref-parser))


(defn pdf-to-xml-headers
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (pdf-to-xml-engine filemap get-xml-headers-by-filename pdf/pdf-header-parser))


(defn xml-to-map
  "Given a grobid response, converts the xml to a deeply nested map"
  [grobidres]
  (-> grobidres
      bs/to-byte-array
      io/input-stream
      xml/parse))


(defn get-fblob
  "pull out a file blob from the database given the name"
  [fname]
  (-> (assoc {} :filename fname) get-doc-by-filename second))


(defn fblob-cljmap
 "make a clojure map given filename as string"
  [fname]
  (-> fname get-fblob pdf-to-xml-refs xml-to-map))


(defn get-sections
 "take a nested xml clojure representation and pull out
  tags and respective content when content is a string"
  [grobid-map]
  (for [x (xml-seq grobid-map)
        :when (string? (first (:content x)))]
    [(if (= (:tag x) :biblScope)
       (-> x :attrs :unit keyword)
       (:tag x))
     (first (:content x))]))


;; TODO fix all this post processing
(defn make-sections
  "Given a vector of vectors, like the output of get-sections, group by title
  and add the title keyword to each entry"
  [vec_o_vecs]
  (->> vec_o_vecs
       flatten
       (partition-by #(= :title %))
       (filter #(not (= :title (first %))))
       (map #(doall (cons :title %)))))


(defn collect
  "Given a flat lazy seq like :key0 value0 :key1 value1 where duplicate keys
  exist. This function collects all values of duplicate keys into a key vector
  pair e.g. (lazy-seq (k0 v0 k1 v1 k0 v2)) => {k0 [v0 v2] k1 v1}. Usage in this
  document should be:  (map #(collect % :forename :surname) y)"
  ([coll & ks]
   (let [add (fn [a b c] (update c a #(conj % b)))
         add-new (fn [a b c] (conj c {a b}))]
     (loop [[x y & tail] coll
            acc (zipmap ks (repeat []))]
       (if (not x)
         acc
         (recur tail (cond
                       (contains? acc x) (add x y acc)
                       :else (add-new x y acc))))))))
