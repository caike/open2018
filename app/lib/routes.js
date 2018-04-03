"use strict";

const routes = {};

const fs = require("fs");

routes.root = (request, response) => {
  response.render("index");
}

const wods = ["18.1", "18.2", "18.2a", "18.3", "18.4", "18.5"];

routes.showLeaderboard = (request, response) => {
  fs.readFile("lib/data/results.json", (err, data) => {
    const results = JSON.parse(data);

    let count = 1;
    let counter = () => count++;
    let wodCount = 0;
    let nextWod = () => wods[wodCount++];
    let resetWod = () => wodCount = 0;
    let fitColSpan = () => results[0].scores.length - 1;
    response.render("show", { results, counter, nextWod, resetWod, fitColSpan });
  });
}

routes.Leaderboards = {
  New: (request, response) => {
    // render new form
  },

  Create: (request, response) => {
    // create new leaderboard
    // with data: { name: ..., owner: e-mail }
    // and redirect to Leaderboards.Show
  },

  Show: (request, response) => {
    // read id, load from db and show
  },

  Members: {
    Index: (request, response) => {
      // list members of leaderboard_id
    },
    Create: (request, response) => {
      // add member to existing leaderboard_id
    }
  }
}

module.exports = routes;