import Link from "next/link";
import { PenSquare, FolderKanban, Plus, FileText, Folder, TrendingUp } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: React.FC<{ size: number }>;
  accent?: boolean;
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: accent ? "var(--grad-accent)" : "var(--accent-dim)",
          border: "1px solid var(--border-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent ? "#050b14" : "var(--accent)",
          flexShrink: 0,
        }}
      >
        <Icon size={22} />
      </div>
      <div>
        <p
          style={{
            fontSize: "1.75rem",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1,
            marginBottom: "0.25rem",
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  label,
  description,
  icon: Icon,
  id,
}: {
  href: string;
  label: string;
  description: string;
  icon: React.FC<{ size: number }>;
  id: string;
}) {
  return (
    <Link
      href={href}
      id={id}
      style={{ textDecoration: "none" }}
    >
      <div
        className="glass-card"
        style={{
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "var(--accent-dim)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--text-primary)",
              marginBottom: "0.15rem",
            }}
          >
            {label}
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.4rem",
          }}
        >
          // dashboard
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "var(--text-primary)",
          }}
        >
          Welcome back, Nickolas 👋
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginTop: "0.3rem" }}>
          Here&apos;s an overview of your site.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <StatCard label="Published Posts" value={1} icon={FileText as React.FC<{ size: number }>} accent />
        <StatCard label="Draft Posts" value={2} icon={PenSquare as React.FC<{ size: number }>} />
        <StatCard label="Projects" value={3} icon={FolderKanban as React.FC<{ size: number }>} />
        <StatCard label="GitHub Repos" value="—" icon={TrendingUp as React.FC<{ size: number }>} />
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-secondary)",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "0.875rem",
          }}
        >
          <QuickAction
            id="admin-quick-new-post"
            href="/admin/blog/new"
            label="New Blog Post"
            description="Write and publish a new article"
            icon={Plus as React.FC<{ size: number }>}
          />
          <QuickAction
            id="admin-quick-new-project"
            href="/admin/projects/new"
            label="New Project"
            description="Add a portfolio project"
            icon={Folder as React.FC<{ size: number }>}
          />
          <QuickAction
            id="admin-quick-manage-blog"
            href="/admin/blog"
            label="Manage Posts"
            description="Edit or delete existing posts"
            icon={PenSquare as React.FC<{ size: number }>}
          />
          <QuickAction
            id="admin-quick-manage-projects"
            href="/admin/projects"
            label="Manage Projects"
            description="Edit or reorder projects"
            icon={FolderKanban as React.FC<{ size: number }>}
          />
        </div>
      </div>

      {/* Notice */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          background: "var(--accent-dim)",
          border: "1px solid var(--border-dim)",
          borderRadius: 12,
          maxWidth: 600,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent)",
            marginBottom: "0.4rem",
            fontWeight: 700,
          }}
        >
          ⚠ Supabase not yet connected
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Create a Supabase project and add your credentials to <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>.env.local</code> to{" "}
          enable live blog posts, project management, and real stats.
        </p>
      </div>
    </div>
  );
}
