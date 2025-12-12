# 🚀 Vercel Deployment Steps

## Step 1: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard**
2. **Select your project:** geneveda-biosciences
3. **Go to:** Settings → Environment Variables
4. **Add these variables:**

### Required Variables:

```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatai1@srv1825.hstgr.io:3306/u896634865_manprit
```

**OR use legacy format (auto-converted):**

```env
DB_HOST=srv1825.hstgr.io
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatai1
DB_NAME=u896634865_manprit
DB_PORT=3306
```

### Important:
- **Environment:** Select **Production**, **Preview**, and **Development** (all three)
- **Password encoding:** `@` becomes `%40` in DATABASE_URL
- **Save** after adding each variable

---

## Step 2: Deploy to Vercel

### Option A: Via Git (Recommended)
```bash
git add .
git commit -m "Add Prisma and database configuration"
git push
```
Vercel automatically deploys on push.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Step 3: Test Connection

After deployment, test the connection:

### Test Endpoint:
```
https://your-app.vercel.app/api/test-db
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection successful!",
  "database": "u896634865_manprit",
  "host": "srv1825.hstgr.io"
}
```

### Check Vercel Logs:
1. Go to Vercel Dashboard → Your Project
2. Click **"Logs"** tab
3. Look for:
   - ✅ "✅ Prisma Database Connected"
   - ✅ "✅ MySQL Connection Pool Created"
   - ❌ Any error messages

---

## Step 4: Create Admin (if needed)

### Option A: Via API (After deployment)
Once deployed, you can create admin via API if you add an endpoint.

### Option B: Via phpMyAdmin (Easier)
1. Login: http://auth-db1825.hstgr.io/
2. Create admin using SQL (see ADMIN_CREDENTIALS.md)

---

## Step 5: Login to Admin Panel

After admin is created:

```
https://your-app.vercel.app/admin/login
```

**Credentials:**
- Email: `admin@geneveda.com`
- Password: `Admin123!` (or whatever you set)

---

## 🔍 Troubleshooting

### "Cannot connect to database"
- Check environment variables are set correctly
- Verify DATABASE_URL format
- Check Vercel logs for specific error

### "Access denied"
- Verify username and password
- Check if Remote MySQL allows Vercel IPs
- Try adding `0.0.0.0/0` in Hostinger Remote MySQL

### "Table doesn't exist"
- Tables will be created automatically on first API call
- Or create via phpMyAdmin

---

## ✅ Checklist

Before deploying:
- [ ] Environment variables added in Vercel
- [ ] DATABASE_URL is correct (password encoded)
- [ ] All environments selected (Production, Preview, Development)
- [ ] Code pushed to Git (if using Git)

After deploying:
- [ ] Test connection: `/api/test-db`
- [ ] Check Vercel logs
- [ ] Create admin (if needed)
- [ ] Test admin login

---

## 📋 Quick Reference

### Vercel Environment Variables:
```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatai1@srv1825.hstgr.io:3306/u896634865_manprit
```

### Test URLs:
- Connection: `https://your-app.vercel.app/api/test-db`
- Admin Login: `https://your-app.vercel.app/admin/login`

### Database Details:
- Host: `srv1825.hstgr.io`
- User: `u896634865_manprit`
- Database: `u896634865_manprit`



