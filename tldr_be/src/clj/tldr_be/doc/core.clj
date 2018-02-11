(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!
                                     get-doc-by-filename
                                     get-doc-by-id
                                     get-doc-id
                                     get-doc-filename
                                     create-xml-refs!
                                     create-xml-headers!
                                     get-xml-refs-by-name
                                     get-xml-headers-by-name
                                     *neo4j_db*]]
            [clojure.string :refer [split]]
            [byte-streams :as bs]
            [clojure.xml :as xml]
            [clojure.tools.logging :as log]
            [tldr-be.utils.core :refer [parse-int]]
            [tldr-be.doc.pdf-parse :as pdf]
            [tldr-be.doc.engines :as eng]
            [tldr-be.utils.core :refer [collect]]
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


(defn get-doc
  "Given the params of a request, try to pull out the filename, if that fails try
  to pull out the postgres id (pgid), with either pull out the file, if neither
  works return failure"
  [params]
  (log/info "getting " params)
  (let [fname (get params "filename")
        pgid (get params "pgid")]
    (if (or pgid fname)
      [true (cond pgid (get-doc-by-id {:id (parse-int pgid)})
                  fname (get-doc-by-filename {:filename fname}))]
      [false ("file could not be found")])))


(defn insert-xml-refs!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml reference table in the db"
  [id fname xml_content]
  (eng/insert-xml-engine id fname xml_content create-xml-refs!))


(defn insert-xml-headers!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml headers table in the db"
  [id fname xml_content]
  (eng/insert-xml-engine id fname xml_content create-xml-headers!))


(defn get-xml-refs-by-filename
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml references by the filename"
  [name]
  (eng/get-xml-engine name get-xml-refs-by-name))


(defn get-xml-headers-by-filename
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml headers by the filename"
  [name]
  (eng/get-xml-engine name get-xml-headers-by-name))


(defn pdf-to-xml-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml references from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-xml-refs-by-filename
                         insert-xml-refs!
                         pdf/pdf-ref-parser))


(defn pdf-to-xml-headers
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (println "Running headers on: " filemap)
  (eng/pdf-to-xml-engine filemap
                         get-xml-headers-by-filename
                         insert-xml-headers!
                         pdf/pdf-header-parser))


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
  (-> (assoc {} :filename fname) get-doc-by-filename))


(defn fname-to-cljmap
 "make a clojure map given filename as string"
  [f fname]
  (-> fname get-fblob f xml-to-map))


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

(defn process-headers
  [fname]
  (->> fname
       (fname-to-cljmap pdf-to-xml-headers)
       get-sections
       make-sections
       (map collect)
       second))

(defn process-refs
  [fname]
  (->> fname
       (fname-to-cljmap pdf-to-xml-refs)
       get-sections
       make-sections
       (map collect)
       (filter #(contains? % :surname))))

(defn workhorse
  "given a filename, grab the file bytea blob out of the db, parse the headers and
  the references and then collect like keys, this function returns 2-tuple where
  the fst is the filename headers, and snd is a collection of references"
  [fname]
  (log/info "performing workhorse on " fname)
  [(process-headers fname) (process-refs fname)])
