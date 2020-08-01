const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT || 5000;
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));

require("./routes")(server);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log("server running at " + 5000);
});
