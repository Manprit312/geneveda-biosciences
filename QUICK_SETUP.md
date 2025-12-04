# Quick Local Database Setup

## Current Status
✅ `.env.local` has been configured for local development
❌ MySQL needs to be installed

## Option 1: Docker (Fastest - Recommended)

1. **Start Docker Desktop** (if not running)

2. **Run MySQL container:**
   ```bash
   docker run --name mysql-geneveda \
     -e MYSQL_ROOT_PASSWORD=geneveda123 \
     -e MYSQL_DATABASE=geneveda_biosciences \
     -p 3306:3306 \
     -d mysql:8.0
   ```

3. **Update `.env.local` password:**
   ```env
   DB_PASSWORD=geneveda123
   ```

4. **Test and initialize:**
   ```bash
   npm run test-db
   npm run init-db
   ```

## Option 2: Homebrew (Traditional)

1. **Install MySQL:**
   ```bash
   brew install mysql
   ```

2. **Start MySQL service:**
   ```bash
   brew services start mysql
   ```

3. **Set root password (if needed):**
   ```bash
   mysql_secure_installation
   ```
   Or set it directly:
   ```bash
   mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'yourpassword';"
   ```

4. **Create database:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE geneveda_biosciences;"
   ```

5. **Update `.env.local` with your password:**
   ```env
   DB_PASSWORD=yourpassword
   ```

6. **Test and initialize:**
   ```bash
   npm run test-db
   npm run init-db
   ```

## Option 3: Manual MySQL Installation

1. Download from: https://dev.mysql.com/downloads/mysql/
2. Install the `.dmg` file
3. Follow installation wizard
4. Note the root password when prompted
5. Update `.env.local` with the password
6. Create database: `mysql -u root -p -e "CREATE DATABASE geneveda_biosciences;"`
7. Run `npm run test-db` and `npm run init-db`

## After Setup

Once MySQL is running and `.env.local` has the correct password:

```bash
# Test connection
npm run test-db

# Initialize database tables
npm run init-db

# Start development server
npm run dev
```

Your app will now connect to the local database! 🎉

