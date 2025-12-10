# 🚀 Quick PostgreSQL Setup Guide

## ✅ SSH Connection Working!

Key authentication is working. Now let's setup PostgreSQL.

---

## Step 1: SSH into Server

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

---

## Step 2: Install PostgreSQL

Once logged in, run these commands:

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Check installation
psql --version

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check status
sudo systemctl status postgresql
```

---

## Step 3: Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql
```

Inside PostgreSQL prompt, run:

```sql
-- Create database
CREATE DATABASE geneveda_biosciences;

-- Create user with password
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

-- Connect to database
\c geneveda_biosciences

-- Grant schema privileges (for PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;

-- Exit
\q
```

---

## Step 4: Test Connection

```bash
# Test from server
psql -h localhost -U geneveda_user -d geneveda_biosciences

# If prompted for password, enter: GeneVeda2025!Secure
```

---

## Step 5: Configure for Remote Access (Optional)

If you want to connect from your local machine:

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf

# Find: listen_addresses = 'localhost'
# Change to: listen_addresses = '*'
# Save and exit (Ctrl+X, Y, Enter)

# Edit pg_hba.conf
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add at the end:
host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5

# Save and exit

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 📋 Connection Details

After setup:

- **Host:** `40.192.24.24`
- **Port:** `5432`
- **Database:** `geneveda_biosciences`
- **User:** `geneveda_user`
- **Password:** `GeneVeda2025!Secure`

---

## ✅ Next: Configure Project

Once PostgreSQL is set up, we'll:
1. Install Prisma in project
2. Create Prisma schema for PostgreSQL
3. Update .env.local
4. Run migrations
5. Create admin user

---

## 🔧 If Sudo Asks for Password

If sudo commands ask for password:
- Enter the password when prompted
- Or ask your team/client for sudo password
- Or check if user1 has passwordless sudo configured

