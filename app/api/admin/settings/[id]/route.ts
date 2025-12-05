import { NextRequest, NextResponse } from "next/server";
import siteSettingsRepository from "@/app/services/repositories/siteSettingsRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Get single setting
async function getHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const setting = await siteSettingsRepository.findById(parseInt(id));

    if (!setting) {
      return NextResponse.json(
        { success: false, message: "Setting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      setting,
    });
  } catch (error: any) {
    console.error("Error fetching setting:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch setting", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update setting
async function putHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const body = await req.json();
    const setting = await siteSettingsRepository.update({
      id: parseInt(id),
      ...body,
    });

    if (!setting) {
      return NextResponse.json(
        { success: false, message: "Setting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      setting,
    });
  } catch (error: any) {
    console.error("Error updating setting:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update setting", error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete setting
async function deleteHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const deleted = await siteSettingsRepository.delete(parseInt(id));

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Setting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Setting deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting setting:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete setting", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => getHandler(r, a, id))(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => putHandler(r, a, id))(req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => deleteHandler(r, a, id))(req);
}

