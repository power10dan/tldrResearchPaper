(ns tldr-be.neo4j.handler
  (:require [tldr-be.neo4j.core :as neo]
            [ring.util.http-response :as http]
            [clojure.string :as str]))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (let [titles (get-in req [:query-params "titles"])
        [ok? res] (apply neo/get-all-children (map #(str/replace % "\"" "") titles))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))
