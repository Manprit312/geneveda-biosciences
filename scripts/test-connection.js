require("dotenv").config({ path: ".env.local" });
const mysql = require("mysql2/promise");

async function testConnection() {
  const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "geneveda_biosciences",
    port: parseInt(process.env.DB_PORT || "3306"),
  };

  console.log("\n🔍 Testing MySQL Connection...");
  console.log(`   Host: ${config.host}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   Port: ${config.port}`);
  console.log("");

  try {
    const connection = await mysql.createConnection(config);
    console.log("✅ Connection successful!");

    // Check if admins table exists
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'admins'"
    );

    if (tables.length === 0) {
      console.log("⚠️  'admins' table does not exist");
      console.log("   Run migrations first or create table manually");
    } else {
      console.log("✅ 'admins' table exists");

      // Check for admin users
      const [admins] = await connection.execute(
        "SELECT id, username, email, name, role, active FROM admins"
      );

      if (admins.length === 0) {
        console.log("❌ No admin users found");
        console.log("\n💡 Create admin using:");
        console.log("   npm run create-admin-prisma admin@geneveda.com \"Admin123!\"");
      } else {
        console.log(`\n✅ Found ${admins.length} admin user(s):\n`);
        admins.forEach((admin, index) => {
          console.log(`${index + 1}. Admin #${admin.id}`);
          console.log(`   Username: ${admin.username}`);
          console.log(`   Email: ${admin.email}`);
          console.log(`   Name: ${admin.name}`);
          console.log(`   Role: ${admin.role}`);
          console.log(`   Active: ${admin.active ? "✅ Yes" : "❌ No"}`);
          console.log("");
        });
      }
    }

    await connection.end();
  } catch (error) {
    console.error("❌ Connection failed!");
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("\n💡 Authentication failed!");
      console.error("   Check:");
      console.error("   1. Username and password are correct");
      console.error("   2. User has permissions on the database");
      console.error("   3. Database name is correct");
    } else if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      console.error("\n💡 Cannot reach database server!");
      console.error("   Check:");
      console.error("   1. Host address is correct");
      console.error("   2. Remote MySQL is enabled on Hostinger");
      console.error("   3. For Hostinger, try DB_HOST=localhost instead of IP");
    }
  }
}

testConnection();

