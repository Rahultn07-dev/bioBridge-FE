import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const article = {
  slug: 'mastering-lenzs-law',
  title: "How I Finally Understood Lenz's Law (And Stop Confusing Direction)",
  author: 'Arjun Singh', avatar: 'A', date: 'Jul 14, 2026', readTime: '5 min read',
  type: 'CONCEPT_EXPLANATION', tags: ['Electromagnetic Induction', 'lenzs-law', 'faradays-law'],
  upvotes: 142, bookmarks: 47, views: 2840,
  content: `I got Lenz's law wrong 6 times in practice sessions before I found the pattern. Each time, I knew the formula (ε = −dΦ/dt), but I kept confusing the direction of the induced current.

**The Problem With "Just Use Right-Hand Rule"**

Every teacher says "use the right-hand rule." But when you're mid-exam under time pressure, the right-hand rule has too many steps. You need a faster mental model.

**The Mental Model That Fixed It**

Think of the coil as a "magnetic bully." The coil always tries to push away whatever change is happening to its flux.

- Magnet coming in (north pole first)? The coil creates a north pole to push it back.
- Magnet going out? The coil creates a south pole to pull it back.
- Flux increasing? Coil opposes by reducing flux → induced current counterclockwise (when viewed from the direction of increasing flux).
- Flux decreasing? Coil opposes by increasing flux → induced current clockwise.

**The One-Step Check**

Before answering any Lenz's law question:
1. Is flux increasing or decreasing?
2. Induced current opposes that change.
3. Use right-hand rule ONLY for the final direction, not for the concept.

**NEET Pattern: What Gets Asked**

NEET typically asks 3-4 questions from Electromagnetic Induction. The most common trap:
- "Coil rotating in a magnetic field — when is EMF maximum?"
  Answer: When coil is **parallel** to B (not perpendicular). Many students confuse this.
  
- "Direction of induced current when magnet approaches"
  Use the mental model above, not the formula.

**Practice Questions to Try**

1. A magnet's south pole is moved away from a coil. What is the direction of induced current in the coil as viewed from the magnet's side?
2. A coil rotates from θ=90° to θ=0° (parallel to B). How does EMF change?

Work these out yourself first, then check your reasoning using the "magnetic bully" model.`,
  comments: [
    { id: 1, author: 'Priya N.', avatar: 'P', text: "The 'magnetic bully' analogy is genius. I've been struggling with direction for months. This clicked immediately!", time: '1 day ago', upvotes: 23 },
    { id: 2, author: 'Riya S.', avatar: 'R', text: 'Bookmarked. Also the NEET pattern section is super useful — didn\'t know coil parallel to B gives max EMF, I always thought it was perpendicular.', time: '2 days ago', upvotes: 15 },
    { id: 3, author: 'Kabir M.', avatar: 'K', text: 'Could you also do one for Back EMF in motors? I always get that confused with Lenz\'s law in motors vs generators.', time: '2 days ago', upvotes: 8 },
  ],
};

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(article.comments);

  const addComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [{ id: Date.now(), author: 'You', avatar: 'Y', text: comment, time: 'Just now', upvotes: 0 }, ...prev]);
    setComment('');
  };

  const renderContent = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return <h3 key={i} className="text-lg font-heading font-semibold text-foreground mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
      }
      if (para.startsWith('- ')) {
        const items = para.split('\n').filter(l => l.startsWith('- '));
        return <ul key={i} className="space-y-1 my-3">{items.map((item, j) => <li key={j} className="flex items-start gap-2 text-foreground/90"><span className="text-primary mt-1.5 flex-shrink-0">•</span><span>{item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, (_, m) => m)}</span></li>)}</ul>;
      }
      const rendered = para.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      return <p key={i} className="text-foreground/90 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: rendered }} />;
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Back */}
            <button onClick={() => navigate('/articles')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
              <Icon name="ArrowLeft" size={14} />
              Back to Articles
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/20 font-medium">Concept Explanation</span>
                {article.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{t}</span>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 leading-snug">{article.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">{article.avatar}</div>
                  <span className="text-foreground font-medium">{article.author}</span>
                </div>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
                <span className="flex items-center gap-1"><Icon name="Eye" size={13} />{article.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6 prose-sm">
              {renderContent(article.content)}
            </div>

            {/* Reactions */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-card border border-border rounded-xl">
              <button
                onClick={() => setUpvoted(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${upvoted ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
              >
                <Icon name="ArrowUp" size={15} />
                {article.upvotes + (upvoted ? 1 : 0)} Upvotes
              </button>
              <button
                onClick={() => setBookmarked(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${bookmarked ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'border-border text-muted-foreground hover:border-amber-500/50'}`}
              >
                <Icon name="Bookmark" size={15} />
                {bookmarked ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm hover:border-primary/50 ml-auto transition-all">
                <Icon name="Share2" size={15} />
                Share
              </button>
            </div>

            {/* Comments */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="MessageCircle" size={16} className="text-primary" />
                {comments.length} Comments
              </h3>

              {/* Add comment */}
              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Add a helpful comment or ask a question..."
                  className="w-full px-3 py-3 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={addComment} disabled={!comment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comment list */}
              <div className="space-y-4">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0">{c.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{c.author}</span>
                        <span className="text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                      <button className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Icon name="ArrowUp" size={11} />
                        {c.upvotes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
