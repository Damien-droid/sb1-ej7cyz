import { Difficulty, Note } from '../types/game';
import { gameConfig } from '../config/gameConfig';

const PERFECT_TIMING_THRESHOLD = 50;
const GOOD_TIMING_THRESHOLD = 100;

export const getGameSpeed = (difficulty: Difficulty): number => {
  return gameConfig.speeds[difficulty];
};

export const getSpawnRate = (difficulty: Difficulty): number => {
  return gameConfig.spawnRates[difficulty];
};

export const generateNote = (): Note => {
  const { notes, lanes } = gameConfig;
  return {
    id: crypto.randomUUID(),
    key: notes[Math.floor(Math.random() * notes.length)],
    time: Date.now(),
    lane: lanes[Math.floor(Math.random() * lanes.length)],
  };
};

export const calculateScore = (timing: number): { points: number; perfect: boolean } => {
  const absoluteTiming = Math.abs(timing);
  
  if (absoluteTiming < PERFECT_TIMING_THRESHOLD) {
    return { points: 100, perfect: true };
  } else if (absoluteTiming < GOOD_TIMING_THRESHOLD) {
    return { points: 50, perfect: false };
  }
  
  return { points: 0, perfect: false };
};