module.exports = `

  DROP TABLE IF EXISTS rooms;

  CREATE TABLE IF NOT EXISTS rooms (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    public        BOOLEAN DEFAULT TRUE,
    created_at    DATE DEFAULT CURRENT_DATE
  );

`
