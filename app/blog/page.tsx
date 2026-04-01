import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, design, and the craft of building great products.",
};

const POSTS = [
  {
    id: "01",
    slug: "building-my-portfolio-from-scratch",
    title: "Building My Portfolio From Scratch",
    description:
      "A deep-dive into the architectural decisions, design choices, and tech stack behind this very site — covering Next.js, Supabase, Tailwind CSS, and Vercel CI/CD.",
    tags: ["Next.js", "Supabase", "Design", "Development"],
    readingTime: "8 min read",
    date: "Apr 1, 2026",
    featured: true,
  },
  {
    id: "02",
    slug: "local-first-mobile-apps-with-flutter",
    title: "Local-First Mobile Apps With Flutter",
    description:
      "How I built Aura Fitness — a CRDT-based, offline-first strength training app with zero SaaS lock-in and iCloud/Google Drive sync.",
    tags: ["Flutter", "SQLite", "CRDT", "Mobile"],
    readingTime: "12 min read",
    date: "Mar 15, 2026",
    featured: false,
  },
  {
    id: "03",
    slug: "youtube-to-anki-with-ai",
    title: "YouTube → Anki Cards With AI",
    description:
      "Building a Python CLI that converts YouTube transcripts into smart Anki flashcards using LLMs and AnkiConnect.",
    tags: ["Python", "AI", "Productivity", "Learning"],
    readingTime: "6 min read",
    date: "Mar 11, 2026",
    featured: false,
  },
];

const ALL_TAGS = Array.from(new Set(POSTS.flatMap((p) => p.tags)));

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

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
            // blog
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "1rem",
            }}
          >
            Writing &{" "}
            <span
              style={{
                background: "var(--grad-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Thoughts
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
            Articles about software engineering, design systems, mobile development,
            and the tools I use to build things.
          </p>
        </div>
      </div>

      <div className="container-page" style={{ padding: "3rem 1.5rem" }}>
        {/* Tag filter — static labels for now */}
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

        {/* Featured post */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link
            href={`/blog/${featured.slug}`}
            id={`blog-featured-${featured.id}`}
            style={{ textDecoration: "none" }}
          >
            <article
              className="glass-card"
              style={{
                padding: "2rem",
                display: "grid",
                gridTemplateColumns: "1fr",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.2rem 0.65rem",
                    background: "var(--accent)",
                    color: "#050b14",
                    borderRadius: 9999,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  ★ Featured
                </span>
                {featured.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.875rem)",
                  marginBottom: "0.75rem",
                  color: "var(--text-primary)",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  maxWidth: 700,
                }}
              >
                {featured.description}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <Clock size={12} /> {featured.readingTime}
                  </span>
                  <span>{featured.date}</span>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </article>
          </Link>
        </div>

        {/* Post grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              id={`blog-list-${post.id}`}
              style={{ textDecoration: "none" }}
            >
              <article
                className="glass-card"
                style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.875rem" }}>
                  {post.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
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
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {post.description}
                </p>
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <Clock size={12} /> {post.readingTime}
                  </span>
                  <span>{post.date}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
