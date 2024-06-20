"use strict";

// importações externas
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// importações internas
const express_routes = require("../express/routes/index");

// começo
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", express_routes.routes);

app.listen(9800, () => {
  console.log("app listening on url http://localhost:9800");
});
