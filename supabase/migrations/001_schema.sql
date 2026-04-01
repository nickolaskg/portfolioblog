-- ============================================================
-- Portfolio Blog — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Blog Posts
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  cover_image   TEXT,                           -- Supabase Storage URL
  body          JSONB,                          -- TipTap JSON output
  body_html     TEXT,                           -- Pre-rendered HTML for fast reads
  tags          TEXT[] DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'draft'   -- 'draft' | 'published'
                  CHECK (status IN ('draft', 'published')),
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Portfolio Projects
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  body          JSONB,
  body_html     TEXT,
  cover_image   TEXT,
  images        TEXT[] DEFAULT '{}',
  tech_tags     TEXT[] DEFAULT '{}',
  github_url    TEXT,
  demo_url      TEXT,
  featured      BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Site Settings (key-value store for toggles, tokens, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- Posts: public can read published posts; only authenticated admin can write
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated admin can manage all posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Projects: same pattern
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated admin can manage all projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Site settings: public can read; only admin can write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated admin can manage site settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Seed data
-- ============================================================

-- Default site settings
INSERT INTO site_settings (key, value) VALUES
  ('github_enabled',    'true'),
  ('instagram_enabled', 'true'),
  ('linkedin_enabled',  'true'),
  ('hero_style',        '"particles"')
ON CONFLICT (key) DO NOTHING;

-- Seed blog post #1
INSERT INTO posts (title, slug, description, tags, status, published_at, body_html)
VALUES (
  'Building My Portfolio From Scratch',
  'building-my-portfolio-from-scratch',
  'A deep dive into architecting a performant, visually stunning portfolio with Next.js, Supabase, and Three.js.',
  ARRAY['development', 'design', 'Next.js', 'Supabase'],
  'published',
  now(),
  '<h2>Introduction</h2><p>Building a portfolio that truly represents you is both an art and an engineering challenge. In this post I walk through every decision — from the tech stack to the visual design — that went into this site.</p><h2>Choosing the Stack</h2><p>Next.js 15 with App Router gives us server components for zero-JS-by-default performance, API routes for social integrations, and seamless Vercel deployment. Supabase handles auth, storage, and the database in one unified platform.</p><h2>The Hero Animation</h2><p>The floating particle field is built with React Three Fiber on top of Three.js. Each particle reacts to mouse movement using raycasting, creating an organic, living feel without canvas2D hacks.</p><h2>What''s Next</h2><p>Full TipTap integration, image uploads, and live social feeds once API credentials are wired up. Stay tuned.</p>'
) ON CONFLICT (slug) DO NOTHING;

-- Seed project #1 — Aura Fitness
INSERT INTO projects (title, slug, description, tech_tags, github_url, featured, display_order, status, body_html)
VALUES (
  'Aura Fitness',
  'aura-fitness',
  'A local-first strength training app for iOS and Android with CRDT sync via iCloud and Google Drive.',
  ARRAY['Flutter', 'Dart', 'SQLite', 'CRDT', 'iOS', 'Android'],
  'https://github.com/nickolaskg',
  true,
  1,
  'published',
  '<h2>Overview</h2><p>Aura Fitness stores all data locally on-device with no subscription required. CRDT-based sync across devices via iCloud/Google Drive.</p>'
) ON CONFLICT (slug) DO NOTHING;

-- Seed project #2 — YouTube Anki Tool
INSERT INTO projects (title, slug, description, tech_tags, github_url, featured, display_order, status, body_html)
VALUES (
  'YouTube → Anki AI Tool',
  'youtube-to-anki-ai',
  'Python CLI that converts YouTube transcripts into Anki flashcards using AI.',
  ARRAY['Python', 'OpenAI', 'AnkiConnect', 'CLI'],
  'https://github.com/nickolaskg',
  false,
  2,
  'published',
  '<h2>Overview</h2><p>Automatically downloads transcripts, extracts key concepts, and inserts cards into local Anki via AnkiConnect.</p>'
) ON CONFLICT (slug) DO NOTHING;

-- Seed project #3 — This Portfolio
INSERT INTO projects (title, slug, description, tech_tags, github_url, featured, display_order, status, body_html)
VALUES (
  'This Portfolio',
  'portfolio-blog',
  'High-performance personal portfolio and blog built with Next.js 15, Supabase, and Three.js.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Three.js', 'Framer Motion'],
  'https://github.com/nickolaskg',
  true,
  3,
  'published',
  '<h2>Overview</h2><p>The site you are currently browsing — built as both a showcase and a demonstration of modern full-stack web development.</p>'
) ON CONFLICT (slug) DO NOTHING;
