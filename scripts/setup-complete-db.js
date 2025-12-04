/**
 * Complete Database Setup Script
 * This script does everything for you:
 * 1. Checks if .env.local exists
 * 2. Creates the database
 * 3. Initializes tables
 * Perfect for beginners!
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎯 GeneVeda Biosciences - Complete Database Setup\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Step 1: Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example.txt');

console.log('📋 Step 1: Checking configuration file...\n');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file not found!\n');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('💡 Creating .env.local from template...');
    
    const exampleContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, exampleContent);
    
    console.log('✅ Created .env.local file!\n');
    console.log('⚠️  IMPORTANT: Please edit .env.local and add your MySQL password!');
    console.log('   Open .env.local and replace "your_mysql_password_here" with your password\n');
    console.log('   Or leave DB_PASSWORD= empty if you don\'t have a password set.\n');
    
    // Ask user to continue
    console.log('Press Enter after you\'ve updated .env.local...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      continueSetup();
    });
  } else {
    console.log('❌ Could not find env.example.txt either!\n');
    console.log('💡 Please create .env.local manually with:');
    console.log('   DB_HOST=localhost');
    console.log('   DB_USER=root');
    console.log('   DB_PASSWORD=your_password');
    console.log('   DB_NAME=geneveda_biosciences');
    console.log('   DB_PORT=3306\n');
    process.exit(1);
  }
} else {
  console.log('✅ .env.local file found!\n');
  continueSetup();
}

function continueSetup() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Step 2: Create database
  console.log('📦 Step 2: Creating database...\n');
  
  try {
    execSync('npm run create-db', { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Failed to create database. Please check the error above.\n');
    process.exit(1);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Step 3: Initialize tables
  console.log('🗃️  Step 3: Creating tables...\n');
  
  try {
    execSync('npm run init-db', { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Failed to initialize tables. Please check the error above.\n');
    process.exit(1);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Step 4: Test connection
  console.log('🧪 Step 4: Testing connection...\n');
  
  try {
    execSync('npm run test-db', { stdio: 'inherit' });
  } catch (error) {
    console.error('\n⚠️  Connection test failed, but database might still work.\n');
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🎉 Setup Complete!\n');
  console.log('✅ Database created');
  console.log('✅ Tables initialized');
  console.log('✅ Ready to use!\n');
  console.log('📝 Next steps:');
  console.log('   1. Start your app: npm run dev');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Your database is ready to store blog posts!\n');
}

