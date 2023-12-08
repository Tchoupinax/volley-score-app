import { Set } from '../../domain/entities/set'

export interface SetRepository {
  create(set: Set): Promise<void>;
  updateScore(set: Set): Promise<void>;
  getCurrentSet(gameId: string): Promise<Set>;
  getSetsByGame(gameId: string): Promise<Array<Set>>
};
