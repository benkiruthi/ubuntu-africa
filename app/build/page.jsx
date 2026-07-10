"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

const INSIGHTS = [
  { label: "Project clarity", value: 62 },
  { label: "Budget readiness", value: 55 },
  { label: "Contractor confidence", value: 48 },
];

const JOURNEY = [
  { n: "00", title: "Meet Mjenzi", body: "Tell him what you want to build — a home, a rental, a renovation — and where you are in the process." },
  { n: "01", title: "The Blueprint activates", body: "It generates a structured plan: phases, costs, materials, and timelines tailored to your site and budget." },
  { n: "02", title: "Get your cost estimate", body: "Realistic, Kenya-specific cost breakdowns — so you know what you're actually getting into before you spend a shilling." },
  { n: "03", title: "Find and vet contractors", body: "Guidance on what to ask, what contracts to sign, and red flags to watch for." },
  { n: "04", title: "Build phase by phase", body: "Mjenzi tracks progress with you — checking in at each milestone so nothing slips through." },
  { n: "05", title: "Finish strong", body: "Snagging lists, final inspections, and handover checklists — so you move in with confidence." },
];

const AREAS = [
  { icon: "🏠", color: "primary", name: "Residential Homes" },
  { icon: "🏢", color: "gold", name: "Rental Properties" },
  { icon: "🔨", color: "terracotta", name: "Renovations" },
  { icon: "📐", color: "indigo", name: "Extensions & Add-ons" },
  { icon: "🌳", color: "primary", name: "Rural & Upcountry Builds" },
  { icon: "🔌", color: "indigo", name: "Water & Solar Systems" },
];

const FAQS = [
  { q: "Do I need an architect first?", a: "Mjenzi helps you figure that out. For some projects you need one, for others you don't — and he'll guide you on what approvals and drawings are legally required for your county." },
  { q: "Is this only for big builds?", a: "No. Whether you're adding a room, building a rental unit, or starting your first home, the Blueprint adapts to the size and complexity of your project." },
  { q: "Is it free?", a: "Yes — the core platform is free. Join the waitlist and be among the first builders to access it." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

export default function EbbliBuildPage() {
  const theme = getTheme("build");
  const coach = COACHES.build;
  const engine = ENGINES.build;
  const ecosystem = getEcosystemList("build");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [confetti, setConfetti] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  const avgInsight = useMemo(() => Math.round(INSIGHTS.reduce((a, i) => a + i.value, 0) / INSIGHTS.length), []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product: `ebbli-${theme.slug}` }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      setEmail("");
      const burst = Array.from({ length: 18 }, (_, i) => ({ id: i, emoji: CONFETTI_EMOJI[i % CONFETTI_EMOJI.length], left: Math.random() * 100, delay: Math.random() * 0.4, duration: 1.6 + Math.random() * 1.1, size: 13 + Math.random() * 12 }));
      setConfetti(burst);
      setTimeout(() => setConfetti([]), 2600);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="ux-page" data-ubuntu-theme={theme.slug}>
      <header className="ux-nav">
        <span className="ux-logo">{theme.name}</span>
        <div className="ux-nav-right">
          <a className="ux-nav-link" href="#engine">{engine.name}</a>
          <a className="ux-nav-link" href="#journey">How it works</a>
          <a className="ux-nav-cta" href="#waitlist">Join waitlist →</a>
        </div>
      </header>

      <section className="ux-hero">
        <span className="ux-eyebrow">🏗️ Building Plans</span>
        <h1>
          Every Kenyan deserves to build well. <em>Ebbli Build makes it possible.</em>
        </h1>
        <p className="ux-hero-dek">
          The real problem isn&rsquo;t ambition — it&rsquo;s that most people
          enter a building project without a clear plan, realistic costs, or
          protection from bad contractors. Ebbli Build changes that.
        </p>
        <div className="ux-hero-actions">
          <a href="#waitlist" className="ux-btn-primary">Join the waitlist →</a>
          <a href="#engine" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">Free · Kenya-specific costs · Any phone · Swahili and English</p>
      </section>

      <section className="ux-coach">
        <div className="ux-coach-card">
          <span className="ux-avatar">{coach.name.charAt(0)}</span>
          <div>
            <span className="ux-layer-tag">Layer 1 — Your AI Coach</span>
            <strong>{coach.name}, {coach.role}</strong>
            <p>
              &ldquo;Building a home is one of the biggest things you&rsquo;ll
              ever do. I&rsquo;m here to make sure you do it with your eyes
              open — from foundation to roof.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Build Readiness</strong><span>Sample profile · Private to you</span></div>
          </div>
          <div className="ux-insight-score">{avgInsight}<span>/100</span></div>
          <ul className="ux-insight-bars">
            {INSIGHTS.map((i) => (
              <li key={i.label}>
                <div className="ux-insight-label"><span>{i.label}</span><span>{i.value}%</span></div>
                <div className="ux-insight-track"><div className="ux-insight-fill" style={{ width: `${i.value}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="engine" className="ux-engine">
        <span className="ux-layer-tag light">Layer 2 — The Defining Feature</span>
        <h2>{engine.name}.</h2>
        <p className="ux-engine-tagline">{engine.tagline}</p>
        <ul className="ux-engine-outputs">
          {engine.outputs.map((o) => (<li key={o}>{o}</li>))}
        </ul>
        <p className="ux-engine-note">
          {coach.name} prepares you. The Blueprint then generates a living
          plan — phases, costs, materials, and milestones — that you
          update as the build progresses.
        </p>
      </section>

      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Builder circles, contractor reviews, and peer groups for people
          at every stage — so no one builds alone, and hard-won lessons
          get shared, not lost.
        </p>
      </section>

      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From empty plot <em>to finished home.</em></h2>
        <ol className="ux-steps-list">
          {JOURNEY.map((s) => (
            <li className="ux-step" key={s.n}>
              <span className="ux-step-num">{s.n}</span>
              <div><h3>{s.title}</h3><p>{s.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="ux-areas">
        <h2>What the Blueprint covers</h2>
        <ul className="ux-area-grid">
          {AREAS.map((a) => (
            <li key={a.name} className={`ux-area-chip tone-${a.color}`}><span>{a.icon}</span> {a.name}</li>
          ))}
        </ul>
      </section>

      <section className="ux-faq">
        <h2>Questions</h2>
        <ul className="ux-faq-list">
          {FAQS.map((f, i) => (
            <li className="ux-faq-item" key={f.q}>
              <button className="ux-faq-question" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}<span className="ux-faq-plus">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="ux-faq-answer">{f.a}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="ux-ecosystem">
        <span className="ux-section-eyebrow">Ebbli</span>
        <h2>One Ebbli AI, one mission, ten platforms.</h2>
        <ul className="ux-ecosystem-grid">
          {ecosystem.map((p) => (
            <li key={p.slug}>
              <a className="ux-ecosystem-card" href={p.href}>
                <span className="ux-ecosystem-emoji">{p.emoji}</span>
                <div><strong>{p.name}</strong><span>{p.tagline}</span></div>
                <span className={`ux-ecosystem-status${p.status === "live" ? " is-live" : ""}`}>
                  {p.status === "live" ? "Open now" : "Coming soon"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="waitlist" className="ux-cta">
        <div className="ux-confetti-zone">
          {confetti.map((c) => (
            <span key={c.id} className="ux-confetti-piece" style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s`, fontSize: `${c.size}px` }}>{c.emoji}</span>
          ))}
        </div>
        <h2>Stop guessing. <em>Start building with a plan.</em></h2>
        <p>{coach.name} and the {engine.name} are ready for your project.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the waitlist"}</button>
        </form>
        <p className="ux-form-note" aria-live="polite">
          {status === "done" && "🎉 You're on the list — your blueprint is coming."}
          {status === "error" && "Something went wrong — please try again."}
          {(status === "idle" || status === "loading") && "Free · Private · Part of the Ebbli ecosystem"}
        </p>
      </section>
    </main>
  );
}
