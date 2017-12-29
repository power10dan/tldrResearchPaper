(ns tldr-be.doc.handler
  (:require [tldr-be.doc.core :as doc]))


(defn insert-doc!
  "Given a request that specifies a summary information, validate summary and
   if good, add to database, otherwise give a bad request"
  [req]
  (let [[ok? res] (doc/insert-sum! (:params req))] ;;params gen'd by middleware
    (if ok?
      (http/created res)
      (http/bad-request res))))
