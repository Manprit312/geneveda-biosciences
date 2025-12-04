# 🚀 Beginner's Guide: Setting Up Your Database

Welcome! This guide will help you set up a MySQL database for your GeneVeda Biosciences website. Don't worry if you're new to databases - we'll walk through everything step by step!

## 📚 What is a Database?

Think of a database like a digital filing cabinet where your website stores information:
- Blog posts
- User data
- Settings
- And more!

For this project, we use **MySQL** - a popular and reliable database system.

---

## 🎯 Quick Start (3 Steps!)

### Step 1: Install MySQL (if you don't have it)

**Option A: Using Docker (Easiest - Recommended for Beginners)**

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Open Docker Desktop
3. Run this command in your terminal:
   ```bash
   npm run setup-db
   ```

**Option B: Using Homebrew (macOS)**

```bash
brew install mysql
brew services start mysql
```

**Option C: Manual Installation**

Download MySQL from: https://dev.mysql.com/downloads/mysql/

---

### Step 2: Create Configuration File

1. Create a file named `.env.local` in your project folder
2. Copy the content from `.env.local.example` (or use this template):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

3. Replace `your_mysql_password_here` with your actual MySQL password

> **💡 Don't have a MySQL password?** 
> - If you just installed MySQL, the default might be empty (leave it blank)
> - Or set a password: `mysqladmin -u root password 'yourpassword'`

---

### Step 3: Create the Database

Run this command:

```bash
npm run create-db
```

This will:
- ✅ Connect to MySQL
- ✅ Create the database if it doesn't exist
- ✅ Tell you what to do next

---

## ✅ Verify Everything Works

After creating the database, test the connection:

```bash
npm run test-db
```

You should see: `✅ SUCCESS! Connected to: localhost`

---

## 📋 Complete Setup Checklist

Follow these steps in order:

1. [ ] Install MySQL (or Docker)
2. [ ] Start MySQL service
3. [ ] Create `.env.local` file with your credentials
4. [ ] Run `npm run create-db` to create the database
5. [ ] Run `npm run init-db` to create tables
6. [ ] Run `npm run test-db` to verify connection
7. [ ] Start your app: `npm run dev`

---

## 🛠️ Available Commands

Once everything is set up, you have these helpful commands:

| Command | What it does |
|---------|-------------|
| `npm run create-db` | Creates the database (if it doesn't exist) |
| `npm run init-db` | Creates all tables in the database |
| `npm run test-db` | Tests if you can connect to the database |
| `npm run check-env` | Shows your current database settings |

---

## ❓ Common Questions

### Q: What if I forgot my MySQL password?

**A:** You can reset it:

1. Stop MySQL:
   ```bash
   brew services stop mysql
   ```

2. Start MySQL in safe mode (skip password):
   ```bash
   sudo mysqld_safe --skip-grant-tables &
   ```

3. Connect without password:
   ```bash
   mysql -u root
   ```

4. Change password:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. Restart MySQL normally:
   ```bash
   brew services start mysql
   ```

### Q: What if MySQL is not running?

**A:** Start it:

- **Docker:** Open Docker Desktop
- **Homebrew:** `brew services start mysql`
- **Windows:** Open Services app, find MySQL, click Start

### Q: Can I use a different database name?

**A:** Yes! Just change `DB_NAME` in your `.env.local` file:

```env
DB_NAME=my_custom_name
```

### Q: What does "Access Denied" mean?

**A:** This means your username or password is wrong. Check your `.env.local` file.

### Q: What does "Connection Refused" mean?

**A:** MySQL is not running. Start it using the commands above.

---

## 🔍 Understanding the Configuration

Let's break down what each setting in `.env.local` means:

```env
DB_HOST=localhost        # Where MySQL is running (localhost = your computer)
DB_USER=root            # MySQL username (root is the main admin user)
DB_PASSWORD=secret123   # MySQL password
DB_NAME=geneveda_biosciences  # The name of your database
DB_PORT=3306            # Port number (3306 is MySQL's default)
```

---

## 🎓 Learning More

### What Happens When You Run `npm run create-db`?

1. The script reads your `.env.local` file
2. Connects to MySQL using your credentials
3. Checks if the database exists
4. Creates it if it doesn't exist
5. Shows you a success message

### What Happens When You Run `npm run init-db`?

1. Connects to your database
2. Creates a `blogs` table (to store blog posts)
3. Sets up columns for: title, content, author, etc.
4. Creates indexes for faster searches

---

## 🚨 Troubleshooting

### Problem: "Cannot find module 'mysql2'"

**Solution:** Install dependencies:
```bash
npm install
```

### Problem: "DB_PASSWORD is not set"

**Solution:** Make sure you created `.env.local` file in the project root (same folder as `package.json`)

### Problem: "ER_ACCESS_DENIED_ERROR"

**Solution:** 
1. Check your password is correct in `.env.local`
2. Try connecting manually: `mysql -u root -p`
3. Make sure you can type the password correctly

### Problem: "ENOTFOUND" error

**Solution:** 
- For local development: Make sure `DB_HOST=localhost`
- For remote hosting: Check your hosting panel for the correct MySQL hostname

---

## 📞 Need More Help?

1. Check existing guides:
   - `DATABASE_SETUP.md` - Detailed setup guide
   - `README_DATABASE.md` - Connection troubleshooting
   - `QUICK_RESET_PASSWORD.md` - Password reset guide

2. Run diagnostic commands:
   ```bash
   npm run check-env    # See your current settings
   npm run test-db      # Test connection
   ```

3. Check MySQL is running:
   ```bash
   # macOS/Linux
   brew services list
   
   # Docker
   docker ps
   ```

---

## 🎉 You're All Set!

Once you've completed the setup:
- ✅ Database is created
- ✅ Tables are initialized
- ✅ Connection is working

You can now:
- Start your app: `npm run dev`
- Create blog posts via the API
- View your data in the database

**Happy coding!** 🚀

