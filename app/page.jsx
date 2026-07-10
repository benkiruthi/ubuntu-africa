'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X, Globe, Heart, Brain, Briefcase, Rocket, Sprout, DollarSign, Shield, Users, Home, Hammer, Star, CheckCircle2 } from 'lucide-react'
import { getEcosystemList } from '@/lib/theme'

// ── Shared ─────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', className = '', href, onClick }) {
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus:outline-none'
  const variants = {
    primary:      'bg-green-700 hover:bg-green-800 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl',
    outline:      'border-2 border-slate-300 text-slate-700 hover:border-green-600 hover:text-green-700',
    ghost:        'text-slate-600 hover:text-slate-900',
    white:        'bg-white text-green-800 hover:bg-green-50 shadow-lg',
    'ghost-white':'text-white/80 hover:text-white hover:bg-white/10',
  }
  const sizes = { sm:'px-5 py-2 text-sm', md:'px-7 py-3 text-base', lg:'px-8 py-4 text-lg', xl:'px-10 py-5 text-xl' }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} onClick={onClick}>{children}</button>
}

const ECO_ICONS = {
  connect: Heart, learn: Brain, jobs: Briefcase, business: Rocket,
  farmer: Sprout, money: DollarSign, health: Shield, community: Users,
  family: Home, build: Hammer,
}

// ── Nav ────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-sm">🌍</div>
            <span className="font-bold text-slate-900">Ebbli</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {[['Products','#explore'],['Mission','#mission'],['What\'s new','#new']].map(([l,h]) => (
              <a key={l} href={h} className="hover:text-slate-900 transition-colors">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://connect.ebbli.co" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors">Log In</a>
            <Btn href="https://connect.ebbli.co" size="sm">Start for free</Btn>
          </div>
          <button className="md:hidden p-2 text-slate-500" onClick={() => setOpen(o => !o)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1">
            {[['Products','#explore'],['Mission','#mission']].map(([l,h]) => (
              <a key={l} href={h} className="block text-sm font-medium text-slate-700 py-2.5" onClick={() => setOpen(false)}>{l}</a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Btn href="https://connect.ebbli.co" variant="outline" size="sm" className="justify-center">Log In</Btn>
              <Btn href="https://connect.ebbli.co" size="sm" className="justify-center">Start for free</Btn>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────
const PLATFORMS = [
  { label: 'Connect',   href: 'https://connect.ebbli.co' },
  { label: 'Learn',     href: 'https://learn.ebbli.co'   },
  { label: 'Jobs',      href: 'https://ebbli.co/jobs'    },
  { label: 'Business',  href: 'https://ebbli.co/business'},
  { label: 'Farmer',    href: 'https://ebbli.co/farmer'  },
  { label: 'Money',     href: 'https://ebbli.co/money'   },
  { label: 'Health',    href: 'https://ebbli.co/health'  },
  { label: 'Community', href: 'https://ebbli.co/community'},
]

function Hero() {
  const [active, setActive] = useState('Connect')

  return (
    <section className="pt-24 pb-0 bg-[#f8f8f6]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-5">
          A better way to grow<br className="hidden sm:block" /> in Africa.
        </h1>

        {/* Sub */}
        <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Learn, connect, build and earn — all through one AI account, built for Africans.
        </p>

        {/* CTA */}
        <Btn href="https://connect.ebbli.co" size="lg" className="mb-3">
          Start for free <ArrowRight className="w-5 h-5" />
        </Btn>
        <p className="text-sm text-slate-400 mb-12">Free to join. No credit card required.</p>

        {/* Platform chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PLATFORMS.map(p => (
            <button
              key={p.label}
              onClick={() => setActive(p.label)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                active === p.label
                  ? 'bg-white border-green-600 text-green-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product screenshot */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-t-2xl border border-b-0 border-slate-200 shadow-[0_-4px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <div className="flex-1 mx-3 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
              {active === 'Connect' ? 'connect.ebbli.co' : active === 'Learn' ? 'learn.ebbli.co' : `ebbli.co/${active.toLowerCase()}`}
            </div>
          </div>
          {/* Mock content */}
          <div className="p-8 sm:p-12 min-h-[320px] flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50">
            <div className="text-center max-w-lg">
              <div className="text-5xl mb-5">
                {active === 'Connect' ? '💛' : active === 'Learn' ? '🎓' : active === 'Jobs' ? '💼' : active === 'Business' ? '🌱' : active === 'Farmer' ? '🌾' : active === 'Money' ? '💰' : active === 'Health' ? '🩺' : '🤝'}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Ebbli {active}</h3>
              <p className="text-slate-500 mb-6 text-sm">
                {active === 'Connect' ? 'Find your person in Africa. Every profile personally reviewed.' :
                 active === 'Learn'   ? 'Learn AI free, earn income. Courses built for Africa.' :
                 active === 'Jobs'    ? 'Land your dream job in Africa. AI-matched to your skills.' :
                 active === 'Business'? 'Launch & grow your business with an AI co-founder.' :
                 active === 'Farmer'  ? 'Grow more, sell more, earn more with AI farming guidance.' :
                 active === 'Money'   ? 'Build wealth & secure your future with AI financial advice.' :
                 active === 'Health'  ? 'Live longer, feel your best with personalised health support.' :
                 'Find your tribe, never alone. Built on community.'}
              </p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                {active === 'Connect' || active === 'Learn' ? '● Live now — open to all' : '⏳ Coming Soon — join waitlist'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Stats strip ───────────────────────────────────────────────
function StatsStrip() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap justify-center divide-x divide-white/10">
          {[
            { n:'10',     label:'Platforms' },
            { n:'1',      label:'Account for all' },
            { n:'1 AI',   label:'Shared intelligence' },
            { n:'Free',   label:'To start' },
            { n:'Africa', label:'Built here, for here' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center py-5 px-8 text-center">
              <span className="text-xl font-black text-green-400">{s.n}</span>
              <span className="text-xs text-slate-400 mt-0.5">{s.label}</span>
            </div>
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
    <section id="explore" className="py-20 sm:py-28 bg-[#f8f8f6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">The ecosystem</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Explore <span className="text-green-700">Ebbli</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">Ten platforms, one account, one AI. Start anywhere. Grow everywhere.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ecosystem.map(p => {
            const isLive = p.status === 'live'
            return (
              <a key={p.slug} href={p.href}
                className="group flex flex-col items-center text-center bg-white border border-slate-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-md hover:-translate-y-1 transition-all duration-150">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
                  style={{ background: `${p.primary}18` }}>
                  {p.emoji}
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">{p.name.replace('Ebbli ', '')}</p>
                <p className="text-xs text-slate-400 leading-snug mb-3 line-clamp-2">{p.tagline}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-auto ${isLive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {isLive ? '● Open now' : 'Coming Soon'}
                </span>
              </a>
            )
          })}
        </div>
        <p className="text-center text-sm text-slate-400 mt-8">More platforms coming — built to scale to 40+ products, all sharing one AI.</p>
      </div>
    </section>
  )
}

// ── Mission ────────────────────────────────────────────────────
function Mission() {
  return (
    <section id="mission" className="py-20 sm:py-28 bg-green-700">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
          Building Opportunity<br />Across Africa
        </h2>
        <p className="text-lg text-green-100 mb-3 leading-relaxed">
          Ebbli exists to help every African learn new skills, build businesses, access opportunities, and improve their lives with AI.
        </p>
        <p className="text-green-200 italic mb-10 text-sm">Because opportunity should never depend on where someone was born.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Btn href="https://connect.ebbli.co" variant="white" size="lg">Try Ebbli Connect <ArrowRight className="w-5 h-5" /></Btn>
          <Btn href="#explore" variant="ghost-white" size="lg">Explore the ecosystem</Btn>
        </div>
        <p className="mt-6 text-green-200/70 text-sm">Free · Private · Built for Africa</p>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  const ecosystem = getEcosystemList()
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-sm">🌍</div>
              <span className="font-bold text-white">Ebbli</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">Africa's AI for Opportunity. Helping every African learn, build, connect, earn, and thrive.</p>
            <p className="text-xs mt-4 text-slate-500">© {new Date().getFullYear()} Ebbli. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Products</h4>
            <ul className="space-y-2.5">
              {ecosystem.slice(0, 5).map(p => (
                <li key={p.slug}><a href={p.href} className="text-sm hover:text-white transition-colors">{p.name}</a></li>
              ))}
              <li><a href="#explore" className="text-sm text-green-400 hover:text-green-300 transition-colors">View all →</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {['Mission','Contact'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
              <li><a href="mailto:hey@ebbli.co" className="text-sm hover:text-white transition-colors">hey@ebbli.co</a></li>
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
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <ExploreEbbli />
        <Mission />
      </main>
      <Footer />
    </>
  )
}
