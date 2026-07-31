import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// ── Animated counter ─────────────────────────────────────────────────────────
const Counter = ({ target, suffix = '', duration = 1400 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(target);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString('en-IN')}{suffix}</span>;
};

// ── Typewriter ────────────────────────────────────────────────────────────────
const WORDS = ['NEET AIR 1.', 'a 720 score.', 'zero blind spots.', 'your best attempt.'];
const Typewriter = () => {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = WORDS[wi];
    const delay = del ? 40 : ci === w.length ? 1400 : 70;
    const t = setTimeout(() => {
      if (!del) {
        if (ci < w.length) setCi(c => c + 1);
        else setDel(true);
      } else {
        if (ci > 0) setCi(c => c - 1);
        else { setDel(false); setWi(i => (i + 1) % WORDS.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [wi, ci, del]);
  return (
    <span className="text-gradient">
      {WORDS[wi].slice(0, ci)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const features = [
  {
    icon: 'Brain',
    title: 'Justification Engine',
    desc: 'Write WHY before you see the answer. Grok AI scores your conceptual understanding 0–100. Correct guess ≠ mastery.',
    color: 'text-blue-400', bg: 'bg-blue-500/8 border-blue-500/20', glow: 'group-hover:shadow-blue-500/10',
  },
  {
    icon: 'RefreshCw',
    title: 'SM-2 Spaced Repetition',
    desc: 'Every wrong answer enters a smart queue. Resurfaces at the scientifically optimal interval based on your actual understanding.',
    color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10',
  },
  {
    icon: 'MessageCircleQuestion',
    title: 'Multi-source AI Doubt Solver',
    desc: 'Grok searches NCERT + your institution notes + peer articles + web + YouTube simultaneously. Streaming answers with citations.',
    color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', glow: 'group-hover:shadow-amber-500/10',
  },
  {
    icon: 'Grid3x3',
    title: 'Concept Mastery Heatmap',
    desc: 'See exactly where your gaps are at concept level — not just chapter. Red topics = most urgent NEET marks waiting.',
    color: 'text-rose-400', bg: 'bg-rose-500/8 border-rose-500/20', glow: 'group-hover:shadow-rose-500/10',
  },
  {
    icon: 'Trophy',
    title: 'Contests & Daily POD',
    desc: 'Live NEET mock tests, daily 5-question challenge, batch leaderboard. Solo students get platform-wide rankings too.',
    color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', glow: 'group-hover:shadow-amber-500/10',
  },
  {
    icon: 'TrendingUp',
    title: 'Predicted Score Tracking',
    desc: 'Real-time NEET score prediction based on topic mastery, consistency, and speed. Know exactly where you stand today.',
    color: 'text-cyan-400', bg: 'bg-cyan-500/8 border-cyan-500/20', glow: 'group-hover:shadow-cyan-500/10',
  },
];

const userTypes = [
  {
    icon: 'GraduationCap', title: 'Solo Student', tag: 'NEET · JEE',
    color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8',
    dest: '/activity-dashboard',
    points: ['Platform generates your daily POD', 'Full analytics vs all NEET peers', 'Unlimited AI doubt solving'],
  },
  {
    icon: 'User', title: 'Independent Tutor', tag: 'Private teacher',
    color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8',
    dest: '/teacher',
    points: ['Invite students by email', 'Configure batch POD daily', 'Per-student analytics dashboard'],
  },
  {
    icon: 'Building2', title: 'Institution', tag: 'Coaching center',
    color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/8',
    dest: '/institution',
    points: ['Multiple batches & teachers', 'Bulk student enrollment via CSV', 'AI searches your uploaded PDFs'],
  },
];

const testimonials = [
  { name: 'Arjun Mehta', exam: 'NEET 2025', score: 'AIR 847', text: 'The justification engine changed how I study. I thought I knew Krebs cycle — turned out I just recognised the right option. BioBridge caught that.', avatar: 'AM' },
  { name: 'Priya Nair', exam: 'NEET 2025', score: '687/720', text: "The heatmap showed me I'd been ignoring Human Physiology for months. Fixed it in 3 weeks. That chapter alone is worth 20+ questions in NEET.", avatar: 'PN' },
  { name: 'Rohit Sharma', exam: 'JEE Main 2025', score: '99.2 percentile', text: 'Mistake Review saved me. I was making the same Organic Chemistry error 4 months in a row. SM-2 forced me to face it until it stuck.', avatar: 'RS' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDemoEnter = (dest) => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate(dest, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${navScrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#for-who" className="hover:text-foreground transition-colors">For who</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Students say</a>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={() => navigate('/login')} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 hidden sm:block">
              Sign in
            </button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Start Free
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/4 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-blue-500/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 text-sm text-primary font-medium mb-8">
            <Icon name="Sparkles" size={13} />
            Built for 2.4M NEET · JEE aspirants
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-5 tracking-tight">
            Practice smarter.
            <br />
            Aim for{' '}
            <Typewriter />
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Not another content platform. BioBridge is a <strong className="text-foreground">Practice OS</strong> — it identifies your exact gaps, fixes misconceptions with AI, and predicts your real NEET/JEE score.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="xl" onClick={() => navigate('/register')} iconName="ArrowRight" iconPosition="right" className="glow-primary">
              Start Practicing Free
            </Button>
            <Button size="xl" variant="outline" onClick={() => navigate('/login')}>
              I have an account
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mb-10">No credit card · Free forever plan · Setup in 2 min</p>

          {/* Demo role buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Jump in as demo:</span>
            {userTypes.map(u => (
              <button
                key={u.title}
                onClick={() => handleDemoEnter(u.dest)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-smooth hover:scale-105 active:scale-95 ${u.bg} ${u.border} ${u.color}`}
              >
                <Icon name={u.icon} size={12} />
                {u.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hero preview card ────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono mx-2">
                app.biobridge.in/dashboard
              </div>
            </div>
            {/* Mock dashboard preview */}
            <div className="p-5 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-heading font-bold text-foreground">Today's Challenge — Jul 31</div>
                    <div className="text-xs text-muted-foreground">5 questions · NEET Class 12</div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">3/5 done</span>
                </div>
                {/* Fake question */}
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="text-xs badge-biology border rounded-full px-2 py-0.5">Biology</span>
                    <span className="text-xs badge-medium border rounded-full px-2 py-0.5">Medium</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">In a dihybrid cross AaBb × AaBb, what fraction of offspring will be aabb?</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['1/16', '3/16', '9/16', '1/4'].map((opt, i) => (
                      <div key={i} className={`px-3 py-2 rounded-lg border text-xs transition-colors ${i === 0 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-border text-muted-foreground'}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Today's streak</div>
                  <div className="flex items-center gap-2">
                    <Icon name="Flame" size={16} className="text-orange-400" />
                    <span className="text-2xl font-heading font-bold text-foreground">12</span>
                    <span className="text-xs text-muted-foreground">days</span>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted-foreground mb-2">Concept gaps</div>
                  {[['Human Physiology', 42, 'rose'], ["Lenz's Law", 38, 'rose'], ['Organic Reactions', 51, 'amber']].map(([topic, pct, color]) => (
                    <div key={topic} className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1">
                        <div className="text-xs text-foreground truncate">{topic}</div>
                        <div className="h-1 bg-secondary rounded-full mt-0.5 overflow-hidden">
                          <div className={`h-full rounded-full bg-${color}-500`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className={`text-xs text-${color}-400 font-mono`}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────────── */}
      <section className="py-14 border-y border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 50000, suffix: '+', label: 'Students Practicing' },
            { value: 2400000, suffix: '+', label: 'NEET Applicants/Year' },
            { value: 99, suffix: '.7%', label: 'Platform Uptime' },
            { value: 5, suffix: 'ms', label: 'Dashboard Load Time' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-bold text-primary">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary font-medium mb-4">
              <Icon name="Layers" size={12} />
              What makes us different
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight">
              Allen, Unacademy, PW solve content delivery.
              <br />
              <span className="text-gradient">BioBridge solves learning.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six systems that work together to find your blind spots and fix them before the exam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative border rounded-2xl p-6 cursor-pointer transition-smooth hover:-translate-y-1 hover:shadow-xl ${
                  activeFeature === i ? f.bg + ' scale-[1.01]' : 'border-border bg-card'
                }`}
                onClick={() => setActiveFeature(i)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg} border`}>
                  <Icon name={f.icon} size={20} className={f.color} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                {activeFeature === i && (
                  <div className="absolute top-4 right-4">
                    <Icon name="CheckCircle" size={16} className={f.color} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Who ──────────────────────────────────────────────────────────── */}
      <section id="for-who" className="py-24 px-4 md:px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight">One platform, three user types.</h2>
            <p className="text-muted-foreground">Same powerful features. Access adapts to your role.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {userTypes.map((u) => (
              <div key={u.title} className={`border rounded-2xl p-6 ${u.border} ${u.bg}`}>
                <div className={`w-11 h-11 rounded-xl ${u.bg} border ${u.border} flex items-center justify-center mb-4`}>
                  <Icon name={u.icon} size={22} className={u.color} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-foreground">{u.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${u.border} ${u.color}`}>{u.tag}</span>
                </div>
                <ul className="space-y-2 mt-4">
                  {u.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className={`${u.color} flex-shrink-0 mt-0.5`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDemoEnter(u.dest)}
                  className={`mt-5 w-full py-2 rounded-xl border text-sm font-medium transition-smooth hover:scale-[1.02] active:scale-95 ${u.border} ${u.color} ${u.bg}`}
                >
                  Try {u.title} Demo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight">Students who cracked it.</h2>
            <p className="text-muted-foreground">Real results from real students who used BioBridge in 2025.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.exam} · <span className="text-primary">{t.score}</span></div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-14 tracking-tight">Up and running in 3 steps.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', icon: 'UserPlus', title: 'Sign up in 2 minutes', desc: 'Choose your exam (NEET/JEE), your class, and whether you have a coaching batch or are studying solo.' },
              { n: '02', icon: 'Zap', title: 'Practice daily', desc: 'Solve the Problem of the Day, work through practice sessions, and write justifications for deeper learning.' },
              { n: '03', icon: 'TrendingUp', title: 'Track real progress', desc: 'See your 365-day heatmap, concept mastery scores, predicted NEET score, and rank among peers.' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center">
                    <Icon name={s.icon} size={26} className="text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-1">{s.n}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary/8 to-blue-500/5 border border-primary/20 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs text-primary font-medium mb-4">
              <Icon name="Star" size={11} />
              All plans include unlimited AI doubts
            </div>
            <h2 className="text-3xl font-heading font-bold mb-3 tracking-tight">Ready to crack NEET 2026?</h2>
            <p className="text-muted-foreground mb-3 max-w-lg mx-auto leading-relaxed">
              Join thousands of students who practice smarter, fix their weak concepts, and track real exam readiness.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8 text-center">
              {[['FREE', '₹0', 'Forever'], ['BASIC', '₹149', '/month'], ['PRO', '₹349', '/month']].map(([t, p, s]) => (
                <div key={t} className={`rounded-xl border p-3 ${t === 'PRO' ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}>
                  <div className="text-xs font-mono text-muted-foreground">{t}</div>
                  <div className={`text-lg font-bold ${t === 'PRO' ? 'text-primary' : 'text-foreground'}`}>{p}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              ))}
            </div>
            <Button size="xl" onClick={() => navigate('/register')} iconName="ArrowRight" iconPosition="right" className="glow-primary">
              Start Free — No Card Needed
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-heading font-bold text-foreground">BioBridge</span>
            <span className="text-muted-foreground text-sm ml-1">· NEET · JEE Practice OS</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Built for Indian students. Powered by Grok AI. Hosted on GCP Mumbai.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-foreground transition-colors">Sign in</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
