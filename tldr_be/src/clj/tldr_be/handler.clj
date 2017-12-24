(ns tldr-be.handler
  (:require [compojure.core :refer [routes wrap-routes]]
            [tldr-be.layout :refer [error-page]]
            [tldr-be.routes.home :refer [home-routes bus-routes]]
            [compojure.route :as route]
            [tldr-be.env :refer [defaults]]
            [mount.core :as mount]
            [tldr-be.auth.core :as auth]
            [tldr-be.middleware :as middleware]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [ring.util.response :refer [redirect]]))

(mount/defstate init-app
                :start ((or (:init defaults) identity))
                :stop  ((or (:stop defaults) identity)))

(def app-routes
  (routes
   (-> #'home-routes ;; #' desugars into (var foo), its binding a thing to a var
       (wrap-routes middleware/wrap-csrf)
       (wrap-routes middleware/wrap-formats))
   (-> #'bus-routes
       (wrap-routes wrap-keyword-params)
       (wrap-routes wrap-json-body)
       (wrap-routes wrap-json-response)
       )
    (route/not-found
      (:body
        (error-page {:status 404
                     :title "page not found"})))))


(defn app [] (middleware/wrap-base #'app-routes))
