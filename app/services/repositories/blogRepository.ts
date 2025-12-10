import "server-only";
import { prisma } from "@/lib/db/prisma";
import { BlogCategory } from "@prisma/client";

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

// Helper to convert Prisma BlogCategory enum to string
const categoryToString = (cat: BlogCategory): string => {
  const map: Record<BlogCategory, string> = {
    Research: "Research",
    NGS: "NGS",
    Bioinformatics: "Bioinformatics",
    Training: "Training",
    StudyAbroad: "Study Abroad",
  };
  return map[cat] || cat;
};

// Helper to convert string to Prisma BlogCategory enum
const stringToCategory = (cat: string): BlogCategory => {
  const map: Record<string, BlogCategory> = {
    Research: "Research",
    NGS: "NGS",
    Bioinformatics: "Bioinformatics",
    Training: "Training",
    "Study Abroad": "StudyAbroad",
  };
  return (map[cat] || "Research") as BlogCategory;
};

// Convert Prisma blog to Blog interface
const mapPrismaToBlog = (prismaBlog: any): Blog => {
  const tags = prismaBlog.tags
    ? Array.isArray(prismaBlog.tags)
      ? prismaBlog.tags
      : typeof prismaBlog.tags === "string"
      ? JSON.parse(prismaBlog.tags)
      : []
    : [];

  return {
    id: prismaBlog.id,
    title: prismaBlog.title,
    slug: prismaBlog.slug,
    excerpt: prismaBlog.excerpt,
    content: prismaBlog.content,
    author: prismaBlog.author,
    author_role: prismaBlog.authorRole || "",
    category: categoryToString(prismaBlog.category),
    tags: Array.isArray(tags) ? tags : [],
    image: prismaBlog.image || undefined,
    read_time: prismaBlog.readTime,
    featured: prismaBlog.featured,
    published: prismaBlog.published,
    published_at: prismaBlog.publishedAt,
    views: prismaBlog.views,
    created_at: prismaBlog.createdAt,
    updated_at: prismaBlog.updatedAt,
  };
};

class BlogRepository {
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
    const where: any = {};

    if (filters.category && filters.category !== "All") {
      where.category = stringToCategory(filters.category);
    }

    if (filters.featured === true) {
      where.featured = true;
    }

    if (filters.published !== undefined) {
      where.published = filters.published;
    } else {
      where.published = true;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search } },
        { content: { contains: filters.search } },
      ];
    }

    const orderBy: any = {};
    const sortBy = filters.sortBy || "publishedAt";
    const sortOrder = filters.sortOrder || "desc";
    orderBy[sortBy] = sortOrder;

    const blogs = await prisma.blog.findMany({
      where,
      orderBy,
      take: filters.limit,
    });

    return blogs.map(mapPrismaToBlog);
  }

  // Get blog by slug
  async findBySlug(slug: string): Promise<Blog | null> {
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
        published: true,
      },
    });

    if (!blog) {
      return null;
    }

    return mapPrismaToBlog(blog);
  }

  // Get blog by ID
  async findById(id: number): Promise<Blog | null> {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return null;
    }

    return mapPrismaToBlog(blog);
  }

  // Create new blog
  async create(data: CreateBlogData): Promise<Blog> {
    const publishedAt = data.published !== false ? new Date() : null;

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        authorRole: data.authorRole || "",
        category: stringToCategory(data.category),
        tags: data.tags || [],
        image: data.image || null,
        readTime: data.readTime || "5 min read",
        featured: data.featured || false,
        published: data.published !== false,
        publishedAt,
      },
    });

    return mapPrismaToBlog(blog);
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

    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.slug) updateData.slug = data.slug;
    if (data.excerpt) updateData.excerpt = data.excerpt;
    if (data.content) updateData.content = data.content;
    if (data.author) updateData.author = data.author;
    if (data.authorRole !== undefined) updateData.authorRole = data.authorRole;
    if (data.category) updateData.category = stringToCategory(data.category);
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.readTime) updateData.readTime = data.readTime;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.published !== undefined) {
      updateData.published = data.published;
      if (data.published && !existingBlog.published_at) {
        updateData.publishedAt = new Date();
      }
    }

    if (Object.keys(updateData).length === 0) {
      return existingBlog;
    }

    const blog = await prisma.blog.update({
      where: { id: data.id },
      data: updateData,
    });

    return mapPrismaToBlog(blog);
  }

  // Delete blog
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.blog.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Increment views
  async incrementViews(slug: string): Promise<void> {
    await prisma.blog.updateMany({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  // Get blog statistics
  async getStats(): Promise<{
    total: number;
    published: number;
    featured: number;
    totalViews: number;
    categoryCounts: { category: string; count: number }[];
  }> {
    const [total, published, featured, viewsResult, categoryResult] =
      await Promise.all([
        prisma.blog.count(),
        prisma.blog.count({ where: { published: true } }),
        prisma.blog.count({ where: { featured: true } }),
        prisma.blog.aggregate({
          _sum: {
            views: true,
          },
        }),
        prisma.blog.groupBy({
          by: ["category"],
          _count: {
            id: true,
          },
        }),
      ]);

    const totalViews = viewsResult._sum.views || 0;
    const categoryCounts = categoryResult.map((item) => ({
      category: categoryToString(item.category),
      count: item._count.id,
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
