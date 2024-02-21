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
      const reaction = {
        reaction: "good",
        comment: "お友達と散歩をしたようです",
      };
      const res = await request
        .post("/api/v1/users/2/reactions")
        .send(reaction);
      res.should.have.status(201);
    });
  });

  describe("GET /api/v1/users/{user_id}/reactions", () => {
    it("should retrn all userReactions by id", async () => {
      const res = await request.get("/api/v1/users/1/reactions");
      res.body.length.should.equal(2);
    });
  });

  describe("GET /api/v1/users/{user_id}/reactions/{reaction_id}", () => {
    it("should retrn userReaction by id", async () => {
      const res = await request.get("/api/v1/users/1/reactions/2");
      res.body.reaction.should.equal("bad");
    });
  });

  describe("POST /api/v1/users/", () => {
    it("should create user", async () => {
      const postUser = {
        name: "吉田三郎",
        tell: "15122228888",
        password: "1100hu",
        protected_name: "田中とめ",
        protected_address: "東京",
        protected_tell: "51533339999",
      };
      const res = await request.post("/api/v1/users/").send(postUser);
      res.should.have.status(201);
    });
  });

  describe("POST /api/v1/users/login", () => {
    it("should return user_id by tell&password", async () => {
      const userInfo = {
        tell: "15122228888",
        password: "1100hu",
      };
      const res = await request.post("/api/v1/users/login").send(userInfo);
      const expected = { id: 3 };
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("GET /api/v1/users/:user_id", () => {
    it("should return userInfo by id", async () => {
      const res = await request.get("/api/v1/users/2");
      const expected = {
        id: 2,
        name: "田中陽平",
        tell: "99999999999",
        password: "password02",
        protected_id: "5HA9p3jF5u",
        protected_name: "田中茂雄",
        protected_address: "千葉県柏市大室",
        protected_tell: "3333333333",
      };
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("POST /api/v1/watchers/login", () => {
    it("should return userId&protected_name by protected_id", async () => {
      const protectedId = { protected_id: "5HA9p3jF5u" };
      const res = await request
        .post("/api/v1/watchers/login")
        .send(protectedId);

      const expected = { id: 2, protected_name: "田中茂雄" };

      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });
});
