CREATE TABLE xml_headers
(pgid SERIAL PRIMARY KEY,
filename VARCHAR(300) NOT NULL,
title VARCHAR(300) UNIQUE NOT NULL,
abstract VARCHAR,
forename text[],
surname text[]);

-- Extension for unaccenting words.
CREATE EXTENSION unaccent;

-- Zip function
CREATE OR REPLACE FUNCTION zip(array1 anyarray, array2 anyarray) RETURNS text[]
AS $$
SELECT array_agg(ARRAY[ARRAY[array1[i],array2[i]]])
FROM generate_subscripts(
  CASE WHEN array_length(array1,1) >= array_length(array2,1) THEN array1 ELSE array2 END,
  1
) AS subscripts(i);
$$ LANGUAGE sql;


-- Extension for mispelled words.
CREATE EXTENSION pg_trgm;

-- Create a list of uniqe lexemes use by documents.
CREATE MATERIALIZED VIEW unique_lexeme AS
SELECT word FROM ts_stat(
    	  'SELECT to_tsvector(''simple'', unaccent(xml_headers.title)) ||
                  to_tsvector(''simple'', unaccent(replace(array_to_string(zip(xml_headers.forename::text[], xml_headers.surname::text[]), '', '', '' ''), '','',''''))) as document
          FROM xml_headers
          GROUP BY xml_headers.pgid');

-- Create an index over the lemexes
CREATE INDEX words_idx ON unique_lexeme USING gin(word gin_trgm_ops);

-- To refresh unique_lemexes
--REFRESH MATERIALIZED VIEW unique_lexeme;
