# 🗄️ Database Setup Guide for GeneVeda Biosciences

Welcome! This guide will help you set up your MySQL database for the GeneVeda Biosciences website.

## 🎯 Quick Start (Choose Your Path)

### 🌟 Option 1: Complete Automated Setup (Easiest!)

Run this one command and everything will be set up automatically:

```bash
npm run setup-complete
```

This will:
- ✅ Check/create `.env.local` configuration file
- ✅ Create your database
- ✅ Create all tables
- ✅ Test the connection

**Perfect for beginners!** 👶

---

### 🚀 Option 2: Step-by-Step Setup

If you prefer to do it step by step:

#### Step 1: Create Configuration File

Create a file named `.env.local` in your project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

> 💡 **Tip:** Copy from `env.example.txt` if you need a template!

#### Step 2: Create Database

```bash
npm run create-db
```

#### Step 3: Initialize Tables

```bash
npm run init-db
```

#### Step 4: Test Connection

```bash
npm run test-db
```

---

## 📚 Documentation

We have several guides depending on your experience level:

| Guide | Best For | Description |
|-------|----------|-------------|
| **[QUICK_START_DATABASE.md](./QUICK_START_DATABASE.md)** | ⚡ Quick start | Fast 3-step setup guide |
| **[BEGINNER_DATABASE_SETUP.md](./BEGINNER_DATABASE_SETUP.md)** | 🎓 Beginners | Detailed explanations and troubleshooting |
| **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** | 📖 Detailed setup | Complete setup with all options |
| **[README_DATABASE.md](./README_DATABASE.md)** | 🔧 Troubleshooting | Connection issues and fixes |

---

## 🛠️ Available Commands

| Command | What It Does |
|---------|--------------|
| `npm run setup-complete` | 🎯 **Complete automated setup** (database + tables) |
| `npm run create-db` | 📦 Creates the database if it doesn't exist |
| `npm run init-db` | 🗃️ Creates all tables in the database |
| `npm run test-db` | 🧪 Tests database connection |
| `npm run check-env` | 📋 Shows your current database settings |
| `npm run setup-db` | 🐳 Sets up MySQL using Docker |

---

## ❓ Common Questions

### Do I need to install MySQL?

**Yes!** You need MySQL installed and running. Choose one:

1. **Docker** (easiest): `npm run setup-db`
2. **Homebrew** (macOS): `brew install mysql && brew services start mysql`
3. **Manual**: Download from [mysql.com](https://dev.mysql.com/downloads/mysql/)

### What if I don't have a MySQL password?

Leave `DB_PASSWORD=` empty in your `.env.local` file, or set one:

```bash
mysqladmin -u root password 'your_password'
```

### What if MySQL is not running?

**macOS (Homebrew):**
```bash
brew services start mysql
```

**Docker:**
- Open Docker Desktop
- The container should auto-start

**Windows:**
- Open Services app
- Find "MySQL" service
- Click "Start"

---

## 🔍 Verify Your Setup

After setup, verify everything works:

```bash
# Check your configuration
npm run check-env

# Test connection
npm run test-db
```

You should see ✅ success messages!

---

## 🚨 Troubleshooting

### "Cannot connect to MySQL"

**Solution:**
1. Make sure MySQL is running
2. Check your `.env.local` file exists
3. Verify `DB_HOST=localhost` (for local development)

### "Access Denied"

**Solution:**
1. Check your password in `.env.local`
2. Try connecting manually: `mysql -u root -p`
3. Reset password if needed (see guides above)

### "Database does not exist"

**Solution:**
```bash
npm run create-db
```

### "DB_PASSWORD is not set"

**Solution:**
- Make sure `.env.local` file exists
- Even if empty, include: `DB_PASSWORD=`

---

## 📖 What Gets Created?

When you run the setup:

### Database
- **Name:** `geneveda_biosciences` (or whatever you set in `DB_NAME`)
- **Character Set:** UTF-8 (supports all languages)

### Tables
- **blogs** - Stores all blog posts with:
  - Title, slug, content, excerpt
  - Author information
  - Category, tags
  - Images, read time
  - Published status, views
  - Created/updated timestamps

---

## 🎓 For Beginners

If you're new to databases, here's what you need to know:

### What is a Database?
A database is like a digital filing cabinet where your website stores information (blog posts, users, etc.).

### What is MySQL?
MySQL is a database system - it's the software that manages your data.

### What is a Table?
A table is like a spreadsheet with rows (records) and columns (fields). For example, the `blogs` table stores all your blog posts.

### What is .env.local?
This file stores your database connection settings (like a password). It's kept secret and not shared publicly.

---

## ✅ Success Checklist

After setup, you should have:

- [ ] `.env.local` file created
- [ ] Database created
- [ ] Tables initialized
- [ ] Connection test successful
- [ ] Ready to start app: `npm run dev`

---

## 🚀 Next Steps

Once your database is set up:

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Visit your site:**
   - Open: http://localhost:3000
   - Check the blog section

3. **Create blog posts:**
   - Use the admin API routes
   - Or insert data directly into the database

---

## 📞 Need Help?

1. **Check the guides:**
   - Start with `QUICK_START_DATABASE.md`
   - See `BEGINNER_DATABASE_SETUP.md` for detailed help

2. **Run diagnostics:**
   ```bash
   npm run check-env    # See your settings
   npm run test-db      # Test connection
   ```

3. **Check MySQL:**
   ```bash
   # Is MySQL running?
   brew services list    # macOS
   docker ps            # Docker
   ```

---

## 🎉 You're All Set!

Your database is now ready to store blog posts and other data for your GeneVeda Biosciences website!

**Happy coding!** 🚀








