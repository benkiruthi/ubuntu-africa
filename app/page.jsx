import "@/styles/ubuntu-theme.css";
import { BRAND, ADVISORS, THEMES, ENGINES, getEcosystemList } from "@/lib/theme";

export default function UbuntuAfricaHomepage() {
  const ecosystem = getEcosystemList();

  return (
    <main className="ux-page ux-home" data-ubuntu-theme="home">
      {/* ---------- NAV ---------- */}
      <header className="ux-nav">
        <span className="ux-logo">{BRAND.name}</span>
        <div className="ux-nav-right">
          <a className="ux-nav-link" href="#layers">How it works</a>
          <a className="ux-nav-link" href="#ecosystem">Ecosystem</a>
          <a className="ux-nav-cta" href={THEMES.connect.href}>Try Ubuntu Connect →</a>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="ux-hero ux-home-hero">
        <span className="ux-eyebrow">🌍 Using AI to Solve Africa&rsquo;s Greatest Problems</span>
        <h1>
          {BRAND.tagline.split("through AI.")[0]}
          <em>through AI.</em>
        </h1>
        <p className="ux-hero-dek">{BRAND.mission}</p>
        <div className="ux-hero-actions">
          <a href={THEMES.connect.href} className="ux-btn-primary">Try Ubuntu Connect →</a>
          <a href="#layers" className="ux-btn-secondary">See how it works</a>
        </div>
        <p className="ux-trust-line">One Ubuntu AI. Seven platforms. Free to start.</p>
      </section>

      {/* ---------- PHILOSOPHY ---------- */}
      <section className="ux-home-philosophy">
        <span className="ux-section-eyebrow">Not apps. People.</span>
        <h2>
          Ubuntu Africa doesn&rsquo;t build applications. <em>It builds people.</em>
        </h2>
        <p>
          Every platform helps someone become a better version of
          themselves. Not through features — through transformation. You
          don&rsquo;t come here for advice. You come because you want a
          better future.
        </p>
      </section>

      {/* ---------- THE THREE LAYERS ---------- */}
      <section id="layers" className="ux-home-layers">
        <span className="ux-section-eyebrow">How every platform works</span>
        <h2>Three layers, working together.</h2>
        <ul className="ux-home-layer-grid">
          <li>
            <span className="ux-home-layer-num">01</span>
            <h3>The AI Coach</h3>
            <p>Wisdom. Teaches, encourages, remembers your journey, and proactively guides you.</p>
          </li>
          <li>
            <span className="ux-home-layer-num">02</span>
            <h3>The Transformation Engine</h3>
            <p>The defining feature. Not advice — an active system that moves you toward the outcome you actually want.</p>
          </li>
          <li>
            <span className="ux-home-layer-num">03</span>
            <h3>The Community</h3>
            <p>Transformation never happens alone. Every platform grows people together, not in isolation.</p>
          </li>
        </ul>
      </section>

      {/* ---------- ECOSYSTEM SHOWCASE ---------- */}
      <section id="ecosystem" className="ux-home-ecosystem">
        <span className="ux-section-eyebrow">The ecosystem</span>
        <h2>Seven platforms. <em>One person, growing.</em></h2>
        <ul className="ux-home-grid">
          {ecosystem.map((p) => {
            const engine = ENGINES[p.slug];
            return (
              <li key={p.slug} className="ux-home-card" style={{ "--card-color": p.primary }}>
                <a href={p.href}>
                  <span className="ux-home-card-emoji">{p.emoji}</span>
                  <strong>{p.name}</strong>
                  <span className="ux-home-card-tag">{p.tagline}</span>
                  {engine && <span className="ux-home-card-engine">⚙ {engine.name}</span>}
                  <span className={`ux-ecosystem-status${p.status === "live" ? " is-live" : ""}`} style={{ color: p.status === "live" ? p.primary : undefined }}>
                    {p.status === "live" ? "● Live now" : "Join waitlist →"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- MEET THE AI FAMILY ---------- */}
      <section id="advisors" className="ux-home-advisors">
        <span className="ux-section-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Every platform has a coach</span>
        <h2>Meet the AI family.</h2>
        <p className="ux-home-advisors-dek">
          One Ubuntu AI, remembering your journey across every platform —
          with your explicit consent. Not a generic chatbot repeated seven
          times.
        </p>
        <ul className="ux-home-advisor-grid">
          {ADVISORS.map((a) => {
            const product = THEMES[a.product];
            return (
              <li key={a.name} className="ux-home-advisor-card">
                <span className="ux-home-advisor-avatar" style={{ background: product.primary }}>{a.initial}</span>
                <div>
                  <strong>{a.name}</strong>
                  <span>{a.role} · {product.name}</span>
                </div>
              </li>
            );
          })}
          <li className="ux-home-advisor-card ux-home-advisor-more">
            <span className="ux-home-advisor-avatar ux-home-advisor-avatar-more">+</span>
            <div>
              <strong>More on the way</strong>
              <span>Every new platform gets its own coach</span>
            </div>
          </li>
        </ul>
      </section>

      {/* ---------- COMMUNITY / UBUNTU PHILOSOPHY ---------- */}
      <section className="ux-community">
        <span className="ux-section-eyebrow">Ubuntu</span>
        <h2>&ldquo;I am because we are.&rdquo;</h2>
        <p>
          Transformation should never happen alone. Every platform includes
          a thriving community — mentorship, accountability, and shared
          success — because that&rsquo;s not optional, it&rsquo;s core.
        </p>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="ux-cta ux-home-cta">
        <h2>Start with what&rsquo;s live today.</h2>
        <p>Ubuntu Connect is open now. The rest of the ecosystem is coming.</p>
        <a href={THEMES.connect.href} className="ux-btn-primary">Try Ubuntu Connect →</a>
        <p className="ux-form-note">Free · Private · Built for Africa</p>
      </section>
    </main>
  );
}
