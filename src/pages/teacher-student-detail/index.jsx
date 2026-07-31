import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const studentData = {
  id: 1, name: 'Arjun Singh', email: 'arjun@example.com', class: '12', exam: 'NEET',
  streak: 0, accuracy: 45.2, predicted: 380, trend: 'down', lastActive: '3 days ago',
  totalQuestions: 428, correctAnswers: 194, joinedDate: 'May 12, 2026',
  subjectAccuracy: [
    { subject: 'Physics', accuracy: 42.1, questions: 165, trend: 'down' },
    { subject: 'Chemistry', accuracy: 51.3, questions: 142, trend: 'stable' },
    { subject: 'Biology', accuracy: 44.8, questions: 121, trend: 'down' },
  ],
  weeklyData: [38, 42, 35, 48, 41, 45, 42],
  weakChapters: [
    { chapter: 'Human Physiology', accuracy: 32, neetQ: 20 },
    { chapter: 'Electromagnetic Induction', accuracy: 38, neetQ: 4 },
    { chapter: 'Organic Reactions', accuracy: 43, neetQ: 14 },
  ],
  recentActivity: [
    { date: 'Jul 14, 2026', subject: 'Physics', questions: 12, correct: 5, accuracy: 41.7 },
    { date: 'Jul 13, 2026', subject: 'Chemistry', questions: 8, correct: 4, accuracy: 50.0 },
    { date: 'Jul 11, 2026', subject: 'Biology', questions: 15, correct: 7, accuracy: 46.7 },
    { date: 'Jul 9, 2026', subject: 'Physics', questions: 10, correct: 4, accuracy: 40.0 },
  ],
};

const TeacherStudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const s = studentData;
  const [tab, setTab] = useState('overview');

  const maxWeek = Math.max(...s.weeklyData);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Back */}
            <button onClick={() => navigate('/teacher/students')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-5 transition-colors">
              <Icon name="ArrowLeft" size={14} />
              Back to Students
            </button>

            {/* Student header */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-xl font-bold text-rose-400">A</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-xl font-heading font-bold text-foreground">{s.name}</h1>
                    <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-medium">⚠️ At Risk</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{s.email} · {s.exam} Class {s.class} · Joined {s.joinedDate}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last active: {s.lastActive}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" iconName="MessageCircle" iconPosition="left">Message</Button>
                  <Button size="sm" iconName="BookOpen" iconPosition="left" onClick={() => navigate('/teacher/pod')}>Assign Study Plan</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
                <div className="text-center"><div className="text-2xl font-bold text-rose-400">{s.predicted}</div><div className="text-xs text-muted-foreground">Pred. Score /720</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-amber-400">{s.accuracy}%</div><div className="text-xs text-muted-foreground">Overall Accuracy</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-muted-foreground">{s.streak}d</div><div className="text-xs text-muted-foreground">Current Streak</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-foreground">{s.totalQuestions}</div><div className="text-xs text-muted-foreground">Total Questions</div></div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border pb-0">
              {[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Recent Activity' }, { id: 'gaps', label: 'Concept Gaps' }].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Subject breakdown */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Subject Performance</h3>
                  <div className="space-y-4">
                    {s.subjectAccuracy.map(sub => (
                      <div key={sub.subject}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-foreground">{sub.subject}</span>
                          <div className="flex items-center gap-2">
                            <Icon name={sub.trend === 'down' ? 'TrendingDown' : 'Minus'} size={12} className={sub.trend === 'down' ? 'text-rose-400' : 'text-muted-foreground'} />
                            <span className="text-rose-400 font-bold">{sub.accuracy}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${sub.accuracy}%` }} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{sub.questions} questions attempted</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly trend */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Weekly Accuracy Trend</h3>
                  <div className="flex items-end gap-2 h-32">
                    {s.weeklyData.map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div className="w-full rounded-t bg-amber-500/70 hover:bg-amber-500 transition-all" style={{ height: `${(v / maxWeek) * 100}%` }} />
                        <span className="text-xs text-muted-foreground">W{i + 1}</span>
                        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-foreground z-10">{v}%</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-amber-400 mt-3 flex items-center gap-1">
                    <Icon name="TrendingDown" size={12} />
                    Accuracy declining — down 3% vs last month
                  </p>
                </div>
              </div>
            )}

            {tab === 'activity' && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Date', 'Subject', 'Questions', 'Correct', 'Accuracy'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.recentActivity.map((a, i) => (
                      <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-muted-foreground">{a.date}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{a.subject}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{a.questions}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{a.correct}</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-bold ${a.accuracy >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{a.accuracy}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'gaps' && (
              <div className="space-y-3">
                {s.weakChapters.map(c => (
                  <div key={c.chapter} className="bg-card border border-rose-500/20 rounded-xl p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-foreground">{c.chapter}</span>
                        <span className="text-xs text-muted-foreground">NEET: {c.neetQ}Q/year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-xs h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${c.accuracy}%` }} />
                        </div>
                        <span className="text-sm text-rose-400 font-mono">{c.accuracy}%</span>
                      </div>
                    </div>
                    <Button size="xs" variant="outline" onClick={() => navigate('/teacher/pod')}>
                      Add to POD
                    </Button>
                  </div>
                ))}
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mt-4">
                  <div className="text-sm text-rose-400 font-medium mb-1">⚠️ Teacher Recommendation</div>
                  <p className="text-sm text-muted-foreground">Arjun needs immediate intervention on Human Physiology (NEET expects 20 questions). Consider scheduling a 1:1 session or assigning daily Human Physiology POD questions for the next 2 weeks.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentDetail;
