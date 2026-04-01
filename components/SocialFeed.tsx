import Link from "next/link";
import { ArrowUpRight, GitCommitHorizontal, Star } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

// ============================================================
// GITHUB — server-side fetch at build time (ISR)
// ============================================================
async function getGithubData() {
  try {
    const res = await fetch(
      "https://api.github.com/users/nickolaskg/repos?sort=updated&per_page=4&type=owner",
      { next: { revalidate: 600 } }
    );
    if (!res.ok) throw new Error("GitHub fetch failed");
    return await res.json();
  } catch {
    return null;
  }
}

function GithubRepoCard({
  repo,
}: {
  repo: {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string;
    language: string | null;
  };
}) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      id={`github-repo-${repo.id}`}
      style={{
        display: "block",
        padding: "0.875rem 1rem",
        textDecoration: "none",
        borderBottom: "1px solid var(--border-subtle)",
      }}
      className="hover-bg-accent-dim"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: "var(--accent)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <GitCommitHorizontal size={12} />
          {repo.name}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <Star size={11} />
          {repo.stargazers_count}
        </span>
      </div>
      {repo.description && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}
        >
          {repo.description.length > 80
            ? repo.description.slice(0, 80) + "…"
            : repo.description}
        </p>
      )}
      {repo.language && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            marginTop: "0.4rem",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          {repo.language}
        </span>
      )}
    </a>
  );
}

// ============================================================
// COLUMN SHELL
// ============================================================
function SocialColumn({
  id,
  icon: Icon,
  label,
  href,
  children,
}: {
  id: string;
  icon: React.FC<{ size: number }>;
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="glass-card"
      style={{ overflow: "hidden", flex: "1 1 280px" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <Icon size={18} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--text-primary)",
            }}
          >
            {label}
          </span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Follow <ArrowUpRight size={12} />
        </a>
      </div>

      {children}
    </div>
  );
}

// ============================================================
// PLACEHOLDER CARD
// ============================================================
function ConnectPlaceholder({
  message,
  href,
  cta,
}: {
  message: string;
  href: string;
  cta: string;
}) {
  return (
    <div
      style={{
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
        {message}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost"
        style={{ fontSize: "0.8125rem", padding: "0.5rem 1.25rem" }}
      >
        {cta} <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

// ============================================================
// MAIN EXPORT (Server Component)
// ============================================================
export default async function SocialFeed() {
  const githubRepos = await getGithubData();

  return (
    <section
      id="social-feed"
      className="section-pad"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container-page">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
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
            // find_me_online
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontFamily: "var(--font-display)",
              marginBottom: "0.5rem",
            }}
          >
            Around the Web
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
            What I&apos;m building, posting, and exploring across platforms.
          </p>
        </div>

        {/* Columns */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* GitHub */}
          <SocialColumn
            id="social-github"
            icon={GithubIcon as React.FC<{ size: number }>}
            label="GitHub"
            href="https://github.com/nickolaskg"
          >
            {githubRepos && githubRepos.length > 0 ? (
              <div>
                {githubRepos.map(
                  (repo: {
                    id: number;
                    name: string;
                    description: string | null;
                    stargazers_count: number;
                    html_url: string;
                    language: string | null;
                  }) => (
                    <GithubRepoCard key={repo.id} repo={repo} />
                  )
                )}
              </div>
            ) : (
              <ConnectPlaceholder
                message="My latest public repos and contributions will appear here."
                href="https://github.com/nickolaskg"
                cta="View GitHub"
              />
            )}
          </SocialColumn>

          {/* Instagram */}
          <SocialColumn
            id="social-instagram"
            icon={InstagramIcon as React.FC<{ size: number }>}
            label="Instagram"
            href="https://instagram.com/iconick"
          >
            <ConnectPlaceholder
              message="Follow along for behind-the-scenes content, projects in progress, and life updates."
              href="https://instagram.com/iconick"
              cta="@iconick on Instagram"
            />
          </SocialColumn>

          {/* LinkedIn */}
          <SocialColumn
            id="social-linkedin"
            icon={LinkedinIcon as React.FC<{ size: number }>}
            label="LinkedIn"
            href="https://linkedin.com/in/nickolaskg"
          >
            <ConnectPlaceholder
              message="Connect with me on LinkedIn for professional updates, articles, and networking."
              href="https://linkedin.com/in/nickolaskg"
              cta="Connect on LinkedIn"
            />
          </SocialColumn>
        </div>
      </div>
    </section>
  );
}
