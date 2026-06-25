// Web Audio API Synthesizer for Desert Environment
// Generates immersive live audio layers: Wüstenwind (Day) and Grillenzirpen (Night) without external files.

class DesertAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private nightTransition: number = 0; // 0 = Day, 1 = Night

  // Day elements (Wind)
  private windBufferNode: AudioBufferSourceNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private windLFO: OscillatorNode | null = null;
  private windLFOGain: GainNode | null = null;

  // Night elements (Procedural Insects & Crickets)
  private nightInsectsOscs: OscillatorNode[] = [];
  private nightInsectsGains: GainNode[] = [];
  private nightInsectsLFO: OscillatorNode | null = null;
  private nightInsectsLFOGain: GainNode | null = null;
  private nightInsectsFilter: BiquadFilterNode | null = null;
  private nightInsectsGain: GainNode | null = null;

  private cricketInterval: any = null;
  private masterGain: GainNode | null = null;

  constructor() {}

  private init() {
    if (this.ctx) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    
    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    
    // Setup Wind Synth (Day)
    this.setupWind();
    
    // Setup Procedural Soothing Synth (Night)
    this.setupInsects();
  }

  private setupWind() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Generate Pink Noise Buffer (4 seconds) for softer blowing wind feel
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11; // normalise
      b6 = white * 0.115926;
    }

    // 2. Create wind sources and filters
    this.windBufferNode = this.ctx.createBufferSource();
    this.windBufferNode.buffer = buffer;
    this.windBufferNode.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    // Default daytime gain (very gentle rumble)
    this.windGain.gain.setValueAtTime(0.04, this.ctx.currentTime); 

    // 3. Connect LFO to modulate filter frequency (creates slow wind gusts)
    this.windLFO = this.ctx.createOscillator();
    this.windLFO.type = 'sine';
    this.windLFO.frequency.setValueAtTime(0.06, this.ctx.currentTime); // Slow sweep

    this.windLFOGain = this.ctx.createGain();
    this.windLFOGain.gain.setValueAtTime(40, this.ctx.currentTime); // Modulation depth

    // Assemble connections
    this.windBufferNode.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.windLFO.connect(this.windLFOGain);
    this.windLFOGain.connect(this.windFilter.frequency);

    // Muted the continuous background wind synthesis to provide a calm, peaceful experience
    // this.windBufferNode.start(0);
    // this.windLFO.start(0);
  }

  private setupInsects() {
    if (!this.ctx || !this.masterGain) return;

    // Create 4 soft warm sub-harmonic oscillators for a lush, sleeping desert ambient pad
    const freqs = [110, 165, 220, 330]; // A beautiful, warm harmonic structure (A2, E3, A3, E4)
    this.nightInsectsOscs = [];
    this.nightInsectsGains = [];

    // Slow LFO to modulate amplitude (makes the desert background breathe slowly)
    this.nightInsectsLFO = this.ctx.createOscillator();
    this.nightInsectsLFO.type = 'sine';
    this.nightInsectsLFO.frequency.setValueAtTime(0.08, this.ctx.currentTime); // Slow breathing cycle

    this.nightInsectsLFOGain = this.ctx.createGain();
    this.nightInsectsLFOGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    // Create a gain node for the night ambient layer (starts silent in day)
    this.nightInsectsGain = this.ctx.createGain();
    this.nightInsectsGain.gain.setValueAtTime(0, this.ctx.currentTime); 

    // Create lowpass filter to make it incredibly soft and cinematic
    this.nightInsectsFilter = this.ctx.createBiquadFilter();
    this.nightInsectsFilter.type = 'lowpass';
    this.nightInsectsFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
    this.nightInsectsFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    for (const freq of freqs) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.012, this.ctx.currentTime);

      // Connect slow LFO to gently wave the volumes
      this.nightInsectsLFOGain.connect(oscGain.gain);

      osc.connect(oscGain);
      oscGain.connect(this.nightInsectsFilter);

      // Muted background insect noise
      // osc.start(0);
      this.nightInsectsOscs.push(osc);
      this.nightInsectsGains.push(oscGain);
    }

    this.nightInsectsLFO.connect(this.nightInsectsLFOGain);
    // this.nightInsectsLFO.start(0);

    this.nightInsectsFilter.connect(this.nightInsectsGain);
    this.nightInsectsGain.connect(this.masterGain);
  }

  private setupCrickets() {
    // Disabled high-pitched repeating cricket burps completely for a positive, luxurious sound experience
  }

  private playCricketChirpBurst(nightVol: number) {
    // Disabled high-pitched cricket burps completely
  }

  public setSoundEnabled(enabled: boolean) {
    if (enabled) {
      this.play();
    } else {
      this.pause();
    }
  }

  private async play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    
    // Fade in master volume
    this.masterGain?.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.5);
    
    // Establish correct initial Day/Night volumes
    this.setNight(this.nightTransition > 0.5);
  }

  private pause() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    // Fade out master volume
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
    setTimeout(() => {
      this.isPlaying = false;
    }, 350);
  }

  public setNight(isNight: boolean) {
    this.nightTransition = isNight ? 1 : 0;
    
    if (!this.ctx || !this.windGain || !this.nightInsectsGain) return;

    const now = this.ctx.currentTime;
    const transitionTime = 2.0; // Smooth 2.0 second crossfade

    if (isNight) {
      // Day Wind fades into deep soft backdrop, Night Ambiance chord fades to full
      this.windGain.gain.linearRampToValueAtTime(0.015, now + transitionTime);
      this.windFilter?.frequency.linearRampToValueAtTime(80, now + transitionTime);
      
      this.nightInsectsGain.gain.linearRampToValueAtTime(0.06, now + transitionTime);
    } else {
      // Day Wind fades back to warm gentle rumble, Night Ambiance chord fades out
      this.windGain.gain.linearRampToValueAtTime(0.04, now + transitionTime);
      this.windFilter?.frequency.linearRampToValueAtTime(120, now + transitionTime);
      
      this.nightInsectsGain.gain.linearRampToValueAtTime(0, now + transitionTime);
    }
  }

  // Synthesized UI sound effects
  public playClick() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  public playChime() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      
      // Sparkling double bell chime (Major chord intervals: E6, A6)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.51, now); // E6
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760.00, now + 0.05); // A6
      
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      gain2.gain.setValueAtTime(0.06, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      
      osc1.start(now);
      osc1.stop(now + 0.3);
      
      osc2.start(now + 0.05);
      osc2.stop(now + 0.35);
    } catch (e) {}
  }

  public playError() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.22);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  public playTransition() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      filter.Q.setValueAtTime(1.5, now);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  public destroy() {
    if (this.cricketInterval) {
      clearInterval(this.cricketInterval);
    }
    try {
      this.windBufferNode?.stop();
      this.windLFO?.stop();
      this.nightInsectsOscs.forEach(o => { try { o.stop(); } catch (e) {} });
      this.nightInsectsLFO?.stop();
      this.ctx?.close();
    } catch (e) {}
    this.ctx = null;
    this.isPlaying = false;
  }
}

export const desertAudio = new DesertAudioManager();
