import { NextRequest, NextResponse } from "next/server";
import serviceRepository from "@/app/services/repositories/serviceRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Fetch all services
async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("activeOnly") !== "false";

    const services = await serviceRepository.findAll(!activeOnly);

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

// POST - Create new service
async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const service = await serviceRepository.create(body);

    return NextResponse.json(
      { success: true, service },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create service", error: error.message },
      { status: 400 }
    );
  }
}

export const GET = requireAdmin(getHandler);
export const POST = requireAdmin(postHandler);

