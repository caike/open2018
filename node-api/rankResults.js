"use strict";

const fs = require("fs");

// extract this to module
const competitorIds = [
  442223, // Carlos Souza
  1330578, // Fernando Leite
  681449, // Mateus Linhares
  940313, // Diego Souza
];

function readScoreFiles(){
  let score;
  return competitorIds.map((competitorId) => {
    score = fs.readFileSync(`./data/${competitorId}.json`);
    return JSON.parse(score);
  });
}

function filterCompetitors(scores){
  let filtered = [];
  scores.forEach((c) => {
    c.leaderboardRows.forEach((entry) => {
      if(competitorIds.includes(parseInt(entry.entrant.competitorId))){
        filtered.push(entry);
      }
    });
  });
  return filtered;
}

function sortRank(competitors){
  return competitors.sort((a,b) => {
    return a.entrant.overallRank > b.entrant.overallRank
  });
}

function writeResults(sortedRank){
  fs.writeFile(`./data/results.json`, JSON.stringify(sortedRank), (err) => {
    if (err) throw err;
    console.log("wrote results to data/results.json");
  });
}

const allScores = readScoreFiles();
const registeredCompetitors = filterCompetitors(allScores);
const rankedCompetitors = sortRank(registeredCompetitors);

writeResults(rankedCompetitors);

