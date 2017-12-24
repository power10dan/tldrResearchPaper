(ns tldr-be.auth.handler
  (:require [tldr-be.auth.core :as auth]))


(defn create-auth-token
  "Given a request that specifies a username and password, check that the username
  can be authenticated, if so, return a token and a 201 created response
  otherwise hit em with a saucy 401 unauth"
  [req]
  (let [[ok? res] (auth/create-auth-token (:params req))]
    (if ok?
      {:status 201 :body res}
      {:status 401 :body res})))

(defn get-user
  "this is just a proof of concept function, see routes/home.clj for an example
  of how to protect a route"
  [{headers :headers :as req}]
  (if-let [token (get headers "token")] ;;headers is a map with keys of type Str
    {:status 201
     :body "Hello your token is"}
    {:status 401
     :body "You should't be here..."}))
