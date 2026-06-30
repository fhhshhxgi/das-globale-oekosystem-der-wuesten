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
              console.warn("Conclusion video autoplay blocked:", err);
            });
          }}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isNight ? 'opacity-25' : 'opacity-15'
          } filter saturate-75`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-over-a-desert-41569-large.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          isNight 
            ? 'bg-gradient-to-b from-[#020617] via-transparent to-[#020617]' 
            : 'bg-gradient-to-b from-[#080705] via-[#080705]/80 to-[#080705]'
        }`} />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Zusammenfassung
          </div>
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight uppercase text-white">
            9. Abschluss & Fazit
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
        </div>

        {/* Master Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 rounded-3xl border border-white/5 bg-slate-900/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Subtle backgrounds */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Quotes symbol */}
            <div className="text-5xl md:text-6xl font-serif text-amber-500 opacity-45 leading-none select-none text-center">
              „
            </div>

            {/* Core text requested */}
            <p className={`text-base md:text-xl font-sans italic leading-relaxed text-center text-slate-200 ${
              isPresentationMode ? 'text-2xl font-medium leading-loose' : ''
            }`}>
              Die Wüste wirkt auf den ersten Blick leer, ist aber ein komplexes Ökosystem. Biotop und Biozönose stehen in enger Wechselwirkung. Extreme abiotische Faktoren wie Hitze, Trockenheit und starke Sonneneinstrahlung bestimmen, welche Lebewesen dort überleben können. Pflanzen, Tiere und Destruenten sind über Nahrungsnetze verbunden. Viele Arten besitzen besondere Anpassungen. Eingriffe des Menschen können das empfindliche Gleichgewicht der Wüste stark verändern.
            </p>

            <div className="text-right text-5xl md:text-6xl font-serif text-amber-500 opacity-45 leading-none select-none translate-y-2 text-center">
              “
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent my-6" />

            {/* Core takeaways bullet highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 space-y-2 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-white">System-Einheit</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Biotop und Biozönose stehen in ununterbrochenem stofflichen und energetischen Austausch.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 space-y-2 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-white">Evolution</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extremer Selektionsdruck führt zur Ausbildung spezifischer biologischer Schutzstrategien und Anpassungen.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 space-y-2 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-white">Verantwortung</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Der sensible Wasserhaushalt der Wüste erfordert strengen, vorausschauenden Schutz.
                </p>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
