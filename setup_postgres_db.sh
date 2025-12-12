#!/bin/bash
# Script to create PostgreSQL database and user
# Run this on the server

echo "📦 Creating PostgreSQL database and user..."

sudo -u postgres psql << EOF
-- Create database
CREATE DATABASE geneveda_biosciences;

-- Create user
CREATE USER geneveda_user WITH PASSWORD 'GeneVeda2025!Secure';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE geneveda_biosciences TO geneveda_user;

-- Connect to database
\c geneveda_biosciences

-- Grant schema privileges (for PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO geneveda_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO geneveda_user;

-- Exit
\q
EOF

echo "✅ Database setup complete!"
echo ""
echo "Connection details:"
echo "  Host: 40.192.24.24"
echo "  Port: 5432"
echo "  Database: geneveda_biosciences"
echo "  User: geneveda_user"
echo "  Password: GeneVeda2025!Secure"


