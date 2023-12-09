import { GameRepository } from "../../../domain/gateway/game.repository";
import { FileGameRepository } from "./file-game.repository";
import { PostgresGameRepository } from "./postgres-game.repository";

export function getGameProvider(): GameRepository {
  const { appConfig } = useRuntimeConfig();

  if (appConfig.usePostgres) {
    return new PostgresGameRepository();
  } else {
    return new FileGameRepository()
  }
}
