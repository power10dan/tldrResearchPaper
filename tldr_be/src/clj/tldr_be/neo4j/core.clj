(ns tldr-be.neo4j.core
  (:require [tldr-be.db.core :refer [*neo4j_db*
                                     get-xml-headers
                                     get-xml-refs]]
            [tldr-be.doc.core :refer [process-headers process-refs]]
            [tldr-be.utils.core :refer [escape-string map-keys]]
            [clojure.walk :refer [stringify-keys postwalk]]
            [clojure.set :refer [rename-keys]]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [clojurewerkz.neocons.rest.cypher :as cy]
            [clojurewerkz.neocons.rest :as nr]
            [clojure.string :as str]))

;; globals for neo4j node labels
(def parent-label (atom "Uploaded"))
(def child-label (atom "Cited"))
(def cites (atom ":cites"))
(def err (atom "Malformed request! Check for mischievous gnomes!"))


(defn keys-to-neo4j
  "Given a map like :key value0 :key value1, stringify and format the keys for the
  cypher query langauge"
  [m]
  (->> (stringify-keys m)
       (map-keys #(-> (str ":" % ":")))))


(defn massage-node
  "Given a node, remove all the neo4j specific data and return the id and data we
  injected"
  [node]
  (conj (get-in node [:data]) (:metadata node)))


(defn find-node
  "Given the title or id of a paper traverse the graph and retrieve that nodes data,
  neo4j id, and postgres id"
  [arg]
  (let [q0 (cond
             (string? arg) (format "MATCH (n:%s) where n.title = '%s' OR n.filename = '%s' RETURN n UNION MATCH (n:%s) WHERE n.title = '%s' or n.filename= '%s' RETURN n" @parent-label arg arg @child-label arg arg)
             (number? arg) (format "MATCH (n:%s) where ID(n) = %d OR n.pgid = %d RETURN n UNION MATCH (n:%s) WHERE ID(n) = %d RETURN n" @parent-label arg arg @child-label arg))
        result (-> (cy/tquery *neo4j_db* q0) first (get "n"))]
    (when result (massage-node result))))


(defn node-exists?
  "Given the title or id of a paper traverse the graph and check if node exist"
  [arg]
  (not (nil? (find-node arg))))


(defn original-exists?
  "Given a title or id see if an original node exists that fits the argument"
  [arg]
  (let [node (find-node arg)]
    (some #(= % @parent-label) (:labels node))))


(defn create-uploaded
  "given a filemap create an uploaded node, if it already exists match on it and
  update its parameters"
  [fmap]
  (let [post-process (fn [string] (-> string
                                     (str/replace #":\"" ":")
                                     (str/replace #"\":" "")
                                     (str/replace #"\",\"" ",")))
        _fmap (-> fmap
                  (update-in [:forename] #(into [] (interpose "," %)))
                  (update-in [:surname] #(into [] (interpose "," %)))
                  keys-to-neo4j)
        q0 (format "Merge (u:Uploaded %s) " (select-keys _fmap [":title:"]))
        q1 (format "ON CREATE SET u = %s " _fmap)
        q2 (format "ON CREATE SET u += %s" _fmap)
        q3 (format "Match (u:Uploaded %s) return u" (post-process (select-keys _fmap [":pgid:"])))]
    ;; make the node
    (cy/query *neo4j_db* (post-process (str q0 q1 q2)))
    ;; return the node via a query by getting the neo4j id and using neocons
    ;; return the properly formatted information. This is needed to make the
    ;; edges using neocons in insert-neo4j
    (let [node (get (first (cy/tquery *neo4j_db* (post-process q3))) "u")
          n4j_id (get-in node [:metadata :id])]
      (nn/get *neo4j_db* n4j_id))))


(defn core-wrapper
  "Given a function that performs a neo4j query. Wrap the function nice and pretty
  for the handler"
  [f & ts]
  (let [res (apply f ts)]
    (if (not (empty? res))
      [true res]
      [false "No papers found"])))


(defn query-neo4j
  "Given any list of strings that represent a cypher query, run the query then
  post process"
  [& strs]
  (map massage-node (-> (cy/query *neo4j_db* (apply str strs))
                        (get-in [:data])
                        flatten)))


(defn get-all-children
  "given n many nodes find all the children of each node in a set union"
  [& ts]
  (let [q0 (format "WITH [%s] as ts %n" (apply str (interpose "," ts)))
        q1 (format "MATCH (p:%s)-[]->(c:%s) \n" @parent-label @child-label)
        q2 "WHERE p.title in ts OR ID(p) in ts RETURN DISTINCT c \n"]
    (query-neo4j q0 q1 q2)))


(defn get-all-children-by
  "given n many nodes find all the children of each node in a set union filtered
  by surnames"
  [& ts]
  (let [q0 (format "WITH [%s] as ts %n" (apply str (interpose "," ts)))
        q1 (format "MATCH (p:%s)-[]->(c:%s) \n" @parent-label @child-label)
        q2 "WHERE (p.title in ts OR ID(p) in ts) AND ANY(x in c.surname where x in ts) RETURN c\n"]
    (query-neo4j q0 q1 q2)))


(defn get-recommended-children
  "Given the pgid or titles of nodes get the most influential children nodes"
  [& ts]
  (let [q0 (format "Match (node:%s)-[]->(c)" @parent-label)
        q1 (format "Where node.pgid in [%s] or node.title in [%s]" (apply str (interpose "," ts)) (apply str (interpose "," ts)))
        q2 "WITH COLLECT(c) AS nodes CALL apoc.algo.pageRank(nodes) YIELD node, score"
        q3 "RETURN node "
        q4 "Order By score DESC "]
    (query-neo4j q0 q1 q2 q3 q4)))


(defn get-all-shared-children
  [& ts]
  (let [q0 (format "WITH [%s] as ts %n" (apply str (interpose "," ts)))
        q1 (format "MATCH (p:%s)-[]->(c:%s) \n" @parent-label @child-label)
        q2 "WHERE (p.title in ts OR ID(p) in ts) \n"
        q3 "WITH p, collect(c) as childrenPerParent \n WITH collect(childrenPerParent) as children\n"
        q4 "WITH reduce(commonChildren = head(children), children in tail(children) | apoc.coll.intersection(commonChildren, children)) as commonChildren RETURN commonChildren"]
    (query-neo4j q0 q1 q2 q3 q4)))


(defn get-all-shared-children-by
  [& ts]
  (let [q0 (format "WITH [%s] as ts %n" (apply str (interpose "," ts)))
        q1 (format "MATCH (p:%s)-[]->(c:%s) \n" @parent-label @child-label)
        q2 "WHERE (p.title in ts OR ID(p) in ts) AND ANY(x in c.surname where x in ts) \n"
        q3 "WITH p, collect(c) as childrenPerParent \n WITH collect(childrenPerParent) as children\n"
        q4 "WITH reduce(commonChildren = head(children), children in tail(children) | apoc.coll.intersection(commonChildren, children)) as commonChildren RETURN commonChildren"]
    (query-neo4j q0 q1 q2 q3 q4)))


(defn get-nodes
  "Given an integer return that many nodes"
  [n]
  (condp #(%1 %2) n
    pos-int? [true (map massage-node
               (-> (cy/query *neo4j_db* (str "MATCH (n) RETURN n LIMIT " n))
                   (get-in [:data])
                   flatten))]
    [false @err]))


(defn get-sparse-nodes
  "Given an integer return children nodes that have the least amount of connections
  in the graph limited by the integer"
  [n]
  (->> (cy/tquery *neo4j_db* (format "Match (p:Uploaded)-[r]-(c:Cited) return c.title, count(r) as connections Order by connections LIMIT %d" n))
       (map (comp first first vals))))


(defn get-subgraph-by-node
  "Given an integer, n, and a node identifier pgid or title, return a subgraph n-legs around the node, returning the graph on success, nil of failure"
  [n ts]
  (if ts
    (let [q0 (format "With [%s] as ts %n" (apply str (interpose "," ts)))
         q1 "Match (n) where n.pgid in ts or n.title in ts "
          q2 (if n
               (format "Match (a)-[*1..%d]-(n)-[*1..%d]-(m) " n n)
               "Match (a)--(n)--(m) ")
         q3 "Return a, m, n"]
      [true (query-neo4j q0 q1 q2 q3)])
    [false @err]))


(defn insert-neo4j
  "Given a {:pgid pgid} to retrieve a document from postgres, get the
  headers and references for the file, create the nodes in the neo4j uniquely
  and then add edges, uniquely"
  [fmap]
  (when-let [heds (into {}
                        (filter
                         second
                         (get-xml-headers fmap)))] ;;filter possible nils
    (when-not (-> heds :pgid original-exists?)
      (let [refs (process-refs fmap)
            ;; parent (nn/create-unique-in-index
            ;;         *neo4j_db* "by-title" "title" (:title heds) heds)
            parent (create-uploaded heds)
            ;; WARNING THIS LINE ENSURES CREATED CITED NODES ARE REFERENCED IF
            ;; YOU USE A NORMAL CREATE CALL YOU'LL GET A CONSTRAIN ERROR
            ;; HERE THERE BE DRAGON
            children (map #(nn/create-unique-in-index *neo4j_db* "by-title"
                                                      "title" (:title %) %) refs)]
        ;; add label to children, doall forces evaluations
        (doall (map #(nl/add *neo4j_db* % @child-label) children))
        ;; smart add the edges between parent and children
        (doall (nrl/create-many *neo4j_db* parent children @cites))))))
