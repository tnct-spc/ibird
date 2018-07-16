DROP TABLE IF EXISTS ibird;
CREATE DATABASE ibird;

\c ibird;

CREATE TABLE classes (
  id integer primary key,
  name text,
  douments json
);

INSERT INTO classes
VALUES  (1, 'A', '{"a": "b", "c": "d"}'),
        (2, 'B', '{"a": "b", "c": "d"}'),
        (3, 'C', '{"a": "b", "c": "d"}');
