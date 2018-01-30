(ns tldr-be.neo4j.handler
  (:require [tldr-be.neo4j.core :as neo]
            [ring.util.http-response :as http]
            [tldr-be.utils.core :refer [parse-int not-nil?]]
            [clojure.string :as str]))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  ;; TODO fix this repetition
  (let [_ts (get-in req [:query-params "title"])
        ts (cond (coll? _ts) _ts (not-nil? _ts) (vector _ts) :else nil)
        _is (get-in req [:query-params "ids"])
        is (cond (coll? _is) _is (not-nil? _is) (vector _is) :else nil)
        args (distinct (concat
                        (when ts
                          (map #(format "'%s'" (str/replace % "\"" "")) ts))
                        (when is
                          (map parse-int is))))
        [ok? res] (apply neo/get-all-children args)]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))
