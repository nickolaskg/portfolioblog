import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { getPosts, deletePost } from "@/app/actions/blog";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  published: { bg: "rgba(34,211,238,0.1)", color: "var(--accent)" },
  draft: { bg: "rgba(100,116,139,0.12)", color: "var(--text-muted)" },
};

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Header */}
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
            // blog_posts
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            Blog Posts
          </h1>
        </div>
        <Link href="/admin/blog/new" id="admin-blog-new-btn" className="btn-primary"
          style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: "hidden", borderRadius: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {["Title", "Status", "Tags", "Date", "Actions"].map((h) => (
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
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No posts found. Create your first one!
                </td>
              </tr>
            ) : (
              posts.map((post: any, i: number) => {
                const deleteAction = deletePost.bind(null, post.id);
                const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                const formattedDate = new Date(post.created_at).toLocaleDateString(undefined, dateOptions);
                const readingTime = Math.ceil((post.body || '').replace(/<[^>]*>?/gm, '').length / 1000) + " min"; // rough estimate

                return (
                  <tr
                    key={post.id}
                    id={`admin-blog-row-${post.id}`}
                    style={{
                      borderBottom:
                        i < posts.length - 1
                          ? "1px solid var(--border-subtle)"
                          : "none",
                    }}
                    className="hover-bg-accent-dim"
                  >
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        maxWidth: 280,
                      }}
                    >
                      {post.title}
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          fontWeight: 400,
                          marginTop: "0.15rem",
                        }}
                      >
                        {readingTime} read
                      </span>
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
                          ...(STATUS_STYLE[post.status] || STATUS_STYLE.draft),
                        }}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {(post.tags || []).map((t: string) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formattedDate}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          id={`admin-blog-view-${post.id}`}
                          target="_blank"
                          aria-label="View"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-muted)",
                            textDecoration: "none",
                          }}
                          className="hover-icon-link"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          id={`admin-blog-edit-${post.id}`}
                          aria-label="Edit"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-muted)",
                            textDecoration: "none",
                          }}
                          className="hover-icon-link"
                        >
                          <Edit size={14} />
                        </Link>
                        <form action={deleteAction} style={{ display: "inline-block" }}>
                          <button
                            type="submit"
                            id={`admin-blog-delete-${post.id}`}
                            aria-label="Delete"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-muted)",
                              background: "transparent",
                              cursor: "pointer",
                            }}
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
    </div>
  );
}
