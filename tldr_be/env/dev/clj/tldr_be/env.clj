(ns tldr-be.env
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [tldr-be.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[tldr_be started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[tldr_be has shut down successfully]=-"))
   :middleware wrap-dev})
