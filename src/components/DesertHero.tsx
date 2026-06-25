import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';
import { desertAudio } from '../utils/audioManager';

interface DesertHeroProps {
  isNight: boolean;
  onStartExpedition: () => void;
  isPresentationMode: boolean;
  soundEnabled?: boolean;
}

export default function DesertHero({ isNight, onStartExpedition, isPresentationMode, soundEnabled = false }: DesertHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay blocked or failed:", err);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#030712] font-sans select-none">
      
      {/* Cinematic Looping Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none opacity-60"
      >
        <source src="/desert.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/4221156/4221156-sd_960_540_24fps.mp4" type="video/mp4" />
      </video>

      {/* 3. Deep Cinematic Gradients (z-20) to ensure pristine text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/50 z-20 pointer-events-none" />

      {/* Top Academic Navigation Bar (z-30) */}
      <header className="relative z-30 w-full px-8 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
            <Compass className="w-5 h-5 text-orange-400 animate-spin" style={{ animationDuration: '40s' }} />
          </div>
          <div>
            <div className="text-xs font-mono font-black text-orange-400 tracking-[0.2em] uppercase">
              GLOBALE TROCKENGEBIETE
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider">
              Anpassung & Überlebensstrategien extremer Ökosysteme
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          {isPresentationMode && (
            <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-blue-950/40 border border-blue-500/30 text-blue-400">
              PRÄSENTER-MODUS
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-emerald-950/30 border border-emerald-500/20 text-emerald-400">
            KAPITEL 1-9 BEREIT
          </span>
        </motion.div>
      </header>

      {/* Centered Typography & Primary Interactive Core (z-30) */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-10">
        
        {/* Small decorative capsule */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-950/20 backdrop-blur-md shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-orange-300 uppercase font-black">
            LERN-EXPEDITION WÜSTE
          </span>
        </motion.div>

        {/* Big high-contrast Title */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tight uppercase leading-[1.1] pt-6 pb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-lg">
              WÜSTE
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-[0.4em] text-orange-400 uppercase mt-3">
              DAS GLOBALE ÖKOSYSTEM DER WÜSTEN
            </h2>
          </motion.div>

          {/* Descriptive Intro text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed tracking-wide"
          >
            Erforsche die faszinierenden biologischen Anpassungen und Überlebensstrategien in den extremsten Trockenregionen unserer Erde. Untersuche abiotische Faktoren, komplexe Nahrungsbeziehungen sowie den menschlichen Einfluss auf diese fragilen Ökosysteme.
          </motion.p>
        </div>

        {/* High-end "Expedition betreten" button */}
        <motion.button
          id="expedition-enter-btn"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group flex items-center gap-4 px-8 py-4.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:border-orange-500/60 shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden max-w-sm"
          onClick={() => {
            if (soundEnabled) desertAudio.playClick();
            onStartExpedition();
          }}
          title="Klicke hier, um die Expedition zu starten!"
        >
          {/* Subtle light pulse background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Moving decorative border line */}
          <div className="absolute -inset-px bg-gradient-to-r from-orange-500/50 via-transparent to-amber-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xs" />
          
          {/* Compass Icon container with interactive spinning */}
          <div className="relative z-10 w-11 h-11 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center group-hover:border-orange-500/40 transition-colors duration-300">
            <Compass className="w-5 h-5 text-orange-400 group-hover:rotate-[360deg] transition-transform duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
          </div>

          {/* Button Text */}
          <span className="relative z-10 font-mono text-xs font-black tracking-[0.25em] text-slate-100 uppercase group-hover:text-white group-hover:tracking-[0.28em] transition-all duration-300">
            Expedition betreten
          </span>

          {/* Arrow signifier */}
          <div className="relative z-10 p-1.5 rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </motion.button>

        {/* Core Chapter Highlights Index */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full pt-8 border-t border-slate-900"
        >
          <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900/60 p-3.5 rounded-xl text-left backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500">KAPITEL 1-2</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">Abiotische Faktoren</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900/60 p-3.5 rounded-xl text-left backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500">KAPITEL 3-5</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">Biotische Netze</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-900/60 p-3.5 rounded-xl text-left backdrop-blur-xs">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500">KAPITEL 6-9</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">Anpassungen & Quiz</div>
            </div>
          </div>
        </motion.div>


      </main>

    </div>
  );
}
