(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!
                                     get-doc-by-id
                                     create-xml-refs!
                                     create-xml-headers!
                                     get-xml-refs
                                     get-xml-headers-by-title
                                     get-headers-id-by-title
                                     *neo4j_db*]]
            [byte-streams :as bs]
            [clojure.xml :as xml]
            [clojure.tools.logging :as log]
            [tldr-be.utils.core :refer [parse-int]]
            [tldr-be.doc.pdf-parse :as pdf]
            [tldr-be.doc.engines :as eng]
            [tldr-be.utils.core :refer [collect
                                        get-basename
                                        make-sections
                                        string->xml
                                        get-sections]]
            [clojure.java.io :as io]))


(defn get-doc
  "Given the params of a request, try to pull out the title, if that fails try
  to pull out the postgres id (pgid), with either pull out the file, if neither
  works return failure"
  [params]
  (log/info "getting " params)
  (let [title (get params "title")
        pgid (get params "pgid")]
    (if (or pgid title)
      [true (cond pgid (get-doc-by-id {:id (parse-int pgid)})
                  title (-> {:title title}
                            get-xml-headers-by-title
                            :pgid
                            get-doc-by-id))]
      [false ("file could not be found")])))


(defn insert-xml-refs!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml reference table in the db"
  ([id fname xml_content]
   (eng/insert-xml-engine create-xml-refs! id xml_content)))


(defn insert-xml-headers!
  "Given params from a request, pull the filename and a xml of file data, insert
  that xml into the xml headers table in the db"
  [fmap]
  (eng/insert-xml-engine fmap create-xml-headers!))


(defn get-xml-refs-by-id
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml references by the filename"
  [pgid]
  (eng/get-xml-engine name get-xml-refs))


(defn get-headers-by-title
  "Given the name of a file, if the filename is good
  then query the db for the corresponding xml headers by the filename"
  [title]
  (eng/get-xml-engine title get-xml-headers-by-title))


(defn pdf-to-xml-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml references from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-xml-refs-by-id
                         insert-xml-refs!
                         pdf/pdf-ref-parser))


(defn pdf-to-xml-headers
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-headers-by-title
                         insert-xml-headers!
                         pdf/pdf-header-parser))


(defn xml-to-map
  "Given a grobid response, converts the xml to a deeply nested map"
  [grobidres]
  (-> grobidres
      bs/to-byte-array
      io/input-stream
      xml/parse))


(defn process-headers
  "Given a file map, pass the file_blob to whatever restful service to get the
  headers, convert the headers to xml and then accumulate the results"
  [fmap]
  (->> fmap
       pdf-to-xml-headers
       string->xml
       get-sections
       make-sections
       (map collect)
       second))


(defn insert-doc!
  "Given params from a request, pull the filename and a blob of file data, insert
  that blob into the db after transforming blob to byte-array"
  [params]
  (let [filename (get-in params [:file :filename])
        file_blob (get-in params [:file :tempfile])]
    (if (and filename file_blob)
      ;; if we have both filename and blob then perform the effect
      ;; we have to hit grobid everytime to get the title because filenames aren't trustworthy
      (when-let [heds (process-headers {:filename filename
                                        :filestuff file_blob})]
        (let [title (-> heds :title first)
              {pgid :pgid} (get-headers-id-by-title {:title title})]
          (if (empty? (get-doc-by-id {:pgid pgid}))
            (create-doc! {:filestuff (bs/to-byte-array file_blob)
                          :pgid pgid})
            [true "Your document successfully uploaded"])))
      [false "Request Malformed"])))


(defn process-refs
  [fmap]
  (->> fmap
       pdf-to-xml-refs
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
