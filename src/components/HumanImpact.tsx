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
    { title: 'Grundwasser-Absenkung', text: 'Oasen trocknen biologisch aus. Der Salzgehalt im verbleibenden Wasser steigt stark an und schädigt Nutzpflanzen.' }
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
      className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors duration-1000 ${
        isNight ? 'bg-[#020617] text-slate-100' : 'bg-[#080705] text-amber-50'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-red-500/10 filter blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 filter blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Anthropogener Einfluss
          </div>
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight uppercase text-white">
            7. Der Mensch verändert die Wüste
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 via-orange-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Ökologisches Gleichgewicht am Abgrund. Untersuche die fatalen Folgen menschlicher Eingriffe und die visionären, nachhaltigen Rettungskonzepte.
          </p>
        </div>

        {/* Visual Before/After Sandbox comparison */}
        <div className="p-6 md:p-10 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-md shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Simulation Controls & Explanation */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                ECO-OASIS LABORATORY
              </span>
              <h3 className="font-sans font-black text-2xl md:text-3xl text-white tracking-tight leading-tight uppercase">
                Zustands-Vergleich: <br />
                {oasisState === 'healthy' ? (
                  <span className="text-emerald-400 font-black drop-shadow-[0_2px_10px_rgba(16,185,129,0.2)]">Natürliche Balance</span>
                ) : (
                  <span className="text-red-500 font-black drop-shadow-[0_2px_10px_rgba(239,68,68,0.2)]">Überlastung</span>
                )}
              </h3>
              
              <p className={`text-xs md:text-sm leading-relaxed text-slate-300 ${
                isPresentationMode ? 'font-medium' : ''
              }`}>
                {oasisState === 'healthy' 
                  ? 'Im intakten Zustand fungiert die Oase als wichtiges Feuchtgebiet. Das Zusammenwirken von Wasser, dichter Vegetation und schattenspendenden Baumkronen reguliert das Mikroklima. Die lokale Biodiversität erreicht ein stabiles Maximum.'
                  : 'Exzessive Entnahme fossiler Grundwasservorkommen und Überweidung schädigen das Ökosystem. Der Grundwasserspiegel sinkt ab, der unbewachsene Boden erodiert, und die spezialisierte Flora stirbt ab.'
                }
              </p>

              {/* State Buttons with improved touch targets & visual indicator */}
              <div className="flex gap-4">
                <button
                  id="btn-oasis-healthy"
                  onClick={() => setOasisState('healthy')}
                  className={`flex-1 py-4 px-4 rounded-2xl font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    oasisState === 'healthy'
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>1. Gesund</span>
                </button>
                <button
                  id="btn-oasis-damaged"
                  onClick={() => setOasisState('damaged')}
                  className={`flex-1 py-4 px-4 rounded-2xl font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    oasisState === 'damaged'
                      ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>2. Zerstört</span>
                </button>
              </div>

              {/* General terms: Biodiversität & Neobiota */}
              <div className="p-4 rounded-2xl border border-white/5 bg-black/40 text-xs leading-relaxed space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-widest text-orange-400 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-orange-400" />
                  <span>Fachinfo: Biodiversität & Neobiota</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Biodiversität</strong> ist in der Wüste hochsensibel. Da Arten maximal spezialisiert sind, führt der Ausfall eines Schlüsselakteurs (wie der Akazie) oft zum Dominoeffekt im gesamten Nahrungsnetz.
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Neobiota (Invasive Arten)</strong> verschärfen Krisen, indem sie mühsam kultivierte Biotope besiedeln und das indigene Wassermanagement der Wüste ruinieren.
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
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.muted = true;
                      video.play().catch((err) => {
                        console.warn("Healthy video autoplay blocked:", err);
                      });
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      oasisState === 'healthy' ? 'opacity-40' : 'opacity-0'
                    }`}
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-camels-walking-in-the-desert-41567-large.mp4" type="video/mp4" />
                  </video>
                  <video
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.muted = true;
                      video.play().catch((err) => {
                        console.warn("Damaged video autoplay blocked:", err);
                      });
                    }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Eingriffe */}
          <div className="p-6 md:p-8 rounded-3xl border border-red-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl hover:border-red-500/20 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <ShieldAlert className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-sans font-black text-base md:text-lg uppercase tracking-wider text-white">
                Menschliche Eingriffe
              </h4>
            </div>
            <ul className="space-y-4">
              {humanInterventions.map((item, idx) => (
                <li key={idx} className="space-y-1">
                  <span className="text-xs font-black text-red-400 font-sans tracking-wide block">
                    {item.title}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Folgen */}
          <div className="p-6 md:p-8 rounded-3xl border border-orange-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl hover:border-orange-500/20 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <TrendingDown className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-sans font-black text-base md:text-lg uppercase tracking-wider text-white">
                Ökologische Folgen
              </h4>
            </div>
            <ul className="space-y-4">
              {ecologicalConsequences.map((item, idx) => (
                <li key={idx} className="space-y-1">
                  <span className="text-xs font-black text-orange-400 font-sans tracking-wide block">
                    {item.title}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Lösungen (Nachhaltigkeit) */}
          <div className="p-6 md:p-8 rounded-3xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl hover:border-emerald-500/20 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sprout className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-sans font-black text-base md:text-lg uppercase tracking-wider text-white">
                Nachhaltige Lösungen
              </h4>
            </div>
            <ul className="space-y-4">
              {sustainabilitySolutions.map((item, idx) => (
                <li key={idx} className="space-y-1">
                  <span className="text-xs font-black text-emerald-400 font-sans tracking-wide block">
                    {item.title}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
