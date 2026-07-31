import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({ name: 'Arjun Singh', email: 'arjun@example.com', phone: '+91 98765 43210', exam: 'NEET', class: '12', city: 'Mumbai' });
  const [notifs, setNotifs] = useState({ podReady: true, streakAlert: true, mistakeReview: true, contestReminder: true, achievementUnlock: true, weeklyReport: false, emailDigest: false, pushEnabled: true });
  const [privacy, setPrivacy] = useState({ profilePublic: true, showStreak: true, showRank: true, allowMentorContact: false });
  const [sub, setSub] = useState({ tier: 'FREE', dailyDoubts: 3, usedToday: 1 });

  const setP = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const setN = (k, v) => setNotifs(p => ({ ...p, [k]: v }));
  const setPr = (k, v) => setPrivacy(p => ({ ...p, [k]: v }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'subscription', label: 'Subscription', icon: 'CreditCard' },
    { id: 'account', label: 'Account', icon: 'Settings' },
  ];

  const breadcrumbs = [{ label: 'Dashboard', path: '/activity-dashboard' }, { label: 'Settings', path: '/settings' }];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            <BreadcrumbTrail items={breadcrumbs} />
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Settings</h1>
              {activeTab !== 'account' && activeTab !== 'subscription' && (
                <Button onClick={handleSave} iconName={saved ? 'CheckCircle' : 'Save'} iconPosition="left" size="sm">
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar tabs */}
              <div className="md:w-48 flex-shrink-0">
                <nav className="space-y-1">
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${activeTab === t.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                    >
                      <Icon name={t.icon} size={16} />
                      {t.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {activeTab === 'profile' && (
                  <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Profile Information</h3>
                    <div className="flex items-center gap-4 pb-4 border-b border-border">
                      <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">A</div>
                      <div>
                        <Button size="xs" variant="outline">Change Photo</Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 5 MB</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[{ k: 'name', label: 'Full Name' }, { k: 'email', label: 'Email Address' }, { k: 'phone', label: 'Phone Number' }, { k: 'city', label: 'City' }].map(f => (
                        <div key={f.k}>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">{f.label}</label>
                          <input value={profile[f.k]} onChange={e => setP(f.k, e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Target Exam</label>
                        <select value={profile.exam} onChange={e => setP('exam', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                          {['NEET', 'JEE_MAIN', 'JEE_ADV', 'BOTH'].map(e => <option key={e}>{e}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Class Level</label>
                        <select value={profile.class} onChange={e => setP('class', e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                          {['11', '12', 'dropper'].map(c => <option key={c}>Class {c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Notification Preferences</h3>
                    {[
                      { k: 'pushEnabled', label: 'Push Notifications', desc: 'Allow push notifications to your device', section: true },
                      { k: 'podReady', label: "Today's POD Ready", desc: "Notify when today's 5 questions are ready (6 AM)" },
                      { k: 'streakAlert', label: 'Streak Alert', desc: "Remind at 8 PM if you haven't practiced today" },
                      { k: 'mistakeReview', label: 'Mistake Review Due', desc: 'Alert when SM-2 questions are due for review' },
                      { k: 'contestReminder', label: 'Contest Reminders', desc: '24h and 30min before registered contests' },
                      { k: 'achievementUnlock', label: 'Achievement Unlocked', desc: 'Celebrate when you earn a new badge' },
                      { k: 'weeklyReport', label: 'Weekly Summary', desc: 'Weekly performance digest every Monday' },
                      { k: 'emailDigest', label: 'Monthly Report Email', desc: 'Detailed PDF report on the 1st of each month' },
                    ].map((n, i) => (
                      <div key={n.k}>
                        {n.section && i > 0 && <div className="border-t border-border" />}
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-sm font-medium text-foreground">{n.label}</div>
                            <div className="text-xs text-muted-foreground">{n.desc}</div>
                          </div>
                          <button onClick={() => setN(n.k, !notifs[n.k])}
                            className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${notifs[n.k] ? 'bg-primary' : 'bg-secondary border border-border'}`}
                          >
                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifs[n.k] ? 'left-5' : 'left-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Privacy Settings</h3>
                    {[
                      { k: 'profilePublic', label: 'Public Profile', desc: 'Allow others to view your profile page' },
                      { k: 'showStreak', label: 'Show Streak on Profile', desc: 'Display your current streak publicly' },
                      { k: 'showRank', label: 'Show Rank on Leaderboard', desc: 'Appear in the public leaderboard' },
                      { k: 'allowMentorContact', label: 'Allow Mentor Contact', desc: 'Let tutors reach out about coaching' },
                    ].map(n => (
                      <div key={n.k} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{n.label}</div>
                          <div className="text-xs text-muted-foreground">{n.desc}</div>
                        </div>
                        <button onClick={() => setPr(n.k, !privacy[n.k])}
                          className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${privacy[n.k] ? 'bg-primary' : 'bg-secondary border border-border'}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${privacy[n.k] ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'subscription' && (
                  <div className="space-y-4">
                    <div className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-heading font-bold text-foreground text-lg">FREE Plan</span>
                            <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">Current</span>
                          </div>
                          <div className="text-sm text-muted-foreground">3 AI doubt evaluations/day · Basic analytics</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">AI doubts used today</span>
                          <span className="text-foreground">{sub.usedToday}/{sub.dailyDoubts}</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${(sub.usedToday / sub.dailyDoubts) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    {[
                      { name: 'BASIC', price: '₹199', period: '/month', features: ['10 AI doubts/day', 'All practice features', 'SM-2 review queue', 'Basic analytics', 'POD access'] },
                      { name: 'PREMIUM', price: '₹399', period: '/month', features: ['Unlimited AI doubts', 'All BASIC features', 'Priority AI responses', 'Justification evaluation', 'Premium test access', 'Monthly PDF report'], highlight: true },
                    ].map(p => (
                      <div key={p.name} className={`bg-card border rounded-xl p-5 ${p.highlight ? 'border-primary/40 bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-bold text-foreground">{p.name}</span>
                              {p.highlight && <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">Recommended</span>}
                            </div>
                            <span className="text-2xl font-bold text-foreground">{p.price}<span className="text-sm text-muted-foreground font-normal">{p.period}</span></span>
                          </div>
                          <Button size="sm" variant={p.highlight ? 'default' : 'outline'}>Upgrade</Button>
                        </div>
                        <div className="space-y-1.5">
                          {p.features.map(f => (
                            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Check" size={13} className="text-primary flex-shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-4">
                    <div className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-heading font-semibold text-foreground mb-4">Account Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-all text-left">
                          <div className="flex items-center gap-3">
                            <Icon name="Key" size={16} className="text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-foreground">Change Password</div>
                              <div className="text-xs text-muted-foreground">Update your account password</div>
                            </div>
                          </div>
                          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-all text-left">
                          <div className="flex items-center gap-3">
                            <Icon name="Download" size={16} className="text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-foreground">Download My Data</div>
                              <div className="text-xs text-muted-foreground">Export all your attempt history and progress</div>
                            </div>
                          </div>
                          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                        </button>
                        <button onClick={() => { localStorage.clear(); navigate('/login', { replace: true }); }}
                          className="w-full flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-all text-left">
                          <Icon name="LogOut" size={16} className="text-amber-400" />
                          <div>
                            <div className="text-sm font-medium text-amber-400">Sign Out</div>
                            <div className="text-xs text-muted-foreground">Sign out of this device</div>
                          </div>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500/15 transition-all text-left">
                          <Icon name="Trash2" size={16} className="text-rose-400" />
                          <div>
                            <div className="text-sm font-medium text-rose-400">Delete Account</div>
                            <div className="text-xs text-muted-foreground">Permanently delete your account and all data</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
