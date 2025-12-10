import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    // Test connection
    await prisma.$queryRaw`SELECT 1 as test`;
    
    // Get database info
    const result = await prisma.$queryRaw<Array<{ current_database: string; version: string }>>`
      SELECT current_database(), version() as version
    `;

    // Get table count
    const tableCount = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::int as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({
      success: true,
      message: "PostgreSQL database connection successful!",
      database: process.env.DB_NAME || "geneveda_biosciences",
      host: process.env.DB_HOST || "40.192.24.24",
      connectionInfo: result[0],
      tables: tableCount[0],
      prisma: {
        connected: true,
        databaseUrl: process.env.DATABASE_URL ? "set (hidden)" : "not set",
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
      databaseUrl: process.env.DATABASE_URL ? "set (hidden)" : "not set",
    }, { status: 500 });
  }
}
