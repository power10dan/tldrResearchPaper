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
         add-new (fn [a b c] (conj c {a b}))]
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

(defn flip [function]
  "takes func a->b->c and transfroms it to b->a->c"
  (fn
    ([] (function))
    ([x] (function x))
    ([x y] (function y x))
    ([x y z] (function z y x))
    ([a b c d] (function d c b a))
    ([a b c d & rest
        (->> rest
            (concat [a b c d])
            reverse
            (apply function))])))
