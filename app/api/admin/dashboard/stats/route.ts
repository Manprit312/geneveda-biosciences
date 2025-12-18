import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/auth";
import blogRepository from "@/app/services/repositories/blogRepository";
import serviceRepository from "@/app/services/repositories/serviceRepository";
import pageContentRepository from "@/app/services/repositories/pageContentRepository";

async function getHandler(req: NextRequest) {
  try {
    const [blogStats, services, pageContent] = await Promise.all([
      blogRepository.getStats(),
      serviceRepository.findAll(false),
      pageContentRepository.findByPage("home", false),
    ]);

    const stats = {
      blogs: {
        total: blogStats.total,
        published: blogStats.published,
        featured: blogStats.featured,
        totalViews: blogStats.totalViews,
        categoryCounts: blogStats.categoryCounts,
      },
      services: {
        total: services.length,
        active: services.filter((s) => s.active).length,
      },
      pageContent: {
        total: pageContent.length,
        active: pageContent.filter((p) => p.active).length,
      },
    };

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard stats", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(getHandler);














