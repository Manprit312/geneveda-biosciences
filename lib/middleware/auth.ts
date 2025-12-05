import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getAdminById } from "../auth";

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    id: number;
    role: string;
  };
}

export async function authenticateAdmin(
  request: NextRequest
): Promise<{ admin: { id: number; role: string } } | NextResponse> {
  try {
    // Get token from Authorization header or cookie
    const authHeader = request.headers.get("authorization");
    let token: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Try to get from cookie
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        token = cookies["admin_token"];
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Verify admin exists and is active
    const admin = await getAdminById(decoded.id);
    if (!admin || !admin.active) {
      return NextResponse.json(
        { success: false, message: "Admin account not found or inactive" },
        { status: 401 }
      );
    }

    return { admin: { id: decoded.id, role: decoded.role } };
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication error" },
      { status: 401 }
    );
  }
}

export function requireAdmin(
  handler: (req: NextRequest, admin: { id: number; role: string }) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authResult = await authenticateAdmin(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    return handler(req, authResult.admin);
  };
}

export function requireSuperAdmin(
  handler: (req: NextRequest, admin: { id: number; role: string }) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authResult = await authenticateAdmin(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    if (authResult.admin.role !== "superadmin") {
      return NextResponse.json(
        { success: false, message: "Super admin access required" },
        { status: 403 }
      );
    }

    return handler(req, authResult.admin);
  };
}

