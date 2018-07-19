DROP TABLE IF EXISTS ibird;
CREATE DATABASE ibird;

\c ibird;

CREATE TABLE classes (
  id integer primary key,
  name text,
  douments json
);

INSERT INTO classes VALUES  ('20160401', '3J',  '[{"id": "20180401","x": 100,"y": 200},{"id": "20180402","x": 100,"y": 200},{"id": "20180403","x": 100,"y": 200}]');
INSERT INTO classes VALUES  ('20170401', '2J',  '[{"id": "20180402","x": 100,"y": 200},{"id": "20180403","x": 100,"y": 200},{"id": "20180404","x": 100,"y": 200}]');
INSERT INTO classes VALUES  ('20180401', '1-5', '[{"id": "20180403","x": 100,"y": 200},{"id": "20180404","x": 100,"y": 200},{"id": "20180405","x": 100,"y": 200}]');
