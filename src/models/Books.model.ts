import { Model } from "objection";
import knex from "@config/connection";

Model.knex(knex);

class Books extends Model {
  id!: string;
  master_book_id!: string;

  static get tableName() {
    return "books";
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "master_book_id"],

      properties: {
        id: { type: "string", maxLength: 100 },
        master_book_id: { type: "string", maxLength: 100 },
      },
    };
  }
}

export default Books;
