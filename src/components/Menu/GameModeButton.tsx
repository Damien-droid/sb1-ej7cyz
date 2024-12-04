import React from 'react';
import { GameMode } from '../../types/game';

interface GameModeButtonProps {
  mode: GameMode;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const GameModeButton: React.FC<GameModeButtonProps> = ({
  icon,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};