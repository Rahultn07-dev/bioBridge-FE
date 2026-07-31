import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import ActivityHeatmap from './components/ActivityHeatmap';
import StatisticsCard from './components/StatisticsCard';
import RecentActivityTable from './components/RecentActivityTable';
import SubjectBreakdownChart from './components/SubjectBreakdownChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// ── POD questions (5 per day) ─────────────────────────────────────────────
const podQuestions = [
  { id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction', difficulty: 'medium', text: 'At what position of the coil with respect to the magnetic field is the induced EMF maximum?', options: [{ id: 'A', text: 'When coil is perpendicular to B' }, { id: 'B', text: 'When coil is parallel to B' }, { id: 'C', text: 'When coil makes 45° with B' }, { id: 'D', text: 'EMF is always constant' }], correctAnswer: 'B', explanation: 'EMF = −dΦ/dt is maximum when the coil is parallel to B (θ = 90°) since the rate of change of flux is highest at this position.' },
  { id: 2, subject: 'Biology', chapter: 'Human Physiology', difficulty: 'easy', text: 'Which is the correct path of blood in pulmonary circulation?', options: [{ id: 'A', text: 'Right atrium → Right ventricle → Lungs → Left atrium' }, { id: 'B', text: 'Left atrium → Right ventricle → Lungs' }, { id: 'C', text: 'Right ventricle → Left atrium → Lungs' }, { id: 'D', text: 'Left ventricle → Right atrium → Lungs' }], correctAnswer: 'A', explanation: 'Deoxygenated blood flows: Right atrium → Right ventricle → Pulmonary artery → Lungs (oxygenation) → Pulmonary vein → Left atrium.' },
  { id: 3, subject: 'Chemistry', chapter: 'Chemical Kinetics', difficulty: 'medium', text: 'For a first-order reaction, the half-life is:', options: [{ id: 'A', text: 'Independent of initial concentration' }, { id: 'B', text: 'Proportional to initial concentration' }, { id: 'C', text: 'Inversely proportional to [A]₀' }, { id: 'D', text: 'Proportional to rate constant k' }], correctAnswer: 'A', explanation: 'For first order: t½ = 0.693/k. It depends only on k (rate constant), NOT on initial concentration — the key property of first-order reactions.' },
  { id: 4, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'medium', text: 'In the photoelectric effect, increasing intensity (frequency constant) will:', options: [{ id: 'A', text: 'Increase KE of photoelectrons' }, { id: 'B', text: 'Increase number of photoelectrons emitted' }, { id: 'C', text: 'Increase stopping potential' }, { id: 'D', text: 'Decrease threshold frequency' }], correctAnswer: 'B', explanation: 'Intensity = photons/sec. More photons → more electrons. KE = hf − φ depends only on frequency, not intensity.' },
  { id: 5, subject: 'Biology', chapter: 'Genetics', difficulty: 'medium', text: 'In a dihybrid cross AaBb × AaBb, what fraction of offspring will be aabb?', options: [{ id: 'A', text: '1/16' }, { id: 'B', text: '3/16' }, { id: 'C', text: '9/16' }, { id: 'D', text: '1/4' }], correctAnswer: 'A', explanation: 'P(aa) = 1/4, P(bb) = 1/4. By independent assortment: P(aabb) = 1/4 × 1/4 = 1/16.' },
];

const subjectColorMap = { Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20', Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
const diffColor = { easy: 'text-emerald-400', medium: 'text-amber-400', hard: 'text-rose-400' };
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const ActivityDashboard = () => {
  const navigate = useNavigate();

  // POD state
  const [podMode, setPodMode] = useState('preview'); // preview | solving | complete
  const [podQ, setPodQ] = useState(0);
  const [podSel, setPodSel] = useState(null);
  const [podSubmitted, setPodSubmitted] = useState(false);
  const [podAnswers, setPodAnswers] = useState({});
  const [podTimer, setPodTimer] = useState(0);

  useEffect(() => {
    if (podMode !== 'solving') return;
    const t = setInterval(() => setPodTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [podMode]);

  const handlePodSubmit = () => {
    if (!podSel) return;
    const q = podQuestions[podQ];
    setPodAnswers(p => ({ ...p, [q.id]: { answer: podSel, correct: podSel === q.correctAnswer } }));
    setPodSubmitted(true);
  };

  const handlePodNext = () => {
    if (podQ < podQuestions.length - 1) {
      setPodQ(i => i + 1); setPodSel(null); setPodSubmitted(false);
    } else {
      setPodMode('complete');
    }
  };

  const podCorrect = Object.values(podAnswers).filter(a => a.correct).length;
  const curQ = podQuestions[podQ];

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateActivityData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      
      const count = Math.floor(Math.random() * 30);
      const physics = Math.floor(count * 0.3);
      const chemistry = Math.floor(count * 0.25);
      const mathematics = Math.floor(count * 0.25);
      const biology = count - physics - chemistry - mathematics;

      data?.push({
        date: date?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        count: count,
        subjects: {
          physics: physics,
          chemistry: chemistry,
          mathematics: mathematics,
          biology: biology
        }
      });
    }
    
    return data;
  };

  const activityData = generateActivityData();

  const recentActivities = [
    {
      id: 1,
      date: "2025-12-26T08:30:00",
      subject: "Physics",
      topic: "Electromagnetic Induction - Faraday\'s Laws",
      questionsCount: 15,
      accuracy: 87
    },
    {
      id: 2,
      date: "2025-12-25T14:45:00",
      subject: "Chemistry",
      topic: "Organic Chemistry - Aldehydes and Ketones",
      questionsCount: 12,
      accuracy: 75
    },
    {
      id: 3,
      date: "2025-12-25T10:20:00",
      subject: "Mathematics",
      topic: "Calculus - Definite Integration",
      questionsCount: 18,
      accuracy: 92
    },
    {
      id: 4,
      date: "2025-12-24T16:15:00",
      subject: "Biology",
      topic: "Human Physiology - Circulatory System",
      questionsCount: 10,
      accuracy: 80
    },
    {
      id: 5,
      date: "2025-12-24T09:00:00",
      subject: "Physics",
      topic: "Modern Physics - Photoelectric Effect",
      questionsCount: 14,
      accuracy: 71
    },
    {
      id: 6,
      date: "2025-12-23T15:30:00",
      subject: "Chemistry",
      topic: "Physical Chemistry - Chemical Kinetics",
      questionsCount: 16,
      accuracy: 88
    },
    {
      id: 7,
      date: "2025-12-23T11:45:00",
      subject: "Mathematics",
      topic: "Coordinate Geometry - Straight Lines",
      questionsCount: 13,
      accuracy: 85
    },
    {
      id: 8,
      date: "2025-12-22T14:00:00",
      subject: "Biology",
      topic: "Genetics - Mendelian Inheritance",
      questionsCount: 11,
      accuracy: 78
    }
  ];

  const subjectBreakdown = {
    physics: 245,
    chemistry: 198,
    mathematics: 267,
    biology: 189
  };

  const totalQuestions = activityData?.reduce((sum, day) => sum + day?.count, 0);
  const currentStreak = 12;
  const weeklyAverage = Math.round(totalQuestions / 52);

  const quickActions = [
    { icon: 'FlaskConical', label: 'Practice Lab', desc: 'Filtered question solving', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', path: '/practice-lab' },
    { icon: 'RefreshCw', label: 'Mistake Review', desc: '4 questions due today', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', path: '/review', badge: '4' },
    { icon: 'MessageCircleQuestion', label: 'Ask AI Doubt', desc: 'NCERT + videos + web', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', path: '/doubt-solver' },
    { icon: 'Trophy', label: 'Contests', desc: '2 upcoming today', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', path: '/contest-hub', badge: '2' },
  ];

  const weakTopics = [
    { tag: 'lenzs-law', label: "Lenz's Law Direction", accuracy: 38, subject: 'Physics', neetQ: 4 },
    { tag: 'human-physiology', label: 'Human Physiology', accuracy: 42, subject: 'Biology', neetQ: 20 },
    { tag: 'organic-reactions', label: 'Organic Reactions', accuracy: 51, subject: 'Chemistry', neetQ: 14 },
  ];

  // ── POD inline components ────────────────────────────────────────────────
  const PodPreview = () => (
    <div className="bg-gradient-to-br from-primary/5 to-cyan-500/5 border border-primary/20 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
            <Icon name="Calendar" size={18} className="text-primary" />
          </div>
          <div>
            <div className="font-heading font-bold text-foreground">Today's Challenge</div>
            <div className="text-xs text-muted-foreground">Jul 17, 2026 · 5 questions · NEET</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5 text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5"><Icon name="Users" size={14} />2,847 solved</span>
          <span className="text-orange-400 font-medium flex items-center gap-1.5"><Icon name="Flame" size={14} />{currentStreak} day streak</span>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {podQuestions.map((pq, i) => (
            <div key={pq.id} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${subjectColorMap[pq.subject]}`}>
              <span className="font-bold">{i + 1}</span>
              <span>{pq.subject}</span>
              <span className={`${diffColor[pq.difficulty]}`}>· {pq.difficulty}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Batch: <span className="text-emerald-400 font-medium">22/34 completed</span></div>
            <div className="flex gap-0.5">
              {Array.from({ length: 34 }).map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full ${i < 22 ? 'bg-emerald-500' : 'bg-secondary'}`} style={{ width: 7 }} />
              ))}
            </div>
          </div>
          <Button onClick={() => { setPodMode('solving'); }} iconName="Play" iconPosition="left">
            Start Today's POD
          </Button>
        </div>
      </div>
    </div>
  );

  const PodSolving = () => (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Icon name="Calendar" size={15} className="text-primary" />
          <span className="font-heading font-semibold text-foreground text-sm">Today's POD</span>
          <div className="flex gap-1">
            {podQuestions.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${
                podAnswers[podQuestions[i].id]?.correct ? 'bg-emerald-500 w-6' :
                podAnswers[podQuestions[i].id] ? 'bg-rose-500 w-6' :
                i === podQ ? 'bg-primary w-6' : 'bg-secondary w-4'
              }`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-mono">{podQ + 1}/5</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1"><Icon name="Clock" size={12} />{fmt(podTimer)}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subjectColorMap[curQ.subject]}`}>{curQ.subject}</span>
          <span className="text-xs text-muted-foreground">{curQ.chapter}</span>
          <span className={`text-xs font-medium ${diffColor[curQ.difficulty]}`}>{curQ.difficulty}</span>
        </div>
        <p className="text-foreground leading-relaxed mb-5">{curQ.text}</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {curQ.options.map(opt => {
            let cls = 'border-border bg-secondary hover:border-primary/50 cursor-pointer';
            if (podSubmitted) {
              if (opt.id === curQ.correctAnswer) cls = 'border-emerald-500 bg-emerald-500/10';
              else if (opt.id === podSel) cls = 'border-rose-500 bg-rose-500/10';
              else cls = 'border-border opacity-40 cursor-default';
            } else if (podSel === opt.id) cls = 'border-primary bg-primary/10';
            return (
              <button key={opt.id} disabled={podSubmitted} onClick={() => setPodSel(opt.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${cls}`}
              >
                <span className={`w-6 h-6 flex-shrink-0 rounded border flex items-center justify-center text-xs font-bold ${podSubmitted && opt.id === curQ.correctAnswer ? 'border-emerald-500 text-emerald-400' : podSubmitted && opt.id === podSel ? 'border-rose-500 text-rose-400' : podSel === opt.id ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>
                  {podSubmitted && opt.id === curQ.correctAnswer ? <Icon name="Check" size={11} /> : podSubmitted && opt.id === podSel && opt.id !== curQ.correctAnswer ? <Icon name="X" size={11} /> : opt.id}
                </span>
                <span className="text-foreground">{opt.text}</span>
              </button>
            );
          })}
        </div>
        {podSubmitted && (
          <div className={`p-3.5 rounded-xl border mb-4 ${podSel === curQ.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
            <div className={`flex items-center gap-2 font-medium text-sm mb-1 ${podSel === curQ.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
              <Icon name={podSel === curQ.correctAnswer ? 'CheckCircle' : 'XCircle'} size={14} />
              {podSel === curQ.correctAnswer ? 'Correct!' : `Wrong — Correct answer is ${curQ.correctAnswer}`}
            </div>
            <p className="text-xs text-muted-foreground">{curQ.explanation}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{podCorrect} correct so far</span>
          {!podSubmitted
            ? <Button onClick={handlePodSubmit} disabled={!podSel} size="sm" iconName="Check" iconPosition="right">Submit Answer</Button>
            : <Button onClick={handlePodNext} size="sm" iconName={podQ === podQuestions.length - 1 ? 'Flag' : 'ArrowRight'} iconPosition="right">{podQ === podQuestions.length - 1 ? 'Finish POD' : 'Next Question'}</Button>
          }
        </div>
      </div>
    </div>
  );

  const PodComplete = () => (
    <div className="bg-gradient-to-br from-emerald-500/10 to-primary/5 border border-emerald-500/20 rounded-2xl p-5">
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="text-4xl">🎉</div>
        <div>
          <div className="font-heading font-bold text-xl text-foreground">POD Complete!</div>
          <div className="text-muted-foreground text-sm">
            Scored <span className="text-primary font-bold">{podCorrect}/5</span> · {fmt(podTimer)} total
          </div>
        </div>
        <div className="ml-auto text-center bg-card border border-border rounded-xl px-4 py-2">
          <div className="text-2xl font-bold text-foreground">#142</div>
          <div className="text-xs text-muted-foreground">Batch rank</div>
        </div>
        <div className="text-center bg-card border border-border rounded-xl px-4 py-2">
          <div className="text-2xl font-bold text-orange-400">{currentStreak + 1}</div>
          <div className="text-xs text-muted-foreground">Day streak 🔥</div>
        </div>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {podQuestions.map((pq, i) => {
          const ans = podAnswers[pq.id];
          return (
            <div key={pq.id} className={`flex-1 min-w-16 p-2 rounded-lg border text-center text-xs font-medium ${ans?.correct ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
              Q{i + 1} {ans?.correct ? '✓' : '✗'}
            </div>
          );
        })}
      </div>
      <div className="flex gap-3">
        {podCorrect < 5 && <Button variant="outline" size="sm" onClick={() => navigate('/review')}>Review Mistakes</Button>}
        <Button size="sm" onClick={() => navigate('/practice/session/pod-demo/report')}>Full Report →</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={isSidebarCollapsed} />
      <main className="ml-0 lg:ml-60 transition-smooth">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Jul 17, 2026 · NEET Class 12</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="Flame" size={15} className="text-orange-400" />
                <span className="text-orange-400 font-bold">{currentStreak}</span>
                <span className="text-muted-foreground hidden sm:inline">day streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="Award" size={15} className="text-amber-400" />
                <span className="text-foreground font-bold">#142</span>
                <span className="text-muted-foreground hidden sm:inline">rank</span>
              </div>
            </div>
          </div>

          {/* ── POD SECTION ─────────────────────────────────────── */}
          <div className="mb-6">
            {podMode === 'preview' && <PodPreview />}
            {podMode === 'solving' && <PodSolving />}
            {podMode === 'complete' && <PodComplete />}
          </div>

          {/* ── STATS ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatisticsCard icon="Flame" title="Current Streak" value={`${currentStreak} days`} subtitle="Keep it going!" trend="up" trendValue="+2 days" />
            <StatisticsCard icon="Target" title="Total Questions" value={totalQuestions?.toLocaleString('en-IN')} subtitle="Last 365 days" trend="up" trendValue="+15%" />
            <StatisticsCard icon="CheckCircle" title="Accuracy" value="72.4%" subtitle="Overall correct rate" trend="up" trendValue="+3%" />
            <StatisticsCard icon="TrendingUp" title="Pred. NEET Score" value="487/720" subtitle="Based on accuracy" trend="up" trendValue="+23" />
          </div>

          {/* ── MAIN GRID: Heatmap + Quick Actions ──────────────── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ActivityHeatmap activityData={activityData} />
            </div>
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                <Icon name="Zap" size={14} className="text-primary" />
                Quick Actions
              </h3>
              {quickActions.map(a => (
                <button key={a.path} onClick={() => navigate(a.path)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left hover:scale-[1.01] transition-all ${a.bg}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${a.bg}`}>
                    <Icon name={a.icon} size={18} className={a.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-heading font-semibold text-foreground">{a.label}</span>
                      {a.badge && <span className="text-xs bg-rose-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">{a.badge}</span>}
                    </div>
                    <span className="text-xs text-muted-foreground">{a.desc}</span>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* ── CONCEPT GAPS ─────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Icon name="AlertTriangle" size={15} className="text-rose-400" />
                Concept Gaps — Fix These First
              </h3>
              <Button size="xs" variant="ghost" onClick={() => navigate('/concept-mastery-heatmap')}>
                Full Heatmap →
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {weakTopics.map(t => (
                <div key={t.tag} className="bg-secondary border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{t.label}</span>
                    <span className="text-xs text-rose-400 font-bold font-mono">{t.accuracy}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2.5">{t.subject} · NEET asks {t.neetQ}Q/year</div>
                  <div className="w-full h-1.5 bg-background rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${t.accuracy}%` }} />
                  </div>
                  <button onClick={() => navigate(`/study/${t.tag}`)}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
                  >
                    Start Study Path <Icon name="ArrowRight" size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM: Recent Activity + Subject Breakdown ────── */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivityTable activities={recentActivities} />
            </div>
            <div>
              <SubjectBreakdownChart data={subjectBreakdown} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ActivityDashboard;