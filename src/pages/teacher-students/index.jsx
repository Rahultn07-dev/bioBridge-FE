import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const students = [
  { id: 1, name: 'Kabir Mehta', streak: 14, accuracy: 78.4, predicted: 512, trend: 'up', lastActive: '10 min ago', pod: true, risk: 'low' },
  { id: 2, name: 'Deepa Pillai', streak: 7, accuracy: 71.2, predicted: 474, trend: 'up', lastActive: '25 min ago', pod: true, risk: 'low' },
  { id: 3, name: 'Sanya Gupta', streak: 3, accuracy: 68.5, predicted: 451, trend: 'stable', lastActive: '2 hrs ago', pod: true, risk: 'medium' },
  { id: 4, name: 'Rohan Verma', streak: 8, accuracy: 65.0, predicted: 433, trend: 'stable', lastActive: '1 hr ago', pod: false, risk: 'medium' },
  { id: 5, name: 'Arjun Singh', streak: 0, accuracy: 45.2, predicted: 380, trend: 'down', lastActive: '3 days ago', pod: false, risk: 'high' },
  { id: 6, name: 'Priya Nair', streak: 2, accuracy: 51.3, predicted: 412, trend: 'stable', lastActive: '1 day ago', pod: false, risk: 'high' },
  { id: 7, name: 'Riya Sharma', streak: 0, accuracy: 48.1, predicted: 395, trend: 'down', lastActive: '4 days ago', pod: false, risk: 'high' },
  { id: 8, name: 'Amit Kumar', streak: 12, accuracy: 82.0, predicted: 551, trend: 'up', lastActive: '30 min ago', pod: true, risk: 'low' },
];

const riskConfig = {
  low: { label: 'On Track', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  medium: { label: 'Watch', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  high: { label: 'At Risk', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
};

const TeacherStudents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'risk' && s.risk === 'high') || (filter === 'pod' && !s.pod);
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">My Students</h1>
                <p className="text-muted-foreground text-sm mt-1">{students.length} students · NEET Batch A</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="Share2" size={14} />
                <span className="font-mono font-bold text-foreground">TUTOR-A3K9F2</span>
                <button className="text-primary hover:text-primary/80 transition-colors"><Icon name="Copy" size={13} /></button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
              </div>
              {['all', 'risk', 'pod'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                  {f === 'all' ? 'All' : f === 'risk' ? '⚠️ At Risk' : '📅 POD Missing'}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Student</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Streak</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Accuracy</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pred. Score</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">POD Today</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Active</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => {
                      const rc = riskConfig[s.risk];
                      return (
                        <tr key={s.id} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => navigate(`/teacher/students/${s.id}`)}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s.risk === 'high' ? 'bg-rose-500/10 text-rose-400' : 'bg-primary/10 text-primary'}`}>{s.name[0]}</div>
                              <span className="text-sm font-medium text-foreground">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${rc.bg} ${rc.color}`}>{rc.label}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-sm">
                              <Icon name="Flame" size={13} className={s.streak > 0 ? 'text-orange-400' : 'text-muted-foreground'} />
                              <span className={s.streak > 0 ? 'text-foreground' : 'text-muted-foreground'}>{s.streak}d</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${s.accuracy >= 70 ? 'bg-emerald-500' : s.accuracy >= 55 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${s.accuracy}%` }} />
                              </div>
                              <span className={`text-sm font-mono ${s.accuracy >= 70 ? 'text-emerald-400' : s.accuracy >= 55 ? 'text-amber-400' : 'text-rose-400'}`}>{s.accuracy}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-foreground">{s.predicted}</span>
                              <span className="text-xs text-muted-foreground">/720</span>
                              <Icon name={s.trend === 'up' ? 'TrendingUp' : s.trend === 'down' ? 'TrendingDown' : 'Minus'} size={12} className={s.trend === 'up' ? 'text-emerald-400' : s.trend === 'down' ? 'text-rose-400' : 'text-muted-foreground'} />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {s.pod ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-400"><Icon name="CheckCircle" size={13} />Done</span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Icon name="Circle" size={13} />Pending</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{s.lastActive}</td>
                          <td className="px-4 py-3">
                            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                          </td>
                        </tr>
                      );
                    })}
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

export default TeacherStudents;
