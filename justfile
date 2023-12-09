default: up migrate

up:
  docker-compose up -d && sleep 5

migrate:
  ./scripts/local-migration.sh

clean:
  docker-compose down
