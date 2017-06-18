module.exports = `

  DROP TABLE IF EXISTS players;
  DROP TABLE IF EXISTS rooms;

  CREATE TABLE IF NOT EXISTS rooms (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    public        BOOLEAN DEFAULT TRUE,
    created_at    DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE IF NOT EXISTS players (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    socket        TEXT NOT NULL,
    active        BOOLEAN DEFAULT TRUE,
    room_id       INTEGER REFERENCES rooms,
    created_at    DATE DEFAULT CURRENT_DATE
  );

`
