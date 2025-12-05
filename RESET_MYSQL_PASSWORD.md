# 🔑 Reset MySQL Root Password (Forgot Password)

**Don't worry!** Since MySQL is currently in safe mode, we can easily reset your password.

---

## 🎯 Quick Method (MySQL is Already in Safe Mode!)

Since your MySQL is already running in safe mode, this is actually perfect for resetting the password!

### Step 1: Connect to MySQL (No Password Needed)

Open Terminal and run:

```bash
/usr/local/mysql/bin/mysql -u root
```

You should connect without needing a password! ✅

### Step 2: Reset the Password

Once you're connected (you'll see `mysql>` prompt), run these commands:

```sql
-- Reset the password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
FLUSH PRIVILEGES;
EXIT;
```

**Replace `your_new_password` with a password you'll remember!**

**Example:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MySecurePass123!';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Restart MySQL Normally

After setting the password, restart MySQL normally:

```bash
# Exit MySQL if you haven't already (type EXIT; in MySQL)
# Stop safe mode
sudo pkill mysqld_safe
sudo pkill mysqld

# Wait a moment
sleep 3

# Start MySQL normally
sudo /usr/local/mysql/support-files/mysql.server start
```

### Step 4: Test the New Password

```bash
/usr/local/mysql/bin/mysql -u root -p
```

Enter your new password when prompted. If it works, you're all set! ✅

---

## 📝 Update Your .env.local File

After resetting the password, update your `.env.local` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_new_password
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

**Replace `your_new_password` with the password you just set!**

---

## ✅ Complete Setup After Password Reset

Once you've reset the password:

1. **Update `.env.local`** with the new password
2. **Test connection:**
   ```bash
   npm run test-db
   ```
3. **Create database:**
   ```bash
   npm run create-db
   ```
4. **Create tables:**
   ```bash
   npm run init-db
   ```

---

## 🔄 Alternative Method (If Safe Mode Doesn't Work)

If the above doesn't work, here's another method:

### Method 2: Stop MySQL and Start in Safe Mode Manually

```bash
# Stop any running MySQL
sudo pkill mysqld_safe
sudo pkill mysqld

# Start MySQL in safe mode
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &

# Wait a few seconds
sleep 5

# Connect (no password needed)
/usr/local/mysql/bin/mysql -u root
```

Then follow Step 2 above to reset the password.

---

## 💡 Password Tips

**Good password examples:**
- `MySecurePass123!`
- `GeneVeda2024!`
- `MyProject@2024`

**Make sure to:**
- ✅ Use something you'll remember
- ✅ Write it down somewhere safe (like in `.env.local`)
- ✅ Use a mix of letters, numbers, and special characters
- ❌ Don't use common passwords like "password" or "123456"

---

## 🆘 Troubleshooting

### Problem: "Access Denied" when trying to connect

**Solution:** Make sure MySQL is in safe mode:
```bash
# Check if MySQL is in safe mode
ps aux | grep mysqld | grep skip-grant-tables

# If not, start it in safe mode
sudo pkill mysqld
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &
```

### Problem: "ERROR 1045 (28000): Access denied"

**Solution:** You might need to use `sudo`:
```bash
sudo /usr/local/mysql/bin/mysql -u root
```

### Problem: MySQL won't start after password reset

**Solution:** Check the error log:
```bash
sudo tail -50 /usr/local/mysql/data/*.err
```

---

## 🎉 You're Done!

Once you've reset the password:
- ✅ Update `.env.local` with the new password
- ✅ MySQL Workbench can connect with the new password
- ✅ Your project can connect to the database
- ✅ Everything should work!

---

**Need help?** Run `npm run fix-mysql` after resetting the password to ensure MySQL is running normally!

