import { Knex } from "knex";
const table:string = "master_books";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(table, (t) => {
    t.string("id", 100).primary().notNullable();
    t.string("title", 200);
    t.string("writer", 200);
    t.string("publisher", 200);
    t.string("publication_year", 4);
    t.string("genre", 50);
    t.text("description");
    t.text("cover");
    t.boolean("is_publish").defaultTo(false);
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).nullable();
    t.datetime("deleted_at").nullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable(table);
};
