import { Knex } from "knex";
const table:string = "books";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(table, (t) => {
    t.string("id", 150).notNullable();
    t.string("master_book_id", 100).notNullable();
    t.foreign("master_book_id").references("id").inTable("master_books");
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable(table);
};
