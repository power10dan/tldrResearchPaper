(ns tldr-be.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[tldr_be started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[tldr_be has shut down successfully]=-"))
   :middleware identity})
