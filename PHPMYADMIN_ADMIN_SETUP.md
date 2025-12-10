# 🔐 Admin Setup via phpMyAdmin

## Step 1: Login to phpMyAdmin

1. **Open:** http://auth-db1825.hstgr.io/
2. **Login with:**
   - **Username:** `u896634865_manprit`
   - **Password:** `mnprt@Bharatail`

---

## Step 2: Select Database

1. Left sidebar mein **`u896634865_manprit`** database select karein
2. Ya top menu se database dropdown se select karein

---

## Step 3: Check if Admins Table Exists

1. Left sidebar mein **`admins`** table dikh raha hai?
   - ✅ **Haan:** Step 4 par jao
   - ❌ **Nahi:** Pehle table create karein (Step 3a)

### Step 3a: Create Admins Table (if doesn't exist)

1. Top menu se **"SQL"** tab click karein
2. Ye SQL query paste karein:

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

3. **"Go"** button click karein

---

## Step 4: Check Existing Admins

1. Left sidebar se **`admins`** table click karein
2. Ya top menu se **"Browse"** tab click karein

**Agar data dikhe:**
- ✅ Admin exists! Email note karein aur login kar sakte hain

**Agar empty hai:**
- ❌ No admin. Step 5 se admin create karein

---

## Step 5: Create Admin User

### Option A: Via SQL Tab (Recommended)

1. Top menu se **"SQL"** tab click karein
2. Pehle password hash generate karein:

**Terminal mein:**
```bash
cd geneveda-biosciences
node generate-password.js "Admin123!"
```

3. Output se hash copy karein (starts with `$2a$10$`)

4. phpMyAdmin SQL tab mein ye query paste karein:

```sql
INSERT INTO admins (username, email, password_hash, name, role) 
VALUES (
  'admin',
  'admin@geneveda.com',
  '$2a$10$PASTE_YOUR_HASH_HERE',
  'Admin User',
  'superadmin'
);
```

5. **"Go"** button click karein

### Option B: Via Insert Tab

1. **`admins`** table select karein
2. Top menu se **"Insert"** tab click karein
3. Fill karein:
   - **username:** `admin`
   - **email:** `admin@geneveda.com`
   - **password_hash:** (generate hash first - see Option A)
   - **name:** `Admin User`
   - **role:** `superadmin`
   - **active:** `1` (checkbox)
4. **"Go"** button click karein

---

## Step 6: Verify Admin Created

1. **`admins`** table par wapas jao
2. **"Browse"** tab se check karein
3. Aapko admin user dikhna chahiye

---

## Step 7: Login to Admin Panel

### Local Development:
```
http://localhost:3000/admin/login
```

### Live (Vercel):
```
https://your-app.vercel.app/admin/login
```

**Credentials:**
- **Email:** `admin@geneveda.com` (ya jo aapne set kiya)
- **Password:** `Admin123!` (ya jo aapne set kiya)

---

## 🔍 Quick Check Query

Agar sirf check karna hai, SQL tab mein ye run karein:

```sql
SELECT id, username, email, name, role, active, created_at 
FROM admins;
```

---

## 📋 Example: Complete Admin Creation

**1. Generate password hash:**
```bash
node generate-password.js "MySecurePassword123!"
```

**Output:**
```
Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

**2. phpMyAdmin SQL tab mein:**
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

**3. Login:**
- Email: `admin@geneveda.com`
- Password: `MySecurePassword123!`

---

## 🚨 Troubleshooting

### "Table doesn't exist"
- Step 3a follow karein - table create karein

### "Duplicate entry"
- Admin already exists with that email
- Different email use karein ya existing admin se login karein

### "Cannot login"
- Password hash sahi hai? Verify karein
- Admin active hai? (`active = 1` check karein)

---

## ✅ Success Checklist

- [ ] phpMyAdmin login successful
- [ ] Database `u896634865_manprit` selected
- [ ] `admins` table exists
- [ ] Admin user created
- [ ] Can login to admin panel

