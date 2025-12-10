// Quick script to generate bcrypt password hash for admin user
// Usage: node generate-password.js "YourPassword123!"

const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';

if (!password) {
  console.error('❌ Please provide a password as an argument');
  console.log('Usage: node generate-password.js "YourPassword123!"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\n✅ Password Hash Generated!\n');
console.log('Password:', password);
console.log('Hash:', hash);
console.log('\n📋 Use this SQL query:\n');
console.log(`INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'your-email@example.com',
  '${hash}',
  'Admin User',
  'superadmin'
);\n`);



