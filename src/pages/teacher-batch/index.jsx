import React, { useState } from 'react';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherBatch = () => {
  const [form, setForm] = useState({ name: 'NEET Batch A', exam: 'NEET', class: '12', deliveryTime: '06:00', maxStudents: 60, podDifficulty: { easy: 2, medium: 2, hard: 1 }, notifications: true, autoReminder: true });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Batch Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure your batch details and POD preferences</p>
              </div>
              <Button onClick={handleSave} iconName={saved ? 'CheckCircle' : 'Save'} iconPosition="left">
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>

            {/* Batch info */}
            <div className="bg-card border border-border rounded-xl p-5 mb-5">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Users" size={16} className="text-primary" />
                Batch Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Batch Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Join Code (read-only)</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-secondary border border-border rounded-lg">
                    <span className="font-mono text-sm font-bold text-primary">TUTOR-A3K9F2</span>
                    <button className="ml-auto text-muted-foreground hover:text-primary transition-colors"><Icon name="Copy" size={14} /></button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Target Exam</label>
                  <select value={form.exam} onChange={e => set('exam', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {['NEET', 'JEE_MAIN', 'JEE_ADV'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Class Level</label>
                  <select value={form.class} onChange={e => set('class', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {['11', '12', 'dropper'].map(c => <option key={c}>Class {c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Max Students</label>
                  <input type="number" value={form.maxStudents} onChange={e => set('maxStudents', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            {/* POD Settings */}
            <div className="bg-card border border-border rounded-xl p-5 mb-5">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                Default POD Configuration
              </h3>
              <div className="mb-4">
                <label className="text-xs font-medium text-foreground mb-1.5 block">POD Delivery Time</label>
                <input type="time" value={form.deliveryTime} onChange={e => set('deliveryTime', e.target.value)} className="px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-3 block">Default Question Difficulty Split (total 5)</label>
                <div className="grid grid-cols-3 gap-4">
                  {[{ key: 'easy', label: 'Easy', color: 'text-emerald-400' }, { key: 'medium', label: 'Medium', color: 'text-amber-400' }, { key: 'hard', label: 'Hard', color: 'text-rose-400' }].map(d => (
                    <div key={d.key} className="text-center">
                      <div className={`text-2xl font-bold ${d.color} mb-2`}>{form.podDifficulty[d.key]}</div>
                      <label className="text-xs text-muted-foreground mb-2 block">{d.label}</label>
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => set('podDifficulty', { ...form.podDifficulty, [d.key]: Math.max(0, form.podDifficulty[d.key] - 1) })} className="w-7 h-7 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/50 transition-all text-lg">−</button>
                        <button onClick={() => set('podDifficulty', { ...form.podDifficulty, [d.key]: Math.min(5, form.podDifficulty[d.key] + 1) })} className="w-7 h-7 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/50 transition-all text-lg">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  Total: {form.podDifficulty.easy + form.podDifficulty.medium + form.podDifficulty.hard}/5 questions
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Bell" size={16} className="text-primary" />
                Notification Settings
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'notifications', label: 'Push notifications for students', desc: 'Send FCM push when POD is ready' },
                  { key: 'autoReminder', label: 'Auto-reminder at 7 PM', desc: 'Remind students who haven\'t completed POD' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-foreground">{n.label}</div>
                      <div className="text-xs text-muted-foreground">{n.desc}</div>
                    </div>
                    <button
                      onClick={() => set(n.key, !form[n.key])}
                      className={`w-11 h-6 rounded-full transition-all relative ${form[n.key] ? 'bg-primary' : 'bg-secondary border border-border'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form[n.key] ? 'left-5' : 'left-0.5'}`} />
                    </button>
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

export default TeacherBatch;
