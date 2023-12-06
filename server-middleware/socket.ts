import chalk from 'chalk';
import { WebSocketServer } from 'ws';
import { scoreEditedEvent } from '../server/events/score-edited.event';

const wss = new WebSocketServer({ port: 12430 });

console.log(chalk.cyanBright(`⚡️ Web socket started on 12430`));
console.log(chalk.cyanBright(`Don't touch this terminal anymore and see your chart change directly in the browser`));

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  scoreEditedEvent.addListener('score-edited', (payload) => {
    ws.send(JSON.stringify({
      scores: JSON.parse(payload)
    }))
  })
});

export default defineEventHandler(() => 'Hello World!')
