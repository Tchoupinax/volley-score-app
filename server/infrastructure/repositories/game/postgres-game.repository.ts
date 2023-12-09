import { Game } from '../../../domain/entities/game';
import { GameRepository } from '../../../domain/gateway/game.repository'
import { executeSQL } from '../../postgres/client';

export class PostgresGameRepository implements GameRepository {
  list(): Promise<Game[]> {
    return executeSQL("SELECT * from games;");
  }

  async find(gameId: string): Promise<Game> {
    const rows = await executeSQL("SELECT * from games where id = $1", [gameId])
    return rows[0];
  }

  async create(game: Game): Promise<void> {
    await executeSQL(
      `
        INSERT INTO "games"
        (id, name, created_at, updated_at, started_at)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [
        game.id,
        game.name,
        game.createdAt,
        game.updatedAt,
        game.startedAt
      ]
    )
  }
}
