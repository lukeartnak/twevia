module.exports = `

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
    hint           VARCHAR(32),
    primary        VARCHAR(32),
    alternate      VARCHAR(32)
  );

  CREATE TABLE IF NOT EXISTS guesses (
    id             SERIAL PRIMARY KEY,
    player_id      INT REFERENCES players,
    question_id    INT REFERENCES questions,
    text           VARCHAR(32) NOT NULL,
    created_at     DATE DEFAULT CURRENT_DATE
  );

`
