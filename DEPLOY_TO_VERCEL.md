# 🚀 Deploy to Vercel with Cloud MySQL Database

You already have a **cloud MySQL database** set up! Here's how to deploy your Next.js app to Vercel and connect it to your existing database.

## 📋 Your Database Information

Based on your hosting panel, you have:

- **Database Name:** `u896634865_manprit`
- **Username:** `u896634865_manprit`
- **Password:** `mnprt@Bharatail`
- **Host:** (Check your hosting panel - usually something like `localhost` or a specific MySQL hostname)

## 🔍 Step 1: Find Your MySQL Hostname

1. Log into your hosting control panel (cPanel, Hostinger, etc.)
2. Go to **MySQL Databases** or **Database** section
3. Look for **MySQL Hostname** or **Server** - it's usually:
   - `localhost` (if on same server)
   - Or something like `mysql.yourhost.com`
   - Or an IP address

**Important:** For shared hosting, the hostname is often `localhost` even though it's a cloud server!

## 📝 Step 2: Update Your Connection Code

Your connection code already supports cloud databases! The `lib/db/connection.ts` file is ready.

## 🌐 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your Git repository** (GitHub, GitLab, or Bitbucket)
4. **Configure Project:**
   - Framework Preset: **Next.js**
   - Root Directory: (leave empty if root, or specify folder)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```
   DB_HOST=localhost
   DB_USER=u896634865_manprit
   DB_PASSWORD=mnprt@Bharatail
   DB_NAME=u896634865_manprit
   DB_PORT=3306
   DB_SSL=false
   ```

   **Important Notes:**
   - Replace `localhost` with your actual MySQL hostname from Step 1
   - For shared hosting, `localhost` often works even on cloud
   - Set these for **Production**, **Preview**, and **Development** environments

6. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences
vercel

# For production
vercel --prod
```

## 🔐 Step 4: Set Environment Variables in Vercel

After deployment, add environment variables:

1. Go to your project on Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DB_HOST` | `localhost` (or your MySQL hostname) | All |
   | `DB_USER` | `u896634865_manprit` | All |
   | `DB_PASSWORD` | `mnprt@Bharatail` | All |
   | `DB_NAME` | `u896634865_manprit` | All |
   | `DB_PORT` | `3306` | All |
   | `DB_SSL` | `false` | All |

4. **Redeploy** after adding variables (Vercel will auto-redeploy)

## ⚠️ Important: MySQL Hostname for Shared Hosting

For shared hosting providers (like Hostinger), the MySQL hostname is usually:

- **`localhost`** - Even though it's a cloud server, MySQL is on the same server
- **OR** Check your hosting panel for the exact hostname

**To find it:**
1. Check your hosting control panel
2. Look for "MySQL Hostname" or "Database Server"
3. It might be in the database section or connection strings

## 🧪 Step 5: Test the Connection

After deployment, test your database connection:

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Check Vercel function logs:
   - Go to Vercel Dashboard → Your Project → **Functions** tab
   - Look for any database connection errors

## 🔄 Step 6: Update Database Tables

If your database is empty, you need to create tables:

### Option 1: Run Scripts Locally (Recommended)

1. **Update your local `.env.local`** to point to cloud database:
   ```env
   DB_HOST=your-mysql-hostname
   DB_USER=u896634865_manprit
   DB_PASSWORD=mnprt@Bharatail
   DB_NAME=u896634865_manprit
   DB_PORT=3306
   ```

2. **Run setup scripts:**
   ```bash
   npm run create-db
   npm run init-db
   npm run seed-blogs
   ```

### Option 2: Use phpMyAdmin

1. Log into your hosting control panel
2. Open **phpMyAdmin**
3. Select your database: `u896634865_manprit`
4. Run SQL to create tables (from `lib/db/migrations.ts`)

## 📊 Step 7: Verify Everything Works

1. **Check Vercel Logs:**
   - Dashboard → Your Project → **Logs**
   - Look for: `✅ MySQL Connection Pool Created`

2. **Test API Endpoints:**
   - Visit: `https://your-project.vercel.app/api/blogs`
   - Should return blog data (or empty array if no data)

3. **Check Frontend:**
   - Visit: `https://your-project.vercel.app/blog`
   - Should display blog posts

## 🆘 Troubleshooting

### Problem: "Connection Refused" or "ENOTFOUND"

**Solution:**
- Check if `DB_HOST` is correct
- For shared hosting, try `localhost` first
- Check if MySQL allows remote connections (some hosts require whitelisting)

### Problem: "Access Denied"

**Solution:**
- Verify username and password are correct
- Check if user has permissions on the database
- Ensure database name matches exactly

### Problem: "Database doesn't exist"

**Solution:**
- Make sure database `u896634865_manprit` exists
- Run `npm run create-db` locally pointing to cloud DB

### Problem: "Tables don't exist"

**Solution:**
- Run `npm run init-db` locally pointing to cloud DB
- Or create tables manually via phpMyAdmin

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to Git (it's already in `.gitignore`)
2. **Use Vercel Environment Variables** for production secrets
3. **Use different databases** for development and production
4. **Rotate passwords** regularly

## 📝 Summary

✅ You have a cloud MySQL database ready  
✅ Your code already supports cloud connections  
✅ Just need to:
   1. Find MySQL hostname from hosting panel
   2. Deploy to Vercel
   3. Add environment variables
   4. Create tables in cloud database
   5. Test connection

## 🎉 Next Steps

1. Find your MySQL hostname
2. Deploy to Vercel
3. Add environment variables
4. Create database tables
5. Test your live site!

---

**Need help?** Check Vercel logs or hosting panel for MySQL connection details.

