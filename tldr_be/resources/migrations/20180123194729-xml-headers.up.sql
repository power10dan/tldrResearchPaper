CREATE TABLE xml_headers
(pgid INT PRIMARY KEY,
filename VARCHAR(300),
title VARCHAR(300) UNIQUE,
xml_content VARCHAR);
