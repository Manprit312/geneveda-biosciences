/**
 * Setup Cloud Database Script
 * This script helps you set up your cloud MySQL database
 * Run this after you know your MySQL hostname
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function setupCloudDB() {
  console.log('🌐 GeneVeda Biosciences - Cloud Database Setup\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'u896634865_manprit',
    password: process.env.DB_PASSWORD || 'mnprt@Bharatail',
    database: process.env.DB_NAME || 'u896634865_manprit',
    port: parseInt(process.env.DB_PORT || '3306'),
  };

  console.log('Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   Port: ${config.port}\n`);

  let connection;

  try {
    console.log('📡 Connecting to cloud MySQL database...');
    connection = await mysql.createConnection(config);
    console.log('✅ Connected successfully!\n');

    // Check if database exists
    const [databases] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [config.database]
    );

    if (databases.length === 0) {
      console.log(`⚠️  Database '${config.database}' does not exist.`);
      console.log('   Please create it in your hosting control panel first.\n');
      await connection.end();
      return;
    }

    console.log(`✅ Database '${config.database}' exists!\n`);

    // Check if blogs table exists
    const [tables] = await connection.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'blogs'`,
      [config.database]
    );

    if (tables.length === 0) {
      console.log('📋 Creating blogs table...');
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
      await connection.query(createTableQuery);
      console.log('✅ Blogs table created!\n');
    } else {
      console.log('✅ Blogs table already exists!\n');
    }

    // Check blog count
    const [count] = await connection.query('SELECT COUNT(*) as count FROM blogs');
    console.log(`📊 Current blog posts: ${count[0].count}\n`);

    if (count[0].count === 0) {
      console.log('💡 Tip: Run "npm run seed-blogs" to add sample blog data\n');
    }

    console.log('🎉 Cloud database is ready for Vercel deployment!\n');
    console.log('📝 Next steps:');
    console.log('   1. Deploy to Vercel');
    console.log('   2. Add these environment variables in Vercel:');
    console.log(`      DB_HOST=${config.host}`);
    console.log(`      DB_USER=${config.user}`);
    console.log(`      DB_PASSWORD=${config.password}`);
    console.log(`      DB_NAME=${config.database}`);
    console.log(`      DB_PORT=${config.port}`);
    console.log('   3. Redeploy and test!\n');

    await connection.end();

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Access Denied - Check:');
      console.error('   1. Username and password are correct');
      console.error('   2. User has permissions on the database');
      console.error('   3. Database name is correct\n');
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('\n💡 Connection Failed - Check:');
      console.error('   1. DB_HOST is correct (check your hosting panel)');
      console.error('   2. For shared hosting, try "localhost"');
      console.error('   3. MySQL server is running\n');
    }
    
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

setupCloudDB();

