(ns tldr-be.crawler.core
  (:require [tldr-be.search.core :as src]
            [tldr-be.config :refer [env]]
            [clj-http.client :as http]
            [clojure.string :refer [join split]]
            [tldr-be.neo4j.core :as neo]))

;; grab children nodes
;; create a work queue with titles
;; search with bing for pdfs
;; filter the results for pdfs
;; hit the insert paper url

(defn check-for-pdf
  "given a string check the last three characters for the pdf extension"
  [string]
  #(= "pdf" (join (take-last 3 (:url %)))))


(defn get-filename
  "given a url try to get the filename"
  [url] (last (split url #"/")))


(defn get-top-url
  "Given the response from a bing request, filter the results to only have urls
  that end in pdf and return the top most url to query"
  [bing-resp]
  (when bing-resp
    (->> (filter check-for-pdf (get-in bing-resp [:webPages :value]))
         first
         :url)))


(defn insert-searched-paper
  "Given a url that specifies a url, download the paper and try to insert it"
  [url]
  (when (check-for-pdf url)
    (http/post
     (str (:hostname env) ":" (:port env) "/api/uploadFile/")
     {:multipart [{:name "file" :content (clojure.java.io/input-stream url)}]})))


(defn add-paper
  "Given a paper title, search for the pdf via bing, get the top hit with a pdf
  tag, download that paper and add it to our database"
  [title]
  (let [res (src/search (:bing-key env) :web title)
        url (get-top-url res)]
    (insert-searched-paper url)))
