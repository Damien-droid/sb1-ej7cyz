import React from 'react';
import { useGameStore } from './store/gameStore';
import Menu from './components/Menu';
import GameBoard from './components/GameBoard';
import Piano from './components/Piano';
import { useAudioInit } from './hooks/useAudioInit';

function App() {
  const { isPlaying } = useGameStore();
  useAudioInit();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {isPlaying ? (
          <>
            <GameBoard />
            <Piano onKeyPress={(key) => console.log('Key pressed:', key)} />
          </>
        ) : (
          <Menu />
        )}
      </div>
    </div>
  );
}

export default App;