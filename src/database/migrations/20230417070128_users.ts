import { Knex } from "knex";
const table:string = "users";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(table, (t) => {
    t.string("id", 100).primary().notNullable();
    t.string("name", 200);
    t.string("username", 100).nullable().unique();
    t.text("email").nullable().unique();
    t.text("password").notNullable();
    t.text("avatar");
    t.boolean("is_active").defaultTo(false);
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).nullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable(table);
};
