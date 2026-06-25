import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, AlertTriangle, Play } from 'lucide-react';
import { QuizQuestion } from '../types';

interface InteractiveQuizProps {
  isNight: boolean;
  isPresentationMode: boolean;
}

export default function InteractiveQuiz({ isNight, isPresentationMode }: InteractiveQuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Was ist ein Ökosystem?',
      options: [
        'Biotop und Biozönose zusammen.',
        'Ein anderes Wort für Wüste.',
        'Eine Ansammlung von Kakteen.'
      ],
      correctIndex: 0,
      explanation: 'Ein Ökosystem besteht immer aus der unbelebten Umwelt (Biotop) und der Lebensgemeinschaft aller Lebewesen (Biozönose), die in ständiger Wechselwirkung stehen.'
    },
    {
      id: 2,
      question: 'Was gehört zum Biotop der Wüste?',
      options: [
        'Kamele, Kakteen und Fenneks.',
        'Sand, Hitze, Trockenheit, Licht, Wind und Geröllboden.',
        'Die Gesamtheit aller Raubtiere.'
      ],
      correctIndex: 1,
      explanation: 'Das Biotop bezeichnet ausschließlich den unbelebten Lebensraum mit all seinen abiotischen Umweltfaktoren wie Hitze, Trockenheit und Lichtintensität.'
    },
    {
      id: 3,
      question: 'Was ist die Biozönose?',
      options: [
        'Ein abiotischer Umweltfaktor.',
        'Der Sandboden einer Wanderdüne.',
        'Die Lebensgemeinschaft aller lebenden Organismen.'
      ],
      correctIndex: 2,
      explanation: 'Die Biozönose umfasst die Gesamtheit aller lebenden Organismen (Pflanzen, Tiere, Destruenten) innerhalb eines bestimmten Biotops.'
    },
    {
      id: 4,
      question: 'Ist eine Akazie Produzent, Konsument oder Destruent?',
      options: [
        'Konsument 1. Ordnung.',
        'Produzent.',
        'Destruent.'
      ],
      correctIndex: 1,
      explanation: 'Als grüne Pflanze betreibt die Wüstenakazie Photosynthese, baut anorganische Stoffe in organische Biomasse um und ist somit ein Primärproduzent (Erzeuger).'
    },
    {
      id: 5,
      question: 'Warum sind viele Wüstentiere nachtaktiv?',
      options: [
        'Weil sie der brutalen Tageshitze entgehen und somit Wasser sparen.',
        'Weil sie nachts keine Beutegreifer fürchten müssen.',
        'Weil es nachts künstliche Lichtquellen gibt.'
      ],
      correctIndex: 0,
      explanation: 'Nachtaktivität ist eine hochwirksame verhaltensbezogene Anpassung. Die kühlen Nachttemperaturen reduzieren die Schweiß- und Transpirationsrate gegen Null, was wertvolles Überlebenswasser spart.'
    },
    {
      id: 6,
      question: 'Was ist eine Population?',
      options: [
        'Alle Steine und Felsen in einer Wüstenregion.',
        'Alle Individuen einer bestimmten Art, die im selben Gebiet leben.',
        'Ein Zusammenschluss aller Tierarten in einer Oase.'
      ],
      correctIndex: 1,
      explanation: 'Eine Population umfasst alle Individuen der exakt gleichen biologischen Art, die zur selben Zeit im selben abgrenzbaren Lebensraum leben und sich untereinander fortpflanzen können.'
    },
    {
      id: 7,
      question: 'Nenne eine typische Räuber-Beute-Beziehung in der Wüste.',
      options: [
        'Ein Fennek sucht Beeren an Dornsträuchern.',
        'Eine Hornviper frisst eine Wüstenrennmaus.',
        'Ein Wurzelpilz tauscht Zucker mit einer Akazie.'
      ],
      correctIndex: 1,
      explanation: 'Die Hornviper jagt aktiv die Wüstenrennmaus als Energiequelle (Nahrung). Dies ist eine klassische Räuber-Beute-Wechselwirkung.'
    },
    {
      id: 8,
      question: 'Was machen Destruenten?',
      options: [
        'Sie zersetzen tote organische Stoffe und führen Nährstoffe zurück in den Boden.',
        'Sie fressen grüne Blätter von Wüstenakazien ab.',
        'Sie jagen nachts Echsen auf Sanddünen.'
      ],
      correctIndex: 0,
      explanation: 'Destruenten wie Bakterien, Pilze und Termiten zersetzen totes Gewebe (Detritus, Aas) und remineralisieren es zu anorganischen Nährstoffen, welche von Pflanzen wieder aufgenommen werden.'
    },
    {
      id: 9,
      question: 'Was ist ein Wüsten-Beispiel für Konkurrenz?',
      options: [
        'Eine Zecke saugt Blut am Fennek.',
        'Wüstenrennmäuse und Käfer konkurrieren um Pflanzensamen.',
        'Ein Kamel schläft im Schatten einer Akazie.'
      ],
      correctIndex: 1,
      explanation: 'Wüstenrennmäuse und Schwarzkäfer beanspruchen dieselbe knappe Nahrungsressource (Samen). Es liegt eine zwischenartliche Nahrungskonkurrenz vor.'
    },
    {
      id: 10,
      question: 'Was kann der Mensch in der Wüste negativ beeinflussen?',
      options: [
        'Den empfindlichen Wasserhaushalt, die Biodiversität und die Böden.',
        'Nur die Menge der nachts fallenden Sternschnuppen.',
        'Gar nichts, weil die Wüste ein toter, robuster Raum ist.'
      ],
      correctIndex: 0,
      explanation: 'Durch rücksichtslose Wasserentnahme, Überweidung und Klimaerwärmung zerstört der Mensch die fragile Biodiversität und beschleunigt die Ausbreitung unfruchtbarer Böden (Desertifikation).'
    }
  ];

  const handleOptionSelect = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(optIdx);
    setIsAnswered(true);

    if (optIdx === quizQuestions[currentQuestionIdx].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIdx(null);
    setIsAnswered(false);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getRank = (finalScore: number) => {
    if (finalScore === 10) return '🎓 Biologie-Expeditionsleiter (Q1-Klassengenie)';
    if (finalScore >= 8) return '🐪 Wüsten-Survivalexperte';
    if (finalScore >= 6) return '🦊 Wüsten-Forscher';
    return '🦎 Wüsten-Beobachter';
  };

  const currentQuestion = quizQuestions[currentQuestionIdx];

  return (
    <section 
      id="expeditions-quiz" 
      className={`py-20 px-4 md:px-8 transition-colors duration-1000 ${
        isNight ? 'bg-slate-950 text-slate-100' : 'bg-amber-100/20 text-sand-950'
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-orange-100 text-orange-800">
            Wissens-Überprüfung
          </div>
          <h2 className={`font-display text-3xl md:text-5xl font-bold tracking-tight uppercase ${
            isNight ? 'text-white' : 'text-sand-900'
          }`}>
            8. Das Expeditions-Quiz
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base opacity-75">
            Teste dein Wissen über das Ökosystem Wüste. Ideal, um Mitschüler aktiv in den Vortrag einzubinden!
          </p>
        </div>

        {/* Quiz Arena Card */}
        <div className={`p-6 md:p-10 rounded-3xl border shadow-2xl relative ${
          isNight ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-amber-300/80 shadow-lg'
        }`}>
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Question Info Header */}
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-4">
                  <span className="text-xs font-mono opacity-60">
                    FRAGE {currentQuestionIdx + 1} von {quizQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-orange-500 font-bold">
                    Punkte: {score}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h3 className={`font-display font-bold ${
                  isPresentationMode ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                } ${isNight ? 'text-white' : 'text-sand-900'}`}>
                  {currentQuestion.question}
                </h3>

                {/* Options list */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrectOption = idx === currentQuestion.correctIndex;
                    
                    let btnStyle = isNight 
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300' 
                      : 'bg-amber-50/50 border-amber-200 hover:border-amber-300 text-sand-800';

                    if (isAnswered) {
                      if (isCorrectOption) {
                        btnStyle = 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-500 border-red-400 text-white shadow-md';
                      } else {
                        btnStyle = 'opacity-40 cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`quiz-question-${currentQuestionIdx}-option-${idx}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-sans font-medium transition-all duration-300 flex items-start gap-4 ${btnStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                          isSelected || (isAnswered && isCorrectOption)
                            ? 'bg-white/20 text-white'
                            : isNight
                              ? 'bg-slate-900 text-sky-400'
                              : 'bg-white text-sand-800 border border-amber-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{option}</span>
                        
                        {isAnswered && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-white shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Animated explanation block and next button */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-4 pt-4 border-t border-amber-500/10"
                    >
                      <div className={`p-4 rounded-2xl border text-xs md:text-sm leading-relaxed ${
                        selectedOptionIdx === currentQuestion.correctIndex
                          ? isNight 
                            ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300' 
                            : 'bg-emerald-50 border-emerald-100 text-emerald-950'
                          : isNight 
                            ? 'bg-red-950/30 border-red-900/50 text-red-300' 
                            : 'bg-red-50 border-red-100 text-red-950'
                      }`}>
                        <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">
                          Erklärung / Biologischer Hintergrund:
                        </span>
                        <p className="italic">{currentQuestion.explanation}</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          id="quiz-btn-next"
                          onClick={handleNextQuestion}
                          className={`px-6 py-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-105 duration-300 ${
                            isNight 
                              ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20' 
                              : 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20'
                          }`}
                        >
                          {currentQuestionIdx < quizQuestions.length - 1 ? 'Nächste Frage ➔' : 'Quiz beenden 🎉'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ) : (
              // Quiz Finished Screen
              <motion.div
                key="finished-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center animate-bounce">
                  <Award className="w-10 h-10 text-yellow-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-orange-500">
                    Expedition abgeschlossen!
                  </h3>
                  <p className="text-sm opacity-75 max-w-sm mx-auto">
                    Du hast die Wüste erfolgreich durchquert und wichtige ökologische Proben genommen.
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border max-w-md mx-auto space-y-2 ${
                  isNight ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-100'
                }`}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-500 block">
                    DEIN BIOLOGISCHES ERGEBNIS:
                  </span>
                  <div className="text-3xl md:text-4xl font-mono font-bold">
                    {score} / 10 <span className="text-xs font-sans opacity-60">Richtig</span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-500 pt-2 font-display">
                    {getRank(score)}
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    id="quiz-btn-restart"
                    onClick={handleRestartQuiz}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-display font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 ${
                      isNight 
                        ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-sky-400' 
                        : 'bg-white hover:bg-amber-50 border-amber-200 text-sand-800'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Quiz zurücksetzen</span>
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
