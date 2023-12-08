import { Game } from "../entities/game";

export interface GameRepository {
  create(game: Game): Promise<void>;
};
