"use strict";

const dotenv = require("dotenv");

dotenv.config();

const { HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE } = process.env;

module.exports = {
  server: HOST,
  authentication: {
    type: "default",
    options: {
      userName: SQL_USER,
      password: SQL_PASSWORD,
    },
  },
  options: {
    encrypt: false,
    database: SQL_DATABASE,
  },
};
