(ns tldr-be.doc.handler
  (:require [tldr-be.doc.core :as doc]
            [ring.util.http-response :as http]
            [clojure.string :refer [split]]
            [tldr-be.neo4j.core :refer [insert-neo4j get-recommended]]
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
      (http/ok (get-recommended pgid)) ;; return recommended on paper upload
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
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/pdf"}
       :body (io/input-stream (:filestuff res))}
      (http/bad-request res))))

(defn search-postgres
  "Given a request that specifies search_query in the params, retrieve first 10
   results from the search function"
  [req]
  (let [_args (get req :query-params)
        args (if (contains? _args "search_query")
               (update-in _args ["search_query"] (fn [a] (str/replace a "\"" "")))
               _args)
       [ok? res] (doc/search-by-term! args)]
     (if ok?
       {:status 200
        :headers {"Content-Type" "application/json"}
        :body (vec res)}
       (http/bad-request res))))
