import "@/styles/ubuntu-theme.css";
import { BRAND, THEMES, ENGINES, getEcosystemList } from "@/lib/theme";
import HeroPrompt from "./components/HeroPrompt";

const POPULAR_ACTIONS = [
  { emoji: "🚀", label: "Start a Business" },
  { emoji: "🤖", label: "Learn AI" },
  { emoji: "💰", label: "Find Funding" },
  { emoji: "💼", label: "Find a Job" },
  { emoji: "🛒", label: "Sell Online" },
  { emoji: "🌐", label: "Build a Website" },
  { emoji: "🤝", label: "Find a Mentor" },
  { emoji: "📚", label: "Learn New Skills" },
];

const JOURNEY_STEPS = [
  "Learn AI",
  "Start a business",
  "Build a website",
  "Find customers",
  "Access funding",
  "Hire employees",
  "Grow across Africa",
  "Create jobs",
  "Transform communities",
];

export default function UbuntuAfricaHomepage() {
  const ecosystem = getEcosystemList();

  return (
    <main className="ux-page ux-home" data-ubuntu-theme="home">

      {/* ── NAV ── */}
      <header className="ux-nav">
        <a href="/" className="home-logo" aria-label="Ubuntu Africa home">
          <span className="home-logo-mark">🌍</span>
          <span className="home-logo-text">Ubuntu Africa</span>
        </a>
        <nav className="ux-nav-right" aria-label="Main navigation">
          <a className="ux-nav-link" href="#ecosystem">Products</a>
          <a className="ux-nav-link" href="#how-it-works">How it works</a>
          <a className="ux-nav-link" href="#mission">Mission</a>
          <a className="ux-nav-cta" href="https://connect.ubuntu-africa.com">
            Try Ubuntu Connect →
          </a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="home-hero">
        <span className="home-hero-badge">🌍 Africa&rsquo;s AI Operating System</span>

        <p className="home-hero-tagline">Better Together</p>

        <h1 className="home-hero-headline">
          Africa&rsquo;s Operating System<br />
          <em>for Opportunity</em>
        </h1>

        <p className="home-hero-sub">
          Learn.&nbsp;&nbsp;Build.&nbsp;&nbsp;Connect.&nbsp;&nbsp;Earn.&nbsp;&nbsp;Grow.
          <br />
          <span className="home-hero-sub-powered">Powered by AI.</span>
        </p>

        <HeroPrompt />

        <p className="home-hero-trust">
          One Ubuntu AI &middot; Ten platforms &middot; Free to start &middot; Built for Africa
        </p>
      </section>

      {/* ── POPULAR ACTIONS ── */}
      <section className="home-actions" aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="home-section-label">Popular actions</h2>
        <ul className="home-actions-grid" role="list">
          {POPULAR_ACTIONS.map(({ emoji, label }) => (
            <li key={label}>
              <button className="home-action-card" type="button">
                <span className="home-action-emoji" aria-hidden="true">{emoji}</span>
                <span className="home-action-label">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="home-ecosystem" aria-labelledby="ecosystem-heading">
        <span className="ux-section-eyebrow">The Ubuntu Ecosystem</span>
        <h2 id="ecosystem-heading" className="home-ecosystem-headline">
          Ten platforms. <em>One person, growing.</em>
        </h2>
        <p className="home-ecosystem-dek">
          Every platform shares one account, one AI, and one mission. Start anywhere. Grow everywhere.
        </p>
        <ul className="home-eco-grid" role="list">
          {ecosystem.map((p) => {
            const engine = ENGINES[p.slug];
            return (
              <li key={p.slug} className="home-eco-card" style={{ "--card-accent": p.primary }}>
                <a href={p.href} className="home-eco-card-inner">
                  <div className="home-eco-card-top">
                    <span className="home-eco-emoji" aria-hidden="true">{p.emoji}</span>
                    <span className={`home-eco-status ${p.status === "live" ? "is-live" : ""}`}>
                      {p.status === "live" ? "● Live" : "Waitlist"}
                    </span>
                  </div>
                  <strong className="home-eco-name">{p.name}</strong>
                  <span className="home-eco-tagline">{p.tagline}</span>
                  {engine && (
                    <span className="home-eco-engine">⚙ {engine.name}</span>
                  )}
                  <span className="home-eco-open">
                    {p.status === "live" ? "Open →" : "Join waitlist →"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="home-ecosystem-footer">
          <p className="home-ecosystem-more">
            More products coming. The ecosystem is built to grow to 40+ platforms — all sharing one AI.
          </p>
        </div>
      </section>

      {/* ── ONE AI ── */}
      <section id="how-it-works" className="home-one-ai" aria-labelledby="one-ai-heading">
        <span className="ux-section-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>One ecosystem</span>
        <h2 id="one-ai-heading" className="home-one-ai-headline">
          One Account.<br />
          One AI.<br />
          One Ecosystem.<br />
          One Mission.
        </h2>
        <p className="home-one-ai-dek">
          Everything you learn, build, and achieve stays connected. Ubuntu AI becomes your lifelong AI companion — remembering your goals, tracking your progress, and proactively guiding you toward opportunities across every platform.
        </p>
        <div className="home-one-ai-pillars" role="list">
          {[
            { icon: "🧠", title: "One Account", body: "Sign up once. Access every Ubuntu platform with the same account." },
            { icon: "🤖", title: "One AI", body: "Your AI companion learns your goals and guides you across every platform." },
            { icon: "🌐", title: "One Ecosystem", body: "Ten platforms today. Dozens more coming. All connected." },
            { icon: "🎯", title: "One Mission", body: "Help every African learn, build, connect, earn, and thrive." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="home-one-ai-pillar" role="listitem">
              <span className="home-one-ai-icon" aria-hidden="true">{icon}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className="home-mission" aria-labelledby="mission-heading">
        <span className="ux-section-eyebrow">Our mission</span>
        <h2 id="mission-heading" className="home-mission-headline">
          Building Africa&rsquo;s Future<br /><em>Together</em>
        </h2>
        <p className="home-mission-body">
          Ubuntu exists to help every African learn, build businesses, access opportunities, solve problems, and improve their lives using AI.
        </p>
        <p className="home-mission-body">
          Opportunity should never depend on where someone was born.
        </p>
        <blockquote className="home-mission-quote">
          &ldquo;I am because we are.&rdquo;
          <cite>— Ubuntu philosophy</cite>
        </blockquote>
      </section>

      {/* ── JOURNEY ── */}
      <section className="home-journey" aria-labelledby="journey-heading">
        <span className="ux-section-eyebrow">The Ubuntu journey</span>
        <h2 id="journey-heading" className="home-journey-headline">
          Everything happens inside Ubuntu.
        </h2>
        <ol className="home-journey-steps" aria-label="User journey steps">
          {JOURNEY_STEPS.map((step, i) => (
            <li key={step} className="home-journey-step">
              <span className="home-journey-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="home-journey-text">{step}</span>
              {i < JOURNEY_STEPS.length - 1 && (
                <span className="home-journey-arrow" aria-hidden="true">↓</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="home-cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Start with what&rsquo;s live today.</h2>
        <p>Ubuntu Connect is open now. The rest of the ecosystem is coming.</p>
        <a href="https://connect.ubuntu-africa.com" className="ux-btn-primary home-cta-btn">
          Try Ubuntu Connect →
        </a>
        <p className="ux-trust-line">Free &middot; Private &middot; Built for Africa</p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer" role="contentinfo">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <span className="home-logo-text">🌍 Ubuntu Africa</span>
            <p>Africa&rsquo;s Operating System for Opportunity.</p>
            <p className="home-footer-copy">&copy; {new Date().getFullYear()} Ubuntu Africa. All rights reserved.</p>
          </div>
          <nav className="home-footer-links" aria-label="Footer navigation">
            <div className="home-footer-col">
              <strong>Products</strong>
              {ecosystem.slice(0, 5).map((p) => (
                <a key={p.slug} href={p.href}>{p.name}</a>
              ))}
              <a href="#ecosystem">View all →</a>
            </div>
            <div className="home-footer-col">
              <strong>Company</strong>
              <a href="#mission">Mission</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Foundation</a>
              <a href="#">Contact</a>
            </div>
            <div className="home-footer-col">
              <strong>Developers</strong>
              <a href="#">API</a>
              <a href="#">Partners</a>
              <a href="#">Developers</a>
            </div>
            <div className="home-footer-col">
              <strong>Legal</strong>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </nav>
        </div>
      </footer>

    </main>
  );
}
