(ns tldr-be.neo4j.handler
  (:require [tldr-be.neo4j.core :as neo]
            [ring.util.http-response :as http]
            [tldr-be.utils.core :refer [parse-int]]
            [clojure.string :as str]))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (let [ts (not-empty (select-keys (:query-params req) ["titles"]))
        is (not-empty (select-keys (:query-params req) ["ids"]))
        args (distinct (concat
                        (map #(format "'%s'" (str/replace % "\"" ""))
                             (get ts "titles"))
                        (map parse-int (get is "ids"))))
        [ok? res] (apply neo/get-all-children args)]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))
