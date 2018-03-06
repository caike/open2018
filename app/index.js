"use strict";

const express = require("express");
const app = express();

app.set("env", process.env.NODE_ENV || "development");
// this is needed for static assets
app.use(express.static("public"))

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/public");
const routes = require("./lib/routes");

app.get("/", routes.root);
app.get("/leaderboard", routes.showLeaderboard);
//app.post("/leaderboards", routes.createNewLeaderboard);

const PORT = process.env.PORT || "8080";
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
