/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("reaction").del();
  await knex("reaction").insert([
    {
      id: 1,
      userId: 1,
      sendAt: new Date(2024, 0, 16, 15, 30),
      reaction: "good",
    },
    {
      id: 2,
      userId: 1,
      sendAt: new Date(2024, 1, 20, 12, 15),
      reaction: "very_good",
    },
    {
      id: 3,
      userId: 2,
      sendAt: new Date(2024, 2, 14, 10, 50),
      reaction: "bad",
    },
  ]);
};
