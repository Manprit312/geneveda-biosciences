import { NextRequest, NextResponse } from "next/server";
import siteSettingsRepository from "@/app/services/repositories/siteSettingsRepository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const setting = await siteSettingsRepository.findByKey(key);
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
    }

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














