(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc! get-doc-by-name]]
            [clojure.string :refer [split]]
            [byte-streams :as bs]
            [clj-http.client :as client]
            [clojure.xml :as xml]
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

(defn pdf-to-xml
  "Given a bytea blob from the postgres db, converts to BufferedInputStream, and
  send restful request to Grobid. Returns a parsed xml in body"
  [fileblob]
  (when fileblob
    (client/post "http://192.168.99.100:8080/processFulltextDocument"
                 {:multipart [{:name "Content/type" :content "application/pdf"}
                              {:name "input" :content (io/input-stream fileblob)}]})))

(defn xml-to-map
  "Given a grobid response, converts the xml to a deeply nested map"
  [grobidres]
  (-> grobidres
      :body
      bs/to-byte-array
      io/input-stream
      xml/parse))

(defn get-fblob
  "pull out a file blob from the database given the name"
  [fname]
  (-> (assoc {} :filename fname) get-doc-by-filename second :filestuff))

(defn parse-grobid-map
  "given the Grobid output map, traverse it and pull out header-content"
  ([gmap]
   (parse-grobid-map gmap 0))
  ([gmap accu]
   (if-let [res (_parse-grobid-map (:content (vector gmap)) (+ 1 accu))]
     res
     accu)))

(defn _parse-grobid-map
  "helper function to parsing the Grobid map output"
  [vcon accu]
 (if vcon
   (reduce parse-grobid-map accu vcon)
   accu))
