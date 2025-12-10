#!/bin/bash
# Run this on the server to verify PostgreSQL configuration

echo "🔍 Checking PostgreSQL Configuration..."
echo ""

# Check PostgreSQL status
echo "1. PostgreSQL Status:"
sudo systemctl status postgresql --no-pager | head -5
echo ""

# Check listening ports
echo "2. Listening Ports:"
sudo netstat -tlnp 2>/dev/null | grep 5432 || sudo ss -tlnp | grep 5432
echo ""

# Check postgresql.conf
echo "3. listen_addresses setting:"
sudo grep -E "^listen_addresses|^#listen_addresses" /etc/postgresql/*/main/postgresql.conf | head -1
echo ""

# Check pg_hba.conf for remote access
echo "4. Remote access in pg_hba.conf:"
sudo tail -3 /etc/postgresql/*/main/pg_hba.conf | grep -E "geneveda|0.0.0.0" || echo "No remote access found"
echo ""

# Check firewall
echo "5. Firewall status:"
sudo ufw status | grep 5432 || echo "Port 5432 not in UFW rules"
echo ""

# Test local connection
echo "6. Testing local connection:"
PGPASSWORD='GeneVeda2025!Secure' psql -h localhost -U geneveda_user -d geneveda_biosciences -c "SELECT current_database(), version();" 2>&1 | head -3
echo ""

echo "✅ Verification complete!"
