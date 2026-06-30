import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Clock, ShieldCheck, HelpCircle, Flame, Moon, Compass, AlertTriangle } from 'lucide-react';
import { SurvivalChallenge } from '../types';

interface AdaptationsProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function Adaptations({ isNight, isPresentationMode }: AdaptationsProps) {
  const [activeTab, setActiveTab] = useState<'morph' | 'phys' | 'behav'>('morph');
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<string | null>(null);

  const morphological = [
    { label: 'Fennek-Kühlohren', text: 'Die enorm großen, gut durchbluteten Ohren des Fenneks geben überschüssige Körperwärme effizient ab.' },
    { label: 'Lichtreflexion', text: 'Helle Fell- oder Federfarben reflektieren die sengenden Sonnenstrahlen und schützen vor Überhitzung.' },
    { label: 'Dornen statt Blätter', text: 'Wüstenpflanzen wandeln Blätter zu Dornen um. Das minimiert die Blattoberfläche und schützt vor Transpiration.' },
    { label: 'Pfahlwurzelsysteme', text: 'Akazien und Wüstensträucher bilden meterfeste Pfahlwurzeln aus, die tiefste Grundwasserleiter anzapfen.' },
    { label: 'Wasserspeichergewebe', text: 'Kakteengewächse besitzen stark ausgebildete elastische Stamm- oder Blattsukkulenz zur Wasservorratsbildung.' }
  ];

  const physiological = [
    { label: 'Dromedar-Trinkkraft', text: 'Kamele können wochenlang hungern und dürsten, Fett im Höcker verbrennen und 150 Liter in Minuten trinken.' },
    { label: 'Supernieren-Leistung', text: 'Nager scheiden extrem konzentrierten Urin und staubtrockenen Kot aus, um keinen Milliliter Feuchtigkeit einzubüßen.' },
    { label: 'CAM-Spaltöffnungen', text: 'Sukkulenten halten Spaltöffnungen am Tag fest verschlossen und binden Kohlendioxid ausschließlich nachts.' },
    { label: 'Schlafsamen-Strategie', text: 'Wüstenkräuter-Samen überdauern Jahre in Trockenstarre und keimen erst bei hinreichendem Regenschauer blitzschnell.' }
  ];

  const behavioral = [
    { label: 'Nachtaktivität', text: 'Viele Wüstenbewohner schlafen am Tag und verlagern Beutesuche, Paarung und Wanderung komplett in die kühle Nacht.' },
    { label: 'Bauen-Mikroklima', text: 'Das Graben von tiefen Tunnelbauten schützt Kleinsäuger vor über 70 °C heißem Wüstensand.' },
    { label: 'Ruhezustand bei Hitze', text: 'Reduzierung jeglicher nicht-lebensnotwendiger Muskelaktivität während der extrem heißen Mittagssonne.' },
    { label: 'Oasen-Wanderungen', text: 'Große Herdentiere wandern instinktiv kilometerweit zu bekannten Salzpfannen und verstreuten Oasen.' }
  ];

  const challenge: SurvivalChallenge = {
    id: 1,
    scenario: 'Du bist ein kleiner Fennek. Es ist exakt 12:00 Uhr mittags. Die Sonne brennt senkrecht vom wolkenlosen Himmel herab, der Sand glüht mit unerträglichen 72 °C. Deine Wasserreserven schwinden rasend schnell. Was tust du, um zu überleben?',
    role: 'Rolle: Fennek (Wüstenfuchs)',
    options: [
      {
        label: 'A',
        text: 'In der prallen Mittagssonne jagen gehen, um saftige Insekten zu erbeuten.',
        isCorrect: false,
        explanation: 'Falsch! Auf dem offenen, erhitzten Sandboden verlierst du innerhalb von Minuten viel Körperwasser. Die extreme Hitze führt zu kritischer Dehydration. Dies gefährdet das Überleben.'
      },
      {
        label: 'B',
        text: 'Dich tief in deine kühle Erdhöhle zurückziehen, dösen und erst nach Sonnenuntergang jagen gehen.',
        isCorrect: true,
        explanation: 'Richtig! Das ist eine wirksame verhaltensbiologische Anpassung. In der unterirdischen Erdhöhle liegt die Temperatur bei konstanten, milden 25 °C. Durch diese Ruhephase sparst du Wasser, schützt deine Extremitäten und weichst der intensiven Sonneneinstrahlung aus.'
      },
      {
        label: 'C',
        text: 'Dich flach auf den Scheitelpunkt einer windigen Düne legen und die Aussicht genießen.',
        isCorrect: false,
        explanation: 'Falsch! Auch wenn der Wind auf der Düne weht, ist die direkte Sonneneinstrahlung dort oben maximal und trocknet dich sofort aus. Zudem bist du schutzlos gegenüber Greifvögeln exponiert, die nach leichter Beute Ausschau halten.'
      }
    ]
  };

  return (
    <section 
      id="anpassungen-überleben" 
      className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors duration-1000 ${
        isNight ? 'bg-[#020617] text-slate-100' : 'bg-[#080705] text-amber-50'
      }`}
    >
      {/* Background Cinematic Desert Video Loop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            video.muted = true;
            video.play().catch((err) => {
              console.warn("Adaptations video autoplay blocked:", err);
            });
          }}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isNight ? 'opacity-15' : 'opacity-20'
          } filter saturate-50`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-desert-dunes-under-a-blue-sky-41566-large.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          isNight 
            ? 'bg-gradient-to-b from-[#020617] via-transparent to-[#020617]' 
            : 'bg-gradient-to-b from-[#080705] via-[#080705]/80 to-[#080705]'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
            Evolution & Anpassung
          </div>
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight uppercase text-white leading-normal py-1">
            6. Wie überlebt man in der Wüste?
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full" />
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Entdecke, wie sich Pflanzen und Tiere durch spezifische evolutionäre Mechanismen an die extremen Hitzebedingungen angepasst haben.
          </p>
        </div>

        {/* Adaptations Tabs & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tabs - col span 7 */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/5">
            
            <div className="space-y-4">
              {/* Horizontal Tabs selector */}
              <div className="flex border-b border-white/5 gap-2 pb-1 overflow-x-auto scrollbar-none">
                {[
                  { id: 'morph', label: 'Morphologie', desc: 'Körperliche Merkmale', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'phys', label: 'Physiologie', desc: 'Innere Funktionen', icon: <Brain className="w-4 h-4" /> },
                  { id: 'behav', label: 'Verhalten', desc: 'Strategisches Handeln', icon: <Clock className="w-4 h-4" /> }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 border-b-2 font-sans text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 text-left ${
                        isActive
                          ? 'border-amber-500 text-amber-400 font-black'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-slate-400'}`}>
                        {tab.icon}
                      </div>
                      <div>
                        <div>{tab.label}</div>
                        <span className="text-[9px] font-mono opacity-50 block font-normal">{tab.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* List entries */}
              <div className="relative min-h-[320px] pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-3.5"
                  >
                    {(activeTab === 'morph' ? morphological : activeTab === 'phys' ? physiological : behavioral).map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-amber-500/20 transition-all duration-300 flex gap-4 items-start group shadow-md"
                      >
                        <div className="p-2 rounded-xl shrink-0 bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-4.5 h-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-sm md:text-base text-white group-hover:text-amber-300 transition-colors">
                            {item.label}
                          </h4>
                          <p className={`text-xs md:text-sm text-slate-300 leading-relaxed ${
                            isPresentationMode ? 'font-medium' : ''
                          }`}>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Interactive Challenge - col span 5 */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
              
              {/* Decorative side pulse */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-2xl pointer-events-none" />

              <div>
                {/* Challenge Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                      LIVE SURVIVAL SIMULATOR
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[9px] font-mono font-bold text-red-400">
                    KRITISCH
                  </div>
                </div>

                <h3 className="font-sans font-black text-xl md:text-2xl text-white mb-1 uppercase tracking-wide">
                  Das Fennek-Experiment
                </h3>
                <span className="inline-block text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-4">
                  Rolle: Wüstenfuchs (Fennek)
                </span>

                {/* Simulated Real-Time Fennek Vital Stats */}
                <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Körpertemp.</span>
                    <span className={`text-sm font-mono font-black ${
                      selectedChallengeOption === 'A' ? 'text-red-500' : selectedChallengeOption === 'B' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {selectedChallengeOption === 'A' ? '42.5 °C ⚠️' : selectedChallengeOption === 'B' ? '37.8 °C' : '41.2 °C'}
                    </span>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        selectedChallengeOption === 'A' ? 'w-full bg-red-500' : selectedChallengeOption === 'B' ? 'w-1/3 bg-emerald-400' : 'w-4/5 bg-amber-400'
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Hydratation</span>
                    <span className={`text-sm font-mono font-black ${
                      selectedChallengeOption === 'A' ? 'text-red-500' : selectedChallengeOption === 'B' ? 'text-emerald-400' : 'text-orange-400'
                    }`}>
                      {selectedChallengeOption === 'A' ? '12% 💧' : selectedChallengeOption === 'B' ? '92%' : '45%'}
                    </span>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        selectedChallengeOption === 'A' ? 'w-[12%] bg-red-500' : selectedChallengeOption === 'B' ? 'w-[92%] bg-emerald-400' : 'w-[45%] bg-orange-400'
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Lichtschutz</span>
                    <span className={`text-sm font-mono font-black ${
                      selectedChallengeOption === 'A' ? 'text-red-500' : selectedChallengeOption === 'B' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {selectedChallengeOption === 'A' ? '0% ☀️' : selectedChallengeOption === 'B' ? '100%' : '20%'}
                    </span>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        selectedChallengeOption === 'A' ? 'w-0' : selectedChallengeOption === 'B' ? 'w-full bg-emerald-400' : 'w-1/5 bg-amber-400'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Scenario */}
                <p className="p-4 rounded-2xl border border-white/5 text-xs md:text-sm leading-relaxed mb-5 italic bg-slate-900/60 text-slate-200">
                  „{challenge.scenario}“
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {challenge.options.map((opt) => {
                    const isSelected = selectedChallengeOption === opt.label;
                    return (
                      <button
                        key={opt.label}
                        id={`challenge-option-${opt.label}`}
                        onClick={() => setSelectedChallengeOption(opt.label)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-sans font-medium transition-all duration-300 flex items-start gap-3.5 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
                              : 'bg-red-600 text-white border-red-500 shadow-lg'
                            : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/10 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/5 text-amber-400'
                        }`}>
                          {opt.label}
                        </span>
                        <span className="flex-1 leading-normal">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Response Feedback info */}
              <div className="mt-5 min-h-[100px]">
                <AnimatePresence mode="wait">
                  {selectedChallengeOption ? (
                    <motion.div
                      key={selectedChallengeOption}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        challenge.options.find(o => o.label === selectedChallengeOption)?.isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                          : 'bg-red-950/30 border-red-500/30 text-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1.5">
                        {challenge.options.find(o => o.label === selectedChallengeOption)?.isCorrect ? (
                          <>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>FENNEK ÜBERLEBT! • 100% OK</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                            <span>KRITISCHER THERMOTOD!</span>
                          </>
                        )}
                      </div>
                      <p>{challenge.options.find(o => o.label === selectedChallengeOption)?.explanation}</p>
                    </motion.div>
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-white/5 rounded-2xl">
                      Wähle eine Option oben, um den Überlebens-Simulator zu aktivieren.
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
