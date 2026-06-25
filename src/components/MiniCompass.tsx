import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, CheckCircle2, ChevronRight, MapPin, Eye, Zap } from 'lucide-react';

interface MiniCompassProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  visitedSteps: number[];
  isNight: boolean;
  navChapters: { id: number; key: string; label: string; icon: React.ReactNode }[];
}

export default function MiniCompass({
  currentStep,
  setCurrentStep,
  visitedSteps,
  isNight,
  navChapters
}: MiniCompassProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate needle angle based on progress (0 to 360 degrees)
  const angle = (currentStep / (navChapters.length - 1)) * 360;

  return (
    <div className="fixed top-6 left-6 z-50 select-none">
      <div className="relative flex items-center gap-3">
        {/* Main Floating Trigger Button (Mini-Compass Dial) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full border shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-500 z-50 ${
            isNight
              ? 'bg-slate-950/90 border-indigo-500/40 text-sky-400 hover:border-sky-400'
              : 'bg-white/95 border-orange-300 text-orange-600 hover:border-orange-500'
          }`}
          title="Digital-Kompass HUD öffnen"
        >
          {/* Outer Rotating Compass Rings */}
          <div className="absolute inset-0.5 rounded-full border border-dashed border-current opacity-30 animate-[spin_60s_linear_infinite]" />
          
          {/* Degree ticks */}
          <div className="absolute inset-2 rounded-full border border-current opacity-10" />

          {/* Core Compass Needle */}
          <motion.div
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="w-1.5 h-10 relative flex flex-col justify-between items-center"
          >
            {/* North Red Pointer */}
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[20px] border-b-red-500 filter drop-shadow-[0_1px_3px_rgba(239,68,68,0.6)]" />
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-slate-900 z-10 shadow-sm" />
            
            {/* South Silver Pointer */}
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[20px] border-t-slate-300" />
          </motion.div>

          {/* Visited Progress Indicator Ring */}
          <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none">
            <circle
              cx="28"
              cy="28"
              r="26"
              className="stroke-current opacity-10 fill-none"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              className={isNight ? 'stroke-sky-400' : 'stroke-orange-500'}
              strokeWidth="2.5"
              fill="none"
              initial={{ strokeDasharray: '163 163', strokeDashoffset: 163 }}
              animate={{
                strokeDashoffset: 163 - (163 * visitedSteps.length) / navChapters.length
              }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* Active/Radar Sweep Ripple */}
          <div className={`absolute -inset-1.5 rounded-full animate-ping opacity-15 pointer-events-none ${
            isNight ? 'bg-sky-400' : 'bg-orange-500'
          }`} />
        </motion.button>

        {/* Floating Progress Pill */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`hidden sm:flex flex-col px-4 py-2 rounded-2xl border shadow-md backdrop-blur-md cursor-pointer ${
            isNight
              ? 'bg-slate-950/80 border-slate-800 text-slate-200'
              : 'bg-white/90 border-amber-100 text-sand-900'
          }`}
        >
          <span className="text-[9px] font-mono font-bold tracking-widest opacity-50 uppercase leading-none">GPS-Kompass</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-sky-400 animate-pulse' : 'bg-orange-500 animate-pulse'}`} />
            <span className="text-xs font-black">
              {navChapters[currentStep].label}
            </span>
          </div>
        </motion.div>

        {/* HUD Interactive Overlay Map & Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Invisible Backdrop Closer */}
              <div 
                className="fixed inset-0 z-40 bg-black/5" 
                onClick={() => setIsOpen(false)} 
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20, y: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20, y: -10 }}
                transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                className={`absolute top-16 left-0 w-80 p-5 rounded-3xl border shadow-2xl backdrop-blur-xl z-40 ${
                  isNight
                    ? 'bg-slate-950/95 border-indigo-500/30 text-white'
                    : 'bg-white/95 border-amber-200 text-sand-950'
                }`}
              >
                {/* Holographic Header */}
                <div className="flex items-center justify-between border-b border-orange-500/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: '20s' }} />
                    <div>
                      <h4 className="text-sm font-bold tracking-tight uppercase">Expeditions-Radar</h4>
                      <p className="text-[10px] font-mono text-orange-400">LOGISCHER STATUS: LIVE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-md font-bold">
                      {Math.round((visitedSteps.length / navChapters.length) * 100)}% Erkundet
                    </span>
                  </div>
                </div>

                {/* Vertical Progression Path with Visit Highlights */}
                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {navChapters.map((chap) => {
                    const isVisited = visitedSteps.includes(chap.id);
                    const isActive = currentStep === chap.id;

                    return (
                      <button
                        key={chap.id}
                        onClick={() => {
                          setCurrentStep(chap.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 border-orange-400 text-white shadow-lg shadow-orange-500/15 font-bold'
                            : isVisited
                              ? isNight
                                ? 'bg-slate-900/60 border-indigo-950 text-indigo-200 hover:border-indigo-500/30'
                                : 'bg-amber-50/50 border-amber-100/50 text-sand-800 hover:border-amber-300'
                              : isNight
                                ? 'bg-slate-950/20 border-slate-900/40 text-slate-500 opacity-60 hover:opacity-100 hover:border-slate-800'
                                : 'bg-slate-50/40 border-slate-100 text-stone-400 opacity-60 hover:opacity-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Left node point */}
                          <div className={`relative flex items-center justify-center w-6 h-6 rounded-lg ${
                            isActive
                              ? 'bg-white text-orange-600'
                              : isVisited
                                ? isNight ? 'bg-indigo-950 text-sky-400' : 'bg-amber-100 text-orange-600'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                          }`}>
                            {isVisited && !isActive ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <span className="text-[10px] font-mono font-bold">{chap.id}</span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{chap.label}</div>
                            <div className="text-[9px] font-mono opacity-50 tracking-wider uppercase leading-none mt-0.5">
                              {isActive ? 'Aktiv' : isVisited ? 'Besucht' : 'Unentdeckt'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {isActive && (
                            <MapPin className="w-3.5 h-3.5 text-white animate-bounce" />
                          )}
                          <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Micro Footer Summary */}
                <div className={`mt-4 pt-3 border-t border-dashed text-[10px] font-mono opacity-60 leading-relaxed text-center ${
                  isNight ? 'border-slate-800' : 'border-amber-100'
                }`}>
                  Fahre fort, um weitere Forschungsdaten freizuschalten.
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
