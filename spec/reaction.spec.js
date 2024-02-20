const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const path = require("path");
const config = require(path.join(__dirname, "../knexfile"));
const knex = require("knex")(config.test);

const server = setupServer();
let request;

const reaction = {
  reaction: "good",
  comment: "お友達と散歩をしたようです",
};

before(async () => {
  // マイグレーション実行
  await knex.migrate.latest();
  // シード実行
  await knex.seed.run();
  console.log("Before pass");
});

after(async () => {
  // テスト後にロールバック
  await knex.migrate.rollback();
  console.log("After pass");
});

describe("serverのテスト", () => {
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("POST /api/v1/users/{user_id}/reactions", () => {
    it("should create userReaction", async () => {
      const res = await request
        .post("/api/v1/users/3/reactions")
        .send(reaction);
      res.should.have.status(201);
    });
  });

  describe("GET /api/v1/users/{user_id}/reactions", () => {
    it("should retrn userReactions", async () => {
      const res = await request.get("/api/v1/users/1/reactions");
      res.body.length.should.equal(2);
    });
  });

  describe("GET /api/v1/users/{user_id}/reactions/{reaction_id}", () => {
    it("should create userReaction", async () => {
      const res = await request.get("/api/v1/users/1/reactions/2");
      res.body.reaction.should.equal("bad");
    });
  });
});
