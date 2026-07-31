import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const batches = [
  { id: 1, name: 'NEET Batch A', code: 'ALLEN25A', teacher: 'Mr. Sharma', students: 42, maxStudents: 60, accuracy: 71.2, pod: 81, exam: 'NEET', class: '12', status: 'ACTIVE' },
  { id: 2, name: 'NEET Batch B', code: 'ALLEN25B', teacher: 'Ms. Patel', students: 38, maxStudents: 60, accuracy: 68.5, pod: 74, exam: 'NEET', class: '12', status: 'ACTIVE' },
  { id: 3, name: 'JEE Main 2026', code: 'ALLENJEE', teacher: 'Mr. Verma', students: 35, maxStudents: 50, accuracy: 72.8, pod: 68, exam: 'JEE_MAIN', class: '12', status: 'ACTIVE' },
  { id: 4, name: 'NEET Dropper 2026', code: 'ALLENDROP', teacher: 'Ms. Gupta', students: 29, maxStudents: 45, accuracy: 65.0, pod: 59, exam: 'NEET', class: 'dropper', status: 'ACTIVE' },
  { id: 5, name: 'NEET Class 11', code: 'ALLEN11', teacher: 'Mr. Iyer', students: 51, maxStudents: 60, accuracy: 58.2, pod: 62, exam: 'NEET', class: '11', status: 'ACTIVE' },
  { id: 6, name: 'Summer Crash Course', code: 'ALLENSUMMER', teacher: 'Ms. Sharma', students: 22, maxStudents: 30, accuracy: 74.1, pod: 89, exam: 'NEET', class: '12', status: 'ACTIVE' },
];

const InstitutionBatches = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', exam: 'NEET', class: '12', teacher: '', maxStudents: 50 });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Batches</h1>
                <p className="text-muted-foreground text-sm mt-1">{batches.length}/10 batches · BASIC plan</p>
              </div>
              <Button onClick={() => setShowCreate(v => !v)} iconName="Plus" iconPosition="left">
                Create Batch
              </Button>
            </div>

            {showCreate && (
              <div className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Create New Batch</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[{ k: 'name', label: 'Batch Name', placeholder: 'e.g. NEET Batch C 2026' }].map(f => (
                    <div key={f.k}>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">{f.label}</label>
                      <input value={form[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.placeholder} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  ))}
                  {[{ k: 'exam', label: 'Target Exam', opts: ['NEET', 'JEE_MAIN', 'JEE_ADV'] }, { k: 'class', label: 'Class Level', opts: ['11', '12', 'dropper'] }].map(f => (
                    <div key={f.k}>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">{f.label}</label>
                      <select value={form[f.k]} onChange={e => set(f.k, e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Assign Teacher</label>
                    <select className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>Mr. Sharma</option><option>Ms. Patel</option><option>Mr. Verma</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Max Students</label>
                    <input type="number" value={form.maxStudents} onChange={e => set('maxStudents', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
                  <Button disabled={!form.name}>Create Batch</Button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map(b => (
                <div key={b.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{b.name}</h3>
                      <p className="text-xs text-muted-foreground">{b.teacher} · {b.exam} · Class {b.class}</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{b.status}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 mb-3">
                    <Icon name="Hash" size={13} className="text-muted-foreground" />
                    <span className="font-mono text-sm font-bold text-foreground">{b.code}</span>
                    <button className="ml-auto text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Students</span>
                      <span className="text-foreground">{b.students}/{b.maxStudents}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(b.students / b.maxStudents) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center gap-1.5"><span className="text-muted-foreground">Accuracy</span><span className={b.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}>{b.accuracy}%</span></div>
                      <div className="flex items-center gap-1.5"><span className="text-muted-foreground">POD</span><span className="text-primary">{b.pod}%</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="xs" variant="outline" className="flex-1">View Students</Button>
                    <Button size="xs" variant="ghost"><Icon name="Settings" size={13} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionBatches;
