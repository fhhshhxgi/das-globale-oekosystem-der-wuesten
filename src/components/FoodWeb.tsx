import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ArrowLeft, Zap, Info, Eye, EyeOff, 
  Layers, Activity, Flame, Leaf, RefreshCw, Star, HelpCircle, Compass
} from 'lucide-react';
import { FoodNode } from '../types';
import { desertAudio } from '../utils/audioManager';

interface FoodWebProps {
  isNight: boolean;
  setIsNight?: (n: boolean) => void;
  isPresentationMode: boolean;
}

export default function FoodWeb({ isNight, setIsNight, isPresentationMode }: FoodWebProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | null>(null);
  const [showAllFlows, setShowAllFlows] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const foodNodes: FoodNode[] = [
    {
      id: 'akazie',
      name: 'Wüstenakazie & Dornsträucher',
      category: 'producer',
      eats: ['destruenten'],
      eatenBy: ['dromedar', 'gazelle', 'heuschrecke', 'kaefer'],
      roleDescription: 'Primärproduzent (Autotroph): Betreibt hocheffiziente Photosynthese, wandelt solare Strahlungsenergie in organische Biomasse um und bildet die fundamentale Lebensgrundlage.'
    },
    {
      id: 'graeser',
      name: 'Gräser & Samen',
      category: 'producer',
      eats: ['destruenten'],
      eatenBy: ['wuestenrennmaus', 'heuschrecke', 'kaefer', 'gazelle'],
      roleDescription: 'Primärproduzent (Autotroph): Nutzt seltene Regenschauer für explosionsartiges Wachstum. Bildet langlebige Samen, die Primärkonsumenten als Wasser- und Stärkereise dienen.'
    },
    {
      id: 'heuschrecke',
      name: 'Wüstenheuschrecke',
      category: 'primary_consumer',
      eats: ['akazie', 'graeser'],
      eatenBy: ['skorpion', 'fennek', 'greifvogel'],
      roleDescription: 'Pflanzenfresser (Konsument 1. Ordnung): Nimmt pflanzliche Kohlenhydrate auf, bildet Proteine und fungiert als primärer Eiweißlieferant für Beutegreifer.'
    },
    {
      id: 'kaefer',
      name: 'Schwarzkäfer',
      category: 'primary_consumer',
      eats: ['akazie', 'graeser'],
      eatenBy: ['skorpion', 'fennek', 'schlange'],
      roleDescription: 'Pflanzenfresser & Detritusfresser (Konsument 1. Ordnung): Verwertet trockenste Pflanzenteile. Sein dicker Chitinpanzer schützt ihn vor Fressfeinden und Austrocknung.'
    },
    {
      id: 'wuestenrennmaus',
      name: 'Wüstenrennmaus',
      scientificName: 'Gerbillinae',
      category: 'primary_consumer',
      eats: ['graeser'],
      eatenBy: ['schlange', 'fennek', 'greifvogel'],
      roleDescription: 'Pflanzenfresser (Konsument 1. Ordnung): Gewinnt Hydrationswasser fast ausschließlich durch die Oxidation von Samen. Bildet das Rückgrat für die carnivoren Räuber.'
    } as any,
    {
      id: 'gazelle',
      name: 'Gazelle',
      category: 'primary_consumer',
      eats: ['akazie', 'graeser'],
      eatenBy: ['fennek'],
      roleDescription: 'Großherbivor (Konsument 1. Ordnung): Zieht in Herden über weite Strecken auf der Suche nach spärlichen Weideflächen. Nutzt selektive Nahrungsaufnahme.'
    },
    {
      id: 'dromedar',
      name: 'Dromedar',
      category: 'primary_consumer',
      eats: ['akazie'],
      eatenBy: [],
      roleDescription: 'Großherbivor (Konsument 1. Ordnung): Extrem angepasster Überlebenskünstler. Kann selbst dornigste Akazienäste kauen und speichert Wasser hocheffizient im Magen.'
    },
    {
      id: 'skorpion',
      name: 'Wüstenskorpion',
      category: 'secondary_consumer',
      eats: ['heuschrecke', 'kaefer'],
      eatenBy: ['fennek', 'greifvogel'],
      roleDescription: 'Fleischfresser (Konsument höherer Ordnung): Lauerjäger mit extrem verlangsamtem Stoffwechsel. Kann monatelang ohne Nahrung überleben.'
    },
    {
      id: 'schlange',
      name: 'Hornviper',
      category: 'secondary_consumer',
      eats: ['wuestenrennmaus', 'kaefer'],
      eatenBy: ['greifvogel', 'fennek'],
      roleDescription: 'Fleischfresser (Konsument höherer Ordnung): Seitwärtswindende Wüstenschlange. Überfällt Nager und Insekten aus dem Sandhinterhalt mit toxischem Gift.'
    },
    {
      id: 'fennek',
      name: 'Fennek (Wüstenfuchs)',
      category: 'secondary_consumer',
      eats: ['wuestenrennmaus', 'heuschrecke', 'kaefer', 'skorpion', 'schlange'],
      eatenBy: ['greifvogel'],
      roleDescription: 'Raubtier (Konsument höherer Ordnung): Nutzt seine riesigen Ohren zur Wärmeabgabe und zum Aufspüren von Beute im Sand. Allesfresser bei Nahrungsknappheit.'
    },
    {
      id: 'greifvogel',
      name: 'Wüstenbussard',
      category: 'secondary_consumer',
      eats: ['schlange', 'wuestenrennmaus', 'heuschrecke', 'skorpion'],
      eatenBy: [],
      roleDescription: 'Spitzenräuber (Apex-Konsument): Kontrolliert als Regulator von Ansitzwarten aus die Populationsdichte kleinerer Wirbeltiere und Reptilien.'
    },
    {
      id: 'destruenten',
      name: 'Destruenten (Zersetzer)',
      category: 'decomposer',
      eats: ['akazie', 'graeser', 'heuschrecke', 'kaefer', 'wuestenrennmaus', 'gazelle', 'dromedar', 'skorpion', 'schlange', 'fennek', 'greifvogel'],
      eatenBy: ['akazie', 'graeser'],
      roleDescription: 'Zersetzer (Remineralisierer): Pilze, Bakterien und Bodentermiten. Sie bauen abgestorbenes organisches Material ab und düngen den Sand mit Nitraten.'
    }
  ];

  const selectedNode = foodNodes.find(n => n.id === selectedNodeId) || foodNodes[0];

  const levelOfCategory = (category: string, nodeId?: string): number => {
    if (nodeId === 'greifvogel') return 4;
    switch (category) {
      case 'producer': return 1;
      case 'primary_consumer': return 2;
      case 'secondary_consumer': return 3;
      case 'decomposer': return 5;
      default: return 1;
    }
  };

  const nodePositions: Record<string, { x: number; y: number; emoji: string; label: string }> = {
    greifvogel: { x: 180, y: 55, emoji: '🦅', label: 'Bussard' },
    fennek: { x: 620, y: 55, emoji: '🦊', label: 'Fennek' },
    schlange: { x: 300, y: 145, emoji: '🐍', label: 'Hornviper' },
    skorpion: { x: 500, y: 145, emoji: '🦂', label: 'Skorpion' },
    dromedar: { x: 80, y: 240, emoji: '🐪', label: 'Dromedar' },
    gazelle: { x: 220, y: 240, emoji: '🦌', label: 'Gazelle' },
    wuestenrennmaus: { x: 375, y: 240, emoji: '🐹', label: 'Rennmaus' },
    heuschrecke: { x: 535, y: 240, emoji: '🦗', label: 'Heuschrecke' },
    kaefer: { x: 710, y: 240, emoji: '🪲', label: 'Käfer' },
    akazie: { x: 260, y: 345, emoji: '🌳', label: 'Akazie' },
    graeser: { x: 540, y: 345, emoji: '🌾', label: 'Gräser' },
    destruenten: { x: 400, y: 435, emoji: '🍄', label: 'Zersetzer' },
  };

  const foodLinks: { source: string; target: string; bend?: number }[] = [
    { source: 'akazie', target: 'dromedar', bend: -0.2 },
    { source: 'akazie', target: 'gazelle', bend: 0.1 },
    { source: 'akazie', target: 'heuschrecke', bend: 0.35 }, // Curves downwards to avoid middle row cards completely
    { source: 'akazie', target: 'kaefer', bend: 0.4 }, // Curves deeply downwards near bottom to bypass consumers
    { source: 'graeser', target: 'wuestenrennmaus', bend: -0.22 },
    { source: 'graeser', target: 'heuschrecke', bend: -0.1 },
    { source: 'graeser', target: 'kaefer', bend: -0.15 },
    { source: 'graeser', target: 'gazelle', bend: -0.38 }, // Curves deeply downwards to bypass other consumers
    { source: 'heuschrecke', target: 'skorpion', bend: -0.1 },
    { source: 'heuschrecke', target: 'fennek', bend: 0.2 }, // Curves right to avoid Skorpion
    { source: 'heuschrecke', target: 'greifvogel', bend: 0.4 }, // Curves high above Hornviper and Skorpion
    { source: 'kaefer', target: 'skorpion', bend: -0.22 }, // Curves low to avoid Fennek and Skorpion
    { source: 'kaefer', target: 'fennek', bend: 0.15 },
    { source: 'kaefer', target: 'schlange', bend: 0.35 }, // Curves high above Skorpion/Hornviper
    { source: 'wuestenrennmaus', target: 'schlange', bend: 0.1 },
    { source: 'wuestenrennmaus', target: 'fennek', bend: -0.25 }, // Curves below Skorpion
    { source: 'wuestenrennmaus', target: 'greifvogel', bend: 0.2 }, // Curves above Hornviper
    { source: 'gazelle', target: 'fennek', bend: -0.42 }, // Curves high above Skorpion and Hornviper
    { source: 'skorpion', target: 'fennek', bend: 0.15 },
    { source: 'skorpion', target: 'greifvogel', bend: -0.25 }, // Curves below Hornviper
    { source: 'schlange', target: 'greifvogel', bend: 0.12 },
    { source: 'schlange', target: 'fennek', bend: 0.25 }, // Curves below Skorpion
    { source: 'destruenten', target: 'akazie', bend: 0.15 },
    { source: 'destruenten', target: 'graeser', bend: -0.15 },
    
    { source: 'akazie', target: 'destruenten', bend: -0.2 },
    { source: 'graeser', target: 'destruenten', bend: 0.2 },
    { source: 'heuschrecke', target: 'destruenten', bend: 0.15 },
    { source: 'kaefer', target: 'destruenten', bend: -0.15 },
    { source: 'wuestenrennmaus', target: 'destruenten', bend: 0.1 },
    { source: 'gazelle', target: 'destruenten', bend: -0.1 },
    { source: 'dromedar', target: 'destruenten', bend: -0.15 },
    { source: 'skorpion', target: 'destruenten', bend: 0.12 },
    { source: 'schlange', target: 'destruenten', bend: -0.12 },
    { source: 'fennek', target: 'destruenten', bend: 0.15 },
    { source: 'greifvogel', target: 'destruenten', bend: -0.15 }
  ];

  const handleNodeClick = (id: string) => {
    try {
      desertAudio.playClick();
    } catch (e) {}
    setSelectedNodeId(prev => prev === id ? '' : id);
  };

  const getTrophicIcon = (cat: string) => {
    switch (cat) {
      case 'producer': return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'primary_consumer': return <Compass className="w-4 h-4 text-amber-400" />;
      case 'secondary_consumer': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'decomposer': return <RefreshCw className="w-4 h-4 text-purple-400" />;
      default: return <Compass className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <section 
      id="nahrungsnetz-interaktiv" 
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-950 via-[#0c0d1e] to-slate-950 text-slate-100"
    >
      {/* Glow animations & custom curve pulse styles */}
      <style>{`
        @keyframes linePulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        .animate-flow-pulse {
          stroke-dasharray: 10, 6;
          animation: linePulse 1.4s linear infinite;
        }
        .canvas-grid-pattern {
          background-image: radial-gradient(rgba(244, 117, 34, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Elegant Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Thermodynamische Energieflüsse</span>
          </div>
          <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
            4. Trophisches Interaktionsmodell
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full" />
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Erforsche das fragile Nahrungsnetz der Wüste. Wähle Lebewesen oder filtere nach Trophie-Stufen, um thermodynamische Stoffkreisläufe und Nahrungsbeziehungen zu visualisieren.
          </p>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT CANVS COLUMN (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div className="bg-slate-900/30 border border-white/5 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between shadow-2xl p-6 md:p-8 backdrop-blur-xl">
              
              {/* Stars & atmospheric background gradient inside canvas */}
              <div className="absolute inset-0 canvas-grid-pattern pointer-events-none" />
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 mb-6 relative z-30">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Spezies-Fokus: <span className="text-orange-400 font-extrabold">{selectedNode.name}</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setShowAllFlows(!showAllFlows);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold transition-all ${
                      showAllFlows 
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200' 
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    {showAllFlows ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{showAllFlows ? 'Inaktive Flüsse dämpfen' : 'Alle Flüsse einblenden'}</span>
                  </button>

                  {selectedLevelFilter && (
                    <button
                      onClick={() => {
                        try {
                          desertAudio.playClick();
                        } catch (e) {}
                        setSelectedLevelFilter(null);
                      }}
                      className="text-[10px] font-mono bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-xl transition-all hover:bg-red-500/20"
                    >
                      Filter zurücksetzen [X]
                    </button>
                  )}
                </div>
              </div>

              {/* Holographic Network SVG Canvas */}
              <div className="relative w-full overflow-x-auto md:overflow-x-visible select-none flex-1 flex items-center justify-start md:justify-center min-h-[420px] pb-4 scrollbar-thin scrollbar-thumb-white/5">
                <div className="relative w-full aspect-[800/480] min-w-[720px] md:min-w-0 max-w-3xl shrink-0">
                  
                  {/* SVG Line Connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Rendering Network Energy Streams */}
                    {foodLinks.map((link, idx) => {
                      const s = nodePositions[link.source];
                      const t = nodePositions[link.target];
                      if (!s || !t) return null;

                      // Detritus safety check
                      const isDetritusFlow = link.target === 'destruenten';
                      if (isDetritusFlow && selectedNodeId !== 'destruenten' && selectedNodeId !== link.source) {
                        return null;
                      }

                      const isSourceSelected = selectedNodeId === link.source;
                      const isTargetSelected = selectedNodeId === link.target;
                      const isFlowInChain = isSourceSelected || isTargetSelected;

                      const sourceNode = foodNodes.find(n => n.id === link.source);
                      const targetNode = foodNodes.find(n => n.id === link.target);
                      const isFiltered = selectedLevelFilter !== null && 
                        sourceNode && targetNode &&
                        levelOfCategory(sourceNode.category, sourceNode.id) !== selectedLevelFilter && 
                        levelOfCategory(targetNode.category, targetNode.id) !== selectedLevelFilter;

                      if (!showAllFlows && !isFlowInChain) {
                        return null;
                      }

                      // Dynamic curves with offsets stopping exactly at the node borders
                      const dx = t.x - s.x;
                      const dy = t.y - s.y;
                      const len = Math.sqrt(dx * dx + dy * dy);

                      let startX = s.x;
                      let startY = s.y;
                      let endX = t.x;
                      let endY = t.y;

                      if (len > 0) {
                        const ux = dx / len;
                        const uy = dy / len;

                        // Node boxes width ~130px, height ~46px on 800x480 SVG coordinates scale
                        // We use the ellipse radius formula for tight border collision:
                        // R = (a * b) / sqrt((b * ux)^2 + (a * uy)^2)
                        const a = 64;
                        const b = 21;
                        const sRadius = (a * b) / Math.sqrt((b * ux) * (b * ux) + (a * uy) * (a * uy));
                        const tRadius = (a * b) / Math.sqrt((b * ux) * (b * ux) + (a * uy) * (a * uy));

                        startX = s.x + ux * sRadius;
                        startY = s.y + uy * sRadius;
                        endX = t.x - ux * tRadius;
                        endY = t.y - uy * tRadius;
                      }

                      // Keep the old control point based on original centers to preserve natural curvature aesthetics, using custom bends to avoid intermediate nodes
                      const bendFactor = link.bend !== undefined ? link.bend : 0.14;
                      const cx = (s.x + t.x) / 2 - dy * bendFactor;
                      const cy = (s.y + t.y) / 2 + dx * bendFactor;
                      const pathData = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;

                      let strokeColor = 'rgba(148, 163, 184, 0.08)';
                      let strokeWidth = 1.5;
                      let strokeOpacity = isFiltered ? 0.03 : 0.75;

                      if (isFlowInChain) {
                        strokeOpacity = 1.0;
                        strokeWidth = 2.8;
                        if (isSourceSelected) {
                          strokeColor = '#10b981'; // Energy outflow
                        } else {
                          strokeColor = '#fb923c'; // Energy inflow
                        }
                      } else if (selectedNodeId) {
                        strokeOpacity = 0.05; // Dim out unrelated paths
                      }

                      return (
                        <g key={`${link.source}-${link.target}-${idx}`}>
                          {/* Outer visual neon trail backplate */}
                          {isFlowInChain && (
                            <path
                              d={pathData}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={7}
                              strokeOpacity={0.25}
                              filter="url(#neonGlow)"
                            />
                          )}

                          {/* Interactive vector path line */}
                          <path
                            d={pathData}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeOpacity={strokeOpacity}
                            className={isFlowInChain ? 'animate-flow-pulse' : 'transition-all duration-300'}
                          />

                          {/* Luminous energy micro-particle flowing */}
                          {isFlowInChain && (
                            <circle r="4" fill={isSourceSelected ? '#34d399' : '#fb923c'}>
                              <animateMotion dur="1.6s" repeatCount="indefinite" path={pathData} />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* Level Horizontal Grid Indicators with micro-labels */}
                    <g opacity="0.04" stroke="#818cf8" strokeDasharray="3,5">
                      <line x1="20" y1="55" x2="780" y2="55" strokeWidth="1" />
                      <line x1="20" y1="145" x2="780" y2="145" strokeWidth="1" />
                      <line x1="20" y1="240" x2="780" y2="240" strokeWidth="1" />
                      <line x1="20" y1="345" x2="780" y2="345" strokeWidth="1" />
                    </g>
                  </svg>

                  {/* HTML SPECIMEN NODES */}
                  {foodNodes.map((node) => {
                    const pos = nodePositions[node.id];
                    if (!pos) return null;

                    const isSelected = selectedNodeId === node.id;
                    const hasInflow = selectedNodeId ? foodLinks.some(link => link.source === node.id && link.target === selectedNodeId) : false;
                    const hasOutflow = selectedNodeId ? foodLinks.some(link => link.source === selectedNodeId && link.target === node.id) : false;
                    const isPartInChain = isSelected || hasInflow || hasOutflow;

                    const nodeLevel = levelOfCategory(node.category, node.id);
                    const isFilteredOut = selectedLevelFilter !== null && nodeLevel !== selectedLevelFilter;

                    // Specimen capsule borders, backgrounds, and glows
                    let interactionBorder = 'border-white/10';
                    let bgClass = 'bg-[#090a15] hover:bg-[#11132a] text-slate-100';
                    let scaleClass = 'scale-100 z-20';
                    let glowShadow = '';

                    if (isSelected) {
                      interactionBorder = 'border-indigo-400 ring-2 ring-indigo-400/40';
                      bgClass = 'bg-[#15193b] text-white';
                      scaleClass = 'scale-110 z-30';
                      glowShadow = 'shadow-[0_0_20px_rgba(129,140,248,0.25)]';
                    } else if (selectedNodeId) {
                      if (hasInflow && hasOutflow) {
                        // BOTH! Gradient solid background in the middle as requested
                        interactionBorder = 'border-amber-400/90 ring-2 ring-amber-400/40';
                        bgClass = 'bg-gradient-to-r from-[#5a1e05] via-[#090b1e] to-[#013c1c] text-amber-100 font-semibold';
                        scaleClass = 'scale-105 z-30';
                        glowShadow = 'shadow-[0_0_20px_rgba(249,115,22,0.35),_0_0_20px_rgba(16,185,129,0.35)]';
                      } else if (hasInflow) {
                        // Solid dark-orange/brown bg for food/prey
                        interactionBorder = 'border-orange-500/80 ring-1 ring-orange-500/20';
                        bgClass = 'bg-[#2a0e02] hover:bg-[#3d1503] text-orange-200';
                        scaleClass = 'scale-105 z-30';
                        glowShadow = 'shadow-[0_0_15px_rgba(249,115,22,0.25)]';
                      } else if (hasOutflow) {
                        // Solid dark-green bg for predators/consumers of this node
                        interactionBorder = 'border-emerald-500/80 ring-1 ring-emerald-500/20';
                        bgClass = 'bg-[#012712] hover:bg-[#023b1b] text-emerald-200';
                        scaleClass = 'scale-105 z-30';
                        glowShadow = 'shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                      }
                    }

                    // Trophic category left accent bar background
                    let leftBarBg = 'bg-slate-500';
                    if (selectedNodeId) {
                      if (isSelected) {
                        leftBarBg = 'bg-indigo-400';
                      } else if (hasInflow && hasOutflow) {
                        leftBarBg = 'bg-gradient-to-b from-orange-500 to-emerald-500';
                      } else if (hasInflow) {
                        leftBarBg = 'bg-orange-500';
                      } else if (hasOutflow) {
                        leftBarBg = 'bg-emerald-500';
                      } else {
                        // Unrelated nodes slightly muted
                        if (node.category === 'producer') leftBarBg = 'bg-emerald-500/40';
                        else if (node.category === 'primary_consumer') leftBarBg = 'bg-amber-500/40';
                        else if (node.category === 'secondary_consumer') leftBarBg = 'bg-rose-500/40';
                        else if (node.category === 'decomposer') leftBarBg = 'bg-purple-500/40';
                      }
                    } else {
                      // Default when nothing is selected
                      if (node.category === 'producer') leftBarBg = 'bg-emerald-500';
                      else if (node.category === 'primary_consumer') leftBarBg = 'bg-amber-500';
                      else if (node.category === 'secondary_consumer') leftBarBg = 'bg-rose-500';
                      else if (node.category === 'decomposer') leftBarBg = 'bg-purple-500';
                    }

                    // Opacity dim-out logic requested by the user: 
                    // Bring ONLY related nodes to the foreground, heavily dim everything else
                    let opacityClass = 'opacity-100';
                    if (isFilteredOut) {
                      opacityClass = 'opacity-10 scale-90 pointer-events-none blur-[0.5px] saturate-50';
                    } else if (selectedNodeId && !isPartInChain) {
                      opacityClass = 'opacity-15 scale-95 blur-[0.8px] saturate-30 hover:opacity-40 hover:scale-100 hover:blur-0 hover:saturate-100';
                    }

                    return (
                      <button
                        key={node.id}
                        id={`node-${node.id}`}
                        onClick={() => handleNodeClick(node.id)}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        style={{ 
                          position: 'absolute',
                          left: `${(pos.x / 800) * 100}%`,
                          top: `${(pos.y / 480) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className={`w-22 md:w-32 py-1.5 md:py-2.5 px-2.5 md:px-3.5 rounded-2xl border text-left flex items-center gap-2 md:gap-2.5 transition-all duration-300 cursor-pointer relative overflow-hidden ${interactionBorder} ${bgClass} ${scaleClass} ${glowShadow} ${opacityClass}`}
                      >
                        {/* Dynamic Left accent bar instead of static category border */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${leftBarBg}`} />

                        {/* Circle emoji holder */}
                        <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-sm md:text-lg shrink-0">
                          {pos.emoji}
                        </span>
                        
                        <div className="leading-tight min-w-0 flex-1">
                          <div className="text-[9px] md:text-xs font-black truncate text-white">{pos.label}</div>
                          <div className="text-[6px] md:text-[8px] font-mono opacity-50 uppercase tracking-wider truncate mt-0.5">
                            {node.category === 'producer' && 'PRODUZENT'}
                            {node.category === 'primary_consumer' && 'KONSUMENT 1'}
                            {node.category === 'secondary_consumer' && 'KONSUMENT 2'}
                            {node.category === 'decomposer' && 'ZERSETZER'}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* Informative Legend - clear explanations requested by user */}
              <div className="mt-6 flex flex-wrap gap-4 items-center justify-between text-[10px] font-mono opacity-90 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-slate-300">
                    <b className="text-orange-400">Orange:</b> Nahrung / Beute (er frisst sie)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300">
                    <b className="text-emerald-400">Grün:</b> Fressfeinde / Konsumenten (sie fressen ihn)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-2.5 rounded-md bg-gradient-to-r from-orange-500 to-emerald-500" />
                  <span className="text-slate-300">
                    <b className="text-amber-400">Verlauf:</b> Beides (z.B. Nährstoffkreislauf mit Zersetzern)
                  </span>
                </div>
                <div className="flex-1 text-right text-slate-400 text-[9px]">
                  *Nicht beteiligte Arten werden automatisch im Hintergrund abgedunkelt.
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMNS: BIOMASS PYRAMID & DOSSIER PANEL */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Specimen Dossier (Detaillierte Analyse) */}
            <AnimatePresence mode="wait">
              {!selectedNodeId ? (
                <motion.div
                  key="empty-dossier"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900/30 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center min-h-[360px] backdrop-blur-md"
                >
                  <div className="absolute inset-0 canvas-grid-pattern opacity-10 pointer-events-none" />
                  <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <Compass className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <h3 className="font-sans text-sm font-black uppercase text-white tracking-wider mb-2">
                    Keine Auswahl
                  </h3>
                  <p className="text-[11px] text-slate-400 max-w-[220px] leading-relaxed">
                    Klicke auf eine Spezies im interaktiven Netz, um ihr detailliertes energetisches Dossier anzuzeigen. Klicke erneut darauf, um die Auswahl aufzuheben.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md"
                >
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-emerald-400 animate-pulse">
                        {getTrophicIcon(selectedNode.category)}
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-orange-400 uppercase tracking-widest block">BIO-DOSSIER</span>
                        <h3 className="font-sans text-base md:text-lg font-black uppercase text-white leading-tight mt-0.5">
                          {selectedNode.name}
                        </h3>
                      </div>
                    </div>

                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border ${
                      selectedNode.category === 'producer'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : selectedNode.category === 'primary_consumer'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : selectedNode.category === 'secondary_consumer'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {selectedNode.category === 'producer' && 'Autotropher Produzent'}
                      {selectedNode.category === 'primary_consumer' && 'Pflanzenfresser (Konsument 1)'}
                      {selectedNode.category === 'secondary_consumer' && 'Prädator (Konsument 2)'}
                      {selectedNode.category === 'decomposer' && 'Abfall-Remineralisierer'}
                    </span>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {selectedNode.roleDescription}
                    </p>

                    {/* Dynamic interactive trophic links */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      
                      {/* EATS */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                          <ArrowLeft className="w-3 h-3 text-orange-500" />
                          <span>Nahrungsquellen (Energieaufnahme):</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedNode.eats.length > 0 ? (
                            selectedNode.eats.map(id => {
                              const ref = foodNodes.find(n => n.id === id);
                              return (
                                <button 
                                  key={id} 
                                  onClick={() => handleNodeClick(id)}
                                  className="text-[9px] font-mono font-bold px-2 py-1 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                >
                                  {ref ? ref.name.split(' ')[0] : id}
                                </button>
                              );
                            })
                          ) : (
                            <span className="text-[10px] italic text-slate-500 font-mono">Autotroph (Nutzt solare Strahlung)</span>
                          )}
                        </div>
                      </div>

                      {/* EATEN BY */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                          <ArrowRight className="w-3 h-3 text-emerald-500" />
                          <span>Abnehmer (Energieabgabe):</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedNode.eatenBy.length > 0 ? (
                            selectedNode.eatenBy.map(id => {
                              const ref = foodNodes.find(n => n.id === id);
                              return (
                                <button 
                                  key={id} 
                                  onClick={() => handleNodeClick(id)}
                                  className="text-[9px] font-mono font-bold px-2 py-1 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                                >
                                  {ref ? ref.name.split(' ')[0] : id}
                                </button>
                              );
                            })
                          ) : (
                            <span className="text-[10px] italic text-emerald-400 font-bold font-mono">Apex-Position (Keine Fressfeinde)</span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing 3D-Isometric Biomass Pyramid */}
            <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="space-y-4">
                
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
                  <Layers className="w-5 h-5 text-orange-400" />
                  <div>
                    <h4 className="font-sans text-sm font-black uppercase text-white leading-tight">Biomasse-Pyramide (10%-Regel)</h4>
                    <span className="text-[8px] font-mono opacity-50 block uppercase text-slate-400 mt-0.5">Thermodynamischer Transfer</span>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
                  Mit jedem Übergang zur nächsten Trophie-Stufe geht ca. **90% der Energie** verloren. Klicke auf die Pyramidenstufen, um das Netz interaktiv zu isolieren:
                </p>

                {/* 3D-Like stacked Pyramid layout */}
                <div className="flex flex-col gap-2 pt-3 font-mono text-[10px]">
                  
                  {/* APEX */}
                  <button 
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setSelectedLevelFilter(selectedLevelFilter === 4 ? null : 4);
                    }}
                    onMouseEnter={() => setHoveredLevel(4)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className={`w-[50%] mx-auto py-2.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                      selectedLevelFilter === 4 || hoveredLevel === 4
                        ? 'bg-rose-500 border-rose-400 text-slate-950 font-black shadow-lg shadow-rose-500/20 scale-105'
                        : 'bg-slate-950/60 border-slate-800 text-rose-400 hover:border-rose-500/40'
                    }`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
                      <span>Stufe 4: Apexräuber (~10 kg)</span>
                    </div>
                  </button>

                  {/* CARNIVORES */}
                  <button 
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setSelectedLevelFilter(selectedLevelFilter === 3 ? null : 3);
                    }}
                    onMouseEnter={() => setHoveredLevel(3)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className={`w-[68%] mx-auto py-2.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                      selectedLevelFilter === 3 || hoveredLevel === 3
                        ? 'bg-orange-500 border-orange-400 text-slate-950 font-black shadow-lg shadow-orange-500/20 scale-105'
                        : 'bg-slate-950/60 border-slate-800 text-orange-400 hover:border-orange-500/40'
                    }`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
                      <span>Stufe 3: Sekundärkonsument (~100 kg)</span>
                    </div>
                  </button>

                  {/* HERBIVORES */}
                  <button 
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setSelectedLevelFilter(selectedLevelFilter === 2 ? null : 2);
                    }}
                    onMouseEnter={() => setHoveredLevel(2)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className={`w-[85%] mx-auto py-2.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                      selectedLevelFilter === 2 || hoveredLevel === 2
                        ? 'bg-amber-500 border-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105'
                        : 'bg-slate-950/60 border-slate-800 text-amber-400 hover:border-amber-500/40'
                    }`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                      <span>Stufe 2: Primärkonsument (~1.000 kg)</span>
                    </div>
                  </button>

                  {/* PRODUCERS */}
                  <button 
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setSelectedLevelFilter(selectedLevelFilter === 1 ? null : 1);
                    }}
                    onMouseEnter={() => setHoveredLevel(1)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className={`w-full py-2.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                      selectedLevelFilter === 1 || hoveredLevel === 1
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105'
                        : 'bg-slate-950/60 border-slate-800 text-emerald-400 hover:border-emerald-500/40'
                    }`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                      <span>Stufe 1: Primärproduzent (~10.000 kg)</span>
                    </div>
                  </button>

                  <div className="border-t border-dashed border-white/5 my-1.5" />

                  {/* DECOMPOSERS */}
                  <button 
                    onClick={() => {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                      setSelectedLevelFilter(selectedLevelFilter === 5 ? null : 5);
                    }}
                    onMouseEnter={() => setHoveredLevel(5)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className={`w-full py-2.5 rounded-xl border border-dashed text-center transition-all duration-300 relative overflow-hidden ${
                      selectedLevelFilter === 5 || hoveredLevel === 5
                        ? 'bg-purple-500 border-purple-400 text-slate-950 font-black shadow-lg shadow-purple-500/20 scale-105'
                        : 'bg-slate-950/40 border-purple-500/20 text-purple-400 hover:border-purple-500/60'
                    }`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
                      <span>♻️ Destruenten / Zersetzer (Kreislauf)</span>
                    </div>
                  </button>

                </div>

                <div className="text-[9px] font-mono opacity-45 text-center italic mt-2 text-slate-400">
                  *Die Pyramide verdeutlicht den exponentiellen Schwund der verfügbaren Energiekapazität.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
