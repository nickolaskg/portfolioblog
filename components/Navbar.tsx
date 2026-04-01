"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-h)",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        background: scrolled
          ? "var(--bg-overlay)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        className="container-page"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          id="navbar-logo"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
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
          <span style={{ opacity: 0.85 }}>Nickolas</span>
        </Link>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  position: "relative",
                  transition: "color 0.2s ease",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--grad-accent)",
                      borderRadius: 9999,
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggle}
            aria-label="Toggle color theme"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent)",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: "0.75rem" }}>
          <button
            id="theme-toggle-mobile"
            onClick={toggle}
            aria-label="Toggle color theme"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent)",
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle mobile menu"
            style={{
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: "absolute",
            top: "var(--nav-h)",
            left: 0,
            right: 0,
            background: "var(--bg-overlay)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            animation: "fade-in 0.2s ease",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: isActive ? "var(--accent)" : "var(--text-primary)",
                  textDecoration: "none",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
