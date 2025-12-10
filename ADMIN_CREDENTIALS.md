# 🔐 Admin Login Credentials

## Default Admin Credentials (If Created)

**Email:** `admin@geneveda.com`  
**Password:** `Admin123!`

**Login URL:**
- Local: `http://localhost:3000/admin/login`
- Live: `https://your-app.vercel.app/admin/login`

---

## ⚠️ If Admin Not Created Yet

Agar admin abhi create nahi hua hai, to pehle create karein:

### Method 1: Via phpMyAdmin (Recommended)

1. **Login:** http://auth-db1825.hstgr.io/
   - Username: `u896634865_manprit`
   - Password: `mnprt@Bharatai1`

2. **Select database:** `u896634865_manprit`

3. **SQL tab mein ye query run karein:**

```sql
-- Pehle table create karein (agar nahi hai)
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

-- Admin create karein (Password: Admin123!)
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$0HQRoCRhnmsGvdMq/uatiul/kCUTr7FrnfRWDZJt4uIjR3z341bpS',
  'Admin User',
  'superadmin'
);
```

**Password Hash:** `$2a$10$0HQRoCRhnmsGvdMq/uatiul/kCUTr7FrnfRWDZJt4uIjR3z341bpS`  
**Password:** `Admin123!`

### Method 2: Custom Credentials

Agar different credentials chahiye:

1. **Password hash generate karein:**
   ```bash
   node generate-password.js "YourPassword123!"
   ```

2. **phpMyAdmin SQL tab mein:**
   ```sql
   INSERT INTO admins (username, email, password_hash, name, role) 
   VALUES (
     'admin',
     'your-email@example.com',
     '$2a$10$PASTE_YOUR_HASH_HERE',
     'Admin User',
     'superadmin'
   );
   ```

---

## 🔍 Check Existing Admins

phpMyAdmin SQL tab mein:

```sql
SELECT id, username, email, name, role, active FROM admins;
```

---

## 📋 Quick Reference

### Default Admin (If Created)
- **Email:** `admin@geneveda.com`
- **Password:** `Admin123!`
- **Role:** `superadmin`

### Login URLs
- **Local:** http://localhost:3000/admin/login
- **Live:** https://your-app.vercel.app/admin/login

### Database Access
- **phpMyAdmin:** http://auth-db1825.hstgr.io/
- **Username:** `u896634865_manprit`
- **Password:** `mnprt@Bharatail`

---

## ✅ After Creating Admin

1. **Login to admin panel:**
   - Go to: `http://localhost:3000/admin/login`
   - Email: `admin@geneveda.com`
   - Password: `Admin123!`

2. **You should see:**
   - Admin Dashboard
   - Options to manage blogs, services, etc.

---

## 🚨 Troubleshooting

### "Invalid credentials"
- Check if admin exists in database
- Verify password hash is correct
- Make sure admin is active (`active = 1`)

### "Cannot login"
- Check database connection
- Verify admin was created successfully
- Check browser console for errors

