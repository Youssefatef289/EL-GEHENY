-- Postgres schema reference (Neon) — full CMS

CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(50) PRIMARY KEY,
  company JSONB,
  stats JSONB,
  social JSONB,
  team JSONB,
  section_images JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS translations (
  id VARCHAR(50) PRIMARY KEY,
  ar JSONB,
  en JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(100) PRIMARY KEY,
  title JSONB,
  location JSONB,
  status JSONB,
  progress INT DEFAULT 0,
  description JSONB,
  features JSONB,
  cover_url TEXT,
  gallery JSONB,
  units JSONB,
  payload JSONB,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  title JSONB,
  description JSONB,
  icon_url TEXT,
  payload JSONB,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(100) PRIMARY KEY,
  title JSONB,
  content JSONB,
  excerpt JSONB,
  cover_url TEXT,
  published_at VARCHAR(50),
  slug VARCHAR(200),
  payload JSONB,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  subject VARCHAR(200),
  message TEXT,
  project_name VARCHAR(100),
  district VARCHAR(100),
  type VARCHAR(20) DEFAULT 'contact',
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
