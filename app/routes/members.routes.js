module.exports = app => {
  const members = require("../controllers/members.controller.js");

  var router = require("express").Router();

  // Create a new Guild
  router.post("/", members.create);

  // Retrieve all Members
  router.get("/", members.findAll);

  // Retrieve a single Guild with id
  router.get("/:name", members.findOne);

  // Update a Guild with id
  router.put("/:id", members.update);

  // Delete a Guild with id
  router.delete("/:id", members.delete);

  // Delete all Members
  router.delete("/", members.deleteAll);

  app.use('/v0/members', router);
};