#!/bin/bash

# Database Setup Script for GeneVeda Biosciences
# This script helps set up MySQL database for local development

echo "🔧 GeneVeda Biosciences - Database Setup"
echo "========================================"
echo ""

# Check if MySQL is running
check_mysql() {
    if command -v mysql &> /dev/null; then
        echo "✅ MySQL is installed"
        return 0
    else
        echo "❌ MySQL is not installed"
        return 1
    fi
}

# Check if Docker is available
check_docker() {
    if command -v docker &> /dev/null && docker info &> /dev/null; then
        echo "✅ Docker is available and running"
        return 0
    else
        echo "⚠️  Docker is not available or not running"
        return 1
    fi
}

# Setup MySQL via Docker
setup_docker_mysql() {
    echo ""
    echo "🐳 Setting up MySQL via Docker..."
    
    # Check if container already exists
    if docker ps -a | grep -q mysql-geneveda; then
        echo "📦 Container exists, starting it..."
        docker start mysql-geneveda
    else
        echo "📦 Creating new MySQL container..."
        docker run --name mysql-geneveda \
            -e MYSQL_ROOT_PASSWORD=geneveda123 \
            -e MYSQL_DATABASE=geneveda_biosciences \
            -p 3306:3306 \
            -d mysql:8.0
        
        echo "⏳ Waiting for MySQL to start..."
        sleep 5
    fi
    
    echo "✅ MySQL container is running"
    echo "   Host: localhost"
    echo "   Port: 3306"
    echo "   Database: geneveda_biosciences"
    echo "   User: root"
    echo "   Password: geneveda123"
}

# Setup MySQL via Homebrew
setup_homebrew_mysql() {
    echo ""
    echo "🍺 Setting up MySQL via Homebrew..."
    
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew is not installed"
        echo "   Install from: https://brew.sh"
        return 1
    fi
    
    echo "📦 Installing MySQL..."
    brew install mysql
    
    echo "🚀 Starting MySQL service..."
    brew services start mysql
    
    echo "⏳ Waiting for MySQL to start..."
    sleep 3
    
    echo "📝 Creating database..."
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS geneveda_biosciences;" 2>/dev/null || {
        echo "⚠️  Could not create database automatically"
        echo "   Please run manually:"
        echo "   mysql -u root -p"
        echo "   CREATE DATABASE geneveda_biosciences;"
    }
    
    echo "✅ MySQL is set up"
    echo "   Host: localhost"
    echo "   Port: 3306"
    echo "   Database: geneveda_biosciences"
    echo "   User: root"
    echo "   Password: (your MySQL root password)"
}

# Main setup
main() {
    if check_mysql; then
        echo ""
        echo "✅ MySQL is already installed and available"
        echo "   You can test the connection with: npm run test-db"
        exit 0
    fi
    
    echo ""
    echo "MySQL is not installed. Choose an option:"
    echo ""
    echo "1. Use Docker (Recommended - Fastest setup)"
    echo "2. Use Homebrew (Traditional installation)"
    echo "3. Exit and install manually"
    echo ""
    read -p "Enter choice [1-3]: " choice
    
    case $choice in
        1)
            if check_docker; then
                setup_docker_mysql
            else
                echo ""
                echo "❌ Docker is not running"
                echo "   Please start Docker Desktop and run this script again"
                exit 1
            fi
            ;;
        2)
            setup_homebrew_mysql
            ;;
        3)
            echo ""
            echo "📖 Manual Installation Guide:"
            echo "   1. Install MySQL from: https://dev.mysql.com/downloads/mysql/"
            echo "   2. Or use: brew install mysql && brew services start mysql"
            echo "   3. Create database: mysql -u root -p -e 'CREATE DATABASE geneveda_biosciences;'"
            echo "   4. Update .env.local with your MySQL credentials"
            echo "   5. Run: npm run test-db"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "   1. Test connection: npm run test-db"
    echo "   2. Initialize database: npm run init-db (if available)"
    echo "   3. Start development: npm run dev"
}

main

