import React from 'react';
import { Music } from 'lucide-react';
import { Score } from '../../types/game';

interface ScoreDisplayProps {
  score: Score;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="absolute top-4 left-4 text-white">
      <div className="flex items-center gap-2">
        <Music className="w-6 h-6" />
        <span className="text-2xl font-bold">{score.points}</span>
      </div>
      <div className="text-sm opacity-75">
        Multiplier: x{score.multiplier.toFixed(1)}
      </div>
    </div>
  );
};

export default ScoreDisplay;