(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!]]
            [ring.util.http-response :as http]))

(defn insert-doc!
  "Given a request that holds a filename and a blob of file data, insert that
  blob into the db"
  [{body :body :as req}]
  (let [filename (get body "filename") file_blob (get body "data")]
    (println req)
    (if (and filename file_blob)
      (do ;; if we have both filename and blob then perform the effect
        (create-doc! {:filename filename :filestuff file_blob})
        (http/created "Your document successfully uploaded"))
      (http/bad-request "Request Malformed"))))
