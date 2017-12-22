(ns tldr-be.auth.handler
  (:require [tldr-be.auth.core :as auth]))

(defn create-auth-token
  "Takes a request, extracts the body from teh request and tries to authenticate
  and then generate a token if auth is good, if not sends back a 401 unauthed"
  [req]
  (let [[ok? res] (auth/create-auth-token (:params req))]
    (if ok?
      {:status 201 :body res}
      {:status 401 :body res})))
