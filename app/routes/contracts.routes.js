module.exports = app => {
  const contracts = require("../controllers/contracts.controller.js");

  var router = require("express").Router();

  // Create a new contract
  router.post("/", contracts.create);

  // Retrieve all contracts
  router.get("/", contracts.findAll);

  // Update a contract with id
  router.put("/:id", contracts.update);

  // Delete a contract with id
  router.delete("/:id", contracts.delete);

  app.use('/v0/contracts', router);
};