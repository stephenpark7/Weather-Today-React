const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "build")));
const SERVER_PORT = process.env.PORT || 8080;

app.get("/ping", function (req, res) {
 return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(SERVER_PORT, () => {
  console.log("Server started at: " + SERVER_PORT);
});