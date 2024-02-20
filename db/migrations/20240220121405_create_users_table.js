/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.text("tell").notNullable();
    table.text("password").notNullable();
    table.text("protected_id").notNullable();
    table.text("protected_name").nullable();
    table.text("protected_address").nullable();
    table.text("protected_tell").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
