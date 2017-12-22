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
