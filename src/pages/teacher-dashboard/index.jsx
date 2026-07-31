import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const stats = [
  { label: 'Total Students', value: '34', sub: '+3 this week', icon: 'Users', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/15' },
  { label: "Today's POD", value: '22/34', sub: '64.7% completion', icon: 'Calendar', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/15' },
  { label: 'Batch Accuracy', value: '71.2%', sub: '+2.1% vs last week', icon: 'Target', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' },
  { label: 'At-Risk', value: '5', sub: 'Accuracy < 50%', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/15' },
];

const atRisk = [
  { id: 1, name: 'Arjun Singh', accuracy: 45, streak: 0, predicted: 380, chapter: 'Human Physiology', lastActive: '3 days ago', trend: 'down' },
  { id: 2, name: 'Priya Nair', accuracy: 51, streak: 2, predicted: 412, chapter: 'Organic Chemistry', lastActive: '1 day ago', trend: 'stable' },
  { id: 3, name: 'Riya Sharma', accuracy: 48, streak: 0, predicted: 395, chapter: 'Mechanics', lastActive: '4 days ago', trend: 'down' },
  { id: 4, name: 'Dev Patel', accuracy: 43, streak: 0, predicted: 368, chapter: 'Genetics', lastActive: '5 days ago', trend: 'down' },
];

const activity = [
  { student: 'Kabir Mehta', action: 'Completed POD', detail: 'Physics · 5/5', time: '10m ago', icon: 'CheckCircle', color: 'text-emerald-400' },
  { student: 'Deepa Pillai', action: 'Asked AI doubt', detail: 'Biology · escalated', time: '25m ago', icon: 'MessageCircleQuestion', color: 'text-amber-400' },
  { student: 'Rohan Verma', action: 'Practice session', detail: 'Chemistry · 14/18', time: '1h ago', icon: 'BookOpen', color: 'text-sky-400' },
  { student: 'Sanya Gupta', action: 'Mock test done', detail: 'Full Mock · 487/720', time: '2h ago', icon: 'Trophy', color: 'text-violet-400' },
  { student: 'Amit Kumar', action: 'Mistake review', detail: 'SM-2 · 8 cards', time: '3h ago', icon: 'RefreshCw', color: 'text-blue-400' },
];

const subjectHealth = [
  { subject: 'Physics', accuracy: 74.2, trend: '+1.8%', color: 'text-blue-400', bar: 'bg-blue-500' },
  { subject: 'Chemistry', accuracy: 68.8, trend: '+0.4%', color: 'text-amber-400', bar: 'bg-amber-500' },
  { subject: 'Biology', accuracy: 70.7, trend: '-0.2%', color: 'text-emerald-400', bar: 'bg-emerald-500' },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 uppercase tracking-wide">Teacher</span>
                  <span className="text-xs text-muted-foreground">NEET Batch A</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Aug 1, 2026 · 34 students · Physics & Chemistry</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/teacher/pod')} iconName="Calendar" iconPosition="left">Config POD</Button>
                <Button size="sm" onClick={() => navigate('/teacher/questions')} iconName="Plus" iconPosition="left" className="bg-sky-600 hover:bg-sky-700 border-sky-600">Add Question</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.map((s, i) => (
                <div key={i} className={`bg-card border ${s.border} rounded-xl p-4`}>
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <Icon name={s.icon} size={15} className={s.color} />
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                  <div className={`text-[11px] mt-1 ${s.color}`}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {/* At-risk students */}
              <div className="bg-card border border-rose-500/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                    <Icon name="AlertTriangle" size={14} className="text-rose-400" />
                    At-Risk Students
                  </h3>
                  <Button size="xs" variant="ghost" onClick={() => navigate('/teacher/students')}>All →</Button>
                </div>
                <div className="divide-y divide-border/50">
                  {atRisk.map(s => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                      onClick={() => navigate(`/teacher/students/${s.id}`)}
                    >
                      <div className="w-8 h-8 bg-rose-500/10 border border-rose-500/15 rounded-lg flex items-center justify-center text-xs font-bold text-rose-400 flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{s.chapter}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-rose-400">{s.accuracy}%</div>
                        <div className="text-[10px] text-muted-foreground">{s.lastActive}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-border">
                  <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                    <Icon name="Activity" size={14} className="text-sky-400" />
                    Student Activity
                  </h3>
                </div>
                <div className="divide-y divide-border/50">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3">
                      <div className={`w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon name={a.icon} size={12} className={a.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground">
                          <span className="font-medium">{a.student}</span>
                          <span className="text-muted-foreground"> · {a.action}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">{a.detail}</div>
                      </div>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject health */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Icon name="BarChart3" size={14} className="text-sky-400" />
                    Subject Health
                  </h3>
                  <div className="space-y-3">
                    {subjectHealth.map(s => (
                      <div key={s.subject}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className={`font-medium ${s.color}`}>{s.subject}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-foreground font-bold font-mono">{s.accuracy}%</span>
                            <span className={`text-[10px] ${s.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{s.trend}</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${s.accuracy}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Icon name="Zap" size={14} className="text-amber-400" />
                    Quick Actions
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Open Doubt Pool', path: '/teacher/doubts', icon: 'MessageCircleQuestion', badge: 3 },
                      { label: 'Add Explanation', path: '/teacher/explanations', icon: 'PlayCircle' },
                      { label: 'Configure POD', path: '/teacher/pod', icon: 'Calendar' },
                    ].map((a, i) => (
                      <button key={i} onClick={() => navigate(a.path)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left">
                        <Icon name={a.icon} size={13} className="text-sky-400" />
                        <span className="text-sm text-foreground flex-1">{a.label}</span>
                        {a.badge && <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 rounded-full">{a.badge}</span>}
                        <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* POD status bar */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                  <Icon name="Calendar" size={14} className="text-sky-400" />
                  Today's POD — NEET Batch A
                </h3>
                <span className="text-sm font-semibold text-sky-400">22/34 completed · 64.7%</span>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden mb-3">
                <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: '64.7%' }} />
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { value: '22', label: 'Completed', color: 'text-emerald-400' },
                  { value: '8', label: 'In Progress', color: 'text-amber-400' },
                  { value: '4', label: 'Not Started', color: 'text-muted-foreground' },
                  { value: '5', label: 'At Risk', color: 'text-rose-400' },
                ].map((p, i) => (
                  <div key={i} className="bg-secondary rounded-lg py-2.5 px-2">
                    <div className={`text-lg font-heading font-bold ${p.color}`}>{p.value}</div>
                    <div className="text-[11px] text-muted-foreground">{p.label}</div>
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

export default TeacherDashboard;
