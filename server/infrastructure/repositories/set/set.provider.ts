import { SetRepository } from "../../../domain/gateway/set.repository";
import { FileSetRepository } from "./file-set.repository";
import { PostgresSetRepository } from "./postgres-set.repository";

export function getSetProvider(): SetRepository {
  const { appConfig } = useRuntimeConfig();

  if (appConfig.usePostgres) {
    return new PostgresSetRepository();
  } else {
    return new FileSetRepository()
  }
}
