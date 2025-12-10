# 🔍 How to Check if Admin Exists

## Issue: Cannot Connect from Local Machine

Remote MySQL connection from your local machine to Hostinger is failing. This is common because:
- Remote MySQL might not be enabled on Hostinger
- Your IP might not be whitelisted

## ✅ Solution: Check via phpMyAdmin (Easiest)

### Step 1: Login to Hostinger
1. Go to Hostinger hPanel
2. Navigate to: **Databases** → **phpMyAdmin**
3. Select database: `u896634865_manprit`

### Step 2: Check Admins Table
Run this SQL query:

```sql
SELECT id, username, email, name, role, active, created_at 
FROM admins;
```

**If you see results:** Admin exists! Note the email and you can login.

**If table doesn't exist:** Run this first:
```sql
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
```

### Step 3: Create Admin (if needed)

If no admin exists, create one:

1. **Generate password hash:**
   ```bash
   node generate-password.js "Admin123!"
   ```

2. **Copy the hash and use in SQL:**
   ```sql
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

## 🔧 Alternative: Enable Remote MySQL (For Local Testing)

If you want to test from local machine:

1. **Login to Hostinger hPanel**
2. **Go to:** Databases → Remote MySQL
3. **Add your IP:** `106.219.66.193` (or allow all: `0.0.0.0/0`)
4. **Save**

Then try again:
```bash
npm run check-admin
```

---

## 🚀 For Vercel Deployment

**Good news:** Vercel se connection kaam karega kyunki:
- Vercel ka IP whitelist ho sakta hai
- Ya aap `0.0.0.0/0` allow kar sakte hain

**Vercel par test karein:**
1. Deploy to Vercel
2. Visit: `https://your-app.vercel.app/api/test-db`
3. Check logs for connection status

---

## 📋 Quick Checklist

- [ ] Check via phpMyAdmin (easiest)
- [ ] If no admin, create via SQL in phpMyAdmin
- [ ] For local testing, enable Remote MySQL
- [ ] For Vercel, connection should work automatically

---

## 🎯 Recommended Approach

**For now, use phpMyAdmin:**
1. Login to Hostinger → phpMyAdmin
2. Run: `SELECT * FROM admins;`
3. If empty, create admin using SQL

**For Vercel deployment:**
- Connection will work automatically
- Admin can be created via API or phpMyAdmin

