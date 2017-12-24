(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!]]))

(defn insert-doc
  "Given a request that holds a filename and a blob of file data, insert that blob
  into the db"
  [{body :body :as req}]
  (let [filename (get body "filename") file_blob (get body "data")]
    (if (and filename file_blob)
      (do ;; if we have both filename and blob then perform the effect
        (create-doc! {:filename filename :filestuff file_blob})
        {:status 201
         :body "all done!"})
      {:status 400 ;;else return a bad request
       :body "You should't be here..."})))
