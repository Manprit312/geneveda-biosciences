# 🔗 Remote MySQL Setup Guide

## ✅ Correct MySQL Hostname

From Hostinger Remote MySQL settings:

**Hostname:** `srv1825.hstgr.io`  
**OR IP Address:** `193.203.184.197`

## 📝 Updated .env.local

```env
DB_HOST=srv1825.hstgr.io
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatai1
DB_NAME=u896634865_manprit
DB_PORT=3306

DATABASE_URL="mysql://u896634865_manprit:mnprt%40Bharatai1@srv1825.hstgr.io:3306/u896634865_manprit"
```

## 🔓 Enable Remote MySQL Access

Agar local machine se connect karna hai:

1. **Login to Hostinger hPanel**
2. **Go to:** Websites → Your Domain → Databases → **Remote MySQL**
3. **Click:** "+ Create remote database connection"
4. **Add your IP address:**
   - Your current IP (check: https://whatismyipaddress.com/)
   - OR allow all: `0.0.0.0/0` (less secure but easier)
5. **Select database:** `u896634865_manprit`
6. **Save**

## ✅ Test Connection

After enabling Remote MySQL:

```bash
npm run test-db
# OR
node scripts/test-connection.js
```

## 🚀 For Vercel Deployment

Vercel environment variables mein:

```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatai1@srv1825.hstgr.io:3306/u896634865_manprit
```

Ya IP address use karein:

```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatai1@193.203.184.197:3306/u896634865_manprit
```

## 📋 Quick Reference

### Database Connection Details
- **Hostname:** `srv1825.hstgr.io` (recommended)
- **IP Address:** `193.203.184.197` (alternative)
- **Username:** `u896634865_manprit`
- **Password:** `mnprt@Bharatai1`
- **Database:** `u896634865_manprit`
- **Port:** `3306`

### phpMyAdmin Access
- **URL:** http://auth-db1825.hstgr.io/
- **Username:** `u896634865_manprit`
- **Password:** `mnprt@Bharatai1`

## ⚠️ Important Notes

1. **Password URL Encoding:** `@` becomes `%40` in DATABASE_URL
2. **Remote Access:** Local testing ke liye Remote MySQL enable karein
3. **Vercel:** Remote MySQL automatically enabled for Vercel IPs

## 🔍 Verify Connection

```bash
# Test MySQL connection
node scripts/test-connection.js

# Check admin users
npm run check-admin
```



