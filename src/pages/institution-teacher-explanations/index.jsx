import React, { useState } from 'react';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const explanations = [
  { id: 1, title: 'C3 vs C4 Photosynthesis Explained', type: 'youtube', subject: 'Biology', chapter: 'Photosynthesis', views: 234, helpful: 41, addedBy: 'me', createdAt: '2 days ago' },
  { id: 2, title: 'Gibbs Free Energy — Worked Examples', type: 'text', subject: 'Chemistry', chapter: 'Thermodynamics', views: 189, helpful: 38, addedBy: 'me', createdAt: '4 days ago' },
  { id: 3, title: 'Newton Laws with Rocket Problems', type: 'youtube', subject: 'Physics', chapter: 'Laws of Motion', views: 156, helpful: 29, addedBy: 'institution', createdAt: '1 week ago' },
  { id: 4, title: 'Genetics: Crossing Over Step by Step', type: 'pdf', subject: 'Biology', chapter: 'Genetics', views: 98, helpful: 22, addedBy: 'me', createdAt: '2 weeks ago' },
];

const typeConfig = {
  youtube: { icon: 'Youtube', label: 'Video', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  text: { icon: 'FileText', label: 'Article', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  pdf: { icon: 'File', label: 'PDF', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
};

const subjectColor = { Biology: 'text-emerald-400', Chemistry: 'text-amber-400', Physics: 'text-blue-400' };

const InstitutionTeacherExplanations = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filtered = filterType === 'all' ? explanations : explanations.filter(e => e.type === filterType);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-5 md:p-7">

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Batch B</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Explanations</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Videos, articles and PDFs you've created for your batch students.</p>
              </div>
              <Button size="sm" onClick={() => setShowAdd(true)} iconName="Plus" iconPosition="left" className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white">
                Add Explanation
              </Button>
            </div>

            {/* Add explanation panel */}
            {showAdd && (
              <div className="mb-5 bg-card border border-teal-500/20 rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
                  <Icon name="Plus" size={14} className="text-teal-400" />
                  New Explanation
                </h3>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Title</label>
                    <input type="text" placeholder="e.g. Meiosis vs Mitosis explained" className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Type</label>
                    <select className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30">
                      <option>YouTube Video</option>
                      <option>Text Article</option>
                      <option>PDF Upload</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Subject</label>
                    <input type="text" placeholder="Biology" className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Chapter</label>
                    <input type="text" placeholder="Photosynthesis" className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">YouTube URL / Content</label>
                  <input type="text" placeholder="https://youtube.com/..." className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 border-teal-600 text-white" iconName="Check" iconPosition="left">Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {/* Type filter */}
            <div className="flex gap-1.5 mb-5">
              {[
                { key: 'all', label: 'All' },
                { key: 'youtube', label: 'Videos' },
                { key: 'text', label: 'Articles' },
                { key: 'pdf', label: 'PDFs' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterType === f.key
                      ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300'
                      : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(e => {
                const t = typeConfig[e.type];
                return (
                  <div key={e.id} className="bg-card border border-border rounded-xl px-4 py-4 hover:border-border-strong transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg ${t.bg} border ${t.border} flex items-center justify-center flex-shrink-0`}>
                        <Icon name={t.icon} size={16} className={t.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
                          {e.addedBy === 'institution' && (
                            <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">Institution</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-muted-foreground flex-wrap">
                          <span className={`font-semibold ${subjectColor[e.subject] || ''}`}>{e.subject}</span>
                          <span>·</span>
                          <span>{e.chapter}</span>
                          <span>·</span>
                          <span className={`font-semibold ${t.color}`}>{t.label}</span>
                          <span>·</span>
                          <span>{e.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="Eye" size={11} />
                          <span>{e.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-emerald-400">
                          <Icon name="ThumbsUp" size={11} />
                          <span>{e.helpful} helpful</span>
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

export default InstitutionTeacherExplanations;
