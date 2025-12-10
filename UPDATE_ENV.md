# Update .env.local

## Current DATABASE_URL:
```
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025%21Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=require"
```

## Update to (new password without !):
```
DATABASE_URL="postgresql://geneveda_user:GeneVeda2025Secure@40.192.24.24:5432/geneveda_biosciences?sslmode=prefer"
```

## Changes:
1. Password changed: `GeneVeda2025%21Secure` → `GeneVeda2025Secure`
   - Removed `%21` (which was URL-encoded `!`)
   - Now using simpler password without special characters

2. SSL mode changed: `sslmode=require` → `sslmode=prefer`
   - `prefer` will try SSL but fallback if not available
   - Better for initial connection testing

## Also update legacy format (if present):
```
DB_PASSWORD=GeneVeda2025Secure
```

## Quick command to update (run in geneveda-biosciences directory):
```bash
# Backup first
cp .env.local .env.local.backup

# Update DATABASE_URL
sed -i '' 's/GeneVeda2025%21Secure/GeneVeda2025Secure/g' .env.local
sed -i '' 's/sslmode=require/sslmode=prefer/g' .env.local

# Update DB_PASSWORD if exists
sed -i '' 's/DB_PASSWORD=.*/DB_PASSWORD=GeneVeda2025Secure/g' .env.local
```
