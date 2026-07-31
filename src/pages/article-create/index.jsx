import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const allTags = ['Electromagnetic Induction', 'Human Physiology', 'Organic Chemistry', 'Genetics', 'Mechanics', 'Thermodynamics', 'Cell Biology', 'Optics', 'Chemical Kinetics', 'Reproduction'];

const ArticleCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('CONCEPT_EXPLANATION');
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleTag = (tag) => setSelectedTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const canPublish = title.trim().length >= 10 && content.trim().length >= 100 && selectedTags.length > 0;

  const handlePublish = () => {
    setSaving(true);
    setTimeout(() => {
      navigate('/articles');
    }, 1500);
  };

  const typeOptions = [
    { val: 'CONCEPT_EXPLANATION', label: 'Concept Explanation', desc: 'Deep-dive on a specific concept', color: 'text-blue-400' },
    { val: 'EXAM_STRATEGY', label: 'Exam Strategy', desc: 'Tips, schedules, and approach', color: 'text-amber-400' },
    { val: 'GENERAL', label: 'General Tips', desc: 'Study methods, motivation, etc.', color: 'text-muted-foreground' },
    { val: 'QUESTION_SOLUTION', label: 'Question Solution', desc: 'Discuss tab solution for a specific question', color: 'text-violet-400' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        {/* Top toolbar */}
        <div className="border-b border-border bg-card/50 px-4 md:px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => navigate('/articles')} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={16} />
          </button>
          <span className="font-heading font-semibold text-foreground text-sm">Write Article</span>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPreview(p => !p)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${preview ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground'}`}
            >
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Button variant="ghost" size="sm" onClick={() => setSaving(true)}>
              Save Draft
            </Button>
            <Button size="sm" disabled={!canPublish || saving} onClick={handlePublish} iconName={saving ? 'Loader' : 'Send'} iconPosition="left">
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            {!preview ? (
              <div className="space-y-6">
                {/* Article type */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Article Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {typeOptions.map(t => (
                      <button
                        key={t.val}
                        onClick={() => setType(t.val)}
                        className={`p-3 rounded-xl border text-left transition-all ${type === t.val ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/40'}`}
                      >
                        <div className={`text-xs font-bold mb-1 ${t.color}`}>{t.label}</div>
                        <div className="text-xs text-muted-foreground">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Article title — make it specific and searchable"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-2xl font-heading font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{title.length}/200 chars</div>
                </div>

                {/* Topic tags */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block flex items-center gap-1.5">
                    <Icon name="Tag" size={14} />
                    Topic Tags <span className="text-rose-400">*</span>
                    <span className="text-xs text-muted-foreground font-normal">(Required — helps AI doubt solver find this article)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedTags.includes(tag) ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {selectedTags.includes(tag) && <Icon name="Check" size={10} className="inline mr-1" />}
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Icon name="FileText" size={14} />
                      Content
                    </label>
                    <span className="text-xs text-muted-foreground">{wordCount} words · ~{readTime} min read</span>
                  </div>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder={`Write your article here. Markdown supported:\n\n**Bold text** for headings\n- Bullet points\n\nShare your insights, strategies, or conceptual explanations. The more detailed, the better — your article will be indexed by the AI doubt solver to help other students.\n\nMinimum 100 characters to publish.`}
                    className="w-full px-4 py-4 bg-card border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none font-mono leading-relaxed"
                    rows={20}
                  />
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="Info" size={11} />Markdown supported: **bold**, - bullets, # headings</span>
                    {content.length >= 100 && <span className="text-emerald-400 flex items-center gap-1"><Icon name="CheckCircle" size={11} />Min length met</span>}
                  </div>
                </div>

                {/* Validation */}
                {!canPublish && (
                  <div className="bg-secondary border border-border rounded-xl p-4">
                    <div className="text-sm font-medium text-foreground mb-2">Before you can publish:</div>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      {title.length < 10 && <div className="flex items-center gap-2"><Icon name="Circle" size={12} className="text-rose-400" />Title must be at least 10 characters</div>}
                      {content.length < 100 && <div className="flex items-center gap-2"><Icon name="Circle" size={12} className="text-rose-400" />Content must be at least 100 characters</div>}
                      {selectedTags.length === 0 && <div className="flex items-center gap-2"><Icon name="Circle" size={12} className="text-rose-400" />Select at least one topic tag</div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Preview mode */
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded-full">Preview</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{t}</span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{title || 'Untitled Article'}</h1>
                <div className="text-sm text-muted-foreground mb-6">You · Just now · {readTime} min read</div>
                <div className="bg-card border border-border rounded-xl p-6 text-foreground/90 leading-relaxed whitespace-pre-wrap text-sm">
                  {content || <span className="text-muted-foreground">No content yet...</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCreate;
