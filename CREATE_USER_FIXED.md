# 🔧 Create PostgreSQL User (Fixed)

## Issue: Password with `!` causes bash error

The `!` in password triggers bash history expansion. Use one of these solutions:

---

## Solution 1: Escape the Password (Recommended)

```bash
# Create user with escaped password
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025\!Secure';"
```

---

## Solution 2: Use Different Password (Easier)

```bash
# Create user with simpler password
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025Secure';"
```

---

## Solution 3: Disable History Expansion

```bash
# Disable history expansion temporarily
set +H
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';"
set -H
```

---

## Solution 4: Use psql Interactive Mode

```bash
# Enter psql
echo 'manprit*' | sudo -S -u postgres psql

# Then run (without echo):
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';
```

---

## Complete Setup (After User Created)

Once user is created, run:

```bash
# Grant privileges
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"

# Grant schema privileges
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

---

## Recommended: Use Simpler Password

Easiest solution - use a password without `!`:

```bash
# Create user
echo 'manprit*' | sudo -S -u postgres psql -c "CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025Secure';"

# Grant privileges
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

**New Password:** `GeneVeda2025Secure` (without `!`)

---

## Test Connection

```bash
# Test connection
psql -h localhost -U geneveda_user -d geneveda_biosciences
# Password: GeneVeda2025Secure (or whatever you set)
```



