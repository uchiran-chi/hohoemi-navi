const express = require("express");
const reactionController = require("./reaction/reaction.controller");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get(
    "/api/v1/users/:user_id/reactions",
    reactionController.findUserReactions
  );

  app.get(
    "/api/v1/users/:user_id/reactions/:reaction_id",
    reactionController.getUserReaction
  );

  app.post(
    "/api/v1/users/:user_id/reactions",
    reactionController.createUserReaction
  );

  return app;
};

module.exports = { setupServer };

// GET /api/v1/users/{user_id}/reactions
// {
//   [
//     {
//       reaction_id: 1,
//       reaction_number: 1,
//       reaction_timestamp: xx:xx:xx
//     },
//     {
//       reaction_id: 2,
//       reaction_number: 3,
//       reaction_timestamp: xx:xx:xx
//     }
//   ]
// }
// GET /api/v1/users/{user_id}/reactions/{reaction_id}
// {
//   {
//     reaction_id: 2
//     reaction_number: 3,
//     reaction_timestamp: xx:xx:xx
//   }
// }
// POST /api/v1/users/{user_id}/reactions
// {
//   reaction_number: 1
// }
