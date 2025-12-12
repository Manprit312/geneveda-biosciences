# PostgreSQL Remote Access Configuration

## Issue
Connection to PostgreSQL at `40.192.24.24:5432` is failing. PostgreSQL needs to be configured to accept remote connections.

## Steps to Fix

### 1. Configure PostgreSQL to Listen on All Interfaces

SSH into the server and edit PostgreSQL config:

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

Then:

```bash
# Find PostgreSQL config directory
sudo find /etc -name postgresql.conf 2>/dev/null

# Usually it's at:
# /etc/postgresql/[version]/main/postgresql.conf

# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf
```

Find and update these lines:

```conf
# Listen on all interfaces
listen_addresses = '*'

# Or listen on specific IP
# listen_addresses = 'localhost,40.192.24.24'
```

### 2. Configure pg_hba.conf for Remote Access

```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

Add this line at the end (for your specific IP or all IPs):

```conf
# Allow remote connections with password
host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5
# Or for all databases:
host    all    all    0.0.0.0/0    md5
```

**Security Note:** `0.0.0.0/0` allows connections from any IP. For production, use specific IPs:
- `your.local.ip/32` - for specific IP
- `40.192.24.0/24` - for specific subnet

### 3. Open Firewall Port 5432

```bash
# Check if ufw is active
sudo ufw status

# Allow PostgreSQL port
sudo ufw allow 5432/tcp

# Or for specific IP (more secure)
sudo ufw allow from YOUR_IP to any port 5432
```

### 4. Restart PostgreSQL

```bash
sudo systemctl restart postgresql
# Or
sudo service postgresql restart
```

### 5. Verify PostgreSQL is Listening

```bash
# Check if PostgreSQL is listening on port 5432
sudo netstat -tlnp | grep 5432
# Or
sudo ss -tlnp | grep 5432
```

You should see:
```
tcp  0  0  0.0.0.0:5432  0.0.0.0:*  LISTEN  [PID]/postgres
```

### 6. Test Connection from Local Machine

```bash
# Test connection
psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences

# Or from your local machine
PGPASSWORD='GeneVeda2025!Secure' psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences -c "SELECT version();"
```

### 7. Update .env.local (if needed)

If SSL is not required, update `.env.local`:

```env
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer"
```

Or if SSL is required:

```env
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=require"
```

## Quick Setup Script

Run this on the server:

```bash
#!/bin/bash
# Run as user1 on server

# 1. Update postgresql.conf
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf

# 2. Add to pg_hba.conf
echo "host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5" | sudo tee -a /etc/postgresql/*/main/pg_hba.conf

# 3. Allow firewall
sudo ufw allow 5432/tcp

# 4. Restart PostgreSQL
sudo systemctl restart postgresql

# 5. Verify
sudo netstat -tlnp | grep 5432
```

## Troubleshooting

### Connection Refused
- Check if PostgreSQL is running: `sudo systemctl status postgresql`
- Check if listening: `sudo netstat -tlnp | grep 5432`
- Check firewall: `sudo ufw status`

### Authentication Failed
- Verify user exists: `sudo -u postgres psql -c "\du"`
- Verify password: Try connecting with `psql` directly
- Check `pg_hba.conf` configuration

### SSL Required Error
- Change `sslmode=require` to `sslmode=prefer` in DATABASE_URL
- Or configure SSL in PostgreSQL (more complex)

## Next Steps

After configuring remote access:

1. Test connection: `npm run test-db` or visit `/api/test-db`
2. Push schema: `npx prisma db push`
3. Create admin: `npm run create-admin-prisma admin@geneveda.com admin123`



