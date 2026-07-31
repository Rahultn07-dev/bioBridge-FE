import React, { useState } from 'react';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

/* ── Mock data ─────────────────────────────────────────────── */
const poolDoubts = [
  {
    id: 'd1',
    student: 'Arjun Singh',
    studentBatch: 'NEET Batch A',
    subject: 'Biology',
    chapter: 'Cell Division',
    question: 'I understand crossing over happens during meiosis, but my teacher says the AI explanation is wrong — the chiasma forms at a different stage than what the AI described. Can you clarify exactly when and where chiasmata form during Prophase I?',
    submittedAt: '10 min ago',
    aiAttempt: "During Prophase I of meiosis, crossing over occurs at the pachytene stage when homologous chromosomes are fully synapsed. Chiasmata (the visible X-shaped structures) form at the diplotene stage as the homologs begin to separate but remain held together at crossover points.",
    aiScore: 52,
    status: 'open',
    priority: 'urgent',
    claimedBy: null,
  },
  {
    id: 'd2',
    student: 'Priya Nair',
    studentBatch: 'NEET Batch B',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    question: "How do I identify the major product in elimination reactions? I'm confused between Saytzeff and Hofmann rules — when do I apply which one?",
    submittedAt: '28 min ago',
    aiAttempt: "Saytzeff's rule predicts the more substituted (stable) alkene as major product for strong bases with small nucleophiles (e.g., KOH/ethanol). Hofmann's rule applies when bulky bases (e.g., (CH₃)₃COK) are used — steric hindrance forces attack on the less hindered hydrogen, giving the less substituted alkene.",
    aiScore: 78,
    status: 'in_review',
    priority: 'normal',
    claimedBy: 'Ms. Priya Patel',
  },
  {
    id: 'd3',
    student: 'Rohan Verma',
    studentBatch: 'JEE Main 2026',
    subject: 'Physics',
    chapter: 'Electromagnetism',
    question: 'In a parallel LCR circuit at resonance, why does impedance become maximum rather than minimum? My textbook says minimum but my coaching notes say maximum.',
    submittedAt: '1 hr ago',
    aiAttempt: "For a parallel LCR circuit at resonance, impedance is MAXIMUM (not minimum). This is the opposite of a series circuit where impedance is minimum at resonance. In parallel, at resonance the circulating current between L and C is maximum but the supply current is minimum because the reactive components cancel each other's admittance.",
    aiScore: 65,
    status: 'open',
    priority: 'normal',
    claimedBy: null,
  },
  {
    id: 'd4',
    student: 'Deepa Pillai',
    studentBatch: 'NEET Batch A',
    subject: 'Biology',
    chapter: 'Human Physiology',
    question: 'What is the difference between excitatory and inhibitory postsynaptic potentials? How do they interact when both occur simultaneously at the same neuron?',
    submittedAt: '2 hrs ago',
    aiAttempt: 'EPSPs depolarize the membrane (make it less negative) while IPSPs hyperpolarize it (make it more negative). When both occur simultaneously, they undergo spatial and temporal summation — the algebraic sum determines whether the threshold is reached and an action potential fires.',
    aiScore: 88,
    status: 'resolved',
    priority: 'normal',
    claimedBy: 'Dr. Meera Iyer',
    resolvedAt: '30 min ago',
    teacherResponse: "Great question! The key insight is that the postsynaptic membrane integrates all signals algebraically. An EPSP of +5mV and an IPSP of -5mV cancel out. Only when the net depolarization crosses the threshold voltage (~-55mV from resting ~-70mV) does an action potential fire. This integration is called 'neuronal summation' and is fundamental to how the nervous system processes information.",
  },
  {
    id: 'd5',
    student: 'Kabir Mehta',
    studentBatch: 'NEET Batch A',
    subject: 'Chemistry',
    chapter: 'P-Block Elements',
    question: 'Why does nitrogen not form pentahalides while phosphorus does? Both are group 15 elements.',
    submittedAt: '3 hrs ago',
    aiAttempt: 'Nitrogen cannot form pentahalides because it lacks d-orbitals in its valence shell (2nd period, only 2s and 2p available) — it cannot expand its octet beyond 4 bonds. Phosphorus (3rd period) has available 3d orbitals, allowing it to expand its valence shell to accommodate 5 bonds (sp³d hybridization), forming PCl₅.',
    aiScore: 72,
    status: 'open',
    priority: 'normal',
    claimedBy: null,
  },
];

const statusConfig = {
  open: { label: 'Open', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/25', dot: 'bg-amber-400' },
  in_review: { label: 'In Review', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/25', dot: 'bg-blue-400' },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400' },
};

const subjectColor = {
  Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  Mathematics: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
};

/* ── Teacher Response Modal ───────────────────────────────── */
const ResponseModal = ({ doubt, onClose, onSubmit }) => {
  const [response, setResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!response.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit(doubt.id, response);
      setSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-foreground">Respond to Doubt</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{doubt.student} · {doubt.subject} · {doubt.chapter}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Student question */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Student Question</div>
            <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed">{doubt.question}</div>
          </div>

          {/* AI attempt */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Attempt</div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${doubt.aiScore >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : doubt.aiScore >= 60 ? 'text-amber-400 bg-amber-500/10 border-amber-500/25' : 'text-rose-400 bg-rose-500/10 border-rose-500/25'}`}>
                AI score: {doubt.aiScore}/100
              </span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed italic">
              {doubt.aiAttempt}
            </div>
          </div>

          {/* Teacher response */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Your Response</div>
            <textarea
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Write a clear, detailed explanation. You can reference textbook pages, diagrams, or use examples. Your response will be shown to the student and added to the AI knowledge base..."
              rows={7}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-muted-foreground">{response.length} characters</span>
              {response.length < 100 && response.length > 0 && (
                <span className="text-xs text-amber-400">Minimum 100 characters recommended</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={response.trim().length < 20 || submitting}
            iconName={submitting ? 'Loader' : 'Send'}
            iconPosition="left"
          >
            {submitting ? 'Submitting...' : 'Submit Response'}
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ── Doubt Card ──────────────────────────────────────────── */
const DoubtCard = ({ doubt, onClaim, onRespond, expanded, onToggle }) => {
  const sc = statusConfig[doubt.status];
  const subj = subjectColor[doubt.subject] || 'text-muted-foreground bg-secondary border-border';

  return (
    <div className={`bg-card border rounded-xl overflow-hidden transition-all ${expanded ? 'border-primary/30' : 'border-border hover:border-border-strong'}`}>
      {/* Card header */}
      <div className="p-5 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
            {doubt.student[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1.5">
              <span className="font-medium text-foreground text-sm">{doubt.student}</span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground">{doubt.studentBatch}</span>
              {doubt.priority === 'urgent' && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 font-medium">Urgent</span>
              )}
            </div>
            <p className="text-sm text-foreground leading-snug line-clamp-2">{doubt.question}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subj}`}>{doubt.subject}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{doubt.chapter}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${sc.bg} ${sc.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </span>
              {doubt.claimedBy && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="User" size={11} />
                  {doubt.claimedBy}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-xs text-muted-foreground">{doubt.submittedAt}</div>
            <div className={`mt-2 text-xs font-mono font-medium ${doubt.aiScore >= 80 ? 'text-emerald-400' : doubt.aiScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              AI: {doubt.aiScore}/100
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
          {/* Full question */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Full Question</div>
            <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed">{doubt.question}</div>
          </div>

          {/* AI attempt */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={13} className="text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Attempt</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${doubt.aiScore >= 80 ? 'text-emerald-400 bg-emerald-500/10' : doubt.aiScore >= 60 ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                {doubt.aiScore >= 80 ? 'Good' : doubt.aiScore >= 60 ? 'Partial' : 'Insufficient'} — {doubt.aiScore}/100
              </span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
              {doubt.aiAttempt}
            </div>
          </div>

          {/* Teacher response (if resolved) */}
          {doubt.status === 'resolved' && doubt.teacherResponse && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="UserCheck" size={13} className="text-emerald-400" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Teacher Response</span>
                <span className="text-xs text-emerald-400 font-medium">{doubt.claimedBy}</span>
                {doubt.resolvedAt && <span className="text-xs text-muted-foreground">· {doubt.resolvedAt}</span>}
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 text-sm text-foreground leading-relaxed">
                {doubt.teacherResponse}
              </div>
            </div>
          )}

          {/* Actions */}
          {doubt.status === 'open' && !doubt.claimedBy && (
            <div className="flex items-center gap-3 pt-1">
              <Button onClick={() => onClaim(doubt.id)} iconName="UserCheck" iconPosition="left" size="sm">
                Claim & Respond
              </Button>
              <span className="text-xs text-muted-foreground">Claiming removes this from the pool for other teachers</span>
            </div>
          )}

          {doubt.status === 'in_review' && doubt.claimedBy && (
            <div className="flex items-center gap-3 pt-1">
              <Button onClick={() => onRespond(doubt)} iconName="Send" iconPosition="left" size="sm">
                Submit Response
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-blue-400">
                <Icon name="Lock" size={12} />
                <span>Claimed by {doubt.claimedBy}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main Page ───────────────────────────────────────────── */
const TeacherDoubts = () => {
  const [doubts, setDoubts] = useState(poolDoubts);
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('open');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [respondingDoubt, setRespondingDoubt] = useState(null);

  const subjects = ['All', 'Biology', 'Chemistry', 'Physics', 'Mathematics'];
  const statusFilters = [
    { key: 'all', label: 'All', count: doubts.length },
    { key: 'open', label: 'Open', count: doubts.filter(d => d.status === 'open').length },
    { key: 'in_review', label: 'In Review', count: doubts.filter(d => d.status === 'in_review').length },
    { key: 'resolved', label: 'Resolved', count: doubts.filter(d => d.status === 'resolved').length },
  ];

  const filtered = doubts.filter(d => {
    const matchStatus = activeFilter === 'all' || d.status === activeFilter;
    const matchSubject = subjectFilter === 'All' || d.subject === subjectFilter;
    return matchStatus && matchSubject;
  });

  const handleClaim = (id) => {
    setDoubts(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'in_review', claimedBy: 'You (Mr. Arun Sharma)' } : d
    ));
    // Auto-open the respond modal
    const doubt = doubts.find(d => d.id === id);
    if (doubt) setRespondingDoubt({ ...doubt, status: 'in_review', claimedBy: 'You (Mr. Arun Sharma)' });
  };

  const handleRespond = (doubt) => {
    setRespondingDoubt(doubt);
  };

  const handleSubmitResponse = (id, response) => {
    setDoubts(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'resolved', teacherResponse: response, resolvedAt: 'just now' } : d
    ));
    setRespondingDoubt(null);
  };

  const openCount = doubts.filter(d => d.status === 'open').length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                  Doubt Pool
                  {openCount > 0 && (
                    <span className="text-base bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-0.5 rounded-full font-medium">{openCount} open</span>
                  )}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Student doubts escalated from AI · Claim to respond · Institution: Allen Career Institute
                </p>
              </div>
            </div>

            {/* Pool info banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium text-foreground">How the doubt pool works: </span>
                  <span className="text-muted-foreground">Students submit doubts → AI attempts resolution → If AI score is low or student escalates, doubt enters this pool → Any teacher in your institution with matching subject expertise can claim and respond → Student is notified when you respond.</span>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total in Pool', value: doubts.length, color: 'text-foreground', bg: 'bg-card' },
                { label: 'Awaiting Response', value: doubts.filter(d => d.status === 'open').length, color: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/15' },
                { label: 'In Review', value: doubts.filter(d => d.status === 'in_review').length, color: 'text-blue-400', bg: 'bg-blue-500/5 border-blue-500/15' },
                { label: 'Resolved Today', value: doubts.filter(d => d.status === 'resolved').length, color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/15' },
              ].map((s, i) => (
                <div key={i} className={`border rounded-xl p-4 text-center ${s.bg} border-border`}>
                  <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex gap-1">
                {statusFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeFilter === f.key ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {f.label}
                    {f.count > 0 && (
                      <span className={`text-xs px-1.5 rounded-full ${activeFilter === f.key ? 'bg-white/20' : 'bg-border text-muted-foreground'}`}>{f.count}</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 ml-auto">
                {subjects.map(s => (
                  <button
                    key={s}
                    onClick={() => setSubjectFilter(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${subjectFilter === s ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Doubt cards */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border rounded-2xl">
                <Icon name="CheckCircle" size={48} className="text-emerald-400 mx-auto mb-4 opacity-50" />
                <h3 className="font-heading font-semibold text-foreground mb-2">All clear!</h3>
                <p className="text-muted-foreground text-sm">No doubts match the current filters.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(doubt => (
                  <DoubtCard
                    key={doubt.id}
                    doubt={doubt}
                    expanded={expandedId === doubt.id}
                    onToggle={() => setExpandedId(prev => prev === doubt.id ? null : doubt.id)}
                    onClaim={handleClaim}
                    onRespond={handleRespond}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {respondingDoubt && (
        <ResponseModal
          doubt={respondingDoubt}
          onClose={() => setRespondingDoubt(null)}
          onSubmit={handleSubmitResponse}
        />
      )}
    </div>
  );
};

export default TeacherDoubts;
