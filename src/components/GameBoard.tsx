import React, { useEffect, useState, useCallback } from 'react';
import { Note as NoteType } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { Music } from 'lucide-react';
import Note from './Note';
import { audioEngine } from '../utils/audio';
import { generateNote, getGameSpeed, getSpawnRate, calculateScore } from '../utils/gameLogic';

const GameBoard: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const { isPlaying, difficulty, score, updateScore } = useGameStore();
  const speed = getGameSpeed(difficulty);
  const spawnRate = getSpawnRate(difficulty);

  const handleNoteHit = useCallback((hitNote: NoteType) => {
    const timing = Date.now() - hitNote.time - (speed / 2);
    const { points, perfect } = calculateScore(timing);
    
    if (points > 0) {
      audioEngine.playNote(hitNote.key);
      updateScore(points, perfect);
      setNotes(prev => prev.filter(note => note.id !== hitNote.id));
    }
  }, [speed, updateScore]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      setNotes(prev => [...prev, generateNote()]);
    }, spawnRate);

    const cleanupInterval = setInterval(() => {
      setNotes(prev => prev.filter(note => {
        const elapsed = Date.now() - note.time;
        if (elapsed > speed + 1000) {
          updateScore(0, false);
          return false;
        }
        return true;
      }));
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, [isPlaying, speed, spawnRate, updateScore]);

  return (
    <div className="relative w-full h-[60vh] bg-gray-900 overflow-hidden rounded-lg">
      <div className="absolute top-4 left-4 text-white">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6" />
          <span className="text-2xl font-bold">{score.points}</span>
        </div>
        <div className="text-sm opacity-75">
          Multiplier: x{score.multiplier.toFixed(1)}
        </div>
      </div>
      
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((lane) => (
          <div key={lane} className="flex-1 border-r border-gray-800">
            {notes
              .filter(note => note.lane === lane)
              .map(note => (
                <Note
                  key={note.id}
                  note={note}
                  speed={speed}
                  onHit={handleNoteHit}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;