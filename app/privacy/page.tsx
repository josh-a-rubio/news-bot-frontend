export default function PrivacyPage() {
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
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111", margin: "1.5rem 0 0.5rem" }}>Privacy Policy</h1>
        <p style={{ fontSize: "0.8rem", color: "#999", marginBottom: "2rem" }}>Last updated: February 2026</p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>What we collect</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          We collect your email address when you subscribe to SysJosh Weekly. That's it.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>How we use it</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Your email is used solely to send you the weekly newsletter. We do not sell, share, or rent your email address to any third party.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>How we store it</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Subscriber data is stored securely in Notion. We retain your data only as long as you are subscribed.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Unsubscribing</h2>
        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Every email includes an unsubscribe link. Clicking it will immediately remove you from our list.
        </p>

        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>Contact</h2>
        <p style={{ color: "#555", lineHeight: 1.7 }}>
          Questions? Reach out at <a href="mailto:rubiojosha@gmail.com" style={{ color: "#4A90D9" }}>rubiojosha@gmail.com</a>
        </p>
      </div>
    </div>
  );
}