import React from 'react';
import { Note as NoteType } from '../../types/game';
import Note from './Note';

interface GameLaneProps {
  lane: number;
  notes: NoteType[];
  speed: number;
  onHit: (note: NoteType) => void;
}

const GameLane: React.FC<GameLaneProps> = ({ lane, notes, speed, onHit }) => {
  return (
    <div className="flex-1 border-r border-gray-800">
      {notes
        .filter(note => note.lane === lane)
        .map(note => (
          <Note
            key={note.id}
            note={note}
            speed={speed}
            onHit={onHit}
          />
        ))}
    </div>
  );
};

export default GameLane;