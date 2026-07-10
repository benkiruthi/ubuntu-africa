'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Menu, X,
  Brain, Rocket, Briefcase, DollarSign,
  Users, Sprout, Globe, Heart, Shield,
  Home, Hammer,
} from 'lucide-react'
import { getEcosystemList } from '../lib/theme'

const PINK = '#f04e6b'

// ── Shared ─────────────────────────────────────────────────────

function Btn({ children, variant = 'primary', size = 'md', className = '', href, onClick }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  let style = {}
  let cls = `${base} ${sizes[size]} ${className}`

  if (variant === 'primary')      { style = { background: PINK, color: '#fff' }; cls += ' shadow-lg hover:-translate-y-0.5' }
  else if (variant === 'outline') { style = { border: `2px solid ${PINK}`, color: PINK }; cls += ' hover:bg-rose-50' }
  else if (variant === 'ghost')   { cls += ' text-slate-600 hover:text-slate-900 hover:bg-slate-100' }
  else if (variant === 'dark')    { cls += ' bg-slate-900 text-white hover:bg-slate-700' }
  else if (variant === 'ghost-white') { cls += ' text-white hover:bg-white/10' }
  else if (variant === 'white')   { cls += ' bg-white shadow-lg'; style = { color: PINK } }

  if (href) return <Link href={href} className={cls} style={style}>{children}</Link>
  return <button className={cls} style={style} onClick={onClick}>{children}</button>
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
          <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(o => !o)}>
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

// ── Hero ───────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 bg-white text-center">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" style={{ background: '#fce7ec' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 -translate-x-1/4" style={{ background: '#fce7ec' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider text-white" style={{ background: PINK }}>
          Now live across Africa
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
          Learn AI, Find Work,<br />
          <span style={{ color: PINK }}>Build a Business & More.</span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Africa's AI platform for opportunity. Learn new skills, find a job, grow your business, find a partner, improve your farm — all in one place. Free to start.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Btn href="https://learn.ebbli.co" size="lg">
            Start for free <ArrowRight className="w-5 h-5" />
          </Btn>
          <Btn href="#explore" variant="dark" size="lg">
            Explore the ecosystem
          </Btn>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
          {[
            '✓ Free to start',
            '✓ 13 countries',
            '✓ AI-powered',
            '✓ No credit card',
          ].map(t => (
            <span key={t} className="font-medium">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Stats Marquee ──────────────────────────────────────────────

const STATS = [
  '12,000+ learners',
  '13 countries',
  'Free forever',
  'AI-powered',
  'Made for Africa',
  'Real certificates',
  'Find a partner',
  'Grow your business',
  '10 platforms',
  'One account',
]

function StatsMarquee() {
  return (
    <div className="border-y border-slate-100 bg-slate-50 py-4 overflow-hidden">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {[...STATS, ...STATS].map((s, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: PINK }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Explore Ebbli ─────────────────────────────────────────────

function ExploreEbbli() {
  const ecosystem = getEcosystemList()
  return (
    <section id="explore" className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.18em] uppercase mb-4" style={{ color: PINK }}>The ecosystem</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Ten platforms. One account.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Start anywhere. Every platform shares your Ebbli account and one AI.
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

// ── Testimonials ───────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "I started with Ebbli Learn, got my AI certificate in 6 weeks, and landed a remote job. I never thought that was possible from Kisumu.",
    name: "Brian O.",
    role: "Freelancer · Kisumu, Kenya",
    initials: "BO",
  },
  {
    quote: "Ebbli Connect introduced me to someone I would never have met on my own. Zuri's note was so personal — I knew this was different from day one.",
    name: "Amina W.",
    role: "Member · Nairobi, Kenya",
    initials: "AW",
  },
  {
    quote: "I used the business platform to build my entire marketing plan with AI. My sales doubled in two months. This is built for people like us.",
    name: "Chidi E.",
    role: "Small Business Owner · Lagos, Nigeria",
    initials: "CE",
  },
]

function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.18em] uppercase mb-4" style={{ color: PINK }}>Trusted across Africa</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Real people. Real results.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, role, initials }) => (
            <div key={name} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col">
              <p className="text-slate-600 leading-relaxed mb-6 flex-1">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: PINK }}>
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{name}</p>
                  <p className="text-xs text-slate-400">{role}</p>
                </div>
              </div>
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
    <section id="mission" className="py-24 sm:py-32 text-white" style={{ background: PINK }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
          Building Opportunity<br />Across Africa
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-4 leading-relaxed">
          Ebbli exists to help every African learn new skills, build businesses, access opportunities,
          solve problems, and improve their lives with AI.
        </p>
        <p className="opacity-75 italic mb-12">
          Because opportunity should never depend on where someone was born.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Btn href="#explore" variant="white" size="lg" className="w-full sm:w-auto">
            Explore the ecosystem <ArrowRight className="w-5 h-5" />
          </Btn>
          <Btn href="https://learn.ebbli.co" variant="ghost-white" size="lg" className="w-full sm:w-auto">
            Start learning for free
          </Btn>
        </div>
        <p className="mt-8 opacity-60 text-sm">Free · Private · Built for Africa</p>
      </div>
    </section>
  )
}

// ── Get Started CTA ────────────────────────────────────────────

function GetStarted() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Get started today.
        </h2>
        <p className="text-lg text-slate-500 mb-10">
          Free forever. No credit card required. Join thousands of Africans already building their future with Ebbli.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Btn href="https://learn.ebbli.co" size="lg">
            Start for free <ArrowRight className="w-5 h-5" />
          </Btn>
          <Btn href="#explore" variant="outline" size="lg">
            Explore platforms
          </Btn>
        </div>
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
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsMarquee />
        <ExploreEbbli />
        <Testimonials />
        <Mission />
        <GetStarted />
        <MadeForAfrica />
      </main>
      <Footer />
    </>
  )
}
