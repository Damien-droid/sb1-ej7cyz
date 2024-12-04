import React, { useCallback } from 'react';
import { audioEngine } from '../utils/audio';

interface PianoProps {
  onKeyPress: (key: string) => void;
}

const Piano: React.FC<PianoProps> = ({ onKeyPress }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  const handleKeyPress = useCallback((key: string) => {
    audioEngine.playNote(key);
    onKeyPress(key);
  }, [onKeyPress]);

  return (
    <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute bottom-0 flex w-full">
        {whiteKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="flex-1 h-40 bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors"
          />
        ))}
      </div>
      <div className="absolute bottom-20 flex w-full px-[calc(100%/14)]">
        {blackKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-8 h-24 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 transition-colors"
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