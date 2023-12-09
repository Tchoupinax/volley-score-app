import { SetRepository } from '../../../domain/gateway/set.repository';
import { Set } from '../../../domain/entities/set'
import { executeSQL } from '../../postgres/client';

export type SetModel = {
  created_at: string;
  external_team_score: string;
  finished_at: string;
  game_id: string;
  home_team_score: string;
  id: string;
  set_position: string;
  updated_at: string;
}

export class PostgresSetRepository implements SetRepository {
  async create(set: Set): Promise<void> {
    await executeSQL(
      `
        INSERT INTO "sets"
        (id, game_id, home_team_score, external_team_score, set_position, created_at, updated_at, finished_at)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `,
      [
        set.id,
        set.gameId,
        set.homeTeamScore,
        set.externalTeamScore,
        set.setPosition,
        set.createdAt,
        set.updatedAt,
        set.finishedAt
      ]
    )
  }

  async updateScore(set: Set): Promise<void> {
    await executeSQL(
      `
        UPDATE sets
        SET
          game_id = $2,
          home_team_score = $3, 
          external_team_score = $4,
          set_position = $5,
          created_at = $6,
          updated_at = $7,
          finished_at = $8
        WHERE
          id = $1
      `,
      [
        set.id,
        set.gameId,
        set.homeTeamScore,
        set.externalTeamScore,
        set.setPosition,
        set.createdAt,
        set.updatedAt,
        set.finishedAt
      ]
    )
  }

  async getCurrentSet(gameId: string): Promise<Set> {
    const rows = await executeSQL(
      `
        SELECT *
        FROM sets
        WHERE game_id = $1
        ORDER BY set_position DESC
        LIMIT 1;
      `,
      [gameId]
    );

    return this.mapToEntity(rows.at(0));
  }

  async getSetsByGame(gameId: string): Promise<Array<Set>> {
    const rows = await executeSQL(
      `
        SELECT *
        FROM sets
        WHERE game_id = $1
        ORDER BY set_position ASC;
      `,
      [gameId]
    )

    return rows.map(this.mapToEntity)
  }

  private mapToEntity(setModel: SetModel): Set {
    return {
      createdAt: setModel.created_at,
      externalTeamScore: parseInt(setModel.external_team_score, 10),
      finishedAt: setModel.finished_at,
      gameId: setModel.game_id,
      homeTeamScore: parseInt(setModel.home_team_score, 10),
      id: setModel.id,
      setPosition: parseInt(setModel.set_position, 10),
      updatedAt: setModel.updated_at,
    }
  }
}
