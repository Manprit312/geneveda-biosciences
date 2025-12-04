/**
 * Reconnect Database Script
 * This script helps you troubleshoot and reconnect to your database
 * Run this when you're frustrated - it will help! 💪
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Database Reconnection Helper\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

async function checkMySQLRunning() {
  console.log('1️⃣ Checking if MySQL is running...\n');
  
  const { execSync } = require('child_process');
  
  try {
    // Try to connect to MySQL on localhost
    const testConnection = mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306'),
      connectTimeout: 2000,
    });
    
    await testConnection;
    console.log('✅ MySQL appears to be running\n');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ MySQL is NOT running!\n');
      console.log('💡 Solutions:\n');
      console.log('   macOS (Homebrew):');
      console.log('     brew services start mysql\n');
      console.log('   Docker:');
      console.log('     docker start mysql-geneveda\n');
      console.log('   Or check MySQL is installed and started\n');
      return false;
    }
    // Other errors might just mean wrong credentials, MySQL might still be running
    return true;
  }
}

async function checkEnvFile() {
  console.log('2️⃣ Checking .env.local file...\n');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file NOT found!\n');
    console.log('💡 Creating it for you...\n');
    
    const defaultEnv = `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=geneveda_biosciences
DB_PORT=3306
`;
    
    fs.writeFileSync(envPath, defaultEnv);
    console.log('✅ Created .env.local with default values\n');
    console.log('⚠️  IMPORTANT: Edit .env.local and add your MySQL password if needed!\n');
    
    // Reload env
    require('dotenv').config({ path: '.env.local' });
    return false;
  } else {
    console.log('✅ .env.local file exists\n');
    
    // Show current values (hide password)
    console.log('Current settings:');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        if (line.includes('PASSWORD')) {
          const parts = line.split('=');
          if (parts[1]) {
            console.log(`   ${parts[0]}=${parts[1].slice(0, 2)}*** (hidden)`);
          } else {
            console.log(`   ${line} (empty)`);
          }
        } else {
          console.log(`   ${line}`);
        }
      }
    });
    console.log('');
    return true;
  }
}

async function testConnection() {
  console.log('3️⃣ Testing database connection...\n');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 5000,
  };
  
  console.log(`   Trying to connect:`);
  console.log(`   Host: ${config.host}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Port: ${config.port}\n`);
  
  // Test 1: Try connecting to MySQL server (without database)
  try {
    console.log('   Step 1: Connecting to MySQL server...');
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      connectTimeout: 5000,
    });
    
    console.log('   ✅ Connected to MySQL server!\n');
    
    // Test 2: Check if database exists
    const databaseName = process.env.DB_NAME || 'geneveda_biosciences';
    console.log(`   Step 2: Checking database '${databaseName}'...`);
    
    const [databases] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [databaseName]
    );
    
    if (databases.length === 0) {
      console.log(`   ⚠️  Database '${databaseName}' does not exist\n`);
      console.log(`   💡 Creating it now...\n`);
      
      await connection.query(`CREATE DATABASE \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log(`   ✅ Database '${databaseName}' created!\n`);
    } else {
      console.log(`   ✅ Database '${databaseName}' exists\n`);
    }
    
    // Test 3: Try connecting to the database
    console.log(`   Step 3: Connecting to database '${databaseName}'...`);
    await connection.query(`USE \`${databaseName}\``);
    console.log(`   ✅ Successfully connected to database!\n`);
    
    await connection.end();
    return true;
    
  } catch (error) {
    console.log(`   ❌ Connection failed!\n`);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('   💡 Access Denied Error:\n');
      console.log('      - Your username or password is WRONG\n');
      console.log('      - Check your .env.local file\n');
      console.log('      - Try: mysql -u root -p (to test your password manually)\n');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('   💡 Connection Refused:\n');
      console.log('      - MySQL is NOT running\n');
      console.log('      - Start MySQL: brew services start mysql\n');
      console.log('      - Or: docker start mysql-geneveda\n');
    } else if (error.code === 'ENOTFOUND') {
      console.log('   💡 Host Not Found:\n');
      console.log('      - DB_HOST is incorrect in .env.local\n');
      console.log('      - For local: Use DB_HOST=localhost\n');
      console.log('      - Check your hosting panel for remote MySQL hostname\n');
    } else {
      console.log(`   💡 Error: ${error.message}\n`);
      console.log(`      Error code: ${error.code}\n`);
    }
    
    return false;
  }
}

async function main() {
  // Step 1: Check environment file
  const envExists = await checkEnvFile();
  
  if (!envExists) {
    console.log('⚠️  Please edit .env.local with your MySQL credentials, then run this script again.\n');
    process.exit(0);
  }
  
  // Step 2: Check if MySQL is running
  await checkMySQLRunning();
  
  // Step 3: Test connection
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  const connected = await testConnection();
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (connected) {
    console.log('🎉 SUCCESS! Your database is connected!\n');
    console.log('📝 Next steps:');
    console.log('   1. Run: npm run init-db (to create tables)');
    console.log('   2. Run: npm run test-db (to verify)');
    console.log('   3. Start your app: npm run dev\n');
  } else {
    console.log('❌ Could not connect to database\n');
    console.log('🔧 Try these solutions:\n');
    console.log('   1. Make sure MySQL is running');
    console.log('   2. Check your .env.local file has correct credentials');
    console.log('   3. Test manually: mysql -u root -p');
    console.log('   4. Run: npm run check-env (to see your settings)\n');
    console.log('💡 Need more help? Check BEGINNER_DATABASE_SETUP.md\n');
  }
}

main().catch(error => {
  console.error('\n❌ Unexpected error:', error.message);
  console.error('\n💡 Check your MySQL installation and try again.\n');
  process.exit(1);
});

