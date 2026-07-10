"use client";

import { useMemo, useState } from "react";
import "@/styles/ubuntu-theme.css";
import { getTheme, getEcosystemList, COACHES, ENGINES } from "@/lib/theme";

/* ---------- DATA ---------- */

const INSIGHTS = [
  { label: "Curiosity score", value: 91 },
  { label: "Goal clarity", value: 74 },
  { label: "Learning consistency", value: 65 },
];

const JOURNEY = [
  { n: "00", title: "Meet Nia", body: "A 5-minute conversation about your goals, not a test." },
  { n: "01", title: "The Learning Path Builder activates", body: "It generates your first roadmap — missions, lessons, and projects, sequenced for you." },
  { n: "02", title: "Daily missions", body: "10–15 minutes a day. Short enough to actually finish." },
  { n: "03", title: "Practice, reflect, adapt", body: "The path changes as you do — what's easy gets skipped, what's hard gets reinforced." },
  { n: "04", title: "Join a study circle", body: "Learning alongside people, not just content." },
  { n: "05", title: "Keep growing", body: "School, career, business, parenting — Nia and the Path Builder stay with you." },
];

const AREAS = [
  { icon: "✨", color: "gold", name: "AI Skills" },
  { icon: "🧭", color: "primary", name: "Career Growth" },
  { icon: "🚀", color: "terracotta", name: "Entrepreneurship" },
  { icon: "🗣️", color: "indigo", name: "Languages" },
  { icon: "💰", color: "gold", name: "Financial Literacy" },
  { icon: "🤝", color: "indigo", name: "Leadership" },
];

const FAQS = [
  { q: "How is this different from a course platform?", a: "The Learning Path Builder actively generates and adapts your journey — missions, lessons, projects — instead of leaving you to browse a static video library." },
  { q: "Is Ebbli Learn really free?", a: "Yes — the core platform is free, always. No credit card required to join the waitlist." },
  { q: "Do I need fast internet?", a: "No — built for low data, works on any phone, with offline lessons where possible." },
];

const CONFETTI_EMOJI = ["🎉", "✨", "🎊", "⭐"];

/* ---------- COMPONENT ---------- */

export default function EbbliLearnPage() {
  const theme = getTheme("learn");
  const coach = COACHES.learn;
  const engine = ENGINES.learn;
  const ecosystem = getEcosystemList("learn");

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
        <span className="ux-eyebrow">🎓 Develop the mind</span>
        <h1>
          Schools teach subjects. <em>Ebbli Learn builds learners.</em>
        </h1>
        <p className="ux-hero-dek">
          Most people never become lifelong learners — not because they lack
          intelligence, but because nobody ever built them a path, or stayed
          to help them walk it.
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
              &ldquo;I don&rsquo;t just answer questions — I remember your
              goals, your gaps, and what you're actually trying to
              become.&rdquo;
            </p>
          </div>
        </div>
        <div className="ux-insight-card">
          <div className="ux-insight-head">
            <span className="ux-avatar small">{coach.name.charAt(0)}</span>
            <div><strong>{coach.name} · Learning Insights</strong><span>Sample profile · Private to you</span></div>
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
          {engine.outputs.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="ux-engine-note">
          {coach.name} prepares you for this. {engine.name} is what actually moves
          you — generating and continuously adapting missions, lessons, and
          projects around your real progress.
        </p>
      </section>

      {/* ---------- 4. COMMUNITY ---------- */}
      <section className="ux-community">
        <span className="ux-section-eyebrow">Layer 3 — Community</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Study circles, peer accountability, and mentorship. Transformation
          doesn&rsquo;t happen in isolation — Ebbli Learn is built around
          growing with others, not just a personal dashboard.
        </p>
      </section>

      {/* ---------- 5. THE COMPLETE JOURNEY ---------- */}
      <section id="journey" className="ux-steps">
        <span className="ux-section-eyebrow">The complete transformation journey</span>
        <h2>From first conversation <em>to lifelong learner.</em></h2>
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
        <h2>What the Path Builder covers</h2>
        <ul className="ux-area-grid">
          {AREAS.map((a) => (
            <li key={a.name} className={`ux-area-chip tone-${a.color}`}>
              <span>{a.icon}</span> {a.name}
            </li>
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
        <h2>Stop browsing lessons. <em>Start becoming a learner.</em></h2>
        <p>{coach.name} and the {engine.name} are waiting to meet you.</p>
        <form className="ux-waitlist" onSubmit={handleSubmit}>
          <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Enrolling…" : "Join the waitlist"}</button>
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
