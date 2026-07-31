import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const demoRoles = [
  {
    role: 'student', label: 'Student', subtitle: 'NEET Class 12 · Solo',
    icon: 'GraduationCap', dest: '/activity-dashboard',
    color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8',
    creds: { email: 'student@biobridge.in', password: 'Prep@2026' },
  },
  {
    role: 'teacher', label: 'Teacher', subtitle: 'Independent tutor',
    icon: 'User', dest: '/teacher',
    color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8',
    creds: { email: 'teacher@biobridge.in', password: 'Teach@2026' },
  },
  {
    role: 'institution', label: 'Institution', subtitle: 'Allen Career Institute',
    icon: 'Building2', dest: '/institution',
    color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/8',
    creds: { email: 'admin@allen.in', password: 'Admin@2026' },
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/activity-dashboard');
    }
  }, [navigate]);

  const handleDemoLogin = (role) => {
    setActiveRole(role.role);
    setEmail(role.creds.email);
    setPassword(role.creds.password);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Enter email and password.'); return; }
    setLoading(true);
    setError('');
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      const dest = activeRole === 'teacher' ? '/teacher' : activeRole === 'institution' ? '/institution' : '/activity-dashboard';
      navigate(dest, { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden md:flex flex-col justify-between w-[380px] flex-shrink-0 bg-card border-r border-border p-8">
        <div>
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-3 leading-tight">
            Your personalised NEET/JEE<br />preparation dashboard.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Track concept gaps, solve with AI, beat the leaderboard. The platform that actually helps you improve.
          </p>
          <div className="space-y-4">
            {[
              { icon: 'Brain', text: 'AI scores your conceptual understanding per question' },
              { icon: 'RefreshCw', text: 'SM-2 spaced repetition resurfaces mistakes at the right time' },
              { icon: 'Grid3x3', text: 'Concept-level heatmap shows where you lose NEET marks' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={f.icon} size={15} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          &copy; 2026 BioBridge · Built for Indian students
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-8 md:hidden">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-white" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-1">
              {inviteToken ? 'Accept your invitation' : 'Welcome back'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {inviteToken ? 'Sign in to join your batch on BioBridge.' : "Sign in to your account to continue."}
            </p>
          </div>

          {/* Invitation banner */}
          {inviteToken && (
            <div className="mb-6 p-4 bg-primary/8 border border-primary/25 rounded-xl flex items-start gap-3">
              <Icon name="Mail" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground mb-0.5">Invitation accepted</div>
                <div className="text-xs text-muted-foreground">Sign in with the email your teacher invited. You&apos;ll be automatically added to the batch.</div>
              </div>
            </div>
          )}

          {/* Demo role selector */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Try with demo account</div>
            <div className="grid grid-cols-3 gap-2.5">
              {demoRoles.map(r => (
                <button
                  key={r.role}
                  onClick={() => handleDemoLogin(r)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-smooth hover:scale-[1.02] active:scale-95 ${
                    activeRole === r.role ? `${r.bg} ${r.border}` : 'border-border bg-secondary hover:border-border-strong'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${r.bg}`}>
                    <Icon name={r.icon} size={18} className={r.color} />
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-semibold ${activeRole === r.role ? r.color : 'text-foreground'}`}>{r.label}</div>
                    <div className="text-xs text-muted-foreground leading-tight mt-0.5">{r.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or sign in with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/25 rounded-xl text-sm text-destructive flex items-center gap-2">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            {activeRole && (
              <div className="p-3 bg-primary/8 border border-primary/20 rounded-xl text-xs text-muted-foreground">
                Demo credentials filled. Click &ldquo;Sign in&rdquo; to proceed.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email or phone</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon name="Mail" size={15} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@biobridge.in"
                  className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon name="Lock" size={15} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={15} />
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth loading={loading} iconName={loading ? null : 'ArrowRight'} iconPosition="right" className="h-11">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {"Don't have an account?"}{'  '}
            <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 max-w-sm">
          By signing in, you agree to our{' '}
          <span className="text-primary cursor-pointer hover:underline">Terms</span> and{' '}
          <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
