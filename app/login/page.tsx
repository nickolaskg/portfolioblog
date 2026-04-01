"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "select_account" },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
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
            Sign in with your Google account to manage the site.
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

        {/* Google button */}
        <button
          id="login-google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.5rem",
            background: loading ? "var(--accent-dim)" : "var(--grad-accent)",
            color: "#050b14",
            borderRadius: 9999,
            border: "none",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.9375rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Google SVG */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z"
              fill="#050b14"
            />
            <path
              d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
              fill="#050b14"
            />
            <path
              d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4068 3.78409 7.8299 3.96409 7.2899V4.9581H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4522 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
              fill="#050b14"
            />
            <path
              d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9254L15.0218 2.344C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9581L3.96409 7.2899C4.67182 5.1627 6.65591 3.5795 9 3.5795Z"
              fill="#050b14"
            />
          </svg>
          {loading ? "Redirecting…" : "Sign in with Google"}
        </button>

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
