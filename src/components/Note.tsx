import React from 'react';
import { Note as NoteType } from '../types/game';

interface NoteProps {
  note: NoteType;
  speed: number;
  onHit: (note: NoteType) => void;
}

const Note: React.FC<NoteProps> = ({ note, speed, onHit }) => {
  return (
    <div
      className="absolute w-full py-2 px-4"
      style={{
        animation: `fall ${speed}ms linear`,
      }}
      onClick={() => onHit(note)}
    >
      <div className="bg-blue-500 text-white rounded p-2 text-center hover:bg-blue-600 cursor-pointer">
        {note.key}
      </div>
    </div>
  );
};

export default Note;