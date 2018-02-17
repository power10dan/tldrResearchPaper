(ns tldr-be.crawler.core
  (:require [tldr-be.search.core :as src]
            [tldr-be.neo4j.core :as neo]))

;; grab children nodes
;; create a work queue with titles
;; search with bing for pdfs
;; filter the results for pdfs
;; hit the insert paper url
