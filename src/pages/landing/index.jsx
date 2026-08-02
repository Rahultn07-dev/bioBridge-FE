import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

// ── Animated counter ──────────────────────────────────────────────────────────
const Counter = ({ target, suffix = '', duration = 1600 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(eased * target));
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
    const delay = del ? 35 : ci === w.length ? 1600 : 65;
    const t = setTimeout(() => {
      if (!del) { if (ci < w.length) setCi(c => c + 1); else setDel(true); }
      else { if (ci > 0) setCi(c => c - 1); else { setDel(false); setWi(i => (i + 1) % WORDS.length); } }
    }, delay);
    return () => clearTimeout(t);
  }, [wi, ci, del]);
  return (
    <span className="text-gradient">
      {WORDS[wi].slice(0, ci)}<span className="opacity-60">|</span>
    </span>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: 'Brain',               title: 'Justification Engine',         desc: 'Write WHY before seeing the answer. AI scores your conceptual depth 0–100. Correct guess ≠ mastery.', tag: 'AI-POWERED', color: 'text-blue-400',    border: 'border-blue-500/20',    bg: 'bg-blue-500/6'    },
  { icon: 'RefreshCw',           title: 'SM-2 Spaced Repetition',       desc: 'Every wrong answer enters a smart queue that resurfaces it at the scientifically optimal interval.',    tag: 'MEMORY',    color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/6' },
  { icon: 'MessageCircleQuestion',title: 'Multi-source Doubt Solver',   desc: 'Searches NCERT + your institution notes + peer articles + web + YouTube simultaneously.',              tag: 'AI-POWERED', color: 'text-amber-400',   border: 'border-amber-500/20',   bg: 'bg-amber-500/6'   },
  { icon: 'Grid3x3',             title: 'Concept Mastery Heatmap',      desc: 'Accuracy at concept level — not just chapter. Red cells = NEET marks you are leaving on the table.',   tag: 'ANALYTICS', color: 'text-rose-400',    border: 'border-rose-500/20',    bg: 'bg-rose-500/6'    },
  { icon: 'Trophy',              title: 'Live Contests & Daily POD',    desc: 'Live NEET mock tests, 5-question daily challenge, batch + platform-wide leaderboard.',                 tag: 'COMPETE',   color: 'text-amber-400',   border: 'border-amber-500/20',   bg: 'bg-amber-500/6'   },
  { icon: 'TrendingUp',          title: 'Predicted Score Tracking',     desc: 'Real-time NEET score prediction from topic mastery, consistency, and speed. Know where you stand now.', tag: 'ANALYTICS', color: 'text-cyan-400',    border: 'border-cyan-500/20',    bg: 'bg-cyan-500/6'    },
];

const ROLES = [
  { icon: 'GraduationCap', title: 'Solo Student',        tag: 'NEET · JEE',      dest: '/activity-dashboard', color: 'text-emerald-400', border: 'border-emerald-500/25', bg: 'bg-emerald-500/6',  points: ['Personalised daily POD',     'Full platform analytics', 'Unlimited AI doubts']      },
  { icon: 'UserCheck',     title: 'Independent Tutor',   tag: 'Private teacher', dest: '/teacher',            color: 'text-sky-400',     border: 'border-sky-500/25',     bg: 'bg-sky-500/6',      points: ['Invite students by email',   'Configure batch POD',    'Per-student analytics']     },
  { icon: 'School',        title: 'Institution Teacher', tag: 'Coaching teacher',dest: '/institution-teacher',color: 'text-teal-400',    border: 'border-teal-500/25',    bg: 'bg-teal-500/6',     points: ['Assigned batch dashboard',   'Doubt queue + claim',    'Upload explanations']       },
  { icon: 'Building2',     title: 'Institution Admin',   tag: 'Coaching center', dest: '/institution',        color: 'text-violet-400',  border: 'border-violet-500/25',  bg: 'bg-violet-500/6',   points: ['Multi-batch management',     'Bulk CSV enrollment',    'AI-indexed PDF materials']  },
];

const TESTIMONIALS = [
  { name: 'Arjun Mehta',   exam: 'NEET 2025', result: 'AIR 847',         avatar: 'AM', text: 'The justification engine changed how I study. I thought I knew Krebs cycle — it turned out I just recognised the right option. BioBridge caught that.' },
  { name: 'Priya Nair',    exam: 'NEET 2025', result: '687/720',         avatar: 'PN', text: 'The heatmap showed I had been ignoring Human Physiology for months. Fixed it in 3 weeks. That chapter alone is worth 20+ NEET marks.' },
  { name: 'Rohit Sharma',  exam: 'JEE 2025',  result: '99.2 percentile', avatar: 'RS', text: 'SM-2 review saved me. I was making the same Organic Chemistry error 4 months in a row. It forced me to face it until it stuck.' },
];

// ── Component ─────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const jumpIn = (dest) => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate(dest, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${scrolled ? 'bg-[#070C16]/95 backdrop-blur-xl border-b border-[#192438]' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={14} color="white" />
            </div>
            <span className="text-base font-heading font-bold text-foreground">BioBridge</span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#7A8EAD]">
            <a href="#features"     className="hover:text-foreground transition-colors">Features</a>
            <a href="#for-who"      className="hover:text-foreground transition-colors">For who</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Students say</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block text-sm text-[#7A8EAD] hover:text-foreground transition-colors px-3 py-1.5">Sign in</Link>
            <Link to="/register" className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-smooth">
              Start Free
            </Link>
            {/* Mobile hamburger */}
            <button className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#192438] text-[#7A8EAD]" onClick={() => setMenuOpen(v => !v)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={18} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden bg-[#0C1221] border-b border-[#192438] px-4 py-4 flex flex-col gap-1">
            {[['#features','Features'],['#for-who','For who'],['#testimonials','Students say']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2.5 text-sm text-[#C4D0E8] border-b border-[#192438] last:border-0">{label}</a>
            ))}
            <Link to="/login" className="py-2.5 text-sm text-[#C4D0E8]">Sign in</Link>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-full px-3.5 py-1 text-xs text-primary font-semibold mb-7">
            <Icon name="Sparkles" size={11} />
            Built for 2.4M NEET · JEE aspirants
          </div>

          {/* Big headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] tracking-tight mb-5 text-balance">
            Practice smarter.<br />
            Aim for <Typewriter />
          </h1>

          <p className="text-base sm:text-lg text-[#7A8EAD] max-w-2xl mb-8 leading-relaxed">
            Not another content platform. BioBridge is a{' '}
            <strong className="text-foreground font-semibold">Practice OS</strong>{' '}
            — it identifies your exact gaps, fixes misconceptions with AI, and predicts your real NEET/JEE score.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl text-base transition-smooth glow-primary">
              Start Practicing Free
              <Icon name="ArrowRight" size={16} color="white" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 border border-[#243450] text-[#C4D0E8] hover:border-[#34506A] hover:text-foreground font-medium px-6 py-3 rounded-xl text-base transition-smooth">
              I have an account
            </Link>
          </div>

          <p className="text-xs text-[#4A5E7A]">No credit card · Free forever plan · Setup in 2 minutes</p>

          {/* Demo jump buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-xs text-[#4A5E7A]">Jump in as demo:</span>
            {ROLES.map(r => (
              <button key={r.dest} onClick={() => jumpIn(r.dest)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-smooth hover:scale-105 active:scale-95 ${r.bg} ${r.border} ${r.color}`}>
                <Icon name={r.icon} size={12} />{r.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hero mockup ────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="rounded-2xl border border-[#192438] overflow-hidden shadow-2xl bg-[#0C1221]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111A2C] border-b border-[#192438]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 mx-3 bg-[#0C1221] rounded-md px-3 py-1 text-xs text-[#4A5E7A] font-mono">
                app.biobridge.in/dashboard
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="p-5 grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="text-sm font-heading font-bold text-foreground">Today&apos;s Challenge</div>
                    <div className="text-xs text-[#7A8EAD]">5 questions · NEET · Aug 2</div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">3/5 done</span>
                </div>
                <div className="bg-[#111A2C] rounded-xl p-4 border border-[#192438]">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs border rounded-full px-2 py-0.5 bg-emerald-500/8 border-emerald-500/20 text-emerald-400">Biology</span>
                    <span className="text-xs border rounded-full px-2 py-0.5 bg-amber-500/8 border-amber-500/20 text-amber-400">Medium</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">In a dihybrid cross AaBb × AaBb, what fraction of offspring will be aabb?</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['1/16', '3/16', '9/16', '1/4'].map((opt, i) => (
                      <div key={i} className={`px-3 py-2 rounded-lg border text-xs ${i === 0 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-[#192438] text-[#7A8EAD]'}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-[#111A2C] rounded-xl p-4 border border-[#192438]">
                  <div className="text-xs text-[#7A8EAD] mb-1">Today&apos;s streak</div>
                  <div className="flex items-center gap-2">
                    <Icon name="Flame" size={16} color="#FB923C" />
                    <span className="text-2xl font-heading font-extrabold text-foreground">12</span>
                    <span className="text-xs text-[#7A8EAD]">days</span>
                  </div>
                </div>
                <div className="bg-[#111A2C] rounded-xl p-4 border border-[#192438]">
                  <div className="text-xs text-[#7A8EAD] mb-2">Concept gaps</div>
                  {[['Human Physiology', 42, '#F87171'], ["Lenz's Law", 38, '#F87171'], ['Organic Chemistry', 51, '#FBBF24']].map(([topic, pct, col]) => (
                    <div key={topic} className="flex items-center gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-foreground truncate mb-0.5">{topic}</div>
                        <div className="h-1 bg-[#192438] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: col }} />
                        </div>
                      </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: col }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-[#192438] bg-[#0C1221]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[
            { target: 50000,    suffix: '+',   label: 'Students Practicing' },
            { target: 2400000, suffix: '+',   label: 'NEET Applicants/Year' },
            { target: 99,       suffix: '.7%', label: 'Platform Uptime' },
            { target: 5,        suffix: 'ms',  label: 'Dashboard Load Time' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-extrabold text-primary">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-sm text-[#7A8EAD] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-full px-3.5 py-1 text-xs text-primary font-semibold mb-4">
              <Icon name="Layers" size={11} />
              What makes us different
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-3 text-balance">
              Allen & PW solve content delivery.<br />
              <span className="text-gradient">BioBridge solves learning.</span>
            </h2>
            <p className="text-[#7A8EAD] max-w-xl">Six systems that find your blind spots and fix them before exam day.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className={`group p-5 rounded-xl border ${f.border} ${f.bg} hover:-translate-y-px transition-smooth`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={f.icon} size={17} className={f.color} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A5E7A] mt-2.5">{f.tag}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-[#7A8EAD] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Who ────────────────────────────────────────────────────────── */}
      <section id="for-who" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0C1221]/40 border-y border-[#192438]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-2 text-balance">One platform. Four roles.</h2>
            <p className="text-[#7A8EAD]">Same powerful engine. Access adapts to who you are.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ROLES.map(r => (
              <div key={r.dest} className={`flex flex-col p-5 rounded-xl border ${r.border} ${r.bg}`}>
                <div className={`w-10 h-10 rounded-xl ${r.bg} border ${r.border} flex items-center justify-center mb-3`}>
                  <Icon name={r.icon} size={20} className={r.color} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-heading font-semibold text-foreground text-sm">{r.title}</h3>
                </div>
                <span className={`self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border mb-3 ${r.border} ${r.color} ${r.bg}`}>{r.tag}</span>
                <ul className="flex-1 space-y-1.5 mb-4">
                  {r.points.map(pt => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-[#7A8EAD]">
                      <Icon name="Check" size={12} className={`${r.color} flex-shrink-0 mt-0.5`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <button onClick={() => jumpIn(r.dest)}
                  className={`w-full py-2 rounded-lg border text-xs font-semibold transition-smooth hover:scale-[1.02] active:scale-95 ${r.border} ${r.color} ${r.bg}`}>
                  Try Demo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-2">Students who cracked it.</h2>
            <p className="text-[#7A8EAD]">Real results from real students who practiced on BioBridge.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#0C1221] border border-[#192438] rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/12 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-[#7A8EAD]">{t.exam} · <span className="text-primary font-medium">{t.result}</span></div>
                  </div>
                </div>
                <p className="text-xs text-[#7A8EAD] leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-[#192438]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-primary/12 border border-primary/25 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="Zap" size={26} className="text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-4 text-balance">Ready to find your blind spots?</h2>
          <p className="text-[#7A8EAD] mb-8">Set up your practice profile in 2 minutes. Free forever plan available.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-smooth glow-primary">
              Start Free <Icon name="ArrowRight" size={16} color="white" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 border border-[#243450] text-[#C4D0E8] hover:border-[#34506A] font-medium px-7 py-3.5 rounded-xl text-base transition-smooth">
              Sign in
            </Link>
          </div>
          <p className="text-xs text-[#4A5E7A] mt-4">No credit card required</p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#192438] bg-[#0C1221]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Zap" size={12} color="white" />
            </div>
            <span className="text-sm font-heading font-bold text-foreground">BioBridge</span>
          </div>
          <p className="text-xs text-[#4A5E7A] text-center">&copy; 2026 BioBridge. Built for Indian students preparing for NEET &amp; JEE.</p>
          <div className="flex items-center gap-4 text-xs text-[#4A5E7A]">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
