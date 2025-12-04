/**
 * Initialize Database Schema
 * Creates all necessary tables
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

// Create blogs table
async function createBlogsTable(connection) {
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

  await connection.execute(createTableQuery);
  console.log("✅ Blogs table created/verified");
}

async function initializeDatabase() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'geneveda_biosciences',
    port: parseInt(process.env.DB_PORT || '3306'),
  };

  const connection = await mysql.createConnection(config);
  
  try {
    await createBlogsTable(connection);
    console.log("✅ Database schema initialized");
  } finally {
    await connection.end();
  }
}

async function main() {
  console.log('🔧 Initializing Database Schema\n');
  console.log('Configuration:');
  console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   Database: ${process.env.DB_NAME || 'geneveda_biosciences'}`);
  console.log(`   User: ${process.env.DB_USER || 'root'}\n`);

  try {
    await initializeDatabase();
    console.log('\n✅ Database initialized successfully!');
    console.log('\n📊 Next steps:');
    console.log('   1. Your database is ready to use');
    console.log('   2. Start your development server: npm run dev');
    console.log('   3. The API routes will automatically use the database');
  } catch (error) {
    console.error('\n❌ Error initializing database:', error.message);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Make sure MySQL is running');
      console.error('   2. Check your .env.local file has correct DB_HOST');
      console.error('   3. For local development, use: DB_HOST=localhost');
      console.error('   4. Run: npm run test-db (to test connection)');
      console.error('   5. Run: ./setup-database.sh (to set up MySQL)');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Access denied. Check:');
      console.error('   1. Username and password in .env.local');
      console.error('   2. User has permissions on the database');
      console.error('   3. Database exists (create it if needed)');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Database does not exist. Create it first:');
      console.error(`   mysql -u ${process.env.DB_USER || 'root'} -p -e "CREATE DATABASE ${process.env.DB_NAME || 'geneveda_biosciences'};"`);
    }
    
    process.exit(1);
  }
}

main();

