(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc! get-doc-by-name]]
            [clojure.string :refer [split]]
            [byte-streams :as bs]
            [clj-http.client :as client]
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
    (client/post "http://localhost:8080/processFulltextDocument"
                 {:multipart [{:name "Content/type" :content "application/pdf"}
                              {:name "input" :content (io/input-stream fileblob)}]})))
