import blogRepository, { Blog, CreateBlogData, UpdateBlogData } from "./repositories/blogRepository";

class BlogService {
  // Get all blogs
  async getBlogs(filters: {
    category?: string;
    featured?: boolean;
    published?: boolean;
    search?: string;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    return await blogRepository.findAll(filters);
  }

  // Get blog by slug
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const blog = await blogRepository.findBySlug(slug);
    if (blog) {
      // Increment views asynchronously
      blogRepository.incrementViews(slug).catch(console.error);
    }
    return blog;
  }

  // Get blog by ID
  async getBlogById(id: number): Promise<Blog | null> {
    return await blogRepository.findById(id);
  }

  // Create blog
  async createBlog(data: CreateBlogData): Promise<Blog> {
    // Validate required fields
    if (!data.title || !data.slug || !data.excerpt || !data.content || !data.author || !data.category) {
      throw new Error("Missing required fields: title, slug, excerpt, content, author, category");
    }

    // Check if slug already exists
    const existingBlog = await blogRepository.findBySlug(data.slug);
    if (existingBlog) {
      throw new Error("Blog post with this slug already exists");
    }

    return await blogRepository.create(data);
  }

  // Update blog
  async updateBlog(data: UpdateBlogData): Promise<Blog | null> {
    return await blogRepository.update(data);
  }

  // Delete blog
  async deleteBlog(id: number): Promise<boolean> {
    return await blogRepository.delete(id);
  }

  // Get blog statistics
  async getBlogStats() {
    return await blogRepository.getStats();
  }
}

export default new BlogService();

