import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const reviewQueue = [
  {
    id: 1, priority: 'URGENT', subject: 'Physics', chapter: 'Electromagnetic Induction',
    concept: "Lenz's Law Direction", daysOverdue: 2, consecutiveWrong: 3,
    nextReview: 'Overdue', interval: '1 day', easeScore: 1.8,
    question: 'In which direction does the induced current flow when a magnet is pushed into a coil?',
    options: [
      { id: 'A', text: 'In the direction to oppose the magnet\'s motion (Lenz\'s law)' },
      { id: 'B', text: 'In the same direction as the magnetic field' },
      { id: 'C', text: 'Always clockwise when viewed from the north pole' },
      { id: 'D', text: 'Direction depends only on the velocity of the magnet' },
    ],
    correctAnswer: 'A',
    explanation: 'By Lenz\'s law, the induced current creates a magnetic field that opposes the change causing it. If the north pole moves in, induced current creates a north pole at the same end to repel.',
    yourLastAnswer: 'C', yourLastScore: 18,
  },
  {
    id: 2, priority: 'HIGH', subject: 'Biology', chapter: 'Human Physiology',
    concept: 'Nerve Signal Transmission', daysOverdue: 0, consecutiveWrong: 2,
    nextReview: 'Today', interval: '6 days', easeScore: 2.1,
    question: 'What happens to the Na⁺/K⁺ pump immediately after an action potential?',
    options: [
      { id: 'A', text: 'It pumps Na⁺ out and K⁺ in to restore resting potential' },
      { id: 'B', text: 'It pumps K⁺ out and Na⁺ in' },
      { id: 'C', text: 'The pump is inactivated permanently' },
      { id: 'D', text: 'Cl⁻ ions flow in to repolarise the membrane' },
    ],
    correctAnswer: 'A',
    explanation: 'After depolarization, the Na⁺/K⁺-ATPase pump actively transports 3 Na⁺ out and 2 K⁺ in to restore the resting membrane potential of −70 mV.',
    yourLastAnswer: 'B', yourLastScore: 32,
  },
  {
    id: 3, priority: 'MEDIUM', subject: 'Chemistry', chapter: 'Chemical Kinetics',
    concept: 'Rate Law & Order', daysOverdue: 0, consecutiveWrong: 1,
    nextReview: 'Today', interval: '15 days', easeScore: 2.5,
    question: 'For a reaction A + B → Products, if doubling [A] doubles the rate but doubling [B] has no effect, the rate law is:',
    options: [
      { id: 'A', text: 'Rate = k[A][B]' },
      { id: 'B', text: 'Rate = k[A]' },
      { id: 'C', text: 'Rate = k[A]²' },
      { id: 'D', text: 'Rate = k[B]' },
    ],
    correctAnswer: 'B',
    explanation: 'The rate is first order in A (doubling [A] doubles the rate, proportional change = 2¹) and zero order in B (no effect). So Rate = k[A]¹[B]⁰ = k[A].',
    yourLastAnswer: 'A', yourLastScore: 55,
  },
  {
    id: 4, priority: 'LOW', subject: 'Physics', chapter: 'Modern Physics',
    concept: 'de Broglie Wavelength', daysOverdue: 0, consecutiveWrong: 1,
    nextReview: 'In 2 days', interval: '33 days', easeScore: 2.8,
    question: 'The de Broglie wavelength of a particle with momentum p is given by:',
    options: [
      { id: 'A', text: 'λ = h/p' },
      { id: 'B', text: 'λ = hp' },
      { id: 'C', text: 'λ = h²/p' },
      { id: 'D', text: 'λ = p/h' },
    ],
    correctAnswer: 'A',
    explanation: 'Louis de Broglie proposed λ = h/p, where h is Planck\'s constant (6.626 × 10⁻³⁴ J·s) and p is the momentum. This shows wave-particle duality.',
    yourLastAnswer: 'B', yourLastScore: 10,
  },
];

const priorityConfig = {
  URGENT: { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30', label: 'Urgent', icon: 'AlertTriangle' },
  HIGH: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', label: 'High', icon: 'ArrowUp' },
  MEDIUM: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', label: 'Medium', icon: 'Minus' },
  LOW: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'Low', icon: 'ArrowDown' },
};

const subjectColor = {
  Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const MistakeReview = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [justification, setJustification] = useState('');
  const [reviewed, setReviewed] = useState([]);

  const q = reviewQueue[activeIndex];
  const p = priorityConfig[q.priority];

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    setReviewed(r => [...r, q.id]);
    if (activeIndex < reviewQueue.length - 1) {
      setActiveIndex(i => i + 1);
      setSelected(null);
      setSubmitted(false);
      setJustification('');
    } else {
      navigate('/activity-dashboard');
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/activity-dashboard' },
    { label: 'Mistake Review', path: '/review' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <BreadcrumbTrail items={breadcrumbs} />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Mistake Review</h1>
                <p className="text-muted-foreground text-sm mt-1">SM-2 spaced repetition queue · {reviewQueue.length} due today</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="CheckCircle" size={14} className="text-primary" />
                <span>{reviewed.length}/{reviewQueue.length} reviewed</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Queue sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Review Queue</h3>
                  <div className="space-y-2">
                    {reviewQueue.map((item, i) => {
                      const pc = priorityConfig[item.priority];
                      return (
                        <button
                          key={item.id}
                          onClick={() => { setActiveIndex(i); setSelected(null); setSubmitted(false); setJustification(''); }}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            i === activeIndex ? 'border-primary bg-primary/10' :
                            reviewed.includes(item.id) ? 'border-border opacity-50' :
                            'border-border bg-secondary hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs px-1.5 py-0.5 rounded border ${pc.bg} ${pc.color} font-medium`}>{pc.label}</span>
                            {reviewed.includes(item.id) && <Icon name="CheckCircle" size={12} className="text-primary" />}
                          </div>
                          <div className="text-xs font-medium text-foreground truncate">{item.concept}</div>
                          <div className="text-xs text-muted-foreground">{item.subject}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main review area */}
              <div className="lg:col-span-3 space-y-4">
                {/* Context banner */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${p.bg}`}>
                  <Icon name={p.icon} size={18} className={p.color} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-heading font-semibold ${p.color}`}>{p.label} Priority</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{q.consecutiveWrong}× consecutive wrong</span>
                      {q.daysOverdue > 0 && <span className="text-xs text-rose-400">{q.daysOverdue} days overdue</span>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Last attempt: you scored <span className="text-foreground font-medium">{q.yourLastScore}/100</span> understanding ·
                      Next interval: <span className="text-foreground font-medium">{q.interval}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-muted-foreground">Ease factor</div>
                    <div className="font-mono text-sm text-foreground">{q.easeScore}</div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${subjectColor[q.subject]} font-medium`}>{q.subject}</span>
                    <span className="text-xs text-muted-foreground">{q.chapter}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{q.concept}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-foreground leading-relaxed mb-5">{q.question}</p>
                    <div className="space-y-2.5">
                      {q.options.map(opt => {
                        let cls = 'border-border bg-secondary hover:border-primary/50 cursor-pointer';
                        if (submitted) {
                          if (opt.id === q.correctAnswer) cls = 'border-emerald-500 bg-emerald-500/10';
                          else if (opt.id === selected) cls = 'border-rose-500 bg-rose-500/10';
                          else cls = 'border-border opacity-40 cursor-default';
                        } else if (selected === opt.id) cls = 'border-primary bg-primary/10';
                        return (
                          <button
                            key={opt.id}
                            disabled={submitted}
                            onClick={() => setSelected(opt.id)}
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
                      <div className={`mt-4 p-4 rounded-xl border ${selected === q.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                        <div className={`flex items-center gap-2 font-medium mb-2 ${selected === q.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <Icon name={selected === q.correctAnswer ? 'CheckCircle' : 'XCircle'} size={15} />
                          {selected === q.correctAnswer ? 'Correct — great improvement!' : `Incorrect. Correct answer: ${q.correctAnswer}`}
                        </div>
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Justification box */}
                {submitted && (
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Brain" size={16} className="text-violet-400" />
                      <span className="font-heading font-semibold text-foreground text-sm">Explain your understanding</span>
                      <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">Optional · Extends review interval</span>
                    </div>
                    <textarea
                      value={justification}
                      onChange={e => setJustification(e.target.value)}
                      placeholder={`Now that you know the answer, explain WHY in your own words... e.g. "Lenz's law states that the induced current opposes the change in flux because..."`}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{justification.length} chars · {justification.split(' ').filter(Boolean).length} words</span>
                      <span>Writing helps extend your review interval from {q.interval} → longer</span>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  {!submitted ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        {activeIndex + 1} of {reviewQueue.length} in queue
                      </div>
                      <Button onClick={handleSubmit} disabled={!selected} iconName="Check" iconPosition="right">
                        Submit Answer
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={() => { setSelected(null); setSubmitted(false); setJustification(''); }}>
                        Retry
                      </Button>
                      <Button onClick={handleNext} iconName={activeIndex === reviewQueue.length - 1 ? 'Flag' : 'ArrowRight'} iconPosition="right">
                        {activeIndex === reviewQueue.length - 1 ? 'Finish Review' : 'Next in Queue'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MistakeReview;
