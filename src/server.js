const express = require("express");
const reactionController = require("./reaction/reaction.controller");
const usersController = require("./users/users.controller");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  // 検索範囲のデフォルト：開始 1900/1/1、終了 2100/12/31
  // 指定されたユーザーIDおよび時間範囲内のリアクションを取得する
  app.get(
    "/api/v1/users/:user_id/reactions",
    reactionController.findUserReactions
  );

  // 指定されたユーザーIDとリアクションIDに一致するリアクションを取得する
  app.get(
    "/api/v1/users/:user_id/reactions/:reaction_id",
    reactionController.getUserReaction
  );

  // リアクションを作成
  app.post(
    "/api/v1/users/:user_id/reactions",
    reactionController.createUserReaction
  );

  // リクエストボディに指定された情報をもとにusersテーブルに登録し、idを返す
  app.post("/api/v1/users/", usersController.createUser);

  // 電話番号、パスワードをリクエストボディに指定し、一致する会員のidを返す
  app.post("/api/v1/users/login", usersController.loginUser);

  // 会員idに一致する会員の情報を返す
  app.get("/api/v1/users/:user_id", usersController.findUserById);

  // 見守り対象idに一致する会員idと見守り対象者名を返す
  app.post("/api/v1/watchers/login", usersController.loginWatcher);

  return app;
};

module.exports = { setupServer };
