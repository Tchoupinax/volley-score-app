import { defineEventHandler, readBody } from "h3";
import { ValidateSetPayload } from "../types/validate-set.payload";
import { FileSetRepository } from "../repositories/set/file-set.repository";
import { Set } from "../domain/entities/set";
import { randomUUID } from 'crypto'
import { scoreEditedEvent } from "../events/score-edited.event";

const setRepository = new FileSetRepository();

export default defineEventHandler(async (event) => {
const { appConfig } = useRuntimeConfig();

  const body: ValidateSetPayload = await readBody(event);

  const currentSet = await setRepository.getCurrentSet(body.gameId);

  // Close the current set
  currentSet.finishedAt = new Date().toISOString()
  await setRepository.updateScore(currentSet)

  if (currentSet.setPosition === appConfig.matchSetCount) {
    // Match finished!
    
    return "OK"
  }

  // Open the next set
  const nextSet: Set = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    externalTeamScore: 0,
    homeTeamScore: 0,
    gameId: body.gameId,
    id: randomUUID(),
    finishedAt: undefined,
    setPosition: currentSet.setPosition + 1
  }
  await setRepository.create(nextSet)
  
  scoreEditedEvent.emit('score-edited', JSON.stringify({
    externTeamScore: 0,
    homeTeamScore: 0,
  }))
  
  return "OK"
});
