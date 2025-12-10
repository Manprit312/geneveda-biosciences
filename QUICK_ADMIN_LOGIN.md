# 🔐 Quick Admin Login Guide

## Step 1: Create Admin User

### Method A: Using Script (Recommended)

```bash
cd geneveda-biosciences
npm run create-admin admin@geneveda.com "YourPassword123!" admin "Admin User"
```

Ya simple:
```bash
npm run create-admin
# Default: admin@geneveda.com / admin123
```

### Method B: Using Prisma (If script doesn't work)

Create a file `create-admin-prisma.js`:

```javascript
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);
  const email = args[0] || "admin@geneveda.com";
  const password = args[1] || "admin123";
  const username = args[2] || email.split("@")[0];
  const name = args[3] || "Admin User";

  try {
    // Check if admin exists
    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("❌ Admin with this email already exists");
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        passwordHash,
        name,
        role: "superadmin",
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${username}`);
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
```

Run it:
```bash
node create-admin-prisma.js admin@geneveda.com "YourPassword123!"
```

### Method C: Direct SQL (phpMyAdmin)

1. Login to Hostinger → phpMyAdmin
2. Select database: `u896634865_manprit`
3. Go to SQL tab
4. Run:

```sql
-- Generate password hash first using: node generate-password.js "YourPassword"
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$PASTE_HASH_HERE',
  'Admin User',
  'superadmin'
);
```

---

## Step 2: Login URL

### Local Development:
```
http://localhost:3000/admin/login
```

### Live (Vercel):
```
https://your-app.vercel.app/admin/login
```

---

## Step 3: Login Credentials

Use the credentials you created in Step 1:
- **Email:** `admin@geneveda.com` (or whatever you set)
- **Password:** `YourPassword123!` (or whatever you set)

---

## ✅ Quick Test

1. **Create admin:**
   ```bash
   npm run create-admin admin@geneveda.com "Admin123!"
   ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **Login:**
   - Go to: `http://localhost:3000/admin/login`
   - Email: `admin@geneveda.com`
   - Password: `Admin123!`

---

## 🚨 Troubleshooting

### "Invalid credentials"
- Check if admin exists in database
- Verify password hash is correct
- Make sure admin is active (`active = 1`)

### "Cannot connect to database"
- Check `.env.local` has correct `DATABASE_URL`
- Verify database connection works

### "Admin already exists"
- Use different email
- Or login with existing credentials

