import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const todayPOD = {
  date: 'Jul 16, 2026',
  completionRate: 64.7,
  questions: [
    { id: 101, subject: 'Physics', chapter: 'EM Induction', difficulty: 'medium', text: 'At what position is induced EMF maximum?' },
    { id: 102, subject: 'Chemistry', chapter: 'Chemical Kinetics', difficulty: 'easy', text: 'For first-order reaction, half-life is...' },
    { id: 103, subject: 'Biology', chapter: 'Genetics', difficulty: 'medium', text: 'What fraction will be aabb in AaBb × AaBb?' },
    { id: 104, subject: 'Physics', chapter: 'Modern Physics', difficulty: 'hard', text: 'Photoelectric effect: increase intensity →?' },
    { id: 105, subject: 'Biology', chapter: 'Cell Biology', difficulty: 'easy', text: 'Which organelle is called "powerhouse"?' },
  ],
};

const subjectColors = {
  Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};
const diffColors = { easy: 'text-emerald-400', medium: 'text-amber-400', hard: 'text-rose-400' };

const TeacherPOD = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [chapter, setChapter] = useState('');
  const [selectedQs, setSelectedQs] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('06:00');
  const [saved, setSaved] = useState(false);

  const toggleQ = (id) => setSelectedQs(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const questionPool = [
    { id: 201, subject: 'Physics', chapter: 'Mechanics', difficulty: 'easy', text: 'What is the minimum force to move a 5kg block with μ = 0.4?' },
    { id: 202, subject: 'Biology', chapter: 'Human Physiology', difficulty: 'medium', text: 'Describe the path of blood in pulmonary circulation.' },
    { id: 203, subject: 'Chemistry', chapter: 'Organic', difficulty: 'hard', text: 'Which compound undergoes SN2 most readily?' },
    { id: 204, subject: 'Physics', chapter: 'EM Induction', difficulty: 'medium', text: 'When is induced EMF maximum in a rotating coil?' },
    { id: 205, subject: 'Biology', chapter: 'Genetics', difficulty: 'easy', text: 'What is the genotype ratio in a monohybrid cross?' },
  ];

  const filteredPool = questionPool.filter(q =>
    (!subject || q.subject === subject) &&
    (!difficulty || q.difficulty === difficulty) &&
    (!chapter || q.chapter.toLowerCase().includes(chapter.toLowerCase()))
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">POD Builder</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure tomorrow's Practice of the Day for your batch</p>
              </div>
              <Button onClick={handleSave} iconName={saved ? 'CheckCircle' : 'Save'} iconPosition="left" disabled={selectedQs.length === 0}>
                {saved ? 'Saved!' : 'Save POD'}
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's POD status */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  Today's POD — {todayPOD.date}
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="text-primary font-medium">{todayPOD.completionRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${todayPOD.completionRate}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  {todayPOD.questions.map((q, i) => (
                    <div key={q.id} className="flex items-center gap-3 p-2.5 bg-secondary rounded-lg">
                      <span className="w-5 h-5 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded border ${subjectColors[q.subject]}`}>{q.subject}</span>
                      <span className="text-sm text-foreground flex-1 truncate">{q.text}</span>
                      <span className={`text-xs font-medium ${diffColors[q.difficulty]}`}>{q.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configure tomorrow's POD */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Plus" size={16} className="text-primary" />
                  Configure Tomorrow's POD
                </h3>

                {/* Delivery time */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Delivery Time</label>
                  <input type="time" value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                    <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="">All</option>
                      {['Physics', 'Chemistry', 'Biology'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Difficulty</label>
                    <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="">All</option>
                      {['easy', 'medium', 'hard'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chapter (search)</label>
                  <input type="text" value={chapter} onChange={e => setChapter(e.target.value)} placeholder="e.g. EM Induction" className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>

                {/* Question pool */}
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Select up to 10 questions ({selectedQs.length} selected)
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredPool.map(q => (
                    <div key={q.id} onClick={() => toggleQ(q.id)} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedQs.includes(q.id) ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/40'}`}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${selectedQs.includes(q.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                        {selectedQs.includes(q.id) && <Icon name="Check" size={10} className="text-white" />}
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded border flex-shrink-0 ${subjectColors[q.subject]}`}>{q.subject}</span>
                      <span className="text-sm text-foreground flex-1 truncate">{q.text}</span>
                      <span className={`text-xs ${diffColors[q.difficulty]} flex-shrink-0`}>{q.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPOD;
