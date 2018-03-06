;; WARNING
;; The profiles.clj file is used for local environment variables, such as database credentials.
;; This file is listed in .gitignore and will be excluded from version control by Git.

{:profiles/dev  {:env {:database-url "jdbc:postgresql://localhost/tldr_database?user=daniellin&password=soccer2005^&"
                       :neo4j-db-url "http://neo4j:password@localhost:7474/db/data"}}
 :profiles/test {:env {:database-url "jdbc:postgresql://localhost/tldr_be_test?user=db_user_name_here&password=db_user_password_here"}}
 :profiles/prod {:env {:database-url "jdbc:postgresql://uqigickuuzalxs:4a983bbd18d1788fc5187d0f24ab6c37b33dabdab444293723dab3601f095ad2@ec2-184-73-196-65.compute-1.amazonaws.com:5432/d2t468ltf9ppbg"
                       :neo4j-db-url "https://app87302872-N2QaDg:b.4rsLGYPKQfiz.w7QaJuQk1c4ocmxv@hobby-cjlamlpgpijggbkenjcimnal.dbs.graphenedb.com:24780"}}
 :profiles/staging {:env {:database-url "jdbc:postgresql://bolsedqisieifz:d4a4541e159369adfcffcef70b281d927f20ec8119cea6720bcb1ccca1c1b616@ec2-184-73-196-65.compute-1.amazonaws.com:5432/d1289vkh76sjm3"
                          :neo4j-db-url "https://app88579349-KjkWZP:b.LlX6MWTA8VPt.WhqNACnM7AqslXTs@hobby-bnhcjicnhajogbkebmoapoal.dbs.graphenedb.com:24780"}}}
