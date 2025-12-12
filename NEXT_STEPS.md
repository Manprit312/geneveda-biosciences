# Next Steps - PostgreSQL Setup Complete

## ✅ What's Done

1. ✅ Prisma schema created for PostgreSQL
2. ✅ All repositories updated to use Prisma
3. ✅ Auth module updated to use Prisma
4. ✅ Prisma client generated
5. ✅ Environment variables configured

## 🔧 What Needs to Be Done on Server

### Step 1: Configure PostgreSQL for Remote Access

SSH into server and run:

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

Then either:

**Option A: Run the setup script**
```bash
# Copy script to server first, then:
bash setup-postgres-remote.sh
```

**Option B: Manual setup** (see `POSTGRESQL_REMOTE_ACCESS.md`)

### Step 2: Test Connection

From your local machine:

```bash
cd geneveda-biosciences

# Test connection
node -e "require('dotenv').config({ path: '.env.local' }); const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$queryRaw\`SELECT 1\`.then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(e => { console.error('❌', e.message); process.exit(1); });"
```

Or visit: `http://localhost:3000/api/test-db`

### Step 3: Push Database Schema

Once connection works:

```bash
npx prisma db push
```

This will create all tables in PostgreSQL.

### Step 4: Create Admin User

```bash
npm run create-admin-prisma admin@geneveda.com admin123
```

### Step 5: Test Admin Login

Visit: `http://localhost:3000/admin/login`

## 📋 Files Updated

- `prisma/schema.prisma` - PostgreSQL schema
- `lib/db/prisma.ts` - Prisma client
- `lib/auth.ts` - Updated to use Prisma
- `app/services/repositories/*.ts` - All repositories updated
- `app/api/test-db/route.ts` - Test endpoint
- `.env.local` - Database URL configured

## 🔐 Environment Variables

Make sure `.env.local` has:

```env
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=require"
```

For Vercel, add this to environment variables.

## 🚀 Deployment

1. Add `DATABASE_URL` to Vercel environment variables
2. Deploy to Vercel
3. Run `npx prisma db push` (or use migrations)
4. Create admin via script or API

## 📚 Documentation

- `POSTGRESQL_REMOTE_ACCESS.md` - Remote access setup guide
- `scripts/setup-postgres-remote.sh` - Automated setup script


