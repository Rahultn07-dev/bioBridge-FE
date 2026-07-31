import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const stats = [
  { label: 'Total Students', value: '247', trend: '+12 this month', icon: 'GraduationCap', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Active Batches', value: '6', trend: '1 starting next week', icon: 'Users', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Teachers', value: '8', trend: '2 verified', icon: 'UserCheck', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { label: 'Avg Accuracy', value: '68.4%', trend: '+1.8% vs last month', icon: 'Target', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Materials', value: '34', trend: '12 PDFs · 22 Videos', icon: 'FolderOpen', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'At-Risk Students', value: '23', trend: 'Need attention', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const batches = [
  { id: 1, name: 'NEET Batch A', teacher: 'Mr. Sharma', students: 42, accuracy: 71.2, pod: 81, exam: 'NEET' },
  { id: 2, name: 'NEET Batch B', teacher: 'Ms. Patel', students: 38, accuracy: 68.5, pod: 74, exam: 'NEET' },
  { id: 3, name: 'JEE Main 2026', teacher: 'Mr. Verma', students: 35, accuracy: 72.8, pod: 68, exam: 'JEE' },
  { id: 4, name: 'NEET Dropper', teacher: 'Ms. Gupta', students: 29, accuracy: 65.0, pod: 59, exam: 'NEET' },
];

const InstitutionDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Allen Career Institute · BASIC Plan · Jul 16, 2026</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/institution/batches')} iconName="Plus" iconPosition="left">
                  New Batch
                </Button>
                <Button size="sm" onClick={() => navigate('/institution/materials')} iconName="Upload" iconPosition="left">
                  Upload Material
                </Button>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                    <Icon name={s.icon} size={16} className={s.color} />
                  </div>
                  <div className="text-xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  <div className={`text-xs mt-1 ${s.color}`}>{s.trend}</div>
                </div>
              ))}
            </div>

            {/* Plan usage */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">Plan Usage — BASIC</h3>
                <Button size="xs" variant="outline">Upgrade to PRO</Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Students', used: 247, max: 500, color: 'bg-blue-500' },
                  { label: 'Batches', used: 6, max: 10, color: 'bg-primary' },
                  { label: 'Storage', used: 4.2, max: 20, unit: 'GB', color: 'bg-violet-500' },
                ].map((u, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{u.label}</span>
                      <span className="text-foreground font-medium">{u.used}{u.unit || ''} / {u.max}{u.unit || ''}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${u.color}`} style={{ width: `${(u.used / u.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Upgrade to PRO to enable <strong className="text-foreground">AI Knowledge Base</strong> — upload PDFs/videos that become searchable by your students' AI doubt solver.
              </p>
            </div>

            {/* Batch overview */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Batch Overview</h3>
                <Button size="xs" variant="ghost" onClick={() => navigate('/institution/batches')}>View All →</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Batch', 'Teacher', 'Students', 'Accuracy', 'POD Completion', 'Exam'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map(b => (
                      <tr key={b.id} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => navigate(`/institution/batches`)}>
                        <td className="px-4 py-3">
                          <span className="font-medium text-foreground text-sm">{b.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{b.teacher}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{b.students}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${b.accuracy >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${b.accuracy}%` }} />
                            </div>
                            <span className="text-sm font-mono text-foreground">{b.accuracy}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${b.pod}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground">{b.pod}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${b.exam === 'NEET' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>{b.exam}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
