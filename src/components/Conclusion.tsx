import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';

interface ConclusionProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function Conclusion({ isNight, isPresentationMode }: ConclusionProps) {
  return (
    <section 
      id="abschluss-fazit" 
      className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors duration-1000 ${
        isNight ? 'bg-[#030712] text-slate-100' : 'bg-amber-50/20 text-sand-950'
      }`}
    >
      {/* Background Cinematic Desert Video Loop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isNight ? 'opacity-25' : 'opacity-[0.04]'
          } filter saturate-75`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-over-a-desert-41569-large.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          isNight 
            ? 'bg-gradient-to-b from-[#030712] via-transparent to-[#030712]' 
            : 'bg-gradient-to-b from-transparent via-transparent to-transparent'
        }`} />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800">
            Zusammenfassung
          </div>
          <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight uppercase ${
            isNight ? 'text-white' : 'text-sand-900'
          }`}>
            9. Abschluss & Fazit
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
        </div>

        {/* Master Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-8 md:p-12 rounded-3xl border shadow-2xl relative overflow-hidden ${
            isNight 
              ? 'bg-slate-950/80 border-sky-950/40' 
              : 'bg-white border-amber-300/80'
          }`}
        >
          {/* Subtle backgrounds */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Quotes symbol */}
            <div className="text-5xl md:text-6xl font-serif text-orange-500 opacity-40 leading-none select-none">
              „
            </div>

            {/* Core text requested */}
            <p className={`text-base md:text-xl font-sans italic leading-relaxed text-center ${
              isNight ? 'text-slate-200' : 'text-sand-900'
            } ${isPresentationMode ? 'text-2xl font-medium leading-loose' : ''}`}>
              Die Wüste wirkt auf den ersten Blick leer, ist aber ein komplexes Ökosystem. Biotop und Biozönose stehen in enger Wechselwirkung. Extreme abiotische Faktoren wie Hitze, Trockenheit und starke Sonneneinstrahlung bestimmen, welche Lebewesen dort überleben können. Pflanzen, Tiere und Destruenten sind über Nahrungsnetze verbunden. Viele Arten besitzen besondere Anpassungen. Eingriffe des Menschen können das empfindliche Gleichgewicht der Wüste stark verändern.
            </p>

            <div className="text-right text-5xl md:text-6xl font-serif text-orange-500 opacity-40 leading-none select-none translate-y-2">
              “
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent my-4" />

            {/* Core takeaways bullet highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider">Biotop & Biozönose</span>
                </div>
                <p className="text-xs opacity-70 leading-relaxed">
                  Stehen in ununterbrochenem energetischen und stofflichen Austausch.
                </p>
              </div>

              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider">Spezial-Evolution</span>
                </div>
                <p className="text-xs opacity-70 leading-relaxed">
                  Generiert phänomenale Anpassungen wie Kühlohren und CAM-Stoffwechsel.
                </p>
              </div>

              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <HeartHandshake className="w-4 h-4 text-red-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider">Verantwortung</span>
                </div>
                <p className="text-xs opacity-70 leading-relaxed">
                  Nachhaltiger Schutz von Oasengewässern sichert den Fortbestand der Nischen.
                </p>
              </div>

            </div>

          </div>
        </motion.div>

        {/* School reference credits block */}
        <div className="text-center opacity-50 space-y-1 text-xs font-mono">
          <div>Präsentationsunterlage • Biologie Q1-Grundkurs / Leistungskurs</div>
          <div>Thema: Ökologie extremer Lebensräume — Ökosystem Wüste</div>
        </div>

      </div>
    </section>
  );
}
