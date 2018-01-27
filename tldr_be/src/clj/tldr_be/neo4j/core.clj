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


(defn find-node-by-title
  "Given the title of a paper traverse the graph and retrieve that nodes data,
  neo4j id, and postgres id"
  [title]
  (let [result (-> (cy/tquery
                    *neo4j_db*
                    (format "MATCH (n:Original) WHERE n.title = \"%s\" RETURN n" title))
                   first
                   (get "n"))
        metadata (:metadata result)]
    (when result
      (conj (get-in result [:data]) (select-keys metadata [:id])))))


(defn node-exists?
  "Given the title of a paper traverse the graph and check if node exist"
  [title]
  (not (nil? (find-node-by-title title))))


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
