(ns tldr-be.utils.core
  (:require [clojure.string :as str]
            [clojure.string :refer [split]]
            [ring.util.http-response :as http]
            [clojure.java.io :as io]
            [clojure.xml :as xml]))

(defn collect
  "Given a flat lazy seq like :key0 value0 :key0 value1 :key1 v2 where duplicate
  keys exist. This function collects all values of duplicate keys into a key
  vector pair e.g. (lazy-seq (k0 v0 k1 v1 k0 v2)) => {k0 [v0 v1] k1 v2}. Usage
  in this document should be: (map #(collect %) y)"
  ([coll]
   (when coll
     (let [add (fn [a b c] (if (not (vector? (a c)))
                            (update c a #(conj [%] b))
                            (update c a #(conj % b))))
           add-new (fn [a b c] (conj c {a [b]}))]
       (loop [[x y & tail] coll
              acc {}]
         (if (not x)
           acc
           (recur tail (cond
                         (contains? acc x) (add x y acc)
                         :else (add-new x y acc)))))))))

(defn escape-string
  "function accepts a string and returns one with specified characters removed."
  [str]
  (str/replace str "\"" "'"))

(defn parse-int [s]
  "given a messy string grab the numbers out of it and convert to integers"
  (try (Integer. (re-find  #"\d+" s ))
       (catch Exception ex
         nil)))

(def not-nil? (complement nil?))

(defn map-keys
  "Given a function and a map apply the function to every key in the map"
  [f m]
  (loop [[k & ks] (keys m)
         [v & vs] (vals m)
         acc {}]
    (if (not k)
      acc
      (recur ks vs (assoc acc (f k) v)))))


(defn massage-req
  "Given a request pull out titles and ids and process them returns a collection
  of valid titles and ids"
  [req]
  ;; TODO: Convert to middleware
  (let [to-vec (fn [a] (cond (coll? a) a (not-nil? a) (vector a) :else nil))
        massage-str (fn [a] (map #(format "'%s'" (str/replace % "\"" "")) a))
        ts (to-vec (get-in req [:query-params "title"]))
        is (to-vec (get-in req [:query-params "id"]))
        fs (to-vec (get-in req [:query-params "forename"]))
        ss (to-vec (get-in req [:query-params "surname"]))]
    (distinct (concat
               (when ts (massage-str ts))
               (when is (map parse-int is))
               (when fs (massage-str fs))
               (when ss (massage-str ss))))))


(defn response-wrapper
  "Given a function and a function to feed the first one and request call the
  function and wrap the response appropriately"
  [req f g]
  (let [[ok? res] (apply f g (massage-req req))]
    (if ok?
      {:status 200
       :headers {"Content-Type" "application/json"}
       :body res}
      (http/bad-request res))))

(defn get-basename
  "Given a file path, retrieve the basename (the stuff before the extension)"
  [filepath]
  (first (split filepath #"\.")))


(defn get-sections
  "take a nested xml clojure representation and pull out
  tags and respective content when content is a string"
  [grobid-map]
  (for [x (xml-seq grobid-map)
        :when (string? (first (:content x)))]
    [(if (= (:tag x) :biblScope)
       (-> x :attrs :unit keyword)
       (:tag x))
     (first (:content x))]))


;; TODO fix all this post processing
(defn make-sections
  "Given a vector of vectors, like the output of get-sections, group by title
  and add the title keyword to each entry"
  [vec_o_vecs]
  (->> vec_o_vecs
       flatten
       (partition-by #(= :title %))
       (filter #(not (= :title (first %))))
       (map #(doall (cons :title %)))))

(defn string->xml
  "Converts a string to an xml string"
  [string]
  (->> string .getBytes io/input-stream xml/parse))
