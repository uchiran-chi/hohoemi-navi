const usersModel = require("./users.model");
const crypto = require("crypto");

// ランダムなID生成用
function generateRandomId(length) {
  const randomBytes = crypto.randomBytes(length);
  return randomBytes.toString("base64").slice(0, length);
}

module.exports = {
  async createUser(req, res) {
    try {
      const postUser = req.body;
      const randomID = generateRandomId(10);

      const newUser = {
        name: postUser.name,
        tell: postUser.tell,
        password: postUser.password,
        protected_id: randomID,
        protected_name: postUser.protected_name,
        protected_address: postUser.protected_address,
        protected_tell: postUser.protected_tell,
      };

      const insertedUser = await usersModel.createUser(newUser);
      res.status(201).json(insertedUser[0]);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async loginUser(req, res) {
    const loginInfo = req.body;
    try {
      const user = await usersModel.loginUser(loginInfo);
      if (user) {
        res.status(200).json({ id: user.id });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async findUserById(req, res) {
    const userId = req.params.user_id;
    try {
      const user = await usersModel.getUserById(userId);
      res.status(200).json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async loginWatcher(req, res) {
    const protectedId = req.body.protected_id;
    try {
      const watcher = await usersModel.loginWatcher(protectedId);
      if (watcher) {
        res
          .status(200)
          .json({ id: watcher.id, protected_name: watcher.protected_name });
      } else {
        res.status(404).json({ error: "Watcher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
