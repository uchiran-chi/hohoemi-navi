const knex = require("../knex");

const REACTION_TABLE = "reaction";

module.exports = {
  REACTION_TABLE: REACTION_TABLE,
  // リアクションテーブルに関するデータベース操作を行う。

  /**
   * @param {int} user_id - The user's id.
   * @param {timestamp} from - The start of the time range. Defaults to "1900-01-01T00:00:00Z".
   * @param {timestamp} to - The end of the time range. Defaults to "2100-12-31T23:59:59Z".
   * @return {Promise<Array>} A promise that resolves to an array of reactions.
   */

  getAll(user_id, from = "1900-01-01T00:00:00Z", to = "2100-12-31T23:59:59Z") {
    return knex
      .select({
        id: "id",
        user_id: "user_id",
        sendat: "sendat",
        reaction: "reaction",
        comment: "comment",
      })
      .from(REACTION_TABLE)
      .where("user_id", user_id)
      .whereBetween("sendat", [from, to]);
  },

  /**
   * @param {number} user_id - The user's id.
   * @param {number} id - The reaction's id.
   * @return {Promise<Object>} A promise that resolves to the reaction that matches the id.
   */

  getById(user_id, id) {
    return knex
      .select({
        id: "id",
        user_id: "user_id",
        sendat: "sendat",
        reaction: "reaction",
        comment: "comment",
      })
      .from(REACTION_TABLE)
      .where({
        id: id,
        user_id: user_id,
      })
      .first();
  },

  /**
   * @param {Object} reaction - The new reaction data to add.
   * @return {Promise<number>}  A promise that resolves when the reaction is created.
   */

  // テスト実行時にタイムアウトとなってしまうため、async/awaitを使う形に修正
  async create(reaction) {
    await knex(REACTION_TABLE).insert(reaction).catch(console.error);
  },
};
