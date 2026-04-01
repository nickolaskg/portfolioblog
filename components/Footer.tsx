"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const socials = [
  {
    id: "footer-github",
    label: "GitHub",
    href: "https://github.com/nickolaskg",
    icon: GithubIcon,
  },
  {
    id: "footer-instagram",
    label: "Instagram",
    href: "https://instagram.com/ahnickin",
    icon: InstagramIcon,
  },
  {
    id: "footer-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/nickolaskg",
    icon: LinkedinIcon,
  },
  {
    id: "footer-email",
    label: "Email",
    href: "mailto:nickolaskg@gmail.com",
    icon: Mail,
  },
];

const footerLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/admin", label: "Admin" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        padding: "3rem 0 2rem",
        marginTop: "auto",
      }}
    >
      <div className="container-page">
        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <Link
              href="/"
              id="footer-logo"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.125rem",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  background: "var(--grad-accent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                &lt;N/&gt;
              </span>
              <span
                style={{
                  color: "var(--text-primary)",
                  marginLeft: "0.4rem",
                  opacity: 0.85,
                }}
              >
                Nickolas
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              Software engineer crafting high-performance web experiences and
              open-source tools. Always building, always learning.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </p>
            <nav
              aria-label="Footer navigation"
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  id={`footer-nav-${l.label.toLowerCase()}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                  }
                >
                  {l.label} <ArrowUpRight size={12} />
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socials.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--accent-dim)",
                    color: "var(--text-secondary)",
                    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--accent)";
                    el.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-secondary)";
                    el.style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
            © {year} Nickolas. Built with{" "}
            <span
              style={{
                background: "var(--grad-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              Next.js + Supabase
            </span>
            . Deployed on Vercel.
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            v0.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
