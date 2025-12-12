#!/bin/bash
# Setup PostgreSQL for Remote Access
# Run this script on the server: 40.192.24.24

set -e

echo "🔧 Configuring PostgreSQL for remote access..."

# Find PostgreSQL version
PG_VERSION=$(ls /etc/postgresql/ | head -n1)
PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"

if [ ! -f "$PG_CONF" ]; then
    echo "❌ PostgreSQL config not found at $PG_CONF"
    exit 1
fi

# 1. Update postgresql.conf to listen on all interfaces
echo "📝 Updating postgresql.conf..."
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"
if ! grep -q "listen_addresses = '*'" "$PG_CONF"; then
    echo "listen_addresses = '*'" | sudo tee -a "$PG_CONF"
fi

# 2. Add remote access to pg_hba.conf
echo "📝 Updating pg_hba.conf..."
if ! grep -q "geneveda_user" "$PG_HBA"; then
    echo "host    geneveda_biosciences    geneveda_user    0.0.0.0/0    md5" | sudo tee -a "$PG_HBA"
fi

# 3. Allow firewall port
echo "🔥 Configuring firewall..."
sudo ufw allow 5432/tcp || echo "UFW might not be active"

# 4. Restart PostgreSQL
echo "🔄 Restarting PostgreSQL..."
sudo systemctl restart postgresql

# 5. Verify
echo "✅ Verifying configuration..."
sleep 2
if sudo netstat -tlnp 2>/dev/null | grep -q ":5432"; then
    echo "✅ PostgreSQL is listening on port 5432"
else
    echo "⚠️  PostgreSQL might not be listening. Check status:"
    echo "   sudo systemctl status postgresql"
fi

echo ""
echo "✅ Configuration complete!"
echo ""
echo "Test connection from local machine:"
echo "  PGPASSWORD='GeneVeda2025!Secure' psql -h 40.192.24.24 -U geneveda_user -d geneveda_biosciences -c \"SELECT version();\""
echo ""


