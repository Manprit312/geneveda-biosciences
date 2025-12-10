import "server-only";
import { prisma } from "./prisma";

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Prisma Database Connected");
    return true;
  } catch (error: any) {
    console.error("❌ Prisma Connection Error:", error.message);
    if (error.code === "P1000" || error.code === "P1001") {
      console.error("\n💡 Troubleshooting:");
      console.error("   1. Check if DATABASE_URL is correct in .env.local");
      console.error("   2. Verify database credentials");
      console.error("   3. Ensure database exists");
      console.error("   4. Check if remote MySQL access is enabled");
    }
    return false;
  }
};

// Close connection (useful for cleanup)
export const closeConnection = async (): Promise<void> => {
  await prisma.$disconnect();
  console.log("✅ Prisma Connection Closed");
};

export default prisma;

