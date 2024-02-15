const testResponse = [
  {
    reaction_id: 1,
    reaction_number: 1,
    reaction_timestamp: "xx:xx:xx",
  },
  {
    reaction_id: 2,
    reaction_number: 3,
    reaction_timestamp: "xx:xx:xx",
  },
];

const testSingleResponse = {
  reaction_id: 1,
  reaction_number: 1,
  reaction_timestamp: "xx:xx:xx",
};

module.exports = {
  async findUserReactions(req, res) {
    // const plants = await knex.select().from("planttable");
    // const customers = await customerModel.getAll();
    res.status(200).json(testResponse);
    // return testResponse;
  },

  async getUserReaction(req, res) {
    // const plants = await knex.select().from("planttable");
    // const customers = await customerModel.getAll();
    res.status(200).json(testSingleResponse);
    // return testResponse;
  },

  async createUserReaction(req, res) {
    res.status(201).json();
  },

  // {
  //   reaction_number: 1
  // }

  //   async create(req) {
  //     knex(PLANT_TABLE).insert(req.body).returning("id");
  //   },

  //   async update(req) {
  //     knex(PLANT_TABLE).where({ id: req.params.id }).update(req.body);
  //   },

  //   async delete(req) {
  //     knex(PLANT_TABLE).where({ id: req.params.id }).del();
  //   },
};
