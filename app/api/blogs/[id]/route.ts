import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

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
        b.id, b.title, b.slug, b.excerpt, b.content, b.image, b.images,
        b.tags, b.author, b.author_role as "authorRole", b.category, b.read_time as "readTime",
        b.published, b.featured, b.views, b.published_at as "publishedAt",
        b.created_at as "createdAt", b.updated_at as "updatedAt"
      FROM blogs b
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
      image: b.image,
      images: b.images || (b.image ? [b.image] : []),
      tags: b.tags || [],
      author: b.author,
      authorRole: b.authorRole || '',
      category: b.category,
      readTime: b.readTime || '5 min read',
      published: b.published,
      featured: b.featured,
      views: b.views,
      publishedAt: b.publishedAt,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };

    return NextResponse.json({ success: true, blog: formattedBlog });
  } catch (error: any) {
    console.error('GET /api/blogs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const body = await request.json();
    const updates: string[] = [];
    const values: any[] = [];

    if (body.title !== undefined) {
      updates.push(`title = $${updates.length + 1}`);
      values.push(body.title);
    }
    if (body.slug !== undefined) {
      updates.push(`slug = $${updates.length + 1}`);
      values.push(body.slug);
    }
    if (body.excerpt !== undefined) {
      updates.push(`excerpt = $${updates.length + 1}`);
      values.push(body.excerpt);
    }
    if (body.content !== undefined) {
      updates.push(`content = $${updates.length + 1}`);
      values.push(body.content);
    }
    if (body.image !== undefined) {
      updates.push(`image = $${updates.length + 1}`);
      values.push(body.image);
    }
    if (body.images !== undefined) {
      const imagesJson = JSON.stringify(Array.isArray(body.images) ? body.images : []);
      updates.push(`images = $${updates.length + 1}::jsonb`);
      values.push(imagesJson);
    }
    if (body.tags !== undefined) {
      // Convert tags to JSON format for Geneveda blogs table
      const tagsArray = Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []);
      const tagsJson = JSON.stringify(tagsArray);
      updates.push(`tags = $${updates.length + 1}::jsonb`);
      values.push(tagsJson);
    }
    if (body.authorRole !== undefined) {
      updates.push(`author_role = $${updates.length + 1}`);
      values.push(body.authorRole);
    }
    if (body.category !== undefined) {
      // Validate category enum
      const validCategories = ['Research', 'NGS', 'Bioinformatics', 'Training', 'Study Abroad'];
      const categoryValue = validCategories.includes(body.category) ? body.category : 'Research';
      updates.push(`category = $${updates.length + 1}::"BlogCategory"`);
      values.push(categoryValue);
    }
    if (body.readTime !== undefined) {
      updates.push(`read_time = $${updates.length + 1}`);
      values.push(body.readTime);
    }
    if (body.author !== undefined) {
      updates.push(`author = $${updates.length + 1}`);
      values.push(body.author);
    }
    if (body.published !== undefined) {
      updates.push(`published = $${updates.length + 1}`);
      values.push(body.published);
    }
    if (body.featured !== undefined) {
      updates.push(`featured = $${updates.length + 1}`);
      values.push(body.featured);
    }
    // Note: Geneveda uses enum category, not category_id or subcategory_id

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    updates.push(`updated_at = NOW()`);
    values.push(blogId);

    // Build the query with proper parameter placeholders
    let query = `
      UPDATE blogs 
      SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, title, slug, excerpt, content, image, images, tags, author, author_role as "authorRole", 
        category, read_time as "readTime", published, featured, views, published_at as "publishedAt",
        created_at as "createdAt", updated_at as "updatedAt"
    `;

    const result = await prisma.$queryRawUnsafe(query, ...values) as any[];

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: result[0] });
  } catch (error: any) {
    console.error('PUT /api/blogs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
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
      DELETE FROM blogs WHERE id = ${blogId}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/blogs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

