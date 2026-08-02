import React, { useState } from 'react';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';

const students = [
  { id: 1, name: 'Raj Patel', avatar: 'RP', accuracy: 74, streak: 12, predicted: 521, doubts: 3, lastActive: '2h ago', risk: 'low' },
  { id: 2, name: 'Meena Krishnan', avatar: 'MK', accuracy: 67, streak: 7, predicted: 488, doubts: 5, lastActive: '4h ago', risk: 'low' },
  { id: 3, name: 'Suresh Kumar', avatar: 'SK', accuracy: 58, streak: 3, predicted: 451, doubts: 8, lastActive: '1 day ago', risk: 'medium' },
  { id: 4, name: 'Pooja Reddy', avatar: 'PR', accuracy: 82, streak: 21, predicted: 574, doubts: 1, lastActive: '1h ago', risk: 'low' },
  { id: 5, name: 'Asha Menon', avatar: 'AM', accuracy: 42, streak: 0, predicted: 380, doubts: 12, lastActive: '4 days ago', risk: 'high' },
  { id: 6, name: 'Nikhil Bose', avatar: 'NB', accuracy: 47, streak: 1, predicted: 401, doubts: 9, lastActive: '2 days ago', risk: 'high' },
  { id: 7, name: 'Tanya Iyer', avatar: 'TI', accuracy: 50, streak: 2, predicted: 418, doubts: 7, lastActive: '1 day ago', risk: 'medium' },
  { id: 8, name: 'Vikram Singh', avatar: 'VS', accuracy: 71, streak: 9, predicted: 503, doubts: 4, lastActive: '3h ago', risk: 'low' },
];

const riskConfig = {
  low: { label: 'On Track', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  medium: { label: 'Needs Attention', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  high: { label: 'At Risk', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

const InstitutionTeacherStudents = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.risk === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Batch B</span>
                <span className="text-xs text-muted-foreground">38 students assigned</span>
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground">My Students</h1>
              <p className="text-muted-foreground text-sm mt-0.5">View and monitor students in your assigned batch only.</p>
            </div>

            {/* Note about permissions */}
            <div className="mb-5 flex items-start gap-3 p-3.5 bg-indigo-500/6 border border-indigo-500/15 rounded-xl">
              <Icon name="Info" size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                You can view students in <span className="font-semibold text-foreground">NEET Batch B</span> only. To reassign students or manage other batches, contact your institution admin at Allen Kota.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="relative flex-1 min-w-[200px]">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search students..."
                  className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50"
                />
              </div>
              <div className="flex gap-1.5">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'high', label: 'At Risk' },
                  { key: 'medium', label: 'Needs Attention' },
                  { key: 'low', label: 'On Track' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === f.key
                        ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300'
                        : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Student table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_80px_90px_70px_90px_100px] gap-0 px-4 py-2.5 border-b border-border text-[11px] font-bold uppercase tracking-wide text-muted-foreground/70">
                <span>Student</span>
                <span className="text-center">Accuracy</span>
                <span className="text-center">Streak</span>
                <span className="text-center">Predicted</span>
                <span className="text-center">Doubts</span>
                <span className="text-center">Last Active</span>
                <span className="text-center">Status</span>
              </div>
              <div className="divide-y divide-border/50">
                {filtered.map(s => {
                  const r = riskConfig[s.risk];
                  return (
                    <div key={s.id} className="grid grid-cols-[1fr_80px_80px_90px_70px_90px_100px] gap-0 px-4 py-3 hover:bg-secondary/20 transition-colors items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-500/15 border border-teal-500/20 flex items-center justify-center text-[11px] font-bold text-teal-400 flex-shrink-0">
                          {s.avatar}
                        </div>
                        <span className="text-sm font-medium text-foreground">{s.name}</span>
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-bold font-mono ${s.accuracy >= 70 ? 'text-emerald-400' : s.accuracy >= 55 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {s.accuracy}%
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-foreground font-mono">{s.streak}d</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-mono text-foreground">{s.predicted}</span>
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-mono ${s.doubts >= 8 ? 'text-rose-400' : 'text-muted-foreground'}`}>{s.doubts}</span>
                      </div>
                      <div className="text-center text-[12px] text-muted-foreground">{s.lastActive}</div>
                      <div className="flex justify-center">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${r.bg} ${r.border} ${r.color}`}>
                          {r.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionTeacherStudents;
