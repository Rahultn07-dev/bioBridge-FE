import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const questions = [
  { id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction', difficulty: 'medium', text: 'At what position of the coil is induced EMF maximum?', correctAnswer: 'B', visibility: 'PRIVATE', attempts: 142, accuracy: 67.4, source: 'Teacher Upload', created: 'Jul 10' },
  { id: 2, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'hard', text: 'In photoelectric effect, increasing intensity (freq. constant) will:', correctAnswer: 'B', visibility: 'PRIVATE', attempts: 89, accuracy: 72.1, source: 'Teacher Upload', created: 'Jul 8' },
  { id: 3, subject: 'Chemistry', chapter: 'Organic Chemistry', difficulty: 'easy', text: 'Which compound undergoes SN2 most readily?', correctAnswer: 'D', visibility: 'PRIVATE', attempts: 201, accuracy: 58.2, source: 'Teacher Upload', created: 'Jul 5' },
  { id: 4, subject: 'Biology', chapter: 'Genetics', difficulty: 'medium', text: 'In AaBb × AaBb cross, what fraction will be aabb?', correctAnswer: 'A', visibility: 'BATCH', attempts: 34, accuracy: 85.3, source: 'Teacher Upload', created: 'Jul 3' },
  { id: 5, subject: 'Physics', chapter: 'Mechanics', difficulty: 'easy', text: 'A 5kg block with μ = 0.4 — minimum force to move?', correctAnswer: 'B', visibility: 'PRIVATE', attempts: 178, accuracy: 79.8, source: 'Teacher Upload', created: 'Jun 28' },
  { id: 6, subject: 'Chemistry', chapter: 'Chemical Kinetics', difficulty: 'medium', text: 'For first-order reaction, half-life depends on:', correctAnswer: 'A', visibility: 'BATCH', attempts: 95, accuracy: 62.1, source: 'Teacher Upload', created: 'Jun 25' },
];

const diffColor = { easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20', hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
const visColor = { PRIVATE: 'text-violet-400 bg-violet-500/10 border-violet-500/20', BATCH: 'text-blue-400 bg-blue-500/10 border-blue-500/20', PUBLIC: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };

const TeacherQuestions = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [form, setForm] = useState({ subject: 'Physics', chapter: '', difficulty: 'medium', text: '', optA: '', optB: '', optC: '', optD: '', correct: 'A', visibility: 'PRIVATE', explanation: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const filtered = questions.filter(q =>
    (!search || q.text.toLowerCase().includes(search.toLowerCase())) &&
    (!subject || q.subject === subject)
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Question Bank</h1>
                <p className="text-muted-foreground text-sm mt-1">{questions.length} questions · Private to your account unless shared</p>
              </div>
              <Button onClick={() => setShowForm(v => !v)} iconName="Plus" iconPosition="left">
                Add Question
              </Button>
            </div>

            {/* Add question form */}
            {showForm && (
              <div className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Add New Question</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Subject</label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Chapter</label>
                    <input value={form.chapter} onChange={e => set('chapter', e.target.value)} placeholder="e.g. Electromagnetic Induction" className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Difficulty</label>
                    <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      {['easy', 'medium', 'hard'].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Question Text</label>
                  <textarea value={form.text} onChange={e => set('text', e.target.value)} rows={3} placeholder="Enter the question..." className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {['A', 'B', 'C', 'D'].map(opt => (
                    <div key={opt}>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Option {opt} {form.correct === opt && <span className="text-primary">(Correct)</span>}</label>
                      <div className="flex gap-2">
                        <input value={form[`opt${opt}`]} onChange={e => set(`opt${opt}`, e.target.value)} placeholder={`Option ${opt}`} className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button onClick={() => set('correct', opt)} className={`px-2 py-2 rounded-lg border text-xs font-bold transition-all ${form.correct === opt ? 'bg-primary border-primary text-white' : 'border-border text-muted-foreground hover:border-primary/50'}`}>✓</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Explanation (for students after answering)</label>
                  <textarea value={form.explanation} onChange={e => set('explanation', e.target.value)} rows={2} placeholder="Explain why the correct answer is correct..." className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Visibility</label>
                  <div className="flex gap-3">
                    {[{ v: 'PRIVATE', label: 'Private (only me)' }, { v: 'BATCH', label: 'My batch students' }, { v: 'PUBLIC', label: 'All BioBridge students' }].map(o => (
                      <button key={o.v} onClick={() => set('visibility', o.v)} className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${form.visibility === o.v ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>{o.label}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button disabled={!form.text || !form.chapter} iconName="Save" iconPosition="left">Save Question</Button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
              <div className="relative">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-52" />
              </div>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none">
                <option value="">All Subjects</option>
                {['Physics', 'Chemistry', 'Biology'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Questions list */}
            <div className="space-y-3">
              {filtered.map(q => (
                <div key={q.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
                        <span className="text-xs text-muted-foreground">{q.subject} · {q.chapter}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${visColor[q.visibility]}`}>{q.visibility}</span>
                      </div>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">{q.text}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Icon name="Users" size={11} />{q.attempts} attempts</span>
                        <span className="flex items-center gap-1"><Icon name="Target" size={11} />{q.accuracy}% accuracy</span>
                        <span>Added {q.created}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Icon name="Pencil" size={14} /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-rose-400 transition-colors"><Icon name="Trash2" size={14} /></button>
                    </div>
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

export default TeacherQuestions;
