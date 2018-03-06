(ns tldr-be.utils.macros)

(defmacro swallow-exceptions [& body]
  `(try ~@body (catch Exception e#)))
