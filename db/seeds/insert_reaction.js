/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reaction").del();
  await knex("reaction").insert([
    { id: 1, sendAt: new Date(2024, 2, 16), reaction: "good" },
    { id: 2, sendAt: new Date(2024, 2, 16), reaction: "very_good" },
    { id: 3, sendAt: new Date(2024, 2, 16), reaction: "bad" },
  ]);
};
