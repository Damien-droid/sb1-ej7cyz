import { useEffect } from 'react';
import { audioEngine } from '../utils/audio';

export const useAudioInit = () => {
  useEffect(() => {
    const initAudio = async () => {
      await audioEngine.init();
    };
    initAudio();
  }, []);
};