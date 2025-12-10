# 🔐 How to Add Admin User to Live Database

Since your app is deployed on Vercel, here are the best ways to create an admin user in your live database.

## 🎯 Method 1: Create Admin via SQL (Recommended - Easiest)

### Step 1: Access Your Database

You can access your MySQL database via:
- **phpMyAdmin** (if your hosting provides it)
- **MySQL command line** (if you have SSH access)
- **Database management tool** (like MySQL Workbench, DBeaver, etc.)

### Step 2: Run This SQL Query

Based on your database credentials:
- Database: `u896634865_manprit`
- Username: `u896634865_manprit`

**Run this SQL in your database:**

```sql
-- First, make sure the admins table exists (it should if migrations ran)
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

-- Create admin user
-- Replace 'your-email@example.com' and 'YourPassword123!' with your desired credentials
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'your-email@example.com',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq',  -- See below for generating this
  'Admin User',
  'superadmin'
);
```

### Step 3: Generate Password Hash

You need to generate a bcrypt hash for your password. Use one of these methods:

**Option A: Online Tool (Quick)**
1. Go to: https://bcrypt-generator.com/
2. Enter your desired password
3. Set rounds to `10`
4. Copy the generated hash
5. Replace the `password_hash` value in the SQL above

**Option B: Node.js Script (More Secure)**

Create a file `generate-password.js`:

```javascript
const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nUse this hash in your SQL query:');
console.log(hash);
```

Run it:
```bash
node generate-password.js "YourSecurePassword123!"
```

**Option C: Use the create-admin script with live DB**

See Method 2 below.

---

## 🚀 Method 2: Run Create-Admin Script with Live DB Credentials

### Step 1: Create a temporary script file

Create `create-admin-live.js` in your project:

```javascript
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  // Use your LIVE database credentials
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",  // Your live DB host
    user: process.env.DB_USER || "u896634865_manprit",
    password: process.env.DB_PASSWORD || "mnprt@Bharatail",
    database: process.env.DB_NAME || "u896634865_manprit",
    port: parseInt(process.env.DB_PORT || "3306"),
  });

  try {
    // Ensure admins table exists
    await connection.execute(`
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
    `);

    // Get admin details from command line arguments
    const args = process.argv.slice(2);
    const email = args[0] || "admin@geneveda.com";
    const password = args[1] || "admin123";
    const username = args[2] || email.split("@")[0];
    const name = args[3] || "Admin User";

    // Check if admin already exists
    const [existing] = await connection.execute(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      console.log("❌ Admin with this email already exists");
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    await connection.execute(
      `INSERT INTO admins (username, email, password_hash, name, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, passwordHash, name, "superadmin"]
    );

    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${username}`);
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createAdmin();
```

### Step 2: Create .env file with live credentials

Create `.env.live` file (don't commit this!):

```env
DB_HOST=localhost
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
```

### Step 3: Run the script

```bash
# Install dependencies if needed
npm install bcryptjs mysql2 dotenv

# Run with custom credentials
DB_HOST=your_host DB_USER=u896634865_manprit DB_PASSWORD=mnprt@Bharatail DB_NAME=u896634865_manprit node create-admin-live.js admin@example.com "SecurePassword123!" admin "Admin Name"
```

---

## 📝 Method 3: Create Admin via API (If you have a temporary endpoint)

If you want to create an admin via API, you could temporarily add an endpoint, but this is less secure. Only use if you can secure it properly.

---

## ✅ After Creating Admin

### Step 1: Login to Admin Panel

1. Go to: `https://your-vercel-app.vercel.app/admin/login`
2. Enter your email and password
3. You should be redirected to the admin dashboard

### Step 2: Start Adding Data

Once logged in, you can:
- **Add Blog Posts:** `/admin/blogs/new`
- **Add Services:** `/admin/services/new`
- **Add Page Content:** `/admin/page-content/new`
- **Manage Settings:** `/admin/settings`

---

## 🔒 Security Best Practices

1. **Use a strong password** - At least 12 characters with mix of letters, numbers, and symbols
2. **Change default password** - After first login, change it immediately
3. **Use unique email** - Don't use a common email
4. **Delete temporary scripts** - After creating admin, remove any scripts with credentials
5. **Never commit credentials** - Don't push `.env` files to Git

---

## 🚨 Troubleshooting

### "Cannot connect to database"
- Check if your hosting allows remote MySQL connections
- Verify the `DB_HOST` - for shared hosting, it's often `localhost`
- Check if your IP is whitelisted (if required)

### "Access denied"
- Verify username and password are correct
- Check if user has permissions on the database
- Ensure database name is correct

### "Table doesn't exist"
- The migrations should run automatically on first API call
- Or run the SQL to create the table manually (see Method 1)

### "Admin login fails"
- Verify password hash was generated correctly
- Check if admin account is active (`active = 1`)
- Ensure email matches exactly (case-sensitive)

---

## 📋 Quick SQL Template

Here's a ready-to-use SQL template. Just replace the email and generate the password hash:

```sql
-- Generate password hash first using one of the methods above
-- Then use it here:

INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$YOUR_GENERATED_HASH_HERE',  -- Replace this!
  'Admin User',
  'superadmin'
);
```

---

## 🎯 Recommended Approach

**For your situation, I recommend Method 1 (SQL):**
1. It's the fastest and most direct
2. No need to set up local environment
3. Works immediately
4. You can use phpMyAdmin if your hosting provides it

**Steps:**
1. Login to your hosting control panel
2. Open phpMyAdmin (or your database tool)
3. Select database `u896634865_manprit`
4. Go to SQL tab
5. Generate password hash (use bcrypt-generator.com)
6. Run the INSERT SQL query
7. Login to your Vercel app admin panel!

---

**Need help?** Let me know which method you'd like to use and I can guide you through it step-by-step!



