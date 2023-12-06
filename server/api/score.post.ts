import { defineEventHandler, readBody } from "h3";
import { scoreEditedEvent} from '../events/score-edited.event'

const scores = [
  {
    "team A": 0,
    "team B": 0
  }
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  scores.at(-1)[body.team] = scores.at(-1)[body.team] + body.score

  scoreEditedEvent.emit('score-edited', JSON.stringify(scores))

  return "OK"
});
