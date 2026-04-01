import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { getProjects, deleteProject } from "@/app/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
              fontSize: "0.7rem",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.3rem",
            }}
          >
            // projects
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            Projects
          </h1>
        </div>
        <Link href="/admin/projects/new" id="admin-project-new-btn" className="btn-primary"
          style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="glass-card" style={{ overflow: "hidden", borderRadius: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {["Title", "Status", "Tags", "Links", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.875rem 1.25rem",
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No projects found. Create your first one!
                </td>
              </tr>
            ) : (
              projects.map((p: any, i: number) => {
                const deleteAction = deleteProject.bind(null, p.id);

                return (
                  <tr
                    key={p.id}
                    id={`admin-project-row-${p.id}`}
                    style={{
                      borderBottom: i < projects.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    }}
                    className="hover-bg-accent-dim"
                  >
                    <td style={{ padding: "1rem 1.25rem", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", maxWidth: 220 }}>
                      {p.title}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          padding: "0.2rem 0.65rem",
                          borderRadius: 9999,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          background: p.status === "Shipped" ? "rgba(34,211,238,0.1)" : "rgba(139,92,246,0.1)",
                          color: p.status === "Shipped" ? "var(--accent)" : "#a78bfa",
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", maxWidth: 250 }}>
                        {(p.tech_tags || []).map((t: string) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                        {p.github_url && (
                          <a href={p.github_url} target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            className="hover-text-accent"
                          >
                            <GithubIcon size={16} />
                          </a>
                        )}
                        {p.demo_url && (
                          <a href={p.demo_url} target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            className="hover-text-accent"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Link href={`/admin/projects/${p.id}/edit`} id={`admin-project-edit-${p.id}`} aria-label="Edit"
                          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border-subtle)", color: "var(--text-muted)", textDecoration: "none" }}
                          className="hover-icon-link"
                        >
                          <Edit size={14} />
                        </Link>
                        <form action={deleteAction} style={{ display: "inline-block" }}>
                          <button
                            type="submit"
                            id={`admin-project-delete-${p.id}`} aria-label="Delete"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border-subtle)", color: "var(--text-muted)", background: "transparent", cursor: "pointer" }}
                            className="hover-icon-link-danger"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p
        style={{
          marginTop: "1.25rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Showing live projects from Supabase.
      </p>
    </div>
  );
}
