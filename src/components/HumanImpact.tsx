import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Trash2, Sprout, TrendingDown, Compass, CheckCircle2, AlertTriangle, Droplet } from 'lucide-react';

interface HumanImpactProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function HumanImpact({ isNight, isPresentationMode }: HumanImpactProps) {
  const [oasisState, setOasisState] = useState<'healthy' | 'damaged'>('healthy');

  const humanInterventions = [
    { title: 'Überweidung', text: 'Zu große Schaf- und Ziegenherden fressen die spärliche Pflanzendecke komplett kahl. Der schutzlose Boden trocknet aus und erodiert.' },
    { title: 'Übermäßige Wasserentnahme', text: 'Durch Tiefbohrungen wird uraltes fossiles Grundwasser für Tourismus und Landwirtschaft hochgepumpt, wodurch Quellen versiegen.' },
    { title: 'Tourismus & Straßenbau', text: 'Quad-Fahrten zerstören den empfindlichen Wüstenlack der Böden; Trassen zerschneiden Wanderrouten von Gazellen.' },
    { title: 'Desertifikation', text: 'Durch Abholzung und Bodenzerstörung breitet sich die Wüste unumkehrbar in fruchtbare Halbwüsten (Sahelzone) aus.' }
  ];

  const ecologicalConsequences = [
    { title: 'Biodiversitätsverlust', text: 'Stark spezialisierte Tier- und Pflanzenarten sterben lokal aus, weil ihre engen Nischen unwiederbringlich zerstört werden.' },
    { title: 'Erosion & Nährstoffarmut', text: 'Wind trägt den fruchtbaren Oberboden ab. Die Remineralisierung bricht zusammen, da auch die Destruenten schwinden.' },
    { title: 'Nahrungsnetz-Kollaps', text: 'Fallen Produzenten weg, verhungern Herbivoren (Dromedare/Gazellen). Das entzieht Sekundärkonsumenten die Basis.' },
    { title: 'Grundwasser-Absenkung', text: 'Oasen trocknen biologisch aus. Der Salzgehalt im Restwasser steigt mörderisch an und vergiftet Nutzpflanzen.' }
  ];

  const sustainabilitySolutions = [
    { title: 'Schutz von Oasengewässern', text: 'Strenge Quoten für die Wasserentnahme und der Verzicht auf wasserintensive Monokulturen.' },
    { title: 'Nachhaltige Weidewirtschaft', text: 'Rotierende Weidesysteme geben der mageren Vegetation genug Zeit, sich nach dem Verbiss zu regenerieren.' },
    { title: 'Tröpfchenbewässerung', text: 'Mikro-Bewässerung direkt an den Pflanzenwurzeln minimiert ungenutzte Verdunstungsverluste.' },
    { title: 'Renaturierung & Grüner Wall', text: 'Pflanzung von tiefwurzelnden Pionierbäumen (wie Wüstenakazien) an den Wüstenrändern stoppt die Desertifikation.' }
  ];

  return (
    <section 
      id="mensch-und-wueste" 
      className={`py-20 px-4 md:px-8 transition-colors duration-1000 ${
        isNight ? 'bg-slate-900 text-slate-100' : 'bg-amber-50/40 text-sand-950'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-red-100 text-red-800">
            Anthropogener Einfluss
          </div>
          <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight uppercase ${
            isNight ? 'text-white' : 'text-sand-900'
          }`}>
            7. Der Mensch verändert die Wüste
          </h2>
          <div className="h-1.5 w-24 bg-red-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base opacity-75 max-w-2xl mx-auto">
            Ökologisches Gleichgewicht am Abgrund. Untersuche die fatalen Folgen menschlicher Eingriffe und wegbereitende Lösungsstrategien.
          </p>
        </div>

        {/* Visual Before/After Sandbox comparison */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-2xl transition-all duration-500 ${
          isNight ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200 shadow-lg'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Simulation Controls & Explanation */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                OASEN-SIMULATION
              </span>
              <h3 className={`font-display text-2xl font-bold ${
                isNight ? 'text-white' : 'text-sand-900'
              }`}>
                Ökosystem-Vergleich: <br />
                {oasisState === 'healthy' ? (
                  <span className="text-emerald-500">Naturbelassenes Gleichgewicht</span>
                ) : (
                  <span className="text-red-500">Anthropogene Übernutzung</span>
                )}
              </h3>
              
              <p className={`text-sm leading-relaxed opacity-85 ${
                isPresentationMode ? 'font-medium' : ''
              }`}>
                {oasisState === 'healthy' 
                  ? 'Im naturbelassenen Zustand bildet die Oase eine üppige Lebensader. Das Zusammenspiel aus reiner Wasserquelle, reichhaltiger Krautflora und schattenspenden Dattelpalmen bietet Hunderten Insekten-, Vogel- und Säugetierarten eine Zuflucht. Die Biodiversität ist auf dem Höchststand.'
                  : 'Durch exzessive Überweidung und unkontrolliertes Grundwasser-Pumpen bricht das fragile Netz zusammen. Der Wasserpegel sinkt drastisch, Palmen verdorren, Krautdecken weichen nacktem Wüstenlack. Plastikmüll und Schutt belasten den Raum. Die Arten wandern ab oder sterben.'
                }
              </p>

              {/* State Buttons */}
              <div className="flex gap-3">
                <button
                  id="btn-oasis-healthy"
                  onClick={() => setOasisState('healthy')}
                  className={`flex-1 py-3 px-4 rounded-xl font-display text-xs font-bold tracking-wide uppercase transition-all duration-300 border flex items-center justify-center gap-2 ${
                    oasisState === 'healthy'
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20 scale-102'
                      : isNight
                        ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-amber-50 border-amber-200 text-sand-800 hover:border-amber-300'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>1. Gesunde Oase</span>
                </button>
                <button
                  id="btn-oasis-damaged"
                  onClick={() => setOasisState('damaged')}
                  className={`flex-1 py-3 px-4 rounded-xl font-display text-xs font-bold tracking-wide uppercase transition-all duration-300 border flex items-center justify-center gap-2 ${
                    oasisState === 'damaged'
                      ? 'bg-red-500 border-red-400 text-white shadow-md shadow-red-500/20 scale-102'
                      : isNight
                        ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-amber-50 border-amber-200 text-sand-800 hover:border-amber-300'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>2. Übernutzte Oase</span>
                </button>
              </div>

              {/* General terms: Biodiversität & Neobiota */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                isNight ? 'bg-slate-900/60 border-slate-800' : 'bg-red-50/50 border-red-100'
              }`}>
                <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wide text-orange-600 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Fachinfo: Biodiversität & Neobiota</span>
                </div>
                <p>
                  <strong>Biodiversität (Biologische Vielfalt)</strong> ist in der Wüste extrem empfindlich. Da Arten stark spezialisiert sind, führt der Verlust eines einzigen Partners (z.B. der Akazie) oft zu Kettenreaktionen.
                </p>
                <p>
                  <strong>Neobiota (eingeschleppte Arten)</strong> verschärfen die Krise: Fremde, vom Menschen eingebrachte Pflanzenarten entziehen heimischen Gewächsen die letzte Bodenfeuchte und zerstören so das historische Nahrungsnetz.
                </p>
              </div>

            </div>

            {/* Simulated Visual Art Frame */}
            <div className="lg:col-span-7">
              <div className={`relative aspect-video rounded-2xl overflow-hidden border transition-all duration-1000 flex items-center justify-center ${
                oasisState === 'healthy'
                  ? 'bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                  : 'bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 border-red-950/40 shadow-lg shadow-red-500/5'
              }`}>
                {/* Beautiful cross-fading video elements representing oasis state */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      oasisState === 'healthy' ? 'opacity-40' : 'opacity-0'
                    }`}
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-camels-walking-in-the-desert-41567-large.mp4" type="video/mp4" />
                  </video>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      oasisState === 'damaged' ? 'opacity-35' : 'opacity-0'
                    }`}
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-on-desert-sand-41568-large.mp4" type="video/mp4" />
                  </video>
                  {/* Subtle color overlay */}
                  <div className={`absolute inset-0 transition-colors duration-1000 ${
                    oasisState === 'healthy' ? 'bg-emerald-950/30' : 'bg-stone-950/45'
                  }`} />
                </div>

                {/* Simulated landscape helper */}
                <div className="absolute inset-0 opacity-40 pointer-events-none z-10">
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 rounded-full filter blur-xl transition-all duration-1000 ${
                    oasisState === 'healthy' ? 'bg-teal-400/20' : 'bg-amber-900/10'
                  }`} />
                </div>

                <div className="relative z-20 text-center px-4 space-y-4">
                  {oasisState === 'healthy' ? (
                    <motion.div
                      key="healthy-vis"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3"
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
                        <Droplet className="w-8 h-8" />
                      </div>
                      <h4 className="font-display font-bold text-xl md:text-2xl text-emerald-300">Biologischer Reichtum</h4>
                      <p className="text-xs md:text-sm text-emerald-100/80 max-w-md mx-auto">
                        • Reines Quellwasser vorhanden • Dichte Dattelpalmenkrone schützt vor Verdunstung • Volles Tieraufkommen • Nährstoffkreislauf im Gleichgewicht
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="damaged-vis"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3"
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                        <TrendingDown className="w-8 h-8 animate-pulse" />
                      </div>
                      <h4 className="font-display font-bold text-xl md:text-2xl text-red-400">Verdörrung & Erosion</h4>
                      <p className="text-xs md:text-sm text-red-200/80 max-w-md mx-auto">
                        • Grundwasserspiegel abgesenkt • Bodenoberfläche ausgetrocknet und rissig • Plastikmüll und Straßenlärm verdrängen Tiere • Verlust der Biozönose
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Simulated cracks lines or grass patches depending on state */}
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40 z-20">
                  SIMULATION: {oasisState === 'healthy' ? 'OASE_AKTIV_OK_98%' : 'WARNUNG_OASE_COLLAPSE_12%'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Breakdown tables: Eingriffe vs Folgen vs Lösungen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Eingriffe */}
          <div className={`p-6 rounded-2xl border ${
            isNight ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
              <h4 className={`font-display font-bold ${isPresentationMode ? 'text-lg' : 'text-sm'} uppercase tracking-wide`}>
                Menschliche Eingriffe
              </h4>
            </div>
            <ul className="space-y-3">
              {humanInterventions.map((item, idx) => (
                <li key={idx} className="space-y-0.5">
                  <span className="text-xs font-bold text-red-500 font-mono block">• {item.title}</span>
                  <p className="text-xs opacity-80 leading-relaxed pl-3">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Folgen */}
          <div className={`p-6 rounded-2xl border ${
            isNight ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-orange-500 shrink-0" />
              <h4 className={`font-display font-bold ${isPresentationMode ? 'text-lg' : 'text-sm'} uppercase tracking-wide`}>
                Ökologische Folgen
              </h4>
            </div>
            <ul className="space-y-3">
              {ecologicalConsequences.map((item, idx) => (
                <li key={idx} className="space-y-0.5">
                  <span className="text-xs font-bold text-orange-500 font-mono block">• {item.title}</span>
                  <p className="text-xs opacity-80 leading-relaxed pl-3">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Lösungen (Nachhaltigkeit) */}
          <div className={`p-6 rounded-2xl border ${
            isNight ? 'bg-slate-950/60 border-slate-850' : 'bg-emerald-50/20 border-emerald-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-5 h-5 text-emerald-500 shrink-0" />
              <h4 className={`font-display font-bold ${isPresentationMode ? 'text-lg' : 'text-sm'} uppercase tracking-wide text-emerald-600`}>
                Nachhaltige Lösungen
              </h4>
            </div>
            <ul className="space-y-3">
              {sustainabilitySolutions.map((item, idx) => (
                <li key={idx} className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-600 font-mono block">• {item.title}</span>
                  <p className="text-xs opacity-80 leading-relaxed pl-3">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
