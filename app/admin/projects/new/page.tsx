"use client";

import { useState } from "react";
import { Save, ArrowLeft, X, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/actions/projects";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  const generateSlug = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !techTags.includes(t)) setTechTags([...techTags, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTechTags(techTags.filter((x) => x !== t));

  const handleSave = async () => {
    try {
      if (!title || !slug) return alert("Title and slug are required.");
      setSaving(true);
      await createProject({
        title,
        slug,
        description,
        body,
        tech_tags: techTags,
        github_url: githubUrl || null,
        demo_url: demoUrl || null,
        status,
        featured,
        cover_gradient: null, // Generate dynamic or user-specified later
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      alert("Error saving: " + err.message);
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-base)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 8,
    padding: "0.6rem 0.875rem",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    outline: "none",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    marginBottom: "0.5rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
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
            href="/admin/projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            <ArrowLeft size={16} /> Projects
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
            New Project
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <select
            id="admin-project-status"
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
            id="admin-project-save-btn"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
          >
            <Save size={15} />
            {saving ? "Saving…" : "Save Project"}
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
        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Title */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <label htmlFor="project-title" style={labelStyle}>Title</label>
            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Awesome Project"
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
            <label htmlFor="project-desc" style={labelStyle}>Description</label>
            <textarea
              id="project-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short summary of this project..."
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
            <label htmlFor="project-body" style={labelStyle}>
              Long Description (Rich Text)
            </label>
            <RichTextEditor content={body} onChange={setBody} />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Slug */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <label htmlFor="project-slug" style={labelStyle}>Slug</label>
            <input
              id="project-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-project"
              style={{ ...inputStyle, fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)" }}
            />
          </div>

          {/* Links */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div>
              <label htmlFor="project-github" style={labelStyle}>
                <span style={{ display: "inline", marginRight: "0.3rem", verticalAlign: "middle" }}><GithubIcon size={11} /></span>
                GitHub URL
              </label>
              <input
                id="project-github"
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="project-demo" style={labelStyle}>
                <ExternalLink size={11} style={{ display: "inline", marginRight: "0.3rem" }} />
                Live Demo URL
              </label>
              <input
                id="project-demo"
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Tech Tags */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <label style={labelStyle}>Tech Stack</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
              {techTags.map((t) => (
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
                id="project-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Next.js, Flutter…"
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

          {/* Featured toggle */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                  Featured
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                  Highlight on the landing page
                </p>
              </div>
              <button
                id="project-featured-toggle"
                role="switch"
                aria-checked={featured}
                onClick={() => setFeatured(!featured)}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 9999,
                  background: featured ? "var(--grad-accent)" : "var(--bg-card)",
                  border: "1px solid",
                  borderColor: featured ? "transparent" : "var(--border-dim)",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: featured ? "calc(100% - 21px)" : 3,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: featured ? "#050b14" : "var(--text-muted)",
                    transition: "left 0.2s ease",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
