/**
 * Robust Audio Engine for Spindle
 * Handles HTML5 audio streaming with automatic Web Audio synthesizer fallback
 * and procedural vinyl surface noise (crackle, pops, motor rumble).
 */

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private crackleGain: GainNode | null = null;
  private crackleSource: AudioBufferSourceNode | null = null;
  private rumbleOsc: OscillatorNode | null = null;
  private isCracklePlaying = false;
  private synthInterval: number | null = null;
  private isUsingSynthFallback = false;
  private synthGain: GainNode | null = null;

  private onTimeUpdateCallback: ((timeMs: number, durationMs: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'auto';

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio && !this.isUsingSynthFallback && this.onTimeUpdateCallback) {
          const currentMs = (this.audio.currentTime || 0) * 1000;
          const totalMs = (this.audio.duration || 0) * 1000;
          this.onTimeUpdateCallback(currentMs, totalMs);
        }
      });

      this.audio.addEventListener('ended', () => {
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      });

      this.audio.addEventListener('error', () => {
        console.warn('Network audio stream unavailable; switching to built-in analog jazz synth fallback.');
        this.fallbackToSynthesizer();
      });
    }
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setCallbacks(
    onTimeUpdate: (timeMs: number, durationMs: number) => void,
    onEnded: () => void
  ) {
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndedCallback = onEnded;
  }

  public async loadAndPlay(url: string, volume: number = 0.85): Promise<void> {
    this.initAudioContext();
    this.stopSynth();
    this.isUsingSynthFallback = false;

    if (!this.audio) return;
    this.audio.src = url;
    this.audio.volume = volume;

    try {
      await this.audio.play();
    } catch (err) {
      console.warn('HTML5 audio play blocked or failed; starting warm analog jazz synth engine:', err);
      this.fallbackToSynthesizer();
    }
  }

  public play(): Promise<void> {
    this.initAudioContext();
    if (this.isUsingSynthFallback) {
      this.startSynthJazzChordLoop();
      return Promise.resolve();
    }
    if (this.audio && this.audio.src) {
      return this.audio.play().catch(() => {
        this.fallbackToSynthesizer();
      });
    }
    return Promise.resolve();
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynth();
  }

  public seek(timeMs: number): void {
    if (this.audio && isFinite(this.audio.duration)) {
      this.audio.currentTime = timeMs / 1000;
    }
  }

  public setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = clamped;
    }
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setValueAtTime(clamped * 0.25, this.audioCtx.currentTime);
    }
  }

  /**
   * Automatic Warm Analog Jazz Synthesizer Fallback
   * Synthesizes warm Fender Rhodes electric piano modal chords in case external MP3 links fail.
   */
  private fallbackToSynthesizer() {
    this.isUsingSynthFallback = true;
    this.startSynthJazzChordLoop();
  }

  private startSynthJazzChordLoop() {
    this.initAudioContext();
    if (!this.audioCtx) return;
    this.stopSynth();

    // Modal Jazz Chords: Dm9, G13, Cmaj9, A7alt
    const chords = [
      [146.83, 220.00, 261.63, 329.63, 392.00], // Dm9
      [196.00, 246.94, 329.63, 392.00, 440.00], // G13
      [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9
      [220.00, 277.18, 329.63, 415.30, 493.88]  // A7alt
    ];

    let chordIndex = 0;
    let elapsedMs = 0;
    const chordDurationMs = 3800;

    const playChord = () => {
      if (!this.audioCtx) return;
      const notes = chords[chordIndex % chords.length];
      chordIndex++;

      notes.forEach((freq) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const filter = this.audioCtx!.createBiquadFilter();

        // Warm tape/Rhodes bell tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, this.audioCtx!.currentTime);

        const now = this.audioCtx!.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now);
        osc.stop(now + 3.7);
      });
    };

    playChord();
    this.synthInterval = window.setInterval(() => {
      playChord();
      elapsedMs += chordDurationMs;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(elapsedMs % 180000, 180000);
      }
    }, chordDurationMs);
  }

  private stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  /**
   * Procedural vinyl crackle generator (surface noise, dust pops, rumble)
   */
  private generateVinylCrackleBuffer(ctx: AudioContext): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const durationSeconds = 5;
    const length = sampleRate * durationSeconds;
    const buffer = ctx.createBuffer(2, length, sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    const rotationSamples = Math.floor(sampleRate * 1.8);

    for (let i = 0; i < length; i++) {
      const white = (Math.random() * 2 - 1) * 0.012;
      const revolutionPhase = i % rotationSamples;
      let revPop = 0;
      if (revolutionPhase < 120) {
        revPop = (1 - revolutionPhase / 120) * 0.045 * (Math.random() > 0.35 ? 1 : 0);
      }

      let click = 0;
      if (Math.random() < 0.0004) {
        click = (Math.random() * 2 - 1) * 0.16;
      } else if (Math.random() < 0.0018) {
        click = (Math.random() * 2 - 1) * 0.035;
      }

      const sample = white + revPop + click;
      left[i] = sample;
      right[i] = sample * (0.8 + Math.random() * 0.4);
    }

    return buffer;
  }

  public startCrackle(volume: number = 0.25): void {
    this.initAudioContext();
    if (!this.audioCtx) return;
    if (this.isCracklePlaying) {
      this.setCrackleVolume(volume);
      return;
    }

    try {
      const buffer = this.generateVinylCrackleBuffer(this.audioCtx);
      this.crackleSource = this.audioCtx.createBufferSource();
      this.crackleSource.buffer = buffer;
      this.crackleSource.loop = true;

      const bandpass = this.audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
      bandpass.Q.setValueAtTime(0.7, this.audioCtx.currentTime);

      this.crackleGain = this.audioCtx.createGain();
      this.crackleGain.gain.setValueAtTime(volume * 0.4, this.audioCtx.currentTime);

      this.rumbleOsc = this.audioCtx.createOscillator();
      this.rumbleOsc.type = 'sine';
      this.rumbleOsc.frequency.setValueAtTime(32, this.audioCtx.currentTime);
      const rumbleGain = this.audioCtx.createGain();
      rumbleGain.gain.setValueAtTime(0.015 * volume, this.audioCtx.currentTime);
      this.rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(this.audioCtx.destination);
      this.rumbleOsc.start();

      this.crackleSource.connect(bandpass);
      bandpass.connect(this.crackleGain);
      this.crackleGain.connect(this.audioCtx.destination);

      this.crackleSource.start();
      this.isCracklePlaying = true;
    } catch (e) {
      console.warn('Could not start vinyl crackle generator:', e);
    }
  }

  public stopCrackle(): void {
    if (this.crackleSource) {
      try {
        this.crackleSource.stop();
        this.crackleSource.disconnect();
      } catch {
        // ignore
      }
      this.crackleSource = null;
    }
    if (this.rumbleOsc) {
      try {
        this.rumbleOsc.stop();
        this.rumbleOsc.disconnect();
      } catch {
        // ignore
      }
      this.rumbleOsc = null;
    }
    this.isCracklePlaying = false;
  }

  public setCrackleVolume(volume: number): void {
    if (this.crackleGain && this.audioCtx) {
      this.crackleGain.gain.setTargetAtTime(volume * 0.4, this.audioCtx.currentTime, 0.05);
    }
  }

  public destroy(): void {
    this.stopCrackle();
    this.stopSynth();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }
}

export const audioEngine = new AudioEngine();
