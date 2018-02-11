(ns tldr-be.routes.home
  (:require [tldr-be.layout :as layout]
            [compojure.core :refer [defroutes GET POST]]
            [ring.util.http-response :as http]
            [buddy.auth.accessrules :refer [restrict]]
            [tldr-be.auth.handler :as auth_handler]
            [tldr-be.summary.handler :as sum_handler]
            [tldr-be.auth.core :as auth]
            [tldr-be.doc.handler :as d]
            [tldr-be.neo4j.handler :as neo]
            [tldr-be.summary.core :as summary]
            [clojure.java.io :as io]))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defn on-error
  [request value]
  http/unauthorized "Not Authorized!")

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page)))

(defroutes bus-routes ;;business-routes
  (POST "/api/uploadFile/"       [] d/insert-doc!)
  (GET "/api/getFile/"           [] d/get-doc)
  (GET  "/api/getChildrenUnion/" [] neo/get-all-children)
  (GET  "/api/getChildrenInter/" [] neo/get-all-shared-children)
  (GET  "/api/getChildrenUnionBy/" [] neo/get-all-children-by)
  (GET  "/api/getChildrenInterBy/" [] neo/get-all-shared-children-by)
  (GET  "/api/getNumNodes/"      [] neo/get-nodes)
  ;; (POST "/api/addSummary/"    [] sum_handler/insert-sum)
  ;; (POST "/api/sumUpVote/"     [] sum_handler/up-vote-sum)
  ;; (POST "/api/sumDownVote/"   [] sum_handler/down-vote-sum)
  (POST "/login/" [] auth_handler/create-auth-token)
  (GET "/get-user" [] (restrict auth_handler/get-user {:handler auth/is-auth?
                                                       :on-error on-error})))
