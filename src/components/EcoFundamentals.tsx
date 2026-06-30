import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, MapPin, Users, Network, Droplet, ThermometerSun, Sun, Shovel, Wind, Sparkles } from 'lucide-react';
import { desertAudio } from '../utils/audioManager';

interface EcoFundamentalsProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function EcoFundamentals({ isNight }: EcoFundamentalsProps) {
  const [selectedFactor, setSelectedFactor] = useState<string>('water');

  const terms = [
    {
      id: 'ecosystem',
      term: 'Ökosystem',
      icon: <Layers className="w-5 h-5 text-orange-500" />,
      definition: 'Das dynamische Zusammenspiel aus unbelebter Umwelt (Biotop) und Lebensgemeinschaft (Biozönose).',
      desertExample: 'Die Wüste verbindet extreme Hitze und Sand direkt mit angepassten Tieren und Sukkulenten.'
    },
    {
      id: 'biotope',
      term: 'Biotop',
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      definition: 'Der räumlich begrenzte, unbelebte Lebensraum mit all seinen physikalischen und chemischen Faktoren.',
      desertExample: 'Der nährstoffarme Sandboden, die sengende Sonne und der spärliche Niederschlag.'
    },
    {
      id: 'biocenosis',
      term: 'Biozönose',
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      definition: 'Die aktive Lebensgemeinschaft aller lebenden Organismen (Pflanzen, Tiere, Pilze) im selben Biotop.',
      desertExample: 'Das lebendige Geflecht aus Fenneks, Echsen, Kakteen und fleißigen Wüstenkäfern.'
    },
    {
      id: 'population',
      term: 'Population',
      icon: <Network className="w-5 h-5 text-indigo-500" />,
      definition: 'Alle Individuen derselben biologischen Art, die zur gleichen Zeit im selben Wüstengebiet leben.',
      desertExample: 'Die Gesamtheit aller Fenneks in einer bestimmten Sanddüne oder Oase.'
    }
  ];

  const abioticFactors = [
    {
      id: 'water',
      title: 'Wasser',
      icon: <Droplet className="w-5 h-5" />,
      value: '< 250 mm / Jahr',
      intensity: 15, // represent severity
      severityLabel: 'Kritischer Mangel',
      description: 'Der absolut wichtigste limitierende Faktor im gesamten Ökosystem.',
      survivalHack: 'Kakteen speichern Liter in ihren Stämmen; Tiere gewinnen es aus dem Fettabbau.'
    },
    {
      id: 'temp',
      title: 'Temperatur',
      icon: <ThermometerSun className="w-5 h-5" />,
      value: 'Bis zu 50 °C',
      intensity: 95,
      severityLabel: 'Extreme Hitze',
      description: 'Enorme Schwankungen belasten die zelluläre Struktur der Organismen.',
      survivalHack: 'Tiere flüchten tagsüber in kühle unterirdische Bauten und jagen erst nachts.'
    },
    {
      id: 'light',
      title: 'Licht',
      icon: <Sun className="w-5 h-5" />,
      value: 'Ungefiltert & intensiv',
      intensity: 90,
      severityLabel: 'Maximale UV-Strahlung',
      description: 'Sonneneinstrahlung treibt die Verdunstung extrem an.',
      survivalHack: 'Pflanzen besitzen reflektierende Wachsschichten oder Behaarung zum Schutz.'
    },
    {
      id: 'soil',
      title: 'Boden',
      icon: <Shovel className="w-5 h-5" />,
      value: 'Mobil & nährstoffarm',
      intensity: 85,
      severityLabel: 'Sehr mobil',
      description: 'Heißer, lockerer Sand erschwert das Keimen und Anwurzeln.',
      survivalHack: 'Dünen wandern ständig; Wüstenakazien bohren Pfahlwurzeln bis zu 35m tief.'
    },
    {
      id: 'wind',
      title: 'Wind',
      icon: <Wind className="w-5 h-5" />,
      value: 'Mechanischer Stress',
      intensity: 75,
      severityLabel: 'Erosiv',
      description: 'Heiße Sandstürme schleifen lebende Gewebe mechanisch ab.',
      survivalHack: 'Samen keimen bevorzugt im Windschatten von soliden Felsen.'
    }
  ];

  return (
    <section 
      id="ökosystem-grundlagen" 
      className="py-16 px-4 md:px-8 bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center"
    >
      <div className="max-w-6xl w-full space-y-12">
        
        {/* Header section with minimal text */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Kapitel 1
          </span>
          <h2 className="font-sans text-2xl md:text-4xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-normal py-1">
            Ökologische Grundlagen
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto rounded-full" />
          <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Wie Leben unter extremsten Bedingungen funktioniert. Die vier Säulen und die fünf abiotischen Kräfte des Wüstenbiotops kurz und bündig erklärt.
          </p>
        </div>

        {/* Bento Grid: 4 Core Columns (Simplified Terms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {terms.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl border border-slate-900 bg-slate-900/40 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-slate-900/80 text-orange-400 border border-slate-800">
                    {t.icon}
                  </div>
                  <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase">
                    {t.term}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[48px]">
                  {t.definition}
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-900/80 text-[11px] text-orange-400/90 font-medium">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Wüsten-Kontext:</span>
                <span className="italic text-slate-300">{t.desertExample}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Abiotic Biotope Panel (Modern interactive selector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
          
          {/* Left panel: Vertical tab buttons */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-slate-900/20 border border-slate-900">
            <div className="space-y-4">
              <div>
                <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider">
                  Abiotische Faktoren
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Die unbelebten physikalischen Kräfte des Wüstenbiotops.
                </p>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {abioticFactors.map((factor) => {
                  const isSelected = selectedFactor === factor.id;
                  return (
                    <button
                      key={factor.id}
                      onClick={() => {
                        desertAudio.playClick();
                        setSelectedFactor(factor.id);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 lg:w-full ${
                        isSelected
                          ? 'bg-orange-500 text-slate-950 border-orange-400 shadow-lg shadow-orange-500/10'
                          : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                      }`}
                    >
                      {factor.icon}
                      <span>{factor.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-6 border-t border-slate-900 pt-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Interaktive Auswahl</span>
            </div>
          </div>

          {/* Right panel: Active factor detailed card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {abioticFactors.filter(f => f.id === selectedFactor).map((factor) => {
                return (
                  <motion.div
                    key={factor.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="h-full p-5 md:p-6 rounded-2xl border border-slate-900 bg-slate-900/40"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5 items-stretch h-full">
                      {/* Left side: Text details */}
                      <div className="md:col-span-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                          {/* Title and value badge */}
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                {factor.icon}
                              </div>
                              <h4 className="font-sans font-black text-sm md:text-base text-white uppercase tracking-wide">
                                {factor.title}
                              </h4>
                            </div>
                            
                            <div className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-900 text-[9px] font-mono text-orange-400 font-bold whitespace-nowrap">
                              {factor.value}
                            </div>
                          </div>

                          {/* Severity Indicator Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                              <span>Faktor-Intensität</span>
                              <span className="text-orange-400">{factor.severityLabel}</span>
                            </div>
                            <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden p-px border border-slate-900">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${factor.intensity}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="h-full bg-orange-500 rounded-full"
                              />
                            </div>
                          </div>

                          {/* Simplified description */}
                          <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed">
                            {factor.description}
                          </p>
                        </div>

                        {/* High-contrast visual survival strategy box */}
                        <div className="p-3.5 rounded-xl border border-orange-500/10 bg-orange-500/[0.01] space-y-1">
                          <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest block">
                            Überlebens-Strategie:
                          </span>
                          <p className="text-xs font-medium text-slate-200">
                            {factor.survivalHack}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
