import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/middleware/auth";

async function handler(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");

  return NextResponse.json({
    success: true,
    message: "Logout successful",
  });
}

export const POST = requireAdmin(handler);








