(ns tldr-be.crawler.runner
  (:require [tldr-be.config :refer [env]]
            [tldr-be.crawler.core :refer [get-top-url add-paper]]
            [clj-time.core :as time]
            [chime :refer [chime-at]]
            [tldr-be.neo4j.core :as neo])
  (:import [org.joda.time DateTimeZone]))


(defn populate
  "Given nothing, grab the most sparse children in the graph and try to find
  their pdfs, then add them to the neo4j database"
  []
  (let [children (neo/get-sparse-children 10)
        results (map get-top-url children)
        ]
    children))

(def populate-schedule)
