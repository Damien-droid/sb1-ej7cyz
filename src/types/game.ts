export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'classic' | 'timed' | 'infinite';

export interface Note {
  id: string;
  key: string;
  time: number;
  lane: number;
}

export interface Score {
  points: number;
  multiplier: number;
  perfect: number;
  good: number;
  missed: number;
}

export interface GameConfig {
  speeds: Record<Difficulty, number>;
  spawnRates: Record<Difficulty, number>;
  notes: readonly string[];
  lanes: readonly number[];
}