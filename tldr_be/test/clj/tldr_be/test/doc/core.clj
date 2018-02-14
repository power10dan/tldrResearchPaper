(ns tldr-be.test.doc.core
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

(deftest get-title-bananas-lenses
  (testing "bananas and lenses title can be parsed by grobid and matched exactly")
  (let [response (db/get-doc-by-id {:id 1})]
    (is (= "Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire"
           (first (:title (doc/process-headers "bananas_lenses")))))))

(deftest bananas-lenses-refs
  (testing "bananas and lenses should always have the same number of references"
    (is (= 31 (count (doc/process-refs "bananas_lenses"))))))

(deftest bananas-lenses-affils
  (testing "banansh and lenses should always have the same affiliates")
  (is (= "asdf") (doc/process-affiliates)))
