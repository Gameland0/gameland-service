module.exports = app => {
  const opensea = require("../controllers/opensea.controller.js");

  var router = require("express").Router();

  router.get("/", opensea.getAll);

  router.post("/", opensea.create);

  router.get("/account/:account", opensea.account);
  
  router.get("/insert/:address/:page", opensea.insert);

  // Update a debt with id
  router.put("/:gamelandNftId", opensea.update);
  
  router.delete("/:id", opensea.delete);

  app.use('/v0/opensea', router);
};