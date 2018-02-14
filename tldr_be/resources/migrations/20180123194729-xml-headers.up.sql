CREATE TABLE xml_headers
(pgid SERIAL PRIMARY KEY,
filename VARCHAR(300),
title VARCHAR(300) UNIQUE,
xml_content VARCHAR);
