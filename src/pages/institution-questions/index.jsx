import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const questions = [
  { id: 1, subject: 'Physics', chapter: 'Electromagnetic Induction', difficulty: 'medium', text: 'At what position of the coil is induced EMF maximum?', attempts: 1842, accuracy: 67.4, visibility: 'INSTITUTION', addedBy: 'Mr. Sharma', created: 'Jul 10' },
  { id: 2, subject: 'Biology', chapter: 'Human Physiology', difficulty: 'hard', text: 'Describe the path of blood in pulmonary circulation and name all 4 chambers involved.', attempts: 2103, accuracy: 55.2, visibility: 'INSTITUTION', addedBy: 'Ms. Gupta', created: 'Jul 8' },
  { id: 3, subject: 'Chemistry', chapter: 'Organic Chemistry', difficulty: 'easy', text: 'Which compound undergoes SN2 most readily?', attempts: 3241, accuracy: 72.1, visibility: 'INSTITUTION', addedBy: 'Ms. Patel', created: 'Jul 5' },
  { id: 4, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'medium', text: 'In photoelectric effect, increasing intensity will:', attempts: 1567, accuracy: 78.3, visibility: 'INSTITUTION', addedBy: 'Mr. Sharma', created: 'Jul 3' },
  { id: 5, subject: 'Biology', chapter: 'Genetics', difficulty: 'hard', text: 'In AaBb × AaBb, what fraction of offspring will be aabb?', attempts: 980, accuracy: 82.5, visibility: 'INSTITUTION', addedBy: 'Ms. Gupta', created: 'Jun 28' },
  { id: 6, subject: 'Chemistry', chapter: 'Chemical Kinetics', difficulty: 'medium', text: 'For a first-order reaction, the half-life is:', attempts: 2458, accuracy: 61.0, visibility: 'INSTITUTION', addedBy: 'Mr. Iyer', created: 'Jun 25' },
  { id: 7, subject: 'Physics', chapter: 'Mechanics', difficulty: 'easy', text: 'Minimum force to move a 5kg block with μ = 0.4?', attempts: 4120, accuracy: 79.8, visibility: 'INSTITUTION', addedBy: 'Mr. Verma', created: 'Jun 20' },
  { id: 8, subject: 'Biology', chapter: 'Cell Biology', difficulty: 'easy', text: 'Which organelle is the powerhouse of the cell?', attempts: 5890, accuracy: 94.2, visibility: 'INSTITUTION', addedBy: 'Ms. Gupta', created: 'Jun 18' },
];

const subjectColor = { Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20', Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
const diffColor = { easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20', hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };

const InstitutionQuestions = () => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const filtered = questions.filter(q =>
    (!search || q.text.toLowerCase().includes(search.toLowerCase())) &&
    (!subject || q.subject === subject) &&
    (!difficulty || q.difficulty === difficulty)
  );

  const totalAttempts = questions.reduce((s, q) => s + q.attempts, 0);
  const avgAccuracy = (questions.reduce((s, q) => s + q.accuracy, 0) / questions.length).toFixed(1);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Question Bank</h1>
                <p className="text-muted-foreground text-sm mt-1">{questions.length} questions · Private to your institution</p>
              </div>
              <Button iconName="Upload" iconPosition="left">Upload Questions</Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Questions', value: questions.length, icon: 'FileQuestion', color: 'text-primary' },
                { label: 'Total Attempts', value: totalAttempts.toLocaleString(), icon: 'Users', color: 'text-blue-400' },
                { label: 'Avg Accuracy', value: `${avgAccuracy}%`, icon: 'Target', color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                  <Icon name={s.icon} size={20} className={s.color} />
                  <div>
                    <div className={`text-xl font-heading font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
              <div className="relative flex-1 max-w-xs">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none">
                <option value="">All Subjects</option>
                {['Physics', 'Chemistry', 'Biology'].map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none">
                <option value="">All Levels</option>
                {['easy', 'medium', 'hard'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Questions table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Question', 'Subject', 'Difficulty', 'Attempts', 'Accuracy', 'Added By', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(q => (
                      <tr key={q.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 max-w-xs">
                          <p className="text-sm text-foreground truncate">{q.text}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{q.chapter} · {q.created}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subjectColor[q.subject]}`}>{q.subject}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{q.attempts.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${q.accuracy >= 70 ? 'bg-emerald-500' : q.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${q.accuracy}%` }} />
                            </div>
                            <span className="text-sm font-mono text-foreground">{q.accuracy}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{q.addedBy}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-muted-foreground hover:text-primary transition-colors p-1"><Icon name="Pencil" size={13} /></button>
                            <button className="text-muted-foreground hover:text-rose-400 transition-colors p-1"><Icon name="Trash2" size={13} /></button>
                          </div>
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

export default InstitutionQuestions;
