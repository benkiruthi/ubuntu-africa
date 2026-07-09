'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, Zap, Users, Globe, ChevronDown, ChevronUp,
  Mic, Upload, ImageIcon, Camera, Send, Brain, Rocket, DollarSign,
  Briefcase, ShoppingBag, Code, UserCheck, BookOpen, Target, Layers,
  Heart, Sprout, Scale, Shield, TrendingUp
} from 'lucide-react'
import { THEMES, ENGINES, getEcosystemList } from '@/lib/theme'

// ── Shared UI ──────────────────────────────────────────────────

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${className}`}>
      {children}
    </span>
  )
}

function Btn({ children, variant = 'primary', size = 'md', className = '', href, onClick, type = 'button', disabled }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
  const variants = {
    primary: 'bg-green-700 hover:bg-green-800 text-white shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-green-700 text-green-800 hover:bg-green-50',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    white: 'bg-white text-green-800 hover:bg-green-50 shadow-lg',
    'ghost-white': 'text-white hover:bg-white/10',
  }
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg', xl: 'px-10 py-5 text-xl' }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-40 pointer-events-none' : ''}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} type={type} onClick={onClick} disabled={disabled}>{children}</button>
}

// ── Nav ────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
              <span className="text-white text-base leading-none">🌍</span>
            </div>
            <span className="font-bold text-lg text-slate-900">Ubuntu Africa</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[['Products','#ecosystem'],['How it Works','#how-it-works'],['Mission','#mission'],['Journey','#journey']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">{label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Btn href="https://connect.ubuntu-africa.com" variant="ghost" size="sm">Sign in</Btn>
            <Btn href="https://connect.ubuntu-africa.com" size="sm">Try Ubuntu Connect <ArrowRight className="w-4 h-4" /></Btn>
          </div>
          <button className="md:hidden p-2 space-y-1.5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className="w-5 h-0.5 bg-slate-700" /><div className="w-5 h-0.5 bg-slate-700" /><div className="w-5 h-0.5 bg-slate-700" />
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            {[['Products','#ecosystem'],['How it Works','#how-it-works'],['Mission','#mission']].map(([label, href]) => (
              <a key={label} href={href} className="block text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>{label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <Btn href="https://connect.ubuntu-africa.com" variant="outline" size="sm" className="flex-1 justify-center">Sign in</Btn>
              <Btn href="https://connect.ubuntu-africa.com" size="sm" className="flex-1 justify-center">Get started</Btn>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ── AI Prompt ──────────────────────────────────────────────────

const PROMPTS = [
  'Help me start a business',
  'Teach me AI',
  'Find funding for my startup',
  'Build my website',
  'Find customers',
  'Find a job in Nairobi',
  'Improve my farm yield',
  'Grow my business',
  'Create a marketing plan',
  'Write a CV',
  'Learn coding from scratch',
  'Save money and invest',
  'Find a mentor',
  'Understand my legal rights',
]

function HeroPrompt() {
  const [value, setValue] = useState('')
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(true)
  const [displayed, setDisplayed] = useState('')
  const taRef = useRef(null)

  useEffect(() => {
    const target = PROMPTS[idx]
    let t
    if (typing) {
      if (displayed.length < target.length) {
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 42)
      } else {
        t = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22)
      } else {
        setIdx(i => (i + 1) % PROMPTS.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, idx])

  function autoGrow(e) {
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px'
  }

  return (
    <form
      className="w-full max-w-2xl mx-auto"
      onSubmit={e => { e.preventDefault(); if (value.trim()) alert(`Ubuntu AI is coming soon!\n\nYou asked: "${value}"`) }}
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 overflow-hidden">
        <textarea
          ref={taRef}
          value={value}
          onChange={e => { setValue(e.target.value); autoGrow(e) }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.currentTarget.form.requestSubmit() } }}
          placeholder={displayed || 'Ask Ubuntu AI anything…'}
          rows={1}
          className="w-full px-5 pt-4 pb-2 text-base text-slate-900 placeholder:text-slate-400 bg-transparent border-none outline-none resize-none min-h-[52px] max-h-[180px] overflow-y-auto leading-relaxed"
          aria-label="Your question or goal"
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-0.5">
            {[
              [Mic, 'Voice input'],
              [Upload, 'Upload file'],
              [ImageIcon, 'Upload image'],
              [Camera, 'Camera'],
            ].map(([Icon, label]) => (
              <button
                key={label}
                type="button"
                title={label}
                aria-label={label}
                className="p-2 rounded-lg text-slate-400 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <Btn type="submit" size="sm" disabled={!value.trim()} className="gap-1.5">
            Ask Ubuntu AI <Send className="w-3.5 h-3.5" />
          </Btn>
        </div>
      </div>
    </form>
  )
}

// ── Hero ───────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-50 blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-green-50 blur-3xl opacity-50 -translate-x-1/4" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-green-100 text-green-800 mb-6">
            <Zap className="w-3 h-3" /> Africa's AI Operating System
          </Badge>

          <p className="text-lg sm:text-xl font-medium text-slate-500 italic mb-2">Better Together</p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            Africa's Operating System{' '}
            <span className="gradient-text">for Opportunity</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-3 leading-relaxed">
            Learn.&nbsp; Build.&nbsp; Connect.&nbsp; Earn.&nbsp; Grow.
          </p>
          <p className="text-base font-bold text-green-700 mb-10">Powered by AI.</p>

          <HeroPrompt />

          <p className="mt-6 text-sm text-slate-400">
            One Ubuntu AI &middot; Ten platforms &middot; Free to start &middot; Built for Africa
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Popular Actions ────────────────────────────────────────────

const ACTIONS = [
  { icon: Rocket,     label: 'Start a Business' },
  { icon: Brain,      label: 'Learn AI' },
  { icon: DollarSign, label: 'Find Funding' },
  { icon: Briefcase,  label: 'Find a Job' },
  { icon: ShoppingBag,label: 'Sell Online' },
  { icon: Code,       label: 'Build a Website' },
  { icon: UserCheck,  label: 'Find a Mentor' },
  { icon: BookOpen,   label: 'Learn New Skills' },
]

function PopularActions() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Popular actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3.5 text-left hover:border-green-300 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-800">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Ecosystem ──────────────────────────────────────────────────

const ECO_ICONS = {
  learn:      Brain,
  connect:    Heart,
  jobs:       Briefcase,
  business:   Rocket,
  health:     Shield,
  money:      DollarSign,
  farmer:     Sprout,
  leadership: TrendingUp,
  care:       Users,
  justice:    Scale,
}

function Ecosystem() {
  const ecosystem = getEcosystemList()
  return (
    <section id="ecosystem" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">The Ubuntu Ecosystem</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            Ten platforms. <span className="gradient-text">One person, growing.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Every platform shares one account, one AI, and one mission. Start anywhere. Grow everywhere.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecosystem.map(p => {
            const Icon = ECO_ICONS[p.slug] || Globe
            const engine = ENGINES[p.slug]
            return (
              <a
                key={p.slug}
                href={p.href}
                className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-lg hover:-translate-y-1 transition-all"
                style={{ borderTop: `3px solid ${p.primary}` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.primary}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.primary }} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {p.status === 'live' ? '● Live' : 'Waitlist'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{p.tagline}</p>
                {engine && (
                  <p className="text-xs font-semibold text-amber-600 mb-3">⚙ {engine.name}</p>
                )}
                <div className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: p.primary }}>
                  {p.status === 'live' ? 'Open' : 'Join waitlist'} <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            )
          })}
        </div>
        <p className="text-center text-sm text-slate-400 mt-10">
          More products coming — the ecosystem is built to grow to 40+ platforms, all sharing one AI.
        </p>
      </div>
    </section>
  )
}

// ── How It Works (One AI) ──────────────────────────────────────

function HowItWorks() {
  const pillars = [
    { n: '01', icon: <Shield className="w-6 h-6" />, title: 'One Account', desc: 'Sign up once. Access every Ubuntu platform with the same account, one profile, one history.' },
    { n: '02', icon: <Brain className="w-6 h-6" />, title: 'One AI', desc: 'Your AI companion learns your goals and proactively guides you toward opportunities across every platform.' },
    { n: '03', icon: <Layers className="w-6 h-6" />, title: 'One Ecosystem', desc: 'Ten platforms today. Dozens more coming. Everything you build stays connected.' },
    { n: '04', icon: <Target className="w-6 h-6" />, title: 'One Mission', desc: 'Help every African learn, build, connect, earn, and thrive through AI.' },
  ]
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-white/10 text-green-300 mb-4">One ecosystem</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            One Account. One AI.{' '}
            <span className="gradient-text">One Ecosystem.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you learn, build, and achieve stays connected. Ubuntu AI becomes your lifelong AI companion —
            remembering your goals, tracking your progress, and guiding you toward every opportunity.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(p => (
            <div key={p.n} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all">
              <span className="absolute top-4 right-4 text-6xl font-black text-white/5 leading-none select-none">{p.n}</span>
              <div className="w-12 h-12 rounded-xl bg-green-700 text-white flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="font-bold text-lg text-white mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Mission ────────────────────────────────────────────────────

function Mission() {
  return (
    <section id="mission" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-green-100 text-green-800 mb-6">Our mission</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Building Africa's Future{' '}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Ubuntu exists to help every African learn, build businesses, access opportunities,
              solve problems, and improve their lives using AI.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Opportunity should never depend on where someone was born.
            </p>
          </div>
          <div className="bg-green-700 rounded-3xl p-10 text-white text-center">
            <p className="text-3xl sm:text-4xl font-black italic leading-snug mb-4">
              &ldquo;I am because we are.&rdquo;
            </p>
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">Ubuntu philosophy</p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center border-t border-white/20 pt-8">
              {[['10','Platforms'],['40+','Coming soon'],['1','AI for all']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{v}</p>
                  <p className="text-xs text-green-200 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Journey ────────────────────────────────────────────────────

const JOURNEY = [
  { icon: Brain,      step: 'Learn AI' },
  { icon: Rocket,     step: 'Start a business' },
  { icon: Code,       step: 'Build a website' },
  { icon: Users,      step: 'Find customers' },
  { icon: DollarSign, step: 'Access funding' },
  { icon: Briefcase,  step: 'Hire employees' },
  { icon: Globe,      step: 'Grow across Africa' },
  { icon: TrendingUp, step: 'Create jobs' },
  { icon: Heart,      step: 'Transform communities' },
]

function Journey() {
  return (
    <section id="journey" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">The Ubuntu Journey</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            Everything happens <span className="gradient-text">inside Ubuntu.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            From first lesson to transformed community — one continuous journey, guided by AI.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {JOURNEY.map(({ icon: Icon, step }, i) => (
            <div
              key={step}
              className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3.5 hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-800">{step}</span>
              {i < JOURNEY.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 ml-auto flex-shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'What is Ubuntu Africa?', a: 'Ubuntu Africa is an AI operating system for opportunity — a growing ecosystem of platforms helping every African learn, build businesses, find work, manage health, grow food, and more. One account, one AI, unlimited potential.' },
    { q: 'What does "One AI" mean?', a: 'Every platform in the Ubuntu ecosystem is powered by the same underlying AI. It learns your goals, remembers your journey across platforms, and proactively guides you toward opportunities — like a lifelong personal advisor.' },
    { q: 'Which platforms are live right now?', a: 'Ubuntu Connect (matchmaking) is live now at connect.ubuntu-africa.com. The rest of the ecosystem — Learn, Jobs, Business, Health, Money, Farmer, Leadership, Care, and Justice — are launching on waitlist. Join now to be first.' },
    { q: 'Is it free?', a: 'Yes, free to start. Ubuntu Connect has a free tier. Each platform will have a free plan. You only pay when you need more — premium AI, advanced features, or credits.' },
    { q: 'Which countries are supported?', a: 'Ubuntu Africa is built for the entire continent, starting with Kenya. Every product is designed to work on any phone, including basic Android devices, across all African markets.' },
    { q: 'How do I join the waitlist?', a: 'Click "Try Ubuntu Connect" to start using the first live platform. For other products, join the waitlist on each product page — you\'ll be notified as they launch.' },
  ]
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Got questions?</h2>
          <p className="text-lg text-slate-600">Everything you need to know before you start.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden hover:border-green-200 transition-colors">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                {open === i
                  ? <ChevronUp className="w-5 h-5 text-green-700 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ─────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-20 sm:py-28 bg-green-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Start with what's live today.
        </h2>
        <p className="text-xl text-green-100 mb-10 max-w-xl mx-auto">
          Ubuntu Connect is open now. The rest of the ecosystem is coming.
          Join now and shape Africa's digital future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Btn href="https://connect.ubuntu-africa.com" variant="white" size="xl">
            Try Ubuntu Connect <ArrowRight className="w-5 h-5" />
          </Btn>
          <Btn href="#ecosystem" variant="ghost-white" size="xl">
            Explore the ecosystem
          </Btn>
        </div>
        <p className="mt-6 text-green-200 text-sm">Free · Private · Built for Africa</p>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────

function Footer() {
  const ecosystem = getEcosystemList()
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
                <span className="text-white text-base leading-none">🌍</span>
              </div>
              <span className="font-bold text-white text-lg">Ubuntu Africa</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Africa's Operating System for Opportunity. Helping every African learn, build, connect, earn, and thrive through AI.
            </p>
            <p className="text-xs mt-4 text-slate-500">© {new Date().getFullYear()} Ubuntu Africa. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Products</h4>
            <ul className="space-y-2.5">
              {ecosystem.slice(0, 5).map(p => (
                <li key={p.slug}><a href={p.href} className="text-sm hover:text-white transition-colors">{p.name}</a></li>
              ))}
              <li><a href="#ecosystem" className="text-sm hover:text-white transition-colors text-green-400">View all →</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {['Mission','Blog','Careers','Foundation','Partners','Contact'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Developers</h4>
            <ul className="space-y-2.5">
              {['API','Documentation','Developers','Privacy Policy','Terms of Service'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Made with ❤️ for Africa</p>
          <div className="flex items-center gap-2">
            {['ke','ng','gh','ug','tz','rw','za','et'].map(cc => (
              <img key={cc} src={`https://flagcdn.com/w20/${cc}.png`} alt={cc.toUpperCase()} className="w-5 h-3.5 object-cover rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────

export default function UbuntuAfricaHomepage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PopularActions />
        <Ecosystem />
        <HowItWorks />
        <Mission />
        <Journey />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
