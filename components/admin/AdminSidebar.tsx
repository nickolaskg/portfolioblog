"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  FolderKanban,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "Blog", icon: PenSquare, exact: false },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

export default function AdminSidebar({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      id="admin-sidebar"
      style={{
        width: 240,
        flexShrink: 0,
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 0",
        position: "sticky",
        top: "var(--nav-h)",
        height: "calc(100vh - var(--nav-h))",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 1.25rem 1.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.35rem",
          }}
        >
          Admin Panel
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {userName}
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {userEmail}
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 0.75rem" }}>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href) && pathname !== "/admin" || (exact && pathname === href);
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              id={`admin-nav-${label.toLowerCase()}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.625rem 0.875rem",
                borderRadius: 10,
                marginBottom: "0.25rem",
                textDecoration: "none",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                background: active ? "var(--accent-dim)" : "transparent",
                border: active ? "1px solid var(--border-subtle)" : "1px solid transparent",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={13} style={{ opacity: 0.6 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "1rem 0.75rem 0", borderTop: "1px solid var(--border-subtle)" }}>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            width: "100%",
            padding: "0.625rem 0.875rem",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid transparent",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "color 0.15s ease, background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#f87171";
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
