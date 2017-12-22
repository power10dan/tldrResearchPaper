(ns tldr-be.routes.home
  (:require [tldr-be.layout :as layout]
            [compojure.core :refer [defroutes GET POST]]
            [ring.util.http-response :as response]
            [buddy.auth.accessrules :refer [restrict]]
            [tldr-be.auth.handler :as handler]
            [tldr-be.auth.core :as auth]
            [clojure.java.io :as io]))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defn on-error
  [request value]
  {:status 403
   :headers {}
   :body "Not Authorized"})

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page)))

(defroutes bus-routes
  (POST "/create-auth-token" [] handler/create-auth-token)
  (GET "/get-user" [] (restrict handler/get-user {:handler auth/is-auth?
                                                  :on-error on-error})))
