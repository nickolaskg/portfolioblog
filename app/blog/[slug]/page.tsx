import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Share2, Tag } from "lucide-react";

// Placeholder posts — swap with Supabase query: SELECT * FROM posts WHERE slug = $slug
const POSTS: Record<
  string,
  {
    title: string;
    description: string;
    tags: string[];
    readingTime: string;
    date: string;
    body: string;
  }
> = {
  "building-my-portfolio-from-scratch": {
    title: "Building My Portfolio From Scratch",
    description:
      "A deep-dive into the architectural decisions, design choices, and tech stack behind this very site.",
    tags: ["Next.js", "Supabase", "Design", "Development"],
    readingTime: "8 min read",
    date: "Apr 1, 2026",
    body: `
<p>When I set out to build my portfolio, I had one non-negotiable constraint: it had to feel <em>alive</em>. Not a static resume with a coat of paint, but a genuine expression of how I think about software and design.</p>

<h2>Choosing the Stack</h2>
<p>After considering a number of options, I landed on <strong>Next.js 16</strong> with the App Router, <strong>Supabase</strong> for auth and the database, and <strong>Tailwind CSS v4</strong> for styling. Each choice was deliberate:</p>
<ul>
  <li><strong>Next.js</strong> gives me SSR/ISR for great SEO, API routes, and native Vercel CI/CD.</li>
  <li><strong>Supabase</strong> handles Google OAuth, Postgres, and Storage in one platform with no vendor lock-in.</li>
  <li><strong>Tailwind v4</strong> with CSS custom properties means a clean design token system without a JS config file.</li>
</ul>

<h2>The Hero Animation</h2>
<p>The hero section features an interactive particle field built with a raw <code>Canvas 2D</code> API — no Three.js overhead needed for this level of effect. Particles drift slowly, connect with faint lines when close together, and react to mouse movement with a gentle attraction force.</p>

<h2>Dark Mode Architecture</h2>
<p>Rather than relying on Tailwind's <code>dark:</code> variants, I implemented a pure CSS variable approach. A <code>data-theme</code> attribute on <code>&lt;html&gt;</code> swaps the entire palette instantly, and the React context persists the preference to localStorage.</p>

<h2>What's Next</h2>
<p>The admin panel (Google OAuth-protected) and Supabase integration are coming next — allowing me to write and publish posts from a rich-text editor without touching the codebase.</p>
    `,
  },
  "local-first-mobile-apps-with-flutter": {
    title: "Local-First Mobile Apps With Flutter",
    description:
      "How I built Aura Fitness — a CRDT-based, offline-first strength training app with zero SaaS lock-in.",
    tags: ["Flutter", "SQLite", "CRDT", "Mobile"],
    readingTime: "12 min read",
    date: "Mar 15, 2026",
    body: `<p>Coming soon — this post is being written. Check back shortly!</p>`,
  },
  "youtube-to-anki-with-ai": {
    title: "YouTube → Anki Cards With AI",
    description:
      "Building a Python CLI that converts YouTube transcripts into smart Anki flashcards.",
    tags: ["Python", "AI", "Productivity"],
    readingTime: "6 min read",
    date: "Mar 11, 2026",
    body: `<p>Coming soon — this post is being written. Check back shortly!</p>`,
  },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "3rem 0",
        }}
      >
        <div className="container-page" style={{ maxWidth: 800 }}>
          {/* Breadcrumb */}
          <Link
            href="/blog"
            id="blog-post-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-mono)",
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={14} /> blog/
          </Link>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
            {post.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", marginBottom: "1rem" }}>
            {post.title}
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              marginBottom: "1.5rem",
            }}
          >
            {post.description}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
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
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={13} /> {post.readingTime}
              </span>
              <span style={{ color: "var(--border-dim)" }}>|</span>
              <span>{post.date}</span>
              <span style={{ color: "var(--border-dim)" }}>|</span>
              <span>by Nickolas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="container-page"
        style={{ maxWidth: 800, padding: "3rem 1.5rem 5rem" }}
      >
        <article
          className="prose-portfolio"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Footer */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link href="/blog" className="btn-ghost" id="blog-post-back-btn"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
          >
            <ArrowLeft size={15} /> All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}
