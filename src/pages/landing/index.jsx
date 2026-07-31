import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreak(prev => (prev < 12 ? prev + 1 : 12));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: 'Brain',
      title: 'Justification Engine',
      desc: 'Write WHY before you see the answer. Grok scores your conceptual understanding 0–100. Correct guess ≠ mastery.',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20',
    },
    {
      icon: 'RefreshCw',
      title: 'SM-2 Spaced Repetition',
      desc: 'Every wrong answer enters a smart queue. Resurfaces at optimal intervals based on your actual understanding.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: 'MessageCircleQuestion',
      title: 'AI Doubt Solver',
      desc: 'Grok searches NCERT + institution notes + peer articles + web simultaneously. Streaming answers with citations.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: 'Grid3x3',
      title: 'Concept Mastery Heatmap',
      desc: 'See exactly where your gaps are at the concept level — not just the chapter level.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: 'Trophy',
      title: 'Contests & Daily POD',
      desc: 'Live mock tests, daily challenge, batch leaderboard. Solo students get platform-wide rankings too.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: 'BookOpen',
      title: 'Smart Key Notes',
      desc: 'AI-generated 5-point chapter notes derived from YOUR specific misconceptions + NCERT content.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Sign Up in 2 Minutes',
      desc: 'Choose your exam (NEET/JEE), class, and whether you have a coaching batch code or are studying solo.',
      icon: 'UserPlus',
    },
    {
      num: '02',
      title: 'Practice Daily',
      desc: 'Solve the Problem of the Day, work through practice sessions, and write justifications for deeper learning.',
      icon: 'Zap',
    },
    {
      num: '03',
      title: 'Track Real Progress',
      desc: 'See your 365-day heatmap, concept mastery scores, predicted NEET score, and rank among peers.',
      icon: 'TrendingUp',
    },
  ];

  const stats = [
    { value: '2.4M+', label: 'NEET Applicants/Year' },
    { value: '50K+', label: 'Students Studying' },
    { value: '99.7%', label: 'Uptime' },
    { value: '<5ms', label: 'Dashboard Load' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 font-medium mb-6">
            <Icon name="Sparkles" size={14} />
            NEET · JEE · Practice Operating System
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            The platform Indian{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              students actually need.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Not another content platform. BioBridge is a <strong className="text-foreground">practice OS</strong> — 
            built to identify gaps, fix misconceptions, and predict your actual NEET/JEE score.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="xl" onClick={() => navigate('/login')} iconName="ArrowRight" iconPosition="right">
              Start Practicing Free
            </Button>
            <Button size="xl" variant="outline" onClick={() => navigate('/login')}>
              I have an account
            </Button>
          </div>

          {/* Quick demo row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <span className="text-sm text-muted-foreground">Jump straight in as:</span>
            {[
              { label: 'Student', icon: 'GraduationCap', dest: '/activity-dashboard', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
              { label: 'Teacher', icon: 'User', dest: '/teacher', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
              { label: 'Institution', icon: 'Building2', dest: '/institution', color: 'text-violet-400 border-violet-500/40 bg-violet-500/10' },
            ].map(r => (
              <button
                key={r.label}
                onClick={() => { localStorage.setItem('isAuthenticated', 'true'); navigate(r.dest, { replace: true }); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:scale-105 ${r.color}`}
              >
                <Icon name={r.icon} size={15} />
                {r.label} Demo
              </button>
            ))}
          </div>

          {/* Streak demo */}
          <div className="mt-16 inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4">
            <div className="flex items-center gap-1.5">
              <Icon name="Flame" size={20} className="text-orange-400" />
              <span className="text-2xl font-heading font-bold text-foreground">{streak}</span>
              <span className="text-muted-foreground text-sm">day streak</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded ${i < (streak > 7 ? 7 : streak) ? 'bg-emerald-500' : 'bg-secondary'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-12 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem of the Day Preview */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Problem of the Day
            </h2>
            <p className="text-muted-foreground">Like LeetCode's daily challenge — 5 questions every morning, ranked against your peers</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={18} className="text-primary" />
                <span className="font-heading font-semibold text-foreground">Today's Challenge — Jul 16</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">5 Questions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Users" size={14} />
                <span>2,847 completed today</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">1</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2 py-0.5 rounded-full">Physics</span>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded-full">Electromagnetic Induction</span>
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2 py-0.5 rounded-full">Medium</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    In a series LCR circuit at resonance, which of the following is maximum?
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {['Impedance (Z)', 'Current (I)', 'Voltage across L', 'Voltage across R'].map((opt, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${i === 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'border-border text-muted-foreground hover:border-border/80'}`}>
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> 2:30 avg time</span>
                  <span className="flex items-center gap-1"><Icon name="Target" size={14} /> 68% solve rate</span>
                </div>
                <Button onClick={() => navigate('/register')} iconName="ArrowRight" iconPosition="right" size="sm">
                  Solve Today's POD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 md:px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Why BioBridge is different
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Allen, Unacademy, PW solve content delivery. BioBridge solves <em className="text-foreground">learning.</em></p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`border rounded-xl p-5 cursor-pointer transition-all ${activeFeature === i ? f.bg + ' scale-[1.02]' : 'border-border bg-card hover:border-border/80'}`}
                onClick={() => setActiveFeature(i)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${f.bg} border`}>
                  <Icon name={f.icon} size={20} className={f.color} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">From sign-up to exam-ready in three steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-card border border-border rounded-2xl mb-5">
                  <Icon name={s.icon} size={24} className="text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">{s.num}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-heading font-bold mb-3">Ready to crack NEET?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of students who practice smarter, fix their weak concepts, and track real exam readiness.
          </p>
          <Button size="xl" onClick={() => navigate('/register')} iconName="ArrowRight" iconPosition="right">
            Start Free — No Credit Card
          </Button>
          <p className="text-xs text-muted-foreground mt-4">₹0 to start · Premium from ₹199/month</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-heading font-bold text-foreground">BioBridge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The Practice OS for Indian students. NEET · JEE · Built on ₹0 infrastructure.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
