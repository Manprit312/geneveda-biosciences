# 🐘 Create PostgreSQL Database (Run on Server)

## You're Already on the Server! ✅

Since you're logged in as `user1@ip-172-31-8-0`, just run these commands directly:

---

## Step 1: Create Database and User

Run these commands one by one:

```bash
# Create database
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE DATABASE geneveda_biosciences;"

# Create user
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';"

# Grant privileges
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"

# Grant schema privileges
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

---

## Step 2: Test Connection

```bash
# Test from server
psql -h localhost -U geneveda_user -d geneveda_biosciences
# Password: GeneVeda2025!Secure
```

---

## Step 3: Verify Database Created

```bash
# List databases
echo 'manprit*' | sudo -S -u postgres psql -c "\l" | grep geneveda

# List users
echo 'manprit*' | sudo -S -u postgres psql -c "\du" | grep geneveda
```

---

## 📋 All Commands in One Block (Copy-Paste)

```bash
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE DATABASE geneveda_biosciences;"
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';"
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

---

## ✅ After Database Creation

Once database is created, we'll:
1. Configure Prisma for PostgreSQL
2. Create schema
3. Update .env.local
4. Test connection from project

---

## Connection Details

After setup:
- **Host:** `40.192.24.24`
- **Port:** `5432`
- **Database:** `geneveda_biosciences`
- **User:** `geneveda_user`
- **Password:** `GeneVeda2025!Secure`

