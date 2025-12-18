import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { addCorsHeaders, handleCorsPreflight } from '@/lib/cors';

/**
 * NewsBlogs API - for managing NewsBlogs content from Geneveda admin panel
 * This queries the news_blogs table (not the blogs table)
 */

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflight(request) || new NextResponse(null, { status: 200 });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    let query = `
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
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (published !== null) {
      query += ` AND b.published = $${paramIndex}`;
      params.push(published === 'true');
      paramIndex++;
    }
    if (featured !== null) {
      query += ` AND b.featured = $${paramIndex}`;
      params.push(featured === 'true');
      paramIndex++;
    }
    if (categoryId) {
      query += ` AND b.category_id = $${paramIndex}`;
      params.push(parseInt(categoryId, 10));
      paramIndex++;
    }
    if (subcategoryId) {
      query += ` AND b.subcategory_id = $${paramIndex}`;
      params.push(parseInt(subcategoryId, 10));
      paramIndex++;
    }
    if (search) {
      query += ` AND (b.title ILIKE $${paramIndex} OR b.excerpt ILIKE $${paramIndex} OR b.content ILIKE $${paramIndex})`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
      paramIndex += 3;
    }

    query += ` ORDER BY b.created_at DESC`;

    if (skip) {
      query += ` OFFSET $${paramIndex}`;
      params.push(parseInt(skip, 10));
      paramIndex++;
    }
    if (limit) {
      query += ` LIMIT $${paramIndex}`;
      params.push(parseInt(limit, 10));
    }

    const blogs = await prisma.$queryRawUnsafe(query, ...params) as any[];

    const formattedBlogs = blogs.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      tags: blog.tags || [],
      author: blog.author,
      published: blog.published,
      featured: blog.featured,
      views: blog.views,
      categoryId: blog.categoryId,
      subcategoryId: blog.subcategoryId,
      category: blog.category,
      subcategory: blog.subcategory,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    const response = NextResponse.json({ success: true, blogs: formattedBlogs });
    return addCorsHeaders(response, request);
  } catch (error: any) {
    console.error('GET /api/newsblogs error:', error);
    const response = NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch NewsBlogs' },
      { status: 500 }
    );
    return addCorsHeaders(response, request);
  }
}

export async function POST(request: NextRequest) {
  let body: any = null;
  try {
    body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Convert tags array to PostgreSQL text[] format
    const tagsArray = Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []);
    
    // Format tags as PostgreSQL array literal: ARRAY['tag1', 'tag2']::text[]
    const tagsLiteral = tagsArray.length > 0 
      ? `ARRAY[${tagsArray.map((tag: string) => `'${tag.replace(/'/g, "''")}'`).join(', ')}]::text[]`
      : `ARRAY[]::text[]`;
    
    const query = `
      INSERT INTO news_blogs (
        title, slug, excerpt, content, featured_image, tags, author, 
        published, featured, views, category_id, subcategory_id, created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, 
        $5, ${tagsLiteral}, 
        $6, $7, $8, 
        0, $9, $10, NOW(), NOW()
      )
      RETURNING id, title, slug, excerpt, content, featured_image as "featuredImage", tags, author, published, featured, views, category_id as "categoryId", subcategory_id as "subcategoryId", created_at as "createdAt", updated_at as "updatedAt"
    `;
    
    const result = await prisma.$queryRawUnsafe(
      query,
      body.title,
      body.slug,
      body.excerpt || '',
      body.content,
      body.featuredImage || null,
      body.author || 'Admin',
      body.published !== undefined ? body.published : false,
      body.featured || false,
      body.categoryId || null,
      body.subcategoryId || null
    ) as any[];
    
    const blog = result[0];

    const response = NextResponse.json({ success: true, blog }, { status: 201 });
    return addCorsHeaders(response, request);
  } catch (error: any) {
    console.error('POST /api/newsblogs error:', error);
    // Handle PostgreSQL unique constraint violation (duplicate slug)
    const status = (error.code === '23505' || (error.message && error.message.includes('already exists'))) ? 400 : 500;
    let errorResponse;
    if (error.code === '23505' || (error.message && error.message.includes('already exists'))) {
      const slug = body?.slug || 'this slug';
      const suggestedSlug = `${slug}-${Date.now().toString().slice(-6)}`;
      errorResponse = NextResponse.json(
        { 
          success: false, 
          error: `A blog with slug "${slug}" already exists. Please use a different slug.`,
          suggestedSlug: suggestedSlug
        },
        { status: 400 }
      );
    } else {
      errorResponse = NextResponse.json(
        { success: false, error: error.message || 'Failed to create NewsBlog' },
        { status: 500 }
      );
    }
    return addCorsHeaders(errorResponse, request);
  }
}

