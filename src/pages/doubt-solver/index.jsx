import React, { useState, useEffect, useRef } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// ── Mock data ─────────────────────────────────────────────────────────────────
const HISTORY = [
  {
    id: 1, subject: 'Physics', concept: "Lenz's Law",
    question: "How does Lenz's law determine the direction of induced current? Explain with a practical example.",
    status: 'answered', priority: 'urgent', submittedAt: '2 days ago',
    response: "**Lenz's Law** states that the direction of induced current is such that it opposes the change in magnetic flux.\n\n**Practical example:** A bar magnet pushed toward a conducting loop:\n- North pole approaches → flux increases → induced current creates a north pole to **repel** the magnet\n- North pole pulled away → flux decreases → induced current creates a south pole to **attract** the magnet\n\n**Why this matters for NEET:** ~4 questions per year test direction of induced current. Always use the right-hand rule after applying Lenz's law.",
    sources: [
      { type: 'ncert', label: 'NCERT Class 12 Ch.6 p.134', icon: 'BookOpen' },
      { type: 'youtube', label: 'Physics Wallah — Lenz\'s Law (12 min)', icon: 'Play' },
      { type: 'web', label: 'toppr.com — 3 solved examples', icon: 'Globe' },
    ],
    aiModel: 'Grok 3', cost: '₹0.4', understanding: 78,
  },
  {
    id: 2, subject: 'Chemistry', concept: 'Elimination Reactions',
    question: "How do I identify major product in elimination reactions? Confused between Saytzeff and Hofmann rules.",
    status: 'answered', priority: 'normal', submittedAt: '3 days ago',
    response: "**Saytzeff vs Hofmann — The Key Rule:**\n\n**Saytzeff's Rule** (small bases like OH⁻, OR⁻):\n→ Major product = **more substituted** alkene (more stable)\n→ Example: 2-bromobutane + KOH → 2-butene (major)\n\n**Hofmann's Rule** (bulky bases or poor leaving groups):\n→ Major product = **less substituted** alkene\n\n**Memory trick:** *Small base = Saytzeff, Bulky base = Hofmann*",
    sources: [
      { type: 'ncert', label: 'NCERT Class 12 Organic Ch.10', icon: 'BookOpen' },
    ],
    aiModel: 'Gemini Flash', cost: '₹0', understanding: 91,
  },
  {
    id: 3, subject: 'Biology', concept: 'Cell Division',
    question: "What is the difference between mitosis and meiosis? I keep confusing the number of divisions and chromosome count.",
    status: 'answered', priority: 'normal', submittedAt: '5 days ago',
    response: "**Quick comparison:**\n\n| Feature | Mitosis | Meiosis |\n|---------|---------|----------|\n| Divisions | 1 | 2 |\n| Products | 2 cells | 4 cells |\n| Chromosome | 2n → 2n | 2n → n |\n| Genetic variation | None | Yes (crossing over) |\n| Purpose | Growth/repair | Gamete formation |",
    sources: [
      { type: 'ncert', label: 'NCERT Class 11 Ch.10', icon: 'BookOpen' },
      { type: 'article', label: 'Student article — "How I memorised PMAT"', icon: 'FileText' },
    ],
    aiModel: 'Grok 3', cost: '₹0.3', understanding: 95,
  },
  {
    id: 4, subject: 'Mathematics', concept: 'Integration',
    question: "When should I use integration by parts vs substitution? How do I choose u and dv with the ILATE rule?",
    status: 'pending', priority: 'urgent', submittedAt: '10 min ago',
    response: null, sources: [], aiModel: null, cost: null, understanding: null,
  },
];

const SUBJECT_COLOR = {
  Physics: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Chemistry: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Biology: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Mathematics: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
};

const SOURCE_COLOR = {
  ncert: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/20',
  youtube: 'text-rose-400 bg-rose-500/8 border-rose-500/20',
  web: 'text-blue-400 bg-blue-500/8 border-blue-500/20',
  article: 'text-amber-400 bg-amber-500/8 border-amber-500/20',
};

// ── Streaming text simulation ──────────────────────────────────────────────────
const useStreamText = (fullText, active) => {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active || !fullText) return;
    setDisplay('');
    setDone(false);
    let i = 0;
    const speed = 12;
    const tick = setInterval(() => {
      i += Math.floor(Math.random() * 5) + 3;
      if (i >= fullText.length) { setDisplay(fullText); setDone(true); clearInterval(tick); }
      else setDisplay(fullText.slice(0, i));
    }, speed);
    return () => clearInterval(tick);
  }, [fullText, active]);
  return { display, done };
};

// ── Format markdown-ish text ───────────────────────────────────────────────────
const FormatResponse = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-sm text-foreground leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-semibold text-foreground">{line.replace(/\*\*/g, '')}</p>;
        }
        if (line.startsWith('|')) {
          return <p key={i} className="font-mono text-xs text-muted-foreground">{line}</p>;
        }
        if (line.startsWith('→')) {
          return <p key={i} className="pl-3 border-l-2 border-primary/40 text-muted-foreground">{line.slice(1).trim()}</p>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <p key={i} className="flex items-start gap-2"><span className="text-primary mt-1 flex-shrink-0">•</span><span className="text-muted-foreground">{line.slice(2)}</span></p>;
        }
        if (!line.trim()) return <div key={i} className="h-1" />;
        // Bold inline
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

// ── Main component ─────────────────────────────────────────────────────────────
const DoubtSolver = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('normal');
  const [submitting, setSubmitting] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamDone, setStreamDone] = useState(false);
  const [doubts, setDoubts] = useState(HISTORY);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const textareaRef = useRef(null);

  const DEMO_RESPONSE = "**Integration by Parts vs Substitution — When to Use Each**\n\n**Use Substitution (u-substitution) when:**\n- You see a function and its derivative together\n- Example: ∫2x·e^(x²) dx → let u = x², du = 2x dx\n\n**Use Integration by Parts (IBP) when:**\n- Product of two different function types\n- Formula: ∫u dv = uv − ∫v du\n\n**ILATE Rule for choosing u:**\n→ I — Inverse trig (sin⁻¹x, cos⁻¹x)\n→ L — Logarithmic (ln x)\n→ A — Algebraic (x, x², etc.)\n→ T — Trigonometric (sin x, cos x)\n→ E — Exponential (eˣ)\n\n**The function higher in ILATE becomes u.**\n\n**Example:** ∫x·eˣ dx\n- x is Algebraic (A), eˣ is Exponential (E)\n- A comes before E in ILATE → u = x, dv = eˣ dx\n- IBP gives: x·eˣ − ∫eˣ dx = eˣ(x − 1) + C\n\n**NEET/JEE tip:** Most JEE integration problems requiring IBP involve ln x or inverse trig. If you see ∫x·ln(x) dx — ILATE immediately tells you u = ln x.";

  const { display: streamText, done: streamFinished } = useStreamText(DEMO_RESPONSE, streaming);

  useEffect(() => {
    if (streamFinished && streaming) {
      setStreamDone(true);
      setStreaming(false);
      // Update the pending doubt with the response
      setDoubts(prev => prev.map(d => d.id === 4 ? {
        ...d, status: 'answered', response: DEMO_RESPONSE,
        sources: [
          { type: 'ncert', label: 'NCERT Class 12 Math Ch.7', icon: 'BookOpen' },
          { type: 'youtube', label: 'JEE Wallah — IBP Tricks (8 min)', icon: 'Play' },
          { type: 'web', label: 'mathsisfun.com — IBP examples', icon: 'Globe' },
        ],
        aiModel: 'Grok 3', cost: '₹0.5', understanding: null,
      } : d));
    }
  }, [streamFinished, streaming]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitting(true);
    // Simulate submitting and getting answer
    setTimeout(() => {
      setSubmitting(false);
      setSelectedDoubt(4); // Select the "pending" demo doubt
      setTimeout(() => {
        setStreaming(true);
      }, 800);
    }, 1000);
  };

  const filtered = doubts.filter(d => {
    if (filterSubject && d.subject !== filterSubject) return false;
    if (filterStatus && d.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: doubts.length,
    answered: doubts.filter(d => d.status === 'answered').length,
    pending: doubts.filter(d => d.status === 'pending').length,
  };

  const viewDoubt = selectedDoubt ? doubts.find(d => d.id === selectedDoubt) : null;

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="ml-0 lg:ml-60 transition-smooth">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-7">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">AI Doubt Solver</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Powered by Grok 3 · Searches NCERT + institution notes + web + YouTube</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-primary/8 border border-primary/20 rounded-xl px-3 py-2">
              <Icon name="Infinity" size={13} className="text-primary" />
              <span className="text-primary font-medium">Unlimited AI doubts</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3.5 mb-6">
            {[
              { label: 'Total Doubts', value: stats.total, icon: 'MessageCircleQuestion', color: 'text-blue-400', bg: 'bg-blue-500/8' },
              { label: 'Answered', value: stats.answered, icon: 'CheckCircle', color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
              { label: 'Pending', value: stats.pending, icon: 'Clock', color: 'text-amber-400', bg: 'bg-amber-500/8' },
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

          <div className="grid lg:grid-cols-5 gap-6">
            {/* ── Submit form & Response ───────────────────────────── */}
            <div className="lg:col-span-3 space-y-4">
              {/* Submit form */}
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Sparkles" size={15} className="text-primary" />
                  </div>
                  <h2 className="font-heading font-semibold text-foreground">Ask a new doubt</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary text-sm transition-smooth"
                    >
                      <option value="">Select subject</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Mathematics</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
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
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your doubt</label>
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="Describe your doubt in detail. The more specific, the better the answer. e.g. 'In a parallel LCR circuit at resonance, what happens to impedance? My textbook says it becomes maximum but I'm not sure why...'"
                    rows={4}
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth resize-none"
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{question.length} chars</span>
                    <span className="text-xs text-muted-foreground">Searches: NCERT · Notes · Web · YouTube simultaneously</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" loading={submitting} disabled={!question.trim()} iconName="Send" iconPosition="right" size="sm">
                    {submitting ? 'Queuing…' : 'Ask Grok AI'}
                  </Button>
                  <span className="text-xs text-muted-foreground">Avg response: ~6 seconds</span>
                </div>
              </form>

              {/* Streaming response panel */}
              {(streaming || streamDone || (selectedDoubt === 4 && submitting)) && (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/30">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Brain" size={15} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Grok 3 is answering
                        {streaming && (
                          <span className="flex gap-1">
                            {[0, 1, 2].map(i => (
                              <span key={i} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                          </span>
                        )}
                        {streamDone && <Icon name="CheckCircle" size={14} className="text-primary" />}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">Searching NCERT · Institution notes · Web · YouTube…</div>
                    </div>
                    {streaming && (
                      <span className="text-xs text-muted-foreground font-mono">streaming…</span>
                    )}
                  </div>
                  <div className="p-5">
                    {streaming && <FormatResponse text={streamText} />}
                    {streamDone && viewDoubt?.response && (
                      <>
                        <FormatResponse text={viewDoubt.response} />
                        {viewDoubt.sources && viewDoubt.sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="text-xs font-medium text-muted-foreground mb-2">Sources used</div>
                            <div className="flex flex-wrap gap-2">
                              {viewDoubt.sources.map((s, i) => (
                                <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${SOURCE_COLOR[s.type]}`}>
                                  <Icon name={s.icon} size={11} />
                                  {s.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Doubt detail view */}
              {selectedDoubt && !streaming && !streamDone && (() => {
                const d = doubts.find(x => x.id === selectedDoubt);
                if (!d || !d.response) return null;
                const sc = SUBJECT_COLOR[d.subject];
                return (
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sc.bg} ${sc.border} ${sc.text}`}>{d.subject}</span>
                        <span className="text-xs text-muted-foreground">{d.concept}</span>
                      </div>
                      <button onClick={() => setSelectedDoubt(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground mb-4 bg-secondary/50 rounded-xl p-3">{d.question}</p>
                      <FormatResponse text={d.response} />
                      {d.sources && d.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Sources</div>
                          <div className="flex flex-wrap gap-2">
                            {d.sources.map((s, i) => (
                              <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${SOURCE_COLOR[s.type]}`}>
                                <Icon name={s.icon} size={11} />
                                {s.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>Answered by <span className="text-foreground font-medium">{d.aiModel}</span></span>
                        <span>Cost: <span className="text-primary font-medium">{d.cost}</span></span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* ── History sidebar ──────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Doubt History</h3>
                  <div className="flex gap-2">
                    <select
                      value={filterSubject}
                      onChange={e => setFilterSubject(e.target.value)}
                      className="flex-1 px-2 py-1.5 bg-secondary border border-border rounded-lg text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
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
                      className="flex-1 px-2 py-1.5 bg-secondary border border-border rounded-lg text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      <option value="">All status</option>
                      <option value="answered">Answered</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-border overflow-y-auto max-h-[600px] scrollbar-hide">
                  {filtered.map(d => {
                    const sc = SUBJECT_COLOR[d.subject];
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDoubt(d.id === selectedDoubt ? null : d.id)}
                        className={`w-full text-left px-5 py-4 transition-smooth hover:bg-secondary/50 ${selectedDoubt === d.id ? 'bg-secondary/80' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sc.bg} ${sc.border} ${sc.text}`}>{d.subject}</span>
                            {d.priority === 'urgent' && (
                              <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">Urgent</span>
                            )}
                          </div>
                          <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${d.status === 'answered' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                            {d.status}
                          </span>
                        </div>
                        <p className="text-xs text-foreground line-clamp-2 leading-relaxed">{d.question}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground">{d.submittedAt}</span>
                          {d.aiModel && <span className="text-xs text-muted-foreground">· {d.aiModel}</span>}
                          {d.understanding && <span className="text-xs text-primary">· {d.understanding}% understood</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sources panel */}
              <div className="mt-4 bg-card border border-border rounded-2xl p-5">
                <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Icon name="Layers" size={14} className="text-primary" />
                  What Grok searches
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: 'BookOpen', label: 'NCERT textbooks', sub: 'All classes, all subjects', color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
                    { icon: 'Building2', label: 'Institution materials', sub: 'Your uploaded PDFs', color: 'text-blue-400', bg: 'bg-blue-500/8' },
                    { icon: 'FileText', label: 'Student articles', sub: '800+ peer solutions', color: 'text-amber-400', bg: 'bg-amber-500/8' },
                    { icon: 'Globe', label: 'Web search', sub: 'Tavily AI search', color: 'text-indigo-400', bg: 'bg-indigo-500/8' },
                    { icon: 'Play', label: 'YouTube videos', sub: 'Hindi + English edu', color: 'text-rose-400', bg: 'bg-rose-500/8' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon name={s.icon} size={13} className={s.color} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoubtSolver;
