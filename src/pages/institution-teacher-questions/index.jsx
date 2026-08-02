import React, { useState } from 'react';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const questions = [
  { id: 1, subject: 'Biology', chapter: 'Photosynthesis', type: 'MCQ', difficulty: 'Medium', text: 'Which pigment absorbs maximum light at 680nm in photosystem II?', attempts: 24, accuracy: 67, addedBy: 'me', createdAt: '3 days ago' },
  { id: 2, subject: 'Biology', chapter: 'Respiration', type: 'MCQ', difficulty: 'Hard', text: 'During oxidative phosphorylation, how many ATP molecules are produced per NADH?', attempts: 31, accuracy: 52, addedBy: 'me', createdAt: '5 days ago' },
  { id: 3, subject: 'Chemistry', chapter: 'Thermodynamics', type: 'MCQ', difficulty: 'Easy', text: 'A reaction with ΔG < 0 is classified as:', attempts: 18, accuracy: 83, addedBy: 'institution', createdAt: '1 week ago' },
  { id: 4, subject: 'Biology', chapter: 'Genetics', type: 'MSQ', difficulty: 'Hard', text: 'Which of the following are post-transcriptional modifications in eukaryotes?', attempts: 14, accuracy: 44, addedBy: 'me', createdAt: '2 weeks ago' },
  { id: 5, subject: 'Physics', chapter: 'Laws of Motion', type: 'MCQ', difficulty: 'Medium', text: 'A 5 kg block on a frictionless surface is pushed with 20N. Its acceleration is:', attempts: 38, accuracy: 79, addedBy: 'institution', createdAt: '2 weeks ago' },
];

const difficultyColor = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const subjectColor = { Biology: 'text-emerald-400', Chemistry: 'text-amber-400', Physics: 'text-blue-400' };

const InstitutionTeacherQuestions = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [filterSubject, setFilterSubject] = useState('All');

  const filtered = filterSubject === 'All' ? questions : questions.filter(q => q.subject === filterSubject);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-5 md:p-7">

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Batch B</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Question Bank</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Questions you've added and institution-shared questions for your batch.</p>
              </div>
              <Button size="sm" onClick={() => setShowAdd(true)} iconName="Plus" iconPosition="left" className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white">
                Add Question
              </Button>
            </div>

            {/* Add question panel */}
            {showAdd && (
              <div className="mb-5 bg-card border border-teal-500/20 rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
                  <Icon name="Plus" size={14} className="text-teal-400" />
                  New Question
                </h3>
                <div className="grid md:grid-cols-3 gap-3 mb-3">
                  {[
                    { label: 'Subject', placeholder: 'Biology', type: 'text' },
                    { label: 'Chapter', placeholder: 'Photosynthesis', type: 'text' },
                    { label: 'Difficulty', placeholder: 'Medium', type: 'text' },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Question Text</label>
                  <textarea rows={3} placeholder="Enter the question..." className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 resize-none" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white" iconName="Check" iconPosition="left">Save Question</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {/* Subject filter */}
            <div className="flex gap-1.5 mb-5">
              {['All', 'Biology', 'Chemistry', 'Physics'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSubject(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterSubject === s
                      ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300'
                      : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filtered.map(q => (
                <div key={q.id} className="bg-card border border-border rounded-xl px-4 py-3.5 hover:border-border-strong transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-xs font-semibold ${subjectColor[q.subject] || 'text-muted-foreground'}`}>{q.subject}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs text-muted-foreground">{q.chapter}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded border ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                        <span className="text-[11px] bg-secondary border border-border text-muted-foreground px-1.5 py-0.5 rounded">{q.type}</span>
                        {q.addedBy === 'institution' && (
                          <span className="text-[11px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">Institution</span>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{q.text}</p>
                    </div>
                    <div className="flex-shrink-0 text-right space-y-0.5">
                      <div className="text-sm font-bold font-mono text-foreground">{q.accuracy}%</div>
                      <div className="text-[11px] text-muted-foreground">{q.attempts} attempts</div>
                      <div className="text-[11px] text-muted-foreground">{q.createdAt}</div>
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

export default InstitutionTeacherQuestions;
