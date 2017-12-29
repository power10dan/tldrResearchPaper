(ns tldr-be.summary.core
  (:require [tldr-be.db.core :refer [up-votes! down-votes! create-summary!]]
            [ring.util.http-response :as http]))

(defn insert-sum!
  "Insert a summary with the given information"
  [body]
  (let [header (get body "header")
        author (get body "author")
        doc_id (get body "doc_id")
        summary (get body "summary")]

    (if (and header author summary doc_id)
      (do ;; if we have all of the required information, create summary
        (create-summary! {:header header
                          :author author
                          :summary summary
                          :doc_id doc_id})
        [true "Summary successfully created"])
      [false "Request Malformed"])))

(defn _vote-sum!
  "Given a request body, a success message and a function that either up-votes or
  down-votes, grab all necessary stuff out of the body and call the function"
  [body msg f]
  (let [header (get body "header")
        author (get body "author")
        doc_id (get body "doc_id")]

    (if (and header author doc_id)
      (do ;; if we have all of the required information, down vote
        (f {:header header
            :author author
            :doc_id doc_id})
        [true msg])
      [false "Request Malformed"])))

(defn up-vote-sum!
  [body]
  (_vote-sum! body "upvote succesful" up-votes!))

(defn down-vote-sum!
  [body]
  (_vote-sum! body "downvote successful" down-votes!))