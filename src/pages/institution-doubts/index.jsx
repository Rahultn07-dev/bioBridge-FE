import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

/* ── Mock data (aligned to doubt_history schema) ─────────── */
const allDoubts = [
  {
    id: 'i1',
    student: 'Arjun Singh',
    batch: 'NEET Batch A',
    teacher: 'Mr. Sharma',
    subject: 'Biology',
    chapter: 'Cell Division',
    topic: 'Meiosis',
    question: 'Can you clarify exactly when and where chiasmata form during Prophase I? My coaching notes and textbook say different things.',
    submittedAt: '10 min ago',
    waitMins: 10,
    priority: 'Urgent',
    aiScore: 52,
    escalationReason: 'AI confidence score below threshold (0.52). Student flagged response.',
    status: 'open',
    claimedBy: null,
  },
  {
    id: 'i2',
    student: 'Priya Nair',
    batch: 'NEET Batch B',
    teacher: 'Ms. Patel',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    topic: 'Elimination Reactions',
    question: "How do I identify the major product in elimination reactions? When do I apply Saytzeff vs Hofmann?",
    submittedAt: '28 min ago',
    waitMins: 28,
    priority: 'Normal',
    aiScore: 78,
    escalationReason: 'Student escalated — response did not address specific confusion.',
    status: 'in_review',
    claimedBy: 'Mr. Sharma',
    claimedAt: '5 min ago',
  },
  {
    id: 'i3',
    student: 'Rohan Verma',
    batch: 'JEE Main 2026',
    teacher: 'Mr. Verma',
    subject: 'Physics',
    chapter: 'Electromagnetism',
    topic: 'LCR Circuits',
    question: 'In a parallel LCR circuit at resonance, why does impedance become maximum rather than minimum?',
    submittedAt: '1 hr ago',
    waitMins: 60,
    priority: 'Normal',
    aiScore: 65,
    escalationReason: 'AI confidence score below threshold (0.65).',
    status: 'open',
    claimedBy: null,
  },
  {
    id: 'i4',
    student: 'Deepa Pillai',
    batch: 'NEET Batch A',
    teacher: 'Mr. Sharma',
    subject: 'Biology',
    chapter: 'Human Physiology',
    topic: 'Nervous System',
    question: 'What is the difference between EPSPs and IPSPs? How do they interact simultaneously?',
    submittedAt: '2 hrs ago',
    waitMins: 120,
    priority: 'Normal',
    aiScore: 88,
    escalationReason: 'Student requested human verification.',
    status: 'resolved',
    claimedBy: 'Dr. Meera Iyer',
    resolvedAt: '1 hr ago',
    resolutionMethod: 'TEACHER_ASSIGNED',
    teacherResponse: "Great question! The postsynaptic membrane integrates all signals algebraically. An EPSP of +5mV and an IPSP of -5mV cancel out. Only when net depolarization crosses threshold (~-55mV from resting ~-70mV) does an action potential fire.",
  },
  {
    id: 'i5',
    student: 'Kabir Mehta',
    batch: 'NEET Batch A',
    teacher: 'Mr. Sharma',
    subject: 'Chemistry',
    chapter: 'P-Block Elements',
    topic: 'Group 15',
    question: 'Why does nitrogen not form pentahalides while phosphorus does?',
    submittedAt: '3 hrs ago',
    waitMins: 180,
    priority: 'Normal',
    aiScore: 72,
    escalationReason: 'Student marked AI response unhelpful.',
    status: 'open',
    claimedBy: null,
  },
  {
    id: 'i6',
    student: 'Sanya Gupta',
    batch: 'NEET Dropper',
    teacher: 'Ms. Gupta',
    subject: 'Physics',
    chapter: 'Mechanics',
    topic: 'Rotational Motion',
    question: 'How does the moment of inertia change if mass is distributed farther from the axis?',
    submittedAt: '4 hrs ago',
    waitMins: 240,
    priority: 'High',
    aiScore: 61,
    escalationReason: 'AI confidence score below threshold (0.61).',
    status: 'in_review',
    claimedBy: 'Ms. Patel',
    claimedAt: '30 min ago',
  },
];

const TEACHERS = ['All', 'Mr. Sharma', 'Ms. Patel', 'Mr. Verma', 'Ms. Gupta', 'Dr. Meera Iyer'];

const statusConfig = {
  open:      { label: 'Open',       color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/25',   dot: 'bg-amber-400'   },
  in_review: { label: 'In Review',  color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/25',     dot: 'bg-blue-400'    },
  resolved:  { label: 'Resolved',   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400' },
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

const waitColor = (mins) =>
  mins >= 180 ? 'text-rose-400' : mins >= 60 ? 'text-amber-400' : 'text-muted-foreground';

/* ── Doubt Detail Modal ───────────────────────────────────── */
const DetailModal = ({ doubt, onClose }) => {
  const sc = statusConfig[doubt.status];
  const subj = subjectColor[doubt.subject] || '';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-foreground">Doubt Detail</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subj}`}>{doubt.subject}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${sc.bg} ${sc.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Student', value: doubt.student },
              { label: 'Batch', value: doubt.batch },
              { label: 'Teacher', value: doubt.teacher },
              { label: 'Chapter', value: `${doubt.chapter} · ${doubt.topic}` },
              { label: 'Submitted', value: doubt.submittedAt },
              { label: 'AI Score', valueEl: <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${aiScoreClass(doubt.aiScore)}`}>{doubt.aiScore}/100</span> },
            ].map((m, i) => (
              <div key={i} className="bg-secondary rounded-xl px-3 py-2.5">
                <div className="text-xs text-muted-foreground mb-0.5">{m.label}</div>
                {m.valueEl || <div className="text-sm text-foreground font-medium">{m.value}</div>}
              </div>
            ))}
          </div>

          {/* Question */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Student Question</div>
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

          {/* AI attempt placeholder */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={13} className="text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Attempt</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${aiScoreClass(doubt.aiScore)}`}>
                {doubt.aiScore >= 80 ? 'Good' : doubt.aiScore >= 60 ? 'Partial' : 'Insufficient'} — {doubt.aiScore}/100
              </span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed italic">
              AI response stored in doubt_history.ai_response — visible to assigned teacher via Teacher Portal.
            </div>
          </div>

          {/* Claimed by */}
          {doubt.claimedBy && doubt.status !== 'resolved' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
              <Icon name="User" size={13} className="text-blue-400" />
              <div className="text-sm text-blue-400">Claimed by <strong>{doubt.claimedBy}</strong> {doubt.claimedAt && `· ${doubt.claimedAt}`}</div>
            </div>
          )}

          {/* Teacher response */}
          {doubt.status === 'resolved' && doubt.teacherResponse && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="UserCheck" size={13} className="text-emerald-400" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Teacher Response</span>
                <span className="text-xs text-emerald-400">{doubt.claimedBy} · {doubt.resolvedAt}</span>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 text-sm text-foreground leading-relaxed">
                {doubt.teacherResponse}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const InstitutionDoubts = () => {
  const [doubts] = useState(allDoubts);
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('wait');
  const [detail, setDetail] = useState(null);

  const openCount     = doubts.filter(d => d.status === 'open').length;
  const inReviewCount = doubts.filter(d => d.status === 'in_review').length;
  const resolvedCount = doubts.filter(d => d.status === 'resolved').length;
  const unclaimedCount = doubts.filter(d => d.status === 'open').length;

  const statusFilters = [
    { key: 'all',       label: 'All',       count: doubts.length },
    { key: 'open',      label: 'Open',      count: openCount },
    { key: 'in_review', label: 'In Review', count: inReviewCount },
    { key: 'resolved',  label: 'Resolved',  count: resolvedCount },
  ];

  const subjects = ['All', 'Biology', 'Chemistry', 'Physics', 'Mathematics'];
  const priorities = ['All', 'Urgent', 'High', 'Normal'];

  const filtered = doubts
    .filter(d => {
      const ms = statusFilter === 'all' || d.status === statusFilter;
      const msub = subjectFilter === 'All' || d.subject === subjectFilter;
      const mt = teacherFilter === 'All' || d.teacher === teacherFilter || d.claimedBy === teacherFilter;
      const mp = priorityFilter === 'All' || d.priority === priorityFilter;
      return ms && msub && mt && mp;
    })
    .sort((a, b) => {
      if (sortBy === 'wait') return b.waitMins - a.waitMins;
      if (sortBy === 'ai_score') return a.aiScore - b.aiScore;
      if (sortBy === 'priority') {
        const p = { Urgent: 3, High: 2, Normal: 1, Low: 0 };
        return (p[b.priority] || 0) - (p[a.priority] || 0);
      }
      return 0;
    });

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Doubt Pool</h1>
                <p className="text-muted-foreground text-sm mt-1">All escalated doubts across Allen Career Institute batches</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total Doubts',       value: doubts.length,   color: 'text-foreground',   bg: 'bg-card border-border' },
                { label: 'Unclaimed / Open',   value: unclaimedCount,  color: 'text-amber-400',    bg: 'bg-amber-500/5 border-amber-500/20' },
                { label: 'Being Reviewed',     value: inReviewCount,   color: 'text-blue-400',     bg: 'bg-blue-500/5 border-blue-500/20' },
                { label: 'Resolved',           value: resolvedCount,   color: 'text-emerald-400',  bg: 'bg-emerald-500/5 border-emerald-500/20' },
              ].map((s, i) => (
                <div key={i} className={`border rounded-xl p-4 text-center ${s.bg}`}>
                  <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Alert for old open doubts */}
            {doubts.some(d => d.status === 'open' && d.waitMins >= 120) && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 mb-5">
                <Icon name="Clock" size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-rose-400">Attention: </span>
                  <span className="text-muted-foreground">
                    {doubts.filter(d => d.status === 'open' && d.waitMins >= 120).length} doubt(s) have been waiting over 2 hours without a teacher response.
                  </span>
                </div>
              </div>
            )}

            {/* Filters row */}
            <div className="space-y-3 mb-5">
              {/* Status tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {statusFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setStatusFilter(f.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      statusFilter === f.key
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/25'
                        : 'text-muted-foreground hover:text-foreground bg-secondary border border-transparent hover:border-border'
                    }`}
                  >
                    {f.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${statusFilter === f.key ? 'bg-violet-500/20 text-violet-400' : 'bg-card text-muted-foreground'}`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subject, teacher, priority, sort */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
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
                <div className="w-px h-4 bg-border" />
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
                <div className="w-px h-4 bg-border ml-auto" />
                {/* Sort */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Sort:</span>
                  {[
                    { key: 'wait',     label: 'Wait Time'  },
                    { key: 'ai_score', label: 'AI Score'   },
                    { key: 'priority', label: 'Priority'   },
                  ].map(s => (
                    <button
                      key={s.key}
                      onClick={() => setSortBy(s.key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                        sortBy === s.key
                          ? 'bg-primary/10 text-primary border-primary/25'
                          : 'text-muted-foreground border-transparent bg-secondary hover:border-border'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teacher filter */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground mr-1">Teacher:</span>
                {TEACHERS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTeacherFilter(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                      teacherFilter === t
                        ? 'bg-primary/10 text-primary border-primary/25'
                        : 'text-muted-foreground border-transparent bg-secondary hover:border-border'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Student / Batch', 'Subject', 'Chapter', 'Wait', 'AI Score', 'Priority', 'Status / Teacher', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground text-sm">
                          No doubts match these filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map(d => {
                        const sc = statusConfig[d.status];
                        const subj = subjectColor[d.subject] || '';
                        return (
                          <tr key={d.id} className="border-b border-border hover:bg-secondary/30 transition-colors group">
                            <td className="px-4 py-3">
                              <div className="font-medium text-foreground text-sm">{d.student}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{d.batch}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${subj}`}>{d.subject}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-foreground">{d.chapter}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{d.topic}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-sm font-medium ${waitColor(d.waitMins)}`}>
                                {d.waitMins >= 60 ? `${Math.floor(d.waitMins / 60)}h ${d.waitMins % 60}m` : `${d.waitMins}m`}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${aiScoreClass(d.aiScore)}`}>{d.aiScore}/100</span>
                            </td>
                            <td className="px-4 py-3">
                              {d.priority === 'Urgent' || d.priority === 'High' ? (
                                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${d.priority === 'Urgent' ? 'text-rose-400 bg-rose-500/10 border-rose-500/25' : 'text-orange-400 bg-orange-500/10 border-orange-500/25'}`}>
                                  {d.priority}
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">{d.priority}</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className={`flex items-center gap-1.5 text-xs font-medium ${sc.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                {sc.label}
                              </div>
                              {d.claimedBy && (
                                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                  <Icon name="User" size={10} />
                                  {d.claimedBy}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                size="xs"
                                variant="ghost"
                                onClick={() => setDetail(d)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 text-xs text-muted-foreground text-right">
              Showing {filtered.length} of {doubts.length} doubts
            </div>
          </div>
        </div>
      </div>

      {detail && <DetailModal doubt={detail} onClose={() => setDetail(null)} />}
    </div>
  );
};

export default InstitutionDoubts;
