import { defineEventHandler, getQuery } from "h3";
import { Set } from "../domain/entities/set";
import { getGameProvider } from "../infrastructure/repositories/game/game.provider";
import { getSetProvider } from "../infrastructure/repositories/set/set.provider";

const gameRepository = getGameProvider();
const setRepository = getSetProvider();

export default defineEventHandler(async (event) => {
  const params: { gameId: string } = getQuery(event);

  const currentGame = await gameRepository.find(params.gameId);
  const sets = await setRepository.getSetsByGame(currentGame.id);

  return {
    gameId: currentGame.id,
    sets: sets.map(set => ({
      externalTeamScore: set.externalTeamScore,
      homeTeamScore: set.homeTeamScore,
      setPosition: set.setPosition,
    } satisfies Partial<Set>)),
  }
});
