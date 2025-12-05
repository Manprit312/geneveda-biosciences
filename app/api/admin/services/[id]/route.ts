import { NextRequest, NextResponse } from "next/server";
import serviceRepository from "@/app/services/repositories/serviceRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Get single service
async function getHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const service = await serviceRepository.findById(parseInt(id));

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
  } catch (error: any) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update service
async function putHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const body = await req.json();
    const service = await serviceRepository.update({
      id: parseInt(id),
      ...body,
    });

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
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update service", error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete service
async function deleteHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const deleted = await serviceRepository.delete(parseInt(id));

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service", error: error.message },
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

