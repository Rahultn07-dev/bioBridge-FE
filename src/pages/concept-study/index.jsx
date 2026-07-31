import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const studyData = {
  tag: 'lenzs-law',
  concept: "Lenz's Law",
  subject: 'Physics',
  chapter: 'Electromagnetic Induction',
  triggerReason: 'accuracy_below_50',
  accuracy: 38,
  neetQuestions: 4,
  currentPhase: 'THEORY',
  phases: ['THEORY', 'EASY', 'MEDIUM', 'HARD_PYQ', 'MASTERED'],
  theoryCard: {
    definition: "The direction of induced current is such that it opposes the cause producing it (Lenz's law). Mathematically expressed by the negative sign in ε = −dΦ/dt.",
    formula: "ε = −dΦ/dt",
    formulaNote: "The negative sign encodes Lenz's law. dΦ/dt = rate of change of magnetic flux.",
    ncertRef: "NCERT Class 12 Physics, Chapter 6, Page 134",
    mistakePattern: "You got this wrong 3 times — you consistently confused the direction when the magnet's south pole was used. Remember: oppose the change, not the magnet.",
    keyPoints: [
      "If flux is increasing, induced current creates a field to oppose (decrease) it",
      "If flux is decreasing, induced current creates a field to support (increase) it",
      "The induced EMF drives this current — like a battery with EMF = |dΦ/dt|",
      "Lenz's law is a consequence of energy conservation",
    ],
  },
  easyQuestions: [
    { id: 101, text: "A bar magnet's north pole is moved toward a coil. The induced current in the coil will:", options: [{ id: 'A', text: 'Create a north pole facing the magnet (repels)' }, { id: 'B', text: 'Create a south pole facing the magnet (attracts)' }, { id: 'C', text: 'Not flow at all' }, { id: 'D', text: 'Depend on the speed of the magnet' }], correctAnswer: 'A' },
    { id: 102, text: "The flux through a coil decreases from 5 Wb to 1 Wb in 2 seconds. The magnitude of induced EMF is:", options: [{ id: 'A', text: '2 V' }, { id: 'B', text: '4 V' }, { id: 'C', text: '2.5 V' }, { id: 'D', text: '3 V' }], correctAnswer: 'A' },
    { id: 103, text: "Lenz's law is fundamentally a statement about:", options: [{ id: 'A', text: 'Conservation of charge' }, { id: 'B', text: 'Conservation of energy' }, { id: 'C', text: 'Conservation of momentum' }, { id: 'D', text: 'Ampere\'s circuital law' }], correctAnswer: 'B' },
    { id: 104, text: "A coil is in a uniform magnetic field. Which motion of the coil will NOT induce an EMF?", options: [{ id: 'A', text: 'Rotating about an axis perpendicular to B' }, { id: 'B', text: 'Moving perpendicular to B' }, { id: 'C', text: 'Moving parallel to B' }, { id: 'D', text: 'Rotating about an axis parallel to B' }], correctAnswer: 'C' },
    { id: 105, text: "In Lenz's law, 'opposing the cause' means the induced current's magnetic field:", options: [{ id: 'A', text: 'Is always in the same direction as the original B field' }, { id: 'B', text: 'Opposes the change in flux, not necessarily the original field' }, { id: 'C', text: 'Is always opposite to the original B field' }, { id: 'D', text: 'Has no relation to the original B field' }], correctAnswer: 'B' },
  ],
};

const phaseConfig = {
  THEORY: { label: 'Theory', icon: 'BookOpen', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  EASY: { label: 'Easy', icon: 'Circle', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  MEDIUM: { label: 'Medium', icon: 'Target', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  HARD_PYQ: { label: 'Hard + PYQ', icon: 'Flame', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  MASTERED: { label: 'Mastered', icon: 'CheckCircle', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
};

const ConceptStudy = () => {
  const navigate = useNavigate();
  const { tag } = useParams();
  const [phase, setPhase] = useState('THEORY');
  const [theoryRead, setTheoryRead] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [phaseComplete, setPhaseComplete] = useState(false);

  const questions = studyData.easyQuestions;
  const q = questions[currentQ];
  const passCount = Object.values(answers).filter(a => a === true).length;
  const phaseIdx = studyData.phases.indexOf(phase);

  const handleSubmitQ = () => {
    if (!selected) return;
    const correct = selected === q.correctAnswer;
    setAnswers(p => ({ ...p, [q.id]: correct }));
    setSubmitted(true);
  };

  const handleNextQ = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(i => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setPhaseComplete(true);
    }
  };

  const advancePhase = () => {
    const nextPhase = studyData.phases[phaseIdx + 1];
    setPhase(nextPhase);
    setPhaseComplete(false);
    setCurrentQ(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers({});
  };

  const d = studyData;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/50 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={16} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-foreground text-sm">{d.concept}</span>
              <span className="text-xs text-muted-foreground">{d.subject} · {d.chapter}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
            <Icon name="AlertTriangle" size={12} />
            {d.accuracy}% accuracy · Weakness
          </div>
        </div>

        {/* Phase progress */}
        <div className="border-b border-border px-4 md:px-6 py-3 flex items-center gap-2 overflow-x-auto flex-shrink-0">
          {d.phases.map((p, i) => {
            const pc = phaseConfig[p];
            const done = d.phases.indexOf(phase) > i;
            const active = phase === p;
            return (
              <React.Fragment key={p}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium flex-shrink-0 transition-all ${
                  done ? 'bg-primary/10 border-primary/30 text-primary' :
                  active ? `${pc.bg} ${pc.color}` :
                  'bg-secondary border-border text-muted-foreground'
                }`}>
                  <Icon name={done ? 'CheckCircle' : pc.icon} size={12} />
                  {pc.label}
                </div>
                {i < d.phases.length - 1 && <Icon name="ChevronRight" size={12} className="text-muted-foreground flex-shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Phase complete overlay */}
            {phaseComplete && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">{passCount >= 4 ? '🎉' : '🔄'}</div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  {passCount >= 4 ? 'Phase Complete!' : 'Not quite yet...'}
                </h2>
                <p className="text-muted-foreground mb-2">You got {passCount}/{questions.length} correct.</p>
                {passCount >= 4 ? (
                  <p className="text-emerald-400 text-sm mb-8">Pass condition met (4/5). Advancing to next phase!</p>
                ) : (
                  <p className="text-amber-400 text-sm mb-8">Need 4/5 to advance. Let's try again with different questions.</p>
                )}
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => { setPhaseComplete(false); setCurrentQ(0); setSelected(null); setSubmitted(false); setAnswers({}); }}>
                    Retry Phase
                  </Button>
                  {passCount >= 4 && (
                    <Button onClick={advancePhase} iconName="ArrowRight" iconPosition="right">
                      {phase === 'HARD_PYQ' ? '🎯 Concept Mastered!' : 'Next Phase'}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Theory Phase */}
            {!phaseComplete && phase === 'THEORY' && (
              <div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Icon name="BookOpen" size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-foreground">Theory Card: {d.concept}</h2>
                      <p className="text-xs text-muted-foreground">{d.theoryCard.ncertRef}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="bg-background/50 rounded-xl p-4">
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">Definition</div>
                      <p className="text-foreground text-sm leading-relaxed">{d.theoryCard.definition}</p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-4">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">Formula</div>
                      <div className="text-xl font-mono text-foreground font-bold">{d.theoryCard.formula}</div>
                      <p className="text-xs text-muted-foreground mt-1">{d.theoryCard.formulaNote}</p>
                    </div>

                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Icon name="AlertTriangle" size={11} />
                        Your Mistake Pattern
                      </div>
                      <p className="text-foreground text-sm">{d.theoryCard.mistakePattern}</p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-4">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">Key Points</div>
                      <div className="space-y-2">
                        {d.theoryCard.keyPoints.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                            {pt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Trophy" size={12} className="text-amber-400" />
                      NEET asks ~{d.neetQuestions} questions from this concept per year — HIGH priority
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Read and understood? Start the easy questions to test yourself.</div>
                  <Button onClick={() => { setTheoryRead(true); setPhase('EASY'); }} iconName="ArrowRight" iconPosition="right">
                    Start Easy Questions
                  </Button>
                </div>
              </div>
            )}

            {/* Question Phases */}
            {!phaseComplete && phase !== 'THEORY' && phase !== 'MASTERED' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-heading font-bold text-foreground">{phaseConfig[phase].label} Phase</h2>
                    <p className="text-xs text-muted-foreground">Get 4/{questions.length} correct to advance · {passCount} correct so far</p>
                  </div>
                  <div className="flex gap-1">
                    {questions.map((_, i) => (
                      <div key={i} className={`w-5 h-5 rounded border text-xs font-bold flex items-center justify-center ${
                        answers[questions[i].id] === true ? 'bg-emerald-500 border-emerald-500 text-white' :
                        answers[questions[i].id] === false ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' :
                        i === currentQ ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                      }`}>{i + 1}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden mb-5">
                  <div className="px-5 py-3 border-b border-border text-xs text-muted-foreground">
                    Question {currentQ + 1} of {questions.length} · {d.concept}
                  </div>
                  <div className="p-5">
                    <p className="text-foreground leading-relaxed mb-5">{q.text}</p>
                    <div className="space-y-2.5">
                      {q.options.map(opt => {
                        let cls = 'border-border bg-secondary hover:border-primary/50 cursor-pointer';
                        if (submitted) {
                          if (opt.id === q.correctAnswer) cls = 'border-emerald-500 bg-emerald-500/10';
                          else if (opt.id === selected) cls = 'border-rose-500 bg-rose-500/10';
                          else cls = 'border-border opacity-40';
                        } else if (selected === opt.id) cls = 'border-primary bg-primary/10';
                        return (
                          <button key={opt.id} disabled={submitted} onClick={() => setSelected(opt.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${cls}`}
                          >
                            <span className={`w-6 h-6 flex-shrink-0 rounded border flex items-center justify-center text-xs font-bold ${
                              submitted && opt.id === q.correctAnswer ? 'border-emerald-500 text-emerald-400' :
                              submitted && opt.id === selected ? 'border-rose-500 text-rose-400' :
                              selected === opt.id ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                            }`}>{opt.id}</span>
                            <span className="text-sm text-foreground">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div className={`mt-4 p-3 rounded-xl ${selected === q.correctAnswer ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
                        <span className={`text-sm font-medium ${selected === q.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selected === q.correctAnswer ? '✓ Correct!' : `✗ Incorrect. Answer: ${q.correctAnswer}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  {!submitted ? (
                    <Button onClick={handleSubmitQ} disabled={!selected}>Submit Answer</Button>
                  ) : (
                    <Button onClick={handleNextQ} iconName="ArrowRight" iconPosition="right">
                      {currentQ === questions.length - 1 ? 'Finish Phase' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Mastered */}
            {phase === 'MASTERED' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Concept Mastered!</h2>
                <p className="text-muted-foreground mb-2">{d.concept} has been removed from your weak topics.</p>
                <p className="text-primary text-sm mb-8">Key note auto-generated and saved to your profile.</p>
                <Button onClick={() => navigate('/activity-dashboard')} iconName="Home" iconPosition="left">
                  Back to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptStudy;
