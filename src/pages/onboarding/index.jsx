import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Invitation flow — simulates an invitation being sent & accepted
const INVITE_SENT_STATE = { email: '', sent: false };

const STEPS = [
  { id: 'role', label: 'Role' },
  { id: 'exam', label: 'Exam' },
  { id: 'class', label: 'Class' },
  { id: 'setup', label: 'Setup' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: '', exam: '', classLevel: '',
    mode: '', subjects: [], institutionName: '', bio: '',
  });
  // Tutor invite state
  const [invite, setInvite] = useState({ email: '', phone: '', sent: false, accepted: false });

  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  const toggleSubject = (s) => set('subjects', data.subjects.includes(s) ? data.subjects.filter(x => x !== s) : [...data.subjects, s]);

  const canProceed = () => {
    if (step === 0) return !!data.role;
    if (step === 1) {
      if (data.role === 'student') return !!data.exam;
      if (data.role === 'tutor') return data.subjects.length > 0;
      if (data.role === 'institution') return data.institutionName.length >= 3;
    }
    if (step === 2) return !!data.classLevel || data.role !== 'student';
    return true;
  };

  const getStepCount = () => data.role === 'student' ? 4 : 3;

  const next = () => {
    if (step >= getStepCount() - 1) {
      const dest = data.role === 'teacher' ? '/teacher' : data.role === 'institution' ? '/institution' : '/activity-dashboard';
      navigate(dest, { replace: true });
    } else {
      setStep(s => s + 1);
    }
  };

  const sendInvite = () => {
    if (!invite.email) return;
    setInvite(p => ({ ...p, sent: true }));
    // Simulate invite acceptance after 1.5s
    setTimeout(() => setInvite(p => ({ ...p, accepted: true })), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={18} className="text-white" />
        </div>
        <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.slice(0, getStepCount()).map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${
                i < step ? 'bg-primary border-primary text-white' :
                i === step ? 'border-primary text-primary bg-primary/10' :
                'border-border text-muted-foreground'
              }`}>
                {i < step ? <Icon name="Check" size={13} /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
            </div>
            {i < getStepCount() - 1 && (
              <div className={`h-px flex-1 mx-2 mb-5 transition-all w-10 md:w-16 ${i < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">

        {/* ── Step 0: Role ─────────────────────────────── */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Welcome to BioBridge</h2>
            <p className="text-sm text-muted-foreground mb-6">Let&apos;s personalise your experience. Who are you?</p>
            <div className="space-y-3">
              {[
                { val: 'student', icon: 'GraduationCap', title: 'Student', desc: 'Preparing for NEET or JEE', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8' },
                { val: 'tutor', icon: 'User', title: 'Independent Tutor', desc: 'Teach your own batch of students', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8' },
                { val: 'institution', icon: 'Building2', title: 'Institution', desc: 'Coaching center with multiple batches', color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/8' },
              ].map(r => (
                <button
                  key={r.val} onClick={() => set('role', r.val)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                    data.role === r.val ? `${r.bg} ${r.border}` : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${data.role === r.val ? r.bg : 'bg-background'}`}>
                    <Icon name={r.icon} size={20} className={data.role === r.val ? r.color : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </div>
                  {data.role === r.val && <Icon name="CheckCircle" size={18} className={r.color} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Exam (student) ────────────────────── */}
        {step === 1 && data.role === 'student' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Target exam</h2>
            <p className="text-sm text-muted-foreground mb-6">Sets your subjects, syllabus, and leaderboard scope.</p>
            <div className="space-y-3">
              {[
                { val: 'NEET', icon: '🧬', title: 'NEET', desc: 'Physics · Chemistry · Biology · 720 marks' },
                { val: 'JEE_MAIN', icon: '⚙️', title: 'JEE Main', desc: 'Physics · Chemistry · Mathematics · 360 marks' },
                { val: 'JEE_ADV', icon: '🏆', title: 'JEE Advanced', desc: 'Physics · Chemistry · Math · Advanced level' },
                { val: 'BOTH', icon: '🎯', title: 'NEET + JEE', desc: 'Preparing for both exams' },
              ].map(e => (
                <button
                  key={e.val} onClick={() => set('exam', e.val)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                    data.exam === e.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <span className="text-xl">{e.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.desc}</div>
                  </div>
                  {data.exam === e.val && <Icon name="CheckCircle" size={18} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Subjects (tutor) ──────────────────── */}
        {step === 1 && data.role === 'tutor' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Subjects you teach</h2>
            <p className="text-sm text-muted-foreground mb-6">Controls which questions you can upload and assign.</p>
            <div className="grid grid-cols-2 gap-3">
              {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(s => (
                <button
                  key={s} onClick={() => toggleSubject(s)}
                  className={`p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                    data.subjects.includes(s) ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <div className="font-semibold text-foreground text-sm">{s}</div>
                  {data.subjects.includes(s) && <Icon name="Check" size={13} className="text-primary mt-1" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Institution details ───────────────── */}
        {step === 1 && data.role === 'institution' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Institution details</h2>
            <p className="text-sm text-muted-foreground mb-6">Creates your institution profile and admin portal.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Institution name</label>
                <input
                  type="text" value={data.institutionName} onChange={e => set('institutionName', e.target.value)}
                  placeholder="e.g. Allen Career Institute"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Class (student) ───────────────────── */}
        {step === 2 && data.role === 'student' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Current class</h2>
            <p className="text-sm text-muted-foreground mb-6">Calibrates question difficulty and syllabus coverage.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '11', label: 'Class 11', desc: 'Starting out' },
                { val: '12', label: 'Class 12', desc: 'Final year' },
                { val: 'dropper', label: 'Dropper', desc: 'Repeating year' },
              ].map(c => (
                <button
                  key={c.val} onClick={() => set('classLevel', c.val)}
                  className={`p-4 rounded-xl border text-center transition-smooth hover:scale-[1.01] ${
                    data.classLevel === c.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <div className="font-heading font-bold text-base text-foreground">{c.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
                  {data.classLevel === c.val && (
                    <div className="flex justify-center mt-2"><Icon name="CheckCircle" size={15} className="text-primary" /></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Tutor invite panel ────────────────── */}
        {step === 2 && data.role === 'tutor' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Invite your first student</h2>
            <p className="text-sm text-muted-foreground mb-6">Your batch is ready. Invite students by email — they&apos;ll receive a sign-up link.</p>

            {/* Your join code */}
            <div className="bg-secondary border border-border rounded-xl p-4 mb-5">
              <div className="text-xs text-muted-foreground mb-1.5">Your batch join code</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-mono font-bold text-primary tracking-widest">TUTOR-A3K9F2</span>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Copy" size={13} />Copy
                </button>
              </div>
            </div>

            {!invite.sent ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Student email</label>
                  <input
                    type="email" value={invite.email} onChange={e => setInvite(p => ({ ...p, email: e.target.value }))}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone (optional)</label>
                  <input
                    type="tel" value={invite.phone} onChange={e => setInvite(p => ({ ...p, phone: e.target.value }))}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={next}>
                    Skip for now
                  </Button>
                  <Button size="sm" className="flex-1" onClick={sendInvite} disabled={!invite.email} iconName="Mail" iconPosition="left">
                    Send Invitation
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`rounded-xl border p-5 transition-smooth ${invite.accepted ? 'bg-emerald-500/8 border-emerald-500/25' : 'bg-amber-500/8 border-amber-500/25'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={invite.accepted ? 'CheckCircle' : 'Clock'} size={20} className={invite.accepted ? 'text-emerald-400' : 'text-amber-400'} />
                  <span className="font-semibold text-foreground text-sm">
                    {invite.accepted ? 'Invitation accepted!' : 'Invitation sent!'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {invite.accepted
                    ? `${invite.email} has accepted your invitation and joined your batch.`
                    : `Invitation email sent to ${invite.email}. They'll appear in your batch when they sign up.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Institution invite ────────────────── */}
        {step === 2 && data.role === 'institution' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">You&apos;re all set!</h2>
            <p className="text-sm text-muted-foreground mb-5">Your institution portal is ready. Start by creating your first batch.</p>
            <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-indigo-500/15 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={18} className="text-indigo-400" />
                </div>
                <span className="font-semibold text-foreground">{data.institutionName}</span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-foreground font-medium">BASIC — up to 500 students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Batches</span>
                  <span className="text-foreground font-medium">Up to 10</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Final setup (student only) ───────── */}
        {step === 3 && data.role === 'student' && (
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Almost there</h2>
            <p className="text-sm text-muted-foreground mb-6">Are you in a coaching batch or studying solo?</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { val: 'solo', icon: 'User', title: 'Solo Student', desc: 'Platform generates POD + platform leaderboard' },
                { val: 'batch', icon: 'Users', title: 'Batch Student', desc: 'Join a coaching batch via invitation email' },
              ].map(m => (
                <button
                  key={m.val} onClick={() => set('mode', m.val)}
                  className={`p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                    data.mode === m.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <Icon name={m.icon} size={18} className={data.mode === m.val ? 'text-primary' : 'text-muted-foreground'} />
                  <div className="font-semibold text-foreground text-sm mt-2">{m.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
            {data.mode === 'batch' && (
              <div className="p-4 bg-primary/8 border border-primary/20 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  Your teacher will invite you via email. Check your inbox for a BioBridge invitation link — clicking it will automatically add you to the batch.
                </p>
              </div>
            )}
            {data.mode === 'solo' && (
              <div className="p-4 bg-emerald-500/8 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                <Icon name="CheckCircle" size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Your Platform POD is ready. Every day at 6 AM, 5 questions from your weak topics appear on your dashboard. Compete with all NEET/JEE students in your class.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button variant="ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} iconName="ArrowLeft" iconPosition="left" size="sm">
            Back
          </Button>
          <span className="text-xs text-muted-foreground">{step + 1} / {getStepCount()}</span>
          <Button
            onClick={next}
            disabled={!canProceed()}
            iconName={step === getStepCount() - 1 ? 'Zap' : 'ArrowRight'}
            iconPosition="right"
            size="sm"
          >
            {step === getStepCount() - 1 ? 'Go to Dashboard' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
