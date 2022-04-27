require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081","http://101.36.113.47","http://gameland.network","https://gameland.network","https://testnet.gameland.network"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// drop database if you like
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require("./app/routes/pumpkin.routes")(app);
require("./app/routes/nft.routes")(app);
require("./app/routes/contracts.routes")(app);
require("./app/routes/opensea.routes")(app);
require("./app/routes/guilds.routes")(app);
require("./app/routes/members.routes")(app);
require("./app/routes/members.apply.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});