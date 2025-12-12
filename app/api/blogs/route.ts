import { NextRequest, NextResponse } from "next/server";
import blogService from "@/app/services/blogService";

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const published = searchParams.get("published") ?? "true";
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const sortBy = searchParams.get("sortBy") || "published_at";
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

    const blogs = await blogService.getBlogs({
      category: category || undefined,
      featured: featured === "true" ? true : undefined,
      published: published === "true" ? true : published === "false" ? false : undefined,
      search: search || undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy,
      sortOrder,
    });

    // Transform to match frontend expectations
    const transformedBlogs = blogs.map((blog) => ({
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
      images: blog.images && Array.isArray(blog.images) ? blog.images : (blog.image ? [blog.image] : []),
      readTime: blog.read_time,
      featured: blog.featured,
      views: blog.views,
    }));

    return NextResponse.json({
      success: true,
      count: transformedBlogs.length,
      blogs: transformedBlogs,
    });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    
    // Return empty array if database is not available (for development)
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.warn("⚠️  Database not available. Returning empty results.");
      return NextResponse.json({
        success: true,
        count: 0,
        blogs: [],
        warning: "Database connection not available. Please configure MySQL in .env.local"
      });
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (protected - add auth later)
export async function POST(request: NextRequest) {
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
      : [];

    const blog = await blogService.createBlog({
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
      images: blog.images && Array.isArray(blog.images) ? blog.images : (blog.image ? [blog.image] : []),
      readTime: blog.read_time,
      featured: blog.featured,
      views: blog.views,
    };

    return NextResponse.json(
      { success: true, blog: transformedBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create blog post", error: error.message },
      { status: 400 }
    );
  }
}
