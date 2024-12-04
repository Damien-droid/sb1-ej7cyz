import { GameConfig } from '../types/game';

export const gameConfig: GameConfig = {
  speeds: {
    easy: 4000,
    medium: 3000,
    hard: 2000,
  },
  spawnRates: {
    easy: 1500,
    medium: 1000,
    hard: 750,
  },
  notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const,
  lanes: [0, 1, 2, 3] as const,
};