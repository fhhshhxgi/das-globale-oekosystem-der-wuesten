import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, BookOpen, Map, HelpCircle, Users, Activity, Eye, 
  ShieldAlert, Sparkles, AlertCircle, Volume2, VolumeX, 
  ArrowLeft, ArrowRight, Sun, Moon, Thermometer, Droplet, Home
} from 'lucide-react';

import DesertHero from './components/DesertHero';
import EcoFundamentals from './components/EcoFundamentals';
import InteractiveMap from './components/InteractiveMap';
import Biozönose from './components/Biozönose';
import FoodWeb from './components/FoodWeb';
import Wechselwirkungen from './components/Wechselwirkungen';
import Adaptations from './components/Adaptations';
import HumanImpact from './components/HumanImpact';
import InteractiveQuiz from './components/InteractiveQuiz';
import Conclusion from './components/Conclusion';
import MiniCompass from './components/MiniCompass';
import { desertAudio } from './utils/audioManager';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isNight = false;

  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);

  const totalSteps = 10;

  // Track visited steps
  useEffect(() => {
    if (!visitedSteps.includes(currentStep)) {
      setVisitedSteps((prev) => [...prev, currentStep]);
    }
  }, [currentStep, visitedSteps]);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      if (soundEnabled) desertAudio.playClick();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      if (soundEnabled) desertAudio.playClick();
      setCurrentStep(currentStep - 1);
    }
  };

  // Connect Web Audio API to States
  useEffect(() => {
    desertAudio.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    desertAudio.setNight(isNight);
  }, [isNight]);

  // Play transition sound on page changes
  useEffect(() => {
    if (soundEnabled) {
      desertAudio.playTransition();
    }
  }, [currentStep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      desertAudio.destroy();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid shifting pages if the user is focusing a text field or inside the quiz actively
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.id.startsWith('quiz-question')
      )) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, soundEnabled]);

  const navChapters = [
    { id: 0, key: 'hero', label: 'Start', icon: <Compass className="w-4 h-4" /> },
    { id: 1, key: 'grundlagen', label: '1. Öko-Faktoren', icon: <BookOpen className="w-4 h-4" /> },
    { id: 2, key: 'karte', label: '2. Wüstenkarte', icon: <Map className="w-4 h-4" /> },
    { id: 3, key: 'biozoenose', label: '3. Biozönose', icon: <Users className="w-4 h-4" /> },
    { id: 4, key: 'nahrungsnetz', label: '4. Nahrungsnetz', icon: <Activity className="w-4 h-4" /> },
    { id: 5, key: 'wechselwirkungen', label: '5. Beziehungen', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 6, key: 'anpassungen', label: '6. Anpassungen', icon: <Sparkles className="w-4 h-4" /> },
    { id: 7, key: 'mensch', label: '7. Mensch & Oase', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 8, key: 'quiz', label: '8. Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 9, key: 'fazit', label: '9. Fazit', icon: <Compass className="w-4 h-4" /> },
  ];

  // Helper to calculate progress percentage (for HUD indicator)
  const currentProgress = Math.round((currentStep / (totalSteps - 1)) * 100);

  // Render current chapter component based on state
  const renderCurrentChapter = () => {
    switch (currentStep) {
      case 0:
        return (
          <DesertHero 
            isNight={isNight} 
            onStartExpedition={() => {
              if (soundEnabled) desertAudio.playClick();
              setCurrentStep(1);
            }} 
            isPresentationMode={false}
            soundEnabled={soundEnabled}
          />
        );
      case 1:
        return <EcoFundamentals isNight={isNight} isPresentationMode={false} />;
      case 2:
        return <InteractiveMap isPresentationMode={false} />;
      case 3:
        return <Biozönose isNight={isNight} isPresentationMode={false} />;
      case 4:
        return <FoodWeb isNight={isNight} isPresentationMode={false} />;
      case 5:
        return <Wechselwirkungen isNight={isNight} isPresentationMode={false} />;
      case 6:
        return <Adaptations isNight={isNight} isPresentationMode={false} />;
      case 7:
        return <HumanImpact isNight={isNight} isPresentationMode={false} />;
      case 8:
        return <InteractiveQuiz isNight={isNight} isPresentationMode={false} />;
      case 9:
        return <Conclusion isNight={isNight} isPresentationMode={false} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500 selection:text-white bg-[#020617] text-slate-100">
      
      {/* GLOBAL FLOATING MINI-COMPASS HUD (Top Left) */}
      {currentStep > 0 && (
        <MiniCompass
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          visitedSteps={visitedSteps}
          isNight={isNight}
          navChapters={navChapters}
        />
      )}

      {/* GLOBAL FLOATING UTILITY HUD (Top Right) - iPad Optimized, touch-friendly size */}
      {currentStep > 0 && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">

          <button
            onClick={() => {
              if (soundEnabled) desertAudio.playClick();
              setCurrentStep(0);
            }}
            className="p-3.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white border border-orange-500/30 shadow-lg backdrop-blur-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
            title="Zurück zum Startbildschirm"
          >
            <Home className="w-5 h-5 text-orange-400" />
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3.5 rounded-full border shadow-lg backdrop-blur-md cursor-pointer transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${
              soundEnabled
                ? 'bg-orange-500 border-orange-400 text-white shadow-orange-500/30'
                : 'bg-slate-950/90 border-orange-500/30 text-white/70 hover:text-white'
            }`}
            title={soundEnabled ? "Umgebungssound stummschalten" : "Web Audio API Natur-Synthesizer starten"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* MAIN ANIMATED CONTENT CANVAS */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full min-h-full"
          >
            {renderCurrentChapter()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PERSISTENT BOTTOM CONTROL DOCK & ECO-HUD */}
      <AnimatePresence>
        {currentStep > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-4 md:px-6 py-2.5 rounded-2xl bg-slate-950/95 text-white border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md max-w-2xl w-[94%] h-20"
          >
            {/* Left Button: Zurück */}
            <button
              onClick={prevStep}
              className="p-3 px-4 md:px-5 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold uppercase tracking-wide cursor-pointer active:scale-95 shrink-0"
              title="Vorheriges Kapitel (Pfeiltaste Links)"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              <span className="hidden sm:inline">Zurück</span>
            </button>

            {/* Middle: Page Indicator */}
            <div className="flex flex-col items-center px-2 font-mono text-center flex-1 min-w-0 mx-2">
              <span className="text-[9px] text-orange-400 font-bold uppercase tracking-widest leading-none mb-1">Navigation</span>
              <span className="text-xs md:text-sm font-black text-white leading-none whitespace-nowrap uppercase tracking-wide">
                Kapitel {currentStep}: {navChapters.find(c => c.id === currentStep)?.label.replace(/^\d+\.\s*/, '') || ''}
              </span>
              <span className="text-[9px] md:text-xs font-semibold mt-1 text-slate-400">
                Fortschritt: {currentStep} von {totalSteps - 1} ({currentProgress}%)
              </span>
            </div>

            {/* Right Button: Weiter */}
            <button
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
              className="p-3 px-4 md:px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold uppercase tracking-wide shadow-md shadow-orange-500/20 cursor-pointer active:scale-95 shrink-0"
              title="Nächstes Kapitel"
            >
              <span className="hidden sm:inline">Weiter</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
