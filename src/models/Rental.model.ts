import { Model } from "objection";
import knex from "@config/connection";
import Users from "@models/Users.model";

Model.knex(knex);

class Rental extends Model {
  id!: string;
  user_id!: string;
  book_id!: string;
  type?: "RENT" | "RETURN";
  date?: string;

  static get tableName() {
    return "rental";
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "user_id", "book_id"],

      properties: {
        id: { type: "string", maxLength: 100 },
        user_id: { type: "string", maxLength: 100 },
        book_id: { type: "string", maxLength: 100 },
        type: { type: "string", enum: ["RENT", "RETURN"] },
        date: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'rental.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default Rental;
