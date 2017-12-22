(ns tldr-be.routes.home
  (:require [tldr-be.layout :as layout]
            [compojure.core :refer [defroutes GET POST]]
            [ring.util.http-response :as response]
            [tldr-be.auth.handler :as handler]
            [clojure.java.io :as io]))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page)))

(defroutes bus-routes
  (POST "/create-auth-token" [] handler/create-auth-token))
