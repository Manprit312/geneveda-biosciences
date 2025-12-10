import "server-only";
import { prisma } from "@/lib/db/prisma";

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

const mapPrismaToService = (prismaService: any): Service => {
  return {
    id: prismaService.id,
    slug: prismaService.slug,
    title: prismaService.title,
    description: prismaService.description,
    content: prismaService.content,
    icon: prismaService.icon,
    featured: prismaService.featured,
    active: prismaService.active,
    order_index: prismaService.orderIndex,
    meta_title: prismaService.metaTitle,
    meta_description: prismaService.metaDescription,
    created_at: prismaService.createdAt,
    updated_at: prismaService.updatedAt,
  };
};

class ServiceRepository {
  async findAll(activeOnly: boolean = true): Promise<Service[]> {
    const where = activeOnly ? { active: true } : {};

    const services = await prisma.service.findMany({
      where,
      orderBy: [
        { orderIndex: "asc" },
        { title: "asc" },
      ],
    });

    return services.map(mapPrismaToService);
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const service = await prisma.service.findFirst({
      where: {
        slug,
        active: true,
      },
    });

    if (!service) {
      return null;
    }

    return mapPrismaToService(service);
  }

  async findById(id: number): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return null;
    }

    return mapPrismaToService(service);
  }

  async create(data: CreateServiceData): Promise<Service> {
    const service = await prisma.service.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description || null,
        content: data.content || null,
        icon: data.icon || null,
        featured: data.featured || false,
        active: data.active !== false,
        orderIndex: data.order_index || 0,
        metaTitle: data.meta_title || null,
        metaDescription: data.meta_description || null,
      },
    });

    return mapPrismaToService(service);
  }

  async update(data: UpdateServiceData): Promise<Service | null> {
    const existingService = await this.findById(data.id);
    if (!existingService) {
      return null;
    }

    if (data.slug && data.slug !== existingService.slug) {
      const existingSlug = await this.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== data.id) {
        throw new Error("Service with this slug already exists");
      }
    }

    const updateData: any = {};

    if (data.slug) updateData.slug = data.slug;
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.icon !== undefined) updateData.icon = data.icon;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.order_index !== undefined) updateData.orderIndex = data.order_index;
    if (data.meta_title !== undefined) updateData.metaTitle = data.meta_title;
    if (data.meta_description !== undefined) updateData.metaDescription = data.meta_description;

    if (Object.keys(updateData).length === 0) {
      return existingService;
    }

    const service = await prisma.service.update({
      where: { id: data.id },
      data: updateData,
    });

    return mapPrismaToService(service);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.service.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new ServiceRepository();
