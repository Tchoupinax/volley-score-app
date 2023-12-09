import { defineEventHandler, readBody } from "h3";
import { Game } from "../domain/entities/game";
import { Set } from "../domain/entities/set";
import { GameCreationPayload } from "../types/game-creation.payload";
import { randomUUID } from 'crypto'
import { getGameProvider } from "../infrastructure/repositories/game/game.provider";
import { getSetProvider } from "../infrastructure/repositories/set/set.provider";

const gameRepository = getGameProvider();
const setRepository = getSetProvider();

export default defineEventHandler(async (event) => {
  const body: GameCreationPayload = await readBody(event);

  const game: Game = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: body.name,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await gameRepository.create(game)

  const firstSet: Set = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    externalTeamScore: 0,
    homeTeamScore: 0,
    gameId: game.id,
    id: randomUUID(),
    finishedAt: undefined,
    setPosition: 1
  }

  await setRepository.create(firstSet);

  return {
    gameId: game.id,
  }
});
