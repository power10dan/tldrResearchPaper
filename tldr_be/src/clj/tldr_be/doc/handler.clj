(ns tldr-be.doc.handler
  (:require [tldr-be.doc.core :as doc]
            [ring.util.http-response :as http]
            [clojure.string :refer [split]]
            [tldr-be.neo4j.core :refer [insert-neo4j]]
            [clojure.java.io :as io]))


(defn insert-doc!
  "Given a request that specifies a summary information, validate summary and
   if good, add to database, otherwise give a bad request"
  [req]
  (let [[ok? res] (doc/insert-doc! (:params req))] ;;params gen'd by middleware
    (if ok?
      (do
        (insert-neo4j (#(first (split % #"\."))
                           (get-in req [:params :file :filename])))
        (http/created res))
      (http/bad-request res))))


(defn get-doc-by-filename
  "Given a request that specifies a filename in the body, retrieve the first blob
  corresponding to that filename from the db"
  [req]
  (let [[ok? res] (doc/get-doc-by-filename (:params req))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/pdf"}
       :body (io/input-stream (:filestuff res))}
      (http/bad-request res))))
