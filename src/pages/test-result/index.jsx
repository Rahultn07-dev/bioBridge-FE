import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const result = {
  test: { title: 'NEET Mock Test — Full Syllabus', date: 'Jul 16, 2026', duration: 180 },
  score: { total: 387, max: 720, rank: 142, totalStudents: 8400, percentile: 78.4, change: +23 },
  subjects: [
    { name: 'Physics', score: 96, max: 180, attempted: 38, correct: 24, wrong: 14, accuracy: 63.2, trend: 'up' },
    { name: 'Chemistry', score: 104, max: 180, attempted: 40, correct: 26, wrong: 14, accuracy: 65.0, trend: 'stable' },
    { name: 'Biology', score: 187, max: 360, attempted: 82, correct: 49, wrong: 33, accuracy: 59.8, trend: 'down' },
  ],
  weakChapters: [
    { chapter: 'Human Physiology', subject: 'Biology', accuracy: 42, neetQ: 20, urgency: 'CRITICAL' },
    { chapter: 'Organic Reactions', subject: 'Chemistry', accuracy: 52, neetQ: 14, urgency: 'HIGH' },
    { chapter: 'EM Induction', subject: 'Physics', accuracy: 58, neetQ: 4, urgency: 'MEDIUM' },
  ],
  topChapters: [
    { chapter: 'Cell Biology', subject: 'Biology', accuracy: 95, correct: 6, total: 6 },
    { chapter: 'Ray Optics', subject: 'Physics', accuracy: 100, correct: 4, total: 4 },
    { chapter: 'Ionic Equilibrium', subject: 'Chemistry', accuracy: 100, correct: 3, total: 3 },
  ],
  timeAnalysis: { avgPerQ: 62, longest: { q: 47, time: 243 }, fastest: { q: 12, time: 18 } },
  potentialGain: 68,
  justificationScores: [
    { concept: 'Human Physiology', score: 28, label: 'Conceptual Gap', color: 'text-rose-400' },
    { concept: 'Organic Reactions', score: 55, label: 'Developing', color: 'text-amber-400' },
  ],
};

const urgencyConfig = {
  CRITICAL: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  HIGH: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  MEDIUM: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const TestResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState('overview');

  const pct = Math.round((result.score.total / result.score.max) * 100);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Trophy" size={18} className="text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Result</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{result.test.title}</h1>
                <p className="text-muted-foreground text-sm mt-1">{result.test.date} · {result.test.duration} minutes</p>
              </div>
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Download PDF
              </Button>
            </div>

            {/* Score hero */}
            <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-6 mb-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                  <div className="relative w-28 h-28">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                      <circle cx="56" cy="56" r="46" fill="none" stroke="#1E293B" strokeWidth="10" />
                      <circle cx="56" cy="56" r="46" fill="none" stroke="#10B981" strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 46}`}
                        strokeDashoffset={`${2 * Math.PI * 46 * (1 - pct / 100)}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-foreground">{result.score.total}</span>
                      <span className="text-xs text-muted-foreground">/{result.score.max}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{pct}% score</div>
                </div>
                <div className="md:col-span-3 grid grid-cols-3 gap-4">
                  <div className="bg-background/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">#{result.score.rank}</div>
                    <div className="text-xs text-muted-foreground mt-1">Rank</div>
                    <div className="text-xs text-muted-foreground">of {result.score.totalStudents.toLocaleString()}</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{result.score.percentile}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Percentile</div>
                    <div className="text-xs text-emerald-400">Top {100 - Math.round(result.score.percentile)}%</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 text-center">
                    <div className={`text-2xl font-bold ${result.score.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.score.change > 0 ? '+' : ''}{result.score.change}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">vs last test</div>
                    <div className={`text-xs ${result.score.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.score.change > 0 ? 'Improving ↑' : 'Declining ↓'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {result.subjects.map(s => (
                <div key={s.name} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-semibold text-foreground">{s.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                      s.trend === 'up' ? 'text-emerald-400' : s.trend === 'down' ? 'text-rose-400' : 'text-muted-foreground'
                    }`}>
                      <Icon name={s.trend === 'up' ? 'TrendingUp' : s.trend === 'down' ? 'TrendingDown' : 'Minus'} size={11} />
                      {s.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{s.score}<span className="text-lg text-muted-foreground">/{s.max}</span></div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(s.score / s.max) * 100}%` }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div><div className="text-emerald-400 font-bold">{s.correct}</div><div className="text-muted-foreground">Correct</div></div>
                    <div><div className="text-rose-400 font-bold">{s.wrong}</div><div className="text-muted-foreground">Wrong</div></div>
                    <div><div className="text-foreground font-bold">{s.accuracy}%</div><div className="text-muted-foreground">Accuracy</div></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border pb-0">
              {[
                { id: 'overview', label: 'Analysis', icon: 'BarChart2' },
                { id: 'timing', label: 'Time', icon: 'Clock' },
                { id: 'ai', label: 'AI Improvement Plan', icon: 'Brain' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                    tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={t.icon} size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-rose-400" />
                    Critical Gaps (Fix for +{result.potentialGain} marks)
                  </h3>
                  <div className="space-y-3">
                    {result.weakChapters.map(c => (
                      <div key={c.chapter} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-foreground">{c.chapter}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded border ${urgencyConfig[c.urgency]}`}>{c.urgency}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${c.accuracy}%` }} />
                            </div>
                            <span className="text-xs text-rose-400 font-mono">{c.accuracy}%</span>
                          </div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground whitespace-nowrap">NEET: {c.neetQ}Q</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                    Strongest Chapters
                  </h3>
                  <div className="space-y-3">
                    {result.topChapters.map(c => (
                      <div key={c.chapter} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-sm text-foreground mb-1">{c.chapter} <span className="text-muted-foreground text-xs">({c.subject})</span></div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.accuracy}%` }} />
                            </div>
                            <span className="text-xs text-emerald-400 font-mono">{c.correct}/{c.total}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'timing' && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-2">Time Analysis</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-foreground">{result.timeAnalysis.avgPerQ}s</div>
                    <div className="text-xs text-muted-foreground mt-1">Avg per question</div>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-amber-400">{result.timeAnalysis.longest.time}s</div>
                    <div className="text-xs text-muted-foreground mt-1">Longest (Q{result.timeAnalysis.longest.q})</div>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-emerald-400">{result.timeAnalysis.fastest.time}s</div>
                    <div className="text-xs text-muted-foreground mt-1">Fastest (Q{result.timeAnalysis.fastest.q})</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You spent <span className="text-amber-400 font-medium">4 minutes on Q{result.timeAnalysis.longest.q}</span> and got it wrong — 
                  this suggests conceptual difficulty, not just a careless mistake. Add it to your study path.
                </p>
              </div>
            )}

            {tab === 'ai' && (
              <div className="space-y-4">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Brain" size={16} className="text-violet-400" />
                    <span className="font-heading font-semibold text-foreground">AI-Generated Improvement Plan</span>
                    <span className="text-xs text-muted-foreground">(based on your justification scores)</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Based on your answers and justifications, here are the highest-priority actions to improve your NEET score:
                  </p>
                </div>
                {[
                  { icon: 'BookOpen', color: 'text-rose-400', title: 'Human Physiology (CRITICAL)', text: 'You attempted 21 questions, got 9 right (42%). NEET typically has 20 questions from this chapter. Start with Nutrition & Digestion concept study path — 15 easy questions. Then revisit Circulatory System.' },
                  { icon: 'FlaskConical', color: 'text-amber-400', title: 'Organic Chemistry', text: 'Your justification score of 55 shows developing understanding, not a complete gap. Focus on GOC fundamentals — your mechanism writing needs more structure. Try writing one reaction mechanism per day.' },
                  { icon: 'Zap', color: 'text-emerald-400', title: 'What\'s Working', text: 'Cell Biology (95%), Ray Optics (100%), and Ionic Equilibrium (100%) are your strongest areas. These represent ~25 NEET questions you are likely to ace. Keep reviewing them monthly to maintain mastery.' },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                    <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={s.icon} size={18} className={s.color} />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-foreground mb-1">{s.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Button variant="outline" onClick={() => navigate('/review')} iconName="RefreshCw" iconPosition="left">
                Review Mistakes
              </Button>
              <Button variant="outline" onClick={() => navigate('/study/human-physiology')} iconName="BookOpen" iconPosition="left">
                Fix Top Gap
              </Button>
              <Button onClick={() => navigate('/contest-hub')} iconName="ArrowRight" iconPosition="right" className="ml-auto">
                Next Contest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
