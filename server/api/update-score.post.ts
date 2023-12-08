import { defineEventHandler, readBody } from "h3";
import { scoreEditedEvent} from '../events/score-edited.event'
import { UpdateScorePayload } from "../types/score.payload.post";
import { setWonEvent } from "../events/set-won.event";
import { FileSetRepository } from "../repositories/set/file-set.repository";

const setRepository = new FileSetRepository();

export default defineEventHandler(async (event) => {  
  const body: UpdateScorePayload = await readBody(event);

  const { isHomeTeam, score, gameId } = body;

  const currentSet = await setRepository.getCurrentSet(gameId);

  const updatedScore = (isHomeTeam ? currentSet.homeTeamScore : currentSet.externalTeamScore) + score;
  const oppositeTeamScore = isHomeTeam ? currentSet.externalTeamScore : currentSet.homeTeamScore

  if (!checkScoreIsAllowed(updatedScore, oppositeTeamScore)) {
    return "KO"
  }

  if (isHomeTeam) {
    currentSet.homeTeamScore = updatedScore;
  } else {
    currentSet.externalTeamScore = updatedScore;
  }

  await setRepository.updateScore(currentSet);

  scoreEditedEvent.emit('score-edited', JSON.stringify({
    externTeamScore: currentSet.externalTeamScore,
    homeTeamScore: currentSet.homeTeamScore,
  }))

  if (setFinished(updatedScore, oppositeTeamScore)) {
    setWonEvent.emit('set-won', { isHomeTeamWhichWonSet: isHomeTeam })
  }

  return "OK"
});

function checkScoreIsAllowed(
  incomingScore: number,
  oppositeTeamScore: number,
): boolean {
  const { appConfig } = useRuntimeConfig()

  return (incomingScore >= 0 && incomingScore <= appConfig.setEndPointCount) ||
    (incomingScore > appConfig.setEndPointCount && Math.abs(oppositeTeamScore - incomingScore) <= 2);
}

function setFinished(
  incomingScore: number,
  oppositeTeamScore: number,
) {
  const { appConfig } = useRuntimeConfig();

  if (incomingScore >= appConfig.setEndPointCount && Math.abs(oppositeTeamScore - incomingScore) >= 2) {
    return true;
  }

  return false;
}