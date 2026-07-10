'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Zap, CheckCircle2, Star,
  Mic, Upload, ImageIcon, Camera, Send, Menu, X,
  Brain, Rocket, Briefcase, DollarSign, Code, ShoppingBag,
  Users, Sprout, Play, TrendingUp, Globe, Heart, Scale, Shield,
  Home, Hammer,
} from 'lucide-react'
import { getEcosystemList } from '../lib/theme'

// ── Data ───────────────────────────────────────────────────────

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
  { icon: Brain,       label: 'Learn AI',           prompt: 'Teach me AI from scratch' },
  { icon: Rocket,      label: 'Start a Business',   prompt: 'Help me start a business' },
  { icon: Briefcase,   label: 'Find a Job',         prompt: 'Help me find a job' },
  { icon: DollarSign,  label: 'Access Funding',     prompt: 'Help me find funding for my idea' },
  { icon: Code,        label: 'Build a Website',    prompt: 'Help me build a website' },
  { icon: ShoppingBag, label: 'Sell Online',        prompt: 'Help me start selling online' },
  { icon: Users,       label: 'Find Customers',     prompt: 'Help me find customers for my business' },
  { icon: Sprout,      label: 'Improve Your Farm',  prompt: 'Help me improve my farm and increase yield' },
  { icon: Play,        label: 'Create Content',     prompt: 'Help me create content to grow my brand' },
  { icon: TrendingUp,  label: 'Grow Your Business', prompt: 'Help me grow my business' },
]

const ECO_ICONS = {
  connect:   Heart,
  learn:     Brain,
  jobs:      Briefcase,
  business:  Rocket,
  farmer:    Sprout,
  money:     DollarSign,
  health:    Shield,
  community: Users,
  family:    Home,
  build:     Hammer,
}

// Brand pink — matches Frill's accent
const PINK = '#f04e6b'

// ── Shared components ──────────────────────────────────────────

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${className}`}>
      {children}
    </span>
  )
}

function Btn({ children, variant = 'primary', size = 'md', className = '', href, onClick, type = 'button', disabled }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg', xl: 'px-8 py-4 text-lg' }

  let style = {}
  let cls = `${base} ${sizes[size]} ${className} ${disabled ? 'opacity-40 pointer-events-none' : ''}`

  if (variant === 'primary') {
    style = { background: PINK, color: '#fff' }
    cls += ' shadow-lg hover:-translate-y-0.5'
  } else if (variant === 'outline') {
    style = { border: `2px solid ${PINK}`, color: PINK }
    cls += ' hover:bg-rose-50'
  } else if (variant === 'ghost') {
    cls += ' text-slate-600 hover:text-slate-900 hover:bg-slate-100'
  } else if (variant === 'white') {
    cls += ' bg-white text-rose-600 hover:bg-rose-50 shadow-lg'
  } else if (variant === 'ghost-white') {
    cls += ' text-white hover:bg-white/10'
  }

  if (href) return <Link href={href} className={cls} style={style}>{children}</Link>
  return <button className={cls} style={style} type={type} onClick={onClick} disabled={disabled}>{children}</button>
}

// ── Nav ────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base text-white" style={{ background: PINK }}>🌍</div>
            <span className="font-bold text-lg text-slate-900">Ebbli</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[['What Ebbli can do','#outcomes'],['Products','#explore'],['Mission','#mission']].map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Btn href="https://connect.ebbli.co" variant="ghost" size="sm">Sign in</Btn>
            <Btn href="https://connect.ebbli.co" size="sm">Try Ebbli Connect <ArrowRight className="w-4 h-4" /></Btn>
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1">
            {[['What Ebbli can do','#outcomes'],['Products','#explore'],['Mission','#mission']].map(([l, h]) => (
              <a key={l} href={h} className="block text-sm font-medium text-slate-700 px-2 py-3 rounded-lg hover:bg-slate-50" onClick={() => setOpen(false)}>{l}</a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Btn href="https://connect.ebbli.co" variant="outline" size="sm" className="w-full justify-center">Sign in</Btn>
              <Btn href="https://connect.ebbli.co" size="sm" className="w-full justify-center">Try Ebbli Connect <ArrowRight className="w-4 h-4" /></Btn>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ── Prompt box ─────────────────────────────────────────────────

function PromptBox({ value, onChange, onSubmit }) {
  const taRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(true)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (value) return
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.07)] focus-within:border-rose-300 focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_4px_rgba(240,78,107,0.08)] transition-all duration-200 overflow-hidden">
        <textarea
          ref={taRef}
          value={value}
          onChange={e => { onChange(e.target.value); grow(e) }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(e) } }}
          placeholder={value ? '' : (displayed || 'Ask Ebbli anything…')}
          rows={1}
          className="w-full px-5 pt-4 pb-3 bg-transparent border-none outline-none resize-none text-base text-slate-900 placeholder:text-slate-400 min-h-[58px] max-h-[160px] overflow-y-auto leading-relaxed"
          aria-label="Ask Ebbli AI"
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
          <div className="flex items-center gap-0.5">
            {[[Mic,'Voice'],[Upload,'File'],[ImageIcon,'Image'],[Camera,'Camera']].map(([Icon, label], i) => (
              <button key={label} type="button" aria-label={label} title={label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-50 transition-colors ${i >= 2 ? 'hidden xs:flex' : 'flex'}`}
                style={{ ['--tw-text-opacity']: 1 }}
                onMouseOver={e => e.currentTarget.style.color = PINK}
                onMouseOut={e => e.currentTarget.style.color = ''}>
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <button type="submit" disabled={!value.trim()}
            className="flex items-center gap-1.5 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            style={{ background: value.trim() ? PINK : undefined }}>
            Ask Ebbli <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </form>
  )
}

// ── Hero ───────────────────────────────────────────────────────

function Hero({ prompt, setPrompt }) {
  function handleSubmit(text) {
    alert(`Ebbli AI is coming soon.\n\nYou asked: "${text}"`)
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 bg-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" style={{ background: '#fce7ec' }} />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-3xl opacity-40 -translate-x-1/4" style={{ background: '#fce7ec' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">

          <Badge className="mb-6 text-white" style={{ background: PINK }}>
            <Zap className="w-3 h-3" /> Africa's AI for Opportunity
          </Badge>

          <p className="text-base font-medium text-slate-400 italic mb-3">Better Together</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5">
            Africa's AI<br />
            <span style={{ color: PINK }}>for Opportunity</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Helping Africans learn, build, connect and earn through AI.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['ke','ng','gh','ug','tz'].map(cc => (
                  <div key={cc} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img src={`https://flagcdn.com/w40/${cc}.png`} alt={cc.toUpperCase()} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Used across <strong className="text-slate-700">Africa</strong></span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: PINK }} />
              <span>Free to start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Outcomes ───────────────────────────────────────────────────

function Outcomes({ onSelect }) {
  return (
    <section id="outcomes" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-white" style={{ background: PINK }}>What Ebbli can do</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            What can Ebbli <span style={{ color: PINK }}>help you do?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Choose a goal — Ebbli AI will guide you step by step.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {OUTCOMES.map(({ icon: Icon, label, prompt }) => (
            <button key={label} type="button" onClick={() => onSelect(prompt)}
              className="group flex flex-col items-center gap-3 bg-white border border-slate-100 rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-150"
              style={{ ['--hover-border']: PINK }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#fda4af'}
              onMouseOut={e => e.currentTarget.style.borderColor = ''}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: '#fce7ec', color: PINK }}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-slate-800 leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Explore Ebbli ─────────────────────────────────────────────

function ExploreEbbli() {
  const ecosystem = getEcosystemList()
  return (
    <section id="explore" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-white" style={{ background: PINK }}>The ecosystem</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Explore <span style={{ color: PINK }}>Ebbli</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Ten platforms, one account, one AI. Start anywhere. Grow everywhere.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ecosystem.map(p => {
            const isLive = p.status === 'live'
            return (
              <a key={p.slug} href={p.href}
                className="group flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-150"
                onMouseOver={e => e.currentTarget.style.borderColor = '#fda4af'}
                onMouseOut={e => e.currentTarget.style.borderColor = ''}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-sm"
                  style={{ background: `${p.primary}14` }}>
                  {p.emoji}
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1 leading-tight">
                  {p.name.replace('Ebbli ', '')}
                </p>
                <p className="text-xs text-slate-400 leading-snug mb-3 line-clamp-2">
                  {(p.tagline.split(' — ')[1] ?? p.tagline)}
                </p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full mt-auto"
                  style={isLive
                    ? { background: '#fce7ec', color: PINK }
                    : { background: '#f1f5f9', color: '#64748b' }}>
                  {isLive ? '● Open now' : 'Coming Soon'}
                </span>
              </a>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          More platforms coming — built to scale to 40+ products, all sharing one AI.
        </p>
      </div>
    </section>
  )
}

// ── Mission ────────────────────────────────────────────────────

function Mission() {
  return (
    <section id="mission" className="py-20 sm:py-28 text-white" style={{ background: PINK }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight tracking-tight">
          Building Opportunity<br />Across Africa
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-4 leading-relaxed">
          Ebbli exists to help every African learn new skills, build businesses, access opportunities,
          solve problems, and improve their lives with AI.
        </p>
        <p className="opacity-80 italic mb-10">
          Because opportunity should never depend on where someone was born.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Btn href="https://connect.ebbli.co" variant="white" size="xl" className="w-full sm:w-auto">
            Try Ebbli Connect <ArrowRight className="w-5 h-5" />
          </Btn>
          <Btn href="#explore" variant="ghost-white" size="xl" className="w-full sm:w-auto">
            Explore the ecosystem
          </Btn>
        </div>
        <p className="mt-6 opacity-70 text-sm">Free · Private · Built for Africa</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base text-white" style={{ background: PINK }}>🌍</div>
              <span className="font-bold text-white text-lg">Ebbli</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Africa's AI for Opportunity. Helping every African learn, build, connect, earn, and thrive.
            </p>
            <p className="text-xs mt-4 text-slate-500">© {new Date().getFullYear()} Ebbli. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Products</h4>
            <ul className="space-y-2.5">
              {ecosystem.slice(0, 5).map(p => (
                <li key={p.slug}><a href={p.href} className="text-sm hover:text-white transition-colors">{p.name}</a></li>
              ))}
              <li><a href="#explore" className="text-sm hover:text-rose-300 transition-colors" style={{ color: PINK }}>View all →</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {['Mission','Blog','Careers','Foundation','Contact'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {['Privacy Policy','Terms of Service','API','Developers'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Made with ❤️ for Africa</p>
          <div className="flex items-center gap-1.5">
            {['ke','ng','gh','ug','tz','rw','za','et'].map(cc => (
              <img key={cc} src={`https://flagcdn.com/w20/${cc}.png`} alt={cc.toUpperCase()}
                width={20} height={14} className="rounded-sm object-cover opacity-60 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────

export default function EbbliHomepage() {
  const [prompt, setPrompt] = useState('')

  function selectOutcome(text) {
    setPrompt(text)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      document.querySelector('textarea')?.focus()
    }, 600)
  }

  return (
    <>
      <Nav />
      <main>
        <Hero prompt={prompt} setPrompt={setPrompt} />
        <Outcomes onSelect={selectOutcome} />
        <ExploreEbbli />
        <Mission />
      </main>
      <Footer />
    </>
  )
}
