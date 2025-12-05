# 🔧 Fix MySQL Workbench Connection Issue

I can see your MySQL Workbench shows "Local instance 3306" as **Stopped**. Here's how to fix it!

---

## 🔍 What's Happening

Your MySQL is currently running in **"safe mode"** (skip-grant-tables), which means:
- ✅ MySQL process is running
- ❌ But it's not accessible normally (that's why Workbench shows "Stopped")
- ❌ It's not listening on port 3306 properly

---

## ✅ Solution: Restart MySQL Normally

### Step 1: Stop Safe Mode MySQL

Open Terminal and run:

```bash
# Stop the safe mode MySQL
sudo pkill mysqld_safe
sudo pkill mysqld

# Wait a few seconds
sleep 3
```

### Step 2: Start MySQL Normally

```bash
# Start MySQL normally
sudo /usr/local/mysql/support-files/mysql.server start
```

**Alternative method (if above doesn't work):**

```bash
# Start MySQL using mysqld_safe (normal mode)
sudo /usr/local/mysql/bin/mysqld_safe --user=mysql &
```

### Step 3: Verify MySQL is Running

```bash
# Check if MySQL is running
ps aux | grep mysqld | grep -v grep

# Check if port 3306 is listening
lsof -i :3306
```

You should see MySQL processes **without** `--skip-grant-tables` flag.

---

## 🔌 Connect in MySQL Workbench

### Step 1: Set/Reset MySQL Password (If Needed)

If you need to set a password for the root user:

```bash
# Connect to MySQL (might work without password if safe mode was just stopped)
/usr/local/mysql/bin/mysql -u root

# Once connected, run:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password_here';
FLUSH PRIVILEGES;
EXIT;
```

**Replace `your_password_here` with a password you'll remember!**

### Step 2: Connect in MySQL Workbench

1. **In MySQL Workbench**, click on your "Local instance 3306" connection
2. **Or create a new connection:**
   - Click the "+" icon next to "MySQL Connections"
   - Connection Name: `Local instance 3306` (or any name)
   - Hostname: `127.0.0.1` or `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: Click "Store in Keychain" and enter your password
3. **Click "Test Connection"** - it should work!
4. **Click "OK"** to save
5. **Double-click the connection** to connect

---

## ✅ Verify Everything Works

### Test 1: Command Line Connection

```bash
/usr/local/mysql/bin/mysql -u root -p
```

Enter your password. If you can connect, you're good!

### Test 2: Check Port 3306

```bash
lsof -i :3306
```

You should see MySQL listening on port 3306.

### Test 3: Test from Your Project

```bash
cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences
npm run test-db
```

---

## 📝 Update Your .env.local File

Make sure your `.env.local` file has the correct password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

**Replace `your_password_here` with the password you set in Step 1!**

---

## 🚀 Next Steps

Once MySQL is running normally and Workbench can connect:

1. ✅ **Create your database:**
   ```bash
   npm run create-db
   ```

2. ✅ **Create tables:**
   ```bash
   npm run init-db
   ```

3. ✅ **Test connection:**
   ```bash
   npm run test-db
   ```

4. ✅ **Start your app:**
   ```bash
   npm run dev
   ```

---

## 🆘 Troubleshooting

### Problem: "Access Denied" in Workbench

**Solution:** 
- Make sure you set the password correctly
- Try resetting the password (see Step 1 above)
- Check that you're using the correct username (`root`)

### Problem: MySQL won't start normally

**Solution:**
```bash
# Check MySQL error log
sudo tail -50 /usr/local/mysql/data/*.err

# Or check system logs
sudo tail -50 /var/log/system.log | grep mysql
```

### Problem: Port 3306 still not listening

**Solution:**
```bash
# Check if something else is using port 3306
sudo lsof -i :3306

# If MySQL is running but not on 3306, check MySQL config
sudo find /usr/local/mysql -name "my.cnf"
```

---

## 💡 Quick Reference

**Start MySQL:**
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

**Stop MySQL:**
```bash
sudo /usr/local/mysql/support-files/mysql.server stop
```

**Check MySQL Status:**
```bash
ps aux | grep mysqld | grep -v grep
```

**Connect to MySQL:**
```bash
/usr/local/mysql/bin/mysql -u root -p
```

---

**Once MySQL is running normally, MySQL Workbench will be able to connect!** 🎉

