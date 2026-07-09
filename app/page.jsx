'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Mic, Upload, ImageIcon, Camera, Send,
  Brain, Rocket, Briefcase, DollarSign, Code, ShoppingBag,
  Users, Sprout, Play, TrendingUp, Globe, Heart,
  Scale, Shield, ChevronDown, ChevronUp, Menu, X,
} from 'lucide-react'
import { getEcosystemList } from '@/lib/theme'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const ROTATING_PROMPTS = [
  'Help me start a business.',
  'Teach me AI.',
  'Find funding for my idea.',
  'Write my CV.',
  'Help me find customers.',
  'Improve my farm yield.',
  'Help me grow my business.',
  'Find me a mentor.',
  'Help me build a website.',
  'How do I export my products?',
  'Help me find a job.',
  'Teach me how to invest.',
]

const OUTCOMES = [
  { icon: Brain,       label: 'Learn AI',            prompt: 'Teach me AI from scratch' },
  { icon: Rocket,      label: 'Start a Business',    prompt: 'Help me start a business' },
  { icon: Briefcase,   label: 'Find a Job',          prompt: 'Help me find a job' },
  { icon: DollarSign,  label: 'Access Funding',      prompt: 'Help me find funding for my idea' },
  { icon: Code,        label: 'Build a Website',     prompt: 'Help me build a website' },
  { icon: ShoppingBag, label: 'Sell Online',         prompt: 'Help me start selling online' },
  { icon: Users,       label: 'Find Customers',      prompt: 'Help me find customers for my business' },
  { icon: Sprout,      label: 'Improve Your Farm',   prompt: 'Help me improve my farm and increase yield' },
  { icon: Play,        label: 'Create Content',      prompt: 'Help me create content to grow my brand' },
  { icon: TrendingUp,  label: 'Grow Your Business',  prompt: 'Help me grow my business' },
]

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

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

function Nav({ onSignIn }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-sm">🌍</div>
          <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">Ubuntu Africa</span>
        </Link>

        {/* Desktop right */}
        <div className="hidden sm:flex items-center gap-6">
          <a href="#explore" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Products</a>
          <a href="#mission" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Mission</a>
          <a
            href="https://connect.ubuntu-africa.com"
            className="text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 transition-colors"
          >
            Sign in
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-1.5 text-slate-600 dark:text-slate-300"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 py-4 flex flex-col gap-4">
          <a href="#explore" className="text-sm font-medium text-slate-700 dark:text-slate-300 py-1" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#mission" className="text-sm font-medium text-slate-700 dark:text-slate-300 py-1" onClick={() => setMenuOpen(false)}>Mission</a>
          <a
            href="https://connect.ubuntu-africa.com"
            className="text-sm font-semibold text-green-700 py-2 px-4 rounded-xl border border-green-200 dark:border-green-800 text-center"
          >
            Sign in
          </a>
        </div>
      )}
    </header>
  )
}

// ─────────────────────────────────────────────
// PROMPT BOX
// ─────────────────────────────────────────────

function PromptBox({ value, onChange, onSubmit }) {
  const taRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(true)
  const [displayed, setDisplayed] = useState('')

  // Typewriter
  useEffect(() => {
    if (value) return // stop animation once user starts typing
    const target = ROTATING_PROMPTS[idx]
    let t
    if (typing) {
      if (displayed.length < target.length) {
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 40)
      } else {
        t = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 20)
      } else {
        setIdx(i => (i + 1) % ROTATING_PROMPTS.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, idx, value])

  function grow(e) {
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  function submit(e) {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-[0_4px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_32px_rgba(0,0,0,0.4)] focus-within:border-green-400 dark:focus-within:border-green-600 focus-within:shadow-[0_4px_32px_rgba(0,0,0,0.10),0_0_0_4px_rgba(21,128,61,0.08)] transition-all duration-200 overflow-hidden">
        <textarea
          ref={taRef}
          value={value}
          onChange={e => { onChange(e.target.value); grow(e) }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(e) } }}
          placeholder={value ? '' : (displayed || 'Ask Ubuntu anything…')}
          rows={1}
          className="w-full px-5 pt-4 pb-3 bg-transparent border-none outline-none resize-none text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[56px] max-h-[160px] overflow-y-auto leading-relaxed"
          aria-label="Ask Ubuntu AI"
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
          {/* Input mode icons */}
          <div className="flex items-center gap-0.5">
            {[
              [Mic, 'Voice'],
              [Upload, 'File'],
              [ImageIcon, 'Image'],
              [Camera, 'Camera'],
            ].map(([Icon, label], i) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                title={label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors ${i >= 2 ? 'hidden xs:flex' : 'flex'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            Ask Ubuntu
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero({ prompt, setPrompt }) {
  const promptRef = useRef(null)

  function handleSubmit(text) {
    alert(`Ubuntu AI is coming soon.\n\nYou asked: "${text}"`)
  }

  function fillPrompt(text) {
    setPrompt(text)
    promptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // focus the textarea
    setTimeout(() => {
      const ta = promptRef.current?.querySelector('textarea')
      ta?.focus()
    }, 400)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 pt-14 pb-16 bg-white dark:bg-slate-950">
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center">

        {/* Logo mark */}
        <div className="w-14 h-14 rounded-2xl bg-green-700 flex items-center justify-center text-2xl mb-5 shadow-sm">
          🌍
        </div>

        {/* Tagline */}
        <p className="text-sm text-slate-400 dark:text-slate-500 italic mb-3 tracking-wide">
          Better Together
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
          Africa's AI<br />for Opportunity
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md leading-relaxed">
          Helping Africans learn, build, connect and earn through AI.
        </p>

        {/* Prompt box */}
        <div ref={promptRef} className="w-full mb-6">
          <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} />
        </div>

        {/* Scroll hint */}
        <a
          href="#outcomes"
          className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mt-2"
          aria-label="See what Ubuntu can do"
        >
          <span className="text-xs font-medium tracking-wide">See what Ubuntu can do</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// OUTCOMES — "What can Ubuntu help you do?"
// ─────────────────────────────────────────────

function Outcomes({ onSelect }) {
  return (
    <section id="outcomes" className="py-20 sm:py-24 px-5 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-center mb-3 tracking-tight">
          What can Ubuntu help you do?
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center mb-10">
          Choose a goal and Ubuntu AI will guide you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {OUTCOMES.map(({ icon: Icon, label, prompt }) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(prompt)}
              className="group flex flex-col items-center gap-2.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-green-300 dark:hover:border-green-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPLORE — "Explore Ubuntu" (understated)
// ─────────────────────────────────────────────

function ExploreUbuntu() {
  const ecosystem = getEcosystemList()

  return (
    <section id="explore" className="py-20 sm:py-24 px-5 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Section label — intentionally understated */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-2">
            Explore Ubuntu
          </span>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ecosystem.map(p => {
            const Icon = ECO_ICONS[p.slug] || Globe
            const isLive = p.status === 'live'
            return (
              <a
                key={p.slug}
                href={p.href}
                className="group flex flex-col items-center text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-150"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3"
                  style={{ background: `${p.primary}12` }}
                >
                  {p.emoji}
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5 leading-tight">
                  {p.name.replace('Ubuntu ', '')}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-600 leading-snug mb-2.5 line-clamp-2">
                  {(p.tagline.split(' — ')[1] ?? p.tagline).split(' — ')[0]}
                </p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLive ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'}`}>
                  {isLive ? '● Open' : 'Soon'}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MISSION
// ─────────────────────────────────────────────

function Mission() {
  return (
    <section id="mission" className="py-20 sm:py-28 px-5 bg-slate-900 dark:bg-black">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-6">Our mission</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-snug tracking-tight">
          Building Opportunity<br />Across Africa
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4 text-sm sm:text-base">
          Ubuntu exists to help every African learn new skills, build businesses, access opportunities,
          solve problems, and improve their lives with AI.
        </p>
        <p className="text-slate-500 text-sm italic">
          Because opportunity should never depend on where someone was born.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  const ecosystem = getEcosystemList()
  return (
    <footer className="bg-slate-950 border-t border-slate-800 px-5 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-green-700 flex items-center justify-center text-xs">🌍</div>
              <span className="font-bold text-white text-sm">Ubuntu Africa</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
              Africa's AI for Opportunity.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Products</p>
            <ul className="space-y-2">
              {ecosystem.slice(0, 5).map(p => (
                <li key={p.slug}>
                  <a href={p.href} className="text-xs text-slate-500 hover:text-white transition-colors">{p.name}</a>
                </li>
              ))}
              <li><a href="#explore" className="text-xs text-green-500 hover:text-green-400 transition-colors">View all →</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Company</p>
            <ul className="space-y-2">
              {['Mission', 'Blog', 'Careers', 'Contact'].map(l => (
                <li key={l}><a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Legal</p>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'API'].map(l => (
                <li key={l}><a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Ubuntu Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {['ke','ng','gh','ug','tz','rw','za','et'].map(cc => (
              <img
                key={cc}
                src={`https://flagcdn.com/w20/${cc}.png`}
                alt={cc.toUpperCase()}
                width={20}
                height={14}
                className="rounded-sm object-cover opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function UbuntuAfricaHomepage() {
  const [prompt, setPrompt] = useState('')
  const heroRef = useRef(null)

  function selectOutcome(text) {
    setPrompt(text)
    // scroll back to prompt
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      const ta = document.querySelector('textarea')
      ta?.focus()
    }, 600)
  }

  return (
    <>
      <Nav />
      <main>
        <Hero prompt={prompt} setPrompt={setPrompt} />
        <Outcomes onSelect={selectOutcome} />
        <ExploreUbuntu />
        <Mission />
      </main>
      <Footer />
    </>
  )
}
