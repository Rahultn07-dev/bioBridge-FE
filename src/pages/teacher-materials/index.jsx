import React, { useState } from 'react';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const materials = [
  { id: 1, title: 'EM Induction — Full Lecture', type: 'VIDEO', subject: 'Physics', chapter: 'Electromagnetic Induction', url: 'https://youtube.com/watch?v=example', duration: '52 min', uploaded: '3 days ago', batchAccess: 'All batches', tags: ['lenzs-law', 'faradays-law'] },
  { id: 2, title: 'Organic Chemistry Module — Reactions', type: 'PDF', subject: 'Chemistry', chapter: 'Organic Chemistry', url: '', fileSize: '4.2 MB', pages: 48, uploaded: '1 week ago', batchAccess: 'All batches', tags: ['sn2', 'sn1', 'organic-reactions'] },
  { id: 3, title: 'Human Physiology Notes (Detailed)', type: 'PDF', subject: 'Biology', chapter: 'Human Physiology', url: '', fileSize: '8.1 MB', pages: 92, uploaded: '2 weeks ago', batchAccess: 'All batches', tags: ['circulatory', 'nervous-system'] },
];

const TeacherMaterials = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState('VIDEO');
  const [formData, setFormData] = useState({ title: '', subject: '', chapter: '', url: '', tags: '' });
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setShowUpload(false); }, 1500);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Materials</h1>
                <p className="text-muted-foreground text-sm mt-1">Upload videos and PDFs — used by AI doubt solver for your students</p>
              </div>
              <Button onClick={() => setShowUpload(v => !v)} iconName="Upload" iconPosition="left">
                Upload Material
              </Button>
            </div>

            {/* Upload form */}
            {showUpload && (
              <div className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Upload New Material</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <div className="flex gap-2 mb-4">
                      {['VIDEO', 'PDF'].map(t => (
                        <button key={t} onClick={() => setUploadType(t)} className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${uploadType === t ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                          <Icon name={t === 'VIDEO' ? 'Play' : 'FileText'} size={14} className="inline mr-2" />
                          {t === 'VIDEO' ? 'Video (YouTube/URL)' : 'PDF Document'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {[
                    { key: 'title', label: 'Title', placeholder: 'e.g. EM Induction — Lenz\'s Law Deep Dive' },
                    { key: uploadType === 'VIDEO' ? 'url' : 'file', label: uploadType === 'VIDEO' ? 'YouTube / Video URL' : 'Upload PDF File', placeholder: uploadType === 'VIDEO' ? 'https://youtube.com/watch?v=...' : '' },
                    { key: 'subject', label: 'Subject', placeholder: 'Physics / Chemistry / Biology' },
                    { key: 'chapter', label: 'Chapter', placeholder: 'e.g. Electromagnetic Induction' },
                    { key: 'tags', label: 'Concept Tags (comma-separated)', placeholder: 'lenzs-law, faradays-law, flux' },
                  ].map(f => (
                    <div key={f.key} className={f.key === 'tags' ? 'md:col-span-2' : ''}>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">{f.label}</label>
                      {f.key === 'file' ? (
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload PDF or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF up to 50 MB</p>
                        </div>
                      ) : (
                        <input type="text" value={formData[f.key] || ''} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Batch Access</label>
                    <select className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>All batches</option>
                      <option>NEET Batch A only</option>
                      <option>Advanced group only</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <Button variant="ghost" onClick={() => setShowUpload(false)}>Cancel</Button>
                  <Button onClick={handleUpload} disabled={uploading || !formData.title} iconName={uploading ? 'Loader' : 'Upload'} iconPosition="left">
                    {uploading ? 'Uploading...' : 'Upload & Process'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  PDFs will be processed by Gemini AI → chunked → embedded. Available in AI doubt solver within ~2 minutes.
                </p>
              </div>
            )}

            {/* Info banner */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Icon name="Brain" size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Materials = AI knowledge.</strong> When your students ask doubts, the AI searches these materials first — before NCERT and the web. Your coaching notes directly power the AI answers for your students only.
              </div>
            </div>

            {/* Materials grid */}
            <div className="space-y-3">
              {materials.map(m => (
                <div key={m.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.type === 'VIDEO' ? 'bg-rose-500/10' : 'bg-blue-500/10'}`}>
                    <Icon name={m.type === 'VIDEO' ? 'Play' : 'FileText'} size={18} className={m.type === 'VIDEO' ? 'text-rose-400' : 'text-blue-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{m.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${m.type === 'VIDEO' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'}`}>{m.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                      <span>{m.subject}</span>
                      <span>·</span>
                      <span>{m.chapter}</span>
                      <span>·</span>
                      <span>{m.type === 'VIDEO' ? m.duration : `${m.pages} pages · ${m.fileSize}`}</span>
                      <span>·</span>
                      <span>Uploaded {m.uploaded}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {m.tags.map(t => (
                        <span key={t} className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                      <Icon name="CheckCircle" size={11} />
                      <span>Indexed · {m.batchAccess}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><Icon name="Pencil" size={14} /></button>
                    <button className="p-1.5 text-muted-foreground hover:text-rose-400 transition-colors"><Icon name="Trash2" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMaterials;
