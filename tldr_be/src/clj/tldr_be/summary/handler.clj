(ns tldr-be.summary.handler
  (:require [tldr-be.summary.core :as summary]
            [ring.util.http-response :as http]))

(defn insert-sum
  "Given a request that specifies a summary information, validate summary and
   if good, add to database, otherwise give a bad request"
  [req]
  (let [[ok? res] (summary/insert-sum! (:body req))]
    (if ok?
      (http/created res)
      (http/bad-request res))))
