import React from 'react';

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  style?: React.CSSProperties;
  onPress: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, isBlack = false, style, onPress }) => {
  const baseClasses = isBlack
    ? "w-8 h-24 bg-gray-900 hover:bg-gray-800 active:bg-gray-700"
    : "flex-1 h-40 bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200";

  return (
    <button
      onClick={() => onPress(note)}
      className={`${baseClasses} transition-colors`}
      style={style}
    />
  );
};

export default PianoKey;