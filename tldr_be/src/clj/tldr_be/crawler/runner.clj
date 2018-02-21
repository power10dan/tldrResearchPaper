(ns tldr-be.crawler.runner
  (:require [tldr-be.config :refer [env]]
            [tldr-be.crawler.core :refer [add-paper]]
            [tldr-be.utils.core :refer [doseq-interval]]
            [clj-time.core :as time]
            [immutant.scheduling :refer :all]
            [tldr-be.neo4j.core :as neo])
  (:import [org.joda.time DateTimeZone]))


(defn populate
  "Given nothing, grab the most sparse children in the graph and try to find
  their pdfs, then add them to the neo4j database"
  [] (-> (neo/get-sparse-nodes (:bing-limit env))
         (doseq-interval add-paper 3000)))


(defn run-schedule
  "run some function that takes no args at 3 am every day"
  [f]
  (schedule f (-> (in 1 :hour) (every :day))))
