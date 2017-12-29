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
(filename, filestuff)
VALUES (:filename, :filestuff)

-- :name get-doc :? :1
-- :doc retrieves a document record given the id
SELECT * FROM docs
WHERE id = :id

-- :name get-doc-by-name :? :1
-- :doc retrieves a document given the file name
SELECT * FROM docs
WHERE filename = :filename

-- :name get-doc-id :? :1
-- :doc given a filename retrieve that docs doc_id
SELECT doc_id from docs
where filename = :filename

-- :name get-doc-filename :? :1
-- :doc given a doc_id retrieve the doc's filename
SELECT filename from docs
where doc_id = :doc_id

-- :name delete-doc! :! :n
-- :doc deletes a document record given the id
DELETE FROM docs
WHERE id = :id



-- :name create-summary! :! :n
-- :doc creates a new summary record
INSERT INTO summary
(header, author, summary, doc_id)
VALUES (:header, :author, :summary, :doc_id)

-- :name get-summary :? :1
-- :doc retrieves a summary record given the id
SELECT * FROM summary
WHERE id = :id

-- :name delete-summary! :! :n
-- :doc deletes a summary record given the id
DELETE FROM summary
WHERE id = :id

-- :name up-votes! :! :n
-- :doc increments a vote count by author filename summary and doc id
UPDATE summary
SET votes = votes + 1
WHERE header = :header AND author = :author AND  doc_id = :doc_id

-- :name down-votes! :! :n
-- :doc decrements a vote count by author filename summary and doc id
UPDATE summary
SET votes = votes - 1
WHERE header = :header AND author = :author AND doc_id = :doc_id
