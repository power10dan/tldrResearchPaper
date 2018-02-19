(ns tldr-be.crawler.runner
  (:require [tldr-be.config :refer [env]]
            [tldr-be.crawler.core :refer [get-top-url add-paper]]
            [tldr-be.utils.core :refer [doseq-interval]]
            [clj-time.core :as time]
            [clj-time.periodic :as per]
            [immutant.scheduling :refer :all]
            [tldr-be.neo4j.core :as neo]
            [clojure.tools.logging :as log])
  (:import [org.joda.time DateTimeZone]))


(defn populate
  "Given nothing, grab the most sparse children in the graph and try to find
  their pdfs, then add them to the neo4j database"
  [] (-> (neo/get-sparse-nodes 10) (doseq-interval add-paper 3000)))


(defn run-schedule
  "run some function that takes no args at the defined schedule"
  [f]
  (let [t (time/today-at 3 00)]
    (schedule f (-> (at t) :every :day))))
