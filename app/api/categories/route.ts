import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { addCorsHeaders, handleCorsPreflight } from '@/lib/cors';

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflight(request) || new NextResponse(null, { status: 200 });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const active = searchParams.get('active');

    let query = `
      SELECT 
        c.id, c.name, c.slug, c.description, c.order_index as "orderIndex", 
        c.active, c.created_at as "createdAt", c.updated_at as "updatedAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'name', s.name,
              'slug', s.slug,
              'description', s.description,
              'orderIndex', s.order_index,
              'active', s.active
            ) ORDER BY s.order_index
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'::json
        ) as subcategories
      FROM categories c
      LEFT JOIN subcategories s ON s.category_id = c.id
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (active !== null) {
      query += ` WHERE c.active = $${paramIndex}`;
      params.push(active === 'true');
      paramIndex++;
      query += ` AND (s.active = $${paramIndex} OR s.id IS NULL)`;
      params.push(active === 'true');
    }

    query += ` GROUP BY c.id ORDER BY c.order_index ASC`;

    const categories = await prisma.$queryRawUnsafe(query, ...params) as any[];

    // Format the response
    const formattedCategories = categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      orderIndex: cat.orderIndex,
      active: cat.active,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      subcategories: cat.subcategories || [],
    }));

    const response = NextResponse.json({ success: true, categories: formattedCategories });
    return addCorsHeaders(response, request);
  } catch (error: any) {
    console.error('GET /api/categories error:', error);
    const response = NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
    return addCorsHeaders(response, request);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name and slug are required' },
        { status: 400 }
      );
    }

    const result = await prisma.$queryRaw`
      INSERT INTO categories (name, slug, description, order_index, active, created_at, updated_at)
      VALUES (${body.name}, ${body.slug}, ${body.description || null}, ${body.orderIndex || 0}, ${body.active !== undefined ? body.active : true}, NOW(), NOW())
      RETURNING id, name, slug, description, order_index as "orderIndex", active, created_at as "createdAt", updated_at as "updatedAt"
    ` as any[];

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to create category' },
        { status: 500 }
      );
    }

    const category = {
      ...result[0],
      subcategories: [],
    };

    const response = NextResponse.json({ success: true, category }, { status: 201 });
    return addCorsHeaders(response, request);
  } catch (error: any) {
    console.error('POST /api/categories error:', error);
    const status = error.code === '23505' ? 400 : 500;
    const errorMessage = error.code === '23505' 
      ? 'Category with this name or slug already exists'
      : error.message || 'Failed to create category';
    const response = NextResponse.json(
      { success: false, error: errorMessage },
      { status }
    );
    return addCorsHeaders(response, request);
  }
}
