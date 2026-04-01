"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--nav-h)",
      }}
    >
      {/* Grid bg */}
      <div
        className="bg-grid-dots"
        style={{ position: "absolute", inset: 0, opacity: 0.35 }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        id="login-card"
        className="glass-card"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 400,
          padding: "2.5rem",
          margin: "1.5rem",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2rem",
              background: "var(--grad-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            &lt;N/&gt;
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--text-primary)",
              marginTop: "0.5rem",
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              marginTop: "0.4rem",
            }}
          >
            Sign in with your email and password to manage the site.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              fontSize: "0.875rem",
              color: "#f87171",
              marginBottom: "1.25rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "0.875rem 1.5rem",
              background: loading ? "var(--bg-card)" : "var(--grad-accent)",
              border: loading ? "1px solid var(--border-subtle)" : "none",
              color: loading ? "var(--text-muted)" : "#050b14",
              borderRadius: 9999,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Authenticating…" : "Sign In"}
          </button>
        </form>

        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textAlign: "center",
            marginTop: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Access restricted to authorised accounts only.
          <br />
          Unauthorised sign-in attempts are logged.
        </p>
      </div>
    </div>
  );
}
