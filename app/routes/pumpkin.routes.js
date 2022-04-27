module.exports = app => {
  // const Tutorial = require("../controllers/tutorial.controller.js");
  const pumpkin = require("../controllers/pumpkin.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", pumpkin.create);

  // mint a new Tutorial
  router.post("/mint", pumpkin.mint);

  // Retrieve all Tutorials
  router.get("/", pumpkin.findAll);

  // Retrieve a nft from test nfts
  router.get("/one", pumpkin.findNft);

  // Retrieve all published Tutorials
  router.get("/lending", pumpkin.findAllLending);

  // Retrieve a single Tutorial with id
  router.get("/:nftId", pumpkin.findOne);

  // Update a Tutorial with id
  router.put("/:id", pumpkin.update);

  // Delete a Tutorial with id
  router.delete("/:nftId", pumpkin.delete);

  // Delete all Tutorials
  router.delete("/", pumpkin.deleteAll);

  app.use('/v0/pumpkin', router);
};