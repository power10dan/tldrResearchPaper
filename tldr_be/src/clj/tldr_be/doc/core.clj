(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc! get-doc-by-name create-xml-refs! get-xml-refs-by-name get-xml-refs]]
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


(defn insert-xml!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the db"
  [id filename xml_content]
  (when (and id filename xml_content)
    (do ;; if we have all parameters, create an entry
      (create-xml-refs! {:id id
                    :filename filename
                    :xml_content xml_content})
      "Your document successfully uploaded")))


(defn get-xml-refs-by-filename
  "Given the params of a request, pull the filename out, if the filename is good
  then query the db for the corresponding xml by the filename"
  [name]
  (when name
    (get-xml-refs-by-name {:filename name})))


(defn pdf-to-xml
  "Given a bytea blob from the postgres db, converts to BufferedInputStream, and
  send restful request to Grobid. Returns a parsed xml in body"
  [filemap] ;; expecting {:id id :filename "filename" :filestuff bytea}
  (let [{id :id fname :filename fileblob :filestuff} filemap
        cached_xml (get-xml-refs-by-filename fname)]
    (if cached_xml
      (:xml_content cached_xml)
      (let [{xml_file :body} (pdf/pdf-ref-parser fileblob)]
        (insert-xml! id fname xml_file)
        xml_file))))


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
  (-> fname get-fblob pdf-to-xml xml-to-map))


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
