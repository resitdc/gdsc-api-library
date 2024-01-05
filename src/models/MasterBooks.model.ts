import { Model } from "objection";
import knex from "@config/connection";

Model.knex(knex);

class MasterBooks extends Model {
  id!: string;
  title!: string;
  writer?: string | null;
  publisher?: string | null;
  publication_year?: string | null;
  genre?: string | null;
  description?: string | null;
  cover?: string | null;
  is_publish?: boolean;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | string | null;

  static get tableName() {
    return "master_books";
  }
  
  static querySoftDelete(...args: any) {
    return super.query(...args).whereNull("master_books.deleted_at");
  }

  static async softDelete(id: string): Promise<void> {
    await MasterBooks.query()
      .findById(id)
      .patch({
        deleted_at: new Date().toISOString()
      });
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "string", maxLength: 100 },
        title: { type: "string", maxLength: 200 },
        writer: { type: ["string", "null"], maxLength: 200 },
        publisher: { type: ["string", "null"], maxLength: 200 },
        publication_year: { type: ["string", "null"], maxLength: 4 },
        genre: { type: ["string", "null"], maxLength: 50 },
        description: { type: ["string", "null"] },
        cover: { type: ["string", "null"] },
        is_publish: { type: "boolean", default: false },
        created_at: { type: "string" },
        updated_at: { type: ["string", "null"] },
        deleted_at: { type: ["string", "null"] }
      },
    };
  }
}

export default MasterBooks;
