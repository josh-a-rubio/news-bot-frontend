export default function TermsPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "Inter, sans-serif",
      padding: "4rem 2rem",
    }}>
      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "3rem 2rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <a href="/" style={{ fontSize: "0.85rem", color: "#4A90D9", textDecoration: "none" }}>← Back</a>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111", margin: "1.5rem 0 0.5rem" }}>Terms of Service</h1>
        <p style={{ fontSize: "0.8rem", color: "#999", marginBottom: "2rem" }}>Last updated: February 2026</p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>The service</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          SysJosh Weekly is a free newsletter delivering curated tech news every Sunday at 8am EST.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Subscriptions</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          By subscribing you agree to receive weekly emails from SysJosh Weekly. You can unsubscribe at any time via the link in any email.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Content</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          All content is curated for informational purposes only. We make no guarantees about accuracy or completeness. Links to third-party sources are provided as-is.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Changes</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          We may update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Contact</h2>
        <p style={{ color: "#555", lineHeight: 1.7 }}>
          Questions? Reach out at <a href="mailto:hello@sysjosh.com" style={{ color: "#4A90D9" }}>rubiojosha@gmail.com</a>
        </p>
      </div>
    </div>
  );
}