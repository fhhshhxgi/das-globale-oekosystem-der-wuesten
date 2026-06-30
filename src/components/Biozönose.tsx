import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Bug, Flame, RefreshCw, ShieldCheck, Sun, Moon, 
  Droplet, Eye, ChevronRight, Compass, Info, Zap, Sparkles
} from 'lucide-react';
import { Organism } from '../types';
import { desertAudio } from '../utils/audioManager';

interface BiozönoseProps {
  isNight: boolean;
  setIsNight?: (n: boolean) => void;
  isPresentationMode: boolean;
}

export default function Biozönose({ isNight: globalIsNight, isPresentationMode }: BiozönoseProps) {
  const [selectedTrophic, setSelectedTrophic] = useState<'all' | 'producer' | 'primary' | 'secondary' | 'decomposer'>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [localNightMode, setLocalNightMode] = useState<boolean>(false);

  // Combine global night state with our local night toggle for a fully immersive exploration
  const activeNightState = globalIsNight || localNightMode;

  const organisms: Organism[] = [
    // PRODUZENTEN
    {
      id: 'akazie',
      name: 'Wüstenakazie',
      scientificName: 'Acacia tortilis',
      category: 'producer',
      description: 'Zäher Schirmakazienbaum, der mit weit ausladender Krone Schatten spendet und in extremen Trockengebieten überlebt.',
      adaptations: [
        'Bis zu 35 Meter tiefe Pfahlwurzeln zur Erschließung tiefster Grundwasserschichten.',
        'Winzige Fiederblättchen, die sich bei großer Hitze zusammenfalten, um die Verdunstungsfläche zu minimieren.',
        'Lange, spitze Dornen zum Schutz vor großen Pflanzenfressern wie Antilopen.'
      ],
      icon: 'Leaf',
      nightActive: false
    },
    {
      id: 'sukkulente',
      name: 'Wasserspeicher-Sukkulente',
      scientificName: 'Caralluma acutangula',
      category: 'producer',
      description: 'Fleischige, dickwandige Pflanze, die Regenwasser blitzschnell aufnimmt und monatelang im inneren Gewebe speichern kann.',
      adaptations: [
        'Dicke, wachsartige Cuticula (Außenhaut), die grelles Sonnenlicht effektiv reflektiert.',
        'Stamm-Sukkulenz: Reduzierte Blätter zur Vermeidung von Wasserverlust; Photosynthese im Stamm.',
        'CAM-Photosynthese: Öffnet Spaltöffnungen nur in der kühlen Nacht zur CO₂-Aufnahme.'
      ],
      icon: 'Leaf',
      nightActive: false
    },
    {
      id: 'dornstrauch',
      name: 'Wüsten-Dornstrauch',
      scientificName: 'Ziziphus lotus',
      category: 'producer',
      description: 'Extrem zäher, stark verholzter Busch, der dichte und dornige Barrieren gegen Fressfeinde bildet.',
      adaptations: [
        'Vollständige Reduktion der Blätter zu dornigen Nadeln zur Minimierung der Transpiration.',
        'Opportunistischer Lebenszyklus: Extrem schnelles Blühen und Samenbilden nach kurzen Regenschauern.',
        'Laubabwurf-Strategie: Wirft bei extremer, monatelanger Dürre alle grünen Teile ab und überdauert im Ruhezustand.'
      ],
      icon: 'Leaf',
      nightActive: false
    },

    // KONSUMENTEN 1. ORDNUNG
    {
      id: 'dromedar',
      name: 'Dromedar',
      scientificName: 'Camelus dromedarius',
      category: 'primary_consumer',
      description: 'Das hochentwickelte „Wüstenschiff“ und der unangefochtene Meister des Stoffwechsels im Sandmeer.',
      adaptations: [
        'Der Fetthöcker dient als konzentrierte Energiereserve. Beim Fettabbau entsteht wertvolles Stoffwechselwasser.',
        'Kann bis zu 150 Liter Wasser in nur 10 Minuten trinken, ohne dass die roten Blutkörperchen platzen.',
        'Breite Schwielensohlen verteilen das Gewicht perfekt und verhindern das Einsinken im lockeren Dünensand.'
      ],
      icon: 'Compass',
      diet: 'Dornsträucher, salzige Gräser, Akazienblätter und trockene Äste',
      nightActive: false
    },
    {
      id: 'wuestenrennmaus',
      name: 'Wüstenrennmaus',
      scientificName: 'Gerbillinae',
      category: 'primary_consumer',
      description: 'Kleines, flinkes Nagetier, das in ausgeklügelten, kühlen unterirdischen Tunnelsystemen lebt.',
      adaptations: [
        'Hocheffiziente Nieren scheiden extrem konzentrierten Urin aus, um jeden Tropfen Wasser im Körper zu behalten.',
        'Bezieht die benötigte Feuchtigkeit fast ausschließlich über die Nahrung (trockene, aber ölhaltige Samen).',
        'Strikte Nachtaktivität schützt den winzigen Körper vor der tödlichen Hitze des Tages.'
      ],
      icon: 'Bug',
      diet: 'Samen, trockene Gräser, Speicherwurzeln und Knollen',
      nightActive: true
    },
    {
      id: 'gazelle',
      name: 'Dünengazelle',
      scientificName: 'Gazella leptoceros',
      category: 'primary_consumer',
      description: 'Elegante, extrem scheue Huftierart, die perfekt an das Leben in den weiten, wasserlosen Sanddünen angepasst ist.',
      adaptations: [
        'Sehr helles, sandfarbenes Fell tarnt perfekt und reflektiert das Sonnenlicht optimal.',
        'Kann die eigene Körpertemperatur anheben, um erst sehr spät durch Schwitzen Wasser zu verlieren.',
        'Vergrößerte Hufe, die sich wie Schneeschuhe spreizen lassen, um mühelos über Dünenkämme zu gleiten.'
      ],
      icon: 'Compass',
      diet: 'Kräuter, Wüstengräser, sukkulente Blätter',
      nightActive: true
    },
    {
      id: 'heuschrecke',
      name: 'Wüstenheuschrecke',
      scientificName: 'Schistocerca gregaria',
      category: 'primary_consumer',
      description: 'Ein flugfähiges Insekt, das bei seltenen Regenfällen riesige Schwärme bildet und weite Strecken überwindet.',
      adaptations: [
        'Widerstandsfähiges Exoskelett aus Chitin mit dicker Wachsschicht schützt vor Verdunstung.',
        'Kann extreme Distanzen fliegend zurücklegen, um neu ergrünte Vegetationsflächen aufzuspüren.',
        'Fähigkeit, Feuchtigkeit direkt aus der feuchteren nächtlichen Luft über die Tracheen aufzunehmen.'
      ],
      icon: 'Bug',
      diet: 'Jegliche erreichbare grüne Biomasse, Blätter, Blüten',
      nightActive: false
    },

    // KONSUMENTEN HÖHERER ORDNUNG
    {
      id: 'fennek',
      name: 'Fennek (Wüstenfuchs)',
      scientificName: 'Vulpes zerda',
      category: 'secondary_consumer',
      description: 'Der kleinste aller Wildfüchse mit charakteristisch übergroßen Ohren und hervorragendem Gehör.',
      adaptations: [
        'Riesige Ohrmuscheln (bis zu 15 cm) fungieren als hocheffiziente Wärmeabstrahler zur Kühlung des Blutes.',
        'Dicht behaarte Pfotensohlen schützen vor Verbrennungen auf dem tagsüber bis zu 70 °C heißen Wüstensand.',
        'Ausgeprägter Nachtjäger, der den Tag schlafend in kühlen, tief gegrabenen Sandhöhlen verbringt.'
      ],
      icon: 'Flame',
      diet: 'Wüstenrennmäuse, Eidechsen, Insekten, Eier und saftige Wurzeln',
      nightActive: true
    },
    {
      id: 'skorpion',
      name: 'Wüstenskorpion',
      scientificName: 'Androctonus amoreuxi',
      category: 'secondary_consumer',
      description: 'Ein uralter, extrem widerstandsfähiger Jäger, der unter Steinen und in tiefen Ritzen lauert.',
      adaptations: [
        'Wachshaltige Cuticula verringert den passiven Wasserverlust fast auf den absoluten Nullpunkt.',
        'Kann den Stoffwechsel so stark drosseln, dass er mit einer einzigen Mahlzeit ein ganzes Jahr überlebt.',
        'Hochempfindliche Sinneshaare (Spaltnester) an den Beinen registrieren winzigste Vibrationen herannahender Beute.'
      ],
      icon: 'Bug',
      diet: 'Heuschrecken, Käfer, Spinnen und andere kleine Skorpione',
      nightActive: true
    },
    {
      id: 'schlange',
      name: 'Sahara-Hornviper',
      scientificName: 'Cerastes cerastes',
      category: 'secondary_consumer',
      description: 'Eine hochgiftige Viper, die sich meisterhaft tarnt und lautlos im Sand bewegen kann.',
      adaptations: [
        'Seitenwinden: Eine energiesparende Fortbewegung, bei der immer nur zwei Punkte den heißen Sand berühren.',
        'Lauerjäger-Strategie: Gräbt sich flach in den Sand ein, sodass nur die Augen und die kleinen Hörner herausschauen.',
        'Extrem effizienter Wasserhaushalt: Entzieht der Beute die gesamte Feuchtigkeit; muss niemals aktiv trinken.'
      ],
      icon: 'Flame',
      diet: 'Wüstenrennmäuse, Geckos, kleine Vögel und Echsen',
      nightActive: true
    },

    // DESTRUENTEN
    {
      id: 'bakterien',
      name: 'Bodenbakterien & Pilze',
      scientificName: 'Micrococcaceae & Fungi',
      category: 'decomposer',
      description: 'Mikroskopisch kleine, aber unersetzliche Zersetzer, die den kargen Sandboden mit Nährstoffen anreichern.',
      adaptations: [
        'Fähigkeit zur Bildung extrem hitze- und austrocknungsresistenter Überdauerungssporen.',
        'Können bei extremer Dürre jahrelang im Zustand der Anabiose (Scheintod) verharren.',
        'Explosive Aktivierung bei minimaler Feuchtigkeit zur schnellen Remineralisierung organischer Stoffe.'
      ],
      icon: 'RefreshCw',
      nightActive: false
    },
    {
      id: 'termiten',
      name: 'Wüstentermiten',
      scientificName: 'Psammotermes hybostoma',
      category: 'decomposer',
      description: 'Soziale Insekten, die im Untergrund leben und trockenes Pflanzenmaterial abbauen.',
      adaptations: [
        'Bauen meterfeine Tunnelsysteme bis nahe an den Grundwasserspiegel, um die Luftfeuchtigkeit im Bau stabil zu halten.',
        'Verwendung von feuchtem Speichel zur Stabilisierung der Tunnelwände gegen Einsturz im lockeren Sand.',
        'Symbiotische Darmbakterien ermöglichen den Abbau extrem trockener Holz- und Zellulosefasern.'
      ],
      icon: 'Bug',
      nightActive: true
    }
  ];

  const trophicLevels = [
    { 
      id: 'all', 
      label: 'Gesamte Biozönose', 
      title: 'Das ökologische Gleichgewicht',
      desc: 'Alle Ebenen greifen nahtlos ineinander, um das Überleben im Extrembiotop zu sichern.',
      count: organisms.filter(o => o.nightActive === activeNightState).length,
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      glow: 'shadow-orange-500/10'
    },
    { 
      id: 'producer', 
      label: 'Produzenten (Erzeuger)', 
      title: 'Die energetische Basis',
      desc: 'Pflanzen wandeln Sonnenenergie durch Photosynthese in organische Stoffe um und bilden die Lebensgrundlage.',
      count: organisms.filter(o => o.category === 'producer' && o.nightActive === activeNightState).length,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    },
    { 
      id: 'primary', 
      label: 'Konsumenten 1. Ordnung', 
      title: 'Die Pflanzenfresser',
      desc: 'Herbivoren ernähren sich direkt von den Erzeugern und haben hochspezialisierte Wasserspar-Systeme entwickelt.',
      count: organisms.filter(o => o.category === 'primary_consumer' && o.nightActive === activeNightState).length,
      color: 'from-amber-500 to-yellow-500',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    },
    { 
      id: 'secondary', 
      label: 'Konsumenten höh. Ordnung', 
      title: 'Die Fleischfresser',
      desc: 'Prädatoren jagen andere Tiere. Sie beziehen einen Großteil ihres Flüssigkeitsbedarfs direkt aus ihrer Beute.',
      count: organisms.filter(o => o.category === 'secondary_consumer' && o.nightActive === activeNightState).length,
      color: 'from-rose-500 to-red-500',
      borderColor: 'border-rose-500/30',
      textColor: 'text-rose-400',
      glow: 'shadow-rose-500/10'
    },
    { 
      id: 'decomposer', 
      label: 'Destruenten (Zersetzer)', 
      title: 'Der Nährstoffkreislauf',
      desc: 'Abfallfresser und Mikroorganismen bauen totes organisches Material ab und schließen den Stoffkreislauf.',
      count: organisms.filter(o => o.category === 'decomposer' && o.nightActive === activeNightState).length,
      color: 'from-purple-500 to-indigo-500',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      glow: 'shadow-purple-500/10'
    }
  ];

  const getTrophicIcon = (cat: string) => {
    switch (cat) {
      case 'producer': return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'primary_consumer': return <Compass className="w-5 h-5 text-amber-400" />;
      case 'secondary_consumer': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'decomposer': return <RefreshCw className="w-5 h-5 text-purple-400" />;
      default: return <Compass className="w-5 h-5 text-yellow-400" />;
    }
  };

  const filteredOrganisms = (selectedTrophic === 'all' 
    ? organisms 
    : organisms.filter(o => {
        if (selectedTrophic === 'producer') return o.category === 'producer';
        if (selectedTrophic === 'primary') return o.category === 'primary_consumer';
        if (selectedTrophic === 'secondary') return o.category === 'secondary_consumer';
        if (selectedTrophic === 'decomposer') return o.category === 'decomposer';
        return true;
      })
  ).filter(o => o.nightActive === activeNightState);

  const activeLevelInfo = trophicLevels.find(level => level.id === selectedTrophic) || trophicLevels[0];

  const handleTrophicSelect = (id: 'all' | 'producer' | 'primary' | 'secondary' | 'decomposer') => {
    setSelectedTrophic(id);
    setExpandedCard(null);
  };

  return (
    <section 
      id="biozönose-tiere" 
      className={`py-16 px-4 md:px-8 transition-colors duration-1000 ${
        activeNightState 
          ? 'bg-gradient-to-b from-slate-950 via-[#0a0f24] to-slate-950 text-slate-100' 
          : 'bg-gradient-to-b from-slate-950 via-[#0d0905] to-slate-950 text-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ökologische Nische & Lebensgemeinschaft</span>
          </div>
          <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-normal py-1">
            3. Die Biozönose der Wüste
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full" />
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Die Lebensgemeinschaft (Biozönose) extreme Wüstenbewohner ist perfekt aufeinander abgestimmt. Erkunde die trophische Pyramide und die Überlebensanpassungen.
          </p>
        </div>

        {/* TWO COLUMN BENTO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: TROPHIC PYRAMID & SIMULATION CONTROLS */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Immersive Day/Night Local Simulator */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Umgebungs-Simulator</h4>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  activeNightState ? 'bg-indigo-500/10 text-indigo-300' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {activeNightState ? 'Nacht aktiv' : 'Tag aktiv'}
                </span>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Schalte die Wüste in den Nachtmodus, um zu sehen, wie sich die Verhaltensmuster und die Aktivität der verschiedenen Tierarten schlagartig verändern.
                </p>
                
                <button
                  onClick={() => {
                    setLocalNightMode(!localNightMode);
                    if (desertAudio) {
                      try {
                        desertAudio.playClick();
                      } catch (e) {}
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-mono text-xs font-bold ${
                    localNightMode 
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {localNightMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    <span>{localNightMode ? 'Lokale Nacht-Simulation: AN' : 'Nacht-Simulation aktivieren'}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${localNightMode ? 'bg-indigo-500' : 'bg-slate-800'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${localNightMode ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Interactive Ecological Pyramid / Trophic Stack */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Trophische Pyramide</h4>
                <p className="text-[11px] text-slate-500">Wähle eine Stufe, um den Energiefluss im Ökosystem zu filtern:</p>
              </div>

              <div className="space-y-3 pt-2">
                {trophicLevels.map((level, idx) => {
                  const isSelected = selectedTrophic === level.id;
                  
                  // Width percentages representing the ecological energy loss (widest at bottom)
                  // idx = 0 is 'all', others represent levels
                  let widthClass = 'w-full';
                  if (level.id === 'producer') widthClass = 'w-full';
                  if (level.id === 'primary') widthClass = 'w-[85%]';
                  if (level.id === 'secondary') widthClass = 'w-[70%]';
                  if (level.id === 'decomposer') widthClass = 'w-[60%]';

                  return (
                    <button
                      key={level.id}
                      onClick={() => handleTrophicSelect(level.id as any)}
                      className={`text-left block transition-all duration-300 relative group overflow-hidden ${widthClass} ${
                        isSelected ? 'scale-105 z-10' : 'hover:translate-x-1 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-r ${level.color} text-slate-950 border-white/20 shadow-lg ${level.glow}` 
                          : 'bg-slate-950/40 border-slate-800 text-slate-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={`p-1.5 rounded-lg text-xs ${
                              isSelected ? 'bg-white/20' : 'bg-slate-900/80 border border-white/5'
                            }`}>
                              {level.id === 'all' && <Compass className="w-3.5 h-3.5" />}
                              {level.id === 'producer' && <Leaf className="w-3.5 h-3.5 text-emerald-400" />}
                              {level.id === 'primary' && <Bug className="w-3.5 h-3.5 text-amber-400" />}
                              {level.id === 'secondary' && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                              {level.id === 'decomposer' && <RefreshCw className="w-3.5 h-3.5 text-purple-400" />}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide font-sans">{level.label}</span>
                          </div>
                          
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                            isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                          }`}>
                            {level.count}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: MAIN SHOWCASE & ORGANISMS PROFILE PANELS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Focused Trophic Level Info Display */}
            <motion.div 
              key={selectedTrophic}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 rounded-3xl bg-slate-900/20 border border-white/5 relative overflow-hidden backdrop-blur-md"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${activeLevelInfo.color}`} />
              <div className="space-y-3 pl-2">
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${activeLevelInfo.textColor}`}>
                  STUFEN-ANALYSE
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
                  {activeLevelInfo.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {activeLevelInfo.desc}
                </p>
              </div>
            </motion.div>

            {/* Organisms Dynamic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredOrganisms.map((org) => {
                  const isExpanded = expandedCard === org.id;
                  
                  // Organism specific colors for glow card effects
                  const categoryColors = 
                    org.category === 'producer' ? { border: 'group-hover:border-emerald-500/40', accent: 'text-emerald-400', bg: 'bg-emerald-500/5' } :
                    org.category === 'primary_consumer' ? { border: 'group-hover:border-amber-500/40', accent: 'text-amber-400', bg: 'bg-amber-500/5' } :
                    org.category === 'secondary_consumer' ? { border: 'group-hover:border-rose-500/40', accent: 'text-rose-400', bg: 'bg-rose-500/5' } :
                    { border: 'group-hover:border-purple-500/40', accent: 'text-purple-400', bg: 'bg-purple-500/5' };

                  // Is this organism active under the current simulated lighting?
                  const isNocturnalActive = org.nightActive;
                  const isCurrentlyDimmed = activeNightState && !isNocturnalActive;
                  const isCurrentlyGlowing = activeNightState && isNocturnalActive;

                  return (
                    <motion.div
                      key={org.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: isCurrentlyDimmed ? 0.45 : 1, 
                        scale: 1,
                        transition: { duration: 0.3 }
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => {
                        setExpandedCard(isExpanded ? null : org.id);
                        if (desertAudio) {
                          try {
                            desertAudio.playClick();
                          } catch (e) {}
                        }
                      }}
                      className={`group cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                        isExpanded 
                          ? 'md:col-span-2 shadow-2xl scale-[1.01] bg-slate-950 border-orange-500/30' 
                          : `bg-slate-900/40 border-white/5 hover:bg-slate-900/60 ${categoryColors.border} hover:-translate-y-1`
                      } ${isCurrentlyGlowing ? 'ring-2 ring-indigo-500/40 bg-indigo-950/10' : ''}`}
                    >
                      {/* Top banner accent for expanded state */}
                      {isExpanded && (
                        <div className={`h-1.5 w-full bg-gradient-to-r ${activeLevelInfo.color}`} />
                      )}

                      {/* Card Content Header */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-xl bg-slate-950/80 border border-white/5 group-hover:scale-110 transition-transform">
                              {getTrophicIcon(org.category)}
                            </span>
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 block">
                                {org.category === 'producer' && 'PRIMÄRPRODUZENT'}
                                {org.category === 'primary_consumer' && 'PFLANZENFRESSER'}
                                {org.category === 'secondary_consumer' && 'FLEISCHFRESSER'}
                                {org.category === 'decomposer' && 'DESTRUENT'}
                              </span>
                              <h4 className="text-base font-black uppercase tracking-wide text-white font-sans mt-0.5">
                                {org.name}
                              </h4>
                            </div>
                          </div>

                          {/* Sun/Moon Active state badge */}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 shrink-0 ${
                            org.nightActive 
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {org.nightActive ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />}
                            <span>{org.nightActive ? 'NACHTAKTIV' : 'TAGAKTIV'}</span>
                          </span>
                        </div>

                        {/* Scientific Classification & Short Desc */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono italic opacity-60 text-slate-400 block">
                            {org.scientificName}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {org.description}
                          </p>
                        </div>

                        {/* Interactive Hint */}
                        {!isExpanded && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-orange-400 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>DETAILS EINBLENDEN</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>

                      {/* Expandable Panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5 bg-slate-950/80 p-6 space-y-6"
                          >
                            {/* Grid details inside expansion */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs md:text-sm">
                              
                              {/* Left Column: Diet */}
                              <div className="md:col-span-4 space-y-3">
                                {org.diet ? (
                                  <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5 space-y-2">
                                    <span className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                                      Ernährung / Nahrung:
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed italic">
                                      {org.diet}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5 space-y-2">
                                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                                      Energiequelle:
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed italic">
                                      Gewinnt Energie direkt durch Sonnenlicht (Photosynthese).
                                    </p>
                                  </div>
                                )}

                                {/* Simulated Active State in current environment */}
                                <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5 space-y-1">
                                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                                    Verhalten im Simulator:
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed">
                                    {isCurrentlyDimmed 
                                      ? 'Inaktiv (schläft in geschützten Verstecken vor Kälte)' 
                                      : isCurrentlyGlowing 
                                      ? 'Hochaktiv (nutzt kühle Nachttemperaturen zur Jagd/Suche)' 
                                      : 'Regulärer Aktivitätszyklus (sucht Schutz vor Extremtemperaturen)'}
                                  </p>
                                </div>
                              </div>

                              {/* Right Column: Adaptations list */}
                              <div className="md:col-span-8 space-y-3">
                                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                                  Evolutionäre Anpassungsstrategien:
                                </span>
                                
                                <ul className="space-y-3">
                                  {org.adaptations.map((adapt, i) => (
                                    <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/20 border border-white/5">
                                      <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                      </span>
                                      <span className="text-xs text-slate-300 leading-relaxed font-sans">
                                        {adapt}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                            </div>

                            <div className="flex justify-end pt-2 border-t border-white/5">
                              <button 
                                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono font-bold hover:bg-slate-850 border border-white/5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCard(null);
                                }}
                              >
                                SCHLIESSEN
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
