import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/game';
import { generateNote } from '../utils/gameLogic';

export const useNoteSpawner = (isPlaying: boolean, spawnRate: number) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const spawnInterval = setInterval(() => {
      const newNote = generateNote();
      setNotes(prev => [...prev, newNote]);
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [isPlaying, spawnRate]);

  const removeNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  }, []);

  return { notes, setNotes, removeNote };
};