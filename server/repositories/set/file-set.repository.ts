import { Game } from '../../domain/entities/game';
import { SetRepository } from '../../domain/gateway/set.repository';
import { Set} from '../../domain/entities/set'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

export class FileSetRepository implements SetRepository {
  private readonly filePath = process.cwd() + '/tmp/sets.json';

  create(set: Set): Promise<void> {
    const sets = this.read();
    sets.push(set);
    this.write(sets);
    return Promise.resolve()
  }

  updateScore(set: Set): Promise<void> {
    const sets = this.read();

    const index = sets.findIndex(currentSet => currentSet.id = set.id);
    if (index > -1) {
      sets[index] = set;
      this.write(sets);
    }

    return Promise.resolve()
  }

  getCurrentSet(gameId: string): Promise<Set> {
    const sets = this.read();

    const currentSet = sets
      .filter(set => set.gameId === gameId)
      .sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)
      .at(0);

    if (!currentSet) {
      throw new Error(`Current set not found (gameId=${gameId})`);
    }

    return Promise.resolve(currentSet)
  }

  private read(): Array<Set> {
    if (!existsSync(this.filePath)) {
      mkdirSync(process.cwd() + '/tmp/', { recursive: true })
      writeFileSync(this.filePath, '[]')
    }

    return JSON.parse(readFileSync(process.cwd() + '/tmp/sets.json', 'utf-8'));
  }

  private write(games: Array<Set>): void {
    writeFileSync(process.cwd() + '/tmp/sets.json', JSON.stringify(games, null, 2));
  }
}
