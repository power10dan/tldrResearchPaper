(ns tldr-be.doc.handler
  (:require [tldr-be.doc.core :as doc]
            [ring.util.http-response :as http]
            [clojure.string :refer [split]]
            [tldr-be.neo4j.core :refer [insert-neo4j]]
            [tldr-be.utils.core :refer [get-basename]]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log]
            [clojure.string :as str]))


(defn insert-doc!
  "Given a request that specifies a summary information, validate summary and
   if good, add to database, otherwise give a bad request"
  [req]
  (let [fname (get-basename (get-in req [:params :file :filename]))
        tempfile (get-in req [:params :file :tempfile])
        [ok? res pgid] (doc/insert-doc! fname tempfile)]
    (if ok?
      (do
        (insert-neo4j {:pgid pgid :filestuff tempfile} )
        (http/created res res)) ;; (http/created url body)
      (http/bad-request res))))


(defn get-doc
  "Given a request that specifies a filename in the body, retrieve the first blob
  corresponding to that filename from the db"
  [req]
  (let [_args (get req :query-params)
        args (if (contains? _args "title")
               (update-in _args ["title"] (fn [a] (str/replace a "\"" "")))
               _args)
        [ok? res] (doc/get-doc args)]
    (println args ok? res)
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/pdf"}
       :body (io/input-stream (:filestuff res))}
      (http/bad-request res))))
