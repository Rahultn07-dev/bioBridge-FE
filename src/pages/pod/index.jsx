import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const questions = [
  {
    id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction', difficulty: 'medium',
    tags: ['lenzs-law', 'faradays-law'],
    text: 'At what position of the coil with respect to the magnetic field is the induced EMF maximum?',
    options: [
      { id: 'A', text: 'When coil is perpendicular to B' },
      { id: 'B', text: 'When coil is parallel to B' },
      { id: 'C', text: 'When coil makes 45° with B' },
      { id: 'D', text: 'EMF is always constant' },
    ],
    correctAnswer: 'B',
    explanation: 'EMF = −dΦ/dt. Rate of change of flux is maximum when the coil is parallel to B (θ = 90°), since Φ = BA cosθ and d(cosθ)/dt is maximum at θ = 90°.',
  },
  {
    id: 2, subject: 'Biology', chapter: 'Human Physiology', difficulty: 'easy',
    tags: ['circulatory-system', 'heart'],
    text: 'Which of the following is the correct path of blood flow in the human circulatory system?',
    options: [
      { id: 'A', text: 'Right atrium → Right ventricle → Lungs → Left atrium' },
      { id: 'B', text: 'Left atrium → Right ventricle → Lungs → Left ventricle' },
      { id: 'C', text: 'Right ventricle → Left atrium → Lungs → Right atrium' },
      { id: 'D', text: 'Left ventricle → Right atrium → Lungs → Left ventricle' },
    ],
    correctAnswer: 'A',
    explanation: 'Deoxygenated blood from body → Right atrium → Right ventricle → Pulmonary artery → Lungs (oxygenation) → Pulmonary vein → Left atrium → Left ventricle → Aorta → Body.',
  },
  {
    id: 3, subject: 'Chemistry', chapter: 'Organic Chemistry', difficulty: 'hard',
    tags: ['sn2-reaction', 'nucleophilic-substitution'],
    text: 'Which compound undergoes SN2 reaction most readily?',
    options: [
      { id: 'A', text: '(CH₃)₃C–Br' },
      { id: 'B', text: '(CH₃)₂CH–Br' },
      { id: 'C', text: 'CH₃CH₂–Br' },
      { id: 'D', text: 'CH₃–Br' },
    ],
    correctAnswer: 'D',
    explanation: 'SN2 reactions proceed best with primary substrates due to minimal steric hindrance. CH₃–Br (methyl bromide) has no alkyl groups blocking the backside attack, making it the most reactive.',
  },
  {
    id: 4, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'medium',
    tags: ['photoelectric-effect', 'work-function'],
    text: 'In the photoelectric effect, increasing the intensity of light (keeping frequency constant) will:',
    options: [
      { id: 'A', text: 'Increase the kinetic energy of photoelectrons' },
      { id: 'B', text: 'Increase the number of photoelectrons emitted' },
      { id: 'C', text: 'Increase the stopping potential' },
      { id: 'D', text: 'Decrease the threshold frequency' },
    ],
    correctAnswer: 'B',
    explanation: 'Intensity represents the number of photons per second. More photons → more electrons ejected per second. KE depends only on frequency (KE = hf − φ), not intensity.',
  },
  {
    id: 5, subject: 'Biology', chapter: 'Genetics', difficulty: 'medium',
    tags: ['mendelian-genetics', 'dihybrid-cross'],
    text: 'In a dihybrid cross between AaBb × AaBb, what fraction of offspring will be aabb?',
    options: [
      { id: 'A', text: '1/16' },
      { id: 'B', text: '3/16' },
      { id: 'C', text: '9/16' },
      { id: 'D', text: '1/4' },
    ],
    correctAnswer: 'A',
    explanation: 'P(aa) = 1/4 and P(bb) = 1/4. Since both genes assort independently, P(aabb) = 1/4 × 1/4 = 1/16.',
  },
];

const POD = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState({});
  const [sessionTime, setSessionTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setSelectedAnswer(answers[currentQ]?.answer || null);
    setIsSubmitted(!!answers[currentQ]);
  }, [currentQ]);

  useEffect(() => {
    const t = setInterval(() => setSessionTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const subjectColor = {
    Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Mathematics: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  };

  const diffBadge = { easy: 'text-emerald-400 bg-emerald-500/10', medium: 'text-amber-400 bg-amber-500/10', hard: 'text-rose-400 bg-rose-500/10' };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    const elapsed = Math.round((Date.now() - questionStartTime) / 1000);
    const correct = selectedAnswer === questions[currentQ].correctAnswer;
    setTimeSpent(prev => ({ ...prev, [currentQ]: elapsed }));
    setAnswers(prev => ({ ...prev, [currentQ]: { answer: selectedAnswer, correct, time: elapsed } }));
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
    }
  };

  const q = questions[currentQ];
  const correctCount = Object.values(answers).filter(a => a.correct).length;
  const totalAnswered = Object.keys(answers).length;

  if (completed) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <MainSidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">POD Complete!</h2>
            <p className="text-muted-foreground mb-8">You scored {correctCount}/{questions.length} in {fmt(sessionTime)}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{correctCount}/{questions.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-amber-400">{fmt(sessionTime)}</div>
                <div className="text-xs text-muted-foreground mt-1">Total Time</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">#142</div>
                <div className="text-xs text-muted-foreground mt-1">Batch Rank</div>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-medium mb-2">
                <Icon name="Flame" size={16} />
                <span>13 day streak! Keep it going.</span>
              </div>
              <div className="text-sm text-muted-foreground">You were among the first 15% in your batch to complete today's POD.</div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate('/review')}>
                Review Mistakes
              </Button>
              <Button className="flex-1" onClick={() => navigate('/activity-dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        {/* Top bar */}
        <div className="border-b border-border bg-card/50 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="font-heading font-semibold text-foreground text-sm">Problem of the Day</span>
              <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">Jul 16</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span className="font-mono">{fmt(sessionTime)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon name="Flame" size={14} className="text-orange-400" />
              <span>12 day streak</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5 flex-1">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full transition-all ${
                      answers[i]?.correct ? 'bg-emerald-500' :
                      answers[i] ? 'bg-rose-500' :
                      i === currentQ ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-mono">{currentQ + 1}/{questions.length}</span>
            </div>

            {/* Question navigator pills */}
            <div className="flex gap-2 mb-6">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={`w-9 h-9 rounded-lg text-sm font-bold border transition-all ${
                    answers[i]?.correct ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                    answers[i] ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' :
                    i === currentQ ? 'bg-primary border-primary text-white' :
                    'bg-secondary border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Correct</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />Wrong</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subjectColor[q.subject]}`}>{q.subject}</span>
                  <span className="text-xs text-muted-foreground">{q.chapter}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{timeSpent[currentQ] ? `${timeSpent[currentQ]}s` : 'Timing...'}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-foreground text-base leading-relaxed mb-6">{q.text}</p>

                <div className="space-y-3">
                  {q.options.map(opt => {
                    let cls = 'border-border bg-secondary hover:border-primary/50 cursor-pointer';
                    if (isSubmitted) {
                      if (opt.id === q.correctAnswer) cls = 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
                      else if (opt.id === selectedAnswer && opt.id !== q.correctAnswer) cls = 'border-rose-500 bg-rose-500/10 text-rose-400';
                      else cls = 'border-border bg-secondary opacity-50';
                    } else if (selectedAnswer === opt.id) {
                      cls = 'border-primary bg-primary/10';
                    }
                    return (
                      <button
                        key={opt.id}
                        disabled={isSubmitted}
                        onClick={() => setSelectedAnswer(opt.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${cls}`}
                      >
                        <span className={`w-7 h-7 flex-shrink-0 rounded-lg border flex items-center justify-center text-sm font-bold transition-all ${
                          isSubmitted && opt.id === q.correctAnswer ? 'border-emerald-500 text-emerald-400' :
                          isSubmitted && opt.id === selectedAnswer ? 'border-rose-500 text-rose-400' :
                          selectedAnswer === opt.id ? 'border-primary text-primary' : 'border-current text-muted-foreground'
                        }`}>
                          {isSubmitted && opt.id === q.correctAnswer ? <Icon name="Check" size={14} /> :
                           isSubmitted && opt.id === selectedAnswer && opt.id !== q.correctAnswer ? <Icon name="X" size={14} /> :
                           opt.id}
                        </span>
                        <span className="text-sm">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className={`mt-5 p-4 rounded-xl border ${answers[currentQ]?.correct ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                    <div className={`flex items-center gap-2 font-medium mb-2 ${answers[currentQ]?.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <Icon name={answers[currentQ]?.correct ? 'CheckCircle' : 'XCircle'} size={16} />
                      {answers[currentQ]?.correct ? 'Correct!' : `Wrong. Correct answer: ${q.correctAnswer}`}
                    </div>
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" disabled={currentQ === 0} onClick={() => setCurrentQ(q => q - 1)} iconName="ArrowLeft" iconPosition="left">
                Previous
              </Button>
              {!isSubmitted ? (
                <Button onClick={submitAnswer} disabled={!selectedAnswer} iconName="Check" iconPosition="right">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} iconName={currentQ === questions.length - 1 ? 'Flag' : 'ArrowRight'} iconPosition="right">
                  {currentQ === questions.length - 1 ? 'Finish POD' : 'Next Question'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POD;
