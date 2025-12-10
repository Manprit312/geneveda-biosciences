#!/bin/bash
# Update .env.local with new password

if [ ! -f .env.local ]; then
    echo "❌ .env.local not found"
    exit 1
fi

# Backup
cp .env.local .env.local.backup
echo "✅ Backup created: .env.local.backup"

# Update DATABASE_URL
sed -i '' 's/GeneVeda2025%21Secure/GeneVeda2025Secure/g' .env.local
sed -i '' 's/sslmode=require/sslmode=prefer/g' .env.local

# Update DB_PASSWORD if exists
sed -i '' 's/DB_PASSWORD=.*/DB_PASSWORD=GeneVeda2025Secure/g' .env.local

echo "✅ .env.local updated!"
echo ""
echo "New DATABASE_URL:"
grep DATABASE_URL .env.local
