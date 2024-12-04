import { create } from 'zustand';
import { Difficulty, GameMode, Score } from '../types/game';

interface GameState {
  isPlaying: boolean;
  mode: GameMode;
  difficulty: Difficulty;
  score: Score;
  setMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  endGame: () => void;
  updateScore: (points: number, perfect: boolean) => void;
  resetScore: () => void;
}

const initialScore: Score = {
  points: 0,
  multiplier: 1,
  perfect: 0,
  good: 0,
  missed: 0,
};

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  mode: 'classic',
  difficulty: 'medium',
  score: initialScore,
  setMode: (mode) => set({ mode }),
  setDifficulty: (difficulty) => set({ difficulty }),
  startGame: () => set({ isPlaying: true, score: initialScore }),
  endGame: () => set({ isPlaying: false }),
  resetScore: () => set({ score: initialScore }),
  updateScore: (points, perfect) =>
    set((state) => ({
      score: {
        ...state.score,
        points: state.score.points + Math.floor(points * state.score.multiplier),
        multiplier: perfect ? Math.min(state.score.multiplier + 0.1, 4) : 1,
        perfect: perfect ? state.score.perfect + 1 : state.score.perfect,
        good: points > 0 && !perfect ? state.score.good + 1 : state.score.good,
        missed: points === 0 ? state.score.missed + 1 : state.score.missed,
      },
    })),
}));