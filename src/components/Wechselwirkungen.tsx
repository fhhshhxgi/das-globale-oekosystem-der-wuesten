import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, AlertTriangle, Flame, ShieldAlert, Heart, HelpCircle, 
  Play, Pause, RotateCcw, Sparkles, TrendingUp, Info, 
  ArrowRight, ArrowLeft, Sun, Droplet, RefreshCw
} from 'lucide-react';
import { InteractionCard } from '../types';
import { desertAudio } from '../utils/audioManager';

interface WechselwirkungenProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function Wechselwirkungen({ isNight, isPresentationMode }: WechselwirkungenProps) {
  const [activeInteractionId, setActiveInteractionId] = useState<string>('raeuber_beute');

  // --- SIMULATOR 1: Lotka-Volterra Räuber-Beute ---
  const [preyPop, setPreyPop] = useState<number>(45);
  const [predPop, setPredPop] = useState<number>(12);
  const [lvHistory, setLvHistory] = useState<{ prey: number; pred: number }[]>(() => {
    let arr = [];
    let pr = 45;
    let pd = 12;
    for (let i = 0; i < 18; i++) {
      arr.push({ prey: Math.round(pr), pred: Math.round(pd) });
      const dPrey = (0.09 * pr - 0.004 * pr * pd) * 0.8;
      const dPred = (0.003 * pr * pd - 0.08 * pd) * 0.8;
      pr = Math.max(5, pr + dPrey);
      pd = Math.max(2, pd + dPred);
    }
    return arr;
  });
  const [simRunning, setSimRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setLvHistory(prev => {
        const last = prev[prev.length - 1] || { prey: 45, pred: 12 };
        
        // Lotka-Volterra standard biological coefficients
        const alpha = 0.16; // Prey natural growth rate
        const beta = 0.0045; // Predator predation efficiency
        const gamma = 0.12; // Predator natural death rate
        const delta = 0.0032; // Predator growth from hunting
        const dt = 0.7; // Step multiplier
        
        const dPrey = (alpha * last.prey - beta * last.prey * last.pred) * dt;
        const dPred = (delta * last.prey * last.pred - gamma * last.pred) * dt;
        
        let nextPrey = Math.max(3, last.prey + dPrey);
        let nextPred = Math.max(1, last.pred + dPred);
        
        if (nextPrey > 160) nextPrey = 160;
        if (nextPred > 70) nextPred = 70;
        
        const roundedPrey = Math.round(nextPrey);
        const roundedPred = Math.round(nextPred);
        
        setPreyPop(roundedPrey);
        setPredPop(roundedPred);
        
        return [...prev.slice(1), { prey: roundedPrey, pred: roundedPred }];
      });
    }, 200);
    return () => clearInterval(interval);
  }, [simRunning]);

  const resetLvSimulation = () => {
    setSimRunning(false);
    const initialPrey = 45;
    const initialPred = 12;
    setPreyPop(initialPrey);
    setPredPop(initialPred);
    
    let arr = [];
    let pr = initialPrey;
    let pd = initialPred;
    for (let i = 0; i < 18; i++) {
      arr.push({ prey: Math.round(pr), pred: Math.round(pd) });
      const dPrey = (0.09 * pr - 0.004 * pr * pd) * 0.8;
      const dPred = (0.003 * pr * pd - 0.08 * pd) * 0.8;
      pr = Math.max(5, pr + dPrey);
      pd = Math.max(2, pd + dPred);
    }
    setLvHistory(arr);
    try { desertAudio.playClick(); } catch (e) {}
  };

  // --- SIMULATOR 2: Innerartliche Konkurrenz (Fenneks) ---
  const [fennekDensity, setFennekDensity] = useState<number>(3);

  // Territory circles configuration
  const fennekPositions = [
    { cx: 100, cy: 60, rx: 35, ry: 35, color: 'stroke-teal-500 bg-teal-500/10' },
    { cx: 65, cy: 50, rx: 32, ry: 32, color: 'stroke-amber-500 bg-amber-500/10' },
    { cx: 135, cy: 55, rx: 34, ry: 34, color: 'stroke-emerald-500 bg-emerald-500/10' },
    { cx: 90, cy: 85, rx: 30, ry: 30, color: 'stroke-cyan-500 bg-cyan-500/10' },
    { cx: 125, cy: 80, rx: 28, ry: 28, color: 'stroke-orange-500 bg-orange-500/10' },
    { cx: 60, cy: 80, rx: 27, ry: 27, color: 'stroke-indigo-500 bg-indigo-500/10' },
    { cx: 110, cy: 35, rx: 28, ry: 28, color: 'stroke-pink-500 bg-pink-500/10' },
    { cx: 155, cy: 40, rx: 25, ry: 25, color: 'stroke-rose-500 bg-rose-500/10' },
  ];

  // Calculated values based on Fennek density
  const territorySize = (5.0 / (fennekDensity * 0.7 + 0.3)).toFixed(1);
  const stressPercent = Math.min(100, Math.round((fennekDensity - 1) * 14.2));
  let stressLevel = 'Niedrig (Keine Revierkämpfe)';
  let stressColor = 'text-emerald-400';
  let stressBarColor = 'bg-emerald-500';
  if (fennekDensity >= 6) {
    stressLevel = 'Kritisch (Dauerhaftes Konfliktrisiko!)';
    stressColor = 'text-rose-500 font-bold animate-pulse';
    stressBarColor = 'bg-rose-500';
  } else if (fennekDensity >= 4) {
    stressLevel = 'Mittel (Regelmäßige Reviergrenzenstreitigkeiten)';
    stressColor = 'text-amber-400';
    stressBarColor = 'bg-amber-500';
  }

  // --- SIMULATOR 3: Zwischenartliche Konkurrenz ---
  const [showMouse, setShowMouse] = useState<boolean>(true);
  const [showAnts, setShowAnts] = useState<boolean>(true);
  const [showBeetles, setShowBeetles] = useState<boolean>(true);
  const [seedAbundance, setSeedAbundance] = useState<number>(40); // 10 (dry) to 100 (wet)

  // Calculate dynamic resource capture share (normalized)
  let baseMouseEff = showMouse ? 55 : 0;
  let baseAntEff = showAnts ? 32 : 0;
  let baseBeetleEff = showBeetles ? 18 : 0;

  // Under drought (low seedAbundance), smaller competitors (ants) are slightly more efficient
  if (seedAbundance < 35) {
    if (showAnts) baseAntEff += 15;
    if (showBeetles) baseBeetleEff += 5;
    if (showMouse) baseMouseEff -= 10;
  }

  const effTotal = baseMouseEff + baseAntEff + baseBeetleEff;
  const mouseShare = effTotal > 0 && showMouse ? Math.round((baseMouseEff / effTotal) * 100) : 0;
  const antShare = effTotal > 0 && showAnts ? Math.round((baseAntEff / effTotal) * 100) : 0;
  const beetleShare = effTotal > 0 && showBeetles ? Math.round((baseBeetleEff / effTotal) * 100) : 0;

  // --- SIMULATOR 4: Symbiose (Akazie & Wurzelpilz) ---
  const [sunlight, setSunlight] = useState<number>(70);
  const [soilDryness, setSoilDryness] = useState<number>(65);
  const [transferState, setTransferState] = useState<'idle' | 'transferring' | 'complete'>('idle');

  const akazieSugar = Math.round(sunlight * 1.1);
  const fungusMinerals = Math.round(soilDryness * 1.2);
  const mutualFitness = Math.round(35 + (akazieSugar + fungusMinerals) * 0.45);

  const startTransferAnimation = () => {
    setTransferState('transferring');
    try { desertAudio.playClick(); } catch (e) {}
    setTimeout(() => {
      setTransferState('complete');
    }, 1200);
  };

  // --- SIMULATOR 5: Parasitismus (Wüstennager & Milben) ---
  const [parasiteCount, setParasiteCount] = useState<number>(30);
  const [preenPulse, setPreenPulse] = useState<boolean>(false);

  const hostVitality = Math.max(12, Math.round(100 - parasiteCount * 0.9));
  const transmissionRisk = Math.min(100, Math.round(parasiteCount * 1.15));

  const runDustBath = () => {
    setPreenPulse(true);
    setParasiteCount(prev => Math.max(0, prev - 25));
    try { desertAudio.playClick(); } catch (e) {}
    setTimeout(() => setPreenPulse(false), 800);
  };

  // Main list of ecosystem interactions
  const interactions: InteractionCard[] = [
    {
      id: 'raeuber_beute',
      title: 'Räuber-Beute-Beziehung',
      type: 'raeuber_beute',
      exampleTitle: 'Hornviper jagt Wüstenrennmaus',
      description: 'Die Hornviper (Prädator) reguliert die Dichte der Wüstenrennmaus (Beute). Diese beiden Populationen beeinflussen sich nach den biologischen Lotka-Volterra-Regeln wellenartig und zeitversetzt. Steigt die Beutedichte, vermehren sich auch die Schlangen zeitversetzt, wodurch der erhöhte Jagddruck die Mäusepopulation wieder absenkt.',
      ecologicalRole: 'Verhindert unkontrollierte Populationsausbrüche von Pflanzenfressern und stabilisiert die Vegetation.',
      illustrationType: '⚔️ Lotka-Volterra Simulation'
    },
    {
      id: 'innerartlich',
      title: 'Innerartliche Konkurrenz',
      type: 'innerartlich',
      exampleTitle: 'Fenneks beanspruchen dasselbe Revier',
      description: 'Zwei Fenneks derselben Art besetzen exakt dieselbe ökologische Nische. Da sie um absolut identische, knappe Ressourcen konkurrieren (Nahrung, kühle Erdbauten, Paarungspartner), ist die innerartliche Konkurrenz extrem intensiv und reguliert die Populationsdichte direkt über die Territoriumskompression.',
      ecologicalRole: 'Erzwingt die Abwanderung von Jungtieren und sichert die Verteilung der Individuen über karge Wüstenflächen.',
      illustrationType: '🦊 Territorium-Dichte-Modell'
    },
    {
      id: 'zwischenartlich',
      title: 'Zwischenartliche Konkurrenz',
      type: 'zwischenartlich',
      exampleTitle: 'Samenfresser im Konkurrenzkampf',
      description: 'Wüstenrennmäuse, Ernteameisen und Schwarzkäfer nutzen alle die vom Wind angewehten Pflanzensamen. Gemäß dem Konkurrenzausschlussprinzip verdrängt bei knapper Nahrung die überlegene Art andere, außer sie weichen durch Spezialisierung in getrennte Aktivitätszeiten oder Futtergrößen aus (Einnischung).',
      ecologicalRole: 'Treibt die Spezialisierung und Nischenendifferenzierung im Laufe der Evolution massiv voran.',
      illustrationType: '🌾 Nischen-Ressourcen-Kalkulator'
    },
    {
      id: 'symbiose',
      title: 'Symbiose (Mutualismus)',
      type: 'symbiose',
      exampleTitle: 'Wüstenakazie & Mykorrhiza-Pilz',
      description: 'Ein hocheffizienter Tauschhandel zum beiderseitigen Vorteil: Wurzelpilze vergrößern die Bodenoberfläche der Akazie um das Hundertfache, um Wasser und seltene Mineralien bereitzustellen. Im Gegenzug leitet die Akazie nährstoffreichen Photosynthese-Zucker direkt hinab an das pilzliche Myzel.',
      ecologicalRole: 'Ermöglicht das Gedeihen von lebendigen Akazien-Wäldern auf absolut kargen und nährstofffreien Sandflächen.',
      illustrationType: '🤝 Tauschfluss-Konfigurator'
    },
    {
      id: 'parasitismus',
      title: 'Parasitismus (Schwächung)',
      type: 'parasitismus',
      exampleTitle: 'Milbenbefall bei Wüstennagern',
      description: 'Parasitismus schädigt den Wirt (Wüstenrennmaus), ohne ihn direkt zu töten. Milben entziehen Blut und senken die energetische Belastbarkeit des Wirts erheblich. Sandbäder und gegenseitige Fellpflege stellen lebenswichtige Verhaltensweisen dar, um diesen negativen Druck zu regulieren.',
      ecologicalRole: 'Wirkt als natürlicher Selektionsfaktor und dichteabhängiger Krankheitsregulator bei dichter Besiedlung.',
      illustrationType: '⚠️ Vitalitäts- & Parasiten-Index'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'innerartlich': return <Users className="w-5 h-5 text-amber-400" />;
      case 'zwischenartlich': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'raeuber_beute': return <Flame className="w-5 h-5 text-red-400" />;
      case 'parasitismus': return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'symbiose': return <Heart className="w-5 h-5 text-emerald-400" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const activeInt = interactions.find(i => i.id === activeInteractionId) || interactions[0];

  // Colors for sidebar buttons
  const getButtonBorder = (id: string, isActive: boolean) => {
    if (!isActive) return 'border-white/5 bg-[#090a15]/60 hover:border-white/10 text-slate-300';
    switch (id) {
      case 'raeuber_beute': return 'border-red-500/80 bg-red-950/20 shadow-lg shadow-red-500/10 text-white font-semibold';
      case 'innerartlich': return 'border-amber-500/80 bg-amber-950/20 shadow-lg shadow-amber-500/10 text-white font-semibold';
      case 'zwischenartlich': return 'border-orange-500/80 bg-orange-950/20 shadow-lg shadow-orange-500/10 text-white font-semibold';
      case 'symbiose': return 'border-emerald-500/80 bg-emerald-950/20 shadow-lg shadow-emerald-500/10 text-white font-semibold';
      case 'parasitismus': return 'border-rose-500/80 bg-rose-950/20 shadow-lg shadow-rose-500/10 text-white font-semibold';
      default: return 'border-indigo-500 bg-indigo-950/20 text-white';
    }
  };

  return (
    <section 
      id="biotische-wechselwirkungen" 
      className="py-16 px-4 md:px-8 bg-[#030712] text-slate-100 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Decorative background grid and flares */}
      <div className="absolute inset-0 canvas-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Chapter 5 • Biotische Beziehungen
          </div>
          <h2 className="font-sans text-2xl md:text-4xl font-black uppercase text-white tracking-tight leading-normal py-1">
            5. Beziehungen & Dynamiken
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto font-sans">
            Lebewesen existieren nie isoliert. Experimentiere im Bio-Labor mit den dynamischen Beziehungen, Konkurrenz- und Kooperationsformen der Wüstenarten.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Menu Selector Sidebar - col span 4 */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
              Beziehungstyp auswählen:
            </span>
            {interactions.map((inter) => {
              const isActive = activeInteractionId === inter.id;
              return (
                <button
                  key={inter.id}
                  id={`btn-interaction-${inter.id}`}
                  onClick={() => {
                    setActiveInteractionId(inter.id);
                    try { desertAudio.playClick(); } catch (e) {}
                  }}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${getButtonBorder(inter.id, isActive)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {getIcon(inter.type)}
                    </div>
                    <div>
                      <h3 className="font-sans text-xs md:text-sm font-bold tracking-wide">
                        {inter.title}
                      </h3>
                      <span className="text-[9px] font-mono opacity-50 block mt-0.5">{inter.illustrationType}</span>
                    </div>
                  </div>
                  <span className={`text-xs transition-transform duration-300 ${isActive ? 'translate-x-1 text-orange-400' : 'opacity-20'}`}>➔</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Content & Interactive Simulation Panel - col span 8 */}
          <div className="lg:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900/30 border border-white/5 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between backdrop-blur-md h-full space-y-6"
              >
                {/* Textual Bio-Info Card */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-white/10 bg-white/5 text-slate-300">
                      {activeInt.illustrationType}
                    </span>
                    <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-bold">BIO-ANALYSE</span>
                  </div>

                  <h3 className="font-sans text-lg md:text-xl font-black uppercase text-white tracking-tight">
                    {activeInt.title}
                  </h3>
                  
                  {/* Real-world example label */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-orange-400 uppercase">
                      BEISPIEL: {activeInt.exampleTitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeInt.description}
                  </p>
                </div>

                {/* DYNAMIC INTERACTIVE LAB WORKSPACE */}
                <div className="bg-[#090a15] rounded-2xl border border-white/5 p-4 md:p-5 shadow-inner space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-mono font-black text-slate-300 tracking-wider uppercase">
                      INTERAKTIVES BIO-LABOR (LIVE-STEUERUNG)
                    </span>
                  </div>

                  {/* 1. Räuber-Beute Lotka-Volterra Simulator Workspace */}
                  {activeInt.id === 'raeuber_beute' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-orange-950/25 border border-orange-500/20 text-center">
                          <span className="text-[8px] font-mono font-bold text-orange-400 block uppercase">WÜSTENRENNMÄUSE (BEUTE)</span>
                          <span className="text-xl font-mono font-bold text-orange-300">{preyPop}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-red-950/25 border border-red-500/20 text-center">
                          <span className="text-[8px] font-mono font-bold text-red-400 block uppercase">HORNVIPERN (RÄUBER)</span>
                          <span className="text-xl font-mono font-bold text-red-300">{predPop}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex flex-col justify-center items-center gap-2">
                          <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase">SIMULATION</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                setSimRunning(!simRunning);
                                try { desertAudio.playClick(); } catch (e) {}
                              }}
                              className={`p-1.5 rounded-lg border text-white transition-all cursor-pointer ${simRunning ? 'bg-amber-600 border-amber-500' : 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500'}`}
                              title={simRunning ? "Pause" : "Play"}
                            >
                              {simRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={resetLvSimulation}
                              className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer"
                              title="Reset"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* SVG Line Chart representing populations */}
                      <div className="h-28 w-full bg-slate-950/80 rounded-xl relative border border-white/5 p-2 overflow-hidden">
                        <div className="absolute top-2 left-3 flex gap-4 text-[9px] font-mono">
                          <span className="flex items-center gap-1.5 text-orange-400"><span className="w-2 h-0.5 bg-orange-400 block"></span>Mäuse</span>
                          <span className="flex items-center gap-1.5 text-red-400"><span className="w-2 h-0.5 bg-red-400 block"></span>Vipern</span>
                        </div>
                        
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {/* Grid line */}
                          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          
                          {/* Polylines with custom calculations */}
                          {(() => {
                            const maxVal = Math.max(...lvHistory.map(d => Math.max(d.prey, d.pred)), 80);
                            const pointsPrey = lvHistory.map((d, i) => `${(i / (lvHistory.length - 1)) * 100},${100 - (d.prey / maxVal) * 80}`).join(' ');
                            const pointsPred = lvHistory.map((d, i) => `${(i / (lvHistory.length - 1)) * 100},${100 - (d.pred / maxVal) * 80}`).join(' ');
                            return (
                              <>
                                <polyline fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pointsPrey} className="transition-all duration-300" />
                                <polyline fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pointsPred} className="transition-all duration-300" strokeDasharray="2 1" />
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-white/5 flex gap-2 items-start">
                        <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-400 leading-normal">
                          <span className="font-bold text-slate-200 block mb-0.5">Lotka-Volterra Regeln im Spiel:</span>
                          Verfolgen Sie die Sinuskurven im Zeitverlauf. Erhöht sich die Beutedichte, vermehren sich die Vipers (Räuber) zeitversetzt. Sinkt die Mäusezahl ab, schrumpft durch Nahrungsmangel auch die Vipernzahl.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 2. Innerartliche Konkurrenz (Fennek Territory Model) Workspace */}
                  {activeInt.id === 'innerartlich' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400 font-bold">ANZAHL FENNEKS IM REVIER:</span>
                          <span className="text-amber-400 font-black">{fennekDensity} Fenneks</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          value={fennekDensity}
                          onChange={(e) => {
                            setFennekDensity(parseInt(e.target.value));
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-900 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                        {/* Beautiful grid of territories instead of overlapping ellipses */}
                        <div className="sm:col-span-7 bg-slate-950 rounded-xl border border-white/5 p-3.5 flex flex-col justify-between min-h-[160px]">
                          <div className="grid gap-2 h-full w-full" style={{
                            gridTemplateColumns: fennekDensity <= 2 ? `repeat(${fennekDensity}, minmax(0, 1fr))` :
                                                 fennekDensity <= 4 ? 'repeat(2, minmax(0, 1fr))' :
                                                 fennekDensity <= 6 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))'
                          }}>
                            {Array.from({ length: fennekDensity }).map((_, idx) => {
                              let cellBg = 'bg-teal-500/5 border-teal-500/20 text-teal-400';
                              let cellLabel = 'Ausgeglichen';
                              if (fennekDensity >= 6) {
                                cellBg = 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse';
                                cellLabel = 'Kämpfe! ⚔️';
                              } else if (fennekDensity >= 4) {
                                cellBg = 'bg-amber-500/10 border-amber-500/25 text-amber-400';
                                cellLabel = 'Druck ⚠️';
                              }
                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className={`rounded-lg border p-1.5 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 ${cellBg}`}
                                >
                                  <span className="text-xl md:text-2xl mb-1 block">🦊</span>
                                  <span className="text-[7px] font-mono uppercase tracking-wider block font-bold">Fuchs {idx + 1}</span>
                                  <span className="text-[6px] font-mono opacity-80 uppercase block">{cellLabel}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                          <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none mt-2 text-right">
                            Aufgeteiltes Revier-Raster • Keine Kreise
                          </div>
                        </div>

                        {/* Interactive dynamic readouts */}
                        <div className="sm:col-span-5 flex flex-col justify-between gap-3 text-[10px] font-mono">
                          <div className="p-3 bg-slate-950 rounded-lg border border-white/5 flex justify-between items-center">
                            <span className="text-slate-400">Flächenanteil pro Fuchs:</span>
                            <span className="text-amber-300 font-bold text-xs">{territorySize} km²</span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-lg border border-white/5 space-y-2 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between flex-wrap gap-1">
                              <span className="text-slate-400 font-bold">Verhaltensstress:</span>
                              <span className={stressColor}>{stressLevel}</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-500 ${stressBarColor}`} style={{ width: `${stressPercent}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Zwischenartliche Konkurrenz (Niche Exclusion Simulator) Workspace */}
                  {activeInt.id === 'zwischenartlich' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400 font-bold">SAMEN-RESSOURCEN (NAHRUNGSBASIS):</span>
                          <span className="text-orange-400 font-bold">
                            {seedAbundance < 35 ? '🏜️ Extremes Dürrejahr' : seedAbundance > 70 ? '🌱 Sintflutartiger Wüstenregen' : '🌤️ Normales Trockenjahr'} ({seedAbundance}%)
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={seedAbundance}
                          onChange={(e) => {
                            setSeedAbundance(parseInt(e.target.value));
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className="w-full accent-orange-500 cursor-pointer h-1 bg-slate-900 rounded-lg"
                        />
                      </div>

                      {/* Species Toggles */}
                      <div className="flex flex-wrap gap-2 justify-center border-t border-white/5 pt-3">
                        <button
                          onClick={() => {
                            setShowMouse(!showMouse);
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1 ${showMouse ? 'bg-amber-500/10 border-amber-500/50 text-amber-300' : 'bg-slate-950 border-white/5 opacity-40 text-slate-500'}`}
                        >
                          <span>🐹</span> Wüstenrennmaus
                        </button>
                        <button
                          onClick={() => {
                            setShowAnts(!showAnts);
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1 ${showAnts ? 'bg-rose-500/10 border-rose-500/50 text-rose-300' : 'bg-slate-950 border-white/5 opacity-40 text-slate-500'}`}
                        >
                          <span>🐜</span> Ernteameise
                        </button>
                        <button
                          onClick={() => {
                            setShowBeetles(!showBeetles);
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1 ${showBeetles ? 'bg-purple-500/10 border-purple-500/50 text-purple-300' : 'bg-slate-950 border-white/5 opacity-40 text-slate-500'}`}
                        >
                          <span>🪲</span> Schwarzkäfer
                        </button>
                      </div>

                      {/* Interactive Arena Map Grid instead of boring bar list */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-2">
                        {/* Left Side: Visualized Seed Oasis */}
                        <div className="md:col-span-4 bg-slate-950 rounded-xl border border-white/5 p-3 flex flex-col justify-between items-center text-center min-h-[140px] relative">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Ressourcen-Oase</span>
                          
                          {/* Visual Seeds clusters */}
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-md animate-pulse" />
                            <div className="text-2xl animate-bounce">🌾</div>
                            {/* Tiny glowing seed bits */}
                            {seedAbundance > 25 && <div className="absolute top-1 left-2 text-[9px] opacity-75">✨</div>}
                            {seedAbundance > 50 && <div className="absolute bottom-2 right-2 text-[9px] opacity-75">✨</div>}
                            {seedAbundance > 75 && <div className="absolute top-3 right-1 text-[9px] opacity-75">✨</div>}
                          </div>

                          <div className="space-y-0.5">
                            <div className="text-[10px] font-bold text-slate-300 uppercase">Samen-Fülle</div>
                            <div className="text-[9px] font-mono text-orange-400">{seedAbundance}% Vorrat</div>
                          </div>
                        </div>

                        {/* Right Side: Active species cards showing competition status */}
                        <div className="md:col-span-8 flex flex-col gap-2 justify-center">
                          {showMouse && (
                            <div className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.02] flex items-center justify-between gap-3 text-[10px] font-mono transition-all">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🐹</span>
                                <div>
                                  <div className="font-bold text-slate-100">Wüstenrennmaus</div>
                                  <div className="text-[8px] text-slate-500 uppercase">Aktivitätszeit: Dämmerung</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-amber-300">{mouseShare}% Ausbeute</div>
                                <div className="text-[8px] text-emerald-400 uppercase font-black">Dominant 🥇</div>
                              </div>
                            </div>
                          )}

                          {showAnts && (
                            <div className="p-2.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.02] flex items-center justify-between gap-3 text-[10px] font-mono transition-all">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🐜</span>
                                <div>
                                  <div className="font-bold text-slate-100">Ernteameise</div>
                                  <div className="text-[8px] text-slate-500 uppercase">Aktivitätszeit: Mittags</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-rose-300">{antShare}% Ausbeute</div>
                                <div className="text-[8px] text-teal-400 uppercase font-black">Spezialisiert 🔎</div>
                              </div>
                            </div>
                          )}

                          {showBeetles && (
                            <div className="p-2.5 rounded-xl border border-purple-500/20 bg-purple-500/[0.02] flex items-center justify-between gap-3 text-[10px] font-mono transition-all">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🪲</span>
                                <div>
                                  <div className="font-bold text-slate-100">Schwarzkäfer</div>
                                  <div className="text-[8px] text-slate-500 uppercase">Aktivitätszeit: Nachts</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-purple-300">{beetleShare}% Ausbeute</div>
                                <div className={`text-[8px] uppercase font-black ${beetleShare < 15 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`}>
                                  {beetleShare < 15 ? 'Nischenflucht ⚠️' : 'Koexistenz 🤝'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Interactive dynamic biological outcome */}
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 text-[9px] font-mono text-slate-400 leading-normal">
                        {mouseShare > 0 && antShare > 0 && beetleShare > 0 && seedAbundance < 35 ? (
                          <p className="text-rose-400 font-bold">
                            ⚠️ KONKURRENZAUSSCHLUSS-REGEL: Bei Dürre verdrängen Nagetiere und Ameisen den Käfer fast komplett. Er muss in eine andere Nische flüchten!
                          </p>
                        ) : (
                          <p>
                            ℹ️ NISCHENDIFFERENZIERUNG: Durch Spezialisierung auf Samengrößen und Tageszeiten können alle drei Arten im selben Biotop koexistieren.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 4. Symbiose (Akazie & Mykorrhiza Wurzel-Symbiose) Workspace */}
                  {activeInt.id === 'symbiose' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Akazie parameters */}
                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-emerald-400 font-bold">☀️ SONNENINTENSITÄT:</span>
                            <span className="text-slate-300 font-bold">{sunlight}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={sunlight}
                            onChange={(e) => {
                              setSunlight(parseInt(e.target.value));
                              setTransferState('idle');
                              try { desertAudio.playClick(); } catch (e) {}
                            }}
                            className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-950 rounded"
                          />
                          <div className="flex justify-between text-[8px] font-mono text-slate-400">
                            <span>Zucker-Ertrag:</span>
                            <span className="text-emerald-300">{akazieSugar} g / Tag</span>
                          </div>
                        </div>

                        {/* Pilz parameters */}
                        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/25 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-cyan-400 font-bold">🏜️ BODENTROCKENHEIT:</span>
                            <span className="text-slate-300 font-bold">{soilDryness}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={soilDryness}
                            onChange={(e) => {
                              setSoilDryness(parseInt(e.target.value));
                              setTransferState('idle');
                              try { desertAudio.playClick(); } catch (e) {}
                            }}
                            className="w-full accent-cyan-500 cursor-pointer h-1 bg-slate-950 rounded"
                          />
                          <div className="flex justify-between text-[8px] font-mono text-slate-400">
                            <span>Faden-Saugkraft:</span>
                            <span className="text-cyan-300">{fungusMinerals} ml / Tag</span>
                          </div>
                        </div>
                      </div>

                      {/* Central Animated Dual-Engine Cooperative Loop instead of a simple straight line */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-white/5 flex flex-col items-center gap-4 relative overflow-hidden">
                        <div className="flex justify-between w-full text-[9px] font-mono border-b border-white/5 pb-2">
                          <span className="text-emerald-400 font-bold">🌳 Akazien-Krone (Photosynthese)</span>
                          <span className="text-cyan-400 font-bold">🍄 Mykorrhiza-Wurzelpilze</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-center">
                          {/* Left node */}
                          <div className="md:col-span-4 p-2 bg-slate-900/50 border border-emerald-500/10 rounded-lg text-center font-mono text-[9px]">
                            <div className="text-base mb-1">🌳</div>
                            <span className="text-slate-400 block font-bold">Zucker / Glucose</span>
                            <span className="text-emerald-400 font-black">{akazieSugar} g produziert</span>
                          </div>

                          {/* Central Swirling Orbit */}
                          <div className="md:col-span-4 flex flex-col items-center justify-center p-2">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              {/* Infinite Orbit visual rings */}
                              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/25 animate-[spin_10s_linear_infinite]" />
                              <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/25 animate-[spin_6s_linear_reverse_infinite]" />
                              
                              {transferState === 'transferring' ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                  className="absolute inset-0 flex items-center justify-between"
                                >
                                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-md shadow-yellow-400/50" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
                                </motion.div>
                              ) : (
                                <span className="text-xs">🤝</span>
                              )}
                            </div>
                          </div>

                          {/* Right node */}
                          <div className="md:col-span-4 p-2 bg-slate-900/50 border border-cyan-500/10 rounded-lg text-center font-mono text-[9px]">
                            <div className="text-base mb-1">🍄</div>
                            <span className="text-slate-400 block font-bold">Wasser & Mineralien</span>
                            <span className="text-cyan-400 font-black">{fungusMinerals} ml gesaugt</span>
                          </div>
                        </div>

                        {/* Interactive trigger and bonus display */}
                        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 pt-2 border-t border-white/5">
                          <button
                            onClick={startTransferAnimation}
                            disabled={transferState === 'transferring'}
                            className={`px-4 py-2 rounded-xl border text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${transferState === 'transferring' ? 'bg-slate-900 border-white/5 text-slate-500' : 'bg-gradient-to-r from-emerald-600 to-cyan-600 border-emerald-500 text-white hover:brightness-110 active:scale-95'}`}
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${transferState === 'transferring' ? 'animate-spin' : ''}`} />
                            <span>{transferState === 'transferring' ? 'Austausch aktiv...' : 'Austausch starten'}</span>
                          </button>
                          
                          <div className="text-center sm:text-right text-[10px] font-mono">
                            <span className="text-slate-400 block sm:inline">Gemeinsamer Bonus: </span>
                            <span className="text-emerald-300 font-black text-xs">+{mutualFitness}% Fitness</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Parasitismus (Wüstennager Health Tracker) Workspace */}
                  {activeInt.id === 'parasitismus' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400 font-bold">MILBEN / ZECKEN BEFALLSDICHTE:</span>
                          <span className="text-rose-400 font-bold">{parasiteCount} Milben pro Wirt</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          value={parasiteCount}
                          onChange={(e) => {
                            setParasiteCount(parseInt(e.target.value));
                            try { desertAudio.playClick(); } catch (e) {}
                          }}
                          className="w-full accent-rose-500 cursor-pointer h-1 bg-slate-900 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Wirts status display */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-3 relative overflow-hidden">
                          {preenPulse && (
                            <div className="absolute inset-0 bg-emerald-500/5 animate-ping pointer-events-none" />
                          )}
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-300 font-bold">🐹 Wirts-Zustand (Maus)</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${hostVitality > 60 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {hostVitality > 60 ? 'STABIL' : '⚠️ KRITISCH'}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {/* Health bar */}
                            <div className="space-y-1 text-[9px] font-mono">
                              <div className="flex justify-between text-slate-400">
                                <span>Körperliche Vitalität:</span>
                                <span className="text-emerald-300 font-bold">{hostVitality}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${hostVitality}%` }} />
                              </div>
                            </div>

                            {/* Transmission risk bar */}
                            <div className="space-y-1 text-[9px] font-mono">
                              <div className="flex justify-between text-slate-400">
                                <span>Infektionsrisiko (Befall):</span>
                                <span className="text-rose-300 font-bold">{transmissionRisk}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-rose-400 h-full transition-all duration-300" style={{ width: `${transmissionRisk}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive behavior trigger */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex flex-col justify-between">
                          <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase">ABWEHR-VERHALTEN AKTIVIEREN</span>
                          <p className="text-[9px] text-slate-400 leading-normal mb-2">
                            Wüstenrennmäuse entlasten sich durch staubige Sandbäder und gegenseitige Fellpflege von juckenden Milben.
                          </p>
                          <button
                            onClick={runDustBath}
                            disabled={parasiteCount === 0}
                            className={`w-full py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${parasiteCount === 0 ? 'bg-slate-900 border-white/5 text-slate-500' : 'bg-amber-600 hover:bg-amber-500 border-amber-500 text-white shadow-md'}`}
                          >
                            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                            Staub-Sandbad nehmen (-25 Milben)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Ecological general impact summary footer */}
                <div className="p-3.5 rounded-2xl border border-white/5 bg-slate-950 flex gap-2.5 items-start">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 shrink-0 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] md:text-[11px] leading-relaxed font-sans">
                    <strong className="text-orange-400 uppercase font-mono tracking-wider block mb-0.5">
                      Ökologische Gesamtbedeutung für das System:
                    </strong>
                    <span className="text-slate-300 italic">{activeInt.ecologicalRole}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
