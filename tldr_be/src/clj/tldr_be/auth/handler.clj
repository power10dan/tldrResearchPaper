(ns tldr-be.auth.handler
  (:require [tldr-be.auth.core :as auth]
            [ring.util.http-response :as http]))


(defn create-auth-token
  "Given a request that specifies a username and password, check that the username
  can be authenticated, if so, return a token and a 201 created response
  otherwise hit em with a saucy 401 unauth"
  [req]
  (let [[ok? res] (auth/create-auth-token (:params req))]
    (if ok?
      (http/created)
      (http/bad-request))))

(defn get-user
  "this is just a proof of concept function, see routes/home.clj for an example
  of how to protect a route"
  [{headers :headers :as req}]
  (if-let [token (get headers "token")] ;;headers is a map with keys of type Str
    (http/created "This was merely a test")
    (http/created "this is just the co of the test")))
