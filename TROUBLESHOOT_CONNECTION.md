# Troubleshooting PostgreSQL Connection

## Current Issue
Connection to `40.192.24.24:5432` is still failing.

## Verification Steps (Run on Server)

SSH into the server and run these commands to verify:

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

### 1. Check PostgreSQL Status

```bash
sudo systemctl status postgresql
```

Should show: `Active: active (running)`

### 2. Check if PostgreSQL is Listening

```bash
sudo netstat -tlnp | grep 5432
# Or
sudo ss -tlnp | grep 5432
```

Should show something like:
```
tcp  0  0  0.0.0.0:5432  0.0.0.0:*  LISTEN  [PID]/postgres
```

If it shows `127.0.0.1:5432` instead of `0.0.0.0:5432`, PostgreSQL is only listening on localhost.

### 3. Check postgresql.conf

```bash
sudo grep listen_addresses /etc/postgresql/*/main/postgresql.conf
```

Should show:
```
listen_addresses = '*'
```

If it shows `#listen_addresses = 'localhost'` or `listen_addresses = 'localhost'`, update it:

```bash
sudo sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
```

### 4. Check pg_hba.conf

```bash
sudo tail -5 /etc/postgresql/*/main/pg_hba.conf
```

Should include a line like:
```
host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5
```

If not, add it:

```bash
echo "host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5" | sudo tee -a /etc/postgresql/*/main/pg_hba.conf
```

### 5. Check Firewall

```bash
sudo ufw status
```

Should show:
```
5432/tcp                     ALLOW       Anywhere
```

If not, allow it:

```bash
sudo ufw allow 5432/tcp
sudo ufw reload
```

### 6. Restart PostgreSQL

```bash
sudo systemctl restart postgresql
sudo systemctl status postgresql
```

### 7. Test Connection from Server Itself

```bash
# Test local connection
sudo -u postgres psql -c "SELECT version();"

# Test with geneveda_user
PGPASSWORD='GeneVeda2025!Secure' psql -h localhost -U geneveda_user -d geneveda_biosciences -c "SELECT current_database();"
```

### 8. Check PostgreSQL Logs

```bash
sudo tail -50 /var/log/postgresql/postgresql-*-main.log
```

Look for any errors or connection attempts.

## Alternative: Test with psql from Local Machine

From your local machine, try:

```bash
PGPASSWORD='GeneVeda2025!Secure' psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences -c "SELECT version();"
```

If this works but Prisma doesn't, it might be an SSL issue.

## SSL Mode Options

If connection works with `psql` but not with Prisma, try changing SSL mode in `.env.local`:

```env
# Try without SSL first
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer"

# Or disable SSL
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=disable"
```

## Quick Fix Script

Run this on the server to fix common issues:

```bash
#!/bin/bash
# Run on server as user1

# Find PostgreSQL version
PG_VERSION=$(ls /etc/postgresql/ | head -n1)
PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"

echo "🔧 Fixing PostgreSQL configuration..."

# 1. Ensure listen_addresses is set
if ! grep -q "listen_addresses = '*'" "$PG_CONF"; then
    echo "Setting listen_addresses..."
    sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"
    sudo sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"
    if ! grep -q "listen_addresses" "$PG_CONF"; then
        echo "listen_addresses = '*'" | sudo tee -a "$PG_CONF"
    fi
fi

# 2. Ensure pg_hba.conf has remote access
if ! grep -q "geneveda_user.*0.0.0.0/0" "$PG_HBA"; then
    echo "Adding remote access to pg_hba.conf..."
    echo "host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5" | sudo tee -a "$PG_HBA"
fi

# 3. Allow firewall
echo "Configuring firewall..."
sudo ufw allow 5432/tcp 2>/dev/null || echo "UFW might not be active"

# 4. Restart
echo "Restarting PostgreSQL..."
sudo systemctl restart postgresql

# 5. Verify
echo "Verifying..."
sleep 3
if sudo netstat -tlnp 2>/dev/null | grep -q ":5432.*0.0.0.0"; then
    echo "✅ PostgreSQL is listening on 0.0.0.0:5432"
else
    echo "⚠️  PostgreSQL might not be listening correctly"
    echo "Check with: sudo netstat -tlnp | grep 5432"
fi

echo "✅ Done!"
```

## Network Troubleshooting

If still not working, check:

1. **Server firewall (iptables)**
   ```bash
   sudo iptables -L -n | grep 5432
   ```

2. **Cloud provider firewall** (AWS Security Groups, etc.)
   - Ensure port 5432 is open in the cloud console

3. **Test with telnet**
   ```bash
   telnet 40.192.24.24 5432
   ```
   If connection times out, it's a firewall/network issue.

## Next Steps After Fix

Once connection works:

1. Test: `npm run test-db` or visit `/api/test-db`
2. Push schema: `npx prisma db push`
3. Create admin: `npm run create-admin-prisma admin@geneveda.com admin123`

