CREATE TABLE summary
 (id SERIAL PRIMARY KEY,
  header VARCHAR(30),
  author VARCHAR(30),
  filename VARCHAR(30),
  summary TEXT,
  votes INT DEFAULT 0,
  doc_id INT);
