import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const category = await prisma.$queryRaw`
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
      WHERE c.id = ${categoryId}
      GROUP BY c.id
    ` as any[];

    if (!category || category.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const cat = category[0];
    const formattedCategory = {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      orderIndex: cat.orderIndex,
      active: cat.active,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      subcategories: cat.subcategories || [],
    };

    return NextResponse.json({ success: true, category: formattedCategory });
  } catch (error: any) {
    console.error('GET /api/categories/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch category' },
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
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates: string[] = [];
    const values: any[] = [];

    if (body.name !== undefined) {
      updates.push(`name = $${updates.length + 1}`);
      values.push(body.name);
    }
    if (body.slug !== undefined) {
      updates.push(`slug = $${updates.length + 1}`);
      values.push(body.slug);
    }
    if (body.description !== undefined) {
      updates.push(`description = $${updates.length + 1}`);
      values.push(body.description);
    }
    if (body.orderIndex !== undefined) {
      updates.push(`order_index = $${updates.length + 1}`);
      values.push(body.orderIndex);
    }
    if (body.active !== undefined) {
      updates.push(`active = $${updates.length + 1}`);
      values.push(body.active);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    updates.push(`updated_at = NOW()`);
    values.push(categoryId);

    const query = `
      UPDATE categories 
      SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const result = await prisma.$queryRawUnsafe(query, ...values) as any[];

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: result[0] });
  } catch (error: any) {
    console.error('PUT /api/categories/[id] error:', error);
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update category' },
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
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`
      DELETE FROM categories WHERE id = ${categoryId}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/categories/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}

