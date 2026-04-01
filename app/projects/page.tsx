import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Tag } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of software projects I've built — web apps, mobile apps, and open-source tools.",
};

const PROJECTS = [
  {
    id: "01",
    slug: "aura-fitness",
    title: "Aura Fitness",
    description:
      "A premium, local-first strength training application for iOS and Android. Built with Flutter and SQLite, using CRDTs for offline-first conflict-free sync via iCloud and Google Drive.",
    tags: ["Flutter", "SQLite", "CRDT", "iOS", "Android"],
    github: "https://github.com/nickolaskg",
    demo: null,
    featured: true,
    status: "In Development",
  },
  {
    id: "02",
    slug: "youtube-anki-tool",
    title: "YouTube → Anki AI Tool",
    description:
      "A Python CLI application that converts YouTube videos and playlists into study notes and Anki flashcards using AI. Supports AnkiConnect for automatic card insertion.",
    tags: ["Python", "OpenAI", "AnkiConnect", "CLI"],
    github: "https://github.com/nickolaskg",
    demo: null,
    featured: false,
    status: "Shipped",
  },
  {
    id: "03",
    slug: "portfolio-blog",
    title: "This Portfolio",
    description:
      "Personal portfolio and blog with a dynamic landing page, Google OAuth-protected admin panel, TipTap rich text blog editor, GitHub/social feed integrations, and Vercel CI/CD.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "Vercel"],
    github: "https://github.com/nickolaskg",
    demo: null,
    featured: true,
    status: "In Development",
  },
];

const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags)));

const STATUS_COLORS: Record<string, string> = {
  Shipped: "#22d3ee",
  "In Development": "#8b5cf6",
  Archived: "#64748b",
};

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <article
      id={`project-${project.id}`}
      className="glass-card"
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: 0 }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1875rem",
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h2>
            {project.featured && (
              <span
                style={{
                  padding: "0.15rem 0.55rem",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-dim)",
                  borderRadius: 9999,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                Featured
              </span>
            )}
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: STATUS_COLORS[project.status] ?? "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: STATUS_COLORS[project.status] ?? "var(--text-muted)",
                display: "inline-block",
              }}
            />
            {project.status}
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.625rem" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-github`}
              aria-label={`${project.title} GitHub`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
                background: "var(--accent-dim)",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              className="hover-icon-link"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-demo`}
              aria-label={`${project.title} live demo`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
                background: "var(--accent-dim)",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              className="hover-icon-link"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: "0.9125rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          flex: 1,
          marginBottom: "1.5rem",
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Page header */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "3rem 0",
        }}
      >
        <div className="container-page">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
            }}
          >
            // projects
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "1rem",
            }}
          >
            Things I&apos;ve{" "}
            <span
              style={{
                background: "var(--grad-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.0625rem",
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            A collection of projects spanning web platforms, mobile apps, and
            command-line tools. Most are open source.
          </p>
        </div>
      </div>

      <div className="container-page" style={{ padding: "3rem 1.5rem 5rem" }}>
        {/* Tag filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              alignSelf: "center",
              marginRight: "0.25rem",
            }}
          >
            <Tag size={12} style={{ display: "inline", verticalAlign: "middle" }} /> Filter:
          </span>
          {ALL_TAGS.map((tag) => (
            <span key={tag} className="tag" style={{ cursor: "pointer" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
