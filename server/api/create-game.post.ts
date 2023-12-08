import { defineEventHandler, readBody } from "h3";
import { FileGameRepository } from "../repositories/game/file-game.repository";
import { Game } from "../domain/entities/game";
import { Set } from "../domain/entities/set";
import { GameCreationPayload } from "../types/game-creation.payload";
import { randomUUID } from 'crypto'
import { FileSetRepository } from "../repositories/set/file-set.repository";

const gameRepository = new FileGameRepository();
const setRepository = new FileSetRepository();

export default defineEventHandler(async (event) => {
  const body: GameCreationPayload = await readBody(event);

  const game: Game = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    externTeamScore: "",
    homeTeamName: "",
    name: body.name,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await gameRepository.create(game)

  const firstSet: Set = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    externTeamScore: 0,
    homeTeamScore: 0,
    gameId: game.id,
    id: randomUUID(),
    finishedAt: undefined,
  }

  await setRepository.create(firstSet);

  return {
    gameId: game.id,
  }
});
