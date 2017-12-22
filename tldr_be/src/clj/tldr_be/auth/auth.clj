(ns tldr-be.auth.auth
  (:require [cheshire.core :as json]
            [tldr-be.db.core :refer [get-user-by-name-pass]]
            [tldr-be.middleware :as middleware]
            [buddy.core.nonce :refer [random-bytes]]
            [buddy.auth.backends :as backends]
            [buddy.sign.jwt :as jwt]
            [clj-time.core :refer [plus now minutes]]
            [ring.util.response :refer [redirect]]))

;; this is the secret key
(def secret (random-bytes 32))

;; this is the backend that will be handled in the middleware, see the buddy docs
(def token-backend
  (backends/jws {:secret secret}))

(defn token
  "Given a username and a key, generate a unique token for that user name with an
  expiration time of an hour from now"
  [username key]
  (let [claims {:user (keyword username)
                :exp (plus (now) (minutes 60))}]
    (jwt/sign claims key)))

(defn do-login
  "Given a request, get the username and password out of the request, check that
  the user exists in the db, if good then return a 200 with a token, if not then
  redirect to the home page"
  [request]
  (let [data (:form-params request)]
    (if-let [user (get-user-by-name-pass {:first_name (:username data)
                                          :pass (:password data)})]
      {:status 200
       :headers {:content-type "application/json"}
       :body (json/encode {:token (middleware/token user middleware/secret)})}
      (redirect "/"))))
