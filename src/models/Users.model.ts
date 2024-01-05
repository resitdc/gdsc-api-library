import { Model } from "objection";
import knex from "@config/connection";
import Rental from "@models/Rental.model";

Model.knex(knex);

class Users extends Model {
  id!: string;
  name?: string;
  username?: string | null;
  email?: string | null;
  password!: string;
  avatar?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return "users";
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "password"],

      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        username: { type: "string", maxLength: 100 },
        email: { type: "string" },
        password: { type: "string" },
        avatar: { type: "string" },
        is_active: { type: "boolean", default: false },
        created_at: { type: "string" },
        updated_at: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      rental: {
        relation: Model.HasManyRelation,
        modelClass: Rental,
        join: {
          from: "users.id",
          to: "rental.user_id"
        }
      },
    };
  };
}

export default Users;
