import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../context/AuthContext';

const ROLES = [
  {
    role: 'student', label: 'Student', subtitle: 'NEET / JEE prep',
    icon: 'GraduationCap', dest: '/activity-dashboard',
    color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8',
    creds: { email: 'student@biobridge.in', password: 'Prep@2026' },
  },
  {
    role: 'tutor', label: 'Tutor', subtitle: 'Independent',
    icon: 'UserCheck', dest: '/teacher',
    color: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/8',
    creds: { email: 'tutor@biobridge.in', password: 'Tutor@2026' },
  },
  {
    role: 'institution_teacher', label: 'Inst. Teacher', subtitle: 'Allen Kota',
    icon: 'School', dest: '/institution-teacher',
    color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500/8',
    creds: { email: 'sunita.rao@allen.in', password: 'Teacher@2026' },
  },
  {
    role: 'institution', label: 'Institution', subtitle: 'Admin',
    icon: 'Building2', dest: '/institution',
    color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/8',
    creds: { email: 'admin@allen.in', password: 'Admin@2026' },
  },
];

const FEATURES = [
  { icon: 'Brain',      text: 'AI scores your conceptual depth, not just whether you guessed right' },
  { icon: 'RefreshCw',  text: 'SM-2 spaced repetition resurfaces mistakes at the perfect interval' },
  { icon: 'Grid3x3',    text: 'Concept-level heatmap shows exactly where your NEET marks are lost' },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');
  const { signIn, isAuthenticated, profile, getDestination, authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState(null);

  // Redirect already-authenticated users — only when onboarding is fully done.
  // Incomplete sessions must NOT auto-redirect; the user should sign in again.
  useEffect(() => {
    if (!authLoading && isAuthenticated && profile?.onboardingCompleted) {
      const from = location.state?.from?.pathname;
      navigate(from || getDestination(profile), { replace: true });
    }
  }, [authLoading, isAuthenticated, profile, navigate, getDestination, location]);

  const handleDemoLogin = async (r) => {
    setActiveRole(r.role);
    setEmail(r.creds.email);
    setPassword(r.creds.password);
    setError('');
    setLoading(true);
    try {
      await signIn(r.creds.email, r.creds.password, r.role);
      // useEffect handles redirect once profile is set
    } catch (err) {
      const code = err.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Demo credentials are not set up on Firebase yet — check back soon.');
      } else {
        setError(err.serverMessage || err.message || 'Sign in failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoading(true);
    setError('');
    try {
      await signIn(email, password, activeRole);
      // Navigation is handled by the useEffect above once profile loads
    } catch (err) {
      const code = err.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else {
        setError(err.serverMessage || err.message || 'Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">

      {/* ── Left panel — branding (lg+) ──────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between w-[360px] xl:w-[400px] flex-shrink-0 bg-[#0A1020] border-r border-[#192438] p-8 xl:p-10">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={15} color="white" />
            </div>
            <span className="text-base font-heading font-bold text-foreground">BioBridge</span>
          </Link>

          <h2 className="text-2xl xl:text-3xl font-heading font-extrabold text-foreground mb-3 leading-tight tracking-tight">
            Your personalised<br />NEET &amp; JEE<br />preparation OS.
          </h2>
          <p className="text-sm text-[#7A8EAD] leading-relaxed mb-8">
            The platform that actually identifies your blind spots and fixes them.
          </p>

          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={f.icon} size={14} className="text-primary" />
                </div>
                <p className="text-sm text-[#7A8EAD] leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Stat badges */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[['50K+', 'Students'], ['99.7%', 'Uptime'], ['NEET · JEE', 'Focused']].map(([v, l]) => (
              <div key={l} className="flex flex-col px-3.5 py-2 bg-[#111A2C] border border-[#192438] rounded-xl">
                <span className="text-sm font-bold text-primary">{v}</span>
                <span className="text-[11px] text-[#7A8EAD]">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#4A5E7A]">&copy; 2026 BioBridge · Built for Indian students</p>
      </aside>

      {/* ── Right panel — form ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:px-8 min-w-0">

        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <Icon name="Zap" size={14} color="white" />
          </div>
          <span className="text-base font-heading font-bold text-foreground">BioBridge</span>
        </Link>

        <div className="w-full max-w-[420px]">
          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight mb-1">
              {inviteToken ? 'Accept invitation' : 'Welcome back'}
            </h1>
            <p className="text-sm text-[#7A8EAD]">
              {inviteToken ? 'Sign in to join your batch.' : 'Sign in to continue.'}
            </p>
          </div>

          {/* Invite banner */}
          {inviteToken && (
            <div className="mb-5 p-3.5 bg-primary/8 border border-primary/25 rounded-xl flex items-start gap-2.5">
              <Icon name="Mail" size={15} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">Invitation link detected</p>
                <p className="text-xs text-[#7A8EAD] mt-0.5">Sign in with the email your teacher invited. You&apos;ll be automatically added to the batch.</p>
              </div>
            </div>
          )}

          {/* Role selector */}
          <div className="mb-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#4A5E7A] mb-2.5">Try with demo account</p>
            <div className="grid grid-cols-4 gap-2">
              {ROLES.map(r => {
                const active = activeRole === r.role;
                return (
                  <button key={r.role} onClick={() => handleDemoLogin(r)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-smooth hover:scale-[1.03] active:scale-95
                      ${active ? `${r.bg} ${r.border}` : 'border-[#192438] bg-[#0C1221] hover:border-[#243450]'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.bg}`}>
                      <Icon name={r.icon} size={16} className={r.color} />
                    </div>
                    <div className="text-center">
                      <p className={`text-[11px] font-semibold leading-none ${active ? r.color : 'text-foreground'}`}>{r.label}</p>
                      <p className="text-[10px] text-[#7A8EAD] mt-0.5 leading-tight">{r.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#192438]" />
            <span className="text-xs text-[#4A5E7A]">or continue with email</span>
            <div className="flex-1 h-px bg-[#192438]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {error && (
              <div className="p-3 bg-[#F87171]/10 border border-[#F87171]/25 rounded-xl text-xs text-[#F87171] flex items-center gap-2">
                <Icon name="AlertCircle" size={13} />
                {error}
              </div>
            )}



            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#C4D0E8] mb-1.5">Email or phone</label>
              <div className="relative">
                <Icon name="Mail" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8EAD] pointer-events-none" />
                <input
                  type="text" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" autoComplete="email"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#111A2C] border border-[#192438] rounded-xl text-foreground placeholder:text-[#4A5E7A] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-smooth text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#C4D0E8]">Password</label>
                <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <Icon name="Lock" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8EAD] pointer-events-none" />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#111A2C] border border-[#192438] rounded-xl text-foreground placeholder:text-[#4A5E7A] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-smooth text-sm"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8EAD] hover:text-foreground transition-colors">
                  <Icon name={showPw ? 'EyeOff' : 'Eye'} size={14} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-smooth mt-1 text-sm glow-sm">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <> Sign in <Icon name="ArrowRight" size={15} color="white" /> </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#7A8EAD] mt-6">
            No account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">Create one free</Link>
          </p>
        </div>

        <p className="text-xs text-[#4A5E7A] text-center mt-8 max-w-xs">
          By signing in you agree to our{' '}
          <span className="text-primary cursor-pointer hover:underline">Terms</span> and{' '}
          <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </main>
    </div>
  );
};

export default Login;
