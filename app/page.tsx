"use client";

import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: auto; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f5f5f5;
    color: #111;
    overflow-x: hidden;
  }

  .fixed-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    background: rgba(245,245,245,0.97);
    border-bottom: 1px solid #e5e5e5;
    z-index: 100;
    backdrop-filter: blur(10px);
    transform: translateY(-100%);
    opacity: 0;
    transition:
      transform 0.45s cubic-bezier(0.4,0,0.2,1),
      opacity   0.45s cubic-bezier(0.4,0,0.2,1);
    will-change: transform, opacity;
  }

  .fixed-header.visible {
    transform: translateY(0);
    opacity: 1;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-icon { font-size: 1.35rem; line-height: 1; }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
  }

  .header-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1;
    color: #111;
  }

  .header-tagline {
    font-size: 0.7rem;
    color: #999;
    font-weight: 400;
  }

  .header-blurb {
    font-size: 0.75rem;
    color: #999;
    font-weight: 400;
    font-style: normal;
    font-family: 'Inter', sans-serif;
    max-width: 240px;
    text-align: right;
    line-height: 1.4;
  }

  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 4rem;
    background: #f5f5f5;
    transition:
      opacity   0.45s cubic-bezier(0.4,0,0.2,1),
      transform 0.45s cubic-bezier(0.4,0,0.2,1);
    will-change: transform, opacity;
  }

  .hero.hidden {
    opacity: 0;
    transform: translateY(-12px);
    pointer-events: none;
  }

  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .hero-left { display: flex; flex-direction: column; }

  .hero-main {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon { font-size: 4rem; line-height: 1; }

  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #111;
  }

  .hero-tagline {
    font-size: 1.25rem;
    color: #666;
    font-weight: 400;
  }

  .hero-categories {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .category-badge {
    padding: 0.25rem 0.75rem;
    background: rgba(74, 144, 217, 0.12);
    border-radius: 100px;
    font-size: 0.8rem;
    color: #4A90D9;
    font-weight: 500;
  }

  .hero-right { max-width: 280px; }

  .context-blurb {
    font-size: 1.9rem;
    color: #111;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-style: normal;
    font-family: 'Inter', sans-serif;
  }

  .scroll-hint {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    font-size: 1.4rem;
    color: #888;
    animation: bounce 2.5s ease-in-out infinite;
  }

  @keyframes bounce {
    0%,100% { transform: translateX(-50%) translateY(0);    opacity: 0.4; }
    50%      { transform: translateX(-50%) translateY(10px); opacity: 1;   }
  }

  .content-wrapper {
    min-height: 40vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem 1rem 10rem;
    background: #f5f5f5;
  }

  .form-section {
    max-width: 460px;
    width: 100%;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .descriptor {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .descriptor p {
    color: #111;
    font-size: 0.9rem;
    line-height: 1.7;
    font-weight: 600;
  }

  .form-categories {
    display: flex;
    gap: 0.6rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .divider {
    height: 1px;
    background: #e5e5e5;
    margin: 1.5rem 0;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background: #fff;
    font-family: 'Inter', sans-serif;
    color: #111;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input:focus {
    border-color: #4A90D9;
    box-shadow: 0 0 0 3px rgba(74,144,217,0.12);
  }

  .form-input::placeholder { color: #bbb; }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    margin-top: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    background: #4A90D9;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }

  .submit-btn:hover {
    background: #3a7fc4;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74,144,217,0.35);
  }

  .submit-btn:active { transform: translateY(0); }

  .error-msg {
    font-size: 0.78rem;
    color: #c0392b;
    margin-top: 0.4rem;
  }

  .privacy-note {
    text-align: center;
    font-size: 0.75rem;
    color: #bbb;
    margin-top: 1rem;
  }

  .success-box {
    text-align: center;
    padding: 2.5rem 0;
  }

  .success-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a7a4a;
    margin-bottom: 0.4rem;
  }

  .success-sub {
    font-size: 0.88rem;
    color: #777;
  }

  footer {
    text-align: center;
    padding: 1.75rem 2rem;
    font-size: 0.75rem;
    color: #bbb;
    border-top: 1px solid #e5e5e5;
    background: #f5f5f5;
  }

  footer a {
    color: #bbb;
    text-decoration: none;
    margin: 0 0.4rem;
    transition: color 0.2s;
  }

  footer a:hover { color: #111; }

  @media (max-width: 768px) {
    .hero { padding: 2rem; }
    .hero-inner { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
    .hero-right { max-width: 100%; }
    .context-blurb { font-size: 1.5rem; }
    .hero-title { font-size: 2rem; }
    .header-blurb { display: none; }
    .fixed-header { padding: 0 1.25rem; }
    .form-section { padding: 2rem 1.5rem; }
    .form-categories { gap: 0.4rem; }
    .category-badge { font-size: 0.7rem; padding: 0.2rem 0.6rem; }
    .descriptor p { font-size: 0.8rem; }
  }
`;

const CATEGORIES = ["General Tech", "Infrastructure", "Cloud", "AI"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 350);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <header className={`fixed-header ${scrolled ? "visible" : ""}`}>
        <div className="header-left">
          <span className="header-icon">🫙</span>
          <div className="header-text">
            <span className="header-title">SysJosh Weekly</span>
            <span className="header-tagline">Your Sunday morning tech briefing</span>
          </div>
        </div>
        <span className="header-blurb">
          Stay up to date in the fastest-changing tech environment.
        </span>
      </header>

      <div className={`hero ${scrolled ? "hidden" : ""}`}>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-main">
              <span className="icon">🫙</span>
              <div className="hero-text">
                <h1 className="hero-title">SysJosh Weekly</h1>
                <p className="hero-tagline">Your Sunday morning tech briefing</p>
              </div>
            </div>
            <div className="hero-categories">
              {CATEGORIES.map((c) => (
                <span key={c} className="category-badge">{c}</span>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <p className="context-blurb">
              Stay up to date in the fastest-changing tech environment.
            </p>
          </div>
        </div>
        <div className="scroll-hint">⌄</div>
      </div>

      <div className="content-wrapper">
        <div className="form-section">
          <div className="descriptor">
            <p>
              Handpicked from industry-leading organizations.<br />
              Delivered every Sunday at 8am EST.
            </p>
          </div>

          <div className="form-categories">
            {CATEGORIES.map((c) => (
              <span key={c} className="category-badge">{c}</span>
            ))}
          </div>

          <div className="divider" />

          {submitted ? (
            <div className="success-box">
              <p className="success-title">✓ Check your inbox!</p>
              <p className="success-sub">We sent you a confirmation email. Click the link to confirm your subscription.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                />
                {error && <p className="error-msg">{error}</p>}
              </div>
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
              <p className="privacy-note">
                No spam.{" "}
                <a href="/unsubscribe" style={{ color: "#bbb", textDecoration: "underline" }}>
                  Unsubscribe anytime.
                </a>
              </p>
            </form>
          )}
        </div>
      </div>

      <footer>
        <a href="/privacy">Privacy Policy</a> •
        <a href="/terms">Terms</a> •
        © 2026 SysJosh Weekly
      </footer>
    </>
  );
}
