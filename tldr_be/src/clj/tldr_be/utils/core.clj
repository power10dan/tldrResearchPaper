(ns tldr-be.utils.core
  (:require [clojure.string :as str]))

(defn collect
  "Given a flat lazy seq like :key0 value0 :key0 value1 :key1 v2 where duplicate
  keys exist. This function collects all values of duplicate keys into a key
  vector pair e.g. (lazy-seq (k0 v0 k1 v1 k0 v2)) => {k0 [v0 v1] k1 v2}. Usage
  in this document should be: (map #(collect %) y)"
  ([coll]
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
                       :else (add-new x y acc))))))))

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
