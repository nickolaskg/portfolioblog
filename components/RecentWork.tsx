import Link from "next/link";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

// ============================================================
// PLACEHOLDER DATA — swap with Supabase queries later
// ============================================================
const POSTS = [
  {
    id: "01",
    slug: "building-my-portfolio-from-scratch",
    title: "Building My Portfolio From Scratch",
    description:
      "A deep-dive into the architectural decisions, design choices, and tech stack behind this very site.",
    tags: ["Next.js", "Supabase", "Design"],
    readingTime: "8 min read",
    date: "Apr 1, 2026",
  },
  {
    id: "02",
    slug: "local-first-mobile-apps-with-flutter",
    title: "Local-First Mobile Apps With Flutter",
    description:
      "How I built Aura Fitness — a CRDT-based, offline-first strength training app with zero SaaS lock-in.",
    tags: ["Flutter", "SQLite", "CRDT"],
    readingTime: "12 min read",
    date: "Mar 15, 2026",
  },
  {
    id: "03",
    slug: "youtube-to-anki-with-ai",
    title: "YouTube → Anki Cards With AI",
    description:
      "Building a Python CLI that converts YouTube transcripts into smart Anki flashcards using LLMs.",
    tags: ["Python", "AI", "Productivity"],
    readingTime: "6 min read",
    date: "Mar 11, 2026",
  },
];

const PROJECTS = [
  {
    id: "01",
    slug: "aura-fitness",
    title: "Aura Fitness",
    description: "Premium local-first strength training app for iOS & Android.",
    tags: ["Flutter", "SQLite", "CRDTs"],
    github: "https://github.com/nickolaskg/aura-fitness",
    demo: null,
  },
  {
    id: "02",
    slug: "youtube-anki-tool",
    title: "YouTube → Anki AI Tool",
    description: "CLI tool that converts YouTube videos into study notes & Anki flashcards.",
    tags: ["Python", "OpenAI", "AnkiConnect"],
    github: "https://github.com/nickolaskg",
    demo: null,
  },
  {
    id: "03",
    slug: "portfolio-blog",
    title: "This Portfolio",
    description: "Personal portfolio and blog built with Next.js, Supabase, and Tailwind.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    github: "https://github.com/nickolaskg",
    demo: null,
  },
];

// ============================================================
// BLOG CARD
// ============================================================
function BlogCard({ post }: { post: (typeof POSTS)[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      id={`blog-card-${post.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        width: 320,
        padding: "1.5rem",
      }}
      className="glass-card"
    >
      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
        {post.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.0625rem",
          color: "var(--text-primary)",
          marginBottom: "0.6rem",
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "1.25rem",
        }}
      >
        {post.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <Clock size={12} /> {post.readingTime}
        </span>
        <span>{post.date}</span>
      </div>
    </Link>
  );
}

// ============================================================
// PROJECT CARD
// ============================================================
function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div
      id={`project-card-${project.id}`}
      style={{
        width: 320,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
      className="glass-card"
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "var(--text-primary)",
            lineHeight: 1.3,
            flex: 1,
          }}
        >
          {project.title}
        </h3>
        <div style={{ display: "flex", gap: "0.5rem", marginLeft: "0.5rem" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "var(--text-muted)" }}
              className="hover-text-accent"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "1.25rem",
          flex: 1,
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SECTION
// ============================================================
function SectionHeader({
  label,
  title,
  href,
  linkLabel,
}: {
  label: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.5rem",
          }}
        >
          {label}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </h2>
      </div>
      <Link
        href={href}
        id={`recent-work-see-all-${linkLabel.toLowerCase().replace(/ /g, "-")}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.875rem",
          color: "var(--accent)",
          textDecoration: "none",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          transition: "gap 0.2s ease",
        }}
      >
        {linkLabel} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function RecentWork() {
  return (
    <section id="recent-work" className="section-pad" style={{ background: "var(--bg-base)" }}>
      <div className="container-page">
        {/* Blog */}
        <div style={{ marginBottom: "4rem" }}>
          <SectionHeader
            label="// latest_posts"
            title="Recent Writing"
            href="/blog"
            linkLabel="All Posts"
          />
          <div className="scroll-track" style={{ paddingBottom: "1rem" }}>
            {POSTS.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <SectionHeader
            label="// featured_work"
            title="Projects"
            href="/projects"
            linkLabel="All Projects"
          />
          <div className="scroll-track" style={{ paddingBottom: "1rem" }}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
