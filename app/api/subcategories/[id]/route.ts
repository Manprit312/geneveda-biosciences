import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subcategoryId = parseInt(id, 10);
    if (isNaN(subcategoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    const subcategory = await prisma.$queryRaw`
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
      WHERE s.id = ${subcategoryId}
    ` as any[];

    if (!subcategory || subcategory.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, subcategory: subcategory[0] });
  } catch (error: any) {
    console.error('GET /api/subcategories/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subcategory' },
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
    const subcategoryId = parseInt(id, 10);
    if (isNaN(subcategoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subcategory ID' },
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
    if (body.categoryId !== undefined) {
      updates.push(`category_id = $${updates.length + 1}`);
      values.push(parseInt(body.categoryId, 10));
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    updates.push(`updated_at = NOW()`);
    values.push(subcategoryId);

    const query = `
      UPDATE subcategories 
      SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const result = await prisma.$queryRawUnsafe(query, ...values) as any[];

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, subcategory: result[0] });
  } catch (error: any) {
    console.error('PUT /api/subcategories/[id] error:', error);
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Subcategory with this slug already exists in this category' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update subcategory' },
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
    const subcategoryId = parseInt(id, 10);
    if (isNaN(subcategoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`
      DELETE FROM subcategories WHERE id = ${subcategoryId}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/subcategories/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}

