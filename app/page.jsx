'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Zap, CheckCircle2, Star,
  Mic, Upload, ImageIcon, Camera, Send, Menu, X,
  Brain, Rocket, Briefcase, DollarSign,
  Users, Sprout, Globe, Heart, Shield,
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
          <Link href="/" className="font-bold text-xl tracking-tight" style={{ color: PINK }}>Ebbli</Link>
          <div className="hidden md:flex items-center gap-8">
            {[['Products','#explore'],['Mission','#mission']].map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Btn href="https://connect.ebbli.co" variant="ghost" size="sm">Sign in</Btn>
            <Btn href="#explore" size="sm">Explore the ecosystem</Btn>
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1">
            {[['Products','#explore'],['Mission','#mission']].map(([l, h]) => (
              <a key={l} href={h} className="block text-sm font-medium text-slate-700 px-2 py-3 rounded-lg hover:bg-slate-50" onClick={() => setOpen(false)}>{l}</a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Btn href="https://connect.ebbli.co" variant="outline" size="sm" className="w-full justify-center">Sign in</Btn>
              <Btn href="#explore" size="sm" className="w-full justify-center">Explore the ecosystem</Btn>
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5">
            Learn AI, Find Work,<br />
            <span style={{ color: PINK }}>Build a Business & More.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Africa's AI platform for opportunity. Learn new skills, find a job, grow your business, find a partner, improve your farm, and more — all in one place. Free to start.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {['ke','ng','gh','ug','tz'].map(cc => (
                  <img key={cc} src={`https://flagcdn.com/w40/${cc}.png`} alt={cc.toUpperCase()}
                    width={24} height={16} className="rounded-sm object-cover border border-slate-100" />
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
          <Btn href="#explore" variant="white" size="xl" className="w-full sm:w-auto">
            Explore the ecosystem <ArrowRight className="w-5 h-5" />
          </Btn>
        </div>
        <p className="mt-6 opacity-70 text-sm">Free · Private · Built for Africa</p>
      </div>
    </section>
  )
}

// ── Made for Africa ───────────────────────────────────────────

const AFRICA_FLAGS = [
  { cc:'ke', name:'Kenya' },
  { cc:'ng', name:'Nigeria' },
  { cc:'gh', name:'Ghana' },
  { cc:'ug', name:'Uganda' },
  { cc:'tz', name:'Tanzania' },
  { cc:'za', name:'South Africa' },
  { cc:'rw', name:'Rwanda' },
  { cc:'et', name:'Ethiopia' },
  { cc:'sn', name:'Senegal' },
  { cc:'ci', name:'Ivory Coast' },
  { cc:'cm', name:'Cameroon' },
  { cc:'zw', name:'Zimbabwe' },
  { cc:'zm', name:'Zambia' },
  { cc:null, name:'Diaspora' },
]

function MadeForAfrica() {
  return (
    <section className="py-12 bg-white border-t border-slate-100 text-center">
      <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 mb-5">Made for Africa</p>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 max-w-2xl mx-auto mb-5">
        {AFRICA_FLAGS.map(({ cc, name }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            {cc
              ? <img src={`https://flagcdn.com/w40/${cc}.png`} alt={name} width={40} height={27} className="rounded object-cover" />
              : <span className="text-3xl leading-none">🌍</span>
            }
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide">{name}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 italic">"I am because we are." · ebbli.co</p>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────

function Footer() {
  const ecosystem = getEcosystemList()
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <span className="font-bold text-xl tracking-tight mb-4 block" style={{ color: PINK }}>Ebbli</span>
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              Africa's AI for Opportunity. Helping every African learn, build, connect, earn, and thrive.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Products</h4>
            <ul className="space-y-2.5">
              {ecosystem.slice(0, 5).map(p => (
                <li key={p.slug}><a href={p.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{p.name}</a></li>
              ))}
              <li><a href="#explore" className="text-sm font-semibold transition-colors" style={{ color: PINK }}>View all →</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {[['Mission','#mission'],['Blog','#'],['Careers','#'],['Contact','mailto:hey@ebbli.co']].map(([l, h]) => (
                <li key={l}><a href={h} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {[['Privacy Policy','#'],['Terms of Service','#']].map(([l, h]) => (
                <li key={l}><a href={h} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Ebbli Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────

export default function EbbliHomepage() {
  const [prompt, setPrompt] = useState('')

  return (
    <>
      <Nav />
      <main>
        <Hero prompt={prompt} setPrompt={setPrompt} />
        <ExploreEbbli />
        <Mission />
        <MadeForAfrica />
      </main>
      <Footer />
    </>
  )
}
