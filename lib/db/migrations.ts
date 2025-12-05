import "server-only";

import getDBConnection from "./connection";

// Create blogs table if it doesn't exist
export const createBlogsTable = async (): Promise<void> => {
  const db = getDBConnection();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      author_role VARCHAR(255) DEFAULT '',
      category ENUM('Research', 'NGS', 'Bioinformatics', 'Training', 'Study Abroad') NOT NULL,
      tags JSON,
      image VARCHAR(1000),
      read_time VARCHAR(50) DEFAULT '5 min read',
      featured BOOLEAN DEFAULT FALSE,
      published BOOLEAN DEFAULT TRUE,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      views INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category),
      INDEX idx_published (published, published_at),
      INDEX idx_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Blogs table created/verified");
  } catch (error: any) {
    console.error("❌ Error creating blogs table:", error.message);
    
    // Provide helpful error messages
    if (error.code === 'ENOTFOUND') {
      console.error("\n💡 Hostname not found. Possible issues:");
      console.error("   1. MySQL hostname is incorrect");
      console.error("   2. Remote MySQL access is blocked (common for shared hosting)");
      console.error("   3. For local development, use local MySQL or deploy to hosting");
      console.error("\n   Try: DB_HOST=localhost (if on hosting server)");
      console.error("   Or: Set up local MySQL for development\n");
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("\n💡 Access denied. Check:");
      console.error("   1. Username and password are correct");
      console.error("   2. User has permissions on the database");
      console.error("   3. Database name is correct\n");
    }
    
    throw error;
  }
};

// Create admins table
export const createAdminsTable = async (): Promise<void> => {
  const db = getDBConnection();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role ENUM('admin', 'superadmin') DEFAULT 'admin',
      active BOOLEAN DEFAULT TRUE,
      last_login DATETIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Admins table created/verified");
  } catch (error: any) {
    console.error("❌ Error creating admins table:", error.message);
    throw error;
  }
};

// Create services table for dynamic service pages
export const createServicesTable = async (): Promise<void> => {
  const db = getDBConnection();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      description TEXT,
      content LONGTEXT,
      icon VARCHAR(100),
      featured BOOLEAN DEFAULT FALSE,
      active BOOLEAN DEFAULT TRUE,
      order_index INT DEFAULT 0,
      meta_title VARCHAR(500),
      meta_description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_slug (slug),
      INDEX idx_active (active),
      INDEX idx_order (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Services table created/verified");
  } catch (error: any) {
    console.error("❌ Error creating services table:", error.message);
    throw error;
  }
};

// Create page_content table for managing page sections
export const createPageContentTable = async (): Promise<void> => {
  const db = getDBConnection();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS page_content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_slug VARCHAR(255) NOT NULL,
      section_key VARCHAR(255) NOT NULL,
      title VARCHAR(500),
      content LONGTEXT,
      content_type ENUM('text', 'html', 'json') DEFAULT 'html',
      order_index INT DEFAULT 0,
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_section (page_slug, section_key),
      INDEX idx_page (page_slug),
      INDEX idx_active (active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Page content table created/verified");
  } catch (error: any) {
    console.error("❌ Error creating page_content table:", error.message);
    throw error;
  }
};

// Create site_settings table for global settings
export const createSiteSettingsTable = async (): Promise<void> => {
  const db = getDBConnection();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(255) NOT NULL UNIQUE,
      setting_value LONGTEXT,
      setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_key (setting_key)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.execute(createTableQuery);
    console.log("✅ Site settings table created/verified");
  } catch (error: any) {
    console.error("❌ Error creating site_settings table:", error.message);
    throw error;
  }
};

// Initialize database schema
export const initializeDatabase = async (): Promise<void> => {
  try {
    await createBlogsTable();
    await createAdminsTable();
    await createServicesTable();
    await createPageContentTable();
    await createSiteSettingsTable();
    console.log("✅ Database schema initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
};

