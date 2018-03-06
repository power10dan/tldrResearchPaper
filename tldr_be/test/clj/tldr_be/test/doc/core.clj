(ns tldr-be.test.doc.core
  (:require [tldr-be.db.core :refer [*db*] :as db]
            [tldr-be.doc.core :as doc]
            [luminus-migrations.core :as migrations]
            [clojure.test :refer :all]
            [clojure.java.jdbc :as jdbc]
            [clojure.java.io :as io]
            [byte-streams :as bs]
            [tldr-be.config :refer [env]]
            [mount.core :as mount]))

(use-fixtures
  :once
  (fn [f]
    (mount/start
     #'tldr-be.config/env
     #'tldr-be.db.core/*db*)
    (migrations/migrate ["migrate"] (select-keys env [:database-url]))
    (f)))

(use-fixtures :each
  ;; (mount/start
  ;;  #'tldr-be.config/env
  ;;  #'tldr-be.db.core/*db*)
  ;; (migrations/migrate ["reset"] (select-keys env [:database-url])))

(defn clear
  [test]
  (jdbc/with-db-transaction [trans *db*]
    (jdbc/db-set-rollback-only! trans)
    (binding [*db* trans] (test))))


(deftest insert-bananas-lenses
  (testing "insert doc on bananas_lenses with no title")
  (let [response (doc/insert-doc!
                  {:file
                   {:filename "bananas_lenses"
                    :filestuff (bs/to-byte-array
                                (io/input-stream
                                 "test/papers/bananas_lenses.pdf"))}})]
    (is (= 1 response))))


(deftest get-title-bananas-lenses
  (testing "bananas and lenses title can be parsed by grobid and matched exactly")
  (let [response (db/get-doc-by-id {:pgid 1})]
    (is (= "Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire"
           (first (:title (doc/process-headers "bananas_lenses")))))))

;; (deftest bananas-lenses-refs
;;   (testing "bananas and lenses should always have the same number of references"
;;     (is (= 31 (count (doc/process-refs "bananas_lenses"))))))
