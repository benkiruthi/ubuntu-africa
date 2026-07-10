"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

const INSIGHTS = [
  { label: "Relationship health", value: 76 },
  { label: "Parenting confidence", value: 68 },
  { label: "Family communication", value: 72 },
];

const JOURNEY = [
  { n: "00", title: "Meet Familia", body: "A conversation about where you are — preparing for marriage, newly married, or raising children." },
  { n: "01", title: "The Family Builder activates", body: "It creates a personalised plan for your season — engagement, marriage, newborn, toddler, teenager, or empty nest." },
  { n: "02", title: "Build the foundation", body: "Values alignment, communication tools, financial planning — the things that make families last." },
  { n: "03", title: "Parent with confidence", body: "Age-appropriate guidance for every stage, from first words to first heartbreaks." },
  { n: "04", title: "Navigate the hard seasons", body: "Conflict, grief, in-laws, distance — Familia walks with you through all of it." },
  { n: "05", title: "Build a family legacy", body: "Values, rituals, and stories that pass from one generation to the next." },
];

const AREAS = [
  { icon: "💍", color: "primary", name: "Marriage Preparation" },
  { icon: "👶", color: "gold", name: "Newborn & Early Years" },
  { icon: "🏫", color: "terracotta", name: "School-Age Parenting" },
  { icon: "🧑‍🤝‍🧑", color: "indigo", name: "Teenager Support" },
  { icon: "💬", color: "primary", name: "Family Communication" },
  { icon: "🕊️", color: "indigo", name: "Conflict Resolution" },
];

const FAQS = [
  { q: "Is this only for married people?", a: "No. Ebbli Family supports you from engagement through every stage of marriage and parenting — wherever you are in the journey." },
  { q: "What if we are struggling in our marriage?", a: "Familia is built for the hard seasons too. It offers tools and guidance for conflict, communication, and rebuilding trust — and knows when to refer you to professional help." },
  { q: "Is it free?", a: "Yes — the core platform is free. Join the waitlist and be among the first families to access it." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

export default function EbbliFamilyPage() {
  const theme = getTheme("family");
  const coach = COACHES.family;
  const engine = ENGINES.family;
  const ecosystem = getEcosystemList("family");
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
        <span className="ux-eyebrow">🏡 Marriage & Parenting</span>
        <h1>
          Strong families don&rsquo;t happen by accident. <em>Ebbli Family builds them on purpose.</em>
        </h1>
        <p className="ux-hero-dek">
          The real gap isn&rsquo;t love — it&rsquo;s the tools, wisdom, and
          community that help couples and parents navigate every season of
          family life with confidence.
        </p>
        <div className="ux-hero-actions">
          <a href="#waitlist" className="ux-btn-primary">Join the waitlist →</a>
          <a href="#engine" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">Free · Private · Built for African families</p>
      </section>

      <section className="ux-coach">
        <div className="ux-coach-card">
          <span className="ux-avatar">{coach.name.charAt(0)}</span>
          <div>
            <span className="ux-layer-tag">Layer 1 — Your AI Coach</span>
            <strong>{coach.name}, {coach.role}</strong>
            <p>
              &ldquo;A family is built every single day — in small choices,
              honest conversations, and the decision to keep showing up.
              I&rsquo;m here for every one of those days.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Family Health</strong><span>Sample profile · Private to you</span></div>
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
          {coach.name} walks with you every day. The Family Builder creates
          a living plan that adapts to your season — from engagement to
          empty nest and everything in between.
        </p>
      </section>

      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Couples circles, parenting groups, and family mentorship — so no
          marriage faces a hard season alone, and no parent carries the
          weight without support.
        </p>
      </section>

      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From first commitment <em>to lasting legacy.</em></h2>
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
        <h2>What the Family Builder covers</h2>
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
        <h2>Build the family <em>you always hoped for.</em></h2>
        <p>{coach.name} and the {engine.name} are ready for your family.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the waitlist"}</button>
        </form>
        <p className="ux-form-note" aria-live="polite">
          {status === "done" && "🎉 You're on the list — your family journey starts soon."}
          {status === "error" && "Something went wrong — please try again."}
          {(status === "idle" || status === "loading") && "Free · Private · Part of the Ebbli ecosystem"}
        </p>
      </section>
    </main>
  );
}
