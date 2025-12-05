import "server-only";

import getDBConnection from "@/lib/db/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

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

class SiteSettingsRepository {
  private db = getDBConnection();

  private mapRowToSiteSetting(row: any): SiteSetting {
    return {
      id: row.id,
      setting_key: row.setting_key,
      setting_value: row.setting_value,
      setting_type: row.setting_type || "text",
      description: row.description,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async findAll(): Promise<SiteSetting[]> {
    const query = "SELECT * FROM site_settings ORDER BY setting_key ASC";
    const [rows] = await this.db.execute<RowDataPacket[]>(query);
    return rows.map((row) => this.mapRowToSiteSetting(row));
  }

  async findByKey(key: string): Promise<SiteSetting | null> {
    const query = "SELECT * FROM site_settings WHERE setting_key = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [key]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToSiteSetting(rows[0]);
  }

  async findById(id: number): Promise<SiteSetting | null> {
    const query = "SELECT * FROM site_settings WHERE id = ?";
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapRowToSiteSetting(rows[0]);
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

  async setValue(key: string, value: any, type: "text" | "number" | "boolean" | "json" = "text"): Promise<SiteSetting> {
    const existing = await this.findByKey(key);

    let stringValue: string;
    if (type === "json") {
      stringValue = JSON.stringify(value);
    } else if (type === "boolean") {
      stringValue = value ? "true" : "false";
    } else {
      stringValue = String(value);
    }

    if (existing) {
      const query = "UPDATE site_settings SET setting_value = ?, setting_type = ? WHERE setting_key = ?";
      await this.db.execute(query, [stringValue, type, key]);
      return (await this.findByKey(key))!;
    } else {
      const query = `
        INSERT INTO site_settings (setting_key, setting_value, setting_type)
        VALUES (?, ?, ?)
      `;
      await this.db.execute<ResultSetHeader>(query, [key, stringValue, type]);
      return (await this.findByKey(key))!;
    }
  }

  async create(data: CreateSiteSettingData): Promise<SiteSetting> {
    const query = `
      INSERT INTO site_settings (setting_key, setting_value, setting_type, description)
      VALUES (?, ?, ?, ?)
    `;

    const params = [
      data.setting_key,
      data.setting_value || null,
      data.setting_type || "text",
      data.description || null,
    ];

    const [result] = await this.db.execute<ResultSetHeader>(query, params);
    const setting = await this.findById(result.insertId);

    if (!setting) {
      throw new Error("Failed to retrieve created site setting");
    }

    return setting;
  }

  async update(data: UpdateSiteSettingData): Promise<SiteSetting | null> {
    const existingSetting = await this.findById(data.id);
    if (!existingSetting) {
      return null;
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.setting_key) {
      updates.push("setting_key = ?");
      params.push(data.setting_key);
    }
    if (data.setting_value !== undefined) {
      updates.push("setting_value = ?");
      params.push(data.setting_value);
    }
    if (data.setting_type) {
      updates.push("setting_type = ?");
      params.push(data.setting_type);
    }
    if (data.description !== undefined) {
      updates.push("description = ?");
      params.push(data.description);
    }

    if (updates.length === 0) {
      return existingSetting;
    }

    params.push(data.id);
    const query = `UPDATE site_settings SET ${updates.join(", ")} WHERE id = ?`;

    await this.db.execute(query, params);
    return this.findById(data.id);
  }

  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM site_settings WHERE id = ?";
    const [result] = await this.db.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }
}

export default new SiteSettingsRepository();

