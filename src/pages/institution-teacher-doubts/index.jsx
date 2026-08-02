import React, { useState } from 'react';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const doubts = [
  {
    id: 1, student: 'Raj Patel', subject: 'Biology', chapter: 'Photosynthesis',
    question: 'What is the difference between C3 and C4 plants in terms of photosynthetic pathway efficiency? Why do C4 plants have higher efficiency in hot climates?',
    aiAttempt: 'C3 plants fix CO2 directly via RuBisCO, while C4 plants pre-fix CO2 as C4 acids in mesophyll cells, concentrating CO2 in bundle sheath cells to suppress photorespiration. C4 pathway is more efficient in hot, dry climates.',
    aiScore: 72, time: '15m ago', status: 'open', priority: 'normal',
  },
  {
    id: 2, student: 'Meena Krishnan', subject: 'Chemistry', chapter: 'Thermodynamics',
    question: 'Explain why a reaction can be non-spontaneous at low temperature but spontaneous at high temperature. Use Gibbs free energy.',
    aiAttempt: 'ΔG = ΔH - TΔS. When ΔH > 0 and ΔS > 0, at low T the TΔS term is small so ΔG > 0 (non-spontaneous). As T increases, TΔS overcomes ΔH and ΔG < 0 (spontaneous).',
    aiScore: 88, time: '42m ago', status: 'claimed', priority: 'normal',
  },
  {
    id: 3, student: 'Suresh Kumar', subject: 'Physics', chapter: 'Laws of Motion',
    question: 'In rocket propulsion, how does Newton\'s third law apply and what determines the thrust force?',
    aiAttempt: 'Rockets expel exhaust gas backward; by Newton\'s 3rd law, gas pushes rocket forward. Thrust = mass flow rate × exhaust velocity.',
    aiScore: 55, time: '1h ago', status: 'open', priority: 'high',
  },
  {
    id: 4, student: 'Pooja Reddy', subject: 'Biology', chapter: 'Genetics',
    question: 'How does crossing over contribute to genetic variation and how is recombination frequency used to map genes?',
    aiAttempt: 'Crossing over during prophase I of meiosis exchanges chromatid segments, creating new allele combinations. Recombination frequency (cM) is proportional to map distance between loci.',
    aiScore: 91, time: '2h ago', status: 'resolved', priority: 'normal',
  },
];

const statusConfig = {
  open: { label: 'Open', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  claimed: { label: 'In Review', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

const subjectColor = { Biology: 'text-emerald-400', Chemistry: 'text-amber-400', Physics: 'text-blue-400' };

const InstitutionTeacherDoubts = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [expanded, setExpanded] = useState(null);
  const [responding, setResponding] = useState(null);
  const [response, setResponse] = useState('');

  const counts = {
    open: doubts.filter(d => d.status === 'open').length,
    claimed: doubts.filter(d => d.status === 'claimed').length,
    resolved: doubts.filter(d => d.status === 'resolved').length,
  };

  const filtered = activeTab === 'all' ? doubts : doubts.filter(d => d.status === activeTab);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-5 md:p-7">

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Batch B</span>
                <span className="text-xs text-muted-foreground">AI-escalated doubts from your students</span>
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Doubt Queue</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Students first try AI. Only doubts AI scores &lt; 85 reach your queue.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Open', value: counts.open, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { label: 'In Review', value: counts.claimed, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                { label: 'Resolved Today', value: counts.resolved, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
              ].map((s, i) => (
                <div key={i} className={`bg-card border ${s.border} rounded-xl p-3.5 text-center`}>
                  <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 border-b border-border">
              {[
                { key: 'open', label: 'Open', count: counts.open },
                { key: 'claimed', label: 'In Review', count: counts.claimed },
                { key: 'resolved', label: 'Resolved', count: counts.resolved },
                { key: 'all', label: 'All' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-1.5 ${
                    activeTab === tab.key
                      ? 'border-teal-500 text-teal-400'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-teal-500/20 text-teal-400' : 'bg-secondary text-muted-foreground'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Doubt cards */}
            <div className="space-y-3">
              {filtered.map(doubt => {
                const s = statusConfig[doubt.status];
                const isExpanded = expanded === doubt.id;
                const isResponding = responding === doubt.id;
                return (
                  <div key={doubt.id} className="bg-card border border-border rounded-xl overflow-hidden">
                    <div
                      className="px-4 py-3.5 cursor-pointer hover:bg-secondary/20 transition-colors"
                      onClick={() => setExpanded(isExpanded ? null : doubt.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-xs font-semibold ${subjectColor[doubt.subject] || 'text-muted-foreground'}`}>{doubt.subject}</span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="text-xs text-muted-foreground">{doubt.chapter}</span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="text-xs text-muted-foreground">{doubt.time}</span>
                            {doubt.priority === 'high' && (
                              <span className="text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 px-1.5 rounded">HIGH</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-foreground">{doubt.student}</span>
                          </div>
                          <p className="text-sm text-foreground line-clamp-2">{doubt.question}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.border} ${s.color}`}>{s.label}</span>
                          <span className="text-[11px] font-mono bg-secondary px-2 py-0.5 rounded border border-border text-muted-foreground">
                            AI {doubt.aiScore}/100
                          </span>
                          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border">
                        <div className="px-4 py-3 bg-secondary/20">
                          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">AI Attempt</div>
                          <p className="text-sm text-foreground/90 leading-relaxed">{doubt.aiAttempt}</p>
                        </div>
                        {doubt.status !== 'resolved' && !isResponding && (
                          <div className="px-4 py-3 flex gap-2 border-t border-border">
                            <Button
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); setResponding(doubt.id); }}
                              className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white"
                              iconName="MessageSquare"
                              iconPosition="left"
                            >
                              {doubt.status === 'open' ? 'Claim & Respond' : 'Add Response'}
                            </Button>
                          </div>
                        )}
                        {isResponding && (
                          <div className="px-4 py-3 border-t border-border space-y-3">
                            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Your Response</div>
                            <textarea
                              value={response}
                              onChange={e => setResponse(e.target.value)}
                              placeholder="Write a clear, complete response for the student..."
                              rows={4}
                              className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 resize-none"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => { setResponding(null); setResponse(''); }}
                                className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white"
                                iconName="Check"
                                iconPosition="left"
                                disabled={!response.trim()}
                              >
                                Submit Response
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setResponding(null)}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionTeacherDoubts;
