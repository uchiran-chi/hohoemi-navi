const knex = require("../knex");

const USERS_TABLE = "users";

module.exports = {
  async createUser(newUser) {
    try {
      const insertedUser = await knex(USERS_TABLE)
        .insert(newUser)
        .returning("id");
      return insertedUser;
    } catch (error) {
      throw error;
    }
  },

  async loginUser(loginInfo) {
    try {
      const user = await knex(USERS_TABLE)
        .select("id")
        .where(loginInfo)
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const user = await knex(USERS_TABLE).where("id", userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async loginWatcher(protectedId) {
    try {
      const watcher = await knex(USERS_TABLE)
        .select("id", "protected_name")
        .where("protected_id", protectedId)
        .first();
      return watcher;
    } catch (error) {
      throw error;
    }
  },
};
