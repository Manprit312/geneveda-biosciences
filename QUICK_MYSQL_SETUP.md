# ⚡ Quick MySQL Setup Guide

**Perfect for beginners!** Get your MySQL database running in 5 minutes.

---

## 🎯 The Big Picture

- ✅ You **already have MySQL** installed and running on port 3306
- ✅ You **don't need** a separate MySQL server for this project
- ✅ One MySQL server can host **many databases** (like different folders)
- ✅ Your project just needs its own **database name**: `geneveda_biosciences`

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Configuration File

Create `.env.local` in your project root:

```bash
cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences
```

Create the file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

**Replace `your_mysql_password` with your actual MySQL root password!**

> 💡 **Don't know your password?** 
> - If you never set one, try leaving it empty: `DB_PASSWORD=`
> - Or check `CHANGE_MYSQL_PASSWORD.md` to reset it

### Step 2: Run Setup Script

```bash
./scripts/setup-mysql-local.sh
```

This script will:
- ✅ Check if MySQL is installed
- ✅ Check if MySQL is running
- ✅ Help you fix any issues
- ✅ Create `.env.local` if it doesn't exist
- ✅ Test the connection

### Step 3: Create Database and Tables

```bash
# Create the database
npm run create-db

# Create the tables
npm run init-db

# Test everything works
npm run test-db
```

---

## ✅ You're Done!

If `npm run test-db` shows ✅ SUCCESS, you're all set!

Start your app:
```bash
npm run dev
```

---

## ❓ Common Questions

### Q: I have MySQL running on port 3306 for another project. Can I still use it?
**A:** YES! One MySQL server can handle multiple databases. Just use different database names for each project.

### Q: Do I need to change the port?
**A:** NO! Port 3306 is for the MySQL server. Each project uses a different database name inside that server.

### Q: What if MySQL is not running?
**A:** Start it:
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

### Q: What if I get "Access Denied"?
**A:** Your password is wrong. Check your `.env.local` file or reset your MySQL password.

---

## 🆘 Need More Help?

- **Detailed Guide:** See `SETUP_MYSQL_LOCAL.md`
- **Beginner's Guide:** See `BEGINNER_DATABASE_SETUP.md`
- **Password Reset:** See `QUICK_RESET_PASSWORD.md`
- **Check Settings:** Run `npm run check-env`

---

## 📋 Quick Command Reference

| Command | What it does |
|---------|-------------|
| `./scripts/setup-mysql-local.sh` | Run setup script |
| `npm run create-db` | Create database |
| `npm run init-db` | Create tables |
| `npm run test-db` | Test connection |
| `npm run check-env` | Show settings |

---

**That's it!** Your MySQL is ready to use! 🎉

