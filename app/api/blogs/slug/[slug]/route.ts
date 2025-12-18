import { NextRequest, NextResponse } from "next/server";
import blogService from "@/app/services/blogService";

// GET - Fetch single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {

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
