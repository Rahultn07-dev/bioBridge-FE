import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const ROLE_OPTIONS = [
  { val: 'student', icon: 'GraduationCap', title: 'Student', desc: 'Preparing for NEET or JEE', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8' },
  { val: 'tutor', icon: 'User', title: 'Independent Tutor', desc: 'Teach your own batch of students', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8' },
  { val: 'institution', icon: 'Building2', title: 'Institution', desc: 'Coaching center with multiple batches', color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/8' },
];

const EXAM_OPTIONS = [
  { val: 'NEET', icon: '🧬', title: 'NEET', desc: 'Physics · Chemistry · Biology · 720 marks' },
  { val: 'JEE_MAIN', icon: '⚙️', title: 'JEE Main', desc: 'Physics · Chemistry · Mathematics · 360 marks' },
  { val: 'JEE_ADV', icon: '🏆', title: 'JEE Advanced', desc: 'Physics · Chemistry · Mathematics · Advanced' },
];

const CLASS_OPTIONS = [
  { val: '11', label: 'Class 11', desc: 'Starting out' },
  { val: '12', label: 'Class 12', desc: 'Final year' },
  { val: 'dropper', label: 'Dropper', desc: 'Repeating year' },
];

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    role: '', exam: '', classLevel: '', targetYear: '2027',
    subjects: [], institutionName: '', bio: '',
    mode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };
  const toggleSubject = (s) => set('subjects', form.subjects.includes(s) ? form.subjects.filter(x => x !== s) : [...form.subjects, s]);

  const STEPS = form.role === 'student' ? ['Account', 'Role', 'Exam', 'Class', 'Done'] :
                form.role === 'tutor' ? ['Account', 'Role', 'Subjects', 'Done'] :
                form.role === 'institution' ? ['Account', 'Role', 'Institution', 'Done'] :
                ['Account', 'Role', 'Setup', 'Done'];

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.email.includes('@')) e.email = 'Enter a valid email';
      if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number';
      if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const canProceed = () => {
    if (step === 0) return form.name && form.email && form.password && form.confirmPassword;
    if (step === 1) return !!form.role;
    if (form.role === 'student') {
      if (step === 2) return !!form.exam;
      if (step === 3) return !!form.classLevel;
    }
    if (form.role === 'tutor' && step === 2) return form.subjects.length > 0;
    if (form.role === 'institution' && step === 2) return form.institutionName.length >= 3;
    return true;
  };

  const next = async () => {
    if (!validate()) return;
    if (step === STEPS.length - 1) {
      setLoading(true);
      setSubmitError('');
      try {
        await signUp(form.email, form.password, form.role);
        // AuthContext sets profile; onboarding gate in ProtectedRoute will redirect to /onboarding
        navigate('/onboarding', { replace: true });
      } catch (err) {
        const code = err.code || '';
        if (code === 'auth/email-already-in-use') {
          setSubmitError('An account with this email already exists. Please sign in instead.');
        } else if (code === 'auth/weak-password') {
          setSubmitError('Password is too weak. Use at least 6 characters.');
        } else {
          setSubmitError(err.serverMessage || err.message || 'Registration failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
      return;
    }
    setStep(s => s + 1);
  };

  const back = () => setStep(s => Math.max(0, s - 1));

  const stepLabels = {
    student: ['Account', 'Role', 'Exam', 'Class', 'Start'],
    tutor: ['Account', 'Role', 'Subjects', 'Start'],
    institution: ['Account', 'Role', 'Details', 'Start'],
    '': ['Account', 'Role', 'Setup', 'Start'],
  };
  const labels = stepLabels[form.role] || stepLabels[''];
  const totalSteps = labels.length;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-white" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {labels.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${
                  i < step ? 'bg-primary border-primary text-white' :
                  i === step ? 'border-primary text-primary bg-primary/10' :
                  'border-border text-muted-foreground'
                }`}>
                  {i < step ? <Icon name="Check" size={13} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block transition-colors ${i === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{label}</span>
              </div>
              {i < labels.length - 1 && (
                <div className={`h-px flex-1 mx-2 mb-5 transition-all ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
          {/* Step 0: Account */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Create your account</h2>
              <p className="text-sm text-muted-foreground mb-6">Set up your BioBridge credentials.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                  <input
                    value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Arjun Mehta"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="arjun@example.com"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone (optional)</label>
                  <input
                    type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm pr-9"
                      />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={14} />
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm</label>
                    <input
                      type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)}
                      placeholder="Repeat password"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Who are you?</h2>
              <p className="text-sm text-muted-foreground mb-6">This personalises your experience from day one.</p>
              <div className="space-y-3">
                {ROLE_OPTIONS.map(r => (
                  <button
                    key={r.val} onClick={() => set('role', r.val)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                      form.role === r.val ? `${r.bg} ${r.border}` : 'border-border bg-secondary hover:border-border-strong'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${form.role === r.val ? r.bg : 'bg-background'}`}>
                      <Icon name={r.icon} size={20} className={form.role === r.val ? r.color : 'text-muted-foreground'} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">{r.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                    </div>
                    {form.role === r.val && <Icon name="CheckCircle" size={18} className={r.color} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Exam (student) */}
          {step === 2 && form.role === 'student' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Target exam</h2>
              <p className="text-sm text-muted-foreground mb-6">This sets your subjects, syllabus, and leaderboard scope.</p>
              <div className="space-y-3">
                {EXAM_OPTIONS.map(e => (
                  <button
                    key={e.val} onClick={() => set('exam', e.val)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                      form.exam === e.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                    }`}
                  >
                    <span className="text-2xl">{e.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.desc}</div>
                    </div>
                    {form.exam === e.val && <Icon name="CheckCircle" size={18} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subjects (tutor) */}
          {step === 2 && form.role === 'tutor' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Subjects you teach</h2>
              <p className="text-sm text-muted-foreground mb-6">Controls which questions you can upload and assign.</p>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map(s => (
                  <button
                    key={s} onClick={() => toggleSubject(s)}
                    className={`p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                      form.subjects.includes(s) ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                    }`}
                  >
                    <div className="font-semibold text-foreground text-sm">{s}</div>
                    {form.subjects.includes(s) && <Icon name="Check" size={13} className="text-primary mt-1" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Institution details */}
          {step === 2 && form.role === 'institution' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Institution details</h2>
              <p className="text-sm text-muted-foreground mb-6">Creates your institution profile and portal.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Institution name</label>
                  <input
                    value={form.institutionName} onChange={e => set('institutionName', e.target.value)}
                    placeholder="e.g. Allen Career Institute"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Class (student) */}
          {step === 3 && form.role === 'student' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Current class</h2>
              <p className="text-sm text-muted-foreground mb-6">Calibrates question difficulty and syllabus coverage.</p>
              <div className="grid grid-cols-3 gap-3">
                {CLASS_OPTIONS.map(c => (
                  <button
                    key={c.val} onClick={() => set('classLevel', c.val)}
                    className={`p-4 rounded-xl border text-center transition-smooth hover:scale-[1.01] ${
                      form.classLevel === c.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                    }`}
                  >
                    <div className="font-heading font-bold text-lg text-foreground">{c.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
                    {form.classLevel === c.val && (
                      <div className="flex justify-center mt-2">
                        <Icon name="CheckCircle" size={15} className="text-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Final step: Ready */}
          {step === totalSteps - 1 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">You&apos;re all set!</h2>
                <p className="text-sm text-muted-foreground">Your account is ready. Click below to go to your personalised setup.</p>
              </div>

              {/* Summary */}
              <div className="bg-secondary rounded-xl p-4 space-y-2 mb-2">
                {[
                  { label: 'Name', value: form.name },
                  { label: 'Email', value: form.email },
                  { label: 'Role', value: form.role ? form.role.charAt(0).toUpperCase() + form.role.slice(1) : '—' },
                  form.exam && { label: 'Exam', value: form.exam },
                  form.classLevel && { label: 'Class', value: form.classLevel },
                  form.institutionName && { label: 'Institution', value: form.institutionName },
                ].filter(Boolean).map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="text-foreground font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit error */}
          {submitError && (
            <div className="mt-5 p-3 bg-[#F87171]/10 border border-[#F87171]/25 rounded-xl text-xs text-[#F87171] flex items-center gap-2">
              <Icon name="AlertCircle" size={13} />
              {submitError}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={back} disabled={step === 0} iconName="ArrowLeft" iconPosition="left" size="sm">
              Back
            </Button>
            <span className="text-xs text-muted-foreground">{step + 1} / {totalSteps}</span>
            <Button onClick={next} disabled={!canProceed()} loading={loading} iconName={step === totalSteps - 1 ? 'Zap' : 'ArrowRight'} iconPosition="right" size="sm">
              {step === totalSteps - 1 ? 'Go to Setup' : 'Continue'}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
