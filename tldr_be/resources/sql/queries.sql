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
WHERE first_name = :first_name
      pass = :pass

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
(filename, filestuff)
VALUES (:filename, :filestuff)

-- :name get-doc :? :1
-- :doc retrieves a document record given the id
SELECT * FROM docs
WHERE id = :id

-- :name delete-doc! :! :n
-- :doc deletes a document record given the id
DELETE FROM docs
WHERE id = :id



-- :name create-summary! :! :n
-- :doc creates a new summary record
INSERT INTO summary
(header, author, filename, summary, votes)
VALUES (:header, :author, :filename, :summary, :votes, :doc_id)

-- :name get-summary :? :1
-- :doc retrieves a summary record given the id
SELECT * FROM summary
WHERE id = :id

-- :name delete-summary! :! :n
-- :doc deletes a summary record given the id
DELETE FROM summary
WHERE id = :id
