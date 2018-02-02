(ns tldr-be.doc.pdf-parse
  (:require [clojure.string :refer [split]]
            [byte-streams :as bs]
            [clj-http.client :as client]
            [tldr-be.config :refer [env]]
            [clojure.java.io :as io]))

(defn pdf-engine
  "Given a byte array, fblob, and a key, k, this function returns a function that
  accepts a fileblob and runs the restful pdf service that is named by the key
  k"
  [fblob k]
  (client/post (k env)
               {:multipart
                [{:name "Content/type" :content "application/pdf"}
                 {:name "input" :content (io/input-stream fblob)}]}))

(defn pdf-ref-parser
  "given a byte array, fileblob, this function packages up the blob to send
  restfully to the pdf parser. Returns a response with the parsed xml in the
  body"
  [fileblob]
  (pdf-engine fileblob :grobid-ref))

(defn pdf-header-parser
  "given a byte array, fileblob, this function packages up the blob to send
  restfully to the pdf parser. Returns a response with the parsed xml in the
  body"
  [fileblob]
  (pdf-engine fileblob :grobid-hed))
