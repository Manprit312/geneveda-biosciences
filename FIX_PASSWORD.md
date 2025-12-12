# Fix PostgreSQL Password Authentication

## Issue
Connection is working (firewall is open), but password authentication is failing.

## Solution: Reset Password on Server

SSH into the server and run:

```bash
ssh -i ~/.ssh/id_ed25519_developer user1@40.192.24.24
```

### Option 1: Reset Password for Existing User

```bash
# Connect as postgres user
sudo -u postgres psql

# Reset password
ALTER USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';

# Exit
\q
```

### Option 2: Recreate User (if user doesn't exist)

```bash
# Connect as postgres user
sudo -u postgres psql

# Drop and recreate user
DROP USER IF EXISTS geneveda_user;
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

# Grant schema privileges
\c geneveda_biosciences
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;

# Exit
\q
```

### Option 3: Check if User Exists

```bash
sudo -u postgres psql -c "\du"
```

This will list all users. Check if `geneveda_user` exists.

## Test After Fix

From your local machine:

```bash
cd geneveda-biosciences
PGPASSWORD='GeneVeda2025!Secure' psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences -c "SELECT current_database();"
```

## Alternative: Use Different Password

If you want to use a simpler password (without special characters):

```bash
# On server
sudo -u postgres psql -c "ALTER USER geneveda_user WITH PASSWORD 'GeneVeda2025Secure';"
```

Then update `.env.local`:
```env
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer"
```



