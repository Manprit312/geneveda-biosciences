# 🐘 Install PostgreSQL on Server

## PostgreSQL is NOT Installed

The `dpkg -l | grep postgres` returned nothing, so PostgreSQL needs to be installed.

---

## Step 1: Install PostgreSQL

Run these commands on the server:

```bash
# Update package list
echo 'manprit*' | sudo -S apt update

# Install PostgreSQL
echo 'manprit*' | sudo -S apt install postgresql postgresql-contrib -y

# Check installation
dpkg -l | grep postgres
```

---

## Step 2: Start PostgreSQL Service

```bash
# Start PostgreSQL
echo 'manprit*' | sudo -S systemctl start postgresql

# Enable to start on boot
echo 'manprit*' | sudo -S systemctl enable postgresql

# Check status
echo 'manprit*' | sudo -S systemctl status postgresql
```

---

## Step 3: Verify postgres User Created

After installation, the `postgres` user should be created automatically:

```bash
# Check if postgres user exists
id postgres

# Should show something like:
# uid=XXX(postgres) gid=XXX(postgres) groups=XXX(postgres)
```

---

## Step 4: Create Database and User

Once PostgreSQL is installed and running:

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

## Step 5: Test Connection

```bash
# Test from server
psql -h localhost -U geneveda_user -d geneveda_biosciences
# Password: GeneVeda2025!Secure
```

---

## 📋 Complete Installation Script

Copy-paste this entire block:

```bash
# Install PostgreSQL
echo 'manprit*' | sudo -S apt update
echo 'manprit*' | sudo -S apt install postgresql postgresql-contrib -y

# Start service
echo 'manprit*' | sudo -S systemctl start postgresql
echo 'manprit*' | sudo -S systemctl enable postgresql

# Create database and user
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE DATABASE geneveda_biosciences;"
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';"
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"

# Verify
echo 'manprit*' | sudo -S -u postgres psql -c "\l" | grep geneveda
```

---

## ✅ After Installation

Once PostgreSQL is installed and database is created:
- Host: `40.192.24.24`
- Port: `5432`
- Database: `geneveda_biosciences`
- User: `geneveda_user`
- Password: `GeneVeda2025!Secure`

Then we'll configure Prisma in the project!

