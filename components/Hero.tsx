"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

// ============================================================
// PARTICLE SYSTEM
// ============================================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animId: number;
    const mouse = { x: width / 2, y: height / 2 };

    const COUNT = Math.min(Math.floor((width * height) / 9000), 100);
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const ACCENT = "34, 211, 238";

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.strokeStyle = `rgba(${ACCENT},${0.15 * (1 - dist / 150)})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(${ACCENT},${0.07 * (1 - d / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        // Slight mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += dx * 0.00006;
          p.vy += dy * 0.00006;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Dampen
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT},${p.alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================================
// TYPEWRITER
// ============================================================
const PHRASES = [
  "Software Engineer.",
  "Creative Developer.",
  "Open Source Builder.",
  "Problem Solver.",
  "Mobile App Creator.",
];

function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span>
      <span
        style={{
          background: "var(--grad-accent)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayed}
      </span>
      <span
        style={{
          display: "inline-block",
          width: "2px",
          background: "var(--accent)",
          marginLeft: "2px",
          animation: "typewriter-cursor 1s step-start infinite",
          verticalAlign: "text-bottom",
          height: "1em",
        }}
      />
    </span>
  );
}

// ============================================================
// HERO
// ============================================================
export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "var(--nav-h)",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg-base)",
        }}
      />
      {/* Grid dots */}
      <div
        className="bg-grid-dots"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
        }}
      />
      {/* Radial glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Particle canvas — pointer events re-enabled here */}
      <div
        style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
      >
        <ParticleCanvas />
      </div>

      {/* Content */}
      <div
        className="container-page"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div style={{ maxWidth: 760 }}>
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              background: "var(--accent-dim)",
              border: "1px solid var(--border-dim)",
              borderRadius: 9999,
              marginBottom: "1.75rem",
              animation: "fade-in-up 0.6s ease forwards",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
                animation: "pulse-glow 2s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Available for new opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              marginBottom: "0.5rem",
              opacity: 0,
              animation: "fade-in-up 0.7s ease 0.1s forwards",
            }}
          >
            Hi, I&apos;m{" "}
            <span
              style={{
                background: "var(--grad-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nickolas
            </span>
          </h1>

          {/* Typewriter line */}
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              minHeight: "1.3em",
              opacity: 0,
              animation: "fade-in-up 0.7s ease 0.2s forwards",
            }}
          >
            <Typewriter />
          </h2>

          {/* Bio */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginBottom: "2.5rem",
              opacity: 0,
              animation: "fade-in-up 0.7s ease 0.35s forwards",
            }}
          >
            I build fast, beautiful, and scalable applications — from web platforms
            to mobile apps. Passionate about clean architecture, great UX, and
            open-source software.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              opacity: 0,
              animation: "fade-in-up 0.7s ease 0.5s forwards",
            }}
          >
            <Link href="/projects" id="hero-cta-projects" className="btn-primary">
              View My Work <ArrowRight size={18} />
            </Link>
            <Link href="/blog" id="hero-cta-blog" className="btn-ghost">
              Read the Blog <ArrowRight size={16} />
            </Link>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0,
              animation: "fade-in 1s ease 1.2s forwards",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              scroll
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background:
                  "linear-gradient(to bottom, var(--accent), transparent)",
                animation: "scan-line 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
