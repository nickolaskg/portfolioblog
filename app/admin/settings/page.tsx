"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

function ToggleRow({
  id,
  label,
  description,
  icon: Icon,
  value,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  icon: React.FC<{ size: number }>;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderBottom: "1px solid var(--border-subtle)",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--accent-dim)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
          }}
        >
          <Icon size={17} />
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>{label}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{description}</p>
        </div>
      </div>

      {/* Toggle switch */}
      <button
        id={id}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        style={{
          width: 48,
          height: 26,
          borderRadius: 9999,
          background: value ? "var(--grad-accent)" : "var(--bg-card)",
          border: "1px solid",
          borderColor: value ? "transparent" : "var(--border-dim)",
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
            left: value ? "calc(100% - 21px)" : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: value ? "#050b14" : "var(--text-muted)",
            transition: "left 0.2s ease, background 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [github, setGithub] = useState(true);
  const [instagram, setInstagram] = useState(true);
  const [linkedin, setLinkedin] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    alert("Settings saved (placeholder — connect Supabase to persist).");
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
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
          // settings
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--text-primary)",
          }}
        >
          Site Settings
        </h1>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem", maxWidth: 600 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
          }}
        >
          Social Feed Visibility
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem", lineHeight: 1.55 }}>
          Control which social sections appear on the landing page.
        </p>

        <ToggleRow
          id="settings-github-toggle"
          label="GitHub"
          description="Show GitHub repos section"
          icon={GithubIcon as React.FC<{ size: number }>}
          value={github}
          onChange={setGithub}
        />
        <ToggleRow
          id="settings-instagram-toggle"
          label="Instagram"
          description="Show Instagram link section"
          icon={InstagramIcon as React.FC<{ size: number }>}
          value={instagram}
          onChange={setInstagram}
        />
        <ToggleRow
          id="settings-linkedin-toggle"
          label="LinkedIn"
          description="Show LinkedIn link section"
          icon={LinkedinIcon as React.FC<{ size: number }>}
          value={linkedin}
          onChange={setLinkedin}
        />

        <button
          id="settings-save-btn"
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ marginTop: "1.5rem", fontSize: "0.875rem", padding: "0.625rem 1.5rem" }}
        >
          <Save size={15} />
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
