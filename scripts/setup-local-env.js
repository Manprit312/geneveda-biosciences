/**
 * Setup Local Environment
 * Updates .env.local for local development
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = `# Local Development Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=geneveda_biosciences
DB_PORT=3306

# Production Database Configuration (for deployment to Hostinger)
# Uncomment and use these when deploying:
# DB_HOST=localhost
# DB_USER=u896634865_manprit
# DB_PASSWORD=mnprt@Bharatail
# DB_NAME=u896634865_blogdb
# DB_PORT=3306
`;

console.log('🔧 Setting up local environment configuration...\n');

try {
  // Check if .env.local exists
  if (fs.existsSync(envPath)) {
    const currentContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if it already has localhost config
    if (currentContent.includes('DB_HOST=localhost') && currentContent.includes('geneveda_biosciences')) {
      console.log('✅ .env.local already configured for local development');
      console.log('\nCurrent configuration:');
      const lines = currentContent.split('\n');
      lines.forEach(line => {
        if (line.startsWith('DB_') && !line.startsWith('#')) {
          const [key, value] = line.split('=');
          if (key === 'DB_PASSWORD') {
            console.log(`   ${key}=${value ? '***' : '(empty - set your MySQL root password)'}`);
          } else {
            console.log(`   ${key}=${value || '(not set)'}`);
          }
        }
      });
      console.log('\n💡 If you need to update the password, edit .env.local manually');
    } else {
      // Backup existing file
      const backupPath = envPath + '.backup';
      fs.writeFileSync(backupPath, currentContent);
      console.log(`📦 Backed up existing .env.local to .env.local.backup`);
      
      // Write new config
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Updated .env.local for local development');
      console.log('\n⚠️  IMPORTANT: Update DB_PASSWORD with your MySQL root password!');
    }
  } else {
    // Create new file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local for local development');
    console.log('\n⚠️  IMPORTANT: Update DB_PASSWORD with your MySQL root password!');
  }
  
  console.log('\n📝 Next steps:');
  console.log('   1. Install MySQL: brew install mysql && brew services start mysql');
  console.log('   2. Set MySQL root password (if not set): mysql_secure_installation');
  console.log('   3. Create database: mysql -u root -p -e "CREATE DATABASE geneveda_biosciences;"');
  console.log('   4. Update DB_PASSWORD in .env.local with your MySQL root password');
  console.log('   5. Test connection: npm run test-db');
  console.log('   6. Initialize database: npm run init-db');
  
} catch (error) {
  console.error('❌ Error setting up environment:', error.message);
  console.error('\n💡 Manual setup:');
  console.error('   1. Edit .env.local and set:');
  console.error('      DB_HOST=localhost');
  console.error('      DB_USER=root');
  console.error('      DB_PASSWORD=your_mysql_password');
  console.error('      DB_NAME=geneveda_biosciences');
  console.error('      DB_PORT=3306');
  process.exit(1);
}

