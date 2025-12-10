/**
 * Helper function to get DATABASE_URL from environment variables
 * Supports both DATABASE_URL and legacy DB_* variables
 */

export function getDatabaseUrl(): string {
  // If DATABASE_URL is set, use it directly
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Otherwise, construct from legacy environment variables
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "3306";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "geneveda_biosciences";
  const ssl = process.env.DB_SSL === "true";

  // URL encode password to handle special characters
  const encodedPassword = encodeURIComponent(password);

  // Construct MySQL connection URL
  const url = `mysql://${user}:${encodedPassword}@${host}:${port}/${database}${ssl ? "?sslaccept=strict" : ""}`;

  return url;
}

