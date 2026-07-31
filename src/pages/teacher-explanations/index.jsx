import React, { useState } from 'react';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Maps to teacher_explanations table (Table 31)
// content_type: VIDEO_YOUTUBE | VIDEO_UPLOAD | TEXT | PDF
// scope: question_id (question-specific) OR subject+chapter+topic (concept-level)
const explanations = [
  { id: 1, title: 'EM Induction — Why Lenz Law Works', subject: 'Physics', chapter: 'EM Induction', topic: 'Lenz\'s Law', contentType: 'VIDEO_YOUTUBE', scope: 'concept', duration: 742, views: 214, helpful: 48, active: true, createdAt: 'Jul 28' },
  { id: 2, title: 'Why answer is B — Newton\'s 3rd Law trap', subject: 'Physics', chapter: 'Laws of Motion', topic: 'Newton\'s Laws', contentType: 'VIDEO_YOUTUBE', scope: 'question', questionId: 'Q-4821', duration: 285, views: 189, helpful: 41, active: true, createdAt: 'Jul 25' },
  { id: 3, title: 'Organic Mechanisms Master Notes', subject: 'Chemistry', chapter: 'Organic Chemistry', topic: 'SN1 & SN2', contentType: 'PDF', scope: 'concept', duration: null, views: 97, helpful: 29, active: true, createdAt: 'Jul 20' },
  { id: 4, title: 'Genetics — Mendel to Modern', subject: 'Biology', chapter: 'Genetics', topic: 'Mendelian Genetics', contentType: 'TEXT', scope: 'concept', duration: null, views: 62, helpful: 18, active: true, createdAt: 'Jul 15' },
  { id: 5, title: 'Circular Motion — Common NEET Traps', subject: 'Physics', chapter: 'Circular Motion', topic: 'Centripetal Force', contentType: 'VIDEO_UPLOAD', scope: 'concept', duration: 510, views: 143, helpful: 35, active: false, createdAt: 'Jul 10' },
];

const typeConfig = {
  VIDEO_YOUTUBE: { icon: 'Youtube', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', label: 'YouTube' },
  VIDEO_UPLOAD: { icon: 'Play', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Video' },
  TEXT: { icon: 'FileText', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', label: 'Text' },
  PDF: { icon: 'FileDown', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'PDF' },
};

const subjectColors = { Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20', Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Mathematics: 'text-violet-400 bg-violet-500/10 border-violet-500/20' };

const TeacherExplanations = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [scopeType, setScopeType] = useState('concept');
  const [contentType, setContentType] = useState('VIDEO_YOUTUBE');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [form, setForm] = useState({ title: '', subject: 'Physics', chapter: '', topic: '', url: '', questionId: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const filtered = explanations.filter(e =>
    (subjectFilter === 'All' || e.subject === subjectFilter) &&
    (typeFilter === 'All' || e.contentType === typeFilter)
  );

  const formatDuration = (s) => {
    if (!s) return null;
    const m = Math.floor(s / 60), sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 uppercase tracking-wide">Teacher</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Explanations</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Videos, PDFs and text explanations — surfaced in AI doubt solver citations</p>
              </div>
              <Button onClick={() => setShowAdd(v => !v)} iconName="Plus" iconPosition="left" className="bg-sky-600 hover:bg-sky-700 border-sky-600">Add Explanation</Button>
            </div>

            {/* How it works banner */}
            <div className="bg-sky-500/8 border border-sky-500/15 rounded-xl p-4 mb-5 flex items-start gap-3">
              <Icon name="Brain" size={16} className="text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground mb-1">How explanations reach your students</div>
                <p className="text-xs text-muted-foreground leading-relaxed">When a student asks a doubt, the AI searches your explanations first. A video on Lenz's Law will be cited directly in the AI answer. Question-specific explanations appear on the Practice Lab question card's Discuss tab.</p>
                <div className="flex items-center gap-4 mt-2 text-[11px]">
                  <span className="text-sky-400 flex items-center gap-1"><Icon name="Search" size={11} />Semantic search via embeddings</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Icon name="CheckCircle" size={11} />{explanations.filter(e => e.active).length} active explanations</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Icon name="Eye" size={11} />{explanations.reduce((a, e) => a + e.views, 0)} total views</span>
                </div>
              </div>
            </div>

            {/* Add form */}
            {showAdd && (
              <div className="bg-card border border-sky-500/20 rounded-xl p-5 mb-5">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Plus" size={15} className="text-sky-400" />
                  Add Explanation
                </h3>

                {/* Scope toggle */}
                <div className="flex gap-2 mb-4">
                  {[['concept', 'Topic / Concept', 'Layers'], ['question', 'Specific Question', 'HelpCircle']].map(([val, label, icon]) => (
                    <button key={val} onClick={() => setScopeType(val)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${scopeType === val ? 'bg-sky-500/10 border-sky-500/25 text-sky-300' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                      <Icon name={icon} size={14} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Content type toggle */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {Object.entries(typeConfig).map(([val, cfg]) => (
                    <button key={val} onClick={() => setContentType(val)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${contentType === val ? `${cfg.bg} ${cfg.color} border-current` : 'border-border text-muted-foreground hover:text-foreground'}`}>
                      <Icon name={cfg.icon} size={12} />
                      {cfg.label}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Title</label>
                    <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Why Lenz Law gives opposing flux" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
                  </div>
                  {scopeType === 'concept' ? (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 block">Subject</label>
                        <select value={form.subject} onChange={e => set('subject', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40">
                          {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 block">Chapter</label>
                        <input value={form.chapter} onChange={e => set('chapter', e.target.value)} placeholder="e.g. EM Induction" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 block">Topic</label>
                        <input value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="e.g. Lenz's Law" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block">Question ID</label>
                      <input value={form.questionId} onChange={e => set('questionId', e.target.value)} placeholder="e.g. Q-4821" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
                    </div>
                  )}
                  {(contentType === 'VIDEO_YOUTUBE' || contentType === 'VIDEO_UPLOAD') && (
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block">{contentType === 'VIDEO_YOUTUBE' ? 'YouTube URL' : 'Video File'}</label>
                      <input value={form.url} onChange={e => set('url', e.target.value)} placeholder={contentType === 'VIDEO_YOUTUBE' ? 'https://youtube.com/watch?v=...' : 'Upload file'} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
                    </div>
                  )}
                  {contentType === 'PDF' && (
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block">PDF File</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-sky-500/40 transition-colors cursor-pointer">
                        <Icon name="Upload" size={18} className="mx-auto text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground">Click to upload PDF (max 20MB)</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-5">
                  <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button size="sm" disabled={!form.title} iconName="Plus" iconPosition="left" className="bg-sky-600 hover:bg-sky-700 border-sky-600">Add Explanation</Button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="flex gap-1 bg-secondary border border-border rounded-xl p-1">
                {['All', 'Physics', 'Chemistry', 'Biology'].map(s => (
                  <button key={s} onClick={() => setSubjectFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${subjectFilter === s ? 'bg-card text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{s}</button>
                ))}
              </div>
              <div className="flex gap-1 bg-secondary border border-border rounded-xl p-1">
                {[['All', 'All'], ['VIDEO_YOUTUBE', 'YouTube'], ['TEXT', 'Text'], ['PDF', 'PDF']].map(([val, label]) => (
                  <button key={val} onClick={() => setTypeFilter(val)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${typeFilter === val ? 'bg-card text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{label}</button>
                ))}
              </div>
            </div>

            {/* Explanations list */}
            <div className="space-y-3">
              {filtered.map(e => {
                const tc = typeConfig[e.contentType];
                const sc = subjectColors[e.subject] || 'text-muted-foreground bg-secondary border-border';
                return (
                  <div key={e.id} className={`bg-card border rounded-xl p-4 transition-all hover:border-sky-500/20 ${e.active ? 'border-border' : 'border-border/40 opacity-60'}`}>
                    <div className="flex items-start gap-4">
                      {/* Type icon */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${tc.bg}`}>
                        <Icon name={tc.icon} size={18} className={tc.color} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-heading font-semibold text-foreground text-sm mb-1">{e.title}</div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] border px-1.5 py-0.5 rounded-full font-semibold ${sc}`}>{e.subject}</span>
                              <span className="text-[11px] text-muted-foreground">{e.chapter} · {e.topic}</span>
                              {e.scope === 'question' && (
                                <span className="text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-full font-semibold">Q-specific: {e.questionId}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className={`text-[10px] border px-1.5 py-0.5 rounded-full font-semibold ${tc.bg} ${tc.color}`}>{tc.label}</span>
                            {!e.active && <span className="text-[10px] bg-secondary border border-border text-muted-foreground px-1.5 py-0.5 rounded-full">Hidden</span>}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center gap-4 mt-2.5 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{e.views} views</span>
                          <span className="flex items-center gap-1"><Icon name="ThumbsUp" size={11} />{e.helpful} helpful</span>
                          {e.duration && <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{formatDuration(e.duration)}</span>}
                          <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{e.createdAt}</span>
                          <div className="flex-1" />
                          <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Edit3" size={13} /></button>
                          <button className="text-muted-foreground hover:text-rose-400 transition-colors"><Icon name="Trash2" size={13} /></button>
                        </div>
                      </div>
                    </div>
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

export default TeacherExplanations;
