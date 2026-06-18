import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiCheckSquare, FiCheck, FiCalendar, FiSearch,
  FiArrowRight, FiStar, FiZap, FiShield, FiTrendingUp,
  FiBell, FiMenu, FiX
} from 'react-icons/fi';

/* ─── Hook: count up animation ─── */
function useCounter(target, duration, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ─── Animated stat item (hooks safe inside its own component) ─── */
const AnimatedStat = ({ value, suffix, label, started, duration = 2000 }) => {
  const count = useCounter(value, duration, started);
  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-black text-white">
        {suffix === '.9★' ? `4.${count % 10}★` : `${count}${suffix}`}
      </p>
      <p className="text-sm text-green-100 mt-1 font-medium">{label}</p>
    </div>
  );
};

/* ─── Feature card ─── */
const FeatureCard = ({ icon: Icon, title, desc, accent }) => (
  <div className="glass-panel rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${accent}`}>
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

/* ─── Minimal phone mockup ─── */
const PhoneMockup = () => (
  <div className="relative mx-auto w-[260px] select-none">
    <div
      className="relative rounded-[2.5rem] border-[6px] border-gray-900 bg-white shadow-2xl overflow-hidden"
      style={{ minHeight: 520 }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[9px] font-semibold text-gray-900">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <span className="text-[8px]">▌▌▌ WiFi 🔋</span>
        </div>
      </div>

      {/* App content */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <p className="text-[11px] font-bold text-gray-900 mt-1">Tue, 21 Oct 2025</p>

        {/* Search */}
        <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-2">
          <FiSearch className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="text-[9px] text-gray-400">Search tasks…</span>
        </div>

        {/* Task cards */}
        {[
          { title: 'Design Landing Page', sub: 'E-Commerce Shop', tag: 'UI Design', pct: 85, done: true },
          { title: 'Mobile App Redesign', sub: 'UI/UX Project',   tag: 'Design',   pct: 40, done: false },
          { title: 'Prepare Presentation', sub: 'Client Meeting', tag: 'Work',      pct: 60, done: false },
        ].map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="flex gap-2 items-start">
              <div className={`mt-0.5 h-3.5 w-3.5 rounded border-2 flex items-center justify-center shrink-0 ${t.done ? 'bg-brand-500 border-brand-500' : 'border-gray-300'}`}>
                {t.done && <FiCheck className="h-2 w-2 text-white stroke-[3]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-gray-900 leading-tight">{t.title}</p>
                <p className="text-[8px] text-gray-500 mt-0.5">{t.sub}</p>
                <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${t.pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[7px] font-medium bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded-full">{t.tag}</span>
                  <span className="text-[8px] text-gray-400">{t.pct}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom bar */}
        <div className="flex justify-around items-center border-t border-gray-100 pt-3 mt-2">
          {['Home', 'Add Task', 'Settings'].map((l, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              {i === 1
                ? <div className="h-7 w-7 bg-brand-500 rounded-full flex items-center justify-center"><FiCheck className="h-3.5 w-3.5 text-white" /></div>
                : <div className="h-4 w-4 bg-gray-200 rounded" />}
              <span className="text-[7px] text-gray-500">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating cards */}
    <div className="absolute -left-14 top-10 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 w-32"
      style={{ animation: 'float 4s ease-in-out infinite' }}>
      <p className="text-[9px] text-gray-500 font-medium">Completed</p>
      <p className="text-2xl font-black text-gray-900">124</p>
      <p className="text-[9px] text-brand-500 font-semibold mt-0.5">↑ 12% last month</p>
    </div>
    <div className="absolute -right-12 top-1/3 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 w-28"
      style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '0.8s' }}>
      <p className="text-[9px] text-gray-500 font-medium">Pending</p>
      <p className="text-2xl font-black text-gray-900">12</p>
      <p className="text-[9px] text-red-400 font-semibold mt-0.5">↓ 3 last month</p>
    </div>
    <div className="absolute -left-10 bottom-24 bg-brand-500 rounded-2xl shadow-xl px-3 py-2.5"
      style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1.4s' }}>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {['#4ade80', '#22c55e', '#16a34a'].map((c, i) => (
            <div key={i} className="h-5 w-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div>
          <p className="text-[8px] font-bold text-white">78k+ Users</p>
          <p className="text-[7px] text-green-200">Daily Active</p>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════
   Main Landing Page
═══════════════════════════════════════ */
export default function Landing() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Trigger stat counters when section scrolls into view */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Data ── */
  const features = [
    { icon: FiCheck,       title: 'Smart Task Management',    desc: 'Create, organise and track tasks effortlessly. Mark done, set priorities and never miss a deadline.',     accent: 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400' },
    { icon: FiCalendar,    title: 'Calendar Due Dates',       desc: 'Pick any date from a beautiful two-month calendar. See task-dots on the days you\'re busiest.',            accent: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' },
    { icon: FiSearch,      title: 'Instant Search & Filter',  desc: 'Find any task in milliseconds. Filter by All, Pending or Completed — always know where you stand.',        accent: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400' },
    { icon: FiTrendingUp,  title: 'Progress Analytics',       desc: 'Live completion-rate dashboard. Watch your productivity grow with beautiful real-time stats.',              accent: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' },
    { icon: FiShield,      title: 'Secure & Private',         desc: 'JWT-based auth keeps your tasks 100% yours. Data is scoped per user — zero cross-account leaks.',          accent: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' },
    { icon: FiBell,        title: 'Overdue Alerts',           desc: 'Tasks past their due date are flagged in red automatically. Stay accountable without lifting a finger.',    accent: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' },
  ];

  const steps = [
    { num: '01', title: 'Sign up free',    desc: 'Create your account in seconds — no credit card needed.' },
    { num: '02', title: 'Add your tasks',  desc: 'Type a task, pick a due date from the calendar, and hit Add.' },
    { num: '03', title: 'Stay organised', desc: 'Filter, search and complete tasks. Watch your stats soar.' },
  ];

  const testimonials = [
    { quote: 'TaskFlow completely changed how I organise my work. The calendar feature is a game changer!', name: 'Sarah K.', role: 'Product Designer' },
    { quote: "Finally a todo app that doesn't feel overwhelming. Clean, fast and does exactly what I need.", name: 'James M.', role: 'Software Engineer' },
    { quote: "I manage my whole team's tasks here. The completion stats keep everyone accountable.",        name: 'Priya R.', role: 'Team Lead' },
  ];

  const navLinks = ['Features', 'How it works', 'Stats'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* ════ Float keyframe ════ */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>

      {/* ════ Sticky navbar ════ */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:bg-gray-950/80 dark:border-gray-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-500/30">
              <FiCheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-brand-600 to-green-400 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                {l}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-3 py-2">
              Log in
            </button>
            <button onClick={() => navigate('/signup')}
              className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5">
              Get Started Free <FiArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <a key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 py-1 transition-colors">
                {l}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => navigate('/login')}
                className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-xl py-2.5 hover:border-brand-500 transition-colors">
                Log in
              </button>
              <button onClick={() => navigate('/signup')}
                className="flex-1 text-sm font-semibold bg-brand-500 text-white rounded-xl py-2.5 hover:bg-brand-600 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ════ Hero ════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <FiStar className="h-3.5 w-3.5" />
              #1 Task Manager for Productive People
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-6">
              Build Better Days<br />
              With{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-500 to-green-400 bg-clip-text text-transparent">
                  TaskFlow
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                  <path d="M2 7 C60 1 130 9 198 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
              Simplify your workflow, manage priorities effortlessly, and create productive days that actually feel balanced.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('/signup')}
                className="group flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 hover:-translate-y-1 transition-all duration-300 text-base">
                Get Started Free
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-500 dark:hover:border-brand-500 font-bold px-8 py-4 rounded-2xl hover:-translate-y-1 transition-all duration-300 text-base bg-white dark:bg-transparent">
                Log In
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'].map((c, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 shadow" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <FiStar key={s} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">78,000+ happy users</p>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ════ Stats ════ */}
      <section id="stats" ref={statsRef} className="bg-brand-500 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedStat value={78}   suffix="k+" label="Active Users"       started={statsStarted} />
            <AnimatedStat value={2400} suffix="k+" label="Tasks Completed"    started={statsStarted} />
            <AnimatedStat value={98}   suffix="%"  label="Satisfaction Rate"  started={statsStarted} />
            <AnimatedStat value={9}    suffix=".9★" label="Average Rating"   started={statsStarted} />
          </div>
        </div>
      </section>

      {/* ════ Features ════ */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-sm font-bold px-4 py-2 rounded-full mb-4">
              Everything you need
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Packed with powerful features
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to manage tasks, track progress and stay on top of every deadline.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ════ How it works ════ */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-sm font-bold px-4 py-2 rounded-full mb-4">
              Super simple
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Up and running in 60 seconds
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              No complicated setup. No tutorials. Just sign up and go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 dark:from-brand-900 dark:via-brand-600 dark:to-brand-900" />
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-2xl bg-brand-500 shadow-xl shadow-brand-500/30 flex flex-col items-center justify-center mb-6 relative z-10">
                  <span className="text-xl font-black text-white/50">{s.num}</span>
                  <FiZap className="h-6 w-6 text-white -mt-1" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Testimonials ════ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Loved by users worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-panel rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <FiStar key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA Banner ════ */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-brand-500 p-12 text-center overflow-hidden">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiCheckSquare className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-black text-white">TaskFlow</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Start organising today.<br />It's completely free.
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-md mx-auto">
                Join 78,000+ people who have taken control of their day with TaskFlow.
              </p>
              <button onClick={() => navigate('/signup')}
                className="group inline-flex items-center gap-2 bg-white text-brand-600 font-black text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Create Free Account
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-green-200 text-sm mt-4">No credit card required · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Footer ════ */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <FiCheckSquare className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black text-white">TaskFlow</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 TaskFlow. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" className="text-sm text-gray-500 hover:text-brand-400 transition-colors font-medium">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
