module.exports = app => {
  const guilds = require("../controllers/guilds.controller.js");

  var router = require("express").Router();

  // Create a new Guild
  router.post("/", guilds.create);

  // Retrieve all Guilds
  router.get("/", guilds.findAll);

  // Retrieve a single Guild with id
  router.get("/:name", guilds.findByName);

  // Update a Guild Members with id
  router.put("/count/:id", guilds.countMembers);

  // Update a Guild with id
  router.put("/:id", guilds.update);

  // Delete a Guild with id
  router.delete("/:id", guilds.delete);

  // Delete a Guild with id
  router.delete("/", guilds.deleteByFounder);

  // Delete all Guilds
  router.delete("/", guilds.deleteAll);

  app.use('/v0/guilds', router);
};