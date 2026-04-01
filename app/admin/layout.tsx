import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "nickolaskg@gmail.com";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        paddingTop: "var(--nav-h)",
        background: "var(--bg-base)",
      }}
    >
      <AdminSidebar userEmail={user.email ?? ""} userName={user.user_metadata?.full_name ?? "Admin"} />
      <main
        style={{
          flex: 1,
          padding: "2.5rem",
          minWidth: 0,
          overflowX: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
