import { NextRequest, NextResponse } from "next/server";
import pageContentRepository from "@/app/services/repositories/pageContentRepository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("pageSlug");

    if (!pageSlug) {
      return NextResponse.json(
        { success: false, message: "pageSlug parameter is required" },
        { status: 400 }
      );
    }

    const content = await pageContentRepository.findByPage(pageSlug, true);

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

