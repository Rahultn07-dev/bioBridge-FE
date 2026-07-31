import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const reportData = {
  period: 'June 2026',
  student: { name: 'Arjun Singh', exam: 'NEET', class: '12' },
  summary: { totalQuestions: 847, overallAccuracy: 71.3, studyDays: 24, avgDailyQ: 35, predictedScore: 512, peerPercentile: 78.4, streak: 12 },
  bySubject: [
    { subject: 'Physics', accuracy: 64.2, questions: 280, predictedMarks: 96, max: 180, change: +2.1, trend: 'up' },
    { subject: 'Chemistry', accuracy: 78.1, questions: 390, predictedMarks: 104, max: 180, change: +0.8, trend: 'up' },
    { subject: 'Biology', accuracy: 68.5, questions: 177, predictedMarks: 234, max: 360, change: -1.2, trend: 'down' },
  ],
  weekByWeek: [
    { week: 'Week 1', accuracy: 65.2, questions: 187 },
    { week: 'Week 2', accuracy: 68.1, questions: 210 },
    { week: 'Week 3', accuracy: 72.4, questions: 231 },
    { week: 'Week 4', accuracy: 78.0, questions: 219 },
  ],
  criticalGaps: [
    { chapter: 'Human Physiology', subject: 'Biology', accuracy: 42.1, neetQ: 20, urgency: 'CRITICAL' },
    { chapter: 'Organic Chemistry', subject: 'Chemistry', accuracy: 51.3, neetQ: 14, urgency: 'HIGH' },
    { chapter: 'EM Induction', subject: 'Physics', accuracy: 58.1, neetQ: 4, urgency: 'MEDIUM' },
  ],
  topMisconceptions: [
    "Lenz's law direction — confused coil orientation vs flux opposition",
    'SN1 vs SN2 conditions — substrate structure not considered',
    'Genetic ratios — dihybrid vs trihybrid cross confused',
  ],
  aiSummary: "You improved 6.1% this month and are in the 78th percentile among NEET Class 12 students. Your strongest growth was in Chemistry (+0.8%) but Biology is declining (-1.2%) — focus on Human Physiology which has the highest NEET weightage. Your predicted score of 512 needs to reach 600+ for a competitive medical college. The gap is closable if you fix the 3 critical chapters identified above.",
};

const urgencyColor = { CRITICAL: 'text-rose-400 bg-rose-500/10 border-rose-500/20', HIGH: 'text-amber-400 bg-amber-500/10 border-amber-500/20', MEDIUM: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };

const MonthlyReport = () => {
  const navigate = useNavigate();
  const { month } = useParams();
  const r = reportData;
  const maxWeek = Math.max(...r.weekByWeek.map(w => w.accuracy));
  const breadcrumbs = [{ label: 'Dashboard', path: '/activity-dashboard' }, { label: 'Monthly Report', path: `/reports/${month || 'june-2026'}` }];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            <BreadcrumbTrail items={breadcrumbs} />
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Monthly Report</h1>
                <p className="text-muted-foreground text-sm mt-1">{r.period} · {r.student.name} · {r.student.exam} Class {r.student.class}</p>
              </div>
              <Button variant="outline" iconName="Download" iconPosition="left">Download PDF</Button>
            </div>

            {/* Summary hero */}
            <div className="bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center"><div className="text-3xl font-heading font-bold text-primary">{r.summary.predictedScore}</div><div className="text-xs text-muted-foreground mt-1">Predicted NEET</div></div>
                <div className="text-center"><div className="text-3xl font-heading font-bold text-foreground">{r.summary.overallAccuracy}%</div><div className="text-xs text-muted-foreground mt-1">Overall Accuracy</div></div>
                <div className="text-center"><div className="text-3xl font-heading font-bold text-amber-400">{r.summary.peerPercentile}%</div><div className="text-xs text-muted-foreground mt-1">Peer Percentile</div></div>
                <div className="text-center"><div className="text-3xl font-heading font-bold text-orange-400">{r.summary.streak}</div><div className="text-xs text-muted-foreground mt-1">Current Streak</div></div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Brain" size={16} className="text-violet-400" />
                <span className="font-heading font-semibold text-foreground text-sm">AI Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.aiSummary}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Subject performance */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Subject Breakdown</h3>
                <div className="space-y-4">
                  {r.bySubject.map(s => (
                    <div key={s.subject}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-foreground font-medium">{s.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${s.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{s.change > 0 ? '+' : ''}{s.change}%</span>
                          <span className="text-foreground font-bold">{s.accuracy}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1">
                        <div className={`h-full rounded-full ${s.accuracy >= 70 ? 'bg-emerald-500' : s.accuracy >= 55 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${s.accuracy}%` }} />
                      </div>
                      <div className="text-xs text-muted-foreground">Predicted: {s.predictedMarks}/{s.max} marks · {s.questions} Q solved</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week by week */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Week-by-Week Progress</h3>
                <div className="flex items-end gap-3 h-32 mb-3">
                  {r.weekByWeek.map((w, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="w-full bg-primary/70 hover:bg-primary rounded-t transition-all" style={{ height: `${(w.accuracy / maxWeek) * 100}%` }} />
                      <span className="text-xs text-muted-foreground">{w.week.replace('Week ', 'W')}</span>
                      <div className="absolute bottom-full mb-1 hidden group-hover:block bg-popover border border-border rounded px-2 py-1 text-xs text-foreground z-10">{w.accuracy}% · {w.questions}Q</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <Icon name="TrendingUp" size={12} />
                  Accuracy improved +12.8% over the month
                </div>
              </div>
            </div>

            {/* Critical gaps */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="AlertTriangle" size={15} className="text-rose-400" />
                Critical Chapters to Fix (NEET-Weighted)
              </h3>
              <div className="space-y-3">
                {r.criticalGaps.map(c => (
                  <div key={c.chapter} className="flex items-center gap-4 p-3 bg-secondary rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{c.chapter}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${urgencyColor[c.urgency]}`}>{c.urgency}</span>
                        <span className="text-xs text-muted-foreground">NEET: {c.neetQ}Q</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-xs h-1.5 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${c.accuracy}%` }} />
                        </div>
                        <span className="text-sm text-rose-400 font-mono">{c.accuracy}%</span>
                      </div>
                    </div>
                    <Button size="xs" variant="outline" onClick={() => navigate(`/study/${c.chapter.toLowerCase().replace(/ /g, '-')}`)}>
                      Study Path →
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Brain" size={15} className="text-amber-400" />
                Top Misconceptions This Month
              </h3>
              <div className="space-y-2">
                {r.topMisconceptions.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <span className="text-amber-400 font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-foreground">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next month plan */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <Icon name="Target" size={15} className="text-emerald-400" />
                Next Month Recommended Focus
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { label: 'Human Physiology', tasks: '45 questions, focus Circulatory + Nervous system', priority: '🔴 Critical' },
                  { label: 'Organic Chemistry', tasks: '30 questions, focus GOC and reaction mechanisms', priority: '🟠 High' },
                  { label: 'EM Induction', tasks: '15 questions, Lenz\'s law concept study path', priority: '🟡 Medium' },
                ].map(f => (
                  <div key={f.label} className="bg-card border border-border rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">{f.priority}</div>
                    <div className="font-medium text-foreground text-sm mb-1">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.tasks}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
