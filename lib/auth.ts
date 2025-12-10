import "server-only";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db/prisma";

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
  const admin = await prisma.admin.findUnique({
    where: { id, active: true },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      active: true,
    },
  });

  if (!admin) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    active: admin.active,
  };
}

// Get admin by email
export async function getAdminByEmail(email: string): Promise<(Admin & { password_hash: string }) | null> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    active: admin.active,
    password_hash: admin.passwordHash,
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
  const passwordHash = await hashPassword(password);

  const admin = await prisma.admin.create({
    data: {
      username,
      email,
      passwordHash,
      name,
      role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      active: true,
    },
  });

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    active: admin.active,
  };
}

// Update admin last login
export async function updateAdminLastLogin(id: number): Promise<void> {
  await prisma.admin.update({
    where: { id },
    data: {
      lastLogin: new Date(),
    },
  });
}
