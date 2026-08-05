import { questions, characterNames } from "./simulatorData.js";

const simulationCount = 100000;

const characterCounts = Array(characterNames.length).fill(0);
let tieCount = 0;

for (let i = 0; i < simulationCount; i++) {
  const scores = Array(characterNames.length).fill(0);

  questions.forEach((question) => {
    const randomChoice = Math.floor(Math.random() * question.length);
    const selectedScores = question[randomChoice];

    selectedScores.forEach((score, index) => {
      scores[index] += score;
    });
  });

  const highestScore = Math.max(...scores);

  const winners = scores
    .map((score, index) => (score === highestScore ? index : null))
    .filter((index) => index !== null);

  if (winners.length === 1) {
    characterCounts[winners[0]]++;
  } else {
    tieCount++;
  }
}

console.log(`シミュレーション回数：${simulationCount.toLocaleString()}回`);

characterNames.forEach((name, index) => {
  const count = characterCounts[index];
  const percentage = ((count / simulationCount) * 100).toFixed(2);

  console.log(`${name}：${count.toLocaleString()}回（${percentage}%）`);
});

const tiePercentage = ((tieCount / simulationCount) * 100).toFixed(2);
console.log(`同点：${tieCount.toLocaleString()}回（${tiePercentage}%）`);