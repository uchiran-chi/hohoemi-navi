const reactionModel = require("./reaction.model");

module.exports = {
  async findUserReactions(req, res) {
    const reactions = await reactionModel.getAll(
      req.params.user_id,
      req.query.from,
      req.query.to
    );
    res.status(200).json(reactions);
  },

  async getUserReaction(req, res) {
    const reaction = await reactionModel.getById(
      req.params.user_id,
      req.params.reaction_id
    );
    res.status(200).json(reaction);
  },

  async createUserReaction(req, res) {
    req.body.sendat = new Date();
    req.body.user_id = parseInt(req.params.user_id);
    await reactionModel.create(req.body);
    res.status(201).json();
  },
};
