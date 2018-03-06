(ns tldr-be.test.db.core
  (:require [tldr-be.db.core :refer [*db*] :as db]
            [tldr-be.doc.core :as doc]
            [luminus-migrations.core :as migrations]
            [clojure.test :refer :all]
            [clojure.java.jdbc :as jdbc]
            [clojure.java.io :as io]
            [byte-streams :as bs]
            [tldr-be.config :refer [env]]
            [mount.core :as mount]
            [byte-streams :as bs]))

(use-fixtures
  :once
  (fn [f]
    (mount/start
      #'tldr-be.config/env
      #'tldr-be.db.core/*db*)
    (migrations/migrate ["migrate"] (select-keys env [:database-url]))
    (f)))

(defn clear
  [test]
  (jdbc/with-db-transaction [*db* *db*]
    (test)
    (jdbc/db-set-rollback-only! *db*)))

(use-fixtures :each clear)

(deftest insert-bananas-lenses
  (testing "create doc on bananas_lenses")
  (let [response (db/create-doc! {:filename "bananas_lenses"
                                  :title "Function Programming with Bananas, Lenses, Envelopes, and Barbed Wire"
                                  :filestuff (bs/to-byte-array (io/input-stream "test/papers/bananas_lenses.pdf"))})]
    (is (= 1 response))))

(deftest get-id-bananas-lenses
  (testing "check to make sure bananas_lenses is in the db")
  (let [response (db/get-doc-id {:filename "bananas_lenses"})]
    (is (= 1 (response :id)))))

(deftest get-bananas-lenses
  (testing "get bananas_lenses file out of the db")
  (let [response (db/get-doc-by-filename {:filename "bananas_lenses"})]
    (is (< 1 (-> response :filestuff count )))))
