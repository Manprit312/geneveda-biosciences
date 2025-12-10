require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (admins.length === 0) {
      console.log("\n❌ No admin users found in database!");
      console.log("\n💡 Create an admin using:");
      console.log("   npm run create-admin-prisma admin@geneveda.com \"Admin123!\"");
      process.exit(1);
    }

    console.log("\n✅ Found", admins.length, "admin user(s):\n");
    
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Admin #${admin.id}`);
      console.log(`   Username: ${admin.username}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Active: ${admin.active ? "✅ Yes" : "❌ No"}`);
      console.log(`   Created: ${admin.createdAt.toLocaleString()}`);
      console.log("");
    });

    console.log("🌐 Login URL:");
    console.log("   Local: http://localhost:3000/admin/login");
    console.log("   Live: https://your-app.vercel.app/admin/login");
    console.log("\n📧 Use any of the emails above to login");
  } catch (error) {
    console.error("❌ Error checking admins:", error.message);
    if (error.code === "P1001") {
      console.error("\n💡 Cannot connect to database!");
      console.error("   Check your DATABASE_URL in .env.local");
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();

