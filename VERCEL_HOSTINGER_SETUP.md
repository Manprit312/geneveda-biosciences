# 🔗 Connecting Vercel (Frontend/Backend) to Hostinger MySQL Database

This guide will help you connect your Next.js app deployed on Vercel to your MySQL database on Hostinger.

## 📋 Overview

**Your Setup:**
- ✅ Frontend & Backend: Deployed on Vercel (Next.js app)
- ✅ Database: MySQL on Hostinger
- ⚠️ Need to: Configure Vercel to connect to Hostinger's remote MySQL

---

## 🎯 Step 1: Get Hostinger MySQL Connection Details

### From Hostinger Control Panel:

1. **Login to Hostinger** (hPanel)
2. **Go to:** `Databases` → `MySQL Databases`
3. **Find your database:** `u896634865_manprit`
4. **Note down these details:**
   - **Database Name:** `u896634865_manprit`
   - **Database User:** `u896634865_manprit`
   - **Database Password:** `mnprt@Bharatail`
   - **MySQL Host:** Usually something like:
     - `localhost` (if same server - but won't work from Vercel)
     - `mysql.hostinger.com` or similar
     - `46.202.161.241` (your FTP IP might be related)
     - Check your Hostinger panel for the exact MySQL hostname

### Find MySQL Hostname:

**Option A: Check Hostinger Panel**
- Look for "Remote MySQL" or "MySQL Host" in your database settings
- It might be shown as "Server" or "Host"

**Option B: Check Connection Strings**
- In Hostinger, look for "Connection String" or "Remote Access"
- The hostname will be in the format: `mysql.hostinger.com` or an IP address

**Option C: Common Hostinger MySQL Hostnames**
- `localhost` (only works on same server - NOT for Vercel)
- `mysql.hostinger.com`
- `mysql.yourdomain.com`
- An IP address like `46.202.161.241` (if remote access is enabled)

---

## 🔧 Step 2: Enable Remote MySQL Access on Hostinger

**Important:** By default, Hostinger MySQL only allows connections from the same server. You need to enable remote access.

### Enable Remote MySQL:

1. **Login to Hostinger hPanel**
2. **Go to:** `Databases` → `Remote MySQL`
3. **Add Access Host:**
   - **Option A (Less Secure - Easier):** Add `%` to allow all IPs
   - **Option B (More Secure):** Add Vercel's IP ranges (see below)

### Vercel IP Ranges (if you want to be more secure):

Vercel uses dynamic IPs, but you can add:
- `0.0.0.0/0` (allows all IPs - recommended for Vercel)
- Or check Vercel's documentation for their IP ranges

**Note:** Some Hostinger plans may not support remote MySQL. If you can't enable it, you may need to:
- Use a different database provider (like PlanetScale, Railway, or MongoDB Atlas)
- Or use Hostinger's hosting for your Next.js app instead of Vercel

---

## ⚙️ Step 3: Configure Vercel Environment Variables

### In Vercel Dashboard:

1. **Go to your Vercel project**
2. **Click:** `Settings` → `Environment Variables`
3. **Add these variables:**

```env
DB_HOST=your_hostinger_mysql_hostname
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
DB_SSL=false
```

**Important Notes:**
- Replace `your_hostinger_mysql_hostname` with the actual hostname from Step 1
- **DO NOT use `localhost`** - that won't work from Vercel
- Set these for **Production**, **Preview**, and **Development** environments

### Example Values:

```env
DB_HOST=mysql.hostinger.com
# OR
DB_HOST=46.202.161.241
# OR whatever Hostinger shows you

DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
DB_SSL=false
```

---

## 🔍 Step 4: Update Connection Configuration (if needed)

Your current connection config should work, but let's verify it handles remote connections properly. The current code already supports SSL configuration.

**If Hostinger requires SSL**, update `.env.local` (for local testing) and Vercel env vars:

```env
DB_SSL=true
```

---

## 🧪 Step 5: Test the Connection

### Option A: Test via Vercel Function Logs

1. **Deploy your app** (or redeploy after adding env vars)
2. **Go to:** Vercel Dashboard → Your Project → `Functions` tab
3. **Trigger an API route** that uses the database (like `/api/blogs`)
4. **Check the logs** for connection messages:
   - ✅ Should see: "✅ MySQL Connection Pool Created"
   - ❌ If error: Check the error message

### Option B: Create a Test API Route

Create `app/api/test-db/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { testConnection } from "@/lib/db/connection";

export async function GET() {
  try {
    const connected = await testConnection();
    
    if (connected) {
      return NextResponse.json({
        success: true,
        message: "Database connection successful!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Database connection failed",
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Database connection error",
      error: error.message,
    }, { status: 500 });
  }
}
```

Then visit: `https://your-app.vercel.app/api/test-db`

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot connect to MySQL server"

**Possible Causes:**
- Wrong `DB_HOST` (using `localhost` instead of remote hostname)
- Remote MySQL not enabled on Hostinger
- Firewall blocking connection

**Solutions:**
1. ✅ Verify `DB_HOST` is the remote hostname (not `localhost`)
2. ✅ Enable Remote MySQL in Hostinger
3. ✅ Check Hostinger allows connections from `0.0.0.0/0` or Vercel IPs

### Issue 2: "Access denied for user"

**Possible Causes:**
- Wrong username or password
- User doesn't have remote access permissions

**Solutions:**
1. ✅ Double-check username and password in Vercel env vars
2. ✅ Verify user has permissions in Hostinger
3. ✅ Try connecting with phpMyAdmin first to verify credentials

### Issue 3: "Connection timeout"

**Possible Causes:**
- Hostinger blocks remote connections
- Wrong port number
- Network firewall

**Solutions:**
1. ✅ Verify Remote MySQL is enabled
2. ✅ Check if port 3306 is open
3. ✅ Try using Hostinger's provided connection string

### Issue 4: "Hostinger doesn't support remote MySQL"

**If your Hostinger plan doesn't allow remote MySQL:**

**Option A: Use a Different Database Provider**
- **PlanetScale** (MySQL-compatible, free tier available)
- **Railway** (MySQL, easy setup)
- **Supabase** (PostgreSQL, free tier)
- **MongoDB Atlas** (MongoDB, free tier)

**Option B: Host on Hostinger Instead**
- Deploy your Next.js app on Hostinger
- Then you can use `localhost` for MySQL

**Option C: Use Database Proxy/Connection Pooler**
- Some services provide connection pooling that might work

---

## 📝 Step 6: Create Admin User (After Connection Works)

Once your database connection is working:

### Method 1: Via phpMyAdmin (Easiest)

1. **Login to Hostinger** → phpMyAdmin
2. **Select database:** `u896634865_manprit`
3. **Run SQL:**

```sql
-- First, ensure admins table exists
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

-- Generate password hash first (use: node generate-password.js "YourPassword")
-- Then insert admin:
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$YOUR_GENERATED_HASH_HERE',
  'Admin User',
  'superadmin'
);
```

### Method 2: Via API (After Admin is Created)

Once you have one admin, you can create more via the admin panel.

---

## ✅ Checklist

Before deploying, make sure:

- [ ] Found correct MySQL hostname from Hostinger (not `localhost`)
- [ ] Enabled Remote MySQL access in Hostinger
- [ ] Added all environment variables in Vercel
- [ ] Set env vars for Production, Preview, and Development
- [ ] Redeployed Vercel app after adding env vars
- [ ] Tested connection via API route
- [ ] Created admin user in database
- [ ] Can login to admin panel

---

## 🔐 Security Best Practices

1. **Use Strong Passwords:** For both database and admin accounts
2. **Limit Remote Access:** If possible, restrict to specific IPs (though Vercel makes this hard)
3. **Use SSL:** Enable `DB_SSL=true` if Hostinger supports it
4. **Rotate Credentials:** Change passwords periodically
5. **Monitor Logs:** Check Vercel function logs for connection issues

---

## 🆘 Still Having Issues?

### Debug Steps:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → `Logs`
   - Look for database connection errors

2. **Verify Environment Variables:**
   - Make sure they're set for the right environment
   - Check for typos in variable names

3. **Test Locally First:**
   - Create `.env.local` with Hostinger credentials
   - Test connection locally: `npm run test-db`
   - If it works locally but not on Vercel, it's likely an env var issue

4. **Contact Hostinger Support:**
   - Ask them for the correct MySQL hostname for remote connections
   - Verify your plan supports remote MySQL access

---

## 📞 Quick Reference

**Vercel Environment Variables:**
```
DB_HOST=<hostinger_mysql_hostname>
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
DB_SSL=false
```

**Test Connection:**
```
https://your-app.vercel.app/api/test-db
```

**Admin Login:**
```
https://your-app.vercel.app/admin/login
```

---

**Need help?** Let me know:
1. What MySQL hostname Hostinger shows you
2. Whether Remote MySQL is enabled
3. Any error messages from Vercel logs


