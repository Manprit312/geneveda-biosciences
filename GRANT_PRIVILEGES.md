# ✅ Grant PostgreSQL Privileges

## User Created Successfully! ✅

Now grant privileges to the user:

---

## Step 1: Grant Database Privileges

```bash
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"
```

---

## Step 2: Grant Schema Privileges

```bash
# Grant schema privileges
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"

# Grant table privileges
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"

# Grant sequence privileges
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

---

## Step 3: Test Connection

```bash
# Test connection
psql -h localhost -U geneveda_user -d geneveda_biosciences
# Password: GeneVeda2025!Secure
```

---

## 📋 All Commands (Copy-Paste)

```bash
echo 'manprit*' | sudo -S -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "GRANT ALL ON SCHEMA public TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;"
echo 'manprit*' | sudo -S -u postgres psql -d geneveda_biosciences -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;"
```

---

## ✅ After Privileges Granted

Connection details:
- **Host:** `40.192.24.24`
- **Port:** `5432`
- **Database:** `geneveda_biosciences`
- **User:** `geneveda_user`
- **Password:** `GeneVeda2025!Secure`

Then we'll configure Prisma in the project!

