import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const stats = [
  { label: 'Assigned Students', value: '38', sub: 'NEET Batch B', icon: 'Users', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/15' },
  { label: "Today's POD", value: '28/38', sub: '73.7% done', icon: 'Calendar', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
  { label: 'Batch Accuracy', value: '68.4%', sub: '+1.3% vs last week', icon: 'Target', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' },
  { label: 'Open Doubts', value: '4', sub: '2 escalated > 1h', icon: 'MessageCircleQuestion', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
];

const atRisk = [
  { id: 1, name: 'Asha Menon', accuracy: 42, chapter: 'Genetics', lastActive: '4 days ago' },
  { id: 2, name: 'Nikhil Bose', accuracy: 47, chapter: 'Cell Biology', lastActive: '2 days ago' },
  { id: 3, name: 'Tanya Iyer', accuracy: 50, chapter: 'Respiration', lastActive: '1 day ago' },
];

const recentDoubts = [
  { student: 'Raj Patel', question: 'Difference between C3 and C4 pathways?', subject: 'Biology', time: '15m ago', status: 'open' },
  { student: 'Meena Krishnan', question: 'Enthalpy vs entropy in spontaneous reactions', subject: 'Chemistry', time: '42m ago', status: 'open' },
  { student: 'Suresh Kumar', question: 'Newton third law in rocket propulsion', subject: 'Physics', time: '1h ago', status: 'claimed' },
  { student: 'Pooja Reddy', question: 'Crossing over and recombination frequency', subject: 'Biology', time: '2h ago', status: 'resolved' },
];

const subjectHealth = [
  { subject: 'Biology', accuracy: 71.4, trend: '+0.8%', color: 'text-emerald-400', bar: 'bg-emerald-500' },
  { subject: 'Chemistry', accuracy: 65.2, trend: '-0.3%', color: 'text-amber-400', bar: 'bg-amber-500' },
  { subject: 'Physics', accuracy: 68.9, trend: '+1.2%', color: 'text-blue-400', bar: 'bg-blue-500' },
];

const statusColors = {
  open: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  claimed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const InstitutionTeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Institution Teacher</span>
                  <span className="text-xs text-muted-foreground">Allen Kota · NEET Batch B</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Aug 2, 2026 · Biology · 38 students assigned</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/institution-teacher/doubts')} iconName="MessageCircleQuestion" iconPosition="left">
                  Doubts <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 rounded-full">4</span>
                </Button>
                <Button size="sm" onClick={() => navigate('/institution-teacher/questions')} iconName="Plus" iconPosition="left" className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white">
                  Add Question
                </Button>
              </div>
            </div>

            {/* Stats row */}
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
                  <button
                    onClick={() => navigate('/institution-teacher/students')}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    View all
                  </button>
                </div>
                <div className="divide-y divide-border/50">
                  {atRisk.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                      onClick={() => navigate(`/institution-teacher/students`)}
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
                  <div className="px-4 py-2.5 bg-secondary/20">
                    <p className="text-[11px] text-muted-foreground">
                      <span className="text-rose-400 font-semibold">Note:</span> Contact your institution admin to move students between batches.
                    </p>
                  </div>
                </div>
              </div>

              {/* Doubt queue */}
              <div className="bg-card border border-amber-500/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                    <Icon name="MessageCircleQuestion" size={14} className="text-amber-400" />
                    Doubt Queue
                  </h3>
                  <button
                    onClick={() => navigate('/institution-teacher/doubts')}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Open pool
                  </button>
                </div>
                <div className="divide-y divide-border/50">
                  {recentDoubts.map((d, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate flex-1">{d.student}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${statusColors[d.status]}`}>
                          {d.status}
                        </span>
                      </div>
                      <p className="text-[12px] text-muted-foreground line-clamp-1 mb-1">{d.question}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="text-blue-400">{d.subject}</span>
                        <span>·</span>
                        <span>{d.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject health */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Icon name="BarChart3" size={14} className="text-teal-400" />
                    Batch Subject Health
                  </h3>
                  <div className="space-y-3">
                    {subjectHealth.map((s) => (
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
                    <Icon name="Zap" size={14} className="text-teal-400" />
                    Quick Actions
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Open Doubt Queue', path: '/institution-teacher/doubts', icon: 'MessageCircleQuestion', badge: 4 },
                      { label: 'Add Explanation', path: '/institution-teacher/explanations', icon: 'PlayCircle' },
                      { label: 'View POD Schedule', path: '/institution-teacher/pod', icon: 'Calendar' },
                    ].map((a, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(a.path)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                      >
                        <Icon name={a.icon} size={13} className="text-teal-400" />
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
                  <Icon name="Calendar" size={14} className="text-teal-400" />
                  {"Today's POD — NEET Batch B"}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-teal-400">28/38 completed · 73.7%</span>
                  <span className="text-[11px] text-muted-foreground">(set by institution admin)</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden mb-3">
                <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: '73.7%' }} />
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { value: '28', label: 'Completed', color: 'text-emerald-400' },
                  { value: '6', label: 'In Progress', color: 'text-amber-400' },
                  { value: '4', label: 'Not Started', color: 'text-muted-foreground' },
                  { value: '3', label: 'At Risk', color: 'text-rose-400' },
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

export default InstitutionTeacherDashboard;
