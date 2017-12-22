(ns tldr-be.auth.auth
  (:require [cheshire.core :as json]
            [tldr-be.db.core :refer [get-user-by-name create-user!]]
            [buddy.core.nonce :refer [random-bytes]]
            [buddy.auth.backends :as backends]
            [buddy.sign.jwt :as jwt]
            [buddy.hashers :as hs]
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

(defn auth-create-user!
  "Given a first name, last name, email and password create a user with an
  encrypted password"
  [first_name last_name email pass]
  (let [hashed_pass (hs/encrypt pass)]
    (create-user! {:first_name first_name
                   :last_name last_name
                   :email email
                   :pass hashed_pass})))

(defn auth-user
  "Given credentials, get the username and password out of the request, check that
  the user exists in the db, if good then return a 200 with a token, if not then
  redirect to the home page"
  [creds]
  (let [unauthed [false {:message "Invalid username or password"}]]
    (if-let [user (get-user-by-name {:first_name (:username creds)})]
      (when (hs/check (:password creds) (:pass user)) ;;verify passwords match
        [true {:user (dissoc user :password)}])       ;;remove pass from token
      unauthed)))
