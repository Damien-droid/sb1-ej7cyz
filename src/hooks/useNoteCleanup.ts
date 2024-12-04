import { useEffect } from 'react';
import { Note } from '../types/game';

export const useNoteCleanup = (
  notes: Note[],
  setNotes: (notes: Note[]) => void,
  speed: number,
  onMiss: () => void
) => {
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const currentTime = Date.now();
      setNotes(prev => prev.filter(note => {
        const elapsed = currentTime - note.time;
        if (elapsed > speed + 1000) {
          onMiss();
          return false;
        }
        return true;
      }));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, [speed, setNotes, onMiss]);
};