"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

const INSIGHTS = [
  { label: "Sense of belonging", value: 84 },
  { label: "Active connections", value: 71 },
  { label: "Community contribution", value: 67 },
];

const JOURNEY = [
  { n: "00", title: "Meet Umoja", body: "A short conversation about who you are, what you care about, and where you want to belong." },
  { n: "01", title: "The Circle Builder activates", body: "It finds your people — based on interests, values, location, and goals, not just who you already know." },
  { n: "02", title: "Join your first circle", body: "Small, focused groups of 8–12 people. Purpose-driven, not just a group chat." },
  { n: "03", title: "Show up and contribute", body: "Weekly check-ins, shared goals, and accountability that actually works." },
  { n: "04", title: "Grow your network", body: "Circles connect to other circles. Your community grows as you do." },
  { n: "05", title: "Build something together", body: "The strongest communities become the foundation for every other Ebbli journey." },
];

const AREAS = [
  { icon: "🌍", color: "primary", name: "Neighbourhood Groups" },
  { icon: "🎯", color: "gold", name: "Interest Circles" },
  { icon: "🤲", color: "terracotta", name: "Peer Accountability" },
  { icon: "🧑‍🏫", color: "indigo", name: "Mentorship" },
  { icon: "🎉", color: "primary", name: "Events & Meetups" },
  { icon: "💬", color: "indigo", name: "Faith Communities" },
];

const FAQS = [
  { q: "How is this different from WhatsApp groups?", a: "WhatsApp groups happen by accident. Ebbli Community circles are intentional — matched by values and goals, with structure that keeps them alive." },
  { q: "Is this only for Nairobi?", a: "No. Circles form wherever people are — physical meetups where possible, digital where not. Rural and urban, Kenya and beyond." },
  { q: "Is it free?", a: "Yes — the core platform is free. Join the waitlist and you'll be among the first to access it." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

export default function EbbliCommunityPage() {
  const theme = getTheme("community");
  const coach = COACHES.community;
  const engine = ENGINES.community;
  const ecosystem = getEcosystemList("community");
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
        <span className="ux-eyebrow">🤝 Belonging and tribe</span>
        <h1>
          You were never meant to grow alone. <em>Ebbli Community finds your people.</em>
        </h1>
        <p className="ux-hero-dek">
          Millions of Africans are surrounded by people yet feel deeply alone.
          The real problem isn&rsquo;t a lack of connection — it&rsquo;s a lack
          of the right community, built around shared purpose and values.
        </p>
        <div className="ux-hero-actions">
          <a href="#waitlist" className="ux-btn-primary">Join the waitlist →</a>
          <a href="#engine" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">Free · Local and online · Any phone · Built for Africa</p>
      </section>

      <section className="ux-coach">
        <div className="ux-coach-card">
          <span className="ux-avatar">{coach.name.charAt(0)}</span>
          <div>
            <span className="ux-layer-tag">Layer 1 — Your AI Coach</span>
            <strong>{coach.name}, {coach.role}</strong>
            <p>
              &ldquo;Ubuntu means I am because we are. My job is to help you
              find the &lsquo;we&rsquo; that makes you more fully yourself.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Community Readiness</strong><span>Sample profile · Private to you</span></div>
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
          {coach.name} prepares you. The Circle Builder then finds your people —
          matching values, geography, life stage, and goals to form circles
          that actually stick.
        </p>
      </section>

      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Ebbli Community is itself a community platform — the circles you
          join are the product. Growth, accountability, and belonging, built in.
        </p>
      </section>

      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From isolated <em>to deeply rooted.</em></h2>
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
        <h2>What the Circle Builder covers</h2>
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
        <h2>Stop scrolling alone. <em>Start belonging.</em></h2>
        <p>{coach.name} and the {engine.name} are ready to find your people.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the waitlist"}</button>
        </form>
        <p className="ux-form-note" aria-live="polite">
          {status === "done" && "🎉 You're on the list — your people are coming."}
          {status === "error" && "Something went wrong — please try again."}
          {(status === "idle" || status === "loading") && "Free · Private · Part of the Ebbli ecosystem"}
        </p>
      </section>
    </main>
  );
}
