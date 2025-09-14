'use strict';
importScripts('balatro-sim.js');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function choose(array, k) {
  if (k === 0) {
    return [[]];
  }

  const results = [];

  for (let i = 0; i < array.length; i++) {
    const remaining = array.slice(i + 1);
    const combinations = choose(remaining, k - 1);

    for (const combination of combinations) {
      results.push([array[i], ...combination]);
    }
  }

  return results;
}

function permutations(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

let taskID;
let workerID;
let thisHand;

let cards;
let jokers;

let optimizeCards;
let minimize;
let optimizeMode;

let bestHand;

// postMessage();
// sleep(ms);

function initialize(state) {
  thisHand = new Hand({
    hands: state.hands,
    TheFlint: state.TheFlint,
    TheEye: state.TheEye,
    PlasmaDeck: state.PlasmaDeck,
    Observatory: state.Observatory
  });

  taskID = state.taskID;
  cards = state.cards;
  jokers = state.jokers;
  optimizeCards = state.optimizeCards;
  minimize = state.minimize;
  optimizeMode = state.optimizeMode;
  bestHand = state.bestHand;
  workerID = state.workerID;
}

function run(jokers = [[]]) {
  thisHand.jokers = jokers[0].map(a => a.slice());

  thisHand.compileJokers();

  let bestJokers = [];
  let bestCards = [];
  let bestCardsInHand = [];
  let bestScore = false;
  let bestSameScore = false;
  let bestHighScore = false;

  let possibleHands = [[]];

  let thisPermutations;

  if(optimizeCards) {
    possibleHands = [[]];
    let arr = [];
    for(let l = 0; l < cards.length; l++) {
      arr.push(l);
    }
    for(let i = 1; i <= Math.min(5, arr.length); i++) {
      possibleHands.push(...choose(arr, i));
    }
    thisPermutations = [
      [[]],
      [[0]],
      [[0,1],[1,0]],
      permutations([0,1,2]),
      permutations([0,1,2,3]),
      permutations([0,1,2,3,4])
    ];
  }
  else {
    for(let i = 0; i < bestHand.length; i++) {
      bestCards.push(cards[bestHand[i]]);
      thisHand.cards.push(cards[bestHand[i]]);
    }
    thisHand.cardsInHand = cards.slice();
    for(let l = 0; l < thisHand.cards.length; l++) {
      thisHand.cardsInHand.splice(thisHand.cardsInHand.indexOf(thisHand.cards[l]), 1);
    }
    bestCardsInHand = thisHand.cardsInHand;
  }

  let originalHand = thisHand.cardsInHand.slice();

  for(let j = 0; j < jokers.length; j++) {
    thisHand.jokers = jokers[j].map(a => a.slice());
    thisHand.compileJokerOrder();

    if(optimizeCards) {
      for(let i = 0; i < possibleHands.length; i++) {
        const tmpCards = cards.map(a => a.slice());
        thisHand.cards = [];
        thisHand.cardsInHand = tmpCards.slice();
        for(let j = 0; j < possibleHands[i].length; j++) {
          thisHand.cards.push(cards[possibleHands[i][j]]);
        }
        for(let j = possibleHands[i].length - 1; j >= 0; j--) {
          thisHand.cardsInHand.splice(possibleHands[i][j], 1);
        }

        const thisCardsInHand = thisHand.cardsInHand.slice();
        const thisCards = thisHand.cards.slice();
        const thisPerms = thisPermutations[thisHand.cards.length];

        thisHand.actualCardsInHand = thisCardsInHand.slice();
        thisHand.compileCards();

        for(let l = 0; l < thisPerms.length; l++) {
          thisHand.cards = [];
          for(let m = 0; m < thisPerms[l].length; m++) {
            thisHand.cards.push(thisCards[thisPerms[l][m]]);
          }
          thisHand.cardsInHand = thisCardsInHand.slice();
          const thisOriginalHand = thisCardsInHand.slice();

          let thisScore;

          let sameScore = 0;
          for(let i = 0; i < thisHand.cardsInHand.length; i++) {
            sameScore += (thisHand.cardsInHand[i][EDITION] * 200 + thisHand.cardsInHand[i][ENHANCEMENT] * 20 + thisHand.cardsInHand[i][RANK]) * (thisHand.cardsInHand[i][CARD_DISABLED] ? 0 : 1);
          }

          switch (optimizeMode) {
            default:
              if(minimize) {
                thisScore = thisHand.simulateBestHand();
                if(!bestScore) {
                  bestScore = thisScore;
                  bestHighScore = thisHand.simulateBestHand();
                  bestSameScore = sameScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                  originalHand = thisOriginalHand;
                }
                if(thisScore[1] < bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] < bestScore[0]) || (bestCards.length === 0 && thisHand.cards.length > 0) || (thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0] && sameScore > bestSameScore)) {
                  bestScore = thisScore;
                  bestHighScore = thisHand.simulateBestHand();
                  bestSameScore = sameScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                  originalHand = thisOriginalHand;
                }
                else if(thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0] && sameScore === bestSameScore) {
                  const bhs = thisHand.simulateBestHand();

                  if(bhs < bestHighScore) {
                    bestScore = thisScore;
                    bestHighScore = bhs;
                    bestSameScore = sameScore;
                    bestCards = thisHand.cards;
                    bestJokers = jokers[j];
                    bestCardsInHand = thisHand.cardsInHand;
                    originalHand = thisOriginalHand;
                  }
                }

              }
              else {
                thisScore = thisHand.simulateWorstHand();

                if(!bestScore) {
                  bestScore = thisScore;
                  bestHighScore = thisHand.simulateBestHand();
                  bestSameScore = sameScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                  originalHand = thisOriginalHand;
                }
                if(thisScore[1] > bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] > bestScore[0]) || (bestCards.length === 0 && thisHand.cards.length > 0) || (thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0] && sameScore > bestSameScore)) {
                  bestScore = thisScore;
                  bestHighScore = thisHand.simulateBestHand();
                  bestSameScore = sameScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                  originalHand = thisOriginalHand;
                }
                else if(thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0] && sameScore === bestSameScore) {
                  const bhs = thisHand.simulateBestHand();

                  if(bhs > bestHighScore) {
                    bestScore = thisScore;
                    bestHighScore = bhs;
                    bestSameScore = sameScore;
                    bestCards = thisHand.cards;
                    bestJokers = jokers[j];
                    bestCardsInHand = thisHand.cardsInHand;
                    originalHand = thisOriginalHand;
                  }
                }
              }
          }
        }
      }
      //console.log(bestScore);
    }
    else {
      thisHand.compileCards();

      let thisScore;

      switch (optimizeMode) {
        default:
          if(minimize) {
            thisScore = thisHand.simulateBestHand();
            if(!bestScore) {
              bestScore = thisScore;
              bestHighScore = thisHand.simulateBestHand();
              bestJokers = jokers[j];
            }
            if(thisScore[1] < bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] < bestScore[0])) {
              bestScore = thisScore;
              bestHighScore = thisHand.simulateBestHand();
              bestJokers = jokers[j];
            }
            else if(thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0]) {
              const bhs = thisHand.simulateBestHand();

              if(bhs < bestHighScore) {
                bestScore = thisScore;
                bestHighScore = bhs;
                bestJokers = jokers[j];
              }
            }
          }
          else {
            thisScore = thisHand.simulateWorstHand();

            if(!bestScore) {
              bestScore = thisScore;
              bestHighScore = thisHand.simulateBestHand();
              bestJokers = jokers[j];
            }
            if(thisScore[1] > bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] > bestScore[0])) {
              bestScore = thisScore;
              bestHighScore = thisHand.simulateBestHand();
              bestJokers = jokers[j];
            }
            else if(thisScore[1] === bestScore[1] && thisScore[0] === bestScore[0]) {
              const bhs = thisHand.simulateBestHand();

              if(bhs > bestHighScore) {
                bestScore = thisScore;
                bestHighScore = bhs;
                bestJokers = jokers[j];
              }
            }
          }
      }
    }
  }

  thisHand.jokers = bestJokers.map(a => a.slice());
  thisHand.cards = bestCards.slice();
  console.log(originalHand);
  thisHand.cardsInHand = originalHand.slice();


  thisHand.compileAll();

  const highestScore = thisHand.simulateBestHand();
  const lowestScore = thisHand.simulateWorstHand();
  const highestScoreScore = normalizeBig(highestScore);
  highestScore[0] = highestScoreScore[0];
  highestScore[1] = highestScoreScore[1];
  const lowestScoreScore = normalizeBig(lowestScore);
  lowestScore[0] = lowestScoreScore[0];
  lowestScore[1] = lowestScoreScore[1];

  let medianScore = highestScore;
  let meanScore = highestScore;

  if(highestScore[0] !== lowestScore[0] || highestScore[1] !== lowestScore[1]) {
    let runScores = [];
    meanScore = [1, 0];
    for(let i = 0; i < 10001; i++) {
      const thisScore = thisHand.simulateRandomHand();
      runScores.push(thisScore);
      meanScore = bigBigAdd(thisScore, meanScore);
    }
    meanScore = bigTimes(1 / 10001, meanScore);
    runScores = runScores.sort((a, b) => {
      if(a[1] > b[1] || (a[1] === b[1] && a[0] > b[0])) {
        return 1;
      }
      return -1;
    });

    medianScore = runScores[5000];
  }
  
  postMessage([taskID, bestScore, bestJokers, bestCards, originalHand, highestScore, lowestScore, thisHand.typeOfHand, normalizeBig(meanScore), normalizeBig(medianScore), workerID, thisHand.compiledValues]);
}

self.onmessage = async function(msg) {
  switch (msg.data[0]) {
    case "start":
      initialize(msg.data[1]);
      break;
    case "once":
      run([[]]);
      break;
    case "dontOptimizeJokers":
      run([jokers]);
      break;
    case "optimizeJokers":
      let permuted = permutations(jokers);
      run(permuted.slice(msg.data[1], msg.data[2]));
      break;
    default:
  }
}
