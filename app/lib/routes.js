"use strict";

const routes = {};

routes.root = (request, response) => {
  response.render("index");
}

routes.createNewLeaderboard = (request, response) => {
  response.render("check-your-email");
}

routes.showLeaderboard = (request, response) => {
  response.render("show");
}

module.exports = routes;
