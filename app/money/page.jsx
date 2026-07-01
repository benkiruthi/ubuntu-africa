"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

/* ---------- DATA ---------- */

const INSIGHTS = [
  { label: "Savings rate", value: 42 },
  { label: "Budget consistency", value: 68 },
  { label: "Investment readiness", value: 33 },
];

const JOURNEY = [
  { n: "00", title: "Meet Amana", body: "A short check-in — your income, goals, and what's already keeping you up at night." },
  { n: "01", title: "The Wealth Builder activates", body: "Small, consistent improvements, sequenced toward lasting financial security." },
  { n: "02", title: "Save consistently", body: "Habits sized to what you actually earn, not a fantasy income." },
  { n: "03", title: "Invest responsibly", body: "Confidence before capital — understand it before you risk it." },
  { n: "04", title: "Protect & give", body: "Insurance, emergency funds, and generosity, together." },
  { n: "05", title: "Build generational wealth", body: "Amana and the Builder stay with you as the goals get bigger." },
];

const AREAS = [
  { icon: "📊", color: "gold", name: "Budgeting" },
  { icon: "🐖", color: "primary", name: "Saving" },
  { icon: "📈", color: "indigo", name: "Investing" },
  { icon: "🧾", color: "terracotta", name: "Debt Management" },
  { icon: "👨‍👩‍👧", color: "gold", name: "Family Finance" },
  { icon: "🤲", color: "primary", name: "Giving" },
];

const FAQS = [
  { q: "Does Amana give investment or tax advice?", a: "Amana builds financial understanding and habits, but for personalised investment, tax, or legal decisions, consult a qualified professional." },
  { q: "I'm in debt and embarrassed about it — is this for me?", a: "Especially for you. Amana is built to help without judgment, with a realistic plan to work through it." },
  { q: "Is Ubuntu Money really free?", a: "Yes — the core platform is free, always. No credit card required to join the waitlist." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

/* ---------- COMPONENT ---------- */

export default function UbuntuMoneyPage() {
  const theme = getTheme("money");
  const coach = COACHES.money;
  const engine = ENGINES.money;
  const ecosystem = getEcosystemList("money");

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
        body: JSON.stringify({ email, product: `ubuntu-${theme.slug}` }),
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
      {/* ---------- NAV ---------- */}
      <header className="ux-nav">
        <span className="ux-logo">{theme.name}</span>
        <div className="ux-nav-right">
          <a className="ux-nav-link" href="#engine">{engine.name}</a>
          <a className="ux-nav-link" href="#journey">How it works</a>
          <a className="ux-nav-cta" href="#waitlist">Join waitlist →</a>
        </div>
      </header>

      {/* ---------- 1. PROBLEM ---------- */}
      <section className="ux-hero">
        <span className="ux-eyebrow">💰 Develop the steward</span>
        <h1>
          Most finance apps just track spending. <em>Ubuntu Money builds the habits underneath it.</em>
        </h1>
        <p className="ux-hero-dek">
          The real problem isn&rsquo;t low income — it&rsquo;s that most
          people never learn the habits that turn whatever they earn into
          lasting security.
        </p>
        <div className="ux-hero-actions">
          <a href="#waitlist" className="ux-btn-primary">Join the waitlist →</a>
          <a href="#engine" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">Free · Works offline · Any phone · Sheng, Swahili, French, English</p>
      </section>

      {/* ---------- 2. AI COACH ---------- */}
      <section className="ux-coach">
        <div className="ux-coach-card">
          <span className="ux-avatar">{coach.name.charAt(0)}</span>
          <div>
            <span className="ux-layer-tag">Layer 1 — Your AI Coach</span>
            <strong>{coach.name}, {coach.role}</strong>
            <p>
              &ldquo;Wealth isn&rsquo;t what you earn — it&rsquo;s what you
              keep, grow, and pass on.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Financial Snapshot</strong><span>Sample check-in · Private to you</span></div>
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

      {/* ---------- 3. TRANSFORMATION ENGINE ---------- */}
      <section id="engine" className="ux-engine">
        <span className="ux-layer-tag light">Layer 2 — The Defining Feature</span>
        <h2>{engine.name}.</h2>
        <p className="ux-engine-tagline">{engine.tagline}</p>
        <ul className="ux-engine-outputs">
          {engine.outputs.map((o) => (<li key={o}>{o}</li>))}
        </ul>
        <p className="ux-engine-note">
          {coach.name} prepares you for this. The Wealth Builder tracks your
          progress and recommends the next small improvement — every
          recommendation moves you closer to real resilience.
        </p>
      </section>

      {/* ---------- 4. COMMUNITY ---------- */}
      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Savings groups, investment learning circles, and family budgeting
          challenges — financial wisdom grows better together.
        </p>
      </section>

      {/* ---------- 5. THE COMPLETE JOURNEY ---------- */}
      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From first check-in <em>to generational wealth.</em></h2>
        <ol className="ux-steps-list">
          {JOURNEY.map((s) => (
            <li className="ux-step" key={s.n}>
              <span className="ux-step-num">{s.n}</span>
              <div><h3>{s.title}</h3><p>{s.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- DISCLAIMER ---------- */}
      <section className="ux-disclaimer">
        <span className="ux-disclaimer-icon" aria-hidden="true">⚠️</span>
        <p>
          <strong>Amana builds financial habits, not personalised advice.</strong>{" "}
          For investment, tax, or legal decisions, always consult a
          qualified financial or legal professional.
        </p>
      </section>

      {/* ---------- SUPPORTING: AREAS ---------- */}
      <section className="ux-areas">
        <h2>What the Wealth Builder covers</h2>
        <ul className="ux-area-grid">
          {AREAS.map((a) => (
            <li key={a.name} className={`ux-area-chip tone-${a.color}`}><span>{a.icon}</span> {a.name}</li>
          ))}
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
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

      {/* ---------- ECOSYSTEM ---------- */}
      <section className="ux-ecosystem">
        <span className="ux-section-eyebrow">Ubuntu Africa</span>
        <h2>One Ubuntu AI, one mission, seven platforms.</h2>
        <ul className="ux-ecosystem-grid">
          {ecosystem.map((p) => (
            <li key={p.slug}>
              <a className="ux-ecosystem-card" href={p.href}>
                <span className="ux-ecosystem-emoji">{p.emoji}</span>
                <div><strong>{p.name}</strong><span>{p.tagline}</span></div>
                <span className={`ux-ecosystem-status${p.status === "live" ? " is-live" : ""}`}>
                  {p.status === "live" ? "Live" : "Join waitlist"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 6. STRONG CTA ---------- */}
      <section id="waitlist" className="ux-cta">
        <div className="ux-confetti-zone">
          {confetti.map((c) => (
            <span key={c.id} className="ux-confetti-piece" style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s`, fontSize: `${c.size}px` }}>{c.emoji}</span>
          ))}
        </div>
        <h2>Stop just tracking. <em>Start building.</em></h2>
        <p>{coach.name} and the {engine.name} are waiting to meet you.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the waitlist"}</button>
        </form>
        <p className="ux-form-note" aria-live="polite">
          {status === "done" && "🎉 You're on the list — pole sana for waiting, we'll write soon."}
          {status === "error" && "Something went wrong — please try again."}
          {(status === "idle" || status === "loading") && "Free · Private · Part of the Ubuntu Africa ecosystem"}
        </p>
      </section>
    </main>
  );
}
