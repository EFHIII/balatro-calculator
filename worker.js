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
}

function run(jokers = [[]]) {
  thisHand.jokers = jokers[0];

  thisHand.compileJokers();

  let bestJokers = [];
  let bestCards = [];
  let bestCardsInHand = [];
  let bestScore = false;

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

        thisHand.compileCards();

        for(let l = 0; l < thisPerms.length; l++) {
          thisHand.cards = [];
          for(let m = 0; m < thisPerms[l].length; m++) {
            thisHand.cards.push(thisCards[thisPerms[l][m]]);
          }
          thisHand.cardsInHand = thisCardsInHand.slice();

          let thisScore;

          switch (optimizeMode) {
            default:
              if(minimize) {
                thisScore = thisHand.simulateWorstHand();
                if(!bestScore) {
                  bestScore = thisScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                }
                if(thisScore[1] < bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] < bestScore[0])) {
                  bestScore = thisScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                }

              }
              else {
                thisScore = thisHand.simulateBestHand();

                if(!bestScore) {
                  bestScore = thisScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                }
                if(thisScore[1] > bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] > bestScore[0])) {
                  bestScore = thisScore;
                  bestCards = thisHand.cards;
                  bestJokers = jokers[j];
                  bestCardsInHand = thisHand.cardsInHand;
                }
              }
          }
        }
      }
    }
    else {
      thisHand.compileCards();

      let thisScore;

      switch (optimizeMode) {
        default:
          if(minimize) {
            thisScore = thisHand.simulateWorstHand();
            if(!bestScore) {
              bestScore = thisScore;
              bestJokers = jokers[j];
            }
            if(thisScore[1] < bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] < bestScore[0])) {
              bestScore = thisScore;
              bestJokers = jokers[j];
            }
          }
          else {
            thisScore = thisHand.simulateBestHand();

            if(!bestScore) {
              bestScore = thisScore;
              bestJokers = jokers[j];
            }
            if(thisScore[1] > bestScore[1] || (thisScore[1] === bestScore[1] && thisScore[0] > bestScore[0])) {
              bestScore = thisScore;
              bestJokers = jokers[j];
            }
          }
      }
    }
  }

  thisHand.jokers = bestJokers.slice();
  thisHand.cards = bestCards.slice();
  thisHand.cardsInHand = bestCardsInHand.slice();

  thisHand.compileAll();

  postMessage([taskID, bestScore, bestJokers, bestCards, bestCardsInHand, thisHand.simulateBestHand(), thisHand.simulateWorstHand(), thisHand.typeOfHand]);
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
