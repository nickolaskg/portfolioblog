"use client";

import { useState } from "react";
import { Save, Eye, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions/blog";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const generateSlug = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  const handleSave = async () => {
    try {
      if (!title || !slug) return alert("Title and slug are required.");
      setSaving(true);
      await createPost({ title, slug, description, body, tags, status });
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      alert("Error saving: " + err.message);
      setSaving(false);
    }
  };

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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin/blog"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            <ArrowLeft size={16} /> Posts
          </Link>
          <span style={{ color: "var(--border-dim)" }}>/</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "var(--text-primary)",
            }}
          >
            New Post
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <select
            id="admin-post-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            style={{
              padding: "0.55rem 1rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 9999,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            id="admin-post-save-btn"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
          >
            <Save size={15} />
            {saving ? "Saving…" : "Save Post"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(0, 300px)",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        {/* Main editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Title */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <label
              htmlFor="post-title"
              style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Title
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Awesome Post"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Description */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <label htmlFor="post-desc" style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Description / Excerpt
            </label>
            <textarea
              id="post-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short summary of the post..."
              rows={3}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                resize: "vertical",
                lineHeight: 1.65,
              }}
            />
          </div>

          {/* Body */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <label htmlFor="post-body" style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Body (Rich Text)
            </label>
            <RichTextEditor content={body} onChange={setBody} />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Slug */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <label htmlFor="post-slug" style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Slug
            </label>
            <input
              id="post-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-post"
              style={{
                width: "100%",
                background: "var(--bg-base)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "0.5rem 0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--accent)",
                outline: "none",
              }}
            />
          </div>

          {/* Tags */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Tags
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
              {tags.map((t) => (
                <span
                  key={t}
                  className="tag"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  {t}
                  <button
                    onClick={() => removeTag(t)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", lineHeight: 1, padding: 0 }}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                id="post-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag…"
                style={{
                  flex: 1,
                  background: "var(--bg-base)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 8,
                  padding: "0.4rem 0.65rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
              <button
                onClick={addTag}
                style={{
                  padding: "0.4rem 0.875rem",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-dim)",
                  borderRadius: 8,
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
