(ns tldr-be.env
  (:require [clojure.tools.logging :as log]
            [tldr-be.crawler.runner :refer [run-schedule
                                            populate
                                            run-lexeme-update]]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[tldr_be started successfully]=-")
     (run-schedule populate)
     (run-lexeme-update))
   :stop
   (fn []
     (log/info "\n-=[tldr_be has shut down successfully]=-"))
   :middleware identity})
