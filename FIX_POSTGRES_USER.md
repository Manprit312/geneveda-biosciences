# 🔧 Fix PostgreSQL User Issue

## Issue: `postgres` user doesn't exist

This means PostgreSQL might not be fully initialized. Let's fix it:

---

## Solution 1: Initialize PostgreSQL Cluster

```bash
# Initialize PostgreSQL cluster
echo 'manprit*' | sudo -S /usr/lib/postgresql/*/bin/initdb -D /var/lib/postgresql/*/main

# Or try
echo 'manprit*' | sudo -S postgresql-setup initdb
```

---

## Solution 2: Check PostgreSQL Installation

```bash
# Check if PostgreSQL is installed
dpkg -l | grep postgres

# Check PostgreSQL version
/usr/lib/postgresql/*/bin/postgres --version

# Find PostgreSQL data directory
echo 'manprit*' | sudo -S find /var/lib -name postgresql -type d 2>/dev/null
```

---

## Solution 3: Create postgres User

```bash
# Create postgres user
echo 'manprit*' | sudo -S useradd -r -s /bin/bash postgres

# Or if useradd doesn't work
echo 'manprit*' | sudo -S adduser --system --group --home /var/lib/postgresql postgres
```

---

## Solution 4: Use Direct psql Connection

If PostgreSQL is running but postgres user doesn't exist, try:

```bash
# Check if PostgreSQL is running
echo 'manprit*' | sudo -S systemctl status postgresql

# Try connecting as current user
psql postgres

# Or try
psql -U $(whoami) -d postgres
```

---

## Solution 5: Reinstall PostgreSQL Properly

```bash
# Remove existing installation
echo 'manprit*' | sudo -S apt remove --purge postgresql* -y
echo 'manprit*' | sudo -S apt autoremove -y

# Reinstall
echo 'manprit*' | sudo -S apt update
echo 'manprit*' | sudo -S apt install postgresql postgresql-contrib -y

# This should create postgres user automatically
```

---

## Quick Check Commands

Run these to diagnose:

```bash
# Check PostgreSQL packages
dpkg -l | grep postgres

# Check if postgres user exists
id postgres

# Check PostgreSQL service
echo 'manprit*' | sudo -S systemctl status postgresql

# Check PostgreSQL process
ps aux | grep postgres

# Find PostgreSQL binaries
which psql
find /usr -name psql 2>/dev/null
```

---

## Alternative: Use Docker PostgreSQL

If standard installation is problematic:

```bash
# Install Docker (if not installed)
echo 'manprit*' | sudo -S apt install docker.io -y
echo 'manprit*' | sudo -S systemctl start docker
echo 'manprit*' | sudo -S systemctl enable docker

# Run PostgreSQL in Docker
echo 'manprit*' | sudo -S docker run -d \
  --name postgres-geneveda \
  -e POSTGRES_DB=geneveda_biosciences \
  -e POSTGRES_USER=geneveda_user \
  -e POSTGRES_PASSWORD=GeneVeda2025!Secure \
  -p 5432:5432 \
  postgres:15
```

---

## Recommended: Check Installation First

Before trying fixes, check what's actually installed:

```bash
# Check installed packages
dpkg -l | grep -i postgres

# Check service status
echo 'manprit*' | sudo -S systemctl list-units | grep postgres

# Check if PostgreSQL is running on port 5432
netstat -tlnp | grep 5432
```

Share the output and I'll help you fix it!

