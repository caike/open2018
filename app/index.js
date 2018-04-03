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

/** currently being used
** for our hardcoded leaderboard
**/
app.get("/leaderboard", routes.showLeaderboard);
app.get("/leaderboards/new", routes.Leaderboards.New)

/* Leaderboard CRUD */
app.get("/leaderboards/:id", routes.Leaderboards.Show)
app.post("/leaderboards", routes.Leaderboards.Create);
app.post("/leaderboards/:leaderboard_id/members",
  routes.Leaderboards.Members.Create)

module.exports = app;