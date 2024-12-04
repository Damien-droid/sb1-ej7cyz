import * as Tone from 'tone';

class AudioEngine {
  private synth: Tone.PolySynth;
  private initialized: boolean = false;
  
  constructor() {
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.synth.volume.value = -10;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      await Tone.start();
      await Tone.loaded();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
    }
  }

  playNote(note: string, duration: string = '8n') {
    if (!this.initialized) return;
    
    try {
      const fullNote = `${note}4`;
      this.synth.triggerAttackRelease(fullNote, duration);
    } catch (error) {
      console.error('Failed to play note:', error);
    }
  }

  playChord(notes: string[], duration: string = '8n') {
    if (!this.initialized) return;
    
    try {
      const fullNotes = notes.map(note => `${note}4`);
      this.synth.triggerAttackRelease(fullNotes, duration);
    } catch (error) {
      console.error('Failed to play chord:', error);
    }
  }
}

export const audioEngine = new AudioEngine();