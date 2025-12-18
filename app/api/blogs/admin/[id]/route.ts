import { NextRequest, NextResponse } from "next/server";
import blogService from "@/app/services/blogService";
import { requireAdmin } from "@/lib/middleware/auth";

// GET - Fetch blog post by ID (for admin)
async function getHandler(
  request: NextRequest,
  admin: { id: number; role: string },
  id: string
) {
  try {

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
      authorRole: blog.author_role || '',
      publishedAt: blog.published_at ? blog.published_at.toISOString() : (blog.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString()),
      category: blog.category,
      tags: blog.tags || [],
      image: blog.image || '',
      images: blog.images && Array.isArray(blog.images) ? blog.images : (blog.image ? [blog.image] : []),
      readTime: blog.read_time || '5 min read',
      featured: blog.featured || false,
      views: blog.views || 0,
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
      image,
      images,
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
      image,
      images: images && Array.isArray(images) ? images : undefined,
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
      authorRole: blog.author_role || '',
      publishedAt: blog.published_at ? blog.published_at.toISOString() : (blog.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString()),
      category: blog.category,
      tags: blog.tags || [],
      image: blog.image || '',
      images: blog.images && Array.isArray(blog.images) ? blog.images : (blog.image ? [blog.image] : []),
      readTime: blog.read_time || '5 min read',
      featured: blog.featured || false,
      views: blog.views || 0,
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
