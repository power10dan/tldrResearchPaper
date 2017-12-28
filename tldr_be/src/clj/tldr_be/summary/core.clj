(ns tldr-be.summary.core
  (:require [tldr-be.db.core :refer [create-summary!]]
            [ring.util.http-response :as http]))

(defn insert-sum!
  "Insert a summary with the given information"
  [{body :body :as req}]
  (let [header (get body "header")
        author (get body "author")
        filename (get body "filename")
        summary (get body "summary")
        votes (get body "votes")
        doc_id (get body "doc_id")]

    (if (and header author filename summary votes doc_id)
      (do ;; if we have all of the required information, create summary
        (create-summary! {:header header :author author :filename filename :summary summary :votes votes :doc_id doc_id})
        (http/created "Summary successfully created"))
      (http/bad-request "Request Malformed"))))
