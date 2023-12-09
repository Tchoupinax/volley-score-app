-- DROP TABLE sets;

CREATE TABLE sets
(
  id varchar NOT NULL UNIQUE,
  game_id varchar NOT NULL,
  home_team_score int NOT NULL,
  external_team_score int NOT NULL,
  set_position int NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ DEFAULT now()
);
