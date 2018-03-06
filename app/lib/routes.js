"use strict";

const routes = {};

const fs = require("fs");

routes.root = (request, response) => {
  response.render("index");
}

routes.createNewLeaderboard = (request, response) => {
  response.render("check-your-email");
}

routes.showLeaderboard = (request, response) => {
  fs.readFile("lib/data/results.json", (err, data) => {
    const results = JSON.parse(data);
    response.render("show", { results });
  });
}

module.exports = routes;
