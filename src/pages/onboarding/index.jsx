import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const STEPS = ['Role', 'Exam', 'Class', 'Setup'];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: '',
    exam: '',
    classLevel: '',
    mode: '', // solo | batch | tutor | institution
    batchCode: '',
    subjects: [],
    institutionName: '',
  });

  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const next = () => {
    if (step === STEPS.length - 1) {
      navigate('/activity-dashboard');
    } else {
      setStep(s => s + 1);
    }
  };

  const back = () => setStep(s => Math.max(0, s - 1));

  const canProceed = () => {
    if (step === 0) return !!data.role;
    if (step === 1) return !!data.exam;
    if (step === 2) return !!data.classLevel;
    if (step === 3) {
      if (data.role === 'student') return data.mode === 'solo' || (data.mode === 'batch' && data.batchCode.length >= 4);
      if (data.role === 'tutor') return data.subjects.length > 0;
      if (data.role === 'institution') return data.institutionName.length >= 3;
    }
    return true;
  };

  const subjectOptions = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
  const toggleSubject = (s) => {
    set('subjects', data.subjects.includes(s) ? data.subjects.filter(x => x !== s) : [...data.subjects, s]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={16} className="text-white" />
        </div>
        <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < step ? 'bg-primary border-primary text-white' :
                i === step ? 'border-primary text-primary bg-primary/10' :
                'border-border text-muted-foreground'
              }`}>
                {i < step ? <Icon name="Check" size={14} /> : i + 1}
              </div>
              <span className={`text-xs hidden md:block ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-12 md:w-16 transition-all ${i < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 md:p-8">
        {/* Step 0: Role */}
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Welcome to BioBridge</h2>
            <p className="text-muted-foreground mb-8">Let's personalise your experience. Who are you?</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { val: 'student', icon: 'GraduationCap', title: 'Student', desc: 'Preparing for NEET or JEE', badge: '' },
                { val: 'tutor', icon: 'User', title: 'Independent Tutor', desc: 'Teach your own batch of students', badge: 'Teacher' },
                { val: 'institution', icon: 'Building2', title: 'Institution', desc: 'Coaching center managing multiple batches', badge: 'Institution' },
              ].map(r => (
                <button
                  key={r.val}
                  onClick={() => set('role', r.val)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    data.role === r.val ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.role === r.val ? 'bg-primary/20' : 'bg-background'}`}>
                    <Icon name={r.icon} size={20} className={data.role === r.val ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-foreground">{r.title}</span>
                      {r.badge && <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">{r.badge}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                  {data.role === r.val && <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Exam */}
        {step === 1 && data.role === 'student' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Which exam are you targeting?</h2>
            <p className="text-muted-foreground mb-8">This sets your subjects, syllabus, and leaderboard scope.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { val: 'NEET', title: 'NEET', desc: 'Physics · Chemistry · Biology · 720 marks', icon: '🧬' },
                { val: 'JEE_MAIN', title: 'JEE Main', desc: 'Physics · Chemistry · Mathematics · 360 marks', icon: '⚙️' },
                { val: 'JEE_ADV', title: 'JEE Advanced', desc: 'Physics · Chemistry · Mathematics · Advanced', icon: '🏆' },
                { val: 'BOTH', title: 'NEET + JEE', desc: 'Preparing for both exams', icon: '🎯' },
              ].map(e => (
                <button
                  key={e.val}
                  onClick={() => set('exam', e.val)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    data.exam === e.val ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{e.icon}</span>
                  <div className="flex-1">
                    <div className="font-heading font-semibold text-foreground">{e.title}</div>
                    <div className="text-sm text-muted-foreground">{e.desc}</div>
                  </div>
                  {data.exam === e.val && <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && data.role === 'tutor' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Which subjects do you teach?</h2>
            <p className="text-muted-foreground mb-8">This controls which questions you can upload.</p>
            <div className="grid grid-cols-2 gap-3">
              {subjectOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    data.subjects.includes(s) ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <div className="font-heading font-semibold text-foreground">{s}</div>
                  {data.subjects.includes(s) && <Icon name="Check" size={14} className="text-primary mt-1" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && data.role === 'institution' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Institution details</h2>
            <p className="text-muted-foreground mb-8">This creates your institution profile.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Institution Name</label>
                <input
                  type="text"
                  value={data.institutionName}
                  onChange={e => set('institutionName', e.target.value)}
                  placeholder="e.g. Allen Career Institute"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Class */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
              {data.role === 'student' ? 'What is your current class?' : 'Primary exam level?'}
            </h2>
            <p className="text-muted-foreground mb-8">Helps us calibrate question difficulty and syllabus.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '11', label: 'Class 11', desc: 'Starting out' },
                { val: '12', label: 'Class 12', desc: 'Final year' },
                { val: 'dropper', label: 'Dropper', desc: 'Repeating year' },
              ].map(c => (
                <button
                  key={c.val}
                  onClick={() => set('classLevel', c.val)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    data.classLevel === c.val ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <div className="font-heading font-bold text-lg text-foreground">{c.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
                  {data.classLevel === c.val && (
                    <div className="mt-2 flex justify-center">
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Setup */}
        {step === 3 && data.role === 'student' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">One last thing</h2>
            <p className="text-muted-foreground mb-6">Are you in a coaching batch or studying solo?</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { val: 'solo', icon: 'User', title: 'Solo Student', desc: 'Self-preparing, platform POD + leaderboard' },
                { val: 'batch', icon: 'Users', title: 'Batch Student', desc: 'Enter your coaching batch code' },
              ].map(m => (
                <button
                  key={m.val}
                  onClick={() => set('mode', m.val)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    data.mode === m.val ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <Icon name={m.icon} size={18} className={data.mode === m.val ? 'text-primary' : 'text-muted-foreground'} />
                  <div className="font-heading font-semibold text-foreground mt-2">{m.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
            {data.mode === 'batch' && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Batch / Institution Code</label>
                <input
                  type="text"
                  value={data.batchCode}
                  onChange={e => set('batchCode', e.target.value.toUpperCase())}
                  placeholder="e.g. ALLEN25A or TUTOR-A3K9F2"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1.5">Ask your teacher or coaching center for this code</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && data.role === 'tutor' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Your tutor profile is ready!</h2>
            <p className="text-muted-foreground mb-6">Your unique join code has been generated. Share it with students.</p>
            <div className="bg-secondary border border-border rounded-xl p-5 text-center">
              <div className="text-xs text-muted-foreground mb-2">YOUR STUDENT JOIN CODE</div>
              <div className="text-2xl font-mono font-bold text-primary tracking-widest">TUTOR-A3K9F2</div>
              <button className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto transition-colors">
                <Icon name="Copy" size={12} />
                Copy code
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Students enter this code during their registration to join your batch.
            </p>
          </div>
        )}

        {step === 3 && data.role === 'institution' && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Institution setup complete!</h2>
            <p className="text-muted-foreground mb-6">Your institution portal is ready. Create your first batch to get started.</p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                </div>
                <span className="font-heading font-semibold text-foreground">{data.institutionName}</span>
              </div>
              <div className="text-sm text-muted-foreground">Plan: <span className="text-foreground font-medium">BASIC</span> — Up to 500 students · 10 batches</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button variant="ghost" onClick={back} disabled={step === 0} iconName="ArrowLeft" iconPosition="left">
            Back
          </Button>
          <div className="text-xs text-muted-foreground">{step + 1} of {STEPS.length}</div>
          <Button onClick={next} disabled={!canProceed()} iconName={step === STEPS.length - 1 ? 'Zap' : 'ArrowRight'} iconPosition="right">
            {step === STEPS.length - 1 ? 'Go to Dashboard' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
