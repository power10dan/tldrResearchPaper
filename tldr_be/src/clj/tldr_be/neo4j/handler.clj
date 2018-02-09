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
        massage-str (fn [a] (map #(format "'%s'" (str/replace % "\"" "")) a))
        ts (to-vec (get-in req [:query-params "title"]))
        is (to-vec (get-in req [:query-params "id"]))
        fs (to-vec (get-in req [:query-params "forename"]))
        ss (to-vec (get-in req [:query-params "surname"]))]
    (distinct (concat
               (when ts (massage-str ts))
               (when is (map parse-int is))
               (when fs (massage-str fs))
               (when ss (massage-str ss))))))


(defn response-wrapper
  "Given a function and a function to feed the first one and request call the
  function and wrap the response appropriately"
  [req f g]
  (let [[ok? res] (apply f g (massage-req req))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))


(defn get-all-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (response-wrapper req neo/handler-wrapper neo/get-all-children))


(defn get-all-shared-children
  "Given a request that specifies a n-many paper titles get all children for each
  paper with no duplicates"
  [req]
  (response-wrapper req neo/handler-wrapper neo/get-all-shared-children))


(defn get-all-shared-children-by
  [req]
  (response-wrapper req neo/handler-wrapper neo/get-all-shared-children-by))


(defn get-all-children-by
  [req]
  (response-wrapper req neo/handler-wrapper neo/get-all-children-by))


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
