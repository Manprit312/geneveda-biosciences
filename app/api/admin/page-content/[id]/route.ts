import { NextRequest, NextResponse } from "next/server";
import pageContentRepository from "@/app/services/repositories/pageContentRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Get single page content
async function getHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const content = await pageContentRepository.findById(parseInt(id));

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Page content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error: any) {
    console.error("Error fetching page content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch page content", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update page content
async function putHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const body = await req.json();
    const content = await pageContentRepository.update({
      id: parseInt(id),
      ...body,
    });

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Page content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error: any) {
    console.error("Error updating page content:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update page content", error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete page content
async function deleteHandler(req: NextRequest, admin: { id: number; role: string }, id: string) {
  try {
    const deleted = await pageContentRepository.delete(parseInt(id));

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Page content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page content deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting page content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete page content", error: error.message },
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

