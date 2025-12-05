import "server-only";

import getDBConnection from "@/lib/db/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  icon: string | null;
  featured: boolean;
  active: boolean;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateServiceData {
  slug: string;
  title: string;
  description?: string;
  content?: string;
  icon?: string;
  featured?: boolean;
  active?: boolean;
  order_index?: number;
  meta_title?: string;
  meta_description?: string;
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  id: number;
}

class ServiceRepository {
  private db = getDBConnection();

  private mapRowToService(row: any): Service {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      content: row.content,
      icon: row.icon,
      featured: Boolean(row.featured),
      active: Boolean(row.active),
      order_index: row.order_index || 0,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async findAll(activeOnly: boolean = true): Promise<Service[]> {
    let query = "SELECT * FROM services";
    const params: any[] = [];

    if (activeOnly) {
      query += " WHERE active = ?";
      params.push(1);
    }

    query += " ORDER BY order_index ASC, title ASC";

    const [rows] = await this.db.execute<RowDataPacket[]>(query, params);
    return rows.map((row) => this.mapRowToService(row));
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const query = "SELECT * FROM services WHERE slug = ? AND active = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [slug, 1]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToService(rows[0]);
  }

  async findById(id: number): Promise<Service | null> {
    const query = "SELECT * FROM services WHERE id = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToService(rows[0]);
  }

  async create(data: CreateServiceData): Promise<Service> {
    const query = `
      INSERT INTO services (
        slug, title, description, content, icon, featured, active, order_index, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.slug,
      data.title,
      data.description || null,
      data.content || null,
      data.icon || null,
      data.featured ? 1 : 0,
      data.active !== false ? 1 : 0,
      data.order_index || 0,
      data.meta_title || null,
      data.meta_description || null,
    ];

    const [result] = await this.db.execute<ResultSetHeader>(query, params);
    const service = await this.findById(result.insertId);

    if (!service) {
      throw new Error("Failed to retrieve created service");
    }

    return service;
  }

  async update(data: UpdateServiceData): Promise<Service | null> {
    const existingService = await this.findById(data.id);
    if (!existingService) {
      return null;
    }

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== existingService.slug) {
      const existingSlug = await this.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== data.id) {
        throw new Error("Service with this slug already exists");
      }
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.slug) {
      updates.push("slug = ?");
      params.push(data.slug);
    }
    if (data.title) {
      updates.push("title = ?");
      params.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push("description = ?");
      params.push(data.description);
    }
    if (data.content !== undefined) {
      updates.push("content = ?");
      params.push(data.content);
    }
    if (data.icon !== undefined) {
      updates.push("icon = ?");
      params.push(data.icon);
    }
    if (data.featured !== undefined) {
      updates.push("featured = ?");
      params.push(data.featured ? 1 : 0);
    }
    if (data.active !== undefined) {
      updates.push("active = ?");
      params.push(data.active ? 1 : 0);
    }
    if (data.order_index !== undefined) {
      updates.push("order_index = ?");
      params.push(data.order_index);
    }
    if (data.meta_title !== undefined) {
      updates.push("meta_title = ?");
      params.push(data.meta_title);
    }
    if (data.meta_description !== undefined) {
      updates.push("meta_description = ?");
      params.push(data.meta_description);
    }

    if (updates.length === 0) {
      return existingService;
    }

    params.push(data.id);
    const query = `UPDATE services SET ${updates.join(", ")} WHERE id = ?`;

    await this.db.execute(query, params);
    return this.findById(data.id);
  }

  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM services WHERE id = ?";
    const [result] = await this.db.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }
}

export default new ServiceRepository();

