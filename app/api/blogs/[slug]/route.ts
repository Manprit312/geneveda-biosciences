import { NextRequest, NextResponse } from "next/server";
import blogService from "@/app/services/blogService";
import { initializeDatabase } from "@/lib/db/migrations";

// Initialize database on first request
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
};

// GET - Fetch single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await initDB();

    const { slug } = await params;
    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Transform to match frontend expectations
    const transformedBlog = {
      _id: blog.id.toString(),
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      authorRole: blog.author_role,
      publishedAt: blog.published_at.toISOString(),
      category: blog.category,
      tags: blog.tags,
      image: blog.image,
      readTime: blog.read_time,
      featured: blog.featured,
      views: blog.views,
    };

    return NextResponse.json({
      success: true,
      blog: transformedBlog,
    });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog post", error: error.message },
      { status: 500 }
    );
  }
}
