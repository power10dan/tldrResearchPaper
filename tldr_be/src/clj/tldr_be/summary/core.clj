(ns tldr-be.summary.core
  (:require [tldr-be.db.core :refer [create-summary!]]
            [tldr-be.db.core :refer [up-votes!]]
            [tldr-be.db.core :refer [down-votes!]]
            [ring.util.http-response :as http]))

(defn insert-sum!
  "Insert a summary with the given information"
  [body]
  (let [header (get body "header")
        author (get body "author")
        filename (get body "filename")
        summary (get body "summary")
        votes (get body "votes")
        doc_id (get body "doc_id")]

    (if (and header author filename summary votes doc_id)
      (do ;; if we have all of the required information, create summary
        (create-summary! {:header header
                          :author author
                          :filename filename
                          :summary summary
                          :votes votes
                          :doc_id doc_id})
        [true "Summary successfully created"])
      [false "Request Malformed"])))

(defn up-vote-sum!
  "increment (by 1) the votes for a given summary"
  [body]
  (let [header (get body "header")
        author (get body "author")
        filename (get body "filename")
        summary (get body "summary")
        doc_id (get body "doc_id")]

    (if (and header author filename summary doc_id)
      (do ;; if we have all of the required information, up vote
        (up-votes! {:header header
                    :author author
                    :filename filename
                    :summary summary
                    :doc_id doc_id})
        [true "upvote succesful"])
      [false "Request Malformed"])))

(defn down-vote-sum!
  "decrement (by 1) the votes for a given summary"
  [body]
  (let [header (get body "header")
        author (get body "author")
        filename (get body "filename")
        summary (get body "summary")
        doc_id (get body "doc_id")]

    (if (and header author filename summary doc_id)
      (do ;; if we have all of the required information, down vote
        (down-votes! {:header header
                      :author author
                      :filename filename
                      :summary summary
                      :doc_id doc_id})
        [true "downvote succesful"])
      [false "Request Malformed"])))
