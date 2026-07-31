import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const teachers = [
  { id: 1, name: 'Arun Sharma', initials: 'AS', subjects: ['Physics', 'Mathematics'], batch: 'NEET Batch A', batchType: 'INSTITUTION', students: 42, verified: true, experience: 8, lastActive: '2 hrs ago', accuracy: 71.2, email: 'arun.sharma@allen.in', doubtsResolved: 18, questionsUploaded: 142, isIndependentTutor: false },
  { id: 2, name: 'Priya Patel', initials: 'PP', subjects: ['Chemistry'], batch: 'NEET Batch B', batchType: 'INSTITUTION', students: 38, verified: true, experience: 5, lastActive: '30 min ago', accuracy: 68.5, email: 'priya.patel@allen.in', doubtsResolved: 11, questionsUploaded: 87, isIndependentTutor: false },
  { id: 3, name: 'Suresh Verma', initials: 'SV', subjects: ['Mathematics', 'Physics'], batch: 'JEE Main 2026', batchType: 'INSTITUTION', students: 35, verified: false, experience: 3, lastActive: '1 day ago', accuracy: 72.8, email: 'suresh.verma@allen.in', doubtsResolved: 5, questionsUploaded: 34, isIndependentTutor: false },
  { id: 4, name: 'Anita Gupta', initials: 'AG', subjects: ['Biology'], batch: 'NEET Dropper', batchType: 'INSTITUTION', students: 29, verified: true, experience: 10, lastActive: '5 hrs ago', accuracy: 65.0, email: 'anita.gupta@allen.in', doubtsResolved: 24, questionsUploaded: 198, isIndependentTutor: false },
  { id: 5, name: 'Rajesh Iyer', initials: 'RI', subjects: ['Physics', 'Chemistry'], batch: 'NEET Class 11', batchType: 'INSTITUTION', students: 51, verified: true, experience: 7, lastActive: '1 hr ago', accuracy: 58.2, email: 'rajesh.iyer@allen.in', doubtsResolved: 9, questionsUploaded: 103, isIndependentTutor: false },
  { id: 6, name: 'Kavya Sharma', initials: 'KS', subjects: ['Biology', 'Chemistry'], batch: 'Summer Crash', batchType: 'INSTITUTION', students: 22, verified: false, experience: 2, lastActive: '3 hrs ago', accuracy: 74.1, email: 'kavya.sharma@allen.in', doubtsResolved: 3, questionsUploaded: 21, isIndependentTutor: false },
];

const subjectColors = { Physics: 'bg-blue-500/10 text-blue-400 border-blue-500/20', Chemistry: 'bg-amber-500/10 text-amber-400 border-amber-500/20', Biology: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', Mathematics: 'bg-violet-500/10 text-violet-400 border-violet-500/20' };

const InstitutionTeachers = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('all');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSubject, setInviteSubject] = useState('Physics');
  const [inviting, setInviting] = useState(false);
  const [sent, setSent] = useState(false);

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
    const matchVerified = verifiedFilter === 'all' || (verifiedFilter === 'verified' && t.verified) || (verifiedFilter === 'pending' && !t.verified);
    return matchSearch && matchVerified;
  });

  const handleInvite = () => {
    setInviting(true);
    setTimeout(() => { setInviting(false); setSent(true); setInviteEmail(''); setTimeout(() => { setSent(false); setShowInvite(false); }, 1500); }, 1200);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-5 md:p-7">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wide">Institution</span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Teachers</h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {teachers.length} total · <span className="text-emerald-400">{teachers.filter(t => t.verified).length} verified</span> · <span className="text-amber-400">{teachers.filter(t => !t.verified).length} pending</span>
                </p>
              </div>
              <Button onClick={() => setShowInvite(v => !v)} iconName="UserPlus" iconPosition="left" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">Invite Teacher</Button>
            </div>

            {/* Invite panel */}
            {showInvite && (
              <div className="bg-card border border-indigo-500/20 rounded-xl p-5 mb-5">
                <h3 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Icon name="Mail" size={15} className="text-indigo-400" />
                  Invite a Teacher
                </h3>
                <p className="text-sm text-muted-foreground mb-4">The teacher receives an email to create an account and join your institution. Their batch is assigned after onboarding.</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Email address</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      placeholder="teacher@yourinstitution.com"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Primary Subject</label>
                    <select value={inviteSubject} onChange={e => setInviteSubject(e.target.value)} className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                      {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="ghost" size="sm" onClick={() => setShowInvite(false)}>Cancel</Button>
                  <Button
                    size="sm"
                    onClick={handleInvite}
                    disabled={!inviteEmail || inviting || sent}
                    iconName={sent ? 'CheckCircle' : inviting ? 'Loader' : 'Send'}
                    iconPosition="left"
                    className={sent ? 'bg-emerald-600 border-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600'}
                  >
                    {sent ? 'Invite sent!' : inviting ? 'Sending...' : 'Send Invite'}
                  </Button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
              </div>
              <div className="flex gap-1 bg-secondary border border-border rounded-xl p-1">
                {[['all', 'All'], ['verified', 'Verified'], ['pending', 'Pending']].map(([val, label]) => (
                  <button key={val} onClick={() => setVerifiedFilter(val)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${verifiedFilter === val ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}>{label}</button>
                ))}
              </div>
            </div>

            {/* Teachers grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(t => (
                <div key={t.id} className="bg-card border border-border rounded-xl p-5 hover:border-indigo-500/25 transition-all group">
                  {/* Teacher header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-sm font-bold text-indigo-400 flex-shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-semibold text-foreground text-sm">{t.name}</span>
                        {t.verified
                          ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">Verified</span>
                          : <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">Pending</span>
                        }
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{t.email}</div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                    <div className="bg-secondary rounded-lg p-2.5">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Batch</div>
                      <div className="text-xs font-semibold text-foreground truncate">{t.batch}</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2.5">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Students</div>
                      <div className="text-xs font-semibold text-foreground">{t.students}</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2.5">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Batch Accuracy</div>
                      <div className={`text-xs font-bold font-mono ${t.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{t.accuracy}%</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2.5">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Experience</div>
                      <div className="text-xs font-semibold text-foreground">{t.experience} yrs</div>
                    </div>
                  </div>

                  {/* Subject tags */}
                  <div className="flex flex-wrap gap-1 mb-3.5">
                    {t.subjects.map(s => (
                      <span key={s} className={`text-[10px] border px-1.5 py-0.5 rounded-full font-medium ${subjectColors[s] || 'bg-secondary border-border text-muted-foreground'}`}>{s}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Icon name="MessageCircleQuestion" size={11} />{t.doubtsResolved} resolved</span>
                      <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />{t.questionsUploaded} Qs</span>
                    </div>
                    <div className="flex gap-1.5">
                      {!t.verified && (
                        <button className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded bg-emerald-500/10">Verify</button>
                      )}
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
                        <Icon name="MoreHorizontal" size={14} />
                      </button>
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
