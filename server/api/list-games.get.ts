import { defineEventHandler, getQuery } from "h3";
import { FileGameRepository } from "../repositories/game/file-game.repository";

const gameRepository = new FileGameRepository();

export default defineEventHandler(() => {
  return gameRepository.list();
});
