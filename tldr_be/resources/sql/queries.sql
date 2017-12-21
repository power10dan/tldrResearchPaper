-- :name create-user! :! :n
-- :doc creates a new user record
INSERT INTO users
(id, first_name, last_name, email, pass)
VALUES (:id, :first_name, :last_name, :email, :pass)

-- :name update-user! :! :n
-- :doc updates an existing user record
UPDATE users
SET first_name = :first_name, last_name = :last_name, email = :email
WHERE id = :id

-- :name get-user :? :1
-- :doc retrieves a user record given the id
SELECT * FROM users
WHERE id = :id

-- :name delete-user! :! :n
-- :doc deletes a user record given the id
DELETE FROM users
WHERE id = :id



-- :name create-doc! :! :n
-- :doc creates a new document record
INSERT INTO docs
(id, filename, filestuff)
VALUES (:id, :filename, :filestuff)

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
(id, header, author, filename, summary, votes)
VALUES (:id, :header, :author, :filename, :summary, :votes, :doc_id)

-- :name get-summary :? :1
-- :doc retrieves a summary record given the id
SELECT * FROM summary
WHERE id = :id

-- :name delete-summary! :! :n
-- :doc deletes a summary record given the id
DELETE FROM summary
WHERE id = :id
