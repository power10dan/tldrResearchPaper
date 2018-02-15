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
  (eng/insert-xml-engine create-xml-headers! fmap))


(defn get-xml-refs-by-id
  "Given a filemap try to get the references for the file based on pgid return nil
  if not existent"
  [filemap]
  (get-xml-refs (not-empty {:pgid (:pgid filemap)})))


(defn get-headers-by-title
  "Given a filemap try to get the headers for the file by title, return nil if not
  existent"
  [filemap]
  (get-xml-headers-by-title (not-empty {:title (:title filemap)})))


(defn pdf-to-xml-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml references from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-xml-refs-by-id
                         insert-xml-refs!
                         pdf/pdf-ref-parser))


(defn process-headers
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-headers-by-title
                         insert-xml-headers!
                         pdf/pdf-header-parser))


(defn process-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (eng/pdf-to-xml-engine filemap
                         get-xml-refs-by-id
                         insert-xml-headers!
                         pdf/pdf-header-parser))



(defn insert-doc!
  "Given params from a request, pull the filename and a blob of file data, insert
  that blob into the db after transforming blob to byte-array"
  [filename file_blob]
  (when (and filename file_blob)
    ;; if we have both filename and blob then perform the effect
    ;; we have to hit grobid everytime to get the title because filenames aren't trustworthy
    (when-let [heds (process-headers {:filename filename
                                      :filestuff file_blob})]
      (let [{pgid :pgid} (get-headers-id-by-title (select-keys heds [:title]))]
        (if (empty? (get-doc-by-id {:pgid pgid}))
          (do (create-doc! {:filestuff (bs/to-byte-array file_blob) :pgid pgid})
              [true "Your document successfully uploaded"])
          [false "Request Malformed"])))))


(defn workhorse
  "given a filename, grab the file bytea blob out of the db, parse the headers and
  the references and then collect like keys, this function returns 2-tuple where
  the fst is the filename headers, and snd is a collection of references"
  [fmap]
  (log/info "performing workhorse on " fmap)
  [(process-headers fmap) (process-refs fmap)])
