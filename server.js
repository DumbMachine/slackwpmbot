const express = require("express");
const path = require("path");
const app = express();

var env = process.env.dumbmachine || null;

app.use(express.static(path.join(__dirname, "build")));

app.get("/type/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (env != null) {
  const port = 8889;
  console.log("running on the port: ", port);
  app.listen(port);
} else {
  const port = 8888;
  console.log("running on the port: ", port);
  app.listen(port);
}
