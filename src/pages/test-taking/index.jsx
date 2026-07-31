import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const sections = [
  { id: 'physics', label: 'Physics', count: 45, color: 'text-blue-400' },
  { id: 'chemistry', label: 'Chemistry', count: 45, color: 'text-amber-400' },
  { id: 'biology', label: 'Biology', count: 90, color: 'text-emerald-400' },
];

const generateQuestions = () => {
  const questions = [];
  sections.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      questions.push({
        id: questions.length + 1,
        section: sec.id,
        sectionLabel: sec.label,
        text: `${sec.label} Question ${i + 1}: This is a sample ${sec.label.toLowerCase()} question about a key NEET concept.`,
        options: [
          { id: 'A', text: 'Option A answer text' },
          { id: 'B', text: 'Option B answer text' },
          { id: 'C', text: 'Option C answer text' },
          { id: 'D', text: 'Option D answer text' },
        ],
        correctAnswer: 'A',
        marks: 4,
        negativeMarks: 1,
      });
    }
  });
  return questions;
};

const allQuestions = generateQuestions();

const STATUS = { NOT_VISITED: 'not_visited', ANSWERED: 'answered', NOT_ANSWERED: 'not_answered', MARKED: 'marked', MARKED_ANSWERED: 'marked_answered' };

const statusConfig = {
  [STATUS.NOT_VISITED]: { bg: 'bg-secondary border-border text-muted-foreground', legend: 'Not Visited' },
  [STATUS.ANSWERED]: { bg: 'bg-emerald-500 border-emerald-500 text-white', legend: 'Answered' },
  [STATUS.NOT_ANSWERED]: { bg: 'bg-rose-500/20 border-rose-500/40 text-rose-400', legend: 'Not Answered' },
  [STATUS.MARKED]: { bg: 'bg-violet-500/20 border-violet-500/40 text-violet-400', legend: 'Marked for Review' },
  [STATUS.MARKED_ANSWERED]: { bg: 'bg-violet-500 border-violet-500 text-white', legend: 'Marked + Answered' },
};

const TestTaking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const DURATION = 180 * 60;

  const [currentQ, setCurrentQ] = useState(0);
  const [activeSection, setActiveSection] = useState('physics');
  const [answers, setAnswers] = useState({});
  const [statuses, setStatuses] = useState(() => Object.fromEntries(allQuestions.map(q => [q.id, STATUS.NOT_VISITED])));
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [showNav, setShowNav] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); navigate(`/contests/${id || 1}/justify`); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const q = allQuestions[currentQ];
    setSelectedOpt(answers[q.id] || null);
    if (statuses[q.id] === STATUS.NOT_VISITED) {
      setStatuses(p => ({ ...p, [q.id]: STATUS.NOT_ANSWERED }));
    }
  }, [currentQ]);

  const fmt = s => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const isUrgent = timeLeft < 600;

  const saveAndNext = () => {
    const q = allQuestions[currentQ];
    if (selectedOpt) {
      setAnswers(p => ({ ...p, [q.id]: selectedOpt }));
      setStatuses(p => ({ ...p, [q.id]: statuses[q.id] === STATUS.MARKED ? STATUS.MARKED_ANSWERED : STATUS.ANSWERED }));
    }
    if (currentQ < allQuestions.length - 1) setCurrentQ(i => i + 1);
  };

  const markForReview = () => {
    const q = allQuestions[currentQ];
    if (selectedOpt) {
      setAnswers(p => ({ ...p, [q.id]: selectedOpt }));
      setStatuses(p => ({ ...p, [q.id]: STATUS.MARKED_ANSWERED }));
    } else {
      setStatuses(p => ({ ...p, [q.id]: STATUS.MARKED }));
    }
    if (currentQ < allQuestions.length - 1) setCurrentQ(i => i + 1);
  };

  const clearResponse = () => {
    const q = allQuestions[currentQ];
    setSelectedOpt(null);
    setAnswers(p => { const n = {...p}; delete n[q.id]; return n; });
    setStatuses(p => ({ ...p, [q.id]: STATUS.NOT_ANSWERED }));
  };

  const handleSubmit = () => {
    navigate(`/contests/${id || 1}/justify`, { replace: true });
  };

  const q = allQuestions[currentQ];
  const sectionQuestions = allQuestions.filter(q => q.section === activeSection);
  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.values(statuses).filter(s => s === STATUS.MARKED || s === STATUS.MARKED_ANSWERED).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
            <Icon name="Zap" size={14} className="text-white" />
          </div>
          <span className="font-heading font-bold text-foreground text-sm hidden md:block">NEET Mock Test — Full Syllabus</span>
        </div>

        {/* Section tabs */}
        <div className="hidden md:flex gap-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setCurrentQ(allQuestions.findIndex(q => q.section === s.id)); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSection === s.id ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${isUrgent ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-secondary border-border text-foreground'}`}>
          <Icon name="Clock" size={14} className={isUrgent ? 'text-rose-400' : 'text-muted-foreground'} />
          {fmt(timeLeft)}
        </div>

        <Button size="sm" variant="destructive" onClick={() => setShowSubmitModal(true)}>
          Submit Test
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main question area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            {/* Question header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">Q{q.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  q.section === 'physics' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                  q.section === 'chemistry' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                  'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                }`}>{q.sectionLabel}</span>
                <span className="text-xs text-muted-foreground">+{q.marks} / −{q.negativeMarks}</span>
              </div>
              <button onClick={() => setShowNav(n => !n)} className="md:hidden text-muted-foreground">
                <Icon name="Grid3x3" size={18} />
              </button>
            </div>

            {/* Question */}
            <div className="bg-card border border-border rounded-xl p-5 mb-5">
              <p className="text-foreground leading-relaxed mb-6">{q.text}</p>
              <div className="space-y-3">
                {q.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOpt(opt.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      selectedOpt === opt.id ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/40'
                    }`}
                  >
                    <span className={`w-7 h-7 flex-shrink-0 rounded-lg border flex items-center justify-center text-sm font-bold transition-all ${
                      selectedOpt === opt.id ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'
                    }`}>{opt.id}</span>
                    <span className="text-sm text-foreground">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="ghost" onClick={markForReview} iconName="Bookmark" iconPosition="left">
                Mark & Next
              </Button>
              <Button size="sm" variant="ghost" onClick={clearResponse} iconName="X" iconPosition="left">
                Clear
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <Button size="sm" variant="secondary" onClick={() => currentQ > 0 && setCurrentQ(q => q - 1)} disabled={currentQ === 0}>
                  ← Prev
                </Button>
                <Button size="sm" onClick={saveAndNext} iconName="ArrowRight" iconPosition="right">
                  Save & Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <div className={`w-64 flex-shrink-0 bg-card border-l border-border flex flex-col overflow-hidden transition-all ${showNav ? 'block' : 'hidden md:block'}`}>
          <div className="p-4 border-b border-border">
            <div className="text-sm font-heading font-semibold text-foreground mb-3">Question Navigator</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {Object.entries(statusConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded border ${val.bg} flex-shrink-0`} />
                  <span className="text-muted-foreground truncate">{val.legend}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-b border-border text-xs text-muted-foreground flex gap-4">
            <span className="text-emerald-400 font-medium">{answeredCount} answered</span>
            <span className="text-violet-400 font-medium">{markedCount} marked</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {sections.map(sec => {
              const secQs = allQuestions.filter(q => q.section === sec.id);
              return (
                <div key={sec.id} className="mb-4">
                  <div className={`text-xs font-medium mb-2 ${sec.color}`}>{sec.label}</div>
                  <div className="grid grid-cols-5 gap-1">
                    {secQs.map(item => {
                      const st = statuses[item.id];
                      const cfg = statusConfig[st];
                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrentQ(allQuestions.findIndex(q => q.id === item.id))}
                          className={`w-9 h-9 rounded-lg border text-xs font-bold transition-all ${cfg.bg} ${
                            allQuestions[currentQ].id === item.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''
                          }`}
                        >
                          {item.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-border">
            <Button size="sm" className="w-full" variant="destructive" onClick={() => setShowSubmitModal(true)}>
              Submit Test
            </Button>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-heading font-bold text-foreground mb-2">Submit Test?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You have answered <span className="text-foreground font-medium">{answeredCount}/{allQuestions.length}</span> questions.
              {allQuestions.length - answeredCount > 0 && <span className="text-amber-400"> {allQuestions.length - answeredCount} unanswered.</span>}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-lg font-bold text-emerald-400">{answeredCount}</div>
                <div className="text-xs text-muted-foreground">Answered</div>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-lg font-bold text-violet-400">{markedCount}</div>
                <div className="text-xs text-muted-foreground">Marked</div>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-lg font-bold text-muted-foreground">{allQuestions.length - answeredCount}</div>
                <div className="text-xs text-muted-foreground">Unanswered</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowSubmitModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestTaking;
