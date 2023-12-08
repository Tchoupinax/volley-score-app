import { Game } from "../entities/game";

export interface GameRepository {
  find(gameId: string): Promise<Game>;
  create(game: Game): Promise<void>;
  list(): Promise<Array<Game>>;
};
