# 🚀 Prisma Setup Guide for GeneVeda Biosciences

This guide will help you set up Prisma to connect to your live Hostinger MySQL database.

## ✅ What's Been Done

- ✅ Prisma installed and configured
- ✅ Prisma schema created with all tables
- ✅ All repositories updated to use Prisma
- ✅ Auth system updated to use Prisma
- ✅ Backward compatibility with legacy env vars

## 📋 Prerequisites

1. **Prisma is already installed** ✅
2. **Prisma schema created** ✅
3. **Need to:** Generate Prisma Client and configure DATABASE_URL

---

## 🔧 Step 1: Configure DATABASE_URL

### For Hostinger Database

You need to set `DATABASE_URL` in your environment variables.

**Format:**
```
mysql://username:password@host:port/database
```

**For your Hostinger database:**
```env
DATABASE_URL="mysql://u896634865_manprit:mnprt@Bharatail@localhost:3306/u896634865_manprit"
```

**Important Notes:**
- Replace `localhost` with your actual MySQL hostname from Hostinger
- URL encode special characters in password (e.g., `@` becomes `%40`)
- For Hostinger, the host might be `localhost` or a remote hostname

### URL Encoding Password

If your password has special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

**Example:**
```
Password: mnprt@Bharatail
Encoded: mnprt%40Bharatail
URL: mysql://u896634865_manprit:mnprt%40Bharatail@host:3306/u896634865_manprit
```

---

## 🎯 Step 2: Set Environment Variables

### Local Development (.env.local)

Create or update `.env.local`:

```env
# Prisma Database URL (Required)
DATABASE_URL="mysql://u896634865_manprit:mnprt%40Bharatail@localhost:3306/u896634865_manprit"

# OR use legacy format (automatically converted)
DB_HOST=localhost
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
```

### Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add:

```env
DATABASE_URL=mysql://u896634865_manprit:mnprt%40Bharatail@your_hostinger_host:3306/u896634865_manprit
```

**Or use legacy format (will be auto-converted):**
```env
DB_HOST=your_hostinger_host
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_manprit
DB_PORT=3306
```

---

## 🔨 Step 3: Generate Prisma Client

Run this command to generate the Prisma Client:

```bash
npx prisma generate
```

This will:
- Read your `prisma/schema.prisma` file
- Generate TypeScript types
- Create Prisma Client

**Add to package.json scripts:**
```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:studio": "prisma studio",
    "prisma:migrate": "prisma migrate dev",
    "prisma:push": "prisma db push"
  }
}
```

---

## 🗄️ Step 4: Database Migration Options

### Option A: Use Existing Tables (Recommended)

If your database already has tables, Prisma will work with them. No migration needed!

**Just generate the client:**
```bash
npx prisma generate
```

### Option B: Push Schema to Database

If you want Prisma to create/update tables:

```bash
npx prisma db push
```

**⚠️ Warning:** This will modify your database schema. Use with caution on production!

### Option C: Create Migrations

For version-controlled migrations:

```bash
npx prisma migrate dev --name init
```

---

## ✅ Step 5: Verify Setup

### Test Connection

1. **Via API:**
   ```
   https://your-app.vercel.app/api/test-db
   ```

2. **Via Prisma Studio (Local):**
   ```bash
   npx prisma studio
   ```
   Opens at: http://localhost:5555

3. **Via Script:**
   ```bash
   npm run test-db
   ```

---

## 🔄 Migration from mysql2 to Prisma

All code has been updated! Here's what changed:

### ✅ Updated Files:
- `lib/db/prisma.ts` - Prisma client instance
- `lib/db/connection-prisma.ts` - Connection helpers
- `lib/auth.ts` - Uses Prisma
- `app/services/repositories/blogRepository.ts` - Uses Prisma
- `app/services/repositories/serviceRepository.ts` - Uses Prisma
- `app/services/repositories/pageContentRepository.ts` - Uses Prisma
- `app/services/repositories/siteSettingsRepository.ts` - Uses Prisma
- `app/api/test-db/route.ts` - Uses Prisma

### 🗑️ Old Files (Can be removed later):
- `lib/db/connection.ts` - Old mysql2 connection (kept for reference)
- `lib/db/migrations.ts` - Old migration system (can be replaced with Prisma migrations)

---

## 🚀 Deployment Checklist

Before deploying to Vercel:

- [ ] `DATABASE_URL` set in Vercel environment variables
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Test connection locally
- [ ] Deploy to Vercel
- [ ] Test connection on Vercel (`/api/test-db`)

---

## 🐛 Troubleshooting

### "PrismaClient is not configured"

**Solution:**
```bash
npx prisma generate
```

### "Can't reach database server"

**Check:**
1. `DATABASE_URL` is correct
2. Remote MySQL is enabled on Hostinger
3. Hostname is correct (not `localhost` for remote)

### "Authentication failed"

**Check:**
1. Username and password are correct
2. Password is URL-encoded if it has special characters
3. User has permissions on the database

### "Table doesn't exist"

**Solution:**
- If tables exist: Just run `npx prisma generate`
- If tables don't exist: Run `npx prisma db push` (creates tables)

---

## 📚 Prisma Commands Reference

```bash
# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio

# Push schema changes to database
npx prisma db push

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

---

## 🎯 Quick Start

1. **Set DATABASE_URL in .env.local:**
   ```env
   DATABASE_URL="mysql://u896634865_manprit:mnprt%40Bharatail@localhost:3306/u896634865_manprit"
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Test connection:**
   ```bash
   npm run dev
   # Visit: http://localhost:3000/api/test-db
   ```

4. **Deploy to Vercel:**
   - Add `DATABASE_URL` to Vercel env vars
   - Deploy
   - Test: `https://your-app.vercel.app/api/test-db`

---

## ✨ Benefits of Prisma

- ✅ **Type Safety** - Full TypeScript support
- ✅ **Better DX** - IntelliSense and autocomplete
- ✅ **Migrations** - Version-controlled schema changes
- ✅ **Studio** - Visual database browser
- ✅ **Relations** - Easy to add relationships later
- ✅ **Performance** - Optimized queries

---

**Need help?** Check Prisma docs: https://www.prisma.io/docs

