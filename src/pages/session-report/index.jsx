import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const reportData = {
  session: { subject: 'Physics', chapter: 'Electromagnetic Induction', mode: 'PRACTICE', date: 'Jul 16, 2026' },
  stats: { total: 18, correct: 13, wrong: 5, accuracy: 72.2, timeMinutes: 28, avgTimePerQ: 93 },
  timePerQuestion: [45, 120, 67, 243, 89, 55, 178, 34, 92, 156, 78, 44, 201, 88, 63, 97, 142, 71],
  strongConcepts: [
    { tag: 'self-inductance', label: 'Self-Inductance', correct: 5, total: 5 },
    { tag: 'mutual-inductance', label: 'Mutual Inductance', correct: 4, total: 4 },
    { tag: 'faradays-law-basics', label: "Faraday's Law Basics", correct: 4, total: 4 },
  ],
  weakConcepts: [
    { tag: 'lenzs-law', label: "Lenz's Law Direction", correct: 2, total: 5, neetQuestions: 4, urgency: 'HIGH' },
    { tag: 'flux-calculation', label: 'Flux Calculation', correct: 1, total: 3, neetQuestions: 3, urgency: 'MEDIUM' },
    { tag: 'back-emf', label: 'Back EMF in Motors', correct: 0, total: 2, neetQuestions: 2, urgency: 'HIGH', newGap: true },
  ],
  aiSuggestions: [
    { icon: 'BookOpen', color: 'text-blue-400', text: "Study Lenz's Law using the right-hand rule method. You've confused direction 3 times — revisit NCERT Class 12 Ch.6 Page 134." },
    { icon: 'Target', color: 'text-amber-400', text: 'Your accuracy drops to 33% on questions involving flux direction. Try 5 easy questions on this concept before doing medium/hard.' },
    { icon: 'TrendingUp', color: 'text-emerald-400', text: 'You answered 72% correctly in 28 min — above your 30-day average of 68%. Good session overall.' },
  ],
  justificationScores: [
    { concept: "Lenz's Law Direction", score: 78, badge: '🧠', label: 'Careless Mistake', color: 'text-blue-400' },
    { concept: 'Flux Calculation', score: 22, badge: '❌', label: 'Conceptual Gap', color: 'text-rose-400' },
  ],
  recommendedQuestions: [
    { id: 'Q142', subject: 'Physics', chapter: 'EM Induction', concept: "Lenz's Law", difficulty: 'easy', reason: 'Address weak concept' },
    { id: 'Q198', subject: 'Physics', chapter: 'EM Induction', concept: 'Flux Calculation', difficulty: 'easy', reason: 'Reinforce understanding' },
    { id: 'Q205', subject: 'Physics', chapter: 'EM Induction', concept: 'Back EMF', difficulty: 'easy', reason: 'New gap detected' },
  ],
  potentialMarks: 16,
};

const SessionReport = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const r = reportData;

  const maxTime = Math.max(...r.timePerQuestion);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="CheckCircle" size={18} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Session Complete</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {r.session.subject} — {r.session.chapter}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">{r.session.date} · {r.session.mode} mode</p>
              </div>
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Download PDF
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Accuracy', value: `${r.stats.accuracy}%`, sub: `${r.stats.correct}/${r.stats.total}`, color: r.stats.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400', icon: 'Target' },
                { label: 'Time Spent', value: `${r.stats.timeMinutes}m`, sub: `${r.stats.avgTimePerQ}s avg/Q`, color: 'text-blue-400', icon: 'Clock' },
                { label: 'Wrong Answers', value: r.stats.wrong, sub: 'Added to SM-2 queue', color: 'text-rose-400', icon: 'XCircle' },
                { label: 'Potential NEET', value: `+${r.potentialMarks}`, sub: 'marks if gaps fixed', color: 'text-violet-400', icon: 'TrendingUp' },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} size={14} className={s.color} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border pb-0">
              {[
                { id: 'overview', label: 'Overview', icon: 'BarChart2' },
                { id: 'concepts', label: 'Concepts', icon: 'Grid3x3' },
                { id: 'timing', label: 'Time Analysis', icon: 'Clock' },
                { id: 'ai', label: 'AI Suggestions', icon: 'Brain' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                    activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={t.icon} size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                    Strong Today
                  </h3>
                  <div className="space-y-3">
                    {r.strongConcepts.map(c => (
                      <div key={c.tag} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{c.label}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(c.correct / c.total) * 100}%` }} />
                          </div>
                          <span className="text-xs text-emerald-400 font-mono w-10 text-right">{c.correct}/{c.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-rose-400" />
                    Needs Work
                  </h3>
                  <div className="space-y-3">
                    {r.weakConcepts.map(c => (
                      <div key={c.tag} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{c.label}</span>
                          {c.newGap && <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-1.5 rounded-full">New</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(c.correct / c.total) * 100}%` }} />
                          </div>
                          <span className="text-xs text-rose-400 font-mono w-10 text-right">{c.correct}/{c.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-amber-400 flex items-center gap-1.5">
                    <Icon name="Zap" size={12} />
                    Fix these {r.weakConcepts.length} concepts = +{r.potentialMarks} potential NEET marks
                  </div>
                </div>

                {/* Justification scores */}
                {r.justificationScores.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-5 lg:col-span-2">
                    <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Icon name="Brain" size={16} className="text-violet-400" />
                      Understanding Scores (from your justifications)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {r.justificationScores.map((j, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <span className="text-xl">{j.badge}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">{j.concept}</div>
                            <div className={`text-xs ${j.color}`}>{j.label}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-bold font-mono ${j.color}`}>{j.score}</div>
                            <div className="text-xs text-muted-foreground">/100</div>
                          </div>
                          <div className="w-1 h-10 bg-secondary rounded-full overflow-hidden rotate-180">
                            <div className={`w-full rounded-full transition-all`} style={{ height: `${j.score}%`, background: j.score >= 65 ? '#10B981' : '#EF4444' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timing' && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-2">Time per Question (seconds)</h3>
                <p className="text-sm text-muted-foreground mb-6">Avg: {r.stats.avgTimePerQ}s · Questions taking 2× avg may indicate conceptual difficulty</p>
                <div className="flex items-end gap-1.5 h-40">
                  {r.timePerQuestion.map((t, i) => {
                    const isHigh = t > r.stats.avgTimePerQ * 1.5;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          className={`w-full rounded-t transition-all cursor-pointer ${isHigh ? 'bg-amber-500 hover:bg-amber-400' : 'bg-primary/70 hover:bg-primary'}`}
                          style={{ height: `${(t / maxTime) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{i + 1}</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-foreground whitespace-nowrap z-10">
                          Q{i + 1}: {t}s {isHigh ? '⚠️ high' : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary/70 inline-block" /> Normal</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500 inline-block" /> &gt;1.5× avg (may indicate difficulty)</span>
                </div>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div className="space-y-4">
                {[...r.strongConcepts.map(c => ({ ...c, accuracy: Math.round((c.correct / c.total) * 100), strong: true })),
                  ...r.weakConcepts.map(c => ({ ...c, accuracy: Math.round((c.correct / c.total) * 100), strong: false }))
                ].sort((a, b) => b.accuracy - a.accuracy).map(c => (
                  <div key={c.tag} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 text-center">
                      <div className={`text-xl font-bold font-mono ${c.accuracy >= 70 ? 'text-emerald-400' : c.accuracy >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>{c.accuracy}%</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">{c.label}</span>
                        {c.newGap && <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-1.5 rounded-full">New gap</span>}
                        {!c.strong && c.neetQuestions && (
                          <span className="text-xs text-muted-foreground">NEET asks {c.neetQuestions}Q</span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${c.accuracy >= 70 ? 'bg-emerald-500' : c.accuracy >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${c.accuracy}%` }}
                        />
                      </div>
                    </div>
                    {!c.strong && (
                      <Button size="xs" variant="outline" onClick={() => navigate(`/study/${c.tag}`)}>
                        Study Path →
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-4">
                {r.aiSuggestions.map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-secondary`}>
                      <Icon name={s.icon} size={18} className={s.color} />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{s.text}</p>
                  </div>
                ))}

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="List" size={16} className="text-primary" />
                    Recommended Next Questions
                  </h3>
                  <div className="space-y-2">
                    {r.recommendedQuestions.map(q => (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">{q.id}</span>
                          <div>
                            <div className="text-sm text-foreground">{q.concept}</div>
                            <div className="text-xs text-muted-foreground">{q.subject} · {q.difficulty}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{q.reason}</span>
                          <Button size="xs" variant="outline">Solve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => navigate('/review')} iconName="RefreshCw" iconPosition="left">
                Review Mistakes
              </Button>
              <Button variant="outline" onClick={() => navigate(`/study/lenzs-law`)} iconName="BookOpen" iconPosition="left">
                Start Study Path
              </Button>
              <Button onClick={() => navigate('/activity-dashboard', { replace: true })} iconName="Home" iconPosition="left" className="ml-auto">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionReport;
