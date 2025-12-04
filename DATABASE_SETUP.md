# Database Setup Guide

This guide will help you connect your GeneVeda Biosciences application to MySQL.

## Quick Start

### Option 1: Using Docker (Recommended - Fastest)

1. **Start Docker Desktop** (if not running)

2. **Run the setup script:**
   ```bash
   npm run setup-db
   ```
   Or manually:
   ```bash
   docker run --name mysql-geneveda \
     -e MYSQL_ROOT_PASSWORD=geneveda123 \
     -e MYSQL_DATABASE=geneveda_biosciences \
     -p 3306:3306 \
     -d mysql:8.0
   ```

3. **Update `.env.local`:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=geneveda123
   DB_NAME=geneveda_biosciences
   DB_PORT=3306
   ```

4. **Test connection:**
   ```bash
   npm run test-db
   ```

5. **Initialize database:**
   ```bash
   npm run init-db
   ```

### Option 2: Using Homebrew (macOS)

1. **Install MySQL:**
   ```bash
   brew install mysql
   brew services start mysql
   ```

2. **Create database:**
   ```bash
   mysql -u root -p
   ```
   Then in MySQL:
   ```sql
   CREATE DATABASE geneveda_biosciences;
   EXIT;
   ```

3. **Update `.env.local`:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_root_password
   DB_NAME=geneveda_biosciences
   DB_PORT=3306
   ```

4. **Test and initialize:**
   ```bash
   npm run test-db
   npm run init-db
   ```

### Option 3: Manual Installation

1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install and start MySQL service
3. Create database: `CREATE DATABASE geneveda_biosciences;`
4. Update `.env.local` with your credentials
5. Run `npm run test-db` and `npm run init-db`

## Configuration Files

### `.env.local` (Local Development)

```env
# Local Development Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=geneveda123
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

### Production Configuration (for Hostinger)

When deploying to production, update `.env.local` or use environment variables:

```env
# Production Database (Hostinger)
DB_HOST=localhost
DB_USER=u896634865_manprit
DB_PASSWORD=mnprt@Bharatail
DB_NAME=u896634865_blogdb
DB_PORT=3306
```

**Note:** On Hostinger, use `localhost` as the host (not `mysql.hostinger.in`) because the app runs on the same server as MySQL.

## Available Scripts

- `npm run test-db` - Test database connection
- `npm run check-env` - Check environment variables
- `npm run init-db` - Initialize database tables
- `npm run setup-db` - Interactive setup script (Docker/Homebrew)

## Troubleshooting

### Connection Refused / ENOTFOUND

**Problem:** Cannot connect to MySQL host

**Solutions:**
1. Make sure MySQL is running:
   ```bash
   # Docker
   docker ps | grep mysql
   
   # Homebrew
   brew services list | grep mysql
   ```

2. Check `.env.local` has correct `DB_HOST`:
   - Local: `DB_HOST=localhost`
   - Remote: Use the correct hostname from your hosting panel

3. Verify port 3306 is not blocked

### Access Denied

**Problem:** Wrong username/password

**Solutions:**
1. Verify credentials in `.env.local`
2. Check user has permissions:
   ```sql
   GRANT ALL PRIVILEGES ON geneveda_biosciences.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Database Does Not Exist

**Problem:** `ER_BAD_DB_ERROR`

**Solution:**
```bash
mysql -u root -p -e "CREATE DATABASE geneveda_biosciences;"
```

### Docker Not Running

**Problem:** `Cannot connect to Docker daemon`

**Solution:**
1. Start Docker Desktop
2. Wait for it to fully start
3. Run setup again

## Database Schema

The initialization script creates:

- **blogs** table with:
  - id, title, slug, excerpt, content
  - author, author_role, category
  - tags (JSON), image, read_time
  - featured, published, published_at
  - views, created_at, updated_at
  - Indexes on category, published, and slug

## Next Steps

Once the database is connected:

1. ✅ Test connection: `npm run test-db`
2. ✅ Initialize tables: `npm run init-db`
3. ✅ Start development: `npm run dev`
4. ✅ Test API: Visit `http://localhost:3000/api/blogs`

The API routes will automatically use the database once connected!

