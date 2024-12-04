import React, { useCallback } from 'react';
import { Note as NoteType } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import GameLane from './GameLane';
import ScoreDisplay from './ScoreDisplay';
import { audioEngine } from '../../utils/audio';
import { getGameSpeed, getSpawnRate, calculateScore } from '../../utils/gameLogic';
import { gameConfig } from '../../config/gameConfig';
import { useNoteSpawner } from '../../hooks/useNoteSpawner';
import { useNoteCleanup } from '../../hooks/useNoteCleanup';

const GameBoard: React.FC = () => {
  const { isPlaying, difficulty, score, updateScore } = useGameStore();
  const speed = getGameSpeed(difficulty);
  const spawnRate = getSpawnRate(difficulty);
  
  const { notes, setNotes, removeNote } = useNoteSpawner(isPlaying, spawnRate);
  
  const handleMiss = useCallback(() => {
    updateScore(0, false);
  }, [updateScore]);

  useNoteCleanup(notes, setNotes, speed, handleMiss);

  const handleNoteHit = useCallback((hitNote: NoteType) => {
    const timing = Date.now() - hitNote.time - (speed / 2);
    const { points, perfect } = calculateScore(timing);
    
    if (points > 0) {
      audioEngine.playNote(hitNote.key);
      updateScore(points, perfect);
      removeNote(hitNote.id);
    }
  }, [speed, updateScore, removeNote]);

  return (
    <div className="relative w-full h-[60vh] bg-gray-900 overflow-hidden rounded-lg">
      <ScoreDisplay score={score} />
      
      <div className="absolute inset-0 flex">
        {gameConfig.lanes.map((lane) => (
          <GameLane
            key={lane}
            lane={lane}
            notes={notes}
            speed={speed}
            onHit={handleNoteHit}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;