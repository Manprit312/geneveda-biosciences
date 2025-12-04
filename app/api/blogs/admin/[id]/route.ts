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

// GET - Fetch blog post by ID (for admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();

    const { id } = await params;
    const blog = await blogService.getBlogById(Number(id));

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

// PUT - Update blog post (protected - add auth later)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      authorRole,
      category,
      tags,
      readTime,
      featured,
      published,
    } = body;

    // Parse tags
    const tagsArray = tags
      ? typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : tags
      : undefined;

    const blog = await blogService.updateBlog({
      id: Number(id),
      title,
      slug,
      excerpt,
      content,
      author,
      authorRole,
      category,
      tags: tagsArray,
      readTime,
      featured,
      published,
    });

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
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update blog post", error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete blog post (protected - add auth later)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();

    const { id } = await params;
    const deleted = await blogService.deleteBlog(Number(id));

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog post", error: error.message },
      { status: 500 }
    );
  }
}
