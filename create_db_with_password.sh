#!/bin/bash
# Create PostgreSQL database with password
# Password: manprit*

echo "📦 Creating PostgreSQL database and user..."

# Create database and user using sudo with password
echo "manprit*" | sudo -S -u postgres psql << EOF
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



