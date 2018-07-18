DROP TABLE IF EXISTS ibird;
CREATE DATABASE ibird;

\c ibird;

CREATE TABLE classes (
  id integer primary key,
  name text,
  douments text[]
);

INSERT INTO classes VALUES  ('20160401', '3J',  '{"00000001", "00000002", "00000003"}');
INSERT INTO classes VALUES  ('20170401', '2J',  '{"00000002", "00000003", "00000004"}');
INSERT INTO classes VALUES  ('20180401', '1-5', '{"00000003", "00000004", "00000005"}');
