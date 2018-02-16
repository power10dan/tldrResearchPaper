-- :name create-user! :! :n
-- :doc creates a new user record
INSERT INTO users
(first_name, last_name, email, pass)
VALUES (:first_name, :last_name, :email, :pass)

-- :name update-user! :! :n
-- :doc updates an existing user record
UPDATE users
SET first_name = :first_name, last_name = :last_name, email = :email
WHERE id = :id

-- :name get-user :? :1
-- :doc retrieves a user record given the id
SELECT * FROM users
WHERE id = :id

-- :name get-user-by-name :? :n
-- :doc retrieves a user record given the first name
SELECT * FROM users
WHERE first_name = :first_name

-- :name get-user-by-name-pass :? :n
-- :doc retrieves a user record given the first name
SELECT * FROM users
WHERE first_name = :first_name AND pass = :pass

-- :name get-user-by-last-name :? :n
-- :doc retrieves a user record given the last name
SELECT * FROM users
WHERE last_name = :last_name

-- :name get-user-by-email :? :n
-- :doc retrieves a user record given the email
SELECT * FROM users
WHERE email = :email

-- :name delete-user! :! :n
-- :doc deletes a user record given the id
DELETE FROM users
WHERE id = :id



-- :name create-doc! :! :n
-- :doc creates a new document record
INSERT INTO docs
(pgid, filestuff)
VALUES (:pgid, :filestuff)

-- :name get-doc-by-id :? :1
-- :doc retrieves a document given the
SELECT * FROM docs
WHERE pgid = :pgid

-- :name delete-doc! :! :n
-- :doc deletes a document record given the id
DELETE FROM docs
WHERE pgid = :pgid


-- :name create-xml-refs! :! :n
-- :doc creates a new xml record
INSERT INTO xml_refs
(pgid, xml_content)
VALUES (:pgid, :xml_content)

-- :name get-xml-refs :? :1
-- :doc retrieves an xml doc record given the id
SELECT * FROM xml_refs
WHERE pgid = :pgid



-- :name create-xml-headers! :! :n
-- :doc creates a new xml record
INSERT INTO xml_headers
(title, filename, forename, surname)
VALUES (:title, :filename, :forename, :surname)

-- :name get-xml-headers :? :1
-- :doc retrieves an xml doc record given the id
SELECT * FROM xml_headers
WHERE pgid = :pgid

-- :name get-xml-headers-by-name :? :1
-- :doc retrieves an xml doc given the file name
SELECT * FROM xml_headers
WHERE filename = :filename

-- :name get-xml-headers-by-title :? :1
-- :doc retrieves an xml doc given the file name
SELECT * FROM xml_headers
WHERE title = :title

-- :name get-headers-id-by-title :? :1
-- :doc given a title retrieve that header's pgid
SELECT pgid from xml_headers
where title = :title
