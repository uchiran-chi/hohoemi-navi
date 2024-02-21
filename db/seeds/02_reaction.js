/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("reaction").del();
  await knex("reaction").insert([
    {
      user_id: 1,
      sendat: new Date(2024, 1, 19, 12, 15),
      reaction: "very_good",
      comment: "元気いっぱいでした",
    },
    {
      user_id: 1,
      sendat: new Date(2024, 1, 20, 10, 50),
      reaction: "bad",
      comment:
        "足を怪我してしまったようですが、病院に行って薬をもらっていました",
    },
    {
      user_id: 2,
      sendat: new Date(2024, 1, 20, 15, 30),
      reaction: "good",
      comment: null,
    },
  ]);
};
