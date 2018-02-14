CREATE TABLE xml_refs
(pgid SERIAL PRIMARY KEY,
filename VARCHAR(300),
title VARCHAR(300) UNIQUE,
xml_content VARCHAR);
