import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { notFound } from "next/navigation";

const PROJECTS: Record<
  string,
  {
    title: string;
    slug: string;
    description: string;
    body: string;
    techTags: string[];
    githubUrl: string;
    demoUrl: string;
    status: string;
    coverGradient: string;
  }
> = {
  "aura-fitness": {
    title: "Aura Fitness",
    slug: "aura-fitness",
    description:
      "A local-first strength training application for iOS and Android. Built with Flutter and SQLite for data sovereignty, syncing via iCloud and Google Drive using CRDTs for conflict resolution.",
    body: `
      <h2>Overview</h2>
      <p>Aura Fitness is a premium, distraction-free strength training app that stores all data locally on the device — no subscriptions, no cloud lock-in. Data syncs between devices via iCloud (iOS) and Google Drive (Android) using CRDTs to handle conflict resolution gracefully.</p>
      <h2>Key Features</h2>
      <ul>
        <li>One-time purchase model — own your data forever</li>
        <li>Local-first SQLite storage with CRDT sync</li>
        <li>Workout logging with progressive overload tracking</li>
        <li>Zen-mode UI — minimal, fast, no distractions</li>
        <li>iCloud + Google Drive sync without a custom backend</li>
      </ul>
      <h2>Tech Stack</h2>
      <p>Flutter · Dart · SQLite · iCloud Drive · Google Drive API · CRDT</p>
    `,
    techTags: ["Flutter", "Dart", "SQLite", "CRDT", "iOS", "Android"],
    githubUrl: "https://github.com/nickolaskg",
    demoUrl: "",
    status: "In Development",
    coverGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  },
  "youtube-to-anki-ai": {
    title: "YouTube → Anki AI Tool",
    slug: "youtube-to-anki-ai",
    description:
      "A Python CLI tool that converts YouTube videos and playlists into study notes and Anki flashcards using AI. Automatically downloads transcripts, extracts key concepts, and inserts cards via AnkiConnect.",
    body: `
      <h2>Overview</h2>
      <p>A command-line tool that takes a YouTube URL (single video or playlist) and generates both structured markdown study notes and Anki flashcards — all powered by LLMs.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Supports individual videos and entire playlists</li>
        <li>Auto-downloads transcripts (no API key needed for public videos)</li>
        <li>Generates basic and cloze-deletion flashcards</li>
        <li>Inserts cards directly into local Anki via AnkiConnect</li>
        <li>Exports markdown notes with timestamps</li>
      </ul>
      <h2>Tech Stack</h2>
      <p>Python · OpenAI API · youtube-transcript-api · AnkiConnect · Typer CLI</p>
    `,
    techTags: ["Python", "OpenAI", "AnkiConnect", "CLI"],
    githubUrl: "https://github.com/nickolaskg",
    demoUrl: "",
    status: "Shipped",
    coverGradient: "linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #065f46 100%)",
  },
  "portfolio-blog": {
    title: "This Portfolio",
    slug: "portfolio-blog",
    description:
      "The site you're currently browsing. A high-performance personal portfolio and blog built with Next.js 15, Supabase, and Three.js for stunning hero animations.",
    body: `
      <h2>Overview</h2>
      <p>This portfolio is both a showcase and a demonstration of modern full-stack web development. Built with Next.js 15 App Router, it uses server components for performance and Supabase for auth, database, and storage.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Three.js particle field hero with mouse-reactive animation</li>
        <li>Google OAuth admin panel with whitelist protection</li>
        <li>TipTap rich text blog editor</li>
        <li>GitHub, Instagram, and LinkedIn social feeds</li>
        <li>CI/CD pipeline via GitHub Actions and Vercel</li>
      </ul>
      <h2>Tech Stack</h2>
      <p>Next.js 15 · TypeScript · Supabase · Three.js · Framer Motion · Tailwind CSS · Vercel</p>
    `,
    techTags: ["Next.js", "TypeScript", "Supabase", "Three.js", "Framer Motion"],
    githubUrl: "https://github.com/nickolaskg",
    demoUrl: "",
    status: "In Development",
    coverGradient: "linear-gradient(135deg, #0f172a 0%, #0c1a2e 50%, #0e2d4a 100%)",
  },
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug];

  if (!project) notFound();

  const isShipped = project.status === "Shipped";

  return (
    <article style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: project.coverGradient,
          padding: "5rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(34,211,238,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          {/* Back link */}
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
              marginBottom: "2rem",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={16} /> All Projects
          </Link>

          {/* Status badge */}
          <span
            style={{
              display: "inline-block",
              padding: "0.2rem 0.75rem",
              borderRadius: 9999,
              fontSize: "0.72rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: isShipped ? "rgba(34,211,238,0.12)" : "rgba(139,92,246,0.12)",
              color: isShipped ? "var(--accent)" : "#a78bfa",
              border: `1px solid ${isShipped ? "rgba(34,211,238,0.25)" : "rgba(139,92,246,0.25)"}`,
              marginBottom: "1rem",
            }}
          >
            {project.status}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginBottom: "2rem",
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
            {project.techTags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          {/* CTA links */}
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-github-link-${project.slug}`}
                className="btn-primary"
                style={{ fontSize: "0.875rem", padding: "0.65rem 1.25rem", textDecoration: "none" }}
              >
                <GithubIcon size={16} /> View on GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-demo-link-${project.slug}`}
                className="btn-ghost"
                style={{ fontSize: "0.875rem", padding: "0.65rem 1.25rem", textDecoration: "none" }}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "3rem 1.5rem 6rem",
        }}
      >
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: project.body }}
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        />

        {/* Footer nav */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "color 0.15s",
            }}
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>
          <Link
            href="/blog"
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
            }}
          >
            Read the blog →
          </Link>
        </div>
      </div>
    </article>
  );
}
