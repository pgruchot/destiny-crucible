const express = require("express");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const morgan = require("morgan");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));

server.listen(5000, () => {
  console.log("server running at " + 5000);
});
