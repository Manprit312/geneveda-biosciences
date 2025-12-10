import "server-only";
import { prisma } from "@/lib/db/prisma";

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

// Convert Prisma pageContent to PageContent interface
const mapPrismaToPageContent = (prismaContent: any): PageContent => {
  return {
    id: prismaContent.id,
    page_slug: prismaContent.pageSlug,
    section_key: prismaContent.sectionKey,
    title: prismaContent.title,
    content: prismaContent.content,
    content_type: prismaContent.contentType,
    order_index: prismaContent.orderIndex,
    active: prismaContent.active,
    created_at: prismaContent.createdAt,
    updated_at: prismaContent.updatedAt,
  };
};

class PageContentRepository {
  async findByPage(pageSlug: string, activeOnly: boolean = true): Promise<PageContent[]> {
    const where: any = {
      pageSlug,
    };

    if (activeOnly) {
      where.active = true;
    }

    const contents = await prisma.pageContent.findMany({
      where,
      orderBy: {
        orderIndex: "asc",
      },
    });

    return contents.map(mapPrismaToPageContent);
  }

  async findBySection(pageSlug: string, sectionKey: string): Promise<PageContent | null> {
    const content = await prisma.pageContent.findUnique({
      where: {
        pageSlug_sectionKey: {
          pageSlug: pageSlug,
          sectionKey: sectionKey,
        },
      },
    });

    if (!content) {
      return null;
    }

    return mapPrismaToPageContent(content);
  }

  async findById(id: number): Promise<PageContent | null> {
    const content = await prisma.pageContent.findUnique({
      where: { id },
    });

    if (!content) {
      return null;
    }

    return mapPrismaToPageContent(content);
  }

  async create(data: CreatePageContentData): Promise<PageContent> {
    const content = await prisma.pageContent.create({
      data: {
        pageSlug: data.page_slug,
        sectionKey: data.section_key,
        title: data.title || null,
        content: data.content || null,
        contentType: data.content_type || "html",
        orderIndex: data.order_index || 0,
        active: data.active !== false,
      },
    });

    return mapPrismaToPageContent(content);
  }

  async update(data: UpdatePageContentData): Promise<PageContent | null> {
    const existingContent = await this.findById(data.id);
    if (!existingContent) {
      return null;
    }

    const updateData: any = {};

    if (data.page_slug) updateData.pageSlug = data.page_slug;
    if (data.section_key) updateData.sectionKey = data.section_key;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.content_type) updateData.contentType = data.content_type;
    if (data.order_index !== undefined) updateData.orderIndex = data.order_index;
    if (data.active !== undefined) updateData.active = data.active;

    if (Object.keys(updateData).length === 0) {
      return existingContent;
    }

    const content = await prisma.pageContent.update({
      where: { id: data.id },
      data: updateData,
    });

    return mapPrismaToPageContent(content);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.pageContent.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new PageContentRepository();
