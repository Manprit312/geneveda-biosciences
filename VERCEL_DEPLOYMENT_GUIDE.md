# Vercel Deployment Guide

## ⚠️ Important: Environment Variables Required

**YES, the code will work on Vercel**, but you **MUST** add environment variables in Vercel dashboard before deployment. Without them, you'll get errors.

## Required Environment Variables

### 1. Database Connection (PostgreSQL)

```env
DATABASE_URL=postgresql://geneveda_user:GeneVeda2025Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer
```

**Important Notes:**
- Replace password if you changed it
- The server `40.192.24.24` must allow connections from Vercel's IPs
- If using SSL, change `sslmode=prefer` to `sslmode=require`

### 2. Cloudinary (for Image Uploads)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. JWT Secret (for Admin Authentication)

```env
JWT_SECRET=your-secret-key-change-in-production
```

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step-by-Step Vercel Deployment

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add Cloudinary integration and PostgreSQL setup"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Select the `geneveda-biosciences` folder (if repo has multiple projects)

### Step 3: Add Environment Variables

**Before clicking "Deploy":**

1. Click **"Environment Variables"** section
2. Add each variable:

   **Variable 1:**
   - Name: `DATABASE_URL`
   - Value: `postgresql://geneveda_user:GeneVeda2025Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer`
   - Environment: `Production`, `Preview`, `Development` (select all)

   **Variable 2:**
   - Name: `CLOUDINARY_CLOUD_NAME`
   - Value: `your_cloud_name`
   - Environment: All

   **Variable 3:**
   - Name: `CLOUDINARY_API_KEY`
   - Value: `your_api_key`
   - Environment: All

   **Variable 4:**
   - Name: `CLOUDINARY_API_SECRET`
   - Value: `your_api_secret`
   - Environment: All

   **Variable 5:**
   - Name: `JWT_SECRET`
   - Value: `your-generated-secret`
   - Environment: All

### Step 4: Configure Build Settings

**Build Command:** (usually auto-detected)
```bash
npm run build
```

**Output Directory:** (usually auto-detected)
```
.next
```

**Install Command:**
```bash
npm install
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Check deployment logs for errors

## Post-Deployment Checklist

### ✅ Verify Database Connection

1. Visit: `https://your-app.vercel.app/api/test-db`
2. Should return: `{"success": true, ...}`

### ✅ Verify Admin Login

1. Visit: `https://your-app.vercel.app/admin/login`
2. Login with: `admin@geneveda.com` / `admin123`

### ✅ Test Image Upload

1. Go to: `https://your-app.vercel.app/admin/blogs/new`
2. Try uploading an image
3. Should upload to Cloudinary successfully

## Common Issues & Solutions

### ❌ Error: "Can't reach database server"

**Problem:** PostgreSQL server not allowing connections from Vercel

**Solution:**
1. Check PostgreSQL firewall on server `40.192.24.24`
2. Ensure port 5432 is open
3. Check `pg_hba.conf` allows remote connections
4. Verify `listen_addresses = '*'` in `postgresql.conf`

**Quick Fix:**
```bash
# On server
sudo ufw allow 5432/tcp
sudo systemctl restart postgresql
```

### ❌ Error: "Authentication failed"

**Problem:** Wrong database credentials

**Solution:**
1. Verify `DATABASE_URL` in Vercel matches your server
2. Check username and password are correct
3. Ensure user has proper privileges

### ❌ Error: "Cloudinary upload failed"

**Problem:** Missing or incorrect Cloudinary credentials

**Solution:**
1. Verify all three Cloudinary variables are set in Vercel
2. Check credentials in Cloudinary dashboard
3. Ensure API key and secret are correct

### ❌ Error: "Prisma schema not found"

**Problem:** Prisma client not generated

**Solution:**
Add to `package.json` scripts:
```json
"postinstall": "prisma generate"
```

Or add build command:
```bash
npm run prisma:generate && npm run build
```

## Security Best Practices

### 1. Use Strong Secrets
- Generate strong `JWT_SECRET`
- Use complex database passwords
- Keep Cloudinary API secret secure

### 2. Environment-Specific Variables
- Use different values for Production vs Preview
- Don't use production database for preview deployments

### 3. Database Access
- Limit PostgreSQL access to specific IPs if possible
- Use SSL connections (`sslmode=require`)
- Regularly rotate passwords

### 4. Cloudinary
- Set up upload presets with size limits
- Use signed uploads for production
- Monitor usage to avoid overages

## Vercel Environment Variables Setup

### Quick Copy-Paste for Vercel Dashboard

```
DATABASE_URL=postgresql://geneveda_user:GeneVeda2025Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your-generated-secret-here
```

## Testing Deployment

### 1. Database Test
```bash
curl https://your-app.vercel.app/api/test-db
```

### 2. Admin Login Test
- Visit admin login page
- Try logging in
- Check for JWT token in cookies

### 3. Image Upload Test
- Create a new blog post
- Upload an image
- Verify it appears in Cloudinary `geneveda` folder

## Monitoring

### Vercel Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **"Deployments"** → Select deployment → **"Functions"** tab
4. Check logs for errors

### Database Monitoring
- Check PostgreSQL logs on server
- Monitor connection attempts
- Watch for failed queries

## Rollback Plan

If deployment fails:
1. Go to Vercel Dashboard
2. Find previous successful deployment
3. Click **"Promote to Production"**
4. Fix issues in code
5. Redeploy

## Next Steps After Deployment

1. ✅ Update admin password (change from `admin123`)
2. ✅ Create production admin user
3. ✅ Set up database backups
4. ✅ Configure custom domain (if needed)
5. ✅ Set up monitoring/alerts
6. ✅ Test all features thoroughly

## Summary

**Will it work on Vercel?** ✅ **YES**, but only if:

1. ✅ Environment variables are added in Vercel dashboard
2. ✅ PostgreSQL server allows connections from Vercel
3. ✅ Cloudinary credentials are correct
4. ✅ Build completes successfully

**Without environment variables, you'll get:**
- ❌ Database connection errors
- ❌ Cloudinary upload failures
- ❌ Authentication errors

**The `.env.local` file is NOT pushed to GitHub** (it's in `.gitignore`), so you **MUST** add variables in Vercel dashboard.

