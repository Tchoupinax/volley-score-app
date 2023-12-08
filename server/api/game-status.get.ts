import { defineEventHandler, getQuery } from "h3";
import { FileGameRepository } from "../repositories/game/file-game.repository";
import { FileSetRepository } from "../repositories/set/file-set.repository";
import { GetGameStatus } from "../types/get-game-status";
import { Set } from "../domain/entities/set";

const gameRepository = new FileGameRepository();
const setRepository = new FileSetRepository();

export default defineEventHandler(async (event) => {
  const params: { gameId: string } = getQuery(event);

  const currentGame = await gameRepository.find(params.gameId);

  const sets = await setRepository.getSetsByGame(currentGame.id);

  return {
    gameId: currentGame.id,
    sets: sets.map(set => ({
      externalTeamScore: set.externalTeamScore,
      homeTeamScore: set.homeTeamScore
    } satisfies Partial<Set>)),
  }
});
