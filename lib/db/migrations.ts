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

// Initialize database schema
export const initializeDatabase = async (): Promise<void> => {
  try {
    await createBlogsTable();
    console.log("✅ Database schema initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
};

