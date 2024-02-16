const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const server = setupServer();
let request;

beforeEach(() => {
  request = chai.request(server);
});

const reaction = {
  reaction_value: "good",
};

describe("POST /api/v1/users/{user_id}/reactions", () => {
  it("should create userReaction", async () => {
    const res = await request
      .post("/api/v1/users/:user_id/reactions")
      .send(reaction);
    res.should.have.status(201);
  });
});

describe("GET /api/v1/users/{user_id}/reactions", () => {
  it("should retrn userReactions", async () => {
    const res = await request.get("/api/v1/users/:user_id/reactions");
    res.body.length.should.equal(2);
  });
});

describe("GET /api/v1/users/{user_id}/reactions/{reaction_id}", () => {
  it("should create userReaction", async () => {
    const res = await request
      .get("/api/v1/users/:user_id/reactions/:reaction_id")
      .send(reaction);
    res.body.reaction_value.should.equal("good");
  });
});
