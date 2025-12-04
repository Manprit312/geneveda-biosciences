/**
 * Direct MySQL Connection Test
 * Tests connection with the exact password from .env.local
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing Direct MySQL Connection\n');
  console.log('Configuration from .env.local:');
  console.log(`   Host: ${process.env.DB_HOST || 'NOT SET'}`);
  console.log(`   User: ${process.env.DB_USER || 'NOT SET'}`);
  console.log(`   Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-4) : 'NOT SET'}`);
  console.log(`   Database: ${process.env.DB_NAME || 'NOT SET'}`);
  console.log(`   Port: ${process.env.DB_PORT || 'NOT SET'}\n`);

  if (!process.env.DB_PASSWORD) {
    console.log('❌ ERROR: DB_PASSWORD is not set in .env.local');
    process.exit(1);
  }

  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'geneveda_biosciences',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 5000,
  };

  try {
    console.log('🔌 Attempting connection...');
    const connection = await mysql.createConnection(config);
    
    const [rows] = await connection.execute('SELECT VERSION() as version, DATABASE() as database, USER() as user');
    await connection.end();
    
    console.log('\n✅ SUCCESS! Connected to MySQL');
    console.log(`   Version: ${rows[0].version}`);
    console.log(`   Database: ${rows[0].database || '(none selected)'}`);
    console.log(`   User: ${rows[0].user}`);
    
    // Check if database exists
    const dbCheck = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
    });
    
    const [dbs] = await dbCheck.execute(`SHOW DATABASES LIKE '${config.database}'`);
    await dbCheck.end();
    
    if (dbs.length > 0) {
      console.log(`\n✅ Database '${config.database}' exists`);
      return true;
    } else {
      console.log(`\n⚠️  Database '${config.database}' does not exist`);
      console.log('   Creating database...');
      
      const createConn = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
      });
      
      await createConn.execute(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
      await createConn.end();
      
      console.log(`✅ Database '${config.database}' created`);
      return true;
    }
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Access denied. Possible issues:');
      console.error('   1. Wrong password - check .env.local');
      console.error('   2. Password might have special characters that need escaping');
      console.error('   3. Try connecting via MySQL Workbench to verify password');
      console.error('\n   Test password manually:');
      console.error(`   /usr/local/mysql/bin/mysql -u ${config.user} -p`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Connection refused. MySQL might not be running.');
      console.error('   Check: ps aux | grep mysqld');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Database does not exist. Will create it...');
    }
    
    return false;
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n🎉 Database connection is ready!');
    console.log('   Next step: npm run init-db');
    process.exit(0);
  } else {
    process.exit(1);
  }
}).catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

