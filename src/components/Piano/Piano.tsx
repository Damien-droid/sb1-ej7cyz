import React, { useCallback, useEffect } from 'react';
import { audioEngine } from '../../utils/audio';
import PianoKey from './PianoKey';
import { gameConfig } from '../../config/gameConfig';

interface PianoProps {
  onKeyPress: (key: string) => void;
}

const Piano: React.FC<PianoProps> = ({ onKeyPress }) => {
  const handleKeyPress = useCallback((key: string) => {
    audioEngine.playNote(key);
    onKeyPress(key);
  }, [onKeyPress]);

  // Keyboard controls
  useEffect(() => {
    const keyMap: Record<string, string> = {
      'a': 'C',
      's': 'D',
      'd': 'E',
      'f': 'F',
      'g': 'G',
      'h': 'A',
      'j': 'B',
      'w': 'C#',
      'e': 'D#',
      't': 'F#',
      'y': 'G#',
      'u': 'A#'
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const note = keyMap[event.key.toLowerCase()];
      if (note) {
        handleKeyPress(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute bottom-0 flex w-full">
        {gameConfig.notes.map((key) => (
          <PianoKey key={key} note={key} onPress={handleKeyPress} />
        ))}
      </div>
      <div className="absolute bottom-20 flex w-full px-[calc(100%/14)]">
        {['C#', 'D#', 'F#', 'G#', 'A#'].map((key, index) => (
          <PianoKey
            key={key}
            note={key}
            isBlack
            onPress={handleKeyPress}
            style={{
              marginLeft: index === 2 ? 'calc(100%/7)' : undefined,
              marginRight: 'calc(100%/7 - 2rem)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;