import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const teachers = [
  { id: 1, name: 'Mr. Arun Sharma', subjects: ['Physics', 'Mathematics'], batch: 'NEET Batch A', students: 42, verified: true, experience: 8, joinCode: 'TEACHER-SH1', lastActive: '2 hrs ago', accuracy: 71.2, email: 'arun.sharma@allen.in' },
  { id: 2, name: 'Ms. Priya Patel', subjects: ['Chemistry'], batch: 'NEET Batch B', students: 38, verified: true, experience: 5, joinCode: 'TEACHER-PT2', lastActive: '30 min ago', accuracy: 68.5, email: 'priya.patel@allen.in' },
  { id: 3, name: 'Mr. Suresh Verma', subjects: ['Mathematics', 'Physics'], batch: 'JEE Main 2026', students: 35, verified: false, experience: 3, joinCode: 'TEACHER-VR3', lastActive: '1 day ago', accuracy: 72.8, email: 'suresh.verma@allen.in' },
  { id: 4, name: 'Ms. Anita Gupta', subjects: ['Biology'], batch: 'NEET Dropper', students: 29, verified: true, experience: 10, joinCode: 'TEACHER-GP4', lastActive: '5 hrs ago', accuracy: 65.0, email: 'anita.gupta@allen.in' },
  { id: 5, name: 'Mr. Rajesh Iyer', subjects: ['Physics', 'Chemistry'], batch: 'NEET Class 11', students: 51, verified: true, experience: 7, joinCode: 'TEACHER-IY5', lastActive: '1 hr ago', accuracy: 58.2, email: 'rajesh.iyer@allen.in' },
  { id: 6, name: 'Ms. Kavya Sharma', subjects: ['Biology', 'Chemistry'], batch: 'Summer Crash', students: 22, verified: false, experience: 2, joinCode: 'TEACHER-KS6', lastActive: '3 hrs ago', accuracy: 74.1, email: 'kavya.sharma@allen.in' },
];

const InstitutionTeachers = () => {
  const navigate = useNavigate();
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  const filtered = teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase()));

  const handleInvite = () => {
    setInviting(true);
    setTimeout(() => { setInviting(false); setInviteEmail(''); setShowInvite(false); }, 1500);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Teachers</h1>
                <p className="text-muted-foreground text-sm mt-1">{teachers.length} teachers · {teachers.filter(t => t.verified).length} verified</p>
              </div>
              <Button onClick={() => setShowInvite(v => !v)} iconName="UserPlus" iconPosition="left">
                Invite Teacher
              </Button>
            </div>

            {showInvite && (
              <div className="bg-card border border-primary/20 rounded-xl p-5 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Invite a Teacher</h3>
                <p className="text-sm text-muted-foreground mb-4">Teacher will receive an email to set up their account and join your institution.</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="teacher@yourinstitution.com"
                    className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button onClick={handleInvite} disabled={!inviteEmail || inviting} iconName={inviting ? 'Loader' : 'Send'} iconPosition="left">
                    {inviting ? 'Sending...' : 'Send Invite'}
                  </Button>
                </div>
              </div>
            )}

            <div className="relative mb-5">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map(t => (
                <div key={t.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-base font-bold text-primary flex-shrink-0">
                      {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-foreground">{t.name}</span>
                        {t.verified
                          ? <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">Verified</span>
                          : <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">Pending</span>
                        }
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div><span className="text-muted-foreground text-xs">Batch</span><div className="text-foreground font-medium">{t.batch}</div></div>
                    <div><span className="text-muted-foreground text-xs">Students</span><div className="text-foreground font-medium">{t.students}</div></div>
                    <div><span className="text-muted-foreground text-xs">Experience</span><div className="text-foreground font-medium">{t.experience} years</div></div>
                    <div><span className="text-muted-foreground text-xs">Batch Accuracy</span><div className={`font-bold ${t.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{t.accuracy}%</div></div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {t.subjects.map(s => <span key={s} className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">{s}</span>)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last active: {t.lastActive}</span>
                    <div className="flex gap-2">
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Icon name="Settings" size={14} />
                      </button>
                      {!t.verified && (
                        <button className="text-muted-foreground hover:text-emerald-400 transition-colors text-xs font-medium">
                          Verify →
                        </button>
                      )}
                    </div>
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

export default InstitutionTeachers;
