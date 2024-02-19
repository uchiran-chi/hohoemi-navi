const knex = require("../knex");

const REACTION_TABLE = "reaction";

module.exports = {
  REACTION_TABLE: REACTION_TABLE,
  // リアクションテーブルに関するデータベース操作を行う。

  /**
   * @param {int} userId - The user's id.
   * @param {timestamp} from - The start of the time range. Defaults to "1900-01-01T00:00:00Z".
   * @param {timestamp} to - The end of the time range. Defaults to "2100-12-31T23:59:59Z".
   * @return {Promise<Array>} A promise that resolves to an array of reactions.
   */

  // 検索範囲のデフォルト：開始 1900/1/1、終了 2100/12/31
  // 指定されたユーザーIDおよび時間範囲内のリアクションを取得する
  getAll(userId, from = "1900-01-01T00:00:00Z", to = "2100-12-31T23:59:59Z") {
    return knex
      .select({
        id: "id",
        userId: "userId",
        sendAt: "sendAt",
        reaction: "reaction",
      })
      .from(REACTION_TABLE)
      .where("userId", userId)
      .whereBetween("sendAt", [from, to]);
  },

  /**
   * @param {number} userId - The user's id.
   * @param {number} id - The reaction's id.
   * @return {Promise<Object>} A promise that resolves to the reaction that matches the id.
   */

  // 指定されたユーザーIDとリアクションIDに一致するリアクションを取得する
  getById(userId, id) {
    return knex
      .select({
        id: "id",
        userId: "userId",
        sendAt: "sendAt",
        reaction: "reaction",
      })
      .from(REACTION_TABLE)
      .where({
        id: id,
        userId: userId,
      })
      .first();
  },

  /**
   * @param {Object} reaction - The new reaction data to add.
   * @return {Promise<number>}  A promise that resolves when the reaction is created.
   */

  // リアクションを作成
  // テスト実行時にタイムアウトとなってしまうため、async/awaitを使う形に修正
  async create(reaction) {
    await knex(REACTION_TABLE).insert(reaction);
  },
};
