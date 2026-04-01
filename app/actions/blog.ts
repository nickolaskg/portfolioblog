"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const supabase = await createSupabaseServerClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return posts;
}

export async function getPostById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }
  return post;
}

export async function createPost(postData: {
  title: string;
  slug: string;
  description: string;
  body: string;
  tags: string[];
  status: "draft" | "published";
}) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        ...postData,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return data;
}

export async function updatePost(
  id: string,
  postData: {
    title: string;
    slug: string;
    description: string;
    body: string;
    tags: string[];
    status: "draft" | "published";
  }
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("posts")
    .update({
      ...postData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${postData.slug}`);
  return data;
}

export async function deletePost(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
