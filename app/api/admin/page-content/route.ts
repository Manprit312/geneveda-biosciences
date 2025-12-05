import { NextRequest, NextResponse } from "next/server";
import pageContentRepository from "@/app/services/repositories/pageContentRepository";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Fetch page content
async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get("pageSlug");
    const activeOnly = searchParams.get("activeOnly") !== "false";

    if (pageSlug) {
      const content = await pageContentRepository.findByPage(pageSlug, activeOnly);
      return NextResponse.json({
        success: true,
        content,
      });
    }

    return NextResponse.json(
      { success: false, message: "pageSlug parameter is required" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error fetching page content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch page content", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new page content
async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const content = await pageContentRepository.create(body);

    return NextResponse.json(
      { success: true, content },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating page content:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create page content", error: error.message },
      { status: 400 }
    );
  }
}

export const GET = requireAdmin(getHandler);
export const POST = requireAdmin(postHandler);

