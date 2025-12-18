import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const active = searchParams.get('active');

    let query = `
      SELECT 
        s.id, s.name, s.slug, s.description, s.order_index as "orderIndex", 
        s.active, s.category_id as "categoryId", s.created_at as "createdAt", s.updated_at as "updatedAt",
        json_build_object(
          'id', c.id,
          'name', c.name,
          'slug', c.slug
        ) as category
      FROM subcategories s
      JOIN categories c ON c.id = s.category_id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (categoryId) {
      query += ` AND s.category_id = $${paramIndex}`;
      params.push(parseInt(categoryId, 10));
      paramIndex++;
    }
    if (active !== null) {
      query += ` AND s.active = $${paramIndex}`;
      params.push(active === 'true');
      paramIndex++;
    }

    query += ` ORDER BY s.order_index ASC`;

    const subcategories = await prisma.$queryRawUnsafe(query, ...params) as any[];

    return NextResponse.json({ success: true, subcategories });
  } catch (error: any) {
    console.error('GET /api/subcategories error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: any = null;
  try {
    body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.slug || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug, and categoryId are required' },
        { status: 400 }
      );
    }

    // Check if subcategory with same slug already exists in this category
    const existing = await prisma.$queryRaw`
      SELECT id FROM subcategories 
      WHERE category_id = ${parseInt(body.categoryId, 10)} AND slug = ${body.slug}
    ` as any[];

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `A subcategory with slug "${body.slug}" already exists in this category. Please use a different slug.` },
        { status: 400 }
      );
    }

    const result = await prisma.$queryRaw`
      INSERT INTO subcategories (name, slug, description, order_index, active, category_id, created_at, updated_at)
      VALUES (${body.name}, ${body.slug}, ${body.description || null}, ${body.orderIndex || 0}, ${body.active !== undefined ? body.active : true}, ${parseInt(body.categoryId, 10)}, NOW(), NOW())
      RETURNING id, name, slug, description, order_index as "orderIndex", active, category_id as "categoryId", created_at as "createdAt", updated_at as "updatedAt"
    ` as any[];
    
    const subcategory = result[0];

    return NextResponse.json({ success: true, subcategory }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/subcategories error:', error);
    // Handle PostgreSQL unique constraint violation
    if (error.code === '23505' || (error.message && error.message.includes('already exists'))) {
      const slug = body?.slug || 'this slug';
      const suggestedSlug = `${slug}-${Date.now().toString().slice(-6)}`;
      return NextResponse.json(
        { 
          success: false, 
          error: `A subcategory with slug "${slug}" already exists in this category. Please use a different slug.`,
          suggestedSlug: suggestedSlug
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}

