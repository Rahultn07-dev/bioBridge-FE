import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const wrongAnswers = [
  {
    id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction',
    question: 'At resonance in a series LCR circuit, the impedance is:',
    yourAnswer: 'A', correctAnswer: 'B',
    options: { A: 'Maximum', B: 'Equal to resistance R', C: 'Zero', D: 'Equal to XL + XC' },
    conceptTag: "lenzs-law",
  },
  {
    id: 2, subject: 'Chemistry', chapter: 'Chemical Kinetics',
    question: 'The half-life of a first-order reaction is:',
    yourAnswer: 'C', correctAnswer: 'A',
    options: { A: 'Independent of initial concentration', B: 'Proportional to initial concentration', C: 'Inversely proportional to initial concentration', D: 'Proportional to rate constant' },
    conceptTag: "half-life",
  },
  {
    id: 3, subject: 'Biology', chapter: 'Genetics',
    question: 'Which of the following correctly defines epistasis?',
    yourAnswer: 'B', correctAnswer: 'D',
    options: { A: 'Two alleles of same gene interact', B: 'Expression of a recessive allele in heterozygote', C: 'Random fertilization in meiosis', D: 'Interaction between alleles of different genes where one masks the other' },
    conceptTag: "epistasis",
  },
];

const SessionJustify = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [justifications, setJustifications] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const setJust = (id, val) => setJustifications(p => ({ ...p, [id]: val }));
  const writtenCount = Object.values(justifications).filter(j => j && j.trim().length >= 15).length;
  const q = wrongAnswers[currentIndex];

  const handleSubmitAll = () => {
    setSubmitted(true);
    setTimeout(() => navigate(`/practice/session/${sessionId || '1'}/report`, { replace: true }), 1800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Evaluating your understanding...</h2>
          <p className="text-muted-foreground">Grok is scoring your {writtenCount} justification{writtenCount !== 1 ? 's' : ''}.</p>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={14} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-heading font-semibold text-foreground">Session Complete</div>
              <div className="text-xs text-muted-foreground">Review your mistakes</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-muted-foreground">{writtenCount}/{wrongAnswers.length} justified</div>
            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(writtenCount / wrongAnswers.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Intro card */}
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Icon name="Brain" size={20} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-heading font-semibold text-foreground mb-1">You got {wrongAnswers.length} questions wrong</div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                Now that you know the correct answers, write your understanding for each. 
                This is <strong className="text-foreground">optional</strong> but writing justifications extends your SM-2 review intervals — meaning fewer reviews needed overall.
                Grok will score your conceptual understanding (0–100).
              </div>
            </div>
          </div>
        </div>

        {/* Question nav */}
        <div className="flex gap-2 mb-6">
          {wrongAnswers.map((item, i) => {
            const hasJust = justifications[item.id]?.trim().length >= 15;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(i)}
                className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                  i === currentIndex ? 'border-primary bg-primary/10' :
                  hasJust ? 'border-emerald-500/40 bg-emerald-500/10' :
                  'border-border bg-secondary hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">Q{i + 1}</span>
                  {hasJust ? <Icon name="CheckCircle" size={12} className="text-emerald-400" /> : <Icon name="Circle" size={12} className="text-muted-foreground" />}
                </div>
                <div className="text-xs text-muted-foreground truncate">{item.subject}</div>
              </button>
            );
          })}
        </div>

        {/* Current question justification */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          {/* Answer result */}
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">Wrong</span>
              <span className="text-xs text-muted-foreground">{q.subject} · {q.chapter}</span>
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">{q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(q.options).map(([key, val]) => (
                <div
                  key={key}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${
                    key === q.correctAnswer ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                    key === q.yourAnswer ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' :
                    'border-border text-muted-foreground opacity-60'
                  }`}
                >
                  <span className="font-bold w-4">{key}</span>
                  <span className="flex-1 truncate">{val}</span>
                  {key === q.correctAnswer && <Icon name="Check" size={10} />}
                  {key === q.yourAnswer && key !== q.correctAnswer && <Icon name="X" size={10} />}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              You chose <span className="text-rose-400 font-medium">{q.yourAnswer}</span> · Correct is <span className="text-emerald-400 font-medium">{q.correctAnswer}</span>
            </div>
          </div>

          {/* Justification input */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Pencil" size={14} className="text-violet-400" />
              <span className="text-sm font-medium text-foreground">
                Now that you know <span className="text-emerald-400 font-mono">{q.correctAnswer}</span> is correct — explain why in your own words
              </span>
            </div>
            <textarea
              value={justifications[q.id] || ''}
              onChange={e => setJust(q.id, e.target.value)}
              placeholder={`Write your reasoning here... e.g. "At resonance, XL = XC so net reactance is zero, meaning impedance Z = √(R² + 0²) = R..."`}
              className="w-full px-3 py-3 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-colors"
              rows={4}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">{(justifications[q.id] || '').length}/500 chars</span>
              {(justifications[q.id] || '').trim().length >= 15 && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Icon name="CheckCircle" size={11} />
                  Will be evaluated by AI
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation between wrong questions */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)} iconName="ArrowLeft" iconPosition="left" size="sm">
            Previous
          </Button>
          <Button variant="ghost" disabled={currentIndex === wrongAnswers.length - 1} onClick={() => setCurrentIndex(i => i + 1)} iconName="ArrowRight" iconPosition="right" size="sm">
            Next
          </Button>
        </div>

        {/* Submit */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-heading font-semibold text-foreground">Ready to submit?</div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {writtenCount > 0
                  ? `${writtenCount} justification${writtenCount > 1 ? 's' : ''} will be scored by AI`
                  : 'You can skip — SM-2 will use conservative scheduling'}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSubmitAll}>
                Skip All
              </Button>
              <Button onClick={handleSubmitAll} iconName="Send" iconPosition="right">
                Submit {writtenCount > 0 ? `(${writtenCount})` : '& Skip'}
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border pt-4">
            💡 Writing justifications can extend your review interval from 1 day → 6+ days, meaning fewer reviews over time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionJustify;
