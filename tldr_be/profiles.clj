;; WARNING
;; The profiles.clj file is used for local environment variables, such as database credentials.
;; This file is listed in .gitignore and will be excluded from version control by Git.

{:profiles/dev  {:env {:database-url "jdbc:postgresql://localhost/tldr_be_dev?user=db_user_name_here&password=db_user_password_here"
                       :neo4j-db-url "http://neo4j:password@localhost:7474/db/data"}}
 :profiles/test {:env {:database-url "jdbc:postgresql://localhost/tldr_be_test?user=db_user_name_here&password=db_user_password_here"}}
 :profiles/prod {:env {:database-url "jdbc:postgresql://zjueouvmmbjbvz:20a795e87069343d5b283c3974ea061bc420036c88a27decd07752649c2344ba@ec2-54-227-244-122.compute-1.amazonaws.com:5432/d2b59nievcgn3p?user=zjueouvmmbjbvz&password=20a795e87069343d5b283c3974ea061bc420036c88a27decd07752649c2344ba"
                       :neo4j-db-url "https://app87302872-N2QaDg:b.4rsLGYPKQfiz.w7QaJuQk1c4ocmxv@hobby-cjlamlpgpijggbkenjcimnal.dbs.graphenedb.com:24780"}}
 :profiles/staging {:env {:database-url "jdbc:postgresql://ezgqlhfopuhwdy:4fc9c6b1f1862a8e871ede0e002b47f6ae6d9cf56b8e6f5c65d25858cd89ebe1@ec2-107-22-175-33.compute-1.amazonaws.com:5432/d1ucl7kj2aq4hk"
                          :neo4j-db-url "https://app88579349-KjkWZP:b.LlX6MWTA8VPt.WhqNACnM7AqslXTs@hobby-bnhcjicnhajogbkebmoapoal.dbs.graphenedb.com:24780"}}}
