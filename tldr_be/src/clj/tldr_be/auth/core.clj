(ns tldr-be.auth.core
  (:require [tldr-be.db.core :refer [get-user-by-name create-user!]]
            [buddy.auth.backends :as backends]
            [buddy.sign.jwt :as jwt]
            [buddy.hashers :as hs]
            [clj-time.core :as t]
            [ring.util.response :refer [redirect]]))

;; this is the secret key
;; TODO beef up this with a public private key encryption scheme
(def secret "mylittlesecret")

;; this is the backend that will be handled in the middleware, see the buddy docs
(def token-backend
  (backends/jws {:secret secret}))


(defn _token
  "Given a username and a key, generate a unique token for that user name with an
  expiration time of an hour from now"
  [username key]
  (let [claims {:user (keyword username)
                :exp (-> (t/plus (t/now) (t/days 1)))
                :secret secret}]
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
  the user exists in the db, if good then return vector with true and the token
  if bad then return a vector with false and a message"
  [creds]
  (let [unauthed [false {:message "Invalid username or password"}]]
    (if-let [user (get-user-by-name {:first_name (:username creds)})]
      (when (hs/check (:password creds) (:pass user)) ;;verify passwords match
        [true {:user (dissoc user :password)}])       ;;remove pass from token
      unauthed)))


(defn create-auth-token
  "Given credentials, form a response if the user can be auth'd. if they can be
  return an auth token"
  [creds]
  (let [[ok? res] (auth-user creds)] ;;using clojure destructuring for the "ok?"
    (if ok?
      [true {:token (_token (:username creds) secret)}]
      [false res])))

(defn is-auth?
  "given a request, destructure to pull the header out, then check if the header
  has a token if it does then unsign and verify against the secret"
  [{headers :headers :as req}]
  (let [token (get headers "token")]
    (if token
      (= secret (:secret (jwt/unsign token secret)))
      false)))
