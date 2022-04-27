module.exports = app => {
  const opensea = require("../controllers/opensea.controller.js");

  var router = require("express").Router();

  router.get("/", opensea.getAll);

  router.get("/details/:address/:nftId", opensea.details);

  router.get("/contracts/:address", opensea.contracts);

  router.get("/account/:account", opensea.account);
  
  router.get("/insert/:address/:page", opensea.insert);

  router.get('/init', opensea.init);

  // Update a debt with id
  router.put("/:gamelandNftId", opensea.update);

  app.use('/v0/opensea', router);
};