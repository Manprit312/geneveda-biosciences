import "server-only";
import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "./get-database-url";

// Get database URL (from DATABASE_URL or construct from legacy env vars)
const databaseUrl = process.env.DATABASE_URL || getDatabaseUrl();

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Set DATABASE_URL if not already set (for backward compatibility)
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

