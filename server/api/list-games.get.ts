import { defineEventHandler } from "h3";
import { getGameProvider } from "../infrastructure/repositories/game/game.provider";

const gameRepository = getGameProvider();

export default defineEventHandler(() => {
  return gameRepository.list();
});
