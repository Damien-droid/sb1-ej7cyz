import React from 'react';
import { Difficulty } from '../../types/game';

interface DifficultyButtonProps {
  difficulty: Difficulty;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};