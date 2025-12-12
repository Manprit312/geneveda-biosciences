# 🚀 SSH & PostgreSQL Database Setup

## Step 1: SSH Connection

### Check SSH Key Location

The SSH key might be in different locations. Try these:

```bash
# Option 1: Default location
ssh -i ~/.ssh/id_ed25519 user1@40.192.24.24

# Option 2: If key is named differently
ssh -i ~/.ssh/developer_private_key user1@40.192.24.24

# Option 3: If key is in project directory
ssh -i /path/to/developer_private_key user1@40.192.24.24
```

### If Key Doesn't Exist

1. **Check if you have the private key file:**
   - Look for `developer_private_key` or `id_ed25519` file
   - It should be provided by your team/client

2. **Set correct permissions:**
   ```bash
   chmod 600 /path/to/developer_private_key
   ```

3. **Try connecting:**
   ```bash
   ssh -i /path/to/developer_private_key user1@40.192.24.24
   ```

---

## Step 2: After SSH Login - Create PostgreSQL Database

Once connected to the server:

### Check PostgreSQL Installation

```bash
# Check if PostgreSQL is installed
psql --version

# Check if PostgreSQL service is running
sudo systemctl status postgresql
# OR
sudo service postgresql status
```

### Create PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE geneveda_biosciences;

# Create user
CREATE USER geneveda_user WITH PASSWORD 'your_secure_password_here';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

# Exit
\q
```

### Get Connection Details

Note down:
- **Host:** `40.192.24.24` (or `localhost` if connecting from server)
- **Port:** `5432` (default PostgreSQL port)
- **Database:** `geneveda_biosciences`
- **User:** `geneveda_user`
- **Password:** (the one you set)

---

## Step 3: Configure Project for PostgreSQL

### Install PostgreSQL Client

```bash
cd geneveda-biosciences
npm install pg @types/pg
# OR if using Prisma
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

## Step 4: Test Connection

### From Server (if connected via SSH)

```bash
psql -h localhost -U geneveda_user -d geneveda_biosciences
```

### From Local Machine

```bash
# Test connection
node -e "const { Client } = require('pg'); const client = new Client({host: '40.192.24.24', port: 5432, user: 'geneveda_user', password: 'your_password', database: 'geneveda_biosciences'}); client.connect().then(() => {console.log('✅ Connected!'); client.end();}).catch(e => console.error('❌ Error:', e.message));"
```

---

## 🔧 Troubleshooting

### "Permission denied (publickey)"
- Check if SSH key file exists
- Verify key permissions: `chmod 600 key_file`
- Check if public key is added to server

### "PostgreSQL not found"
- Install PostgreSQL: `sudo apt-get install postgresql postgresql-contrib` (Ubuntu/Debian)
- Or: `sudo yum install postgresql postgresql-server` (CentOS/RHEL)

### "Connection refused"
- Check PostgreSQL is running: `sudo systemctl start postgresql`
- Check firewall allows port 5432
- Verify connection string

---

## 📋 Quick Checklist

- [ ] SSH key located and accessible
- [ ] SSH connection successful
- [ ] PostgreSQL installed on server
- [ ] Database created
- [ ] User created with permissions
- [ ] Connection tested from server
- [ ] Project dependencies installed
- [ ] .env.local configured
- [ ] Connection tested from local/project

---

## 🎯 Next Steps After Database Setup

1. **Install Prisma (if using):**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Create Prisma schema for PostgreSQL**

3. **Run migrations**

4. **Create admin user**

5. **Test admin login**


