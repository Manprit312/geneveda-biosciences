# 🐘 PostgreSQL Database Setup on Server

## ✅ SSH Connection Successful!

**Server:** `40.192.24.24`  
**User:** `user1`  
**OS:** Ubuntu 24.04 (AWS)

---

## Step 1: Install PostgreSQL

SSH into the server and run:

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

Then install PostgreSQL:

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Check version
psql --version

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check status
sudo systemctl status postgresql
```

---

## Step 2: Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql
```

Inside PostgreSQL prompt:

```sql
-- Create database
CREATE DATABASE geneveda_biosciences;

-- Create user
CREATE USER geneveda_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

-- For PostgreSQL 15+, also grant schema privileges
\c geneveda_biosciences
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;

-- Exit
\q
```

---

## Step 3: Configure PostgreSQL for Remote Access (if needed)

Edit PostgreSQL config:

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf

# Find and uncomment:
# listen_addresses = 'localhost'
# Change to:
listen_addresses = '*'
```

Edit pg_hba.conf:

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add at the end:
host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

---

## Step 4: Test Connection

### From Server:

```bash
psql -h localhost -U geneveda_user -d geneveda_biosciences
```

### From Local Machine:

```bash
psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences
```

---

## Step 5: Update Project Configuration

### Install PostgreSQL Client in Project

```bash
cd geneveda-biosciences
npm install pg @types/pg
# OR for Prisma
npm install prisma @prisma/client
```

### Update .env.local

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://geneveda_user:your_password@40.192.24.24:5432/geneveda_biosciences?sslmode=require"

# OR separate variables
DB_HOST=40.192.24.24
DB_PORT=5432
DB_USER=geneveda_user
DB_PASSWORD=your_password
DB_NAME=geneveda_biosciences
DB_TYPE=postgresql
```

---

## 🔧 Quick Setup Script

Run this on the server:

```bash
#!/bin/bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

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

echo "✅ PostgreSQL setup complete!"
echo "Database: geneveda_biosciences"
echo "User: geneveda_user"
echo "Password: GeneVeda2025!Secure"
```

---

## 📋 Connection Details

After setup, note these:

- **Host:** `40.192.24.24`
- **Port:** `5432`
- **Database:** `geneveda_biosciences`
- **User:** `geneveda_user`
- **Password:** (the one you set)

---

## ✅ Next Steps

1. Install PostgreSQL on server
2. Create database and user
3. Test connection
4. Update project .env.local
5. Install Prisma/PostgreSQL client
6. Create schema
7. Deploy!


