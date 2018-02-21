(ns tldr-be.env
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [tldr-be.crawler.runner :refer [run-schedule populate]]
            [immutant.scheduling :refer :all]
            [immutant.scheduling.joda :refer :all]
            [clj-time.core :as time]
            [tldr-be.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[tldr_be started successfully using the development profile]=-")
     (run-schedule populate))
   :stop
   (fn []
     (log/info "\n-=[tldr_be has shut down successfully]=-"))
   :middleware wrap-dev})
