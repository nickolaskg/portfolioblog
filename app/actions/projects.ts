"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const supabase = await createSupabaseServerClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return projects;
}

export async function getProjectById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }
  return project;
}

export async function createProject(projectData: {
  title: string;
  slug: string;
  description: string;
  body: string;
  tech_tags: string[];
  github_url: string | null;
  demo_url: string | null;
  status: string;
  featured: boolean;
  cover_gradient: string | null;
}) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...projectData }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  return data;
}

export async function updateProject(
  id: string,
  projectData: {
    title: string;
    slug: string;
    description: string;
    body: string;
    tech_tags: string[];
    github_url: string | null;
    demo_url: string | null;
    status: string;
    featured: boolean;
    cover_gradient: string | null;
  }
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ ...projectData })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath(`/projects/${projectData.slug}`);
  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
