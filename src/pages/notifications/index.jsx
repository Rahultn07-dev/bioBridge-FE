import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const notificationsData = [
  { id: 1, type: 'STREAK_ALERT', icon: 'Flame', color: 'text-orange-400', bg: 'bg-orange-500/10', title: "Don't break your 12-day streak!", body: "You haven't practiced today. Complete the POD or solve 5 questions to keep it alive.", time: '8:00 PM', read: false, actionUrl: '/pod', actionLabel: 'Go to POD' },
  { id: 2, type: 'ACHIEVEMENT_UNLOCKED', icon: 'Award', color: 'text-amber-400', bg: 'bg-amber-500/10', title: '🏆 Badge Unlocked: Century!', body: 'You just solved your 100th question. You earned 500 XP!', time: '3:42 PM', read: false, actionUrl: '/user-profile', actionLabel: 'View Badge' },
  { id: 3, type: 'POD_READY', icon: 'Calendar', color: 'text-primary', bg: 'bg-primary/10', title: "Today's POD is ready!", body: 'Physics · Chemistry · Biology — 5 questions awaiting. 2,847 students have already started.', time: '6:00 AM', read: false, actionUrl: '/pod', actionLabel: 'Start POD' },
  { id: 4, type: 'MISTAKE_REVIEW_DUE', icon: 'RefreshCw', color: 'text-violet-400', bg: 'bg-violet-500/10', title: '4 reviews due today', body: "Lenz's Law, Nerve Signal Transmission, and 2 more are due for spaced repetition review.", time: 'Yesterday', read: true, actionUrl: '/review', actionLabel: 'Review Now' },
  { id: 5, type: 'RANK_CHANGE', icon: 'TrendingUp', color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'You moved up to #142!', body: 'You climbed 8 spots on the NEET Overall leaderboard. 250 XP away from #141.', time: 'Yesterday', read: true, actionUrl: '/leaderboard', actionLabel: 'View Ranking' },
  { id: 6, type: 'BATCH_ANNOUNCEMENT', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Teacher: Special POD tomorrow', body: 'Mr. Sharma has configured a special 10-question POD on Mechanics for tomorrow. Start at 7 AM.', time: '2 days ago', read: true, actionUrl: '/pod', actionLabel: 'See Details' },
  { id: 7, type: 'SUBSCRIPTION', icon: 'CreditCard', color: 'text-rose-400', bg: 'bg-rose-500/10', title: 'Your FREE plan: 3 AI doubts/day used', body: 'You have used all 3 daily AI doubt evaluations. Upgrade to Premium for unlimited access.', time: '3 days ago', read: true, actionUrl: '/user-profile', actionLabel: 'Upgrade' },
  { id: 8, type: 'JUSTIFICATION_SCORED', icon: 'Brain', color: 'text-violet-400', bg: 'bg-violet-500/10', title: 'Your justification scored 88/100', body: "Your explanation for Lenz's Law was scored 88/100 — Strong Understanding! Your SM-2 interval has been extended.", time: '3 days ago', read: true, actionUrl: '/review', actionLabel: 'View Feedback' },
];

const categories = ['All', 'Unread', 'Achievements', 'Reviews', 'Contests', 'System'];

const Notifications = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState(notificationsData);

  const markRead = (id) => setItems(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setItems(p => p.map(n => ({ ...n, read: true })));

  const filtered = items.filter(n => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Unread') return !n.read;
    if (activeCategory === 'Achievements') return n.type === 'ACHIEVEMENT_UNLOCKED';
    if (activeCategory === 'Reviews') return n.type === 'MISTAKE_REVIEW_DUE' || n.type === 'JUSTIFICATION_SCORED';
    if (activeCategory === 'Contests') return n.type === 'POD_READY' || n.type === 'RANK_CHANGE';
    if (activeCategory === 'System') return n.type === 'SUBSCRIPTION' || n.type === 'BATCH_ANNOUNCEMENT';
    return true;
  });

  const unreadCount = items.filter(n => !n.read).length;

  const breadcrumbs = [{ label: 'Dashboard', path: '/activity-dashboard' }, { label: 'Notifications', path: '/notifications' }];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            <BreadcrumbTrail items={breadcrumbs} />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="text-sm bg-primary text-white px-2 py-0.5 rounded-full font-normal">{unreadCount}</span>
                  )}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">All your alerts, achievements, and updates</p>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllRead} iconName="CheckCheck" iconPosition="left">
                  Mark all read
                </Button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategory === cat ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                  {cat === 'Unread' && unreadCount > 0 && (
                    <span className="ml-1.5 bg-white/20 text-white text-xs px-1.5 rounded-full">{unreadCount}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Notification list */}
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Icon name="Bell" size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No notifications in this category</p>
                </div>
              ) : (
                filtered.map(n => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:border-primary/30 ${
                      !n.read ? 'bg-card border-border' : 'bg-card/50 border-border/50'
                    }`}
                    onClick={() => { markRead(n.id); navigate(n.actionUrl); }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.bg}`}>
                      <Icon name={n.icon} size={18} className={n.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-heading font-semibold ${!n.read ? 'text-foreground' : 'text-foreground/80'}`}>{n.title}</span>
                          {!n.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className={`text-sm mt-0.5 leading-relaxed ${!n.read ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>{n.body}</p>
                      <button
                        className="mt-2 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                        onClick={e => { e.stopPropagation(); markRead(n.id); navigate(n.actionUrl); }}
                      >
                        {n.actionLabel} →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
