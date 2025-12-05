import { NextRequest, NextResponse } from "next/server";
import blogService from "@/app/services/blogService";
import { initializeDatabase } from "@/lib/db/migrations";
import { requireAdmin } from "@/lib/middleware/auth";

// Initialize database on first request
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
};

// GET - Fetch blog post by ID (for admin)
async function getHandler(
  request: NextRequest,
  admin: { id: number; role: string },
  id: string
) {
  try {
    await initDB();

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => getHandler(r, a, id))(request);
}

// PUT - Update blog post (protected)
async function putHandler(
  request: NextRequest,
  admin: { id: number; role: string },
  id: string
) {
  try {
    await initDB();

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

// DELETE - Delete blog post (protected)
async function deleteHandler(
  request: NextRequest,
  admin: { id: number; role: string },
  id: string
) {
  try {
    await initDB();

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => putHandler(r, a, id))(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return requireAdmin((r, a) => deleteHandler(r, a, id))(request);
}
