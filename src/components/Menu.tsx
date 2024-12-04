import React from 'react';
import { useGameStore } from '../store/gameStore';
import { GameMode, Difficulty } from '../types/game';
import { Play, Clock, Infinity, Music } from 'lucide-react';

const Menu: React.FC = () => {
  const { mode, difficulty, setMode, setDifficulty, startGame } = useGameStore();

  const modes: { id: GameMode; icon: React.ReactNode; label: string }[] = [
    { id: 'classic', icon: <Play />, label: 'Classic' },
    { id: 'timed', icon: <Clock />, label: 'Timed' },
    { id: 'infinite', icon: <Infinity />, label: 'Infinite' },
  ];

  const difficulties: { id: Difficulty; label: string }[] = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
  ];

  const handleStartGame = () => {
    startGame();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Music className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Piano Magique</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Game Mode</h2>
          <div className="grid grid-cols-3 gap-3">
            {modes.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  mode === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Difficulty</h2>
          <div className="flex gap-3">
            {difficulties.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setDifficulty(id)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  difficulty === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartGame}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};