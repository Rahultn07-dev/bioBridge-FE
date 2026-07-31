import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const topicTags = ['All', 'Electromagnetic Induction', 'Human Physiology', 'Organic Chemistry', 'Genetics', 'Mechanics', 'Thermodynamics', 'Optics', 'Cell Biology'];

const articles = [
  { id: 1, slug: 'mastering-lenzs-law', title: "How I Finally Understood Lenz's Law (And Stop Confusing Direction)", author: 'Arjun Singh', avatar: 'A', type: 'CONCEPT_EXPLANATION', tags: ['Electromagnetic Induction', 'lenzs-law'], upvotes: 142, views: 2840, comments: 18, readTime: '5 min', date: '2 days ago', excerpt: "I got Lenz's law wrong 6 times before I found the pattern. The right-hand rule is not enough — here's the mental model that fixed it for me..." },
  { id: 2, slug: 'neet-2026-organic-strategy', title: 'My Organic Chemistry Strategy for NEET 2026 (from 52% to 85%)', author: 'Priya Nair', avatar: 'P', type: 'EXAM_STRATEGY', tags: ['Organic Chemistry'], upvotes: 287, views: 5612, comments: 34, readTime: '8 min', date: '4 days ago', excerpt: 'Three months ago I was scoring 52% in Organic. Today I consistently hit 85%+. Here is the exact sequence I followed...' },
  { id: 3, slug: 'human-physiology-one-liners', title: '60 One-Liners for Human Physiology — NEET Critical', author: 'Riya Sharma', avatar: 'R', type: 'GENERAL', tags: ['Human Physiology'], upvotes: 421, views: 8930, comments: 52, readTime: '10 min', date: '1 week ago', excerpt: 'Human Physiology has 20+ NEET questions. These 60 one-liners cover 90% of what gets asked. Print and stick them everywhere...' },
  { id: 4, slug: 'genetics-dihybrid-shortcut', title: 'Dihybrid Cross Shortcut That Saves 2 Minutes in NEET', author: 'Kabir Mehta', avatar: 'K', type: 'CONCEPT_EXPLANATION', tags: ['Genetics'], upvotes: 98, views: 1870, comments: 12, readTime: '3 min', date: '1 week ago', excerpt: 'The Punnett square takes too long in a timed exam. Here is how to calculate dihybrid ratios in 20 seconds...' },
  { id: 5, slug: 'sm2-review-benefits', title: 'Why I Stopped Rereading Notes and Started Using SM-2 Reviews', author: 'Deepa Pillai', avatar: 'D', type: 'EXAM_STRATEGY', tags: ['Study Methods'], upvotes: 203, views: 3240, comments: 27, readTime: '6 min', date: '2 weeks ago', excerpt: 'Passive reading gives you an illusion of mastery. Active retrieval via spaced repetition is scientifically proven to work better. Here is my system...' },
];

const typeConfig = {
  CONCEPT_EXPLANATION: { label: 'Concept', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  EXAM_STRATEGY: { label: 'Strategy', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  GENERAL: { label: 'General', color: 'text-muted-foreground bg-secondary border-border' },
  QUESTION_SOLUTION: { label: 'Solution', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
};

const ArticlesFeed = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => {
    const matchTag = activeTag === 'All' || a.tags.some(t => t.includes(activeTag));
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const breadcrumbs = [{ label: 'Dashboard', path: '/activity-dashboard' }, { label: 'Articles', path: '/articles' }];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <BreadcrumbTrail items={breadcrumbs} />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Community Articles</h1>
                <p className="text-muted-foreground text-sm mt-1">Peer explanations, strategies, and insights tagged by topic</p>
              </div>
              <Button onClick={() => navigate('/articles/create')} iconName="PenLine" iconPosition="left">
                Write Article
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles, topics, strategies..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Topic tag filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
              {topicTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex-shrink-0 font-medium transition-all ${
                    activeTag === tag ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Article list */}
              <div className="lg:col-span-2 space-y-4">
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Icon name="FileText" size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No articles found</p>
                  </div>
                ) : filtered.map(a => {
                  const tc = typeConfig[a.type];
                  return (
                    <div
                      key={a.id}
                      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer"
                      onClick={() => navigate(`/articles/${a.slug}`)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tc.color}`}>{tc.label}</span>
                            {a.tags.map(t => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{t}</span>
                            ))}
                          </div>
                          <h3 className="font-heading font-semibold text-foreground leading-snug mb-2 hover:text-primary transition-colors">{a.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">{a.avatar}</div>
                            <span className="text-xs text-muted-foreground">{a.author}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{a.date}</span>
                          <span className="text-xs text-muted-foreground">{a.readTime} read</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="ArrowUp" size={12} />{a.upvotes}</span>
                          <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} />{a.comments}</span>
                          <span className="flex items-center gap-1"><Icon name="Eye" size={12} />{a.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} className="text-primary" />
                    Trending Today
                  </h3>
                  <div className="space-y-3">
                    {articles.slice(0, 3).map((a, i) => (
                      <div key={a.id} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/articles/${a.slug}`)}>
                        <span className="text-2xl font-bold text-muted-foreground/30 font-mono leading-none">{i + 1}</span>
                        <div>
                          <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug">{a.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Icon name="ArrowUp" size={10} />{a.upvotes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="PenLine" size={16} className="text-primary" />
                    Share your knowledge
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Your articles get indexed by the AI doubt solver — helping future students and improving platform intelligence.</p>
                  <Button className="w-full" onClick={() => navigate('/articles/create')}>
                    Write an Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesFeed;
