import { NextResponse } from "next/server";
import { testConnection } from "@/lib/db/connection-prisma";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    // Test basic connection
    const connected = await testConnection();
    
    if (!connected) {
      return NextResponse.json({
        success: false,
        message: "Database connection test failed",
      }, { status: 500 });
    }

    // Try to query the database using Prisma
    const result = await prisma.$queryRaw<Array<{ current_db: string; server_time: Date }>>`
      SELECT DATABASE() as current_db, NOW() as server_time
    `;
    
    // Check if tables exist
    const tableCount = await prisma.$queryRaw<Array<{ table_count: bigint }>>`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
    `;

    // Get database URL info (without password)
    const dbUrl = process.env.DATABASE_URL || "not set";
    const dbUrlInfo = dbUrl !== "not set" ? {
      hasUrl: true,
      // Extract host and database from URL without exposing password
      urlPreview: dbUrl.replace(/:\/\/[^:]+:[^@]+@/, "://***:***@"),
    } : { hasUrl: false };

    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      database: process.env.DB_NAME || "not set",
      host: process.env.DB_HOST || "not set",
      user: process.env.DB_USER || "not set",
      connectionInfo: result[0],
      tables: tableCount[0],
      prisma: {
        connected: true,
        ...dbUrlInfo,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Database connection error",
      error: error.message,
      errorCode: error.code,
      database: process.env.DB_NAME || "not set",
      host: process.env.DB_HOST || "not set",
      user: process.env.DB_USER || "not set",
      databaseUrl: process.env.DATABASE_URL ? "set (hidden)" : "not set",
      // Don't expose password, but show if other vars are set
      hasPassword: !!process.env.DB_PASSWORD,
    }, { status: 500 });
  }
}
