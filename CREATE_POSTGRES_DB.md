# 🐘 Create PostgreSQL Database

## PostgreSQL is Installed ✅

Now we need to create the database and user. Try these methods:

---

## Method 1: Using postgres user (Standard)

```bash
# SSH into server
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE geneveda_biosciences;
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;
\c geneveda_biosciences
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;
\q
EOF
```

---

## Method 2: Direct psql connection

If postgres user doesn't exist, try:

```bash
# Connect directly
psql -U postgres

# Or if that doesn't work
psql postgres

# Then run SQL commands:
CREATE DATABASE geneveda_biosciences;
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;
\c geneveda_biosciences
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;
\q
```

---

## Method 3: Check PostgreSQL Installation

```bash
# Check PostgreSQL version
psql --version

# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check PostgreSQL data directory
sudo ls -la /var/lib/postgresql/

# Check postgres user
id postgres
```

---

## Quick Test After Creation

```bash
# Test connection
psql -h localhost -U geneveda_user -d geneveda_biosciences
# Password: GeneVeda2025!Secure

# Or from your local machine
psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences
```

---

## 📋 SQL Commands (Copy-Paste Ready)

Once you're in psql, run these:

```sql
CREATE DATABASE geneveda_biosciences;

CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';

GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

\c geneveda_biosciences

GRANT ALL ON SCHEMA public TO geneveda_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;

\q
```

---

## ✅ After Database Creation

Once database is created, we'll:
1. ✅ Install Prisma (done)
2. Create Prisma schema for PostgreSQL
3. Update .env.local
4. Run migrations
5. Test connection


