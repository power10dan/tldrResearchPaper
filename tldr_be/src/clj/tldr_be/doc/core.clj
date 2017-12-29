(ns tldr-be.doc.core
  (:require [tldr-be.db.core :refer [create-doc!]]
            [clojure.string :refer [split]]
            [byte-streams :as bs]))

(defn insert-doc!
  "Given params from a request, pull the filename and a blob of file data, insert
  that blob into the db after transforming blob to byte-array"
  [params]
  (let [filename (get-in params [:file :filename])
        file_blob (get-in params [:file :tempfile])]
    (if (and filename file_blob)
      (do ;; if we have both filename and blob then perform the effect
        (create-doc! {:filename (first (split filename #"\.")) ;;fname is basename
                      :filestuff (bs/to-byte-array file_blob)})
        [true "Your document successfully uploaded"])
      [false "Request Malformed"])))
