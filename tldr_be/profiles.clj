;; WARNING
;; The profiles.clj file is used for local environment variables, such as database credentials.
;; This file is listed in .gitignore and will be excluded from version control by Git.

{:profiles/dev  {:env {:database-url "jdbc:postgresql://localhost/tldr_be_dev?user=db_user_name_here&password=db_user_password_here"
                       :neo4j-db-url "http://neo4j:password@localhost:7474/db/data"}}
 :profiles/test {:env {:database-url "jdbc:postgresql://localhost/tldr_be_test?user=db_user_name_here&password=db_user_password_here"}}}
