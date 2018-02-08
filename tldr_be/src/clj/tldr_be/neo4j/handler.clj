(ns tldr-be.neo4j.handler
  (:require [tldr-be.neo4j.core :as neo]
            [ring.util.http-response :as http]
            [tldr-be.utils.core :refer [parse-int not-nil?]]
            [clojure.string :as str]))


(defn massage-req
  "Given a request pull out titles and ids and process them returns a collection
  of valid titles and ids"
  [req]
  ;; TODO: Convert to middleware
  (let [to-vec (fn [a] (cond (coll? a) a (not-nil? a) (vector a) :else nil))
        ts (to-vec (get-in req [:query-params "title"]))
        is (to-vec (get-in req [:query-params "id"]))
        fs (to-vec (get-in req [:query-params "forename"]))
        ss (to-vec (get-in req [:query-params "surname"]))]
    (distinct (concat
               (when ts
                 (map #(format "'%s'" (str/replace % "\"" "")) ts))
               (when is
                 (map parse-int is))
               (when fs
                 (map #(format "'%s'" (str/replace % "\"" "")) ts))
               (when ss
                 (map #(format "'%s'" (str/replace % "\"" "")) ts))))))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (let [[ok? res] (apply neo/handler-wrapper neo/get-all-children (massage-req req))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))


(defn get-all-shared-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (let [[ok? res] (apply neo/handler-wrapper neo/get-all-shared-children (massage-req req))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))


(defn get-nodes
  "Given a request that specifies a number of nodes to query, return that many
  nodes"
  [req]
  (let [[ok? res] (neo/get-nodes (->
                                  (get-in req [:query-params "numNodes"])
                                  parse-int))]
    (if ok?
      (http/ok res)
      (http/bad-request res))))
