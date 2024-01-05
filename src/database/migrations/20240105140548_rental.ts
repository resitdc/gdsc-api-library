import { Knex } from "knex";
const table:string = "rental";

export const up = async (knex: Knex): Promise<void> => {  
  await knex.schema.createTable(table, (t) => {
    t.string("id", 100).primary().notNullable();
    t.string("user_id", 100).notNullable();
    t.string("book_id", 100).notNullable();
    t.enu("type", ["RENT", "RETURN"]);
    t.timestamp("date", { useTz: true }).nullable();
    t.foreign("user_id").references("id").inTable("users");
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable(table);
};
