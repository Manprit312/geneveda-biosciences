import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/auth";
import { getAdminById } from "@/lib/auth";

async function handler(req: NextRequest, admin: { id: number; role: string }) {
  try {
    const adminData = await getAdminById(admin.id);

    if (!adminData) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: adminData.id,
        username: adminData.username,
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to get admin data", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handler);














