import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category'); // Geneveda uses enum category
    const categoryId = searchParams.get('categoryId'); // Not used for Geneveda blogs
    const subcategoryId = searchParams.get('subcategoryId'); // Not used for Geneveda blogs
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    let query = `
      SELECT 
        b.id, b.title, b.slug, b.excerpt, b.content, b.image, b.images,
        b.tags, b.author, b.author_role as "authorRole", b.category, b.read_time as "readTime",
        b.published, b.featured, b.views, b.published_at as "publishedAt",
        b.created_at as "createdAt", b.updated_at as "updatedAt"
      FROM blogs b
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (published !== null && published !== '') {
      query += ` AND b.published = $${paramIndex}`;
      params.push(published === 'true');
      paramIndex++;
    }
    if (featured !== null) {
      query += ` AND b.featured = $${paramIndex}`;
      params.push(featured === 'true');
      paramIndex++;
    }
    if (category) {
      // Geneveda uses enum category (Research, NGS, Bioinformatics, Training, Study Abroad)
      query += ` AND b.category = $${paramIndex}::"BlogCategory"`;
      params.push(category);
      paramIndex++;
    }
    // Note: categoryId and subcategoryId are not applicable for Geneveda blogs (they use enum category)
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

    const formattedBlogs = blogs.map((blog: any) => {
      // Parse JSON fields
      const tags = typeof blog.tags === 'string' ? JSON.parse(blog.tags || '[]') : (blog.tags || []);
      const images = typeof blog.images === 'string' ? JSON.parse(blog.images || '[]') : (blog.images || []);
      
      return {
        _id: blog.id.toString(), // Frontend expects _id
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image || (images.length > 0 ? images[0] : null),
        images: images.length > 0 ? images : (blog.image ? [blog.image] : []),
        tags: Array.isArray(tags) ? tags : [],
        author: blog.author,
        authorRole: blog.authorRole || '',
        category: blog.category,
        readTime: blog.readTime || '5 min read',
        published: blog.published,
        featured: blog.featured,
        views: blog.views,
        publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : new Date(blog.createdAt).toISOString(),
        createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, blogs: formattedBlogs });
  } catch (error: any) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
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

    // Convert tags to JSON format for Geneveda blogs table
    const tagsArray = Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []);
    const tagsJson = JSON.stringify(tagsArray);
    
    // Handle images - use first image from images array or image field
    const imageValue = body.images && body.images.length > 0 ? body.images[0] : (body.image || null);
    const imagesArray = body.images && Array.isArray(body.images) ? body.images : (body.image ? [body.image] : []);
    const imagesJson = imagesArray.length > 0 ? JSON.stringify(imagesArray) : null;
    
    // Validate category enum
    const validCategories = ['Research', 'NGS', 'Bioinformatics', 'Training', 'Study Abroad'];
    const categoryValue = body.category && validCategories.includes(body.category) ? body.category : 'Research';
    
    const query = `
      INSERT INTO blogs (
        title, slug, excerpt, content, image, images, tags, author, author_role, category, read_time,
        published, featured, views, created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9, $10::"BlogCategory", $11, $12, $13, 0, NOW(), NOW()
      )
      RETURNING id, title, slug, excerpt, content, image, images, tags, author, author_role as "authorRole", 
        category, read_time as "readTime", published, featured, views, published_at as "publishedAt",
        created_at as "createdAt", updated_at as "updatedAt"
    `;
    
    const result = await prisma.$queryRawUnsafe(
      query,
      body.title,
      body.slug,
      body.excerpt || '',
      body.content,
      imageValue,
      imagesJson || '[]', // Use empty array JSON if null
      tagsJson,
      body.author || 'Admin',
      body.authorRole || '',
      categoryValue,
      body.readTime || '5 min read',
      body.published !== undefined ? body.published : true,
      body.featured || false
    ) as any[];
    
    const blog = result[0];

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/blogs error:', error);
    // Handle PostgreSQL unique constraint violation (duplicate slug)
    if (error.code === '23505' || (error.message && error.message.includes('already exists'))) {
      const slug = body?.slug || 'this slug';
      // Generate a suggested slug with timestamp
      const suggestedSlug = `${slug}-${Date.now().toString().slice(-6)}`;
      return NextResponse.json(
        { 
          success: false, 
          error: `A blog with slug "${slug}" already exists. Please use a different slug.`,
          suggestedSlug: suggestedSlug
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}
