"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

/* ---------- DATA ---------- */

const INSIGHTS = [
  { label: "Revenue trend", value: 68 },
  { label: "Customer growth", value: 74 },
  { label: "Cash flow awareness", value: 55 },
];

const JOURNEY = [
  { n: "00", title: "Meet Jenga", body: "A conversation about your business, your resources, and what you're actually building." },
  { n: "01", title: "The Business Builder activates", body: "It acts as an AI co-founder — recommending your single highest-impact action, every day." },
  { n: "02", title: "Validate before you build", body: "Test whether people actually want it, before you spend a shilling." },
  { n: "03", title: "Build your systems", body: "Sales, operations, and finance — processes that work whether or not you're in the room." },
  { n: "04", title: "Launch and grow", body: "Marketing, pricing, and customer contact, guided daily, not left to guesswork." },
  { n: "05", title: "Build a legacy", body: "Team building and mentoring others — Jenga and the Builder stay with you." },
];

const AREAS = [
  { icon: "💡", color: "gold", name: "Idea Validation" },
  { icon: "📋", color: "primary", name: "Business Planning" },
  { icon: "📣", color: "terracotta", name: "Marketing & Sales" },
  { icon: "💰", color: "gold", name: "Financial Management" },
  { icon: "⚙️", color: "indigo", name: "Operations & Systems" },
  { icon: "🤲", color: "terracotta", name: "Cooperative Groups" },
];

const FAQS = [
  { q: "How is this different from a CRM or accounting app?", a: "The Business Builder acts like an AI co-founder — recommending the one action that matters most today, not just tracking numbers after the fact." },
  { q: "I don't have a business yet — is this for me?", a: "Yes. Jenga starts with a discovery conversation to help you find an idea that fits your skills and local opportunities." },
  { q: "Is Ebbli Business really free?", a: "Yes — free to start, always. No credit card required to join the waitlist." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

/* ---------- COMPONENT ---------- */

export default function EbbliBusinessPage() {
  const theme = getTheme("business");
  const coach = COACHES.business;
  const engine = ENGINES.business;
  const ecosystem = getEcosystemList("business");

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
        <span className="ux-eyebrow">🌱 Develop the builder</span>
        <h1>
          People start businesses. <em>Ebbli Business builds business builders.</em>
        </h1>
        <p className="ux-hero-dek">
          Most businesses don&rsquo;t fail from a bad idea — they fail
          because nobody tells the founder what the single most important
          thing to do today actually is.
        </p>
        <div className="ux-hero-actions">
          <a href="#waitlist" className="ux-btn-primary">Join the waitlist →</a>
          <a href="#engine" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">Free to start · Works offline · Any phone · Sheng, Swahili, French, English</p>
      </section>

      {/* ---------- 2. AI COACH ---------- */}
      <section className="ux-coach">
        <div className="ux-coach-card">
          <span className="ux-avatar">{coach.name.charAt(0)}</span>
          <div>
            <span className="ux-layer-tag">Layer 1 — Your AI Coach</span>
            <strong>{coach.name}, {coach.role}</strong>
            <p>
              &ldquo;Profit is a result, not the whole point. I&rsquo;m here
              to help you build something that lasts.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Business Health</strong><span>Sample profile · Private to you</span></div>
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
          {coach.name} prepares you for this. The Builder looks at your revenue,
          customers, and challenges, and tells you what to actually do
          today — not a hundred options, one.
        </p>
      </section>

      {/* ---------- 4. COMMUNITY ---------- */}
      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Founder circles, mentorship, and mastermind groups — businesses
          started alone are fragile. Ebbli Business is built for growing
          together.
        </p>
      </section>

      {/* ---------- 5. THE COMPLETE JOURNEY ---------- */}
      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From first conversation <em>to lasting legacy.</em></h2>
        <ol className="ux-steps-list">
          {JOURNEY.map((s) => (
            <li className="ux-step" key={s.n}>
              <span className="ux-step-num">{s.n}</span>
              <div><h3>{s.title}</h3><p>{s.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- SUPPORTING: AREAS ---------- */}
      <section className="ux-areas">
        <h2>What the Builder covers</h2>
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
        <span className="ux-section-eyebrow">Ebbli</span>
        <h2>One Ebbli AI, one mission, seven platforms.</h2>
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
        <h2>Stop guessing what to do next. <em>Start building.</em></h2>
        <p>{coach.name} and the {engine.name} are waiting to meet you.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the waitlist"}</button>
        </form>
        <p className="ux-form-note" aria-live="polite">
          {status === "done" && "🎉 You're on the list — pole sana for waiting, we'll write soon."}
          {status === "error" && "Something went wrong — please try again."}
          {(status === "idle" || status === "loading") && "Free · Private · Part of the Ebbli ecosystem"}
        </p>
      </section>
    </main>
  );
}
