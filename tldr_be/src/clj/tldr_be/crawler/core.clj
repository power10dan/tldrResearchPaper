(ns tldr-be.crawler.core
  (:require [tldr-be.search.core :as src]
            [tldr-be.config :refer [env]]
            [clj-http.client :as http]
            [clojure.tools.logging :as log]
            [tldr-be.utils.macros :refer [swallow-exceptions]]
            [clojure.string :refer [join split]]
            [tldr-be.neo4j.core :as neo]))


(defn check-for-pdf
  "given a bing web site result map, check the url to see if its a pdf file"
  [result_map]
  (= "pdf" (join (take-last 3 (:url result_map)))))


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
  "Given a response that specifies a url, download the paper and try to insert it"
  [url title]
  (try
    (when url
      (http/post
       (str (:hostname env) ":" (:port env) "/api/uploadFile/")
       {:multipart [{:name "file"
                     :content (clojure.java.io/input-stream url)}]}))
    (catch Exception ex
      (neo/touch-node-by-title title))))


(defn add-paper
  "Given a paper title, search for the pdf via bing, get the top hit with a pdf
  tag, download that paper and add it to our database"
  [title]
  (log/info "TRYING TO ADD: " title)
  (let [res (src/search (:bing-key env) :web title)
        url (get-top-url res)]
    (log/info "Using URL: " url)
    (if url
      (insert-searched-paper url title)
      (neo/touch-node-by-title title))))
