(ns tldr-be.neo4j.core
  (:require [tldr-be.db.core :refer [get-doc-id
                                     get-doc-filename
                                     *neo4j_db*]]
            [tldr-be.doc.core :refer [workhorse]]
            [tldr-be.utils.core :refer [escape-string]]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [clojurewerkz.neocons.rest.cypher :as cy]))


(defn add-child-and-edge
  "Given a parent node and a child assume the parent exists, if the child does not
  exist create it, if an edge between the two doesn't exist then create if both
  the child and edge exist then do nothing"
  [parent child]
  (let [p-title (escape-string (get-in parent [:data :title]))
        c-title (escape-string (get-in child [:data :title]))
        q0 (format "MATCH (parent:Original {title: \"%s\"})" p-title)
        q1 (format "MERGE (child:Cited {title: \"%s\"})" c-title)
        q2 (format "ON CREATE SET child.title = \"%s\"" c-title)
        q3 (format "CREATE UNIQUE (child) <- [:cited] - (parent)")]
    (cy/query *neo4j_db* (str q0 q1 q2 q3))))


(defn massage-node
  "Given a node, remove all the neo4j specific data and return the id and data we
  injected"
  [node]
  (conj (get-in node [:data]) (select-keys (:metadata node) [:id])))


(defn find-node
  "Given the title or id of a paper traverse the graph and retrieve that nodes data,
  neo4j id, and postgres id"
  [arg]
  (let [result (-> (cy/tquery
                    *neo4j_db*
                    ;; TODO fix this horrendously long line, also notice that we let neo4j deal with the type errors
                    (format "MATCH (n:Original) where n.title = '%s' or ID(n) = %d RETURN n UNION MATCH (n:Cited) WHERE n.title = '%s' or ID(n) = %d RETURN n" arg arg arg arg))
                   first
                   (get "n"))
    (when result (massage-node result))))


(defn node-exists?
  "Given the title or id of a paper traverse the graph and check if node exist"
  [arg]
  (not (nil? (find-node arg))))


(defn _get-all-children
  "given n many nodes find all the children of each node in a set union"
  [& ts]
  (let [titles (map #(format "'%s'" %) ts)
        q0 (format "WITH [%s] as titles %n" (apply str (interpose "," titles)))
        q1 "MATCH (p:Original)-[:cited]->(c:Cited) \n"
        q2 "WHERE p.title in titles RETURN c \n"]
    (map massage-node
         (-> (cy/query *neo4j_db* (apply str q0 q1 q2))
             (get-in [:data])
             flatten))))


(defn get-all-children
  "Wrapper around the engine _get-all-children this function checks the results of
  the service api, if good returns a 2-tuple (true, results) if bad return false
  an error message"
  [& ts]
  (let [res (apply _get-all-children ts)]
    (if (not (empty? res))
      [true res]
      [false "No papers found"])))


;; TODO (defn get-all-shared-children)

(defn insert-neo4j
  "Given a filename get the document id for the file out of postgres, then get the
  headers and references for the file, create the nodes in the neo4j uniquely
  and then add edges, uniquely"
  [fname]
  (when-let [id (get-doc-id {:filename fname})]
    (when-not (-> (get-doc-filename id) :filename node-exists?)
      (let [[heds refs] (workhorse fname)
            parent (nn/create-unique-in-index
                    *neo4j_db*
                    "by-title"
                    "title"
                    (:title heds)
                    (assoc heds :pgid (:id id)))
            children (map ;;TODO remove this call and create child with add-child-and-edge function
                      #(nn/create-unique-in-index
                        *neo4j_db*
                        "by-title"
                        "title"
                        (:title %)
                        %)
                      refs)]
        (nl/add *neo4j_db* parent "Original")
        (doall (map #(nl/add *neo4j_db* % "Cited") children))
        (add-child-and-edge parent (first children))
        (doall (map #(add-child-and-edge parent %) children))))))
