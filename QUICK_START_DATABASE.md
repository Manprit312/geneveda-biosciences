# 🚀 Quick Start: Create Your Database

**New to SQL? No problem!** Follow these simple steps to get your database ready.

## ⚡ Super Quick Setup (3 Commands)

### 1️⃣ Create Configuration File

Create a file named `.env.local` in your project folder with this content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

> **💡 Tip:** If you don't have a MySQL password set, leave `DB_PASSWORD` empty (or put your password if you have one).

### 2️⃣ Create the Database

Run this command:

```bash
npm run create-db
```

This will create your database automatically! ✨

### 3️⃣ Create Tables

Run this command:

```bash
npm run init-db
```

This creates all the tables your website needs.

---

## ✅ Done! Test It

Test your connection:

```bash
npm run test-db
```

If you see ✅ SUCCESS, you're all set! 🎉

---

## 🔧 Before You Start

Make sure MySQL is installed and running:

### Option 1: Using Docker (Easiest)
```bash
npm run setup-db
```

### Option 2: Check if MySQL is Running

**macOS:**
```bash
brew services list | grep mysql
```

If it's not running:
```bash
brew services start mysql
```

---

## ❓ Troubleshooting

### "Cannot connect to MySQL"
- Make sure MySQL is running (see above)
- Check your `.env.local` file exists

### "Access Denied"
- Your password might be wrong
- Try leaving `DB_PASSWORD=` empty if you never set one

### "DB_PASSWORD is not set"
- Make sure `.env.local` file exists in the project root
- Even if empty, include: `DB_PASSWORD=`

---

## 📖 Need More Help?

- **Beginner's Guide:** See `BEGINNER_DATABASE_SETUP.md`
- **Detailed Setup:** See `DATABASE_SETUP.md`
- **Check Settings:** Run `npm run check-env`

---

**That's it!** Your database is ready. Now start your app with `npm run dev` 🚀

