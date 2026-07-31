import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const stats = [
  { label: 'Total Students', value: '247', sub: '+12 this month', icon: 'GraduationCap', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/15' },
  { label: 'Active Batches', value: '6', sub: '1 starting next week', icon: 'Layers', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/15' },
  { label: 'Teachers', value: '8', sub: '6 verified · 2 pending', icon: 'UserCheck', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/15' },
  { label: 'Avg Accuracy', value: '68.4%', sub: '+1.8% vs last month', icon: 'Target', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' },
  { label: 'Materials', value: '34', sub: '12 PDFs · 22 Videos', icon: 'FolderOpen', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
  { label: 'At-Risk', value: '23', sub: 'Accuracy < 50%', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/15' },
];

const batches = [
  { id: 1, name: 'NEET Batch A', teacher: 'Mr. Sharma', students: 42, max: 60, accuracy: 71.2, pod: 81, exam: 'NEET', risk: 3 },
  { id: 2, name: 'NEET Batch B', teacher: 'Ms. Patel', students: 38, max: 60, accuracy: 68.5, pod: 74, exam: 'NEET', risk: 5 },
  { id: 3, name: 'JEE Main 2026', teacher: 'Mr. Verma', students: 35, max: 50, accuracy: 72.8, pod: 68, exam: 'JEE', risk: 2 },
  { id: 4, name: 'NEET Dropper', teacher: 'Ms. Gupta', students: 29, max: 45, accuracy: 65.0, pod: 59, exam: 'NEET', risk: 7 },
  { id: 5, name: 'NEET Class 11', teacher: 'Mr. Iyer', students: 51, max: 60, accuracy: 58.2, pod: 62, exam: 'NEET', risk: 6 },
];

const alerts = [
  { icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/8 border-rose-500/15', text: '7 students in NEET Dropper batch have not practiced in 4+ days' },
  { icon: 'MessageCircleQuestion', color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/15', text: '3 doubts in pool awaiting teacher response for >2 hours' },
  { icon: 'Clock', color: 'text-sky-400', bg: 'bg-sky-500/8 border-sky-500/15', text: "Mr. Suresh Verma's verification is pending — limit question uploads until approved" },
];

const InstitutionDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wide">Institution</span>
                  <span className="text-xs text-muted-foreground">Allen Career Institute</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Aug 1, 2026 · BASIC Plan · 247 students across 6 batches</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/institution/batches')} iconName="Plus" iconPosition="left">New Batch</Button>
                <Button size="sm" onClick={() => navigate('/institution/materials')} iconName="Upload" iconPosition="left" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">Upload</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {stats.map((s, i) => (
                <div key={i} className={`bg-card border ${s.border} rounded-xl p-4 hover:border-opacity-40 transition-all`}>
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <Icon name={s.icon} size={15} className={s.color} />
                  </div>
                  <div className="text-xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{s.label}</div>
                  <div className={`text-[11px] mt-1 ${s.color} leading-snug`}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="space-y-2 mb-6">
                {alerts.map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${a.bg} text-sm`}>
                    <Icon name={a.icon} size={15} className={`${a.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-foreground/80">{a.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Batch overview — wide */}
              <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-foreground text-sm">Batch Overview</h3>
                  <Button size="xs" variant="ghost" onClick={() => navigate('/institution/batches')}>View All →</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/40">
                        {['Batch', 'Teacher', 'Students', 'Accuracy', 'POD', 'At Risk'].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map(b => (
                        <tr
                          key={b.id}
                          className="border-b border-border/60 hover:bg-secondary/25 transition-colors cursor-pointer"
                          onClick={() => navigate('/institution/batches')}
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-semibold text-foreground">{b.name}</div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${b.exam === 'NEET' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>{b.exam}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{b.teacher}</td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-foreground font-medium">{b.students}<span className="text-muted-foreground text-xs">/{b.max}</span></div>
                            <div className="w-12 h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(b.students / b.max) * 100}%` }} />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-bold font-mono ${b.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{b.accuracy}%</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-10 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${b.pod}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground">{b.pod}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {b.risk > 4
                              ? <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/15 px-2 py-0.5 rounded-full">{b.risk} at risk</span>
                              : <span className="text-xs text-muted-foreground">{b.risk}</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Plan usage */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-semibold text-foreground text-sm">Plan Usage</h3>
                    <Button size="xs" variant="outline">Upgrade</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Students', used: 247, max: 500, color: 'bg-sky-500' },
                      { label: 'Batches', used: 6, max: 10, color: 'bg-indigo-500' },
                      { label: 'Storage', used: 4.2, max: 20, unit: 'GB', color: 'bg-violet-500' },
                    ].map((u, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{u.label}</span>
                          <span className="text-foreground font-medium">{u.used}{u.unit || ''} / {u.max}{u.unit || ''}</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${u.color}`} style={{ width: `${(u.used / u.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    Upgrade to <span className="text-indigo-400 font-semibold">PRO</span> to enable AI Knowledge Base — upload PDFs that become searchable by your students' AI doubt solver.
                  </p>
                </div>

                {/* Quick actions */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Quick Actions</h3>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Invite Teacher', icon: 'UserPlus', path: '/institution/teachers', color: 'text-indigo-400' },
                      { label: 'Upload Material', icon: 'Upload', path: '/institution/materials', color: 'text-sky-400' },
                      { label: 'View Doubt Pool', icon: 'MessageCircleQuestion', path: '/institution/doubts', color: 'text-amber-400', badge: 3 },
                      { label: 'Create Batch', icon: 'Plus', path: '/institution/batches', color: 'text-emerald-400' },
                    ].map((a, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(a.path)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                      >
                        <Icon name={a.icon} size={14} className={a.color} />
                        <span className="text-sm text-foreground flex-1">{a.label}</span>
                        {a.badge && <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 rounded-full">{a.badge}</span>}
                        <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
