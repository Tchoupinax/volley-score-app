import { Game } from '../../domain/entities/game';
import { GameRepository } from '../../domain/gateway/game.repository'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

export class FileGameRepository implements GameRepository {
  private readonly filePath = process.cwd() + '/tmp/games.json';

  list(): Promise<Game[]> {
    const games = this.read();

    return Promise.resolve(games);
  }

  find(gameId: string): Promise<Game> {
    const games = this.read();
    const index = games.findIndex(game => game.id === gameId);

    if (index > -1) {
      return Promise.resolve(games[index]);
    }

    throw new Error(`Game ${gameId} not found`)
  }

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
