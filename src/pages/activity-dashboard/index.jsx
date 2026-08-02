import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// ── Mock data ─────────────────────────────────────────────────────────────────
const POD_QUESTIONS = [
  { id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction', difficulty: 'medium', text: 'At what position of the coil with respect to the magnetic field is the induced EMF maximum?', options: [{ id: 'A', text: 'When coil is perpendicular to B' }, { id: 'B', text: 'When coil is parallel to B' }, { id: 'C', text: 'When coil makes 45° with B' }, { id: 'D', text: 'EMF is always constant' }], correctAnswer: 'B', explanation: 'EMF = −dΦ/dt is maximum when the coil is parallel to B (θ = 90°) since the rate of change of flux is highest at this position.' },
  { id: 2, subject: 'Biology', chapter: 'Human Physiology', difficulty: 'easy', text: 'Which is the correct path of blood in pulmonary circulation?', options: [{ id: 'A', text: 'Right atrium → Right ventricle → Lungs → Left atrium' }, { id: 'B', text: 'Left atrium → Right ventricle → Lungs' }, { id: 'C', text: 'Right ventricle → Left atrium → Lungs' }, { id: 'D', text: 'Left ventricle → Right atrium → Lungs' }], correctAnswer: 'A', explanation: 'Deoxygenated blood flows: Right atrium → Right ventricle → Pulmonary artery → Lungs (oxygenation) → Pulmonary vein → Left atrium.' },
  { id: 3, subject: 'Chemistry', chapter: 'Chemical Kinetics', difficulty: 'medium', text: 'For a first-order reaction, the half-life is:', options: [{ id: 'A', text: 'Independent of initial concentration' }, { id: 'B', text: 'Proportional to initial concentration' }, { id: 'C', text: 'Inversely proportional to [A]₀' }, { id: 'D', text: 'Proportional to rate constant k' }], correctAnswer: 'A', explanation: 'For first order: t½ = 0.693/k. It depends only on k (rate constant), NOT on initial concentration.' },
  { id: 4, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'medium', text: 'In the photoelectric effect, increasing intensity (frequency constant) will:', options: [{ id: 'A', text: 'Increase KE of photoelectrons' }, { id: 'B', text: 'Increase number of photoelectrons emitted' }, { id: 'C', text: 'Increase stopping potential' }, { id: 'D', text: 'Decrease threshold frequency' }], correctAnswer: 'B', explanation: 'Intensity = photons/sec. More photons → more electrons. KE = hf − φ depends only on frequency, not intensity.' },
  { id: 5, subject: 'Biology', chapter: 'Genetics', difficulty: 'medium', text: 'In a dihybrid cross AaBb × AaBb, what fraction of offspring will be aabb?', options: [{ id: 'A', text: '1/16' }, { id: 'B', text: '3/16' }, { id: 'C', text: '9/16' }, { id: 'D', text: '1/4' }], correctAnswer: 'A', explanation: 'P(aa) = 1/4, P(bb) = 1/4. By independent assortment: P(aabb) = 1/4 × 1/4 = 1/16.' },
];

const QUICK_ACTIONS = [
  { icon: 'FlaskConical', label: 'Practice Lab', desc: 'Filtered question solving', color: 'text-blue-400', bg: 'bg-blue-500/8 border-blue-500/20', path: '/practice-lab' },
  { icon: 'RefreshCw', label: 'Mistake Review', desc: '4 questions due today', color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', path: '/review', badge: '4' },
  { icon: 'MessageCircleQuestion', label: 'Ask AI', desc: 'NCERT + web + videos', color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/20', path: '/doubt-solver' },
  { icon: 'Trophy', label: 'Contests', desc: '2 live today', color: 'text-rose-400', bg: 'bg-rose-500/8 border-rose-500/20', path: '/contest-hub', badge: '2' },
];

const WEAK_TOPICS = [
  { tag: 'lenzs-law', label: "Lenz's Law", accuracy: 38, subject: 'Physics', neetQ: 4, urgency: 'CRITICAL' },
  { tag: 'human-physiology', label: 'Human Physiology', accuracy: 42, subject: 'Biology', neetQ: 20, urgency: 'CRITICAL' },
  { tag: 'organic-reactions', label: 'Organic Reactions', accuracy: 51, subject: 'Chemistry', neetQ: 14, urgency: 'HIGH' },
];

const RECENT_ACTIVITY = [
  { id: 1, subject: 'Physics', topic: 'Electromagnetic Induction', questions: 15, accuracy: 87, time: '10 min ago' },
  { id: 2, subject: 'Biology', topic: 'Human Physiology', questions: 12, accuracy: 58, time: '2 hrs ago' },
  { id: 3, subject: 'Chemistry', topic: 'Chemical Kinetics', questions: 18, accuracy: 75, time: 'Yesterday' },
];

const SUBJECT_COLOR = {
  Physics: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Biology: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Chemistry: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Mathematics: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
};

const DIFF_COLOR = { easy: 'text-emerald-400', medium: 'text-amber-400', hard: 'text-rose-400' };
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// ── Heatmap ───────────────────────────────────────────────────────────────────
const generateHeatmap = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const rand = Math.random();
    const count = rand < 0.25 ? 0 : rand < 0.5 ? Math.floor(Math.random() * 5) + 1 : rand < 0.75 ? Math.floor(Math.random() * 10) + 5 : Math.floor(Math.random() * 15) + 10;
    data.push({ date: d.toISOString().split('T')[0], count, dateObj: d });
  }
  return data;
};

const HEATMAP_DATA = generateHeatmap();
const WEEKS = [];
for (let i = 0; i < HEATMAP_DATA.length; i += 7) WEEKS.push(HEATMAP_DATA.slice(i, i + 7));

const HeatCell = ({ count, date }) => {
  const [tip, setTip] = useState(false);
  const color = count === 0 ? 'bg-secondary' : count < 5 ? 'bg-emerald-900' : count < 10 ? 'bg-emerald-700' : count < 15 ? 'bg-emerald-500' : 'bg-emerald-400';
  return (
    <div className="relative" onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}>
      <div className={`w-3 h-3 rounded-sm ${color} cursor-pointer transition-transform hover:scale-125`} />
      {tip && (
        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1.5 bg-popover border border-[#192438] rounded-lg text-xs whitespace-nowrap pointer-events-none shadow-lg">
          <div className="text-foreground font-medium">{count} questions</div>
          <div className="text-[#7A8EAD]">{date}</div>
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ActivityDashboard = () => {
  const navigate = useNavigate();
  const STREAK = 12;

  // POD state
  const [podMode, setPodMode] = useState('preview'); // preview | solving | complete
  const [podQ, setPodQ] = useState(0);
  const [podSel, setPodSel] = useState(null);
  const [podSubmitted, setPodSubmitted] = useState(false);
  const [podAnswers, setPodAnswers] = useState({});
  const [podTimer, setPodTimer] = useState(0);
  const [justText, setJustText] = useState('');

  useEffect(() => {
    if (podMode !== 'solving') return;
    const t = setInterval(() => setPodTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [podMode]);

  const podCorrect = Object.values(podAnswers).filter(a => a.correct).length;
  const curQ = POD_QUESTIONS[podQ];

  const handlePodSubmit = () => {
    if (!podSel) return;
    setPodAnswers(p => ({ ...p, [curQ.id]: { answer: podSel, correct: podSel === curQ.correctAnswer } }));
    setPodSubmitted(true);
  };

  const handlePodNext = () => {
    if (podQ < POD_QUESTIONS.length - 1) {
      setPodQ(i => i + 1); setPodSel(null); setPodSubmitted(false); setJustText('');
    } else {
      setPodMode('complete');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="ml-0 lg:ml-56 pb-16 lg:pb-0 transition-smooth">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground tracking-tight">Dashboard</h1>
              <p className="text-xs text-[#7A8EAD] mt-0.5">Aug 2, 2026 · NEET Class 12</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-sm bg-[#0C1221] border border-[#192438] rounded-xl px-3 py-1.5">
                <Icon name="Flame" size={14} color="#FB923C" />
                <span className="font-bold text-orange-400 text-sm">{STREAK}</span>
                <span className="text-[#7A8EAD] text-xs hidden sm:inline">days</span>
              </div>
              <button
                onClick={() => navigate('/notifications')}
                className="relative w-9 h-9 bg-[#0C1221] border border-[#192438] rounded-xl flex items-center justify-center text-[#7A8EAD] hover:text-foreground transition-colors"
              >
                <Icon name="Bell" size={15} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>
            </div>
          </div>

          {/* ── Stats row ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {[
              { icon: 'Flame',      label: 'Streak',          value: `${STREAK}d`, sub: 'Best: 23 days',      color: 'text-orange-400', bg: 'bg-orange-500/8',  border: 'border-orange-500/15' },
              { icon: 'Target',     label: 'Questions',       value: '1,247',       sub: 'Last 365 days',      color: 'text-blue-400',   bg: 'bg-blue-500/8',    border: 'border-blue-500/15'   },
              { icon: 'CheckCircle',label: 'Accuracy',        value: '72.4%',       sub: '+2.1% this week',    color: 'text-emerald-400',bg: 'bg-emerald-500/8', border: 'border-emerald-500/15'},
              { icon: 'TrendingUp', label: 'Predicted Score', value: '541',         sub: '/ 720 NEET',         color: 'text-primary',    bg: 'bg-primary/8',     border: 'border-primary/15'    },
              { icon: 'BarChart3',  label: 'Platform Rank',   value: '#142',        sub: 'NEET Class 12',      color: 'text-violet-400', bg: 'bg-violet-500/8',  border: 'border-violet-500/15' },
            ].map((s, i) => (
              <div key={i} className={`bg-[#0C1221] border ${s.border} rounded-xl p-3.5 hover:border-[#243450] transition-smooth`}>
                <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-2.5`}>
                  <Icon name={s.icon} size={15} className={s.color} />
                </div>
                <div className={`text-lg font-heading font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[11px] font-medium text-foreground mt-0.5">{s.label}</div>
                <div className="text-[10px] text-[#7A8EAD] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* ── POD ──────────────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              {/* POD Preview */}
              {podMode === 'preview' && (
                <div className="bg-gradient-to-br from-primary/6 to-blue-500/5 border border-primary/20 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#192438]/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                        <Icon name="Calendar" size={17} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-foreground text-sm">Today&apos;s Challenge</div>
                        <div className="text-xs text-[#7A8EAD]">Jul 31, 2026 · 5 questions · NEET</div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-xs text-[#7A8EAD]">
                      <span className="flex items-center gap-1.5"><Icon name="Users" size={13} />2,847 solved</span>
                      <span className="flex items-center gap-1.5 text-orange-400 font-medium"><Icon name="Flame" size={13} />{STREAK} day streak</span>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {POD_QUESTIONS.map((pq, i) => {
                        const sc = SUBJECT_COLOR[pq.subject];
                        return (
                          <div key={pq.id} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${sc.bg} ${sc.border} ${sc.text}`}>
                            <span className="font-bold">{i + 1}</span>
                            <span>{pq.subject}</span>
                            <span className={DIFF_COLOR[pq.difficulty]}>· {pq.difficulty}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <div className="text-xs text-[#7A8EAD] mb-1">Batch: <span className="text-emerald-400 font-medium">22/34 completed</span></div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 34 }).map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full ${i < 22 ? 'bg-emerald-500' : 'bg-secondary'}`} style={{ width: 7 }} />
                          ))}
                        </div>
                      </div>
                      <Button onClick={() => { setPodMode('solving'); }} iconName="Play" iconPosition="left" size="sm">
                        Start Today&apos;s POD
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* POD Solving */}
              {podMode === 'solving' && (
                <div className="bg-[#0C1221] border border-[#192438] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[#192438] bg-[#111A2C]/60">
                    <div className="flex items-center gap-3">
                      <Icon name="Calendar" size={14} className="text-primary" />
                      <span className="font-heading font-semibold text-foreground text-sm">Today&apos;s POD</span>
                      <div className="flex gap-1">
                        {POD_QUESTIONS.map((_, i) => {
                          const ans = podAnswers[POD_QUESTIONS[i].id];
                          return (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${
                              ans?.correct ? 'bg-emerald-500 w-6' :
                              ans ? 'bg-rose-500 w-6' :
                              i === podQ ? 'bg-primary w-6' : 'bg-secondary w-4'
                            }`} />
                          );
                        })}
                      </div>
                      <span className="text-xs text-[#7A8EAD] font-mono">{podQ + 1}/5</span>
                    </div>
                    <span className="text-xs font-mono text-[#7A8EAD] flex items-center gap-1">
                      <Icon name="Clock" size={12} />{fmt(podTimer)}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {(() => { const sc = SUBJECT_COLOR[curQ.subject]; return <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${sc.bg} ${sc.border} ${sc.text}`}>{curQ.subject}</span>; })()}
                      <span className="text-xs text-[#7A8EAD]">{curQ.chapter}</span>
                      <span className={`text-xs font-medium capitalize ${DIFF_COLOR[curQ.difficulty]}`}>{curQ.difficulty}</span>
                    </div>
                    <p className="text-foreground leading-relaxed mb-4 text-sm">{curQ.text}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {curQ.options.map(opt => {
                        let cls = 'border-[#192438] bg-secondary hover:border-primary/40 cursor-pointer';
                        if (podSubmitted) {
                          if (opt.id === curQ.correctAnswer) cls = 'border-emerald-500/50 bg-emerald-500/8 cursor-default';
                          else if (opt.id === podSel) cls = 'border-rose-500/50 bg-rose-500/8 cursor-default';
                          else cls = 'border-[#192438] opacity-40 cursor-default';
                        } else if (podSel === opt.id) cls = 'border-primary bg-primary/8';
                        return (
                          <button key={opt.id} disabled={podSubmitted} onClick={() => setPodSel(opt.id)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm transition-smooth ${cls}`}
                          >
                            <span className={`w-6 h-6 flex-shrink-0 rounded-lg border flex items-center justify-center text-xs font-bold ${
                              podSubmitted && opt.id === curQ.correctAnswer ? 'border-emerald-500 text-emerald-400' :
                              podSubmitted && opt.id === podSel ? 'border-rose-500 text-rose-400' :
                              podSel === opt.id ? 'border-primary text-primary' : 'border-[#192438] text-[#7A8EAD]'
                            }`}>
                              {podSubmitted && opt.id === curQ.correctAnswer ? <Icon name="Check" size={11} /> :
                               podSubmitted && opt.id === podSel && opt.id !== curQ.correctAnswer ? <Icon name="X" size={11} /> : opt.id}
                            </span>
                            <span className="text-foreground text-xs">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {podSubmitted && (
                      <>
                        <div className={`p-3.5 rounded-xl border mb-3 ${podSel === curQ.correctAnswer ? 'bg-emerald-500/8 border-emerald-500/20' : 'bg-rose-500/8 border-rose-500/20'}`}>
                          <div className={`flex items-center gap-2 font-medium text-sm mb-1 ${podSel === curQ.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                            <Icon name={podSel === curQ.correctAnswer ? 'CheckCircle' : 'XCircle'} size={14} />
                            {podSel === curQ.correctAnswer ? 'Correct!' : `Wrong — Correct answer is ${curQ.correctAnswer}`}
                          </div>
                          <p className="text-xs text-[#7A8EAD]">{curQ.explanation}</p>
                        </div>
                        {/* Justification input */}
                        <div className="mb-3">
                          <label className="text-xs font-medium text-[#7A8EAD] mb-1 block">Why did you choose this? <span className="text-[#7A8EAD]/60">(optional — AI will score your understanding)</span></label>
                          <textarea
                            value={justText}
                            onChange={e => setJustText(e.target.value)}
                            placeholder="e.g. Because EMF = -dΦ/dt, maximum change occurs when flux changes fastest..."
                            rows={2}
                            className="w-full px-3 py-2 bg-secondary border border-[#192438] rounded-xl text-foreground placeholder:text-[#7A8EAD] text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-smooth resize-none"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#7A8EAD]">{podCorrect} correct so far</span>
                      {!podSubmitted
                        ? <Button onClick={handlePodSubmit} disabled={!podSel} size="sm" iconName="Check" iconPosition="right">Submit Answer</Button>
                        : <Button onClick={handlePodNext} size="sm" iconName={podQ === POD_QUESTIONS.length - 1 ? 'Flag' : 'ArrowRight'} iconPosition="right">
                            {podQ === POD_QUESTIONS.length - 1 ? 'Finish POD' : 'Next Question'}
                          </Button>
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* POD Complete */}
              {podMode === 'complete' && (
                <div className="bg-gradient-to-br from-emerald-500/8 to-primary/5 border border-emerald-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-4 mb-5 flex-wrap">
                    <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-lg text-foreground">POD Complete!</div>
                      <div className="text-[#7A8EAD] text-sm">
                        Scored <span className="text-primary font-bold">{podCorrect}/5</span> · {fmt(podTimer)} total
                      </div>
                    </div>
                    <div className="ml-auto flex gap-3">
                      <div className="text-center bg-[#0C1221] border border-[#192438] rounded-xl px-4 py-2.5">
                        <div className="text-2xl font-bold text-foreground">#142</div>
                        <div className="text-xs text-[#7A8EAD]">Batch rank</div>
                      </div>
                      <div className="text-center bg-[#0C1221] border border-[#192438] rounded-xl px-4 py-2.5">
                        <div className="text-2xl font-bold text-orange-400">{STREAK + 1}</div>
                        <div className="text-xs text-[#7A8EAD]">Day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {POD_QUESTIONS.map((pq, i) => {
                      const ans = podAnswers[pq.id];
                      return (
                        <div key={pq.id} className={`flex-1 p-2 rounded-lg border text-center text-xs font-medium ${ans?.correct ? 'bg-emerald-500/8 border-emerald-500/25 text-emerald-400' : 'bg-rose-500/8 border-rose-500/25 text-rose-400'}`}>
                          Q{i + 1} {ans?.correct ? '✓' : '✗'}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    {podCorrect < 5 && <Button variant="outline" size="sm" onClick={() => navigate('/review')}>Review Mistakes</Button>}
                    <Button size="sm" onClick={() => navigate('/practice/session/pod-demo/report')}>Full Report</Button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Quick actions ─────────────────────────────────────────── */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#7A8EAD] uppercase tracking-wide mb-2">Quick Actions</div>
              {QUICK_ACTIONS.map((a, i) => (
                <button
                  key={i}
                  onClick={() => navigate(a.path)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-smooth hover:-translate-y-0.5 hover:shadow-lg ${a.bg}`}
                >
                  <div className={`w-9 h-9 ${a.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={a.icon} size={17} className={a.color} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">{a.label}</span>
                      {a.badge && <span className={`text-xs px-1.5 py-0.5 rounded-full ${a.bg} ${a.color} font-bold`}>{a.badge}</span>}
                    </div>
                    <div className="text-xs text-[#7A8EAD]">{a.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-[#7A8EAD]" />
                </button>
              ))}

              {/* Rank widget */}
              <div className="bg-[#0C1221] border border-[#192438] rounded-xl p-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Award" size={15} className="text-amber-400" />
                  <span className="text-xs font-semibold text-[#7A8EAD] uppercase tracking-wide">Your Rank</span>
                </div>
                <div className="text-center mb-3">
                  <div className="text-3xl font-heading font-bold text-foreground">#142</div>
                  <div className="text-xs text-[#7A8EAD]">of 8,400 NEET students</div>
                  <div className="text-xs text-primary mt-0.5">Top 1.7%</div>
                </div>
                <div className="text-xs text-center text-[#7A8EAD]">
                  <span className="text-amber-400 font-medium">250 XP</span> away from #141
                </div>
                <button onClick={() => navigate('/leaderboard')} className="w-full mt-3 text-xs text-primary hover:text-primary/80 transition-colors text-center">
                  View Leaderboard →
                </button>
              </div>
            </div>
          </div>

          {/* ── Heatmap ──────────────────────────────────────────────────── */}
          <div className="bg-[#0C1221] border border-[#192438] rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 text-sm">
                <Icon name="Activity" size={15} className="text-primary" />
                365-Day Activity
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#7A8EAD]">
                <span>Less</span>
                {['bg-secondary', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                ))}
                <span>More</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {WEEKS.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <HeatCell key={di} count={day.count} date={day.dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* ── Weak topics ───────────────────────────────────────────── */}
            <div className="bg-[#0C1221] border border-[#192438] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                  <Icon name="AlertTriangle" size={15} className="text-rose-400" />
                  Concept Gaps
                </h3>
                <Link to="/concept-mastery-heatmap" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Full heatmap →
                </Link>
              </div>
              <div className="space-y-3">
                {WEAK_TOPICS.map(topic => {
                  const sc = SUBJECT_COLOR[topic.subject];
                  return (
                    <div key={topic.tag} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-sm text-foreground font-medium">{topic.label}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded border ${sc.bg} ${sc.border} ${sc.text}`}>{topic.subject}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${topic.urgency === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>{topic.urgency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full progress-bar" style={{ width: `${topic.accuracy}%` }} />
                          </div>
                          <span className="text-xs text-rose-400 font-mono">{topic.accuracy}%</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-[#7A8EAD] whitespace-nowrap">NEET: {topic.neetQ}Q</div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/concept-mastery-heatmap')}>
                Fix My Gaps
              </Button>
            </div>

            {/* ── Recent activity ───────────────────────────────��───────── */}
            <div className="bg-[#0C1221] border border-[#192438] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                  <Icon name="Clock" size={15} className="text-blue-400" />
                  Recent Sessions
                </h3>
                <Link to="/practice-lab" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Practice →
                </Link>
              </div>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map(act => {
                  const sc = SUBJECT_COLOR[act.subject];
                  return (
                    <div key={act.id} className="flex items-center gap-3 p-3 bg-[#111A2C]/60 rounded-xl">
                      <div className={`w-8 h-8 ${sc.bg} border ${sc.border} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon name="BookOpen" size={14} className={sc.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground font-medium truncate">{act.topic}</div>
                        <div className="text-xs text-[#7A8EAD]">{act.questions} questions · {act.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${act.accuracy >= 75 ? 'text-emerald-400' : act.accuracy >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{act.accuracy}%</div>
                        <div className="text-xs text-[#7A8EAD]">accuracy</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Predicted NEET score banner ───────────────────────────── */}
          <div className="bg-gradient-to-r from-primary/8 via-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                <Icon name="Target" size={22} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-[#7A8EAD] mb-0.5">Predicted NEET Score</div>
                <div className="text-2xl font-heading font-bold text-foreground">541 <span className="text-base text-[#7A8EAD] font-normal">/ 720</span></div>
                <div className="text-xs text-[#7A8EAD]">Fix your top 3 gaps to reach <span className="text-primary font-medium">+68 marks</span></div>
              </div>
            </div>
            <Button onClick={() => navigate('/concept-mastery-heatmap')} iconName="ArrowRight" iconPosition="right" size="sm">
              View Full Analysis
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ActivityDashboard;
