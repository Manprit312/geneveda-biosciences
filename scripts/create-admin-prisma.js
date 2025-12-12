require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);
  const email = args[0] || "admin@geneveda.com";
  const password = args[1] || "admin123";
  const username = args[2] || email.split("@")[0];
  const name = args[3] || "Admin User";

  try {
    // Check if admin exists
    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("❌ Admin with this email already exists");
      console.log(`   Existing admin: ${existing.email}`);
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        passwordHash,
        name,
        role: "superadmin",
      },
    });

    console.log("\n✅ Admin user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${username}`);
    console.log(`   Name: ${name}`);
    console.log(`   Role: superadmin`);
    console.log("\n🌐 Login URL:");
    console.log(`   Local: http://localhost:3000/admin/login`);
    console.log(`   Live: https://your-app.vercel.app/admin/login`);
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    if (error.code === "P2002") {
      console.error("   This email or username already exists!");
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();



