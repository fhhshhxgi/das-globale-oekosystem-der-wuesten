import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, Wind, Skull, Sparkles, Sprout, Home, ShieldAlert, 
  X, HelpCircle, Sun, Thermometer, Droplet, Flame, Compass, ArrowRight
} from 'lucide-react';
import { Hotspot } from '../types';
import { desertAudio } from '../utils/audioManager';

interface InteractiveMapProps {
  isPresentationMode: boolean;
}

interface GridTile {
  r: number; // Row index (0 to 7)
  c: number; // Col index (0 to 7)
  type: 'sand' | 'dune' | 'rock' | 'water' | 'grass' | 'road' | 'skeleton' | 'burrow';
  elevation: number; // Height offset in pixels
  hotspotId?: string;
}

export default function InteractiveMap({ isPresentationMode }: InteractiveMapProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  // Modal tabs state
  const [simulationTabs, setSimulationTabs] = useState<Record<string, 'info' | 'simulation' | 'species'>>({
    dune: 'info',
    stone_desert: 'info',
    oasis: 'info',
    animal_burrow: 'info',
    carcass: 'info',
    human_impact: 'info',
  });

  // Simple human-readable interaction states
  const [windSpeed, setWindSpeed] = useState<number>(35); // 0 - 120 km/h
  const [waterExtraction, setWaterExtraction] = useState<number>(20); // 0 - 100%
  const [solarIntensity, setSolarIntensity] = useState<number>(5); // 1 - 10
  const [outsideTemp, setOutsideTemp] = useState<number>(38); // 15 - 55 °C
  const [decomposerActivity, setDecomposerActivity] = useState<number>(50); // 10 - 100%
  const [humanDisturbance, setHumanDisturbance] = useState<number>(30); // 0 - 100%

  const hotspots: Hotspot[] = [
    {
      id: 'dune',
      title: 'Die Sanddüne',
      shortDesc: 'Beweglicher Sandboden, geformt durch ständigen Wind.',
      fullDesc: 'Sanddünen bestehen aus feinen Sandkörnern, die durch den Wind ständig in Bewegung sind. Regenwasser versickert hier sofort im tieferen Boden. Pflanzen haben es schwer, Halt zu finden. Nur spezialisierte Pioniergräser mit extrem langen Wurzelnetzen können die Düne stabilisieren und verhindern, dass sie wandert und andere Lebensräume verschüttet.',
      x: 20,
      y: 30,
      icon: 'Wind'
    },
    {
      id: 'stone_desert',
      title: 'Die Steinwüste (Hammada)',
      shortDesc: 'Extrem heißer Fels- und Geröllboden ohne Schatten.',
      fullDesc: 'Über 70% der Sahara bestehen aus dieser kargen Steinwüste. Das nackte Felsgestein saugt tagsüber die Sonnenwärme auf und heizt sich auf über 70°C auf. Nachts strahlt diese Wärme schlagartig ab, wodurch es eisig kalt wird. Pflanzen und Tiere müssen sich in Felsspalten flüchten, um diese enormen Temperaturschwankungen zu überleben.',
      x: 75,
      y: 25,
      icon: 'Landmark'
    },
    {
      id: 'oasis',
      title: 'Die Oase',
      shortDesc: 'Lebensader und grünes Zentrum mit viel Wasser.',
      fullDesc: 'Die Oase ist der artenreichste Lebensraum in der Wüste. Durch Quellen oder nahe liegendes Grundwasser wachsen hier schattenspendende Dattelpalmen und grüne Pflanzen. Dadurch entsteht ein kühleres Mikroklima, das unzähligen Vögeln, Insekten, Fröschen und Säugetieren ein sicheres Zuhause bietet.',
      x: 52,
      y: 58,
      icon: 'Sprout'
    },
    {
      id: 'animal_burrow',
      title: 'Der Tierbau (Unterirdisch)',
      shortDesc: 'Angenehm kühle Zuflucht tief unter dem heißen Sand.',
      fullDesc: 'Unter der Erde herrscht ein ganz anderes Klima als an der Oberfläche. Schon in einem Meter Tiefe bleibt die Temperatur Tag und Nacht konstant bei angenehmen 20 bis 24°C, und die Luft ist feucht. Wüstentiere wie Mäuse, Füchse und Schlangen schlafen hier tagsüber, um keinen wertvollen Schweiß und Wasser zu verlieren.',
      x: 35,
      y: 52,
      icon: 'Home'
    },
    {
      id: 'carcass',
      title: 'Zersetzer & Kreislauf',
      shortDesc: 'Wie Käfer und Pilze die Wüste düngen.',
      fullDesc: 'In der kargen Wüste ist nichts wertlos. Stirbt ein Tier, machen sich Zersetzer (wie Käfer, Ameisen und Pilze) sofort an die Arbeit. Sie zerlegen die Reste in ihre chemischen Bausteine (Nährstoffe wie Nitrat und Phosphat). Dieser natürliche Dünger wird im nährstoffarmen Sand gespeichert und ermöglicht erst das Wachstum neuer Pflanzen.',
      x: 80,
      y: 70,
      icon: 'Skull'
    },
    {
      id: 'human_impact',
      title: 'Einfluss des Menschen',
      shortDesc: 'Straßen, Geländewagen und Wassermangel gefährden die Natur.',
      fullDesc: 'Der Mensch greift tief in das empfindliche Gleichgewicht der Wüste ein. Schwere Geländewagen zerstören die feine biologische Wüstenkruste, die den Sand festhält. Zudem senkt das übermäßige Abpumpen von Wasser für Siedlungen und Tourismus den Grundwasserspiegel der Oasen ab, wodurch Palmen verdorren.',
      x: 15,
      y: 75,
      icon: 'ShieldAlert'
    }
  ];

  const getHotspotIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-5 h-5 text-amber-500 animate-pulse" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-stone-400" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-400 animate-bounce" style={{ animationDuration: '3s' }} />;
      case 'Home': return <Home className="w-5 h-5 text-orange-400" />;
      case 'Skull': return <Skull className="w-5 h-5 text-slate-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />;
      default: return <HelpCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const renderZoneIllustration = (id: string) => {
    switch (id) {
      case 'dune':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-sky-950 via-slate-900 to-amber-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            <circle cx="25" cy="20" r="1" fill="#ffffff" opacity="0.8" />
            <circle cx="160" cy="15" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="90" cy="35" r="1" fill="#ffffff" opacity="0.6" />
            <circle cx="180" cy="40" r="1.5" fill="#ffffff" opacity="0.4" />
            
            <rect x="0" y="50" width="200" height="70" fill="url(#duneGlow)" opacity="0.15" />
            
            <path d="M-10,95 C50,65 110,95 210,80 L210,130 L-10,130 Z" fill="url(#duneBack)" />
            
            <path d="M15,50 Q45,40 80,48 T165,42" fill="none" stroke="#fde047" strokeWidth="0.8" strokeDasharray="15,10" opacity="0.25" />
            <path d="M30,35 Q70,25 110,32 T190,28" fill="none" stroke="#fde047" strokeWidth="0.8" strokeDasharray="20,15" opacity="0.15" />

            <path d="M-10,110 C60,80 130,115 210,95 L210,130 L-10,130 Z" fill="url(#duneFront)" />
            
            <path d="M-10,110 C60,80 130,115 210,95" fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.4" />
            <path d="M-10,95 C50,65 110,95 210,80" fill="none" stroke="#fde047" strokeWidth="0.6" opacity="0.3" />

            <g stroke="#84cc16" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
              <path d="M35,102 C32,90 28,85 24,82" fill="none" />
              <path d="M35,102 C35,90 38,82 42,78" fill="none" />
              <path d="M35,102 C37,92 45,88 50,86" fill="none" />
              <path d="M145,106 C142,95 138,90 132,88" fill="none" />
              <path d="M145,106 C146,94 152,88 158,84" fill="none" />
            </g>

            <defs>
              <linearGradient id="duneBack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </linearGradient>
              <linearGradient id="duneFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <radialGradient id="duneGlow" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        );
      case 'stone_desert':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-slate-900 via-stone-900 to-neutral-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            <circle cx="100" cy="0" r="80" fill="url(#heatGlow)" opacity="0.15" />

            <polygon points="10,110 40,55 75,110" fill="url(#rockDark)" />
            <polygon points="70,110 115,40 165,110" fill="url(#rockMedium)" />
            <polygon points="135,110 170,65 205,110" fill="url(#rockLight)" />
            
            <polygon points="40,55 75,110 42,110" fill="#475569" opacity="0.2" />
            <polygon points="115,40 165,110 120,110" fill="#64748b" opacity="0.25" />
            <polygon points="170,65 205,110 172,110" fill="#cbd5e1" opacity="0.15" />

            <rect x="0" y="105" width="200" height="20" fill="#1c1917" />
            <line x1="0" y1="105" x2="200" y2="105" stroke="#78716c" strokeWidth="1.5" />

            <path d="M25,110 Q28,103 35,105 Q40,107 38,112 Z" fill="#44403c" stroke="#78716c" strokeWidth="1" />
            <path d="M120,112 Q125,106 132,108 Q136,111 133,114 Z" fill="#292524" stroke="#57534e" strokeWidth="1" />
            <path d="M150,111 Q153,108 158,109 Q161,111 159,113 Z" fill="#57534e" stroke="#a8a29e" strokeWidth="0.8" />

            <g stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
              <line x1="85" y1="105" x2="78" y2="92" />
              <line x1="85" y1="105" x2="92" y2="92" />
              <line x1="85" y1="105" x2="85" y2="86" />
              <line x1="85" y1="105" x2="72" y2="99" />
              <line x1="85" y1="105" x2="98" y2="100" />
            </g>

            <defs>
              <linearGradient id="rockDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#292524" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>
              <linearGradient id="rockMedium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#44403c" />
                <stop offset="100%" stopColor="#1c1917" />
              </linearGradient>
              <linearGradient id="rockLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#57534e" />
                <stop offset="100%" stopColor="#292524" />
              </linearGradient>
              <radialGradient id="heatGlow" cx="50%" cy="0%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        );
      case 'oasis':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-slate-950 via-indigo-950 to-amber-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            {/* Stars in the night sky */}
            <circle cx="20" cy="15" r="0.6" fill="#ffffff" opacity="0.8" />
            <circle cx="45" cy="25" r="0.4" fill="#ffffff" opacity="0.6" />
            <circle cx="80" cy="12" r="0.8" fill="#ffffff" opacity="0.9" />
            <circle cx="135" cy="18" r="0.5" fill="#ffffff" opacity="0.7" />
            <circle cx="185" cy="22" r="0.6" fill="#ffffff" opacity="0.5" />

            {/* Glowing moon in the sky */}
            <circle cx="155" cy="25" r="8" fill="#fef08a" opacity="0.15" />
            <path d="M153,21 A6,6 0 1,0 159,27 A5,5 0 1,1 153,21" fill="#fffbeb" opacity="0.9" />

            {/* Distant soft purple-orange sand dunes */}
            <path d="M-10,75 Q40,55 95,72 T210,65 L210,120 L-10,120 Z" fill="url(#duneOasisGrad)" />
            
            {/* The Oasis Water Spring */}
            <ellipse cx="100" cy="98" rx="65" ry="18" fill="url(#springGlow)" />
            <ellipse cx="100" cy="98" rx="55" ry="13" fill="#0891b2" stroke="#22d3ee" strokeWidth="0.5" opacity="0.85" />
            <ellipse cx="100" cy="98" rx="42" ry="9" fill="#0e7490" opacity="0.9" />
            {/* Moon reflection in the water */}
            <ellipse cx="115" cy="97" rx="6" ry="2" fill="#fffbeb" opacity="0.4" className="animate-pulse" />

            {/* Left Palm Tree: Detailed elegant trunk and leaves */}
            <g transform="translate(35, 105)">
              {/* Trunk */}
              <path d="M0,0 Q-8,-35 -18,-55" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
              <path d="M0,0 Q-8,-35 -18,-55" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" />
              {/* Palm Fronds */}
              <g transform="translate(-18,-55)">
                {/* Frond 1 (Left) */}
                <path d="M0,0 Q-15,-2 -25,10" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M-5,-1 Q-14,3 -20,12 M-10,-1 Q-18,6 -23,13" fill="none" stroke="#059669" strokeWidth="1" />
                {/* Frond 2 (Right) */}
                <path d="M0,0 Q12,-6 22,2" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5,-2 Q12,-1 18,5 M8,-3 Q15,-2 20,4" fill="none" stroke="#10b981" strokeWidth="1" />
                {/* Frond 3 (Top) */}
                <path d="M0,0 Q-4,-15 -2,-26" fill="none" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M-2,-7 Q-8,-14 -6,-22 M-1,-11 Q-5,-18 -3,-24" fill="none" stroke="#34d399" strokeWidth="1" />
                {/* Frond 4 (Bottom-left) */}
                <path d="M0,0 Q-18,10 -22,25" fill="none" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M-6,3 Q-14,10 -17,18 M-10,5 Q-16,13 -19,21" fill="none" stroke="#059669" strokeWidth="1" />
                {/* Frond 5 (Bottom-right) */}
                <path d="M0,0 Q15,8 24,18" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5,2 Q12,7 18,13 M9,4 Q15,10 21,16" fill="none" stroke="#10b981" strokeWidth="1" />
              </g>
            </g>

            {/* Right Palm Tree: Slender elegant silhouette */}
            <g transform="translate(160, 102)">
              {/* Trunk */}
              <path d="M0,0 Q4,-30 10,-48" fill="none" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" />
              {/* Palm Fronds */}
              <g transform="translate(10,-48)">
                <path d="M0,0 Q-10,-4 -18,4" fill="none" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M0,0 Q10,-2 18,6" fill="none" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M0,0 Q-2,-12 0,-20" fill="none" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M0,0 Q-10,8 -14,18" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M0,0 Q12,6 18,15" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            </g>

            {/* Reed plants and Cattails at the water margin */}
            <g opacity="0.85">
              {/* Group 1 (Left of water) */}
              <path d="M68,102 Q65,85 62,75" fill="none" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M72,104 Q71,90 70,82" fill="none" stroke="#059669" strokeWidth="1" strokeLinecap="round" />
              {/* Cattail tip */}
              <rect x="61" y="74" width="2" height="6" rx="1" fill="#451a03" />
              
              {/* Group 2 (Right of water) */}
              <path d="M135,103 Q138,88 141,78" fill="none" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M131,104 Q130,92 129,85" fill="none" stroke="#059669" strokeWidth="1" strokeLinecap="round" />
              <rect x="140" y="77" width="2" height="6" rx="1" fill="#451a03" />
            </g>

            {/* Glowing fireflies or water vapor bubbles */}
            <circle cx="90" cy="80" r="1.2" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="115" cy="74" r="1" fill="#22d3ee" opacity="0.8" />
            <circle cx="78" cy="86" r="1.5" fill="#34d399" opacity="0.6" />
            <circle cx="128" cy="82" r="1.2" fill="#a7f3d0" opacity="0.7" />

            <defs>
              <linearGradient id="duneOasisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <radialGradient id="springGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        );
      case 'animal_burrow':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-amber-950 via-amber-900 to-stone-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            <rect x="0" y="0" width="200" height="30" fill="url(#surfaceGlow)" />
            <line x1="0" y1="30" x2="200" y2="30" stroke="#f59e0b" strokeWidth="1.5" />

            <path d="M50,30 Q65,65 95,75" fill="none" stroke="#291305" strokeWidth="16" strokeLinecap="round" />
            <path d="M50,30 Q65,65 95,75" fill="none" stroke="#1c0d02" strokeWidth="12" strokeLinecap="round" />

            <circle cx="115" cy="85" r="26" fill="#291305" stroke="#7c2d12" strokeWidth="1" />
            <circle cx="115" cy="85" r="22" fill="#1c0d02" />

            <circle cx="115" cy="85" r="16" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            <circle cx="115" cy="85" r="12" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />

            <g stroke="#a8a29e" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6">
              <path d="M125,30 Q122,45 130,55" />
              <path d="M130,55 Q128,63 131,70" />
              <path d="M160,30 Q155,42 153,52" />
            </g>

            <path d="M103,92 Q115,100 127,91" fill="none" stroke="#fcd34d" strokeWidth="1.5" opacity="0.75" />
            <path d="M106,94 Q115,102 124,93" fill="none" stroke="#fcd34d" strokeWidth="1" opacity="0.6" />

            <circle cx="115" cy="82" r="5" fill="#f59e0b" className="animate-pulse" />

            <g className="text-[7px] font-mono select-none" fill="#fbcfe8" opacity="0.8">
              <rect x="10" y="8" width="48" height="12" rx="2" fill="#ef4444" opacity="0.8" />
              <text x="14" y="16" fill="#ffffff" fontWeight="bold">Heiß ~60°C</text>

              <rect x="142" y="82" width="48" height="12" rx="2" fill="#3b82f6" opacity="0.8" />
              <text x="146" y="90" fill="#ffffff" fontWeight="bold">Kühl ~22°C</text>
            </g>

            <defs>
              <linearGradient id="surfaceGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'carcass':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            {/* Twinkling desert stars */}
            <circle cx="30" cy="20" r="0.6" fill="#ffffff" opacity="0.7" />
            <circle cx="70" cy="15" r="0.8" fill="#ffffff" opacity="0.8" className="animate-pulse" />
            <circle cx="120" cy="25" r="0.5" fill="#ffffff" opacity="0.6" />
            <circle cx="170" cy="18" r="0.7" fill="#ffffff" opacity="0.9" className="animate-pulse" />

            {/* Desert sand ground */}
            <path d="M-10,105 Q100,95 210,105 L210,125 L-10,125 Z" fill="#291305" />
            <line x1="0" y1="105" x2="200" y2="105" stroke="#78350f" strokeWidth="1" opacity="0.6" />

            {/* Glowing nutrient recycling vapor waves */}
            <path d="M60,105 Q50,75 70,50 T80,25" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,6" opacity="0.35" className="animate-[pulse_3s_ease-in-out_infinite]" />
            <path d="M140,105 Q145,80 130,58 T115,30" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,5" opacity="0.25" className="animate-[pulse_4s_ease-in-out_infinite]" />
            <path d="M100,102 Q105,75 92,60 T100,40" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="5,7" opacity="0.45" className="animate-[pulse_2.5s_ease-in-out_infinite]" />

            {/* Shadow beneath the skull */}
            <ellipse cx="100" cy="104" rx="26" ry="3.5" fill="#000000" opacity="0.5" />

            {/* Beautifully stylized animal skull */}
            <g transform="translate(0, 8)">
              {/* Horns */}
              <path d="M92,80 Q76,66 58,74 Q76,78 90,83 Z" fill="#475569" stroke="#334155" strokeWidth="0.5" />
              <path d="M108,80 Q124,66 142,74 Q124,78 110,83 Z" fill="#475569" stroke="#334155" strokeWidth="0.5" />
              
              {/* Skull Center Bone */}
              <path d="M90,83 C90,73 110,73 110,83 C110,93 105,99 105,108 L95,108 C95,99 90,93 90,83 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              
              {/* Eye Sockets */}
              <ellipse cx="95" cy="88" rx="3.5" ry="5.5" fill="#1e293b" />
              <ellipse cx="105" cy="88" rx="3.5" ry="5.5" fill="#1e293b" />
              
              {/* Nose Cavity */}
              <path d="M98,99 L102,99 L100,94 Z" fill="#1e293b" />
            </g>

            {/* Stylized decomposer beetles crawling on the ground */}
            {/* Beetle 1 */}
            <g transform="translate(68, 102) rotate(-20)">
              <ellipse cx="0" cy="0" rx="3" ry="4.5" fill="#1e293b" />
              <circle cx="0" cy="-4" r="1.5" fill="#0f172a" />
              <line x1="-3.5" y1="-1" x2="3.5" y2="-1" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="-4" y1="1" x2="4" y2="1" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="-3.5" y1="3" x2="3.5" y2="3" stroke="#0f172a" strokeWidth="0.6" />
            </g>
            {/* Beetle 2 */}
            <g transform="translate(132, 104) rotate(15)">
              <ellipse cx="0" cy="0" rx="2.5" ry="4" fill="#1e293b" />
              <circle cx="0" cy="-3.5" r="1.2" fill="#0f172a" />
              <line x1="-3" y1="-1" x2="3" y2="-1" stroke="#0f172a" strokeWidth="0.5" />
              <line x1="-3.5" y1="1" x2="3.5" y2="1" stroke="#0f172a" strokeWidth="0.5" />
            </g>

            {/* Clear, scientific labels */}
            <g className="text-[7.5px] font-mono select-none" fill="#86efac" opacity="0.9">
              <text x="10" y="16" fontWeight="bold">NÄHRSTOFF-RÜCKGEWINNUNG</text>
              <text x="10" y="26" fontSize="6.5" fill="#a3e635">Zersetzer (Käfer, Bakterien, Pilze)</text>
            </g>
          </svg>
        );
      case 'human_impact':
        return (
          <svg className="w-full h-44 bg-gradient-to-b from-slate-900 via-zinc-950 to-red-950 rounded-2xl overflow-hidden relative shadow-inner border border-white/10" viewBox="0 0 200 120">
            <polygon points="40,120 85,45 115,45 160,120" fill="url(#roadGrad)" />
            
            <line x1="40" y1="120" x2="85" y2="45" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
            <line x1="160" y1="120" x2="115" y2="45" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />

            <line x1="100" y1="45" x2="100" y2="120" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6,8" opacity="0.7" />

            <path d="M20,120 Q55,80 80,45" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            
            <path d="M0,80 L40,80 M0,100 L30,100 M165,80 L200,80 M175,100 L200,100" stroke="#f43f5e" strokeWidth="0.8" opacity="0.3" />
            <circle cx="25" cy="90" r="1.5" fill="#ef4444" opacity="0.8" />
            <circle cx="175" cy="90" r="1.5" fill="#ef4444" opacity="0.8" />

            <g transform="translate(100, 30)">
              <polygon points="0,-14 12,7 -12,7" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              <text x="0" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">!</text>
            </g>

            <g className="text-[7.5px] font-mono select-none" fill="#fecdd3">
              <text x="100" y="12" textAnchor="middle" fontWeight="bold" fill="#f43f5e">GESTÖRTE BIOLOGISCHE KRUSTE</text>
            </g>

            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
        );
      default:
        return null;
    }
  };

  const gridTiles: GridTile[] = [
    // ROW 0
    { r: 0, c: 0, type: 'dune', elevation: 25, hotspotId: 'dune' },
    { r: 0, c: 1, type: 'dune', elevation: 20 },
    { r: 0, c: 2, type: 'sand', elevation: 4 },
    { r: 0, c: 3, type: 'sand', elevation: 4 },
    { r: 0, c: 4, type: 'sand', elevation: 4 },
    { r: 0, c: 5, type: 'rock', elevation: 12 },
    { r: 0, c: 6, type: 'rock', elevation: 16, hotspotId: 'stone_desert' },
    { r: 0, c: 7, type: 'rock', elevation: 12 },

    // ROW 1
    { r: 1, c: 0, type: 'dune', elevation: 20 },
    { r: 1, c: 1, type: 'dune', elevation: 16 },
    { r: 1, c: 2, type: 'sand', elevation: 4 },
    { r: 1, c: 3, type: 'sand', elevation: 4 },
    { r: 1, c: 4, type: 'sand', elevation: 4 },
    { r: 1, c: 5, type: 'rock', elevation: 8 },
    { r: 1, c: 6, type: 'rock', elevation: 12 },
    { r: 1, c: 7, type: 'rock', elevation: 8 },

    // ROW 2
    { r: 2, c: 0, type: 'dune', elevation: 12 },
    { r: 2, c: 1, type: 'sand', elevation: 4 },
    { r: 2, c: 2, type: 'sand', elevation: 4 },
    { r: 2, c: 3, type: 'grass', elevation: 6 },
    { r: 2, c: 4, type: 'grass', elevation: 6 },
    { r: 2, c: 5, type: 'sand', elevation: 4 },
    { r: 2, c: 6, type: 'sand', elevation: 4 },
    { r: 2, c: 7, type: 'sand', elevation: 4 },

    // ROW 3
    { r: 3, c: 0, type: 'sand', elevation: 4 },
    { r: 3, c: 1, type: 'sand', elevation: 4 },
    { r: 3, c: 2, type: 'grass', elevation: 6 },
    { r: 3, c: 3, type: 'water', elevation: 2 },
    { r: 3, c: 4, type: 'water', elevation: 2, hotspotId: 'oasis' },
    { r: 3, c: 5, type: 'grass', elevation: 6 },
    { r: 3, c: 6, type: 'sand', elevation: 4 },
    { r: 3, c: 7, type: 'sand', elevation: 4 },

    // ROW 4
    { r: 4, c: 0, type: 'road', elevation: 3, hotspotId: 'human_impact' },
    { r: 4, c: 1, type: 'road', elevation: 3 },
    { r: 4, c: 2, type: 'grass', elevation: 6 },
    { r: 4, c: 3, type: 'water', elevation: 2 },
    { r: 4, c: 4, type: 'grass', elevation: 6 },
    { r: 4, c: 5, type: 'grass', elevation: 6 },
    { r: 4, c: 6, type: 'sand', elevation: 4 },
    { r: 4, c: 7, type: 'sand', elevation: 4 },

    // ROW 5
    { r: 5, c: 0, type: 'road', elevation: 3 },
    { r: 5, c: 1, type: 'burrow', elevation: 14, hotspotId: 'animal_burrow' },
    { r: 5, c: 2, type: 'sand', elevation: 4 },
    { r: 5, c: 3, type: 'grass', elevation: 6 },
    { r: 5, c: 4, type: 'sand', elevation: 4 },
    { r: 5, c: 5, type: 'sand', elevation: 4 },
    { r: 5, c: 6, type: 'sand', elevation: 4 },
    { r: 5, c: 7, type: 'sand', elevation: 4 },

    // ROW 6
    { r: 6, c: 0, type: 'road', elevation: 3 },
    { r: 6, c: 1, type: 'sand', elevation: 4 },
    { r: 6, c: 2, type: 'sand', elevation: 4 },
    { r: 6, c: 3, type: 'sand', elevation: 4 },
    { r: 6, c: 4, type: 'sand', elevation: 4 },
    { r: 6, c: 5, type: 'sand', elevation: 4 },
    { r: 6, c: 6, type: 'skeleton', elevation: 4, hotspotId: 'carcass' },
    { r: 6, c: 7, type: 'sand', elevation: 4 },

    // ROW 7
    { r: 7, c: 0, type: 'road', elevation: 3 },
    { r: 7, c: 1, type: 'sand', elevation: 4 },
    { r: 7, c: 2, type: 'sand', elevation: 4 },
    { r: 7, c: 3, type: 'sand', elevation: 4 },
    { r: 7, c: 4, type: 'sand', elevation: 4 },
    { r: 7, c: 5, type: 'sand', elevation: 4 },
    { r: 7, c: 6, type: 'sand', elevation: 4 },
    { r: 7, c: 7, type: 'sand', elevation: 4 },
  ];

  const handleTileClick = (hotspotId?: string) => {
    if (hotspotId) {
      desertAudio.playChime();
      setActiveHotspot(hotspotId);
    }
  };

  const handleCardClick = (id: string) => {
    desertAudio.playChime();
    setActiveHotspot(id);
  };

  const activeHotspotObj = hotspots.find(h => h.id === activeHotspot);
  const activeTab = activeHotspot ? simulationTabs[activeHotspot] : 'info';

  const setTabForActive = (tab: 'info' | 'simulation' | 'species') => {
    if (activeHotspot) {
      desertAudio.playClick();
      setSimulationTabs(prev => ({ ...prev, [activeHotspot]: tab }));
    }
  };

  return (
    <section 
      id="interaktive-karte" 
      className="py-24 px-4 md:px-8 bg-slate-950 text-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-orange-950/40 text-orange-400 border border-orange-500/10">
            Virtuelle Expedition
          </div>
          <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
            2. Interaktive Wüstenlandschaft
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            Erforsche die verschiedenen Lebensräume der Wüste direkt im plastischen 3D-Modell.
          </p>

          {/* New super intuitive quick guide box replacing the day-night effect notice */}
          <div className="flex justify-center pt-2">
            <div className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs font-mono text-slate-200 bg-orange-500/10 border border-orange-500/35 max-w-2xl text-center leading-relaxed shadow-lg shadow-orange-500/5">
              <span className="text-orange-400 animate-pulse font-black">🗺️ SCHNELLANLEITUNG:</span>
              <span>Klicke direkt auf die <b>rotierenden Ringe in der 3D-Platte</b> oder wähle einen der <b>Lebensräume unten</b> aus, um spannende Infos und Regler freizuschalten!</span>
            </div>
          </div>
        </div>

        {/* 3D Isometric Playing Sandbox */}
        <div className="relative flex flex-col items-center justify-center p-6 md:p-10 rounded-3xl border shadow-2xl overflow-hidden transition-all duration-1000 bg-gradient-to-br from-slate-900/50 via-slate-950/20 to-transparent border-orange-500/15">
          

          <div className="relative w-full max-w-3xl aspect-[4/3] flex items-center justify-center scale-90 sm:scale-100 md:scale-105 transition-all">
            
            {/* The Isometric Sandbox SVG */}
            <svg 
              className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
              viewBox="0 0 760 500"
            >
              <defs>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="15%" stopColor="#fffbeb" />
                  <stop offset="45%" stopColor="#fde047" />
                  <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Realistic Glowing Desert Sun with atmospheric lens flares (Static, no spinning rays) */}
              <g>
                {/* 1. Large, extremely soft ambient sky glow */}
                <circle cx="630" cy="85" r="140" fill="url(#sunGlow)" opacity="0.45" />

                {/* 2. Intense middle atmospheric corona (subtle pulse mimicking heat haze) */}
                <circle cx="630" cy="85" r="75" fill="url(#sunGlow)" className="animate-[pulse_4s_ease-in-out_infinite] opacity-80" />

                {/* 3. Main bright sun disc */}
                <circle cx="630" cy="85" r="32" fill="#fbbf24" opacity="0.9" />
                <circle cx="630" cy="85" r="20" fill="#ffffff" />

                {/* 4. Elegant camera lens flare artifacts along the sun-to-center diagonal line */}
                {/* Vector from (630, 85) to (380, 250): dx = -250, dy = 165 */}
                {/* Flare 1 (Close) */}
                <circle cx="560" cy="131" r="28" fill="#38bdf8" opacity="0.08" />
                <circle cx="560" cy="131" r="12" fill="#38bdf8" opacity="0.12" />

                {/* Flare 2 (Midway) */}
                <circle cx="505" cy="167" r="45" fill="#e11d48" opacity="0.04" />
                <circle cx="480" cy="184" r="15" fill="#fde047" opacity="0.06" />

                {/* Flare 3 (Distant) */}
                <circle cx="430" cy="217" r="22" fill="#a855f7" opacity="0.05" />
                <circle cx="360" cy="263" r="65" fill="#34d399" opacity="0.03" />
                <circle cx="300" cy="303" r="35" fill="#fb7185" opacity="0.04" />
              </g>

              {/* DRAW THE ISOMETRIC BLOCKS MATRICALLY BACK-TO-FRONT */}
              <g id="isometric-terrain">
                {[...gridTiles]
                  .sort((a, b) => (a.r + a.c) - (b.r + b.c))
                  .map((tile, idx) => {
                  const gridCenterX = 380;
                  const gridCenterY = 110;

                  const tileW = 82;
                  const tileH = 41;

                  const cx = gridCenterX + (tile.c - tile.r) * (tileW / 2);
                  const cy = gridCenterY + (tile.c + tile.r) * (tileH / 2) - tile.elevation;

                  // High-contrast beautiful day palette
                  let cTop = '#fcd34d';
                  let cLeft = '#f59e0b';
                  let cRight = '#d97706';

                  if (tile.type === 'dune') {
                    cTop = '#fbbf24';
                    cLeft = '#d97706';
                    cRight = '#b45309';
                  } else if (tile.type === 'rock') {
                    cTop = '#cbd5e1';
                    cLeft = '#94a3b8';
                    cRight = '#64748b';
                  } else if (tile.type === 'water') {
                    cTop = '#22d3ee';
                    cLeft = '#0891b2';
                    cRight = '#0369a1';
                  } else if (tile.type === 'grass') {
                    cTop = '#4ade80';
                    cLeft = '#16a34a';
                    cRight = '#15803d';
                  } else if (tile.type === 'road') {
                    cTop = '#4b5563';
                    cLeft = '#374151';
                    cRight = '#1f2937';
                  } else if (tile.type === 'burrow') {
                    cTop = '#a8a29e';
                    cLeft = '#78716c';
                    cRight = '#57534e';
                  } else if (tile.type === 'skeleton') {
                    cTop = '#fcd34d';
                    cLeft = '#f59e0b';
                    cRight = '#d97706';
                  } else {
                    // Standard Sand flat
                    cTop = '#fef08a';
                    cLeft = '#fcd34d';
                    cRight = '#f59e0b';
                  }

                  const baseH = tile.type === 'water' ? 2 : 18;

                  return (
                    <g 
                      key={`${tile.r}-${tile.c}-${idx}`}
                      className={`transition-all duration-300 group ${
                        tile.hotspotId 
                          ? 'hover:filter hover:brightness-125 cursor-pointer' 
                          : 'cursor-default'
                      }`}
                      onClick={() => handleTileClick(tile.hotspotId)}
                    >
                      {/* Left Face */}
                      <polygon
                        points={`
                          ${cx - tileW/2},${cy}
                          ${cx},${cy + tileH/2}
                          ${cx},${cy + tileH/2 + baseH}
                          ${cx - tileW/2},${cy + baseH}
                        `}
                        fill={cLeft}
                      />

                      {/* Right Face */}
                      <polygon
                        points={`
                          ${cx},${cy + tileH/2}
                          ${cx + tileW/2},${cy}
                          ${cx + tileW/2},${cy + baseH}
                          ${cx},${cy + tileH/2 + baseH}
                        `}
                        fill={cRight}
                      />

                      {/* Top Face */}
                      <polygon
                        points={`
                          ${cx},${cy - tileH/2}
                          ${cx + tileW/2},${cy}
                          ${cx},${cy + tileH/2}
                          ${cx - tileW/2},${cy}
                        `}
                        fill={cTop}
                        stroke="rgba(251, 191, 36, 0.25)"
                        strokeWidth="0.5"
                      />

                      {/* Detail overlays */}
                      {tile.type === 'water' && (
                        <ellipse cx={cx} cy={cy} rx="23" ry="10" fill="#06b6d4" opacity="0.3" />
                      )}

                      {tile.type === 'burrow' && (
                        <ellipse cx={cx} cy={cy} rx="9" ry="4.5" fill="#020617" />
                      )}

                      {tile.type === 'skeleton' && (
                        <g stroke="#78716c" strokeWidth="2" fill="none">
                          <line x1={cx - 14} y1={cy - 3} x2={cx + 14} y2={cy + 3} />
                          <line x1={cx - 6} y1={cy - 7} x2={cx - 6} y2={cy + 1} />
                          <line x1={cx + 6} y1={cy - 1} x2={cx + 6} y2={cy + 7} />
                        </g>
                      )}

                      {/* Vegetation */}
                      {tile.type === 'grass' && (tile.r + tile.c) % 2 === 0 && (
                        <text x={cx - 8} y={cy + 4} className="text-[18px] select-none pointer-events-none">🌴</text>
                      )}

                      {tile.type === 'road' && (
                        <g stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,3" fill="none">
                          <line x1={cx - 21} y1={cy + 10} x2={cx + 21} y2={cy - 10} />
                        </g>
                      )}

                      {/* Hotspot Indicators */}
                      {tile.hotspotId && (
                        <g>
                          {/* Outer Indicator Ring */}
                          <ellipse
                            cx={cx}
                            cy={cy - 4}
                            rx="16"
                            ry="8"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="2"
                            opacity="0.8"
                          />
                          {/* Inner glowing core */}
                          <circle cx={cx} cy={cy - 4} r="6" fill="#f97316" className="animate-pulse" />
                          <circle cx={cx} cy={cy - 4} r="3" fill="#ffffff" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Intuitive and prominent directly readable labels in the 3D grid map! (We make them clickable!) */}
              <g className="text-[10px] font-mono select-none font-bold tracking-wide" fill="#e2e8f0">
                {[
                  { id: 'dune', title: '✦ Düne', color: '#fbbf24', labelX: 50, labelY: 100, width: 80, r: 0, c: 0, elev: 25 },
                  { id: 'stone_desert', title: '✦ Steinwüste', color: '#cbd5e1', labelX: 535, labelY: 90, width: 105, r: 0, c: 6, elev: 16 },
                  { id: 'oasis', title: '✦ Oase', color: '#34d399', labelX: 540, labelY: 260, width: 75, r: 3, c: 4, elev: 2 },
                  { id: 'animal_burrow', title: '✦ Tierbau', color: '#ffa500', labelX: 45, labelY: 285, width: 85, r: 5, c: 1, elev: 14 },
                  { id: 'carcass', title: '✦ Zersetzer (Aas)', color: '#94a3b8', labelX: 525, labelY: 380, width: 120, r: 6, c: 6, elev: 4 },
                  { id: 'human_impact', title: '✦ Mensch-Einfluss', color: '#f87171', labelX: 35, labelY: 190, width: 120, r: 4, c: 0, elev: 3 }
                ].map((config) => {
                  const cx = 380 + (config.c - config.r) * (82 / 2);
                  const cy = 110 + (config.c + config.r) * (41 / 2) - config.elev;

                  let targetX = config.labelX + config.width / 2;
                  if (cx < config.labelX) {
                    targetX = config.labelX;
                  } else if (cx > config.labelX + config.width) {
                    targetX = config.labelX + config.width;
                  }
                  const targetY = config.labelY + 10;

                  return (
                    <g 
                      key={config.id}
                      className="cursor-pointer group/label transition-all duration-200 hover:filter hover:brightness-125"
                      onClick={() => handleTileClick(config.id)}
                    >
                      {/* Anchor dot on the tile top */}
                      <circle 
                        cx={cx} 
                        cy={cy - 4} 
                        r="3.5" 
                        fill={config.color} 
                        opacity="0.9" 
                        className="group-hover/label:scale-125 transition-transform duration-200"
                      />
                      {/* Connection line */}
                      <path 
                        d={`M ${cx} ${cy - 4} L ${targetX} ${targetY}`} 
                        stroke={config.color} 
                        strokeWidth="2.5" 
                        strokeDasharray="5,3" 
                        opacity="0.85" 
                        className="group-hover/label:stroke-white transition-all duration-200"
                      />
                      {/* Label capsule box */}
                      <rect 
                        x={config.labelX} 
                        y={config.labelY} 
                        width={config.width} 
                        height="20" 
                        rx="5" 
                        fill="#020617" 
                        fillOpacity="0.85" 
                        stroke={config.color}
                        strokeWidth="1.5"
                        className="transition-all duration-200 group-hover/label:fill-slate-900 group-hover/label:stroke-white shadow-lg" 
                      />
                      <text 
                        x={config.labelX + 8} 
                        y={config.labelY + 14} 
                        fill={config.color}
                        className="transition-all duration-200 group-hover/label:fill-white"
                      >
                        {config.title}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Interactive hints */}
          <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs font-mono opacity-80 bg-black/20 px-4 py-2.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Klicke direkt auf die <b>orangefarbenen Hotspots</b> oder die <b>farbigen Label-Kapseln</b> in der 3D-Platte, um einen Lebensraum zu erkunden!</span>
          </div>
        </div>

        {/* SOPHISTICATED GLASSMORPHISM EXPERIMENTAL LAB DIALOG OVERLAY */}
        <AnimatePresence>
          {activeHotspot && activeHotspotObj && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
              
              {/* Overlay Backdrop Blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
                onClick={() => setActiveHotspot(null)}
              />

              {/* Glassmorphism Window Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: 'spring', damping: 22, stiffness: 130 }}
                className="relative w-full max-w-4xl rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col md:flex-row h-[90vh] md:h-[620px] bg-slate-900/40 backdrop-blur-2xl text-slate-100"
              >
                {/* Left Side: Illustration + Steckbrief details */}
                <div className="md:w-1/3 relative p-6 md:p-8 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-slate-950/50">
                  
                  {/* SVG Tech Grid Decor */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,146,60,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,146,60,0.04)_1px,transparent_1px)] bg-[size:14px_22px] pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div>
                      <div className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest mb-2">Illustration</div>
                      {renderZoneIllustration(activeHotspotObj.id)}
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-orange-500 uppercase tracking-widest block">ÖKOSYSTEM</span>
                      <h3 className="font-sans text-2xl font-black uppercase leading-tight text-white">{activeHotspotObj.title}</h3>
                    </div>
                  </div>

                  {/* Clean environmental Overview Panel replacing telemetric data */}
                  <div className="relative z-10 space-y-3 bg-black/45 p-4 rounded-2xl border border-white/10">
                    <div className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-2">BIOTOP-STECKBRIEF</div>
                    
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="opacity-60">BODENART:</span>
                      <span className="font-extrabold text-amber-400 text-right">
                        {activeHotspotObj.id === 'dune' ? 'Feiner Flugsand' :
                         activeHotspotObj.id === 'stone_desert' ? 'Fels & Geröll' :
                         activeHotspotObj.id === 'oasis' ? 'Feuchter Humus' :
                         activeHotspotObj.id === 'animal_burrow' ? 'Unterirdisch' :
                         activeHotspotObj.id === 'carcass' ? 'Karger Sand' : 'Kies / Sand'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="opacity-60">HERAUSFORDERUNG:</span>
                      <span className="font-bold text-red-400 text-right">
                        {activeHotspotObj.id === 'dune' ? 'Bodenbewegung' :
                         activeHotspotObj.id === 'stone_desert' ? 'Extreme Hitze' :
                         activeHotspotObj.id === 'oasis' ? 'Konkurrenz' :
                         activeHotspotObj.id === 'animal_burrow' ? 'Lichtmangel' :
                         activeHotspotObj.id === 'carcass' ? 'Nährstoffarmut' : 'Störfaktoren'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="opacity-60">WASSERZUGANG:</span>
                      <span className="font-bold text-sky-400 text-right">
                        {activeHotspotObj.id === 'oasis' ? 'Sehr hoch' :
                         activeHotspotObj.id === 'animal_burrow' ? 'Gut (feucht)' : 'Sehr gering'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Navigation Tabs and Interactive Simulation Lab */}
                <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-950/20">
                  {/* Modal Header Tabs */}
                  <div className="flex border-b border-white/10 bg-slate-950/40">
                    <button
                      onClick={() => setTabForActive('info')}
                      className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === 'info'
                          ? 'border-orange-500 text-orange-500 font-black'
                          : 'border-transparent opacity-60 hover:opacity-100 text-slate-300'
                      }`}
                    >
                      Lebensraum-Infos
                    </button>
                    <button
                      onClick={() => setTabForActive('simulation')}
                      className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeTab === 'simulation'
                          ? 'border-orange-500 text-orange-500 font-black'
                          : 'border-transparent opacity-60 hover:opacity-100 text-slate-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>Interaktiver Regler</span>
                    </button>
                    <button
                      onClick={() => setTabForActive('species')}
                      className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === 'species'
                          ? 'border-orange-500 text-orange-500 font-black'
                          : 'border-transparent opacity-60 hover:opacity-100 text-slate-300'
                      }`}
                    >
                      Tier- & Pflanzenwelt
                    </button>

                    {/* Exit Close Button */}
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="p-4 hover:bg-red-500/10 hover:text-red-500 transition-colors text-slate-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Interactive Content Scroll Arena */}
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto leading-relaxed">
                    
                    {/* TAB 1: PROTOKOLL */}
                    {activeTab === 'info' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">Beschreibung des Biotops</h4>
                          <p className="text-sm md:text-base leading-relaxed text-slate-200">{activeHotspotObj.fullDesc}</p>
                        </div>

                        <div className="p-5 rounded-2xl border border-white/5 bg-slate-950/60 text-xs leading-relaxed text-slate-300">
                          <h5 className="font-bold text-orange-400 uppercase tracking-widest block mb-2 text-[10px]">ÖKOLOGISCHER ZUSAMMENHANG</h5>
                          {activeHotspotObj.id === 'dune' && 'Sanddünen zeigen, wie labil loser Boden ohne Bewuchs ist. Pflanzen binden den Sand mit ihren Wurzeln und verhindern die Ausbreitung der Wüste.'}
                          {activeHotspotObj.id === 'stone_desert' && 'In der Steinwüste wird das Gestein durch die extreme Hitze am Tag und Kälte in der Nacht regelrecht gesprengt. So entsteht im Laufe von Jahrtausenden neuer Wüstensand.'}
                          {activeHotspotObj.id === 'oasis' && 'Ein echtes Naturwunder: Wo Wasser ist, entfaltet sich das Leben explosionsartig. Die Oase bricht den Wassermangel und bildet ein extrem dichtes Nahrungsnetz.'}
                          {activeHotspotObj.id === 'animal_burrow' && 'Der Tierbau bietet ein perfektes Mikroklima. Er filtert die glühende Hitze des Tages ab und bewahrt die lebenswichtige Feuchtigkeit für Nagetiere, Reptilien und Insekten.'}
                          {activeHotspotObj.id === 'carcass' && 'Zersetzer wie Käfer, Pilze und Bakterien bilden das Nadelöhr des Wüsten-Ökosystems. Sie recyceln Biomasse rasant und geben dem kargen Sandboden wichtige Nährstoffe zurück.'}
                          {activeHotspotObj.id === 'human_impact' && 'Menschlicher Einfluss kann das fragile Gleichgewicht der Wüste schnell stören. Das Zerstören der Wüstenkruste durch Fahrzeuge begünstigt heftige Sandstürme.'}
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: SIMULATOR LAB */}
                    {activeTab === 'simulation' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">Umwelt-Wechselwirkungen ausprobieren</h4>
                          <p className="text-xs text-slate-400">Verändere den Regler, um zu sehen, wie die Wüstennatur auf äußere Einflüsse reagiert:</p>
                        </div>

                        {/* RENDER LABORATORY BASED ON AREA */}
                        
                        {/* dune */}
                        {activeHotspotObj.id === 'dune' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>WINDSTÄRKE REGULIEREN:</span>
                                <span className={`px-2.5 py-1 rounded font-black ${windSpeed > 80 ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-orange-500/10 text-orange-400'}`}>
                                  {windSpeed} km/h
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="120" 
                                value={windSpeed}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setWindSpeed(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <h5 className="text-xs font-mono font-bold text-orange-400">Auswirkung auf die Düne:</h5>
                              <div className={`p-4 rounded-xl border text-xs leading-relaxed flex gap-3 items-start transition-all duration-300 ${
                                windSpeed > 80 
                                  ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                                  : windSpeed > 45 
                                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
                                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                              }`}>
                                <Wind className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>
                                  {windSpeed > 80 
                                    ? '🌪️ EXTREMER STURM: Der heftige Sturm reißt den spärlichen Dünenhafer mitsamt den Wurzeln heraus. Der Sand wird instabil, die Düne wandert rasant und verschüttet umliegende Pflanzen.' 
                                    : windSpeed > 45 
                                      ? '💨 FRISCHER WIND: Lockere Sandkörner fliegen durch die Luft. Nur Pflanzen mit extrem langen Wurzeln können sich jetzt noch festhalten.' 
                                      : '☀️ ANGENEHMES WETTER: Die Düne bleibt stabil. Feine Algenkrusten auf dem feuchten Tiefensand können wachsen und binden den Sand.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* oasis */}
                        {activeHotspotObj.id === 'oasis' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>GRUNDWASSERSTAND (NUTZUNG):</span>
                                <span className={`px-2.5 py-1 rounded font-black ${waterExtraction > 70 ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                  {waterExtraction}% entnommen
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={waterExtraction}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setWaterExtraction(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <h5 className="text-xs font-mono font-bold text-emerald-400">Auswirkung auf die Oase:</h5>
                              <div className={`p-4 rounded-xl border text-xs leading-relaxed flex gap-3 items-start transition-all duration-300 ${
                                waterExtraction > 70 
                                  ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                                  : waterExtraction > 40 
                                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
                                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                              }`}>
                                <Droplet className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>
                                  {waterExtraction > 70 
                                    ? '🛑 WASSERMANGEL: Durch zu viel Wasserverbrauch trocknet der Oasenteich aus. Pflanzen verdorren und die Tiere finden kein Trinkwasser mehr.' 
                                    : waterExtraction > 40 
                                      ? '⚠️ TROCKENSTRESS: Der Wasserspiegel sinkt spürbar. Junge Pflanzen wachsen viel langsamer, weil die obere Bodenschicht austrocknet.' 
                                      : '💚 BLÜHENDES LEBEN: Die Oase hat reichlich Wasser. Pflanzen wachsen dicht, und Insekten, Vögel und Reptilien gedeihen hervorragend.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* stone_desert */}
                        {activeHotspotObj.id === 'stone_desert' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>SONNENEINSTRAHLUNG EINSTELLEN:</span>
                                <span className="bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded font-black">
                                  Stufe {solarIntensity} von 10
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={solarIntensity}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setSolarIntensity(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <h5 className="text-xs font-mono font-bold text-orange-400">Errechnete Bodentemperatur:</h5>
                              <div className="flex items-center gap-2 font-mono text-xl font-black text-red-500">
                                <Thermometer className="w-6 h-6 animate-pulse" />
                                <span>{(25 + solarIntensity * 5.5).toFixed(1)} °C</span>
                              </div>
                              <div className={`p-4 rounded-xl border text-xs leading-relaxed flex gap-3 items-start transition-all duration-300 ${
                                solarIntensity > 8 
                                  ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                              }`}>
                                <Flame className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>
                                  {solarIntensity > 8 
                                    ? '🔥 EXTREME HITZE: Der nackte Fels erhitzt sich enorm. Echsen und Insekten müssen sofort tief in kühle Gesteinsspalten flüchten, um nicht zu überhitzen.' 
                                    : '🌤️ OPTIMALE WÄRME: Die Sonnenstrahlung ist moderat. Wechselwarme Echsen nutzen die angenehm warmen Steine, um Energie zu tanken.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* animal_burrow */}
                        {activeHotspotObj.id === 'animal_burrow' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>AUSSENTEMPERATUR DER LUFT VERÄNDERN:</span>
                                <span className="bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded font-black">
                                  {outsideTemp} °C
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="15" 
                                max="55" 
                                value={outsideTemp}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setOutsideTemp(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5">
                                <span className="text-[10px] font-mono text-slate-400 block uppercase">An der Oberfläche</span>
                                <span className="text-lg font-bold text-red-400">{outsideTemp} °C</span>
                              </div>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                                <span className="text-[10px] font-mono text-emerald-400 block uppercase">Im Tierbau (-1 Meter)</span>
                                <span className="text-lg font-bold text-emerald-300">22.5 °C (Konstant)</span>
                              </div>
                            </div>

                            <p className="text-[11px] opacity-80 leading-relaxed text-slate-300 font-mono">
                              💡 <b>Der Natur-Trick:</b> Weil Sand Wärme extrem schlecht leitet, dringen die heißen Temperaturen des Tages gar nicht tief in den Boden ein. Im Bau bleibt es immer angenehm mild!
                            </p>
                          </div>
                        )}

                        {/* carcass */}
                        {activeHotspotObj.id === 'carcass' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>AKTIVITÄT DER KÄFER & PILZE (ZERSETZER):</span>
                                <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded font-black">
                                  {decomposerActivity}%
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={decomposerActivity}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setDecomposerActivity(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                              />
                            </div>

                            <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-xs font-mono space-y-2">
                              <div className="flex justify-between border-b border-white/5 pb-1 text-slate-300">
                                <span>Freigesetzter Pflanzendünger (Nitrat):</span>
                                <span className="text-emerald-400 font-extrabold">{(decomposerActivity * 1.5).toFixed(0)} mg / kg</span>
                              </div>
                              <p className="opacity-75 pt-1 text-slate-400 normal-case leading-relaxed font-sans">
                                {decomposerActivity > 70 
                                  ? '🪲 FLEISSIGE ZERSETZER: Die Käfer und Ameisen arbeiten perfekt. Der Boden erhält enorm viele Nährstoffe zurück, was neues Pflanzenwachstum antreibt.' 
                                  : '⏳ STAGNATION: Biomasse wird kaum zersetzt. Dem Sandboden mangelt es an Nährstoffen, sodass nach einem Regen kaum neue Pflanzen keimen können.'}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* human_impact */}
                        {activeHotspotObj.id === 'human_impact' && (
                          <div className="space-y-6">
                            <div className="bg-black/35 p-5 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span>STÄRKE DES MENSCHLICHEN EINFLUSSES:</span>
                                <span className={`px-2.5 py-1 rounded font-black ${humanDisturbance > 65 ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-orange-500/10 text-orange-400'}`}>
                                  {humanDisturbance}% Störung
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={humanDisturbance}
                                onChange={(e) => {
                                  desertAudio.playClick();
                                  setHumanDisturbance(parseInt(e.target.value));
                                }}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                              />
                            </div>

                            <div className={`p-4 rounded-xl border text-xs leading-relaxed flex gap-3 items-start transition-all duration-300 ${
                              humanDisturbance > 65 
                                ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            }`}>
                              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                              <p>
                                {humanDisturbance > 65 
                                  ? '🛑 SCHWERE SCHÄDEN: Geländefahrzeuge zerstören die dünne, schützende Wüstenkruste aus Bakterien und Moosen. Der lose Sand fängt an zu fliegen - Staubstürme häufen sich.' 
                                  : '💚 SCHUTZ-MODUS: Geführter Tourismus auf festen Wegen schützt den Sandboden. Die Wüstenkruste bleibt intakt und verhindert Bodenerosion.'}
                              </p>
                            </div>
                          </div>
                        )}

                      </motion.div>
                    )}

                    {/* TAB 3: SPECIES LIST */}
                    {activeTab === 'species' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">Typische Bewohner dieses Lebensraums</h4>
                        <p className="text-xs text-slate-400">Erfahre, mit welchen besonderen Anpassungen diese Arten hier überleben:</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {activeHotspotObj.id === 'oasis' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🌴</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Echte Dattelpalme</div>
                                  <div className="text-[10px] text-emerald-400 font-mono">Tiefe Wurzeln saugen Grundwasser an.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🐸</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Wüstenkröte</div>
                                  <div className="text-[10px] text-sky-400 font-mono">Kann sich monatelang im Schlamm vergraben.</div>
                                </div>
                              </div>
                            </>
                          )}

                          {activeHotspotObj.id === 'dune' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🌾</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Dünenhafer</div>
                                  <div className="text-[10px] text-amber-400 font-mono">Extrem weit verzweigte Wurzeln binden Sand.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🦎</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Apothekerskink</div>
                                  <div className="text-[10px] text-orange-400 font-mono">"Schwimmt" reibungslos direkt unter dem Sand.</div>
                                </div>
                              </div>
                            </>
                          )}

                          {activeHotspotObj.id === 'stone_desert' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🦎</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Dornschwanz-Agame</div>
                                  <div className="text-[10px] text-stone-400 font-mono">Nimmt Feuchtigkeit über die Nahrung auf.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🦂</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Skorpion</div>
                                  <div className="text-[10px] text-amber-400 font-mono">Dicker Panzer schützt perfekt vor Hitze.</div>
                                </div>
                              </div>
                            </>
                          )}

                          {activeHotspotObj.id === 'animal_burrow' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🐹</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Wüstenrennmaus</div>
                                  <div className="text-[10px] text-emerald-400 font-mono">Bezieht Wasser fast komplett aus Samen.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🐍</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Hornviper</div>
                                  <div className="text-[10px] text-red-400 font-mono">Gräbt sich im Sand ein, um auf Beute zu lauern.</div>
                                </div>
                              </div>
                            </>
                          )}

                          {activeHotspotObj.id === 'carcass' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🪲</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Schwarzkäfer</div>
                                  <div className="text-[10px] text-slate-400 font-mono">Zersetzt trockene Pflanzenteile.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🍄</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Destruenten (Pilze)</div>
                                  <div className="text-[10px] text-emerald-400 font-mono">Geben Nährstoffe zurück an den Boden.</div>
                                </div>
                              </div>
                            </>
                          )}

                          {activeHotspotObj.id === 'human_impact' && (
                            <>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🐐</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Ziegenherden</div>
                                  <div className="text-[10px] text-red-400 font-mono">Überweidung gefährdet die kargen Gräser.</div>
                                </div>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center gap-4">
                                <span className="text-3xl">🚧</span>
                                <div>
                                  <div className="text-xs font-bold font-sans text-white">Tourismus & Bau</div>
                                  <div className="text-[10px] text-slate-400 font-mono">Verdichtung zerstört die Bodenkruste.</div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </div>

                  {/* Window Footer Actions */}
                  <div className="p-4 md:px-6 border-t border-white/10 flex justify-between items-center text-xs font-mono bg-slate-950/45">
                    <span className="opacity-60 text-slate-400">Interaktive Wüstensimulation</span>
                    <span className="text-orange-400 font-extrabold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Live-Daten</span>
                    </span>
                  </div>
                </div>

              </motion.div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
