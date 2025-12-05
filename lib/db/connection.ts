import "server-only";

import mysql from "mysql2/promise";

// Database connection pool
let pool: mysql.Pool | null = null;

export const getDBConnection = (): mysql.Pool => {
  if (!pool) {
    const config = {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "geneveda_biosciences",
      port: parseInt(process.env.DB_PORT || "3306"),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      // Additional options for shared hosting
      ssl: process.env.DB_SSL === "true" ? {} : false,
      connectTimeout: 10000,
    };

    pool = mysql.createPool(config);
    console.log("✅ MySQL Connection Pool Created");
    console.log(`   Host: ${config.host}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   User: ${config.user}`);
  }

  return pool;
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = getDBConnection();
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("✅ MySQL Database Connected");
    return true;
  } catch (error: any) {
    console.error("❌ MySQL Connection Error:", error.message);
    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("\n💡 Troubleshooting:");
      console.error("   1. Check if DB_HOST is correct (not 'localhost' for shared hosting)");
      console.error("   2. Verify username and password in .env.local");
      console.error("   3. Ensure user has permissions to access the database");
      console.error("   4. Check your hosting panel for the correct MySQL hostname");
    }
    return false;
  }
};

// Close all connections (useful for cleanup)
export const closeConnection = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("✅ MySQL Connection Pool Closed");
  }
};

export default getDBConnection;
