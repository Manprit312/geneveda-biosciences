import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

/**
 * NewsBlogs API - for managing individual NewsBlogs from Geneveda admin panel
 * This queries the news_blogs table (not the blogs table)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const blog = await prisma.$queryRaw`
      SELECT 
        b.id, b.title, b.slug, b.excerpt, b.content, b.featured_image as "featuredImage",
        b.tags, b.author, b.published, b.featured, b.views, 
        b.category_id as "categoryId", b.subcategory_id as "subcategoryId",
        b.created_at as "createdAt", b.updated_at as "updatedAt",
        json_build_object(
          'id', c.id,
          'name', c.name,
          'slug', c.slug
        ) as category,
        json_build_object(
          'id', s.id,
          'name', s.name,
          'slug', s.slug
        ) as subcategory
      FROM news_blogs b
      LEFT JOIN categories c ON c.id = b.category_id
      LEFT JOIN subcategories s ON s.id = b.subcategory_id
      WHERE b.id = ${blogId}
    ` as any[];

    if (!blog || blog.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const b = blog[0];
    const formattedBlog = {
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      featuredImage: b.featuredImage,
      tags: b.tags || [],
      author: b.author,
      published: b.published,
      featured: b.featured,
      views: b.views,
      categoryId: b.categoryId,
      subcategoryId: b.subcategoryId,
      category: b.category,
      subcategory: b.subcategory,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };

    return NextResponse.json({ success: true, blog: formattedBlog });
  } catch (error: any) {
    console.error('GET /api/newsblogs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`
      DELETE FROM news_blogs WHERE id = ${blogId}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/newsblogs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}


