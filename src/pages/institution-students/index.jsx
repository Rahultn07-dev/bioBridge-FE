import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const students = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ['Arjun Singh', 'Priya Nair', 'Kabir Mehta', 'Deepa Pillai', 'Riya Sharma', 'Rohan Verma', 'Sanya Gupta', 'Amit Kumar', 'Pooja Iyer', 'Dev Patel', 'Sara Khan', 'Nikhil Rao'][i],
  batch: ['NEET Batch A', 'NEET Batch A', 'NEET Batch B', 'NEET Batch B', 'JEE Main 2026', 'JEE Main 2026', 'NEET Dropper', 'NEET Dropper', 'NEET Class 11', 'NEET Class 11', 'Summer Crash', 'Summer Crash'][i],
  accuracy: [45, 71, 82, 68, 48, 65, 78, 74, 56, 81, 63, 88][i],
  streak: [0, 7, 14, 4, 0, 8, 11, 3, 2, 19, 5, 22][i],
  predicted: [380, 474, 551, 451, 395, 433, 512, 487, 412, 567, 428, 601][i],
  risk: ['high', 'low', 'low', 'medium', 'high', 'medium', 'low', 'low', 'high', 'low', 'medium', 'low'][i],
}));

const InstitutionStudents = () => {
  const [search, setSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('all');

  const batches = ['All', 'NEET Batch A', 'NEET Batch B', 'JEE Main 2026', 'NEET Dropper'];
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (batchFilter === 'All' || s.batch === batchFilter) &&
    (riskFilter === 'all' || s.risk === riskFilter)
  );

  const riskConfig = { low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'On Track' }, medium: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Watch' }, high: { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', label: 'At Risk' } };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">All Students</h1>
                <p className="text-muted-foreground text-sm mt-1">{students.length} students across all batches</p>
              </div>
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">Export CSV</Button>
            </div>

            <div className="flex gap-3 mb-6 flex-wrap">
              <div className="relative">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-48" />
              </div>
              <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)} className="px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none">
                {batches.map(b => <option key={b}>{b}</option>)}
              </select>
              {['all', 'high', 'medium', 'low'].map(f => (
                <button key={f} onClick={() => setRiskFilter(f)} className={`px-3 py-2 rounded-lg text-sm transition-all ${riskFilter === f ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                  {f === 'all' ? 'All' : f === 'high' ? '⚠️ At Risk' : f === 'medium' ? '👀 Watch' : '✅ On Track'}
                </button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Student', 'Batch', 'Status', 'Accuracy', 'Streak', 'Pred. Score'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => {
                      const rc = riskConfig[s.risk];
                      return (
                        <tr key={s.id} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s.risk === 'high' ? 'bg-rose-500/10 text-rose-400' : 'bg-primary/10 text-primary'}`}>{s.name[0]}</div>
                              <span className="text-sm font-medium text-foreground">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{s.batch}</td>
                          <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${rc.bg} ${rc.color}`}>{rc.label}</span></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden"><div className={`h-full rounded-full ${s.accuracy >= 70 ? 'bg-emerald-500' : s.accuracy >= 55 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${s.accuracy}%` }} /></div>
                              <span className={`text-sm font-mono ${s.accuracy >= 70 ? 'text-emerald-400' : s.accuracy >= 55 ? 'text-amber-400' : 'text-rose-400'}`}>{s.accuracy}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Icon name="Flame" size={13} className={s.streak > 0 ? 'text-orange-400' : 'text-muted-foreground'} />
                              <span className={s.streak > 0 ? 'text-foreground' : 'text-muted-foreground'}>{s.streak}d</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-bold ${s.predicted >= 500 ? 'text-emerald-400' : s.predicted >= 400 ? 'text-amber-400' : 'text-rose-400'}`}>{s.predicted}</span>
                            <span className="text-xs text-muted-foreground">/720</span>
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

export default InstitutionStudents;
