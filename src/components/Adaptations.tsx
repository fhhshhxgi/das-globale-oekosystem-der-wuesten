import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Clock, ShieldCheck, HelpCircle, Flame, Moon, Compass } from 'lucide-react';
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
        explanation: 'Falsch! Auf dem offenen, brennenden Sandboden verlierst du innerhalb von Minuten extrem viel Körperwasser durch Schwitzen und Hecheln. Die Hitze führt unweigerlich zum Hitzschlag und Tod. Dies ist das Gegenteil einer überlebenssichernden Anpassung.'
      },
      {
        label: 'B',
        text: 'Dich tief in deine kühle Erdhöhle zurückziehen, dösen und erst nach Sonnenuntergang jagen gehen.',
        isCorrect: true,
        explanation: 'Richtig! Das ist eine hochwirksame verhaltensbezogene Anpassung. In deinem tiefen Bau liegt die Temperatur bei konstanten, angenehmen 25 °C. Durch die Deaktivierung deines Körpers sparst du wertvolles Wasser, schützt deine Fußsohlen und gehst der mörderischen Strahlung komplett aus dem Weg.'
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
      className={`py-20 px-4 md:px-8 transition-colors duration-1000 ${
        isNight ? 'bg-slate-950 text-slate-100' : 'bg-amber-100/10 text-sand-950'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-yellow-100 text-yellow-800">
            Evolution & Anpassung
          </div>
          <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight uppercase ${
            isNight ? 'text-white' : 'text-sand-900'
          }`}>
            6. Wie überlebt man in der Wüste?
          </h2>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base opacity-75 max-w-2xl mx-auto">
            Härte erzeugt Perfektion. Lerne die drei grundlegenden Kategorien biologischer Anpassungen kennen: Morphologisch, Physiologisch und Verhaltensbedingt.
          </p>
        </div>

        {/* Adaptations Tabs & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs - col span 7 */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Horizontal Tabs selector */}
            <div className="flex border-b border-amber-500/10 gap-2 pb-1 overflow-x-auto">
              {[
                { id: 'morph', label: 'Morphologische Anpassungen', desc: 'Körperbau', icon: <Sparkles className="w-4 h-4" /> },
                { id: 'phys', label: 'Physiologische Anpassungen', desc: 'Stoffwechsel', icon: <Brain className="w-4 h-4" /> },
                { id: 'behav', label: 'Verhaltensbezogene Anpassungen', desc: 'Verhalten', icon: <Clock className="w-4 h-4" /> }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-display text-sm font-semibold transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'border-yellow-500 text-yellow-600 font-bold scale-[1.01]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {tab.icon}
                    <div>
                      <div>{tab.label}</div>
                      <span className="text-[9px] font-mono opacity-50 block text-left font-normal">{tab.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* List entries */}
            <div className="relative min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {(activeTab === 'morph' ? morphological : activeTab === 'phys' ? physiological : behavioral).map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border flex gap-3.5 items-start ${
                        isNight 
                          ? 'bg-slate-900/60 border-slate-800' 
                          : 'bg-white border-amber-200 shadow-xs'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        isNight ? 'bg-slate-950 text-yellow-500' : 'bg-amber-50 text-orange-600'
                      }`}>
                        <ShieldCheck className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className={`font-display font-bold text-sm md:text-base ${
                          isNight ? 'text-white' : 'text-sand-900'
                        }`}>
                          {item.label}
                        </h4>
                        <p className={`text-xs md:text-sm mt-1 opacity-80 leading-relaxed ${
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

          {/* Interactive Challenge - col span 5 */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-3xl border shadow-xl ${
              isNight ? 'bg-slate-950 border-slate-800' : 'bg-white border-amber-300/80 shadow-md'
            }`}>
              
              {/* Challenge Header */}
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                  SURVIVAL-CHALLENGE
                </span>
              </div>

              <h3 className={`font-display text-xl font-bold mb-1 ${
                isNight ? 'text-white' : 'text-sand-900'
              }`}>
                Überlebenstest in Echtzeit
              </h3>
              <span className="inline-block text-[10px] font-mono font-semibold text-orange-600 uppercase mb-4">
                {challenge.role}
              </span>

              {/* Scenario */}
              <p className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed mb-6 italic ${
                isNight ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-red-50/50 border-red-100 text-sand-800'
              }`}>
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
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20 scale-[1.01]'
                            : 'bg-red-500 text-white border-red-400 shadow-md scale-[1.01]'
                          : isNight
                            ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                            : 'bg-amber-50/50 border-amber-200 hover:border-amber-300 text-sand-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : isNight 
                            ? 'bg-slate-950 text-sky-400' 
                            : 'bg-white text-sand-800 border border-amber-300'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Response Feedback info */}
              <AnimatePresence>
                {selectedChallengeOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                      challenge.options.find(o => o.label === selectedChallengeOption)?.isCorrect
                        ? isNight 
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-950'
                        : isNight 
                          ? 'bg-red-950/40 border-red-900 text-red-300' 
                          : 'bg-red-50 border-red-100 text-red-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1.5">
                      {challenge.options.find(o => o.label === selectedChallengeOption)?.isCorrect ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>MESSUNG ERFOLGREICH / ÜBERLEBT!</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-4 h-4 text-red-500 animate-spin" />
                          <span>KRITISCHES VERSAGEN / DU BIST VERDURSTET!</span>
                        </>
                      )}
                    </div>
                    <p>{challenge.options.find(o => o.label === selectedChallengeOption)?.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
