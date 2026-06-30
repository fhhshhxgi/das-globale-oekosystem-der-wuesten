import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { desertAudio } from '../utils/audioManager';

interface DesertHeroProps {
  isNight: boolean;
  onStartExpedition: () => void;
  isPresentationMode: boolean;
  soundEnabled?: boolean;
}

export default function DesertHero({ isNight, onStartExpedition, isPresentationMode, soundEnabled = false }: DesertHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for raw and smoothed scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  // Fallback Auto-play & Touch gesture unlock
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;

      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("Autoplay blocked or failed:", err);
        });
      };

      playVideo();

      const handleGesture = () => {
        if (video.paused) {
          video.play()
            .then(() => cleanup())
            .catch((err) => console.warn("Gesture play failed:", err));
        } else {
          cleanup();
        }
      };

      const cleanup = () => {
        document.removeEventListener('touchstart', handleGesture);
        document.removeEventListener('click', handleGesture);
        document.removeEventListener('keydown', handleGesture);
      };

      document.addEventListener('touchstart', handleGesture, { passive: true });
      document.addEventListener('click', handleGesture, { passive: true });
      document.addEventListener('keydown', handleGesture, { passive: true });

      return () => {
        cleanup();
      };
    }
  }, []);

  // Highly optimized scroll scrubbing interpolation loop
  useEffect(() => {
    let rawProgress = 0;
    let interpolatedProgress = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      rawProgress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setScrollProgress(rawProgress);
    };

    // Elastic ease loop with a non-blocking seek queue (perfect for iPads/iOS!)
    const updateScrub = () => {
      // Smoother lerp factor for luxury cinematic feel
      const lerpFactor = 0.07;
      interpolatedProgress += (rawProgress - interpolatedProgress) * lerpFactor;
      
      setSmoothProgress(interpolatedProgress);

      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration) && video.readyState >= 2) {
        const targetTime = interpolatedProgress * video.duration;
        
        // Golden Rule of HTML5 Video Scrubbing:
        // Do not update currentTime if the browser is currently executing a seek.
        // This queues the updates and prevents stuttering on iPads/low-end devices.
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateScrub);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateScrub);
    handleScroll(); // initial layout calculations

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Ambient sand dust particle simulation (Canvas layer)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic scale helper for high-density screens (like iPad Retina)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.6; // slightly visible grains
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * -0.4 - 0.1; // rise slowly (heat waves)
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = `rgba(249, ${115 + Math.floor(Math.random() * 50)}, 22, ${this.opacity})`;
      }

      update(scrollDelta: number) {
        // Particles drift sideways and float upwards depending on scroll momentum
        this.x += this.speedX + scrollDelta * 1.5;
        this.y += this.speedY - Math.abs(scrollDelta) * 2.5;

        // Wrap edges smoothly
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    // Balanced particle count to keep performance buttery smooth on iPads
    const particleCount = Math.min(80, Math.floor((width * height) / 20000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let lastScrollY = window.scrollY;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.06;
      lastScrollY = currentScrollY;

      particles.forEach((p) => {
        p.update(scrollDelta);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate opacity/scale values dynamically using the interpolated 'smoothProgress'
  // Stage 1: Big Typography Title (progress 0.0 -> 0.35)
  const titleOpacity = Math.max(0, 1 - smoothProgress * 2.8);
  const titleTranslateY = smoothProgress * -80;

  // Stage 2: Narrative Bento Card (progress 0.25 -> 0.72)
  const narrativeOpacity = smoothProgress < 0.48
    ? Math.max(0, Math.min(1, (smoothProgress - 0.22) * 5.5))
    : Math.max(0, Math.min(1, (0.72 - smoothProgress) * 5.5));
  const narrativeTranslateY = (1 - narrativeOpacity) * 25;

  // Stage 3: CTA Button Screen (progress 0.68 -> 1.0)
  const ctaOpacity = Math.max(0, Math.min(1, (smoothProgress - 0.68) * 4.5));
  const ctaTranslateY = (1 - ctaOpacity) * 30;

  // Cinematic scaling / contrast highlights with parallax translation
  const videoScale = 1 + smoothProgress * 0.08;
  const videoTranslateY = smoothProgress * 40; // parallax downshift as we scroll
  const videoOpacity = 0.45 + smoothProgress * 0.35; // gets richer as user scrolls down

  return (
    <div ref={scrollContainerRef} className="relative h-[300vh] w-full bg-[#020617] font-sans select-none">
      
      {/* Pinned Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Widescreen Cinematic Letterboxing (Top and Bottom Black Ambient Bars) */}
        <div className="absolute top-0 inset-x-0 h-8 md:h-12 bg-black/60 z-30 pointer-events-none border-b border-white/5 backdrop-blur-xs" />
        <div className="absolute bottom-0 inset-x-0 h-8 md:h-12 bg-black/60 z-30 pointer-events-none border-t border-white/5 backdrop-blur-xs" />

        {/* Video Scrubber */}
        <video
          ref={videoRef}
          preload="auto"
          muted={true}
          playsInline={true}
          style={{ 
            transform: `scale(${videoScale}) translate3d(0, ${videoTranslateY}px, 0)`, 
            opacity: videoOpacity 
          }}
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none transition-all duration-300 ease-out will-change-[transform,opacity]"
        >
          <source src="/desert.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/4221156/4221156-sd_960_540_24fps.mp4" type="video/mp4" />
        </video>

        {/* Floating Sand Dust Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-15 pointer-events-none mix-blend-screen opacity-55"
        />

        {/* Deep Multi-Layer Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/90 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40 z-20 pointer-events-none" />

        {/* Warm Golden Hour Ambient Sun Glow */}
        <div 
          style={{ opacity: 0.12 + smoothProgress * 0.18 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,transparent_65%)] z-20 pointer-events-none transition-opacity duration-300" 
        />

        {/* Top Navigation - padded perfectly for iPads */}
        <header className="relative z-30 w-full px-6 md:px-8 py-6 md:py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 md:mt-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-md shadow-lg shadow-orange-500/5">
              <Compass className="w-5 h-5 text-orange-400 animate-spin" style={{ animationDuration: '40s' }} />
            </div>
            <div>
              <div className="text-xs font-mono font-black text-orange-400 tracking-[0.25em] uppercase">
                GLOBALE TROCKENGEBIETE
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                Wissenschaftliche Expedition & Ökologie
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isPresentationMode && (
              <span className="px-3.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400">
                PRÄSENTER-MODUS
              </span>
            )}
            <span className="px-3.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              KAPITEL BEREIT • 1-9
            </span>
          </div>
        </header>

        {/* Main Immersive Screens */}
        <div className="relative z-30 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto px-6">
          
          {/* ========================================================= */}
          {/* STAGE 1: Giant Immersive Heading (0.0 -> 0.35) */}
          {/* ========================================================= */}
          <div 
            style={{ 
              opacity: titleOpacity, 
              transform: `translateY(${titleTranslateY}px)`,
              pointerEvents: smoothProgress > 0.32 ? 'none' : 'auto'
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto transition-all duration-300 ease-out"
          >
            {/* Small decorative tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-950/30 backdrop-blur-md shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-orange-300 uppercase font-black">
                WISSENSCHAFTS-VORTRAEGE
              </span>
            </div>

            <div className="space-y-4">
              {/* Responsive font sizes perfectly scaled for iPads and Desktops */}
              <h1 className="text-6xl sm:text-8xl md:text-[11.5rem] font-black tracking-tight uppercase leading-[1.05] pt-12 pb-4 px-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                WÜSTE
              </h1>
              <h2 className="text-[10px] sm:text-xs md:text-base font-bold tracking-[0.45em] text-orange-400 uppercase mt-2">
                Das globale Ökosystem der Trockenräume
              </h2>
            </div>

            <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed tracking-wide px-4">
              Erforsche die biologischen Anpassungen und Überlebensstrategien in den extremen Trockenregionen unserer Erde.
            </p>

            {/* Scroll Indicator Prompt */}
            <div className="pt-6 md:pt-8 flex flex-col items-center gap-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                SCROLLEN FÜR DETAILANSICHT
              </span>
              <div className="p-1 px-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 animate-bounce">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 2: Interactive Narrative Bento Slide (0.25 -> 0.72) */}
          {/* ========================================================= */}
          <div 
            style={{ 
              opacity: narrativeOpacity,
              transform: `translateY(${narrativeTranslateY}px)`,
              pointerEvents: (smoothProgress < 0.22 || smoothProgress > 0.72) ? 'none' : 'auto'
            }}
            className="absolute inset-x-4 max-w-4xl mx-auto bg-slate-950/75 border border-white/5 backdrop-blur-xl p-5 md:p-8 rounded-3xl shadow-2xl transition-all duration-300 ease-out grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="md:col-span-3 pb-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400 animate-spin" style={{ animationDuration: '25s' }} />
                <span className="text-[10px] font-mono tracking-[0.2em] text-orange-400 uppercase font-black">WICHTIGE MERKMALE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">STECKBRIEF DER WÜSTE</span>
            </div>

            {/* Factor 1 */}
            <div className="space-y-2 p-3.5 md:p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300 group">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-mono font-bold text-xs border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black transition-all">
                01
              </div>
              <h3 className="font-sans font-black text-xs md:text-sm text-white uppercase tracking-wide">Extreme Trockenheit</h3>
              <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed">
                Es verdunstet viel mehr Wasser, als durch den seltenen Regen hinzukommt. Das führt zu ständigem Wassermangel.
              </p>
            </div>

            {/* Factor 2 */}
            <div className="space-y-2 p-3.5 md:p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300 group">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-mono font-bold text-xs border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black transition-all">
                02
              </div>
              <h3 className="font-sans font-black text-xs md:text-sm text-white uppercase tracking-wide">Karger Untergrund</h3>
              <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed">
                Ob feiner Sand, grober Kies oder festes Felsgestein: Der Boden ist nährstoffarm und bietet Pflanzen kaum Halt.
              </p>
            </div>

            {/* Factor 3 */}
            <div className="space-y-2 p-3.5 md:p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300 group">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-mono font-bold text-xs border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black transition-all">
                03
              </div>
              <h3 className="font-sans font-black text-xs md:text-sm text-white uppercase tracking-wide">Spezialisierte Organismen</h3>
              <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed">
                Trotz der lebensfeindlichen Umstände leben hier angepasste Pflanzen und Tiere in einem ökologischen Kreislauf.
              </p>
            </div>

            <div className="md:col-span-3 pt-2 text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest animate-pulse">
                Scrolle weiter nach unten, um die Expedition freizuschalten
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 3: Final Call-To-Action (0.68 -> 1.0) */}
          {/* ========================================================= */}
          <div 
            style={{ 
              opacity: ctaOpacity,
              transform: `translateY(${ctaTranslateY}px)`,
              pointerEvents: smoothProgress < 0.68 ? 'none' : 'auto'
            }}
            className="absolute inset-x-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 transition-all duration-300 ease-out"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-spin" style={{ animationDuration: '5s' }} />
                BEREIT FÜR DIE ANALYSE
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase text-white tracking-tight leading-tight px-4">
                Starte dein Wüstenabenteuer
              </h2>
              <p className="max-w-lg mx-auto text-[11px] sm:text-xs md:text-sm text-slate-300 px-4">
                Erforsche abiotische Faktoren, wechsle zwischen Tag- und Nachtsimulation und entdecke die evolutionären Überlebens-Anpassungen!
              </p>
            </div>

            {/* Luxury CTA Button */}
            <button
              id="expedition-enter-btn-scrub"
              className="relative group flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 rounded-full border border-orange-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:border-orange-500/60 shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden max-w-sm mx-auto active:scale-95"
              onClick={() => {
                if (soundEnabled) desertAudio.playClick();
                onStartExpedition();
              }}
              title="Klicke hier, um die Expedition zu starten!"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/15 to-amber-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px bg-gradient-to-r from-orange-500/50 via-transparent to-amber-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xs" />
              
              <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-slate-900/85 border border-white/10 flex items-center justify-center group-hover:border-orange-500/40 transition-colors duration-300">
                <Compass className="w-4 h-4 md:w-5 md:h-5 text-orange-400 group-hover:rotate-[360deg] transition-transform duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              </div>

              <span className="relative z-10 font-mono text-[10px] md:text-xs font-black tracking-[0.25em] text-slate-100 uppercase group-hover:text-white group-hover:tracking-[0.28em] transition-all duration-300">
                Expedition starten
              </span>

              <div className="relative z-10 p-1.5 rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300">
                <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </button>
          </div>

        </div>

        {/* Bottom Interactive Progress Stats - padded beautifully for iPads */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/10 backdrop-blur-xs mb-8 md:mb-10">
          
          {/* Scroll progress bar */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0">Winkel</span>
            <div className="w-32 md:w-36 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
              <div 
                style={{ width: `${smoothProgress * 100}%` }}
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-100" 
              />
            </div>
            <span className="text-[10px] font-mono text-orange-400 font-bold shrink-0">{Math.round(smoothProgress * 100)}% Gelesen</span>
          </div>

          {/* Quick Chapters */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-slate-500">
            <span className={smoothProgress < 0.22 ? "text-orange-400 font-black transition-colors" : "transition-colors"}>I. Wüste</span>
            <span>•</span>
            <span className={(smoothProgress >= 0.22 && smoothProgress < 0.68) ? "text-orange-400 font-black transition-colors" : "transition-colors"}>II. Dimension</span>
            <span>•</span>
            <span className={smoothProgress >= 0.68 ? "text-orange-400 font-black transition-colors" : "transition-colors"}>III. Start</span>
          </div>

          <div className="text-[10px] font-mono text-slate-500">
            Biologie Q1 • Ökosystem Wüste
          </div>

        </footer>

      </div>

    </div>
  );
}
