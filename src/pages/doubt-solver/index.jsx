import React, { useState, useEffect, useRef, useCallback } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// ── Status config ──────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  ai_answered:   { label: 'AI Answered',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'Sparkles' },
  pending_ai:    { label: 'AI Processing', color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    icon: 'Loader'   },
  escalated:     { label: 'Escalated',     color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: 'ArrowUpCircle' },
  in_review:     { label: 'In Review',     color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20',  icon: 'Eye'      },
  assigned:      { label: 'Assigned',      color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  icon: 'UserCheck' },
  resolved:      { label: 'Resolved',      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'CheckCircle2' },
  open:          { label: 'Open',          color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    icon: 'Circle'   },
};

const SUBJECT_COLOR = {
  Physics:     { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  Chemistry:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  Biology:     { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Mathematics: { text: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20'  },
};

const SOURCE_COLOR = {
  ncert:   'text-emerald-400 bg-emerald-500/8 border-emerald-500/20',
  youtube: 'text-rose-400    bg-rose-500/8    border-rose-500/20',
  web:     'text-blue-400    bg-blue-500/8    border-blue-500/20',
  article: 'text-amber-400   bg-amber-500/8   border-amber-500/20',
  teacher: 'text-violet-400  bg-violet-500/8  border-violet-500/20',
};

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_DOUBTS = [
  {
    id: 1,
    subject: 'Physics',
    concept: "Lenz's Law",
    question: "How does Lenz's law determine the direction of induced current? Explain with a practical example.",
    status: 'resolved',
    priority: 'urgent',
    submittedAt: '2026-07-29T10:23:00',
    resolvedAt: '2026-07-29T10:23:40',
    aiResponse: "**Lenz's Law** states that the direction of induced current is such that it opposes the change in magnetic flux.\n\n**Practical example:** A bar magnet pushed toward a conducting loop:\n- North pole approaches → flux increases → induced current creates a north pole to **repel** the magnet\n- North pole pulled away → flux decreases → induced current creates a south pole to **attract** the magnet\n\n**Why this matters for NEET:** ~4 questions per year test direction of induced current. Always use the right-hand rule after applying Lenz's law.",
    teacherResponse: null,
    escalationReason: null,
    assignedTeacher: null,
    sources: [
      { type: 'ncert',   label: 'NCERT Class 12 Ch.6 p.134',             icon: 'BookOpen' },
      { type: 'youtube', label: "Physics Wallah — Lenz's Law (12 min)",   icon: 'Play'     },
      { type: 'web',     label: 'toppr.com — 3 solved examples',          icon: 'Globe'    },
    ],
    aiModel: 'Grok 3',
    understandingScore: 78,
    timeline: [
      { time: '10:23:00', event: 'Doubt submitted', actor: 'You',       icon: 'MessageSquare', color: 'text-muted-foreground' },
      { time: '10:23:06', event: 'AI processing started (Grok 3)',      actor: 'System',     icon: 'Cpu',           color: 'text-blue-400'    },
      { time: '10:23:40', event: 'AI answered — sources cited',         actor: 'Grok 3',     icon: 'CheckCircle2',  color: 'text-emerald-400' },
    ],
  },
  {
    id: 2,
    subject: 'Chemistry',
    concept: 'Elimination Reactions',
    question: "How do I identify major product in elimination reactions? Confused between Saytzeff and Hofmann rules.",
    status: 'ai_answered',
    priority: 'normal',
    submittedAt: '2026-07-28T14:15:00',
    resolvedAt: '2026-07-28T14:15:35',
    aiResponse: "**Saytzeff vs Hofmann — The Key Rule:**\n\n**Saytzeff's Rule** (small bases like OH⁻, OR⁻):\n→ Major product = **more substituted** alkene (more stable)\n→ Example: 2-bromobutane + KOH → 2-butene (major)\n\n**Hofmann's Rule** (bulky bases):\n→ Major product = **less substituted** alkene\n\n**Memory trick:** *Small base = Saytzeff, Bulky base = Hofmann*",
    teacherResponse: null,
    escalationReason: null,
    assignedTeacher: null,
    sources: [
      { type: 'ncert', label: 'NCERT Class 12 Organic Ch.10', icon: 'BookOpen' },
    ],
    aiModel: 'Gemini Flash',
    understandingScore: 91,
    timeline: [
      { time: '14:15:00', event: 'Doubt submitted',                actor: 'You',     icon: 'MessageSquare', color: 'text-muted-foreground' },
      { time: '14:15:04', event: 'Routed to Gemini Flash (simple factual doubt)', actor: 'System', icon: 'Cpu', color: 'text-blue-400' },
      { time: '14:15:35', event: 'AI answered',                   actor: 'Gemini',  icon: 'CheckCircle2',  color: 'text-emerald-400' },
    ],
  },
  {
    id: 3,
    subject: 'Biology',
    concept: 'Cell Division — Crossing Over',
    question: "I understand crossing over happens during meiosis, but my teacher says the AI explanation is wrong — the chiasma forms at a different stage. Can you escalate this to a Biology teacher?",
    status: 'resolved',
    priority: 'urgent',
    submittedAt: '2026-07-27T09:00:00',
    resolvedAt: '2026-07-27T11:45:00',
    aiResponse: "**Meiosis — Crossing Over:**\n\nCrossing over occurs during **Prophase I** (specifically at the **pachytene** sub-stage).\n\nThe chiasma (plural: chiasmata) is the physical point of exchange between homologous chromosomes. It becomes visible in **diplotene** after the crossing over has already occurred.\n\n**Key sequence:**\n1. Leptotene — chromosomes condense\n2. Zygotene — homologs pair (synapsis)\n3. Pachytene — **crossing over happens here**\n4. Diplotene — chiasmata become visible",
    teacherResponse: "The AI explanation is correct. Crossing over (the actual DNA exchange) occurs at **pachytene**, and the chiasma becomes visible at **diplotene** — they are two different events. Your textbook may have a diagram error. Refer to NCERT 2023 edition page 172, Figure 10.3.",
    escalationReason: "Student reports AI explanation contradicts teacher's statement. Requires human expert validation.",
    assignedTeacher: { name: 'Dr. Meera Iyer', subject: 'Biology', avatar: 'MI' },
    sources: [
      { type: 'ncert',   label: 'NCERT Class 11 Ch.10 p.172',              icon: 'BookOpen' },
      { type: 'teacher', label: 'Dr. Meera Iyer — Biology Teacher Response', icon: 'User'    },
    ],
    aiModel: 'Grok 3',
    understandingScore: 96,
    timeline: [
      { time: '09:00:00', event: 'Doubt submitted',                            actor: 'You',             icon: 'MessageSquare', color: 'text-muted-foreground' },
      { time: '09:00:08', event: 'AI answered (Grok 3)',                       actor: 'System',          icon: 'Sparkles',      color: 'text-blue-400'    },
      { time: '09:05:00', event: 'Student escalated — requested teacher review', actor: 'You',           icon: 'ArrowUpCircle', color: 'text-amber-400'   },
      { time: '09:05:01', event: 'Escalated to institution Biology teacher pool', actor: 'System',       icon: 'Users',         color: 'text-indigo-400'  },
      { time: '09:12:00', event: 'Claimed by Dr. Meera Iyer (Biology Pool)',   actor: 'Dr. Meera Iyer',  icon: 'UserCheck',     color: 'text-violet-400'  },
      { time: '11:45:00', event: 'Teacher response posted — Resolved',         actor: 'Dr. Meera Iyer',  icon: 'CheckCircle2',  color: 'text-emerald-400' },
    ],
  },
];

// ── Streaming hook ─────────────────────────────────────────────────────────────
const useStreamText = (fullText, active) => {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active || !fullText) return;
    setDisplay('');
    setDone(false);
    let i = 0;
    const tick = setInterval(() => {
      i += Math.floor(Math.random() * 6) + 4;
      if (i >= fullText.length) { setDisplay(fullText); setDone(true); clearInterval(tick); }
      else setDisplay(fullText.slice(0, i));
    }, 14);
    return () => clearInterval(tick);
  }, [fullText, active]);
  return { display, done };
};

// ── Markdown renderer ─────────────────────────────────────────────────────────
const FormatResponse = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-sm text-foreground leading-relaxed font-body">
      {lines.map((line, i) => {
        if (line.startsWith('### '))
          return <p key={i} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-3 mb-1">{line.slice(4)}</p>;
        if (/^\*\*.*\*\*$/.test(line.trim()))
          return <p key={i} className="font-semibold text-foreground mt-2">{line.replace(/\*\*/g, '')}</p>;
        if (line.startsWith('|'))
          return <p key={i} className="font-mono text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">{line}</p>;
        if (line.startsWith('→'))
          return <p key={i} className="pl-3 border-l-2 border-primary/40 text-muted-foreground">{line.slice(1).trim()}</p>;
        if (line.startsWith('- ') || line.startsWith('* '))
          return <p key={i} className="flex items-start gap-2"><span className="text-primary mt-1 flex-shrink-0 text-xs">•</span><span className="text-muted-foreground">{line.slice(2)}</span></p>;
        if (/^\d+\./.test(line))
          return <p key={i} className="flex items-start gap-2 text-muted-foreground"><span className="text-primary font-semibold flex-shrink-0 text-xs">{line.match(/^\d+/)[0]}.</span><span>{line.replace(/^\d+\.\s*/, '')}</span></p>;
        if (!line.trim()) return <div key={i} className="h-1" />;
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-muted-foreground">
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{p}</strong> : p)}
          </p>
        );
      })}
    </div>
  );
};

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.open;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.bg} ${cfg.border} ${cfg.color}`}>
      <Icon name={cfg.icon} size={10} />
      {cfg.label}
    </span>
  );
};

// ── Timeline component ────────────────────────────────────────────────────────
const Timeline = ({ events }) => (
  <div className="space-y-0">
    {events.map((ev, i) => (
      <div key={i} className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 ${ev.color}`}>
            <Icon name={ev.icon} size={13} />
          </div>
          {i < events.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
        </div>
        <div className="pb-4 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-foreground">{ev.event}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground font-mono">{ev.time}</span>
            <span className="text-xs text-muted-foreground">· {ev.actor}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── Escalation modal ──────────────────────────────────────────────────────────
const EscalationModal = ({ doubt, onClose, onEscalate, userType = 'institution' }) => {
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onEscalate(doubt.id, reason);
      setSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
              <Icon name="ArrowUpCircle" size={18} className="text-amber-400" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Escalate to Teacher</h3>
              <p className="text-xs text-muted-foreground mt-0.5">AI could not fully resolve your doubt</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Routing info */}
          <div className={`rounded-xl p-4 border ${userType === 'institution' ? 'bg-indigo-500/8 border-indigo-500/20' : 'bg-amber-500/8 border-amber-500/20'}`}>
            <div className={`flex items-center gap-2 text-sm font-medium mb-1.5 ${userType === 'institution' ? 'text-indigo-400' : 'text-amber-400'}`}>
              <Icon name={userType === 'institution' ? 'Building2' : 'User'} size={14} />
              {userType === 'institution' ? 'Institution Teacher Pool Routing' : 'Personal Tutor Routing'}
            </div>
            <p className="text-xs text-muted-foreground">
              {userType === 'institution'
                ? 'Your doubt will be posted to the institution\'s Chemistry teacher pool. Any available teacher can claim and resolve it. You\'ll be notified immediately.'
                : 'Your doubt will be sent to your assigned tutor. They will respond within their next active session.'}
            </p>
          </div>

          {/* Doubt preview */}
          <div className="bg-secondary/50 rounded-xl p-3 text-xs text-muted-foreground border border-border">
            <div className="font-medium text-foreground mb-1">Doubt being escalated:</div>
            <div className="line-clamp-3">{doubt.question}</div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Why are you escalating? <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. AI gave contradictory information compared to my textbook, or I need a step-by-step numerical solution..."
              rows={3}
              className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-smooth resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1">{reason.length}/300 chars · min 20</div>
          </div>

          {/* Flow diagram */}
          <div className="bg-secondary/30 rounded-xl p-4 border border-border">
            <div className="text-xs font-medium text-muted-foreground mb-3">What happens next:</div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: 'Your request', icon: 'MessageSquare', color: 'text-muted-foreground' },
                { label: 'Teacher pool notified', icon: 'Users', color: 'text-indigo-400' },
                { label: 'Teacher claims', icon: 'UserCheck', color: 'text-violet-400' },
                { label: 'Response posted', icon: 'CheckCircle2', color: 'text-emerald-400' },
              ].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name={step.icon} size={12} className={step.color} />
                    <span className={step.color}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <Icon name="ChevronRight" size={12} className="text-muted-foreground flex-shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-border">
          <Button
            variant="primary"
            size="sm"
            loading={submitting}
            disabled={reason.trim().length < 20}
            iconName="ArrowUpCircle"
            iconPosition="right"
            onClick={handleSubmit}
          >
            Escalate to Teacher Pool
          </Button>
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">Cancel</button>
          <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <Icon name="Clock" size={11} />
            Avg response: 2–4 hours
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Detail drawer ─────────────────────────────────────────────────────────────
const DoubtDetail = ({ doubt, onClose, onEscalate }) => {
  const sc = SUBJECT_COLOR[doubt.subject] || SUBJECT_COLOR.Physics;
  const [tab, setTab] = useState('answer');
  const [showEscalate, setShowEscalate] = useState(false);
  const canEscalate = doubt.status === 'ai_answered' || doubt.status === 'resolved';

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {showEscalate && (
        <EscalationModal
          doubt={doubt}
          onClose={() => setShowEscalate(false)}
          onEscalate={onEscalate}
          userType="institution"
        />
      )}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-xl ${sc.bg} border ${sc.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon name="MessageCircleQuestion" size={16} className={sc.text} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sc.bg} ${sc.border} ${sc.text}`}>{doubt.subject}</span>
                <span className="text-xs text-muted-foreground">{doubt.concept}</span>
              </div>
              <p className="text-sm text-foreground font-medium mt-1 line-clamp-2">{doubt.question}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <StatusBadge status={doubt.status} />
                <span className="text-xs text-muted-foreground">{fmt(doubt.submittedAt)}</span>
                {doubt.aiModel && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Cpu" size={10} />
                    {doubt.aiModel}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 flex-shrink-0 ml-2">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border flex-shrink-0 px-1">
          {['answer', 'audit'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors relative ${
                tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'answer' ? 'Answer' : 'Audit Trail'}
              {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === 'answer' && (
            <>
              {/* Question */}
              <div className="bg-secondary/40 rounded-xl p-4 border border-border">
                <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Icon name="HelpCircle" size={12} />
                  Your Question
                </div>
                <p className="text-sm text-foreground leading-relaxed">{doubt.question}</p>
              </div>

              {/* AI Response */}
              {doubt.aiResponse && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-blue-500/5">
                    <div className="w-7 h-7 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                      <Icon name="Sparkles" size={13} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">{doubt.aiModel || 'AI'} Response</span>
                    </div>
                    {doubt.understandingScore && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${doubt.understandingScore}%` }} />
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">{doubt.understandingScore}% understood</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <FormatResponse text={doubt.aiResponse} />
                  </div>
                </div>
              )}

              {/* Teacher response */}
              {doubt.teacherResponse && (
                <div className="rounded-xl border border-violet-500/20 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-violet-500/15 bg-violet-500/5">
                    <div className="w-8 h-8 bg-violet-500/20 rounded-full flex items-center justify-center text-xs font-bold text-violet-300 flex-shrink-0">
                      {doubt.assignedTeacher?.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{doubt.assignedTeacher?.name}</div>
                      <div className="text-xs text-muted-foreground">{doubt.assignedTeacher?.subject} Teacher · Institution Pool</div>
                    </div>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Teacher Verified</span>
                  </div>
                  <div className="p-4">
                    <FormatResponse text={doubt.teacherResponse} />
                  </div>
                </div>
              )}

              {/* Sources */}
              {doubt.sources?.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">Sources consulted</div>
                  <div className="flex flex-wrap gap-2">
                    {doubt.sources.map((s, i) => (
                      <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${SOURCE_COLOR[s.type]}`}>
                        <Icon name={s.icon} size={11} />
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Escalation reason */}
              {doubt.escalationReason && (
                <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4">
                  <div className="text-xs font-medium text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <Icon name="ArrowUpCircle" size={12} />
                    Escalation Reason
                  </div>
                  <p className="text-xs text-muted-foreground">{doubt.escalationReason}</p>
                </div>
              )}
            </>
          )}

          {tab === 'audit' && doubt.timeline && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-4">Full audit trail for this doubt</div>
              <Timeline events={doubt.timeline} />
            </div>
          )}
        </div>

        {/* Escalate CTA */}
        {canEscalate && !doubt.teacherResponse && (
          <div className="px-5 py-4 border-t border-border flex-shrink-0">
            <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl p-3 flex items-center gap-3">
              <Icon name="AlertCircle" size={16} className="text-amber-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground">Not satisfied with the AI answer?</div>
                <div className="text-xs text-muted-foreground">Escalate to a teacher for human expert review.</div>
              </div>
              <Button
                variant="outline"
                size="xs"
                iconName="ArrowUpCircle"
                iconPosition="left"
                onClick={() => setShowEscalate(true)}
                className="flex-shrink-0 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              >
                Escalate
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────
const DoubtSolver = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('normal');
  const [submitting, setSubmitting] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamDone, setStreamDone] = useState(false);
  const [doubts, setDoubts] = useState(MOCK_DOUBTS);
  const [selectedId, setSelectedId] = useState(null);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [newDoubtId, setNewDoubtId] = useState(null);
  const textareaRef = useRef(null);
  const detailRef = useRef(null);

  const DEMO_RESPONSE = "**Integration by Parts vs Substitution — When to Use Each**\n\n**Use Substitution (u-substitution) when:**\n- You see a function and its derivative together in the integrand\n- Example: ∫2x·e^(x²) dx → let u = x², du = 2x dx\n- Signs: composite function with its derivative present\n\n**Use Integration by Parts (IBP) when:**\n- You have a product of two different function families\n- Formula: ∫u dv = uv − ∫v du\n\n**ILATE Rule — choose u in this order:**\n→ I — Inverse trig (sin⁻¹x, tan⁻¹x)\n→ L — Logarithmic (ln x, log x)\n→ A — Algebraic (x, x², polynomials)\n→ T — Trigonometric (sin x, cos x)\n→ E — Exponential (eˣ, aˣ)\n\n**Example:** ∫x·eˣ dx\n- x is Algebraic (A), eˣ is Exponential (E)\n- A comes before E → u = x, dv = eˣ dx\n- IBP gives: eˣ(x − 1) + C\n\n**JEE tip:** When you see ∫ln(x) dx or ∫x·sin(x) dx — IBP immediately. When you see ∫x·e^(x²) dx — substitution because derivative of x² is 2x.";

  const { display: streamText, done: streamFinished } = useStreamText(DEMO_RESPONSE, streaming);

  useEffect(() => {
    if (streamFinished && streaming) {
      setStreamDone(true);
      setStreaming(false);
      const now = new Date().toISOString();
      setDoubts(prev => prev.map(d => d.id === newDoubtId ? {
        ...d,
        status: 'ai_answered',
        resolvedAt: now,
        aiResponse: DEMO_RESPONSE,
        sources: [
          { type: 'ncert',   label: 'NCERT Class 12 Math Ch.7',          icon: 'BookOpen' },
          { type: 'youtube', label: 'JEE Wallah — IBP Tricks (8 min)',    icon: 'Play'     },
          { type: 'web',     label: 'mathsisfun.com — IBP examples',      icon: 'Globe'    },
        ],
        aiModel: 'Grok 3',
        timeline: [
          ...(d.timeline || []),
          { time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), event: 'AI answered — sources cited', actor: 'Grok 3', icon: 'CheckCircle2', color: 'text-emerald-400' },
        ],
      } : d));
    }
  }, [streamFinished, streaming, newDoubtId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || question.trim().length < 10) return;
    setSubmitting(true);

    const now = new Date().toISOString();
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const id = Date.now();
    setNewDoubtId(id);

    const newDoubt = {
      id,
      subject: subject || 'Mathematics',
      concept: 'Integration Techniques',
      question: question.trim(),
      status: 'pending_ai',
      priority,
      submittedAt: now,
      resolvedAt: null,
      aiResponse: null,
      teacherResponse: null,
      escalationReason: null,
      assignedTeacher: null,
      sources: [],
      aiModel: null,
      understandingScore: null,
      timeline: [
        { time: timeStr, event: 'Doubt submitted', actor: 'You', icon: 'MessageSquare', color: 'text-muted-foreground' },
        { time: timeStr, event: 'Routing to Grok 3 (complex STEM doubt detected)', actor: 'System', icon: 'Cpu', color: 'text-blue-400' },
      ],
    };

    setDoubts(prev => [newDoubt, ...prev]);
    setSelectedId(id);
    setQuestion('');
    setSubject('');

    setTimeout(() => {
      setSubmitting(false);
      setTimeout(() => setStreaming(true), 600);
    }, 900);
  };

  const handleEscalate = useCallback((doubtId, reason) => {
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setDoubts(prev => prev.map(d => d.id === doubtId ? {
      ...d,
      status: 'assigned',
      escalationReason: reason,
      assignedTeacher: { name: 'Dr. Priya Sharma', subject: d.subject, avatar: 'PS' },
      timeline: [
        ...(d.timeline || []),
        { time: timeStr, event: 'Student escalated — requested teacher review', actor: 'You',              icon: 'ArrowUpCircle', color: 'text-amber-400'   },
        { time: timeStr, event: `Escalated to institution ${d.subject} teacher pool`, actor: 'System',    icon: 'Users',         color: 'text-indigo-400'  },
        { time: timeStr, event: 'Claimed by Dr. Priya Sharma',                 actor: 'Dr. Priya Sharma', icon: 'UserCheck',     color: 'text-violet-400'  },
      ],
    } : d));
  }, []);

  const filtered = doubts.filter(d => {
    if (filterSubject && d.subject !== filterSubject) return false;
    if (filterStatus && d.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: doubts.length,
    aiAnswered: doubts.filter(d => ['ai_answered', 'resolved'].includes(d.status)).length,
    escalated: doubts.filter(d => ['escalated', 'in_review', 'assigned'].includes(d.status)).length,
    pending: doubts.filter(d => ['pending_ai', 'open'].includes(d.status)).length,
  };

  const selectedDoubt = doubts.find(d => d.id === selectedId);
  const isNewDoubt = selectedId === newDoubtId;

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="ml-0 lg:ml-56 pb-16 lg:pb-0 transition-smooth">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-7">

          {/* Header */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">AI Doubt Solver</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Powered by Grok 3 · Searches NCERT + institution notes + web + YouTube · Escalate to teacher if needed</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-primary/8 border border-primary/20 rounded-xl px-3 py-2 flex-shrink-0">
              <Icon name="Infinity" size={13} className="text-primary" />
              <span className="text-primary font-medium hidden sm:inline">Unlimited AI doubts</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total Doubts',  value: stats.total,      icon: 'MessageCircleQuestion', color: 'text-blue-400',    bg: 'bg-blue-500/8'    },
              { label: 'AI Answered',   value: stats.aiAnswered, icon: 'Sparkles',              color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
              { label: 'Escalated',     value: stats.escalated,  icon: 'ArrowUpCircle',         color: 'text-amber-400',   bg: 'bg-amber-500/8'   },
              { label: 'Pending',       value: stats.pending,    icon: 'Clock',                 color: 'text-rose-400',    bg: 'bg-rose-500/8'    },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={s.icon} size={17} className={s.color} />
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Flow diagram banner */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-6 hidden md:block">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="GitBranch" size={14} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Doubt Resolution Flow</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { icon: 'MessageSquare', label: 'Submit Doubt', color: 'text-muted-foreground', bg: 'bg-secondary' },
                { icon: 'Sparkles',      label: 'AI attempts resolution', color: 'text-blue-400', bg: 'bg-blue-500/8' },
                { icon: 'CheckCircle2',  label: 'Resolved by AI', color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
                { icon: 'ArrowUpCircle', label: 'Student escalates (optional)', color: 'text-amber-400', bg: 'bg-amber-500/8' },
                { icon: 'Users',         label: 'Teacher pool notified', color: 'text-indigo-400', bg: 'bg-indigo-500/8' },
                { icon: 'UserCheck',     label: 'Teacher claims & resolves', color: 'text-violet-400', bg: 'bg-violet-500/8' },
              ].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent ${step.bg} text-xs font-medium`}>
                    <Icon name={step.icon} size={12} className={step.color} />
                    <span className={step.color}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <Icon name={i === 2 ? 'CornerDownRight' : 'ArrowRight'} size={12} className="text-muted-foreground flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-5 gap-5">

            {/* Left: Submit + Active stream/detail */}
            <div className="lg:col-span-2 space-y-4">

              {/* Submit form */}
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Sparkles" size={15} className="text-primary" />
                  </div>
                  <h2 className="font-heading font-semibold text-foreground">Ask a new doubt</h2>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary text-sm transition-smooth"
                    >
                      <option value="">Auto-detect</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Mathematics</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Priority</label>
                    <select
                      value={priority}
                      onChange={e => setPriority(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary text-sm transition-smooth"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Your doubt</label>
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="Describe your doubt in detail. e.g. 'In a parallel LCR circuit at resonance, impedance becomes max or min? My textbook and class notes disagree...'"
                    rows={4}
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-smooth resize-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.nativeEvent.isComposing) {
                        handleSubmit(e);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{question.length} chars {question.length < 10 && question.length > 0 && <span className="text-rose-400">(min 10)</span>}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">Ctrl+Enter to submit</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    type="submit"
                    loading={submitting}
                    disabled={question.trim().length < 10}
                    iconName="Send"
                    iconPosition="right"
                    size="sm"
                  >
                    {submitting ? 'Queueing…' : 'Ask Grok AI'}
                  </Button>
                  <span className="text-xs text-muted-foreground">Avg: ~6 seconds</span>
                </div>
              </form>

              {/* Active streaming */}
              {(streaming || (streamDone && isNewDoubt)) && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-blue-500/5">
                    <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                      <Icon name="Brain" size={15} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Grok 3 is answering
                        {streaming && (
                          <span className="flex gap-1 ml-1">
                            {[0, 1, 2].map(i => (
                              <span key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
                            ))}
                          </span>
                        )}
                        {streamDone && <Icon name="CheckCircle2" size={14} className="text-emerald-400" />}
                      </div>
                      <div className="text-xs text-muted-foreground">Searching NCERT · Notes · Web · YouTube…</div>
                    </div>
                  </div>
                  <div className="p-5 max-h-72 overflow-y-auto">
                    <FormatResponse text={streaming ? streamText : DEMO_RESPONSE} />
                    {streaming && (
                      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                    )}
                  </div>
                  {streamDone && (
                    <div className="px-5 pb-4">
                      <div className="border-t border-border pt-3 mb-3">
                        <div className="text-xs font-medium text-muted-foreground mb-2">Sources used</div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { type: 'ncert',   label: 'NCERT Class 12 Math Ch.7', icon: 'BookOpen' },
                            { type: 'youtube', label: 'JEE Wallah — IBP (8 min)', icon: 'Play' },
                            { type: 'web',     label: 'mathsisfun.com',           icon: 'Globe' },
                          ].map((s, i) => (
                            <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${SOURCE_COLOR[s.type]}`}>
                              <Icon name={s.icon} size={11} />{s.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl p-3 flex items-start gap-2.5">
                        <Icon name="AlertCircle" size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium text-foreground">Not satisfied?</div>
                          <div className="text-xs text-muted-foreground">You can escalate this to a teacher using the Doubt History panel.</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* When no active stream and doubt selected — show in right panel note */}
              {!streaming && !streamDone && selectedDoubt && (
                <div className="bg-card border border-border rounded-2xl p-5 text-center hidden lg:block">
                  <Icon name="ArrowRight" size={20} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Full details shown in the panel on the right</p>
                </div>
              )}
            </div>

            {/* Right: History + Detail */}
            <div className="lg:col-span-3">
              {selectedDoubt && !streaming ? (
                <div className="bg-card border border-border rounded-2xl overflow-hidden h-full min-h-96">
                  <DoubtDetail
                    doubt={selectedDoubt}
                    onClose={() => { setSelectedId(null); setStreamDone(false); }}
                    onEscalate={handleEscalate}
                  />
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  {/* History header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <h3 className="font-heading font-semibold text-foreground">Doubt History</h3>
                    <div className="flex items-center gap-2">
                      <select
                        value={filterSubject}
                        onChange={e => setFilterSubject(e.target.value)}
                        className="text-xs px-2.5 py-1.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                      >
                        <option value="">All subjects</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>Mathematics</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="text-xs px-2.5 py-1.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                      >
                        <option value="">All status</option>
                        <option value="ai_answered">AI Answered</option>
                        <option value="resolved">Resolved</option>
                        <option value="assigned">Assigned</option>
                        <option value="escalated">Escalated</option>
                        <option value="pending_ai">Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* List */}
                  <div className="divide-y divide-border">
                    {filtered.length === 0 && (
                      <div className="py-12 text-center">
                        <Icon name="MessageCircleQuestion" size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-sm text-muted-foreground">No doubts match your filters</p>
                      </div>
                    )}
                    {filtered.map(d => {
                      const sc = SUBJECT_COLOR[d.subject] || SUBJECT_COLOR.Physics;
                      const isSelected = selectedId === d.id;
                      return (
                        <button
                          key={d.id}
                          onClick={() => { setSelectedId(d.id); setStreamDone(false); }}
                          className={`w-full text-left px-5 py-4 transition-smooth hover:bg-secondary/40 ${isSelected ? 'bg-secondary/60' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-xl ${sc.bg} border ${sc.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Icon name="MessageCircleQuestion" size={14} className={sc.text} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${sc.bg} ${sc.text}`}>{d.subject}</span>
                                <StatusBadge status={d.status} />
                                {d.priority === 'urgent' && (
                                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 font-medium border border-rose-500/20">Urgent</span>
                                )}
                              </div>
                              <p className="text-sm text-foreground line-clamp-2 mb-1">{d.question}</p>
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(d.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                                {d.aiModel && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Icon name="Cpu" size={10} />{d.aiModel}
                                  </span>
                                )}
                                {d.understandingScore && (
                                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                                    <Icon name="Brain" size={10} />{d.understandingScore}% understood
                                  </span>
                                )}
                                {d.assignedTeacher && (
                                  <span className="text-xs text-violet-400 flex items-center gap-1">
                                    <Icon name="User" size={10} />{d.assignedTeacher.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0 mt-2" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoubtSolver;
