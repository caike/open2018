"use strict";

const fs = require("fs");
const competitors = require("./competitors");

function readScoreFiles(){
  let score;
  return competitors.map((competitorId) => {
    score = fs.readFileSync(`./data/${competitorId}.json`);
    return JSON.parse(score);
  });
}

function filterCompetitors(scores){
  let filtered = [];
  scores.forEach((c) => {
    c.leaderboardRows.forEach((entry) => {
      if(competitors.includes(parseInt(entry.entrant.competitorId))){
        filtered.push(entry);
      }
    });
  });
  return filtered;
}

function sortRank(filtered){
  return filtered.sort((a,b) => {
    return sumScores(a.scores) < sumScores(b.scores);
  });
}

function sumScores(scores){
  return scores.map(function(score) { return parseInt(score.score); }).reduce(function(prev, curr) { return prev + curr; });
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

// console.log( rankedCompetitors );
writeResults(rankedCompetitors);

