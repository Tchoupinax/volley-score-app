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

  const updatedScore = (isHomeTeam ? currentSet.homeTeamScore : currentSet.externTeamScore) + score;
  const oppositeTeamScore = isHomeTeam ? currentSet.externTeamScore : currentSet.homeTeamScore

  if (!checkScoreIsAllowed(updatedScore, oppositeTeamScore)) {
    return "KO"
  }

  if (isHomeTeam) {
    currentSet.homeTeamScore = updatedScore;
  } else {
    currentSet.externTeamScore = updatedScore;
  }

  await setRepository.updateScore(currentSet);

  scoreEditedEvent.emit('score-edited', JSON.stringify({
    externTeamScore: currentSet.externTeamScore,
    homeTeamScore: currentSet.homeTeamScore,
  }))

  if (setFinished(updatedScore, oppositeTeamScore)) {
    setWonEvent.emit('set-won', { isHomeTeamWhichWonSet: isHomeTeam })
  }

  return "OK"
});

function checkScoreIsAllowed(
  incomingScore: number,
  oppositeTeamScore: number
): boolean {
  return (incomingScore >= 0 && incomingScore <= 25) ||
    (incomingScore > 25 && Math.abs(oppositeTeamScore - incomingScore) <= 2);
}

function setFinished(
  incomingScore: number,
  oppositeTeamScore: number
) {
  if (incomingScore >= 25 && Math.abs(oppositeTeamScore - incomingScore) >= 2) {
    return true;
  }

  return false;
}