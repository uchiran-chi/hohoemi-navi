/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      name: "徳島秀雄",
      tell: "12345678900",
      password: "password01",
      protected_id: "2Hq9p3kF5L",
      protected_name: "徳島幸子",
      protected_address: "徳島県徳島市北田宮２",
      protected_tell: "12345006789",
    },
    {
      name: "田中陽平",
      tell: "99999999999",
      password: "password02",
      protected_id: "5HA9p3jF5u",
      protected_name: "田中茂雄",
      protected_address: "千葉県柏市大室",
      protected_tell: "3333333333",
    },
  ]);
};
