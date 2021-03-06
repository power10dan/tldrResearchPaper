(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!
                                     get-doc-by-id
                                     create-xml-refs!
                                     create-xml-headers!
                                     get-xml-refs
                                     get-xml-headers-by-title
                                     get-headers-id-by-title
                                     search-by-term
                                     check-spelling
                                     *neo4j_db*]]
            [byte-streams :as bs]
            [clojure.xml :as xml]
            [clojure.tools.logging :as log]
            [tldr-be.utils.core :refer [parse-int]]
            [tldr-be.doc.pdf-parse :as pdf]
            [tldr-be.doc.engines :as eng]
            [tldr-be.neo4j.core :refer [insert-neo4j]]
            [tldr-be.utils.core :refer [collect
                                        make-sections
                                        distinct-by
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
    (println "KDJFLSJDFKLJD" (count title))
    (if (or pgid title)
      [true (cond pgid (get-doc-by-id {:pgid (parse-int pgid)})
                  title (let [fmap (get-xml-headers-by-title {:title title})]
                          (get-doc-by-id {:pgid (:pgid fmap)})))]
      [false "file could not be found"])))


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


(defn process-headers
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (eng/pdf-to-xml-headers filemap
                          get-headers-by-title
                          create-xml-headers!
                          pdf/pdf-header-parser))


(defn process-refs
  "Given a filemap, like: {:id id :filename \"filename\" :filestuff bytea} process
  the file and return the parsed xml headers from the file"
  [filemap]
  (->> (eng/pdf-to-xml-refs ;; get the xml out of the db or create it
        filemap
        get-xml-refs-by-id
        create-xml-refs!
        pdf/pdf-ref-parser)
      :xml_content ;; grab the actual content from return file map
      string->xml  ;; parse it to xml
      get-sections ;; run post processing to get a nice clj map
      make-sections
      (map collect)
      (filter #(contains? % :surname))
      (distinct-by :title)))


(defn insert-doc!
  "Given params from a request, pull the filename and a blob of file data, insert
  that blob into the db after transforming blob to byte-array"
  [filename file_blob]
  (if (and filename file_blob)
    ;; if we have both filename and blob then perform the effect
    ;; we have to hit grobid everytime to get the title because filenames aren't trustworthy
    (when-let [heds (process-headers {:filename filename
                                      :filestuff file_blob})]
      (let [{pgid :pgid} (get-headers-id-by-title (select-keys heds [:title]))]
        (when (empty? (get-doc-by-id {:pgid pgid})) ;; when empty insert the doc
          (do (create-doc! {:filestuff (bs/to-byte-array file_blob) :pgid pgid})
              (insert-neo4j
               {:pgid pgid :refs (process-refs {:pgid pgid :filestuff file_blob})}))
          [true "Your document successfully uploaded" pgid])))
    [false "Request Malformed" nil]))


(defn check-spelling!
  "given a word, check the spelling and return the closest word, otherwise,
   return nothing"
  [input_word]
 (let [spell_map (check-spelling {:s_word input_word})]
  (if spell_map
    (get spell_map :word)
    input_word)))


(defn search-by-term!
  "Given title or author name, return a paper form the database."
  [params]
  (let [input_string (get params "search_query")]
    (let [result (search-by-term {:q_string (clojure.string/join " & " (map check-spelling! (clojure.string/split input_string #" ")))})]
      (if (empty? result)
       [false "No matches found."]
       [true result]))))
