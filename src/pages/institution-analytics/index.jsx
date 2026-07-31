import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const weeklyData = [62, 65, 68, 67, 71, 70, 73];
const subjectData = [
  { subject: 'Physics', accuracy: 67.2, questions: 8420, change: +2.1 },
  { subject: 'Chemistry', accuracy: 71.5, questions: 7350, change: +0.8 },
  { subject: 'Biology', accuracy: 65.8, questions: 14200, change: -1.2 },
];
const weakChapters = [
  { chapter: 'Human Physiology', subject: 'Biology', accuracy: 52, students: 89, neetQ: 20 },
  { chapter: 'Organic Reactions', subject: 'Chemistry', accuracy: 58, students: 74, neetQ: 14 },
  { chapter: 'EM Induction', subject: 'Physics', accuracy: 61, students: 61, neetQ: 4 },
  { chapter: 'Genetics', subject: 'Biology', accuracy: 63, students: 55, neetQ: 13 },
];

const InstitutionAnalytics = () => {
  const [period, setPeriod] = useState('month');
  const maxAccuracy = Math.max(...weeklyData);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Analytics</h1>
                <p className="text-muted-foreground text-sm mt-1">Performance overview across all batches</p>
              </div>
              <div className="flex gap-2">
                {['week', 'month', 'quarter'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${period === p ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{p}</button>
                ))}
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Avg Accuracy', value: '68.4%', change: '+1.8%', up: true, icon: 'Target' },
                { label: 'Questions Solved', value: '29,970', change: '+12%', up: true, icon: 'CheckCircle' },
                { label: 'Avg Streak', value: '6.2 days', change: '+0.8', up: true, icon: 'Flame' },
                { label: 'Avg Pred. Score', value: '462/720', change: '+14', up: true, icon: 'TrendingUp' },
              ].map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name={m.icon} size={16} className="text-primary" />
                    <span className={`text-xs font-medium ${m.up ? 'text-emerald-400' : 'text-rose-400'}`}>{m.change}</span>
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Accuracy trend */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Accuracy Trend (Last 7 Weeks)</h3>
                <div className="flex items-end gap-2 h-32">
                  {weeklyData.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="w-full bg-primary/70 hover:bg-primary rounded-t transition-all cursor-pointer" style={{ height: `${(v / maxAccuracy) * 100}%` }} />
                      <span className="text-xs text-muted-foreground">W{i + 1}</span>
                      <div className="absolute bottom-full mb-1 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-foreground z-10 whitespace-nowrap">{v}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject breakdown */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Subject Performance</h3>
                <div className="space-y-4">
                  {subjectData.map(s => (
                    <div key={s.subject}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-foreground font-medium">{s.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${s.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{s.change > 0 ? '+' : ''}{s.change}%</span>
                          <span className="text-foreground font-bold">{s.accuracy}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.accuracy >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${s.accuracy}%` }} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{s.questions.toLocaleString()} questions solved</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weak chapters */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-rose-400" />
                  Institution-Wide Weak Chapters (NEET-weighted)
                </h3>
                <Button size="xs" variant="outline" iconName="Download" iconPosition="left">Export Report</Button>
              </div>
              <div className="space-y-3">
                {weakChapters.map(c => (
                  <div key={c.chapter} className="flex items-center gap-4 p-3 bg-secondary rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{c.chapter}</span>
                        <span className="text-xs text-muted-foreground">({c.subject})</span>
                        <span className="text-xs text-muted-foreground">NEET: {c.neetQ}Q/year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden max-w-xs">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${c.accuracy}%` }} />
                        </div>
                        <span className="text-sm text-rose-400 font-mono">{c.accuracy}% avg accuracy</span>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-foreground font-medium">{c.students}</div>
                      <div className="text-xs text-muted-foreground">students struggling</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
                <Icon name="Lightbulb" size={12} className="text-amber-400" />
                Recommendation: Configure special PODs on Human Physiology and Organic Reactions for all NEET batches this week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionAnalytics;
