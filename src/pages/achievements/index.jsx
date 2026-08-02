import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';

// Maps to achievements (Table 18) + student_achievements (Table 19) schema
// achievement categories from schema: streak, volume, accuracy, speed, social, contest, special
const earnedIds = [1, 2, 3, 5, 9, 12];

const achievements = [
  { id: 1, title: 'First Blood', desc: 'Complete your first practice session', icon: 'Zap', category: 'volume', xp: 50, rarity: 'common', earnedAt: 'Jun 12, 2026' },
  { id: 2, title: '7-Day Streak', desc: 'Practice 7 days in a row', icon: 'Flame', category: 'streak', xp: 100, rarity: 'common', earnedAt: 'Jun 19, 2026' },
  { id: 3, title: 'Century Club', desc: 'Attempt 100 questions total', icon: 'Target', category: 'volume', xp: 150, rarity: 'uncommon', earnedAt: 'Jul 1, 2026' },
  { id: 4, title: '30-Day Streak', desc: 'Practice 30 days in a row', icon: 'Flame', category: 'streak', xp: 400, rarity: 'rare', earnedAt: null },
  { id: 5, title: 'Sharp Shooter', desc: 'Score 80%+ accuracy in a single session', icon: 'Crosshair', category: 'accuracy', xp: 200, rarity: 'uncommon', earnedAt: 'Jul 8, 2026' },
  { id: 6, title: 'Speed Demon', desc: 'Complete POD in under 10 minutes', icon: 'Timer', category: 'speed', xp: 250, rarity: 'rare', earnedAt: null },
  { id: 7, title: 'POD Warrior', desc: 'Complete 30 consecutive PODs', icon: 'Calendar', category: 'streak', xp: 500, rarity: 'epic', earnedAt: null },
  { id: 8, title: 'Knowledge Sharer', desc: 'Publish your first article', icon: 'FileText', category: 'social', xp: 100, rarity: 'common', earnedAt: null },
  { id: 9, title: 'Chapter Master', desc: 'Achieve >85% accuracy in any chapter', icon: 'BookOpen', category: 'accuracy', xp: 300, rarity: 'rare', earnedAt: 'Jul 15, 2026' },
  { id: 10, title: 'Contest Debut', desc: 'Participate in your first live contest', icon: 'Trophy', category: 'contest', xp: 150, rarity: 'uncommon', earnedAt: null },
  { id: 11, title: 'Top 10%', desc: 'Rank in top 10% of any contest', icon: 'Award', category: 'contest', xp: 500, rarity: 'epic', earnedAt: null },
  { id: 12, title: 'Doubt Resolved', desc: 'Get your first doubt answered by a teacher', icon: 'MessageCircleQuestion', category: 'special', xp: 75, rarity: 'common', earnedAt: 'Jul 22, 2026' },
  { id: 13, title: '1000 Questions', desc: 'Attempt 1000 questions total', icon: 'Hash', category: 'volume', xp: 600, rarity: 'epic', earnedAt: null },
  { id: 14, title: 'Mistake Slayer', desc: 'Clear your entire mistake backlog', icon: 'CheckSquare', category: 'special', xp: 350, rarity: 'rare', earnedAt: null },
  { id: 15, title: 'Social Butterfly', desc: 'Get 10 upvotes on your articles', icon: 'ThumbsUp', category: 'social', xp: 200, rarity: 'uncommon', earnedAt: null },
  { id: 16, title: '100-Day Streak', desc: 'Practice 100 days in a row', icon: 'Flame', category: 'streak', xp: 1500, rarity: 'legendary', earnedAt: null },
  { id: 17, title: 'NEET Ready', desc: 'Maintain 70%+ accuracy for 30 days', icon: 'Star', category: 'accuracy', xp: 1000, rarity: 'legendary', earnedAt: null },
];

const rarityConfig = {
  common: { color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', glow: '', label: 'Common' },
  uncommon: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', glow: '', label: 'Uncommon' },
  rare: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', glow: '', label: 'Rare' },
  epic: { color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', glow: 'shadow-violet-500/10', label: 'Epic' },
  legendary: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', glow: 'shadow-amber-500/15', label: 'Legendary' },
};

const categoryIcons = { streak: 'Flame', volume: 'Hash', accuracy: 'Target', speed: 'Timer', social: 'Users', contest: 'Trophy', special: 'Star' };

const Achievements = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');

  const earned = achievements.filter(a => earnedIds.includes(a.id));
  const totalXP = earned.reduce((s, a) => s + a.xp, 0);

  const filtered = achievements.filter(a => {
    const matchStatus = filter === 'all' || (filter === 'earned' && earnedIds.includes(a.id)) || (filter === 'locked' && !earnedIds.includes(a.id));
    const matchCat = catFilter === 'all' || a.category === catFilter;
    return matchStatus && matchCat;
  });

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <div className="ml-0 lg:ml-56 flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold text-foreground">Achievements</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Milestones earned through consistent practice and performance</p>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Earned', value: earned.length, total: achievements.length, color: 'text-emerald-400', icon: 'Award' },
                { label: 'Total XP', value: totalXP.toLocaleString(), color: 'text-amber-400', icon: 'Zap' },
                { label: 'Rare+', value: earned.filter(a => ['rare','epic','legendary'].includes(a.rarity)).length, color: 'text-blue-400', icon: 'Star' },
                { label: 'Locked', value: achievements.length - earned.length, color: 'text-muted-foreground', icon: 'Lock' },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                  <Icon name={s.icon} size={18} className={s.color} />
                  <div>
                    <div className={`text-xl font-heading font-bold ${s.color}`}>{s.value}{s.total ? <span className="text-sm text-muted-foreground font-normal">/{s.total}</span> : ''}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Overall Progress</span>
                <span className="text-muted-foreground">{earned.length}/{achievements.length} achievements</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all" style={{ width: `${(earned.length / achievements.length) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{achievements.length - earned.length} more to unlock · Keep practicing to earn XP and unlock badges</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="flex gap-1 bg-secondary border border-border rounded-xl p-1">
                {[['all', 'All'], ['earned', 'Earned'], ['locked', 'Locked']].map(([val, label]) => (
                  <button key={val} onClick={() => setFilter(val)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === val ? 'bg-card text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{label}</button>
                ))}
              </div>
              <div className="flex gap-1 bg-secondary border border-border rounded-xl p-1 flex-wrap">
                {categories.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${catFilter === c ? 'bg-card text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    {c !== 'all' && <Icon name={categoryIcons[c] || 'Circle'} size={10} />}
                    {c === 'all' ? 'All' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Achievements grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filtered.map(a => {
                const isEarned = earnedIds.includes(a.id);
                const rc = rarityConfig[a.rarity];
                return (
                  <div
                    key={a.id}
                    className={`bg-card border rounded-xl p-4 transition-all ${isEarned ? `${rc.bg} hover:shadow-lg ${rc.glow}` : 'border-border/50 opacity-55'}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isEarned ? rc.bg : 'bg-secondary'} border ${isEarned ? '' : 'border-border'}`}>
                        {isEarned
                          ? <Icon name={a.icon} size={20} className={rc.color} />
                          : <Icon name="Lock" size={16} className="text-muted-foreground/40" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-heading font-bold ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>{a.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wide ${rc.color}`}>{rc.label}</span>
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed mb-3 ${isEarned ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>{a.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold flex items-center gap-1 ${isEarned ? 'text-amber-400' : 'text-muted-foreground/50'}`}>
                        <Icon name="Zap" size={11} />
                        {a.xp} XP
                      </span>
                      {isEarned && a.earnedAt && (
                        <span className="text-[10px] text-muted-foreground">{a.earnedAt}</span>
                      )}
                      {!isEarned && (
                        <span className="text-[10px] text-muted-foreground/50">Locked</span>
                      )}
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

export default Achievements;
