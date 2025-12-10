import "server-only";
import { prisma } from "@/lib/db/prisma";

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value: string | null;
  setting_type: "text" | "number" | "boolean" | "json";
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSiteSettingData {
  setting_key: string;
  setting_value?: string;
  setting_type?: "text" | "number" | "boolean" | "json";
  description?: string;
}

export interface UpdateSiteSettingData extends Partial<CreateSiteSettingData> {
  id: number;
}

const mapPrismaToSiteSetting = (prismaSetting: any): SiteSetting => {
  return {
    id: prismaSetting.id,
    setting_key: prismaSetting.settingKey,
    setting_value: prismaSetting.settingValue,
    setting_type: prismaSetting.settingType,
    description: prismaSetting.description,
    created_at: prismaSetting.createdAt,
    updated_at: prismaSetting.updatedAt,
  };
};

class SiteSettingsRepository {
  async findAll(): Promise<SiteSetting[]> {
    const settings = await prisma.siteSetting.findMany({
      orderBy: {
        settingKey: "asc",
      },
    });

    return settings.map(mapPrismaToSiteSetting);
  }

  async findByKey(key: string): Promise<SiteSetting | null> {
    const setting = await prisma.siteSetting.findUnique({
      where: { settingKey: key },
    });

    if (!setting) {
      return null;
    }

    return mapPrismaToSiteSetting(setting);
  }

  async findById(id: number): Promise<SiteSetting | null> {
    const setting = await prisma.siteSetting.findUnique({
      where: { id },
    });

    if (!setting) {
      return null;
    }

    return mapPrismaToSiteSetting(setting);
  }

  async getValue(key: string, defaultValue: any = null): Promise<any> {
    const setting = await this.findByKey(key);
    if (!setting || !setting.setting_value) {
      return defaultValue;
    }

    switch (setting.setting_type) {
      case "number":
        return Number(setting.setting_value);
      case "boolean":
        return setting.setting_value === "true" || setting.setting_value === "1";
      case "json":
        try {
          return JSON.parse(setting.setting_value);
        } catch {
          return defaultValue;
        }
      default:
        return setting.setting_value;
    }
  }

  async setValue(
    key: string,
    value: any,
    type: "text" | "number" | "boolean" | "json" = "text"
  ): Promise<SiteSetting> {
    let stringValue: string;
    if (type === "json") {
      stringValue = JSON.stringify(value);
    } else if (type === "boolean") {
      stringValue = value ? "true" : "false";
    } else {
      stringValue = String(value);
    }

    const setting = await prisma.siteSetting.upsert({
      where: { settingKey: key },
      update: {
        settingValue: stringValue,
        settingType: type,
      },
      create: {
        settingKey: key,
        settingValue: stringValue,
        settingType: type,
      },
    });

    return mapPrismaToSiteSetting(setting);
  }

  async create(data: CreateSiteSettingData): Promise<SiteSetting> {
    let stringValue: string | null = null;
    if (data.setting_value) {
      const type = data.setting_type || "text";
      if (type === "json") {
        stringValue = JSON.stringify(data.setting_value);
      } else if (type === "boolean") {
        stringValue = data.setting_value === "true" || data.setting_value === "1" ? "true" : "false";
      } else {
        stringValue = String(data.setting_value);
      }
    }

    const setting = await prisma.siteSetting.create({
      data: {
        settingKey: data.setting_key,
        settingValue: stringValue,
        settingType: data.setting_type || "text",
        description: data.description || null,
      },
    });

    return mapPrismaToSiteSetting(setting);
  }

  async update(data: UpdateSiteSettingData): Promise<SiteSetting | null> {
    const existingSetting = await this.findById(data.id);
    if (!existingSetting) {
      return null;
    }

    const updateData: any = {};

    if (data.setting_key) updateData.settingKey = data.setting_key;
    if (data.setting_value !== undefined) {
      const type = data.setting_type || existingSetting.setting_type;
      if (type === "json") {
        updateData.settingValue = JSON.stringify(data.setting_value);
      } else if (type === "boolean") {
        updateData.settingValue = data.setting_value === "true" || data.setting_value === "1" ? "true" : "false";
      } else {
        updateData.settingValue = String(data.setting_value);
      }
    }
    if (data.setting_type) updateData.settingType = data.setting_type;
    if (data.description !== undefined) updateData.description = data.description;

    if (Object.keys(updateData).length === 0) {
      return existingSetting;
    }

    const setting = await prisma.siteSetting.update({
      where: { id: data.id },
      data: updateData,
    });

    return mapPrismaToSiteSetting(setting);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.siteSetting.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new SiteSettingsRepository();
