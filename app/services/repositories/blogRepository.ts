import getDBConnection from "@/lib/db/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  author_role?: string;
  category: "Research" | "NGS" | "Bioinformatics" | "Training" | "Study Abroad";
  tags: string[];
  image?: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  published_at: Date;
  views: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  category: string;
  tags?: string[];
  image?: string;
  readTime?: string;
  featured?: boolean;
  published?: boolean;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  id: number;
}

class BlogRepository {
  private db = getDBConnection();

  // Convert database row to Blog object
  private mapRowToBlog(row: any): Blog {
    // Safely parse tags JSON
    let tags: string[] = [];
    if (row.tags) {
      try {
        // If tags is already an array (from MySQL JSON type), use it directly
        if (Array.isArray(row.tags)) {
          tags = row.tags;
        } else if (typeof row.tags === 'string') {
          // Try to parse as JSON string
          const parsed = JSON.parse(row.tags);
          tags = Array.isArray(parsed) ? parsed : [];
        }
      } catch (error) {
        // If parsing fails, treat as empty array
        console.warn(`Failed to parse tags for blog ${row.id}:`, error);
        tags = [];
      }
    }

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      author_role: row.author_role || "",
      category: row.category,
      tags: tags,
      image: row.image || undefined,
      read_time: row.read_time,
      featured: Boolean(row.featured),
      published: Boolean(row.published),
      published_at: row.published_at,
      views: row.views || 0,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  // Get all blogs with filters
  async findAll(filters: {
    category?: string;
    featured?: boolean;
    published?: boolean;
    search?: string;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<Blog[]> {
    let query = "SELECT * FROM blogs WHERE 1=1";
    const params: any[] = [];

    if (filters.category && filters.category !== "All") {
      query += " AND category = ?";
      params.push(filters.category);
    }

    if (filters.featured === true) {
      query += " AND featured = ?";
      params.push(1);
    }

    if (filters.published !== undefined) {
      query += " AND published = ?";
      params.push(filters.published ? 1 : 0);
    } else {
      query += " AND published = ?";
      params.push(1);
    }

    if (filters.search) {
      query += " AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)";
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const sortBy = filters.sortBy || "published_at";
    const sortOrder = filters.sortOrder || "desc";
    query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;

    if (filters.limit) {
      query += " LIMIT ?";
      params.push(filters.limit);
    }

    const [rows] = await this.db.execute<RowDataPacket[]>(query, params);
    return rows.map((row) => this.mapRowToBlog(row));
  }

  // Get blog by slug
  async findBySlug(slug: string): Promise<Blog | null> {
    const query = "SELECT * FROM blogs WHERE slug = ? AND published = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [slug, 1]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToBlog(rows[0]);
  }

  // Get blog by ID
  async findById(id: number): Promise<Blog | null> {
    const query = "SELECT * FROM blogs WHERE id = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToBlog(rows[0]);
  }

  // Create new blog
  async create(data: CreateBlogData): Promise<Blog> {
    const query = `
      INSERT INTO blogs (
        title, slug, excerpt, content, author, author_role, category,
        tags, image, read_time, featured, published, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const tagsJson = JSON.stringify(data.tags || []);
    const publishedAt = data.published !== false ? new Date() : null;

    const params = [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.author,
      data.authorRole || "",
      data.category,
      tagsJson,
      data.image || null,
      data.readTime || "5 min read",
      data.featured ? 1 : 0,
      data.published !== false ? 1 : 0,
      publishedAt,
    ];

    const [result] = await this.db.execute<ResultSetHeader>(query, params);
    const blog = await this.findById(result.insertId);
    if (!blog) {
      throw new Error("Failed to retrieve created blog");
    }
    return blog;
  }

  // Update blog
  async update(data: UpdateBlogData): Promise<Blog | null> {
    const existingBlog = await this.findById(data.id);
    if (!existingBlog) {
      return null;
    }

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== existingBlog.slug) {
      const existingSlug = await this.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== data.id) {
        throw new Error("Blog post with this slug already exists");
      }
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.title) {
      updates.push("title = ?");
      params.push(data.title);
    }
    if (data.slug) {
      updates.push("slug = ?");
      params.push(data.slug);
    }
    if (data.excerpt) {
      updates.push("excerpt = ?");
      params.push(data.excerpt);
    }
    if (data.content) {
      updates.push("content = ?");
      params.push(data.content);
    }
    if (data.author) {
      updates.push("author = ?");
      params.push(data.author);
    }
    if (data.authorRole !== undefined) {
      updates.push("author_role = ?");
      params.push(data.authorRole);
    }
    if (data.category) {
      updates.push("category = ?");
      params.push(data.category);
    }
    if (data.tags !== undefined) {
      updates.push("tags = ?");
      params.push(JSON.stringify(data.tags));
    }
    if (data.image !== undefined) {
      updates.push("image = ?");
      params.push(data.image);
    }
    if (data.readTime) {
      updates.push("read_time = ?");
      params.push(data.readTime);
    }
    if (data.featured !== undefined) {
      updates.push("featured = ?");
      params.push(data.featured ? 1 : 0);
    }
    if (data.published !== undefined) {
      updates.push("published = ?");
      params.push(data.published ? 1 : 0);
      if (data.published && !existingBlog.published_at) {
        updates.push("published_at = ?");
        params.push(new Date());
      }
    }

    if (updates.length === 0) {
      return existingBlog;
    }

    params.push(data.id);
    const query = `UPDATE blogs SET ${updates.join(", ")} WHERE id = ?`;

    await this.db.execute(query, params);
    return this.findById(data.id);
  }

  // Delete blog
  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM blogs WHERE id = ?";
    const [result] = await this.db.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }

  // Increment views
  async incrementViews(slug: string): Promise<void> {
    const query = "UPDATE blogs SET views = views + 1 WHERE slug = ?";
    await this.db.execute(query, [slug]);
  }

  // Get blog statistics
  async getStats(): Promise<{
    total: number;
    published: number;
    featured: number;
    totalViews: number;
    categoryCounts: { category: string; count: number }[];
  }> {
    const [totalRows] = await this.db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM blogs"
    );
    const total = totalRows[0].count;

    const [publishedRows] = await this.db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM blogs WHERE published = 1"
    );
    const published = publishedRows[0].count;

    const [featuredRows] = await this.db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM blogs WHERE featured = 1"
    );
    const featured = featuredRows[0].count;

    const [viewsRows] = await this.db.execute<RowDataPacket[]>(
      "SELECT SUM(views) as total FROM blogs"
    );
    const totalViews = viewsRows[0].total || 0;

    const [categoryRows] = await this.db.execute<RowDataPacket[]>(
      "SELECT category, COUNT(*) as count FROM blogs GROUP BY category"
    );
    const categoryCounts = categoryRows.map((row) => ({
      category: row.category,
      count: row.count,
    }));

    return {
      total,
      published,
      featured,
      totalViews,
      categoryCounts,
    };
  }
}

export default new BlogRepository();

