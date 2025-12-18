import { NextRequest, NextResponse } from "next/server";
import siteSettingsRepository from "@/app/services/repositories/siteSettingsRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Fetch all settings
async function getHandler(req: NextRequest) {
  try {
    const settings = await siteSettingsRepository.findAll();

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new setting
async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const setting = await siteSettingsRepository.create(body);

    return NextResponse.json(
      { success: true, setting },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating setting:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create setting", error: error.message },
      { status: 400 }
    );
  }
}

export const GET = requireAdmin(getHandler);
export const POST = requireAdmin(postHandler);














