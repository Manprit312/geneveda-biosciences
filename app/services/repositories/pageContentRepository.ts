import "server-only";

import getDBConnection from "@/lib/db/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface PageContent {
  id: number;
  page_slug: string;
  section_key: string;
  title: string | null;
  content: string | null;
  content_type: "text" | "html" | "json";
  order_index: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePageContentData {
  page_slug: string;
  section_key: string;
  title?: string;
  content?: string;
  content_type?: "text" | "html" | "json";
  order_index?: number;
  active?: boolean;
}

export interface UpdatePageContentData extends Partial<CreatePageContentData> {
  id: number;
}

class PageContentRepository {
  private db = getDBConnection();

  private mapRowToPageContent(row: any): PageContent {
    return {
      id: row.id,
      page_slug: row.page_slug,
      section_key: row.section_key,
      title: row.title,
      content: row.content,
      content_type: row.content_type || "html",
      order_index: row.order_index || 0,
      active: Boolean(row.active),
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async findByPage(pageSlug: string, activeOnly: boolean = true): Promise<PageContent[]> {
    let query = "SELECT * FROM page_content WHERE page_slug = ?";
    const params: any[] = [pageSlug];

    if (activeOnly) {
      query += " AND active = ?";
      params.push(1);
    }

    query += " ORDER BY order_index ASC";

    const [rows] = await this.db.execute<RowDataPacket[]>(query, params);
    return rows.map((row) => this.mapRowToPageContent(row));
  }

  async findBySection(pageSlug: string, sectionKey: string): Promise<PageContent | null> {
    const query = "SELECT * FROM page_content WHERE page_slug = ? AND section_key = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [pageSlug, sectionKey]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToPageContent(rows[0]);
  }

  async findById(id: number): Promise<PageContent | null> {
    const query = "SELECT * FROM page_content WHERE id = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToPageContent(rows[0]);
  }

  async create(data: CreatePageContentData): Promise<PageContent> {
    const query = `
      INSERT INTO page_content (
        page_slug, section_key, title, content, content_type, order_index, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.page_slug,
      data.section_key,
      data.title || null,
      data.content || null,
      data.content_type || "html",
      data.order_index || 0,
      data.active !== false ? 1 : 0,
    ];

    const [result] = await this.db.execute<ResultSetHeader>(query, params);
    const pageContent = await this.findById(result.insertId);

    if (!pageContent) {
      throw new Error("Failed to retrieve created page content");
    }

    return pageContent;
  }

  async update(data: UpdatePageContentData): Promise<PageContent | null> {
    const existingContent = await this.findById(data.id);
    if (!existingContent) {
      return null;
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.page_slug) {
      updates.push("page_slug = ?");
      params.push(data.page_slug);
    }
    if (data.section_key) {
      updates.push("section_key = ?");
      params.push(data.section_key);
    }
    if (data.title !== undefined) {
      updates.push("title = ?");
      params.push(data.title);
    }
    if (data.content !== undefined) {
      updates.push("content = ?");
      params.push(data.content);
    }
    if (data.content_type) {
      updates.push("content_type = ?");
      params.push(data.content_type);
    }
    if (data.order_index !== undefined) {
      updates.push("order_index = ?");
      params.push(data.order_index);
    }
    if (data.active !== undefined) {
      updates.push("active = ?");
      params.push(data.active ? 1 : 0);
    }

    if (updates.length === 0) {
      return existingContent;
    }

    params.push(data.id);
    const query = `UPDATE page_content SET ${updates.join(", ")} WHERE id = ?`;

    await this.db.execute(query, params);
    return this.findById(data.id);
  }

  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM page_content WHERE id = ?";
    const [result] = await this.db.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }
}

export default new PageContentRepository();

