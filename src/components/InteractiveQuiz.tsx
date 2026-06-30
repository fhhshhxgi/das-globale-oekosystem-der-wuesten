import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, CheckCircle2, XCircle, Award, RotateCcw, AlertTriangle, Play } from 'lucide-react';
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
        'Weil sie der extremen Tageshitze entgehen und somit Wasser sparen.',
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
      className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors duration-1000 ${
        isNight ? 'bg-[#020617] text-slate-100' : 'bg-[#080705] text-amber-50'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 filter blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <HelpCircle className="w-3.5 h-3.5 text-orange-400 animate-spin" />
            Wissens-Überprüfung
          </div>
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tight uppercase text-white">
            8. Das Expeditions-Quiz
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full" />
          <p className="text-sm md:text-base text-slate-300">
            Teste dein Wissen über das Ökosystem Wüste.
          </p>
        </div>

        {/* Quiz Arena Card */}
        <div className="p-6 md:p-10 rounded-3xl border border-white/5 bg-slate-900/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
          
          {/* Futuristic grid mesh background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                {/* Question Info Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    FRAGE {currentQuestionIdx + 1} von {quizQuestions.length}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-400 font-bold">
                    Score: {score} / {quizQuestions.length}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h3 className={`font-sans font-black ${
                  isPresentationMode ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                } text-white tracking-tight leading-relaxed`}>
                  {currentQuestion.question}
                </h3>

                {/* Options list */}
                <div className="space-y-3.5">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrectOption = idx === currentQuestion.correctIndex;
                    
                    let btnStyle = 'bg-white/[0.02] border-white/5 hover:bg-white/[0.08] hover:border-white/10 text-slate-300';

                    if (isAnswered) {
                      if (isCorrectOption) {
                        btnStyle = 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-600 border-red-500 text-white shadow-lg';
                      } else {
                        btnStyle = 'opacity-30 cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`quiz-question-${currentQuestionIdx}-option-${idx}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-sans font-bold transition-all duration-300 flex items-start gap-4 cursor-pointer active:scale-95 ${btnStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                          isSelected || (isAnswered && isCorrectOption)
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-orange-400'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-normal">{option}</span>
                        
                        {isAnswered && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0 animate-bounce" />
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
                      className="space-y-4 pt-4 border-t border-white/5"
                    >
                      <div className={`p-4 rounded-2xl border text-xs md:text-sm leading-relaxed ${
                        selectedOptionIdx === currentQuestion.correctIndex
                          ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300' 
                          : 'bg-red-950/30 border-red-500/20 text-red-300'
                      }`}>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 block mb-1">
                          Erklärung / Biologischer Hintergrund:
                        </span>
                        <p className="italic">{currentQuestion.explanation}</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          id="quiz-btn-next"
                          onClick={handleNextQuestion}
                          className="px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-sans font-black text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95 duration-300 cursor-pointer shadow-orange-500/20"
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
                className="text-center space-y-8 py-6 relative z-10"
              >
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 border border-yellow-400/40 flex items-center justify-center animate-pulse shadow-xl shadow-yellow-500/15">
                  <Award className="w-12 h-12 text-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-black text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-wide">
                    Expedition abgeschlossen!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Du hast die Wüste erfolgreich durchquert, ökologische Daten analysiert und dein biologisches Wissen bewiesen!
                  </p>
                </div>

                <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-black/40 max-w-md mx-auto space-y-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 block">
                    DEINE EXPEDITIONS-WERTUNG:
                  </span>
                  <div className="text-4xl md:text-5xl font-mono font-black text-white">
                    {score} <span className="text-xl text-slate-400 font-sans font-normal">/ {quizQuestions.length}</span>
                  </div>
                  
                  {/* Score representation bar */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
                      style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  <div className="text-sm font-black text-emerald-400 pt-1 tracking-wide font-sans uppercase">
                    {getRank(score)}
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    id="quiz-btn-restart"
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-200 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-orange-400" />
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
