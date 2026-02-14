"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStatus("success");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

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
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>Confirming...</h1>
            <p style={{ color: "#777", marginTop: "0.5rem" }}>Just a second!</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a7a4a" }}>✓ You're confirmed!</h1>
            <p style={{ color: "#777", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Welcome to SysJosh Weekly. You'll receive your first issue this Sunday at 8am EST.
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
            <p style={{ color: "#777", marginTop: "0.5rem", lineHeight: 1.6 }}>
              This confirmation link may have already been used or is invalid.
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
      </div>
    </div>
  );
}