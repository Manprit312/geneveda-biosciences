import "server-only";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDBConnection from "./db/connection";
import { RowDataPacket } from "mysql2";

export interface Admin {
  id: number;
  username: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
  active: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(adminId: number, role: string): string {
  return jwt.sign({ id: adminId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// Verify JWT token
export function verifyToken(token: string): { id: number; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Get admin by ID
export async function getAdminById(id: number): Promise<Admin | null> {
  const db = getDBConnection();
  const query = "SELECT id, username, email, name, role, active FROM admins WHERE id = ? AND active = TRUE";
  const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    username: rows[0].username,
    email: rows[0].email,
    name: rows[0].name,
    role: rows[0].role,
    active: Boolean(rows[0].active),
  };
}

// Get admin by email
export async function getAdminByEmail(email: string): Promise<(Admin & { password_hash: string }) | null> {
  const db = getDBConnection();
  const query = "SELECT id, username, email, name, role, active, password_hash FROM admins WHERE email = ?";
  const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    username: rows[0].username,
    email: rows[0].email,
    name: rows[0].name,
    role: rows[0].role,
    active: Boolean(rows[0].active),
    password_hash: rows[0].password_hash,
  };
}

// Create admin
export async function createAdmin(
  username: string,
  email: string,
  password: string,
  name: string,
  role: "admin" | "superadmin" = "admin"
): Promise<Admin> {
  const db = getDBConnection();
  const password_hash = await hashPassword(password);

  const query = `
    INSERT INTO admins (username, email, password_hash, name, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute<RowDataPacket[]>(query, [
    username,
    email,
    password_hash,
    name,
    role,
  ]);

  const adminId = (result as any).insertId;
  const admin = await getAdminById(adminId);

  if (!admin) {
    throw new Error("Failed to create admin");
  }

  return admin;
}

// Update admin last login
export async function updateAdminLastLogin(id: number): Promise<void> {
  const db = getDBConnection();
  const query = "UPDATE admins SET last_login = NOW() WHERE id = ?";
  await db.execute(query, [id]);
}

