(ns tldr-be.search.core
(:require [clj-http.client :as http]
          [clj-http.util :refer [url-encode]]
          [cheshire.core :as csh]
          [tldr-be.config :refer [env]]
          [tldr-be.utils.core :refer [not-nil?]]))


(defn parse-opts
  "convert options to a uri query string fragment"
  [opts]
  (clojure.string/join (map (fn [[k v]]
         (let [k (name k)
               v (if (keyword? v) (name v) v)]
           (str "&" k "=" v))) opts)))


(defn encode-quotes
  "wraps argument in encoded single quotes and uri encodes it"
  [{term :term encode :encode}]
  (let [term (if (= encode false) term (url-encode term))]
    (str "%27" term "%27")))


(defn search
  "https request to bing api, returns {:result <parsed body> :response <http
  response map>} Example use: (search (:bing-key env) :web \"propositions as types\") Returns a
  clojure map of the parsed response"
  ([bing-key inf term] (search bing-key inf term {}))
  ([bing-key inf term opts]
   (if bing-key
     (let [params (parse-opts (dissoc opts :encode))
           term (encode-quotes {:term term :encode (opts :encode)})
           inf (clojure.string/capitalize (name inf))
           headers {:headers {:Ocp-Apim-Subscription-Key bing-key}}
           url (str "https://api.cognitive.microsoft.com/bing/v7.0/search"
                    "?q=" term params)
           resp (http/get url headers)]
       (csh/parse-string (:body resp) keyword))
     nil)))
