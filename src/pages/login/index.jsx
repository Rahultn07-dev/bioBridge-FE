import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import RegisterPrompt from './components/RegisterPrompt';

const demoRoles = [
  {
    role: 'student', label: 'Student', subtitle: 'NEET Class 12 · Solo',
    icon: 'GraduationCap', dest: '/activity-dashboard',
    color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10',
  },
  {
    role: 'teacher', label: 'Teacher', subtitle: 'Independent tutor',
    icon: 'User', dest: '/teacher',
    color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-500/10',
  },
  {
    role: 'institution', label: 'Institution', subtitle: 'Allen Career Institute',
    icon: 'Building2', dest: '/institution',
    color: 'text-violet-400', border: 'border-violet-500/40', bg: 'bg-violet-500/10',
  },
];

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/activity-dashboard');
    }
  }, [navigate]);

  const handleDemoLogin = (dest) => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate(dest, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Login - BioBridge · NEET-JEE Prep</title>
        <meta name="description" content="Sign in to access your personalized NEET and JEE preparation dashboard" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-white" />
          </div>
          <span className="text-2xl font-heading font-bold text-foreground">BioBridge</span>
        </div>

        {/* Demo role selector — PROMINENT at top */}
        <div className="w-full max-w-md mb-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-center mb-4">
              <div className="text-sm font-heading font-semibold text-foreground mb-0.5">Try BioBridge instantly</div>
              <div className="text-xs text-muted-foreground">No signup needed — explore with demo data</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {demoRoles.map(r => (
                <button
                  key={r.role}
                  onClick={() => handleDemoLogin(r.dest)}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all hover:scale-[1.02] ${r.bg} ${r.border}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.bg}`}>
                    <Icon name={r.icon} size={20} className={r.color} />
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-heading font-bold ${r.color}`}>{r.label}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{r.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or sign in with your account</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Regular login form */}
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
            <LoginHeader />
            <div className="mb-3 p-3 bg-secondary border border-border rounded-lg">
              <div className="text-xs text-muted-foreground">
                Demo credentials: <span className="font-mono text-foreground">student@neetjee.com</span> / <span className="font-mono text-foreground">Prep@2025</span>
              </div>
            </div>
            <LoginForm />
            <SocialLogin />
            <RegisterPrompt />
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">Terms</a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;