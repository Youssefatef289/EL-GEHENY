import bcrypt from 'bcryptjs'
import { db, isDbConfigured } from './db.js'
import { applyCors, handleOptions, sendJson } from './_utils.js'

const MYSQL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    subject VARCHAR(200),
    message TEXT,
    project_name VARCHAR(100),
    district VARCHAR(100),
    type ENUM('contact', 'booking') DEFAULT 'contact',
    status ENUM('new', 'in_progress', 'done') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY,
    company JSON,
    stats JSON,
    social JSON,
    team JSON,
    section_images JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS translations (
    id VARCHAR(50) PRIMARY KEY,
    ar JSON,
    en JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(100) PRIMARY KEY,
    title JSON,
    location JSON,
    status JSON,
    progress INT DEFAULT 0,
    description JSON,
    features JSON,
    cover_url TEXT,
    gallery JSON,
    units JSON,
    payload JSON,
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    title JSON,
    description JSON,
    icon_url TEXT,
    payload JSON,
    sort_order INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    title JSON,
    content JSON,
    excerpt JSON,
    cover_url TEXT,
    published_at VARCHAR(50),
    slug VARCHAR(200),
    payload JSON,
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
]

const PG_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS inquiries (
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
  )`,
  `CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY,
    company JSONB,
    stats JSONB,
    social JSONB,
    team JSONB,
    section_images JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS translations (
    id VARCHAR(50) PRIMARY KEY,
    ar JSONB,
    en JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
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
  )`,
  `CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    title JSONB,
    description JSONB,
    icon_url TEXT,
    payload JSONB,
    sort_order INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
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
  )`,
]

export default async function handler(req, res) {
  applyCors(req, res)
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (req.headers['x-setup-secret'] !== process.env.SETUP_SECRET) {
    return sendJson(res, 403, { error: 'Forbidden' })
  }

  if (!isDbConfigured() || !db) {
    return sendJson(res, 500, { error: 'Database not configured' })
  }

  try {
    const dialect = db.dialect || 'postgres'
    const statements = dialect === 'mysql' ? MYSQL_STATEMENTS : PG_STATEMENTS
    for (const statement of statements) {
      await db.execute(statement)
    }

    if (dialect === 'mysql') {
      await db.execute('INSERT IGNORE INTO site_settings (id) VALUES (?)', ['main'])
      await db.execute('INSERT IGNORE INTO translations (id, ar, en) VALUES (?, ?, ?)', ['main', '{}', '{}'])
    } else {
      await db.execute(
        "INSERT INTO site_settings (id) VALUES ('main') ON CONFLICT (id) DO NOTHING",
      )
      await db.execute(
        "INSERT INTO translations (id, ar, en) VALUES ('main', '{}'::jsonb, '{}'::jsonb) ON CONFLICT (id) DO NOTHING",
      )
    }

    const username = process.env.ADMIN_USERNAME || 'admin'
    const passwordHash = process.env.ADMIN_PASSWORD_HASH
      || (process.env.ADMIN_PASSWORD
        ? await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        : await bcrypt.hash('geheny2024', 10))

    if (dialect === 'mysql') {
      await db.execute(
        `INSERT INTO admins (username, password_hash) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
        [username, passwordHash],
      )
    } else {
      await db.execute(
        `INSERT INTO admins (username, password_hash) VALUES (?, ?)
         ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
        [username, passwordHash],
      )
    }

    return sendJson(res, 200, { success: true, message: 'Tables created and admin seeded', dialect })
  } catch (err) {
    return sendJson(res, 500, { error: err.message || 'Setup failed' })
  }
}
