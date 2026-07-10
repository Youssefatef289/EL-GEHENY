-- MySQL schema for local Docker (phpMyAdmin)

CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(50) PRIMARY KEY,
  company JSON,
  stats JSON,
  social JSON,
  team JSON,
  section_images JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS translations (
  id VARCHAR(50) PRIMARY KEY,
  ar JSON,
  en JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
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
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  title JSON,
  description JSON,
  icon_url TEXT,
  payload JSON,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
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
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
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
);

INSERT IGNORE INTO site_settings (id) VALUES ('main');
INSERT IGNORE INTO translations (id, ar, en) VALUES ('main', '{}', '{}');
