"use client";

import { useState } from "react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) setStatus("success");
      else { setError(data.error || "Something went wrong."); setStatus("idle"); }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      padding: "2rem",
    }}>
      <div style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "3rem 2rem",
        maxWidth: "460px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🫙</div>

        {status === "loading" && (
          <>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>Processing...</h1>
            <p style={{ color: "#777", marginTop: "0.5rem" }}>Just a second!</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>You're unsubscribed.</h1>
            <p style={{ color: "#777", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Sorry to see you go. You won't receive any more emails from us.
            </p>
            <a href="/" style={{
              display: "inline-block",
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#4A90D9",
              textDecoration: "none",
            }}>← Back to home</a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#c0392b" }}>Something went wrong</h1>
            <p style={{ color: "#777", marginTop: "0.5rem", lineHeight: 1.6 }}>Please try again or contact us.</p>
            <a href="/" style={{
              display: "inline-block",
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#4A90D9",
              textDecoration: "none",
            }}>← Back to home</a>
          </>
        )}

        {status === "idle" && (
          <>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>
              Unsubscribe from SysJosh Weekly
            </h1>
            <p style={{ color: "#777", marginTop: "0.5rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Enter your email and we'll remove you from the list.
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontFamily: "Inter, sans-serif",
                outline: "none",
                marginBottom: "0.5rem",
              }}
            />
            {error && <p style={{ fontSize: "0.78rem", color: "#c0392b", marginBottom: "0.5rem" }}>{error}</p>}
            <button
              onClick={handleUnsubscribe}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.875rem 2rem",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}>
              Unsubscribe
            </button>
            <a href="/" style={{
              display: "inline-block",
              marginTop: "1rem",
              fontSize: "0.85rem",
              color: "#4A90D9",
              textDecoration: "none",
            }}>← Keep my subscription</a>
          </>
        )}
      </div>
    </div>
  );
}