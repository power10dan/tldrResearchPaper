(ns tldr-be.routes.home
  (:require [tldr-be.layout :as layout]
            [compojure.core :refer [defroutes GET POST]]
            [ring.util.http-response :as http]
            [buddy.auth.accessrules :refer [restrict]]
            [tldr-be.auth.handler :as auth_handler]
            [tldr-be.auth.core :as auth]
            [tldr-be.doc.handler :as d]
            [tldr-be.crawler.runner :refer [run-schedule populate]]
            [tldr-be.neo4j.handler :as neo]
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
  (GET "/api/searchByTerm/"       [] d/search-postgres)
  (GET  "/api/getChildrenUnion/" [] neo/get-all-children)
  (GET  "/api/getChildrenInter/" [] neo/get-all-shared-children)
  (GET  "/api/getChildrenUnionBy/" [] neo/get-all-children-by)
  (GET  "/api/getChildrenInterBy/" [] neo/get-all-shared-children-by)
  (GET  "/api/getNumNodes/"      [] neo/get-nodes)
  (GET "/api/getSubGraph/"       [] neo/get-subgraph)
  (GET "/api/getRecChildren/"       [] neo/get-recommended-children)
  (GET "/api/getRec/"       [] neo/get-recommended)
  (POST "/login/" [] auth_handler/create-auth-token)
  (Post "runDispatcher" [] (run-schedule populate))
  (GET "/get-user" [] (restrict auth_handler/get-user {:handler auth/is-auth?
                                                       :on-error on-error})))
