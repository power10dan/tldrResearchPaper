(ns tldr-be.neo4j.core
  (:require [tldr-be.db.core :refer [*neo4j_db*]]
            [tldr-be.doc.core :refer [workhorse process-headers process-refs]]
            [tldr-be.utils.core :refer [escape-string map-keys]]
            [clojure.walk :refer [stringify-keys postwalk]]
            [clojure.set :refer [rename-keys]]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [clojurewerkz.neocons.rest.cypher :as cy]
            [clojurewerkz.neocons.rest :as nr]))

;; globals for neo4j node labels
(def parent-label (atom "Uploaded"))
(def child-label (atom "Cited"))
(def cites (atom ":cites"))


(defn keys-to-neo4j
  "Given a map like :key value0 :key value1, stringify and format the keys for the
  cypher query langauge"
  [m]
  (->> (stringify-keys m)
       (map-keys #(-> (str % ":")))))


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
             (number? arg) (format "MATCH (n:%s) where ID(n) = %d RETURN n UNION MATCH (n:%s) WHERE ID(n) = %d RETURN n" @parent-label arg @child-label arg))
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
  (println (apply str strs))
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
    [false "Malformed request! Check for mischievous gnomes!"]))


(defn insert-neo4j
  "Given a filename get the document id for the file out of postgres, then get the
  headers and references for the file, create the nodes in the neo4j uniquely
  and then add edges, uniquely"
  [pgid]
  (try
    (when-let [heds (process-headers fname)]
      (when-not (-> heds :title first original-exists?)
        (let [refs (process-refs fname)
              id (get-doc-id {:filename fname})
              parent (nn/create *neo4j_db* (assoc heds :pgid (:id id)
                                                  :filename fname))
              ;; WARNING THIS LINE ENSURES CREATED CITED NODES ARE REFERENCED IF
              ;; YOU USE A NORMAL CREATE CALL YOU'LL GET A CONSTRAIN ERROR
              ;; HERE THERE BE DRAGON
              children (map
                        #(nn/create-unique-in-index
                          *neo4j_db*
                          "by-title"
                          "title"
                          (:title %)
                          %)
                        refs)]
          ;; add label to parent
          (nl/add *neo4j_db* parent @parent-label)
          ;; add label to children, doall forces evaluations
          (doall (map #(nl/add *neo4j_db* % @child-label) children))
          ;; smart add the edges between parent and children
          (doall (nrl/create-many *neo4j_db* parent children @cites)))))
      (catch Exception ex
        (println "ASHAHAHAHAHA" ex))))
