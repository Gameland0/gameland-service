module.exports = app => {
  const membersApply = require("../controllers/members.apply.controller.js");

  var router = require("express").Router();

  // Create a new apply
  router.post("/", membersApply.create);

  // Approve a apply
  router.put("/:id", membersApply.update);

  // Retrieve all apply
  router.get("/", membersApply.findAll);

  // Delete a apply with id
  router.delete("/:id", membersApply.delete);

  // Delete all applys
  router.delete("/", membersApply.deleteAll);

  app.use('/v0/membersApply', router);
};