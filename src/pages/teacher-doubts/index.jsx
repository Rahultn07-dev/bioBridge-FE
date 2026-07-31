import React, { useState, useRef, useEffect } from 'react';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

/* ── Mock data aligned to doubt_history schema ──────────────── */
const TEACHER_NAME = 'Mr. Arun Sharma';

const seedDoubts = [
  {
    id: 'd1',
    student: 'Arjun Singh',
    studentBatch: 'NEET Batch A',
    subject: 'Biology',
    chapter: 'Cell Division',
    topic: 'Meiosis',
    question: 'I understand crossing over happens during meiosis, but my teacher says the AI explanation is wrong — the chiasma forms at a different stage than what the AI described. Can you clarify exactly when and where chiasmata form during Prophase I?',
    submittedAt: '10 min ago',
    priority: 'Urgent',
    aiAttempt: 'During Prophase I of meiosis, crossing over occurs at the pachytene stage when homologous chromosomes are fully synapsed. Chiasmata (the visible X-shaped structures) form at the diplotene stage as the homologs begin to separate but remain held together at crossover points.',
    aiScore: 52,
    escalationReason: 'AI confidence score below threshold (0.52). Student flagged response as incorrect.',
    status: 'open',
    claimedBy: null,
  },
  {
    id: 'd2',
    student: 'Priya Nair',
    studentBatch: 'NEET Batch B',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    topic: 'Elimination Reactions',
    question: "How do I identify the major product in elimination reactions? I'm confused between Saytzeff and Hofmann rules — when do I apply which one?",
    submittedAt: '28 min ago',
    priority: 'Normal',
    aiAttempt: "Saytzeff's rule predicts the more substituted (stable) alkene as major product for strong bases with small nucleophiles (e.g., KOH/ethanol). Hofmann's rule applies when bulky bases (e.g., (CH₃)₃COK) are used — steric hindrance forces attack on the less hindered hydrogen, giving the less substituted alkene.",
    aiScore: 78,
    escalationReason: 'Student escalated — response did not address their specific confusion.',
    status: 'in_review',
    claimedBy: TEACHER_NAME,
    teacherResponse: null,
  },
  {
    id: 'd3',
    student: 'Rohan Verma',
    studentBatch: 'JEE Main 2026',
    subject: 'Physics',
    chapter: 'Electromagnetism',
    topic: 'LCR Circuits',
    question: 'In a parallel LCR circuit at resonance, why does impedance become maximum rather than minimum? My textbook says minimum but my coaching notes say maximum.',
    submittedAt: '1 hr ago',
    priority: 'Normal',
    aiAttempt: 'For a parallel LCR circuit at resonance, impedance is MAXIMUM (not minimum). This is the opposite of a series circuit where impedance is minimum at resonance. In parallel, at resonance the circulating current between L and C is maximum but the supply current is minimum because the reactive components cancel each other\'s admittance.',
    aiScore: 65,
    escalationReason: 'AI confidence score below threshold (0.65).',
    status: 'open',
    claimedBy: null,
  },
  {
    id: 'd4',
    student: 'Deepa Pillai',
    studentBatch: 'NEET Batch A',
    subject: 'Biology',
    chapter: 'Human Physiology',
    topic: 'Nervous System',
    question: 'What is the difference between excitatory and inhibitory postsynaptic potentials? How do they interact when both occur simultaneously at the same neuron?',
    submittedAt: '2 hrs ago',
    priority: 'Normal',
    aiAttempt: 'EPSPs depolarize the membrane (make it less negative) while IPSPs hyperpolarize it (make it more negative). When both occur simultaneously, they undergo spatial and temporal summation — the algebraic sum determines whether the threshold is reached and an action potential fires.',
    aiScore: 88,
    escalationReason: 'Student requested human verification.',
    status: 'resolved',
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
    topic: 'Group 15',
    question: 'Why does nitrogen not form pentahalides while phosphorus does? Both are group 15 elements.',
    submittedAt: '3 hrs ago',
    priority: 'Normal',
    aiAttempt: 'Nitrogen cannot form pentahalides because it lacks d-orbitals in its valence shell (2nd period, only 2s and 2p available) — it cannot expand its octet beyond 4 bonds. Phosphorus (3rd period) has available 3d orbitals, allowing it to expand its valence shell to accommodate 5 bonds (sp³d hybridization), forming PCl₅.',
    aiScore: 72,
    escalationReason: 'AI confidence score below threshold (0.72). Student marked unhelpful.',
    status: 'open',
    claimedBy: null,
  },
];

const INSTITUTION_TEACHERS = [
  'Dr. Meera Iyer',
  'Ms. Priya Patel',
  'Mr. Vikas Nair',
  'Dr. Sunita Rao',
];

const statusConfig = {
  open:      { label: 'Open',       color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/25',   dot: 'bg-amber-400'   },
  in_review: { label: 'In Review',  color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/25',     dot: 'bg-blue-400'    },
  resolved:  { label: 'Resolved',   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400' },
};

const priorityConfig = {
  Urgent: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
  High:   'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Normal: 'text-muted-foreground bg-secondary border-border',
  Low:    'text-muted-foreground bg-secondary border-border',
};

const subjectColor = {
  Biology:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Chemistry:   'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Physics:     'text-blue-400 bg-blue-500/10 border-blue-500/25',
  Mathematics: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
};

const aiScoreClass = (s) =>
  s >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
  : s >= 60 ? 'text-amber-400 bg-amber-500/10 border-amber-500/25'
  : 'text-rose-400 bg-rose-500/10 border-rose-500/25';

/* ── Reassign Modal ───────────────────────────────────────── */
const ReassignModal = ({ doubt, onClose, onReassign }) => {
  const [selected, setSelected] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-foreground text-base">Reassign Doubt</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{doubt.student} · {doubt.subject}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Assign to Teacher</label>
            <div className="space-y-2">
              {INSTITUTION_TEACHERS.filter(t => t !== TEACHER_NAME).map(t => (
                <label key={t} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected === t ? 'border-primary/40 bg-primary/5' : 'border-border bg-secondary hover:bg-secondary/80'}`}>
                  <input type="radio" name="teacher" value={t} checked={selected === t} onChange={() => setSelected(t)} className="text-primary" />
                  <div className="w-7 h-7 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">{t[0]}</div>
                  <span className="text-sm text-foreground">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              placeholder="Reason for reassignment..."
              className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" disabled={!selected} onClick={() => { onReassign(doubt.id, selected); onClose(); }} iconName="UserPlus" iconPosition="left">
            Reassign
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ── Response Modal ───────────────────────────────────────── */
const ResponseModal = ({ doubt, onClose, onSubmit }) => {
  const [response, setResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => { textareaRef.current?.focus(); }, []);

  const handleSubmit = () => {
    if (response.trim().length < 20) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit(doubt.id, response);
      setSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Student Question</div>
            <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed">{doubt.question}</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={13} className="text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Attempt</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${aiScoreClass(doubt.aiScore)}`}>
                {doubt.aiScore >= 80 ? 'Good' : doubt.aiScore >= 60 ? 'Partial' : 'Insufficient'} — {doubt.aiScore}/100
              </span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
              {doubt.aiAttempt}
            </div>
            {doubt.escalationReason && (
              <div className="flex items-start gap-2 mt-2 text-xs text-amber-400">
                <Icon name="Info" size={12} className="mt-0.5 flex-shrink-0" />
                <span>Escalation reason: {doubt.escalationReason}</span>
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Your Response</div>
            <textarea
              ref={textareaRef}
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Write a clear, detailed explanation. Reference textbook pages, diagrams, or examples. Your response will be sent to the student and added to the AI knowledge base..."
              rows={7}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className={`text-xs ${response.length >= 100 ? 'text-emerald-400' : 'text-muted-foreground'}`}>{response.length} characters</span>
              {response.length > 0 && response.length < 100 && (
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

/* ── Doubt Card ───────────────────────────────────────────── */
const DoubtCard = ({ doubt, isMine, onClaim, onUnclaim, onRespond, onReassign, expanded, onToggle }) => {
  const sc = statusConfig[doubt.status];
  const subj = subjectColor[doubt.subject] || 'text-muted-foreground bg-secondary border-border';
  const pri = priorityConfig[doubt.priority] || priorityConfig.Normal;

  return (
    <div className={`bg-card border rounded-xl overflow-hidden transition-all duration-200 ${expanded ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border hover:border-[var(--color-border-strong)]'}`}>
      {/* Header row */}
      <div className="p-5 cursor-pointer select-none" onClick={onToggle}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
            {doubt.student[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium text-foreground text-sm">{doubt.student}</span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground">{doubt.studentBatch}</span>
              {doubt.priority === 'Urgent' && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${pri}`}>Urgent</span>
              )}
              {isMine && doubt.status === 'in_review' && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">Claimed by you</span>
              )}
            </div>
            <p className="text-sm text-foreground leading-snug line-clamp-2">{doubt.question}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subj}`}>{doubt.subject}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border">{doubt.chapter}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${sc.bg} ${sc.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </span>
              {doubt.claimedBy && doubt.status !== 'resolved' && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="User" size={11} />
                  {doubt.claimedBy}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 text-right flex flex-col items-end gap-1.5">
            <div className="text-xs text-muted-foreground">{doubt.submittedAt}</div>
            <div className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded border ${aiScoreClass(doubt.aiScore)}`}>
              AI {doubt.aiScore}/100
            </div>
            <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4 space-y-4">
          {/* Full question */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Full Question</div>
            <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed">{doubt.question}</div>
          </div>

          {/* Escalation reason */}
          {doubt.escalationReason && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <Icon name="AlertTriangle" size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-amber-400 mb-0.5">Escalation Reason</div>
                <div className="text-xs text-muted-foreground">{doubt.escalationReason}</div>
              </div>
            </div>
          )}

          {/* AI attempt */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={13} className="text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Attempt</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium border ${aiScoreClass(doubt.aiScore)}`}>
                {doubt.aiScore >= 80 ? 'Good' : doubt.aiScore >= 60 ? 'Partial' : 'Insufficient'} — {doubt.aiScore}/100
              </span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
              {doubt.aiAttempt}
            </div>
          </div>

          {/* Teacher response (resolved) */}
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

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Open: can claim */}
            {doubt.status === 'open' && (
              <>
                <Button size="sm" onClick={() => onClaim(doubt.id)} iconName="UserCheck" iconPosition="left">
                  Claim & Respond
                </Button>
                <span className="text-xs text-muted-foreground">Claiming locks this doubt for you until you respond or release it.</span>
              </>
            )}

            {/* In-review: claimed by THIS teacher */}
            {doubt.status === 'in_review' && isMine && (
              <>
                <Button size="sm" onClick={() => onRespond(doubt)} iconName="Send" iconPosition="left">
                  Submit Response
                </Button>
                <Button size="sm" variant="outline" onClick={() => onReassign(doubt)} iconName="UserPlus" iconPosition="left">
                  Reassign
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onUnclaim(doubt.id)} iconName="Unlock" iconPosition="left">
                  Release Claim
                </Button>
              </>
            )}

            {/* In-review: claimed by someone else */}
            {doubt.status === 'in_review' && !isMine && (
              <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/5 border border-blue-500/15 rounded-xl px-3 py-2">
                <Icon name="Lock" size={12} />
                <span>Currently claimed by <strong>{doubt.claimedBy}</strong> — awaiting their response.</span>
              </div>
            )}

            {/* Resolved */}
            {doubt.status === 'resolved' && (
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <Icon name="CheckCircle" size={13} />
                <span>Resolved · Student has been notified</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const TeacherDoubts = () => {
  const [doubts, setDoubts] = useState(seedDoubts);
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('open');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [respondingDoubt, setRespondingDoubt] = useState(null);
  const [reassigningDoubt, setReassigningDoubt] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const subjects = ['All', 'Biology', 'Chemistry', 'Physics', 'Mathematics'];
  const priorities = ['All', 'Urgent', 'High', 'Normal'];

  const openCount = doubts.filter(d => d.status === 'open').length;
  const inReviewCount = doubts.filter(d => d.status === 'in_review').length;
  const resolvedCount = doubts.filter(d => d.status === 'resolved').length;
  const myClaimedCount = doubts.filter(d => d.status === 'in_review' && d.claimedBy === TEACHER_NAME).length;

  const statusFilters = [
    { key: 'all',      label: 'All',       count: doubts.length },
    { key: 'open',     label: 'Open',      count: openCount },
    { key: 'in_review',label: 'In Review', count: inReviewCount },
    { key: 'resolved', label: 'Resolved',  count: resolvedCount },
    { key: 'mine',     label: 'My Claims', count: myClaimedCount },
  ];

  const filtered = doubts.filter(d => {
    if (activeFilter === 'mine') return d.status === 'in_review' && d.claimedBy === TEACHER_NAME;
    const matchStatus = activeFilter === 'all' || d.status === activeFilter;
    const matchSubject = subjectFilter === 'All' || d.subject === subjectFilter;
    const matchPriority = priorityFilter === 'All' || d.priority === priorityFilter;
    return matchStatus && matchSubject && matchPriority;
  });

  const handleClaim = (id) => {
    setDoubts(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'in_review', claimedBy: TEACHER_NAME } : d
    ));
    const doubt = doubts.find(d => d.id === id);
    if (doubt) {
      showToast('Doubt claimed — open it to respond.');
      setRespondingDoubt({ ...doubt, status: 'in_review', claimedBy: TEACHER_NAME });
    }
  };

  const handleUnclaim = (id) => {
    setDoubts(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'open', claimedBy: null } : d
    ));
    showToast('Doubt released back to pool.', 'info');
    if (expandedId === id) setExpandedId(null);
  };

  const handleReassign = (id, targetTeacher) => {
    setDoubts(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'in_review', claimedBy: targetTeacher } : d
    ));
    showToast(`Doubt reassigned to ${targetTeacher}.`);
  };

  const handleSubmitResponse = (id, response) => {
    setDoubts(prev => prev.map(d =>
      d.id === id
        ? { ...d, status: 'resolved', teacherResponse: response, resolvedAt: 'just now' }
        : d
    ));
    setRespondingDoubt(null);
    showToast('Response submitted — student notified.');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                  Doubt Pool
                  {openCount > 0 && (
                    <span className="text-base bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-0.5 rounded-full font-medium">{openCount} open</span>
                  )}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Student doubts escalated from AI · Allen Career Institute</p>
              </div>
            </div>

            {/* Info banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={15} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium text-foreground">Workflow: </span>
                  <span className="text-muted-foreground">
                    Student submits doubt → AI attempts resolution (scored 0–100) → Low confidence or student escalation → enters this pool → You claim a doubt to lock it → Submit response → Student notified instantly.
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total in Pool',     value: doubts.length,  color: 'text-foreground',   bg: 'bg-card border-border' },
                { label: 'Awaiting Response', value: openCount,       color: 'text-amber-400',    bg: 'bg-amber-500/5 border-amber-500/20' },
                { label: 'In Review',         value: inReviewCount,  color: 'text-blue-400',     bg: 'bg-blue-500/5 border-blue-500/20' },
                { label: 'Resolved Today',    value: resolvedCount,  color: 'text-emerald-400',  bg: 'bg-emerald-500/5 border-emerald-500/20' },
              ].map((s, i) => (
                <div key={i} className={`border rounded-xl p-4 text-center ${s.bg}`}>
                  <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="space-y-3 mb-5">
              {/* Status tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {statusFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === f.key
                        ? 'bg-primary/10 text-primary border border-primary/25'
                        : 'text-muted-foreground hover:text-foreground bg-secondary border border-transparent hover:border-border'
                    }`}
                  >
                    {f.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeFilter === f.key ? 'bg-primary/20 text-primary' : 'bg-card text-muted-foreground'}`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subject + priority filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {subjects.map(s => (
                    <button
                      key={s}
                      onClick={() => setSubjectFilter(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                        subjectFilter === s
                          ? s === 'All' ? 'bg-primary/10 text-primary border-primary/25' : `border-current ${subjectColor[s] || ''}`
                          : 'text-muted-foreground border-transparent bg-secondary hover:border-border'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="w-px h-4 bg-border mx-1" />
                <div className="flex items-center gap-1.5">
                  {priorities.map(p => (
                    <button
                      key={p}
                      onClick={() => setPriorityFilter(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                        priorityFilter === p
                          ? 'bg-primary/10 text-primary border-primary/25'
                          : 'text-muted-foreground border-transparent bg-secondary hover:border-border'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Doubt list */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <Icon name="MessageCircleQuestion" size={32} className="text-muted-foreground mx-auto mb-3" />
                  <div className="text-foreground font-medium mb-1">No doubts in this view</div>
                  <div className="text-sm text-muted-foreground">Adjust your filters or check back later.</div>
                </div>
              ) : (
                filtered.map(d => (
                  <DoubtCard
                    key={d.id}
                    doubt={d}
                    isMine={d.claimedBy === TEACHER_NAME}
                    onClaim={handleClaim}
                    onUnclaim={handleUnclaim}
                    onRespond={setRespondingDoubt}
                    onReassign={setReassigningDoubt}
                    expanded={expandedId === d.id}
                    onToggle={() => setExpandedId(prev => prev === d.id ? null : d.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {respondingDoubt && (
        <ResponseModal
          doubt={respondingDoubt}
          onClose={() => setRespondingDoubt(null)}
          onSubmit={handleSubmitResponse}
        />
      )}
      {reassigningDoubt && (
        <ReassignModal
          doubt={reassigningDoubt}
          onClose={() => setReassigningDoubt(null)}
          onReassign={handleReassign}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium transition-all ${
          toast.type === 'info' ? 'bg-card border-blue-500/30 text-blue-400' : 'bg-card border-emerald-500/30 text-emerald-400'
        }`}>
          <Icon name={toast.type === 'info' ? 'Info' : 'CheckCircle'} size={14} />
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default TeacherDoubts;
