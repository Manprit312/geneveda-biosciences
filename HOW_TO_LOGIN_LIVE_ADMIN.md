# 🔐 How to Login to Live Admin Panel on Vercel

Step-by-step guide to create admin credentials and login to your live admin panel.

---

## 🎯 Step 1: Create Admin User in Live Database

You need to create an admin user in your Hostinger database first. Here's how:

### Option A: Via phpMyAdmin (Easiest - Recommended)

1. **Login to Hostinger hPanel**
2. **Go to:** `Databases` → `phpMyAdmin`
3. **Select your database:** `u896634865_manprit`
4. **Click on:** `SQL` tab
5. **Run this SQL query:**

```sql
-- First, make sure admins table exists
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

-- Create your admin user
-- Replace 'admin@geneveda.com' with your email
-- Replace 'YourSecurePassword123!' with your desired password
-- Generate password hash first (see below)
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$YOUR_PASSWORD_HASH_HERE',
  'Admin User',
  'superadmin'
);
```

### Generate Password Hash

**Method 1: Online Tool (Quick)**
1. Go to: https://bcrypt-generator.com/
2. Enter your password (e.g., `Admin123!`)
3. Set rounds to `10`
4. Click "Generate Hash"
5. Copy the hash (starts with `$2a$10$`)
6. Replace `$2a$10$YOUR_PASSWORD_HASH_HERE` in the SQL above

**Method 2: Use the Script (More Secure)**
```bash
# In your project directory
node generate-password.js "YourPassword123!"
```

This will output the hash you need.

### Example SQL with Real Hash

After generating the hash, your SQL should look like:

```sql
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin User',
  'superadmin'
);
```

---

## 🌐 Step 2: Find Your Vercel Admin Login URL

Your admin login URL will be:

```
https://your-vercel-app-name.vercel.app/admin/login
```

**To find your exact URL:**
1. Go to Vercel Dashboard
2. Click on your project
3. Look at the "Domains" section
4. Your URL will be something like:
   - `https://geneveda-biosciences.vercel.app/admin/login`
   - Or your custom domain: `https://geneveda.com/admin/login`

---

## 🔑 Step 3: Login Credentials

Use the credentials you created in Step 1:

- **Email:** The email you used in the SQL (e.g., `admin@geneveda.com`)
- **Password:** The password you hashed (e.g., `Admin123!`)

---

## ✅ Step 4: Login Process

1. **Open your browser**
2. **Go to:** `https://your-app.vercel.app/admin/login`
3. **Enter your email:** `admin@geneveda.com` (or whatever you set)
4. **Enter your password:** `Admin123!` (or whatever you set)
5. **Click "Login"**
6. **You should be redirected to:** `/admin/dashboard`

---

## 🚨 Troubleshooting

### "Invalid credentials" Error

**Possible causes:**
- Wrong email or password
- Admin user doesn't exist in database
- Password hash was generated incorrectly

**Solution:**
1. Check if admin exists in database:
   ```sql
   SELECT * FROM admins WHERE email = 'admin@geneveda.com';
   ```
2. If no admin exists, create one (see Step 1)
3. If admin exists but login fails, verify password hash is correct

### "Cannot connect to database" Error

**This means Vercel can't connect to Hostinger MySQL**

**Solution:**
1. Check Vercel environment variables are set correctly
2. Verify Remote MySQL is enabled on Hostinger
3. See `VERCEL_HOSTINGER_SETUP.md` for detailed setup

### "Page not found" or 404

**Possible causes:**
- Wrong URL
- App not deployed yet

**Solution:**
1. Verify your Vercel deployment URL
2. Make sure the app is deployed
3. Check if `/admin/login` route exists

### Admin exists but can't login

**Check these:**
```sql
-- Verify admin is active
SELECT id, email, active, role FROM admins WHERE email = 'your-email@example.com';

-- If active = 0, activate it:
UPDATE admins SET active = 1 WHERE email = 'your-email@example.com';
```

---

## 📋 Quick Checklist

Before logging in, make sure:

- [ ] Admin user created in Hostinger database
- [ ] Password hash generated correctly
- [ ] Admin user has `active = 1` in database
- [ ] Vercel environment variables configured
- [ ] Vercel app deployed successfully
- [ ] Database connection working (test via `/api/test-db`)

---

## 🔄 Create Additional Admins

You can create more admins using the same SQL method:

```sql
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin2',
  'admin2@geneveda.com',
  '$2a$10$ANOTHER_HASH_HERE',
  'Second Admin',
  'admin'
);
```

Each admin needs:
- Unique email
- Unique username
- Valid password hash
- Role: `admin` or `superadmin`

---

## 🎯 Quick Start Example

**1. Generate password hash:**
```bash
node generate-password.js "MySecurePassword123!"
```

**2. Copy the hash and use in SQL:**
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

**3. Login at:**
```
https://your-app.vercel.app/admin/login
```

**4. Use credentials:**
- Email: `admin@geneveda.com`
- Password: `MySecurePassword123!`

---

## 💡 Pro Tips

1. **Use a strong password** - At least 12 characters with mix of letters, numbers, symbols
2. **Change password after first login** - For security (you'll need to update the hash in database)
3. **Save credentials securely** - Use a password manager
4. **Create backup admin** - Create a second admin account in case you lose access to the first

---

## 🆘 Still Can't Login?

**Check these in order:**

1. **Database connection:**
   - Visit: `https://your-app.vercel.app/api/test-db`
   - Should show success message

2. **Admin exists:**
   ```sql
   SELECT * FROM admins;
   ```

3. **Admin is active:**
   ```sql
   SELECT email, active FROM admins WHERE email = 'your-email@example.com';
   ```

4. **Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for database connection errors

5. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

---

**Need help?** Share:
1. Your Vercel app URL
2. Any error messages you see
3. Whether you've created the admin user in database


