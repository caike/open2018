"use strict";

const request = require("request");
const fs = require("fs");

const competitors = require("./competitors");

function fetchCompetitorData(ids){
  const baseUrl = "https://games.crossfit.com/competitions/api/v1/"+
  "competitions/open/2018/leaderboards?division=1&region=0&athlete=";

  const allData = competitors.forEach((id) => {
    console.log("request to");
    console.log(baseUrl + id);
    request(baseUrl + id, writeToFile(id));
  });
}

function writeToFile(competitorId){
  return function(error, response, body){
    fs.writeFile(`./data/${competitorId}.json`, body, (err) => {
      if (err) throw err;
      console.log(`Saved data for ${competitorId}`);
    });
  }
}

fetchCompetitorData(competitors);
