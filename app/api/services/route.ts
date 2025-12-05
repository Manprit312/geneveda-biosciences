import { NextRequest, NextResponse } from "next/server";
import serviceRepository from "@/app/services/repositories/serviceRepository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const activeOnly = searchParams.get("activeOnly") !== "false";

    if (slug) {
      const service = await serviceRepository.findBySlug(slug);
      if (!service) {
        return NextResponse.json(
          { success: false, message: "Service not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        service,
      });
    }

    const services = await serviceRepository.findAll(activeOnly);

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error: any) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services", error: error.message },
      { status: 500 }
    );
  }
}

