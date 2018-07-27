DROP TABLE IF EXISTS ibird;
CREATE DATABASE ibird;

\c ibird;

CREATE TABLE classes (
  classid integer primary key,
  name text,
  documents json
);

INSERT INTO classes VALUES  ('20160401', '3J',  '[{"docid": "20180401","x": 100,"y": 200},{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200}]');
INSERT INTO classes VALUES  ('20170401', '2J',  '[{"docid": "20180402","x": 100,"y": 200},{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200}]');
INSERT INTO classes VALUES  ('20180401', '1-5', '[{"docid": "20180403","x": 100,"y": 200},{"docid": "20180404","x": 100,"y": 200},{"docid": "20180405","x": 100,"y": 200}]');
