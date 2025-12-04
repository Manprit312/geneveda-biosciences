/**
 * Test MySQL Password
 * Helps you find the right password for your MySQL root user
 */

const { execSync } = require('child_process');
const mysqlPath = '/usr/local/mysql/bin/mysql';

console.log('🔐 MySQL Password Tester\n');
console.log('This will help you test your MySQL root password.\n');

// Common default passwords to try
const passwordsToTry = [
  '', // No password
  'root',
  'password',
  'admin',
  'mysql',
];

console.log('Testing common passwords...\n');

let foundPassword = null;

for (const password of passwordsToTry) {
  try {
    const passwordArg = password ? `-p${password}` : '';
    const command = `${mysqlPath} -u root ${passwordArg} -e "SELECT 1;" 2>&1`;
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    
    if (!result.includes('ERROR') && !result.includes('Access denied')) {
      foundPassword = password || '(empty - no password)';
      console.log(`✅ SUCCESS! Password found: ${foundPassword}`);
      break;
    }
  } catch (error) {
    // Continue to next password
  }
}

if (!foundPassword) {
  console.log('❌ Could not auto-detect password.\n');
  console.log('💡 Next steps:');
  console.log('   1. Open MySQL Workbench');
  console.log('   2. Check your saved connections for the root password');
  console.log('   3. Or try connecting manually:');
  console.log(`      ${mysqlPath} -u root -p`);
  console.log('   4. Once you know the password, update .env.local:');
  console.log('      DB_PASSWORD=your_password_here');
  console.log('\n   5. Or reset the password if needed:');
  console.log('      - Stop MySQL: sudo /usr/local/mysql/support-files/mysql.server stop');
  console.log('      - Start in safe mode: sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables &');
  console.log('      - Reset: /usr/local/mysql/bin/mysql -u root -e "ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'newpassword\';"');
} else {
  console.log('\n📝 Update your .env.local file:');
  if (foundPassword === '(empty - no password)') {
    console.log('   DB_PASSWORD=');
  } else {
    console.log(`   DB_PASSWORD=${foundPassword}`);
  }
  console.log('\nThen run: npm run test-db');
}

