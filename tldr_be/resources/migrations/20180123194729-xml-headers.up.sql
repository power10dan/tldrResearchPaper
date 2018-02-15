CREATE TABLE xml_headers
(pgid SERIAL PRIMARY KEY,
filename VARCHAR(300) NOT NULL,
title VARCHAR(300) UNIQUE NOT NULL,
abstract VARCHAR,
forename text[],
surname text[]);
