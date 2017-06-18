module.exports = `

  DROP TABLE IF EXISTS guesses;
  DROP TABLE IF EXISTS answers;
  DROP TABLE IF EXISTS questions;
  DROP TABLE IF EXISTS players;
  DROP TABLE IF EXISTS rooms;

  CREATE TABLE IF NOT EXISTS rooms (
    id             SERIAL PRIMARY KEY,
    name           CHAR(5) NOT NULL,
    public         BOOLEAN DEFAULT TRUE,
    created_at     DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE IF NOT EXISTS players (
    id             SERIAL PRIMARY KEY,
    room_id        INT REFERENCES rooms,
    name           VARCHAR(16) NOT NULL,
    socket         CHAR(20) NOT NULL,
    active         BOOLEAN DEFAULT TRUE,
    created_at     DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE IF NOT EXISTS questions (
    id             SERIAL PRIMARY KEY,
    title          VARCHAR(64) NOT NULL,
    created_at     DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE IF NOT EXISTS answers (
    id             SERIAL PRIMARY KEY,
    question_id    INT REFERENCES questions,
    hint           VARCHAR(32),
    "primary"      VARCHAR(32) NOT NULL,
    alternate      VARCHAR(32)
  );

  CREATE TABLE IF NOT EXISTS guesses (
    id             SERIAL PRIMARY KEY,
    player_id      INT REFERENCES players,
    question_id    INT REFERENCES questions,
    text           VARCHAR(32) NOT NULL,
    created_at     DATE DEFAULT CURRENT_DATE
  );

  INSERT INTO rooms (name)
  VALUES
    ('ABCDE'),
    ('FDGHI'),
    ('JKLMN');

  INSERT INTO questions (title)
  VALUES
    ('Can you name the Presidents of the United States?'),
    ('Can you name the state capitals of the United States');

  INSERT INTO answers (question_id, hint, "primary")
  VALUES
    (1, '1788-1796', 'George Washington'),
    (1, '1796-1800', 'John Adams'),
    (1, '1800-1808', 'Thomas Jefferson'),
    (2, 'Alabama', 'Montgomery'),
    (2, 'Alaska', 'Juneau'),
    (2, 'Arizona', 'Phoenix');

`
