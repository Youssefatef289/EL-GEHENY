-- El Geheny CMS schema — run once in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  company JSONB,
  stats JSONB,
  social JSONB,
  team JSONB,
  nav_links JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS translations (
  id TEXT PRIMARY KEY DEFAULT 'main',
  ar JSONB,
  en JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title JSONB,
  location JSONB,
  status JSONB,
  progress INTEGER DEFAULT 0,
  description JSONB,
  features JSONB,
  cover_url TEXT,
  gallery JSONB,
  units JSONB,
  payload JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title JSONB,
  description JSONB,
  icon_url TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title JSONB,
  content JSONB,
  excerpt JSONB,
  cover_url TEXT,
  published_at TEXT,
  slug TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'geheny2024')
ON CONFLICT (username) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read" ON site_settings;
DROP POLICY IF EXISTS "public read" ON translations;
DROP POLICY IF EXISTS "public read" ON projects;
DROP POLICY IF EXISTS "public read" ON services;
DROP POLICY IF EXISTS "public read" ON blog_posts;
DROP POLICY IF EXISTS "admin read" ON admin_users;
DROP POLICY IF EXISTS "admin write" ON site_settings;
DROP POLICY IF EXISTS "admin write" ON translations;
DROP POLICY IF EXISTS "admin write" ON projects;
DROP POLICY IF EXISTS "admin write" ON services;
DROP POLICY IF EXISTS "admin write" ON blog_posts;
DROP POLICY IF EXISTS "admin write" ON admin_users;

CREATE POLICY "public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "public read" ON translations FOR SELECT USING (true);
CREATE POLICY "public read" ON projects FOR SELECT USING (true);
CREATE POLICY "public read" ON services FOR SELECT USING (true);
CREATE POLICY "public read" ON blog_posts FOR SELECT USING (true);

CREATE POLICY "admin write" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write" ON translations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin read" ON admin_users FOR SELECT USING (true);
CREATE POLICY "admin write" ON admin_users FOR ALL USING (true) WITH CHECK (true);
