;; WARNING
;; The profiles.clj file is used for local environment variables, such as database credentials.
;; This file is listed in .gitignore and will be excluded from version control by Git.

{:profiles/dev  {:env {:database-url "jdbc:postgresql://localhost/tldr_database?user=daniellin&password=soccer2005^&"
                       :neo4j-db-url "http://neo4j:password@localhost:7474/db/data"}}
 :profiles/test {:env {:database-url "jdbc:postgresql://localhost/tldr_database?user=daniellin&password=soccer2005^&"}}
 :profiles/prod {:env {:database-url "jdbc:postgresql://zjueouvmmbjbvz:20a795e87069343d5b283c3974ea061bc420036c88a27decd07752649c2344ba@ec2-54-227-244-122.compute-1.amazonaws.com:5432/d2b59nievcgn3p?user=zjueouvmmbjbvz&password=20a795e87069343d5b283c3974ea061bc420036c88a27decd07752649c2344ba"
                       :neo4j-db-url "https://app87302872-N2QaDg:b.4rsLGYPKQfiz.w7QaJuQk1c4ocmxv@hobby-cjlamlpgpijggbkenjcimnal.dbs.graphenedb.com:24780"}}}
