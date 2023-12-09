-- DROP TABLE games;

CREATE TABLE games
(
  id varchar NOT NULL UNIQUE,
  name varchar NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  started_at TIMESTAMPTZ DEFAULT now()
);
