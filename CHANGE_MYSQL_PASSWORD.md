# How to Change MySQL Root Password Using MySQL Workbench

## Method 1: Using MySQL Workbench GUI

1. **Open MySQL Workbench**

2. **Connect to your MySQL server:**
   - Click on your saved connection (or create a new one)
   - Enter your current root password if prompted
   - Click "OK" to connect

3. **Open SQL Editor:**
   - Once connected, click on "Query" → "New Query Tab" (or press `Cmd+T`)

4. **Run the password change command:**
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'mnprt@Bharatail';
   FLUSH PRIVILEGES;
   ```

5. **Execute the query:**
   - Click the lightning bolt icon (⚡) or press `Cmd+Enter`
   - You should see "Query OK" if successful

6. **Test the new password:**
   - Disconnect and reconnect using the new password
   - Or test from terminal: `/usr/local/mysql/bin/mysql -u root -p`

## Method 2: Using Terminal (Alternative)

If you can't connect via Workbench, use terminal:

1. **Connect to MySQL:**
   ```bash
   /usr/local/mysql/bin/mysql -u root -p
   ```
   (Enter your current password when prompted)

2. **Change password:**
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'mnprt@Bharatail';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Test new password:**
   ```bash
   /usr/local/mysql/bin/mysql -u root -p
   ```
   (Enter the new password: `mnprt@Bharatail`)

## Method 3: If You Forgot Current Password

If you can't remember the current password:

1. **Stop MySQL:**
   ```bash
   sudo /usr/local/mysql/support-files/mysql.server stop
   ```

2. **Start MySQL in safe mode (skip password):**
   ```bash
   sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables &
   ```

3. **Connect without password:**
   ```bash
   /usr/local/mysql/bin/mysql -u root
   ```

4. **Reset password:**
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'mnprt@Bharatail';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Stop safe mode and restart MySQL normally:**
   ```bash
   sudo pkill mysqld_safe
   sudo /usr/local/mysql/support-files/mysql.server start
   ```

## After Changing Password

Once the password is changed to `mnprt@Bharatail`:

1. ✅ Your `.env.local` already has the correct password
2. Test connection: `npm run test-db`
3. Initialize database: `npm run init-db`

## Quick Test

After changing password, test it:
```bash
/usr/local/mysql/bin/mysql -u root -p'mnprt@Bharatail' -e "SELECT 'Password works!' as status;"
```

If you see "Password works!", you're all set! 🎉

