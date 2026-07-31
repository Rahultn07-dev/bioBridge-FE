import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const materials = [
  { id: 1, title: 'EM Induction Master Notes', type: 'PDF', subject: 'Physics', chapter: 'EM Induction', batch: 'All', pages: 48, size: '4.2MB', status: 'INDEXED', tags: ['lenzs-law'], uploaded: 'Jul 12' },
  { id: 2, title: 'Organic Chemistry — Mechanisms', type: 'VIDEO', subject: 'Chemistry', chapter: 'Organic', batch: 'All', duration: '62 min', status: 'INDEXED', tags: ['sn2', 'sn1'], uploaded: 'Jul 10' },
  { id: 3, title: 'Human Physiology Complete Guide', type: 'PDF', subject: 'Biology', chapter: 'Human Physiology', batch: 'NEET Batch A', pages: 92, size: '8.1MB', status: 'INDEXED', tags: ['circulatory', 'nervous'], uploaded: 'Jul 8' },
  { id: 4, title: 'JEE Mechanics Problem Set', type: 'PDF', subject: 'Physics', chapter: 'Mechanics', batch: 'JEE Main 2026', pages: 35, size: '2.3MB', status: 'PROCESSING', tags: ['work-energy', 'kinematics'], uploaded: 'Jul 16' },
];

const InstitutionMaterials = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState('VIDEO');

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Materials</h1>
                <p className="text-muted-foreground text-sm mt-1">{materials.length} materials · Used by AI doubt solver for all enrolled students</p>
              </div>
              <Button onClick={() => setShowUpload(v => !v)} iconName="Upload" iconPosition="left">
                Upload
              </Button>
            </div>

            {/* AI knowledge banner */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Brain" size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-heading font-semibold text-foreground mb-1">How institution materials power AI doubts</div>
                  <p className="text-sm text-muted-foreground">When your students ask doubts, the AI searches: <span className="text-foreground">1) Your materials first → 2) NCERT → 3) Web</span>. PDFs are chunked and embedded. Videos are indexed by description and concept tags.</p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-emerald-400 flex items-center gap-1"><Icon name="CheckCircle" size={11} />3 PDFs indexed</span>
                    <span className="text-blue-400 flex items-center gap-1"><Icon name="Play" size={11} />1 video indexed</span>
                    <span className="text-amber-400 flex items-center gap-1"><Icon name="Loader" size={11} />1 processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload form */}
            {showUpload && (
              <div className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Upload Material</h3>
                <div className="flex gap-2 mb-5">
                  {['VIDEO', 'PDF'].map(t => (
                    <button key={t} onClick={() => setUploadType(t)} className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${uploadType === t ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                      <Icon name={t === 'VIDEO' ? 'Play' : 'FileText'} size={14} className="inline mr-2" />
                      {t === 'VIDEO' ? 'Video URL' : 'PDF Upload'}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-foreground mb-1.5 block">Title</label><input placeholder="Material title" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                  {uploadType === 'VIDEO' ? (
                    <div><label className="text-xs font-medium text-foreground mb-1.5 block">Video URL</label><input placeholder="https://youtube.com/..." className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                  ) : (
                    <div><label className="text-xs font-medium text-foreground mb-1.5 block">Upload PDF</label><div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"><Icon name="Upload" size={18} className="mx-auto text-muted-foreground mb-1" /><p className="text-xs text-muted-foreground">Click to upload (max 50MB)</p></div></div>
                  )}
                  <div><label className="text-xs font-medium text-foreground mb-1.5 block">Subject</label><select className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Mathematics</option></select></div>
                  <div><label className="text-xs font-medium text-foreground mb-1.5 block">Batch Access</label><select className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"><option>All batches</option><option>NEET Batch A</option><option>NEET Batch B</option><option>JEE Main 2026</option></select></div>
                  <div className="md:col-span-2"><label className="text-xs font-medium text-foreground mb-1.5 block">Concept Tags (comma-separated)</label><input placeholder="lenzs-law, faradays-law, emi" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                </div>
                <div className="flex gap-3 mt-5">
                  <Button variant="ghost" onClick={() => setShowUpload(false)}>Cancel</Button>
                  <Button iconName="Upload" iconPosition="left">Upload & Process</Button>
                </div>
              </div>
            )}

            {/* Materials table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {['Material', 'Type', 'Subject', 'Chapter', 'Batch', 'Status', 'Uploaded', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(m => (
                      <tr key={m.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground text-sm">{m.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 flex gap-1 flex-wrap">
                            {m.tags.map(t => <span key={t} className="bg-secondary border border-border px-1.5 py-0.5 rounded-full">{t}</span>)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-xs font-medium ${m.type === 'VIDEO' ? 'text-rose-400' : 'text-blue-400'}`}>
                            <Icon name={m.type === 'VIDEO' ? 'Play' : 'FileText'} size={12} />
                            {m.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{m.subject}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{m.chapter}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{m.batch}</td>
                        <td className="px-4 py-3">
                          {m.status === 'INDEXED' ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-400"><Icon name="CheckCircle" size={12} />Indexed</span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-400"><Icon name="Loader" size={12} />Processing</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{m.uploaded}</td>
                        <td className="px-4 py-3">
                          <button className="text-muted-foreground hover:text-rose-400 transition-colors"><Icon name="Trash2" size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionMaterials;
