(ns tldr-be.crawler.runner
  (:require [tldr-be.config :refer [env]]
            [tldr-be.crawler.core :refer [get-top-url add-paper]]
            [tldr-be.utils.core :refer [doseq-interval]]
            [clj-time.core :as time]
            [clj-time.periodic :as per]
            [chime :refer [chime-at]]
            [tldr-be.neo4j.core :as neo]
            [clojure.tools.logging :as log])
  (:import [org.joda.time DateTimeZone]))


(defn populate
  "Given nothing, grab the most sparse children in the graph and try to find
  their pdfs, then add them to the neo4j database"
  [] (-> (neo/get-sparse-nodes 10) (doseq-interval add-paper 3000)))


(def populate-schedule
  "Run some function at 3:26 am every day"
  (->> (per/periodic-seq
        (.. (time/now)
            (withZone (DateTimeZone/forID "America/Los_Angeles"))
            (withTime 3 26 0 0)) ;; not sure this actually works
        (-> 1 time/days))))

(defn run-schedule
  "run some function that takes no args at the defined schedule"
  [f]
  (chime-at populate-schedule
            (fn [time]
              (log/info "Beginning Scheduled function: " f)
              (f)
              (log/info "All Done running: " f))))
