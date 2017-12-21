(ns tldr-be.handler
  (:require [compojure.core :refer [routes wrap-routes]]
            [tldr-be.layout :refer [error-page]]
            [tldr-be.routes.home :refer [home-routes]]
            [tldr-be.routes.services :refer [service-routes]]
            [compojure.route :as route]
            [tldr-be.env :refer [defaults]]
            [mount.core :as mount]
            [buddy.sign.jwt :as jwt]
            [cheshire.core :as json]
            [tldr-be.middleware :as middleware]
            [ring.util.response :refer [redirect]]))

(mount/defstate init-app
                :start ((or (:init defaults) identity))
                :stop  ((or (:stop defaults) identity)))

(defn do-login
  "Given a request, get the username and password out of the request, check that
  the user exists in the db, if good then return a 200 with a token, if not then
  redirect to the home page"
  [request]
  (let [data (:form-params request)]
    (if-let [user (get-user (:username data) ;;get-user needs implementation
                            (:password data))]
      {:status 200
       :headers {:content-type "application/json"}
       :body (json/encode {:token (middleware/token user middleware/secret)})}
      (redirect "/"))))

(def app-routes
  (routes
    (-> #'home-routes
        (wrap-routes middleware/wrap-csrf)
        (wrap-routes middleware/wrap-formats))
    #'service-routes
    (route/not-found
      (:body
        (error-page {:status 404
                     :title "page not found"})))))


(defn app [] (middleware/wrap-base #'app-routes))
