;; WARNING
;; The profiles.clj file is used for local environment variables, such as database credentials.
;; This file is listed in .gitignore and will be excluded from version control by Git.

{:profiles/dev  {:env {:database-url "jdbc:postgresql://localhost/tldr_be_dev?user=db_user_name_here&password=db_user_password_here"
                       :neo4j-db-url "http://neo4j:password@localhost:7474/db/data"}}
 :profiles/test {:env {:database-url "jdbc:postgresql://localhost/tldr_be_test?user=db_user_name_here&password=db_user_password_here"}}
 :profiles/prod {:env {:database-url "jdbc:postgres://maqcdhaohcqvdj:1e3eaf3ec6f80960c04c22c508715e77992647caa978fdb8b2a4f1dfbea3f373@ec2-54-197-233-123.compute-1.amazonaws.com:5432/d2gc3opuk7ubp6d2gc3opuk7ubp6?user=maqcdhaohcqvdj&password=1e3eaf3ec6f80960c04c22c508715e77992647caa978fdb8b2a4f1dfbea3f373"
                       :neo4j-db-url "https://app87227172-fByoXx:b.oZ3vOCbuU7Rp.Bbc7YK5UUx8tdP1J@app87227172-fByoXx:b.oZ3vOCbuU7Rp.Bbc7YK5UUx8tdP1J@hobby-gbfekckcemaigbkejaleknal.dbs.graphenedb.com:24780"}}}
