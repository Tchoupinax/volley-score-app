import { Game } from '../../domain/entities/game';
import { GameRepository } from '../../domain/gateway/game.repository'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

export class FileGameRepository implements GameRepository {
  private readonly filePath = process.cwd() + '/tmp/games.json';

  create(game: Game): Promise<void> {
    const games = this.read();
    games.push(game);
    this.write(games);
    return Promise.resolve()
  }

  private read(): Array<Game> {
    if (!existsSync(this.filePath)) {
      mkdirSync(process.cwd() + '/tmp/', { recursive: true })
      writeFileSync(this.filePath, '[]')
    }

    return JSON.parse(readFileSync(this.filePath, 'utf-8'));
  }

  private write(games: Array<Game>): void {
    writeFileSync(this.filePath, JSON.stringify(games, null, 2));
  }
}
