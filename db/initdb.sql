CREATE DATABASE ibird;

\c ibird;

CREATE TABLE clases (
  id integer primary key,
  name text,
  douments json
);
