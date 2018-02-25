(ns tldr-be.crawler.runner
  (:require [tldr-be.config :refer [env]]
            [tldr-be.crawler.core :refer [add-paper]]
            [tldr-be.utils.core :refer [doseq-interval]]
            [clj-time.core :as time]
            [tldr-be.db.core :refer [update-lexemes]]
            [immutant.scheduling :refer :all]
            [tldr-be.neo4j.core :as neo])
  (:import [org.joda.time DateTimeZone]))


(defn populate
  "Given nothing, grab the most sparse children in the graph and try to find
  their pdfs, then add them to the neo4j database"
  []
  (println "I HAVE THIS MANY " (count (neo/get-sparse-nodes (:bing-limit env))))
  (-> (neo/get-sparse-nodes (:bing-limit env))
         (doseq-interval add-paper 3000)))


(defn run-schedule-now
  "run some function right now"
  [f]
  (do
    (schedule f)
    (update-lexemes)))

(defn run-schedule
  "run some function that takes no args at 3 am every day"
  [f] (schedule f (-> (in (:update-time env) :minutes) (every :day))))

(defn run-lexeme-update
  "schedule the server to run an update on the lexemes for search"
  [] (schedule update-lexemes (-> (in (+ (:update-time env) 1) :hours))))
