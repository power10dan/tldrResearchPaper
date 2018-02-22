(ns tldr-be.neo4j.handler
  (:require [tldr-be.neo4j.core :as neo]
            [ring.util.http-response :as http]
            [tldr-be.utils.core :refer [parse-int
                                        not-nil?
                                        response-wrapper
                                        massage-req]]
            [clojure.string :as str]))


(defn make-handler
  [req f g]
  (response-wrapper req f g))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (response-wrapper req neo/core-wrapper neo/get-all-children))


(defn get-all-shared-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (response-wrapper req neo/core-wrapper neo/get-all-shared-children))


(defn get-all-shared-children-by
  [req]
  (response-wrapper req neo/core-wrapper neo/get-all-shared-children-by))


(defn get-recommended-children
  [req]
  (response-wrapper req neo/core-wrapper neo/get-recommended-children))


(defn get-recommended-children
  [req]
  (response-wrapper req neo/core-wrapper neo/get-recommended))


(defn get-all-children-by
  [req]
  (response-wrapper req neo/core-wrapper neo/get-all-children-by))


(defn get-subgraph
  [req]
  (let [[ok? res] (neo/get-subgraph-by-node
                   (->> (get-in req [:query-params "n"]) parse-int)
                   (massage-req req))]
    (if ok?
      (http/ok res)
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
