(defproject tldr_be "0.1.0-SNAPSHOT"

  :description "FIXME: write description"
  :url "http://example.com/FIXME"

  :dependencies [[buddy "2.0.0"]
                 [cider/cider-nrepl "0.15.1-SNAPSHOT"]
                 [clj-time "0.14.2"]
                 [compojure "1.6.0"]
                 [conman "0.7.4"]
                 [cprop "0.1.11"]
                 [funcool/struct "1.1.0"]
                 [luminus-immutant "0.2.4"]
                 [luminus-migrations "0.4.3"]
                 [luminus-nrepl "0.1.4"]
                 [luminus/ring-ttl-session "0.3.2"]
                 [markdown-clj "1.0.1"]
                 [metosin/compojure-api "1.1.11"]
                 [metosin/muuntaja "0.4.1"]
                 [metosin/ring-http-response "0.9.0"]
                 [mount "0.1.11"]
                 [org.clojure/clojure "1.9.0"]
                 [org.clojure/tools.nrepl "0.2.12"]
                 [org.clojure/tools.cli "0.3.5"]
                 [org.clojure/tools.logging "0.4.0"]
                 [org.postgresql/postgresql "42.1.4"]
                 [org.webjars.bower/tether "1.4.0"]
                 [org.webjars/bootstrap "4.0.0-alpha.5"]
                 [org.webjars/font-awesome "4.7.0"]
                 [org.webjars/jquery "3.2.1"]
                 [ring-webjars "0.2.0"]
                 [cheshire "5.8.0"]
                 [ring/ring-core "1.6.3"]
                 [ring/ring-defaults "0.3.1"]
                 [ring/ring-json "0.4.0"]
                 [ring-cors "0.1.11"]
                 [clj-http "2.3.0"]
                 [byte-streams "0.2.3"]
                 [selmer "1.11.3"]
                 [tuddman/neocons "3.2.1-SNAPSHOT"]]

  :min-lein-version "2.0.0"

  :jvm-opts ["-server" "-Dconf=.lein-env"]
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :resource-paths ["resources"]
  :target-path "target/%s/"
  :main ^:skip-aot tldr-be.core
  :migratus {:store :database :db ~(get (System/getenv) "DATABASE_URL")}

  :plugins [[lein-cprop "1.0.3"]
            [migratus-lein "0.5.3"]
            [lein-immutant "2.1.0"]
            [lein-heroku "0.5.3"]]

  :heroku {:app-name "afternoon-ocean-38536"
           :jdk-version "1.8"
           :include-files ["target/tldr_be.jar"]}


  :profiles
  {:uberjar {
             ;; :omit-source true
             :uberjar-name "tldr_be.jar"
             :aot [tldr-be.env
                   tldr-be.config
                   tldr-be.auth.core
                   tldr-be.auth.handler
                   tldr-be.summary.core
                   tldr-be.summary.handler
                   tldr-be.neo4j.core
                   tldr-be.neo4j.handler
                   tldr-be.core
                   tldr-be.utils.core
                   tldr-be.middleware
                   tldr-be.handler
                   tldr-be.db.core
                   tldr-be.layout
                   tldr-be.doc.core
                   tldr-be.doc.pdf-parse
                   tldr-be.doc.handler
                   tldr-be.doc.engines
                   tldr-be.routes.services
                   tldr-be.routes.home]
             ;; :source-paths ["env/prod/clj"]
             ;; :env {:production true}
             }

   :prod          [:project/prod :profiles/prod]
   :dev           [:project/dev :profiles/dev]
   :test          [:project/dev :project/test :profiles/test]

   :project/dev  {:dependencies [[prone "1.1.4"]
                                 [ring/ring-mock "0.3.2"]
                                 [ring/ring-devel "1.6.3"]
                                 [pjstadig/humane-test-output "0.8.3"]]
                  :plugins      [[com.jakemccrary/lein-test-refresh "0.19.0"]]

                  :source-paths ["env/dev/clj"]
                  :resource-paths ["env/dev/resources"]
                  :repl-options {:init-ns user}
                  :injections [(require 'pjstadig.humane-test-output)
                               (pjstadig.humane-test-output/activate!)]
                  :test-refresh {:quiet true
                                 :changes-only true}}

   :project/test {:resource-paths ["env/test/resources"]}
   :project/prod {:resource-paths ["env/prod/resources"]
                  :source-paths ["env/prod/clj"]}
   :profiles/dev {}
   :profiles/test {}
   :profiles/prod {}})
