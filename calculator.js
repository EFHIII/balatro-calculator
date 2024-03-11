let bestHand = [];
let bestJokers = [];

const bestPlayScoreDiv = document.getElementById('bestPlayScore');
const bestPlayNameDiv = document.getElementById('bestPlayName');
const scoreChipsDiv = document.getElementById('scoreChips');
const scoreMultDiv = document.getElementById('scoreMult');
const chipIcon = '<span class="chipIcon"></span>';

let optimizeJokers = true;
let optimizeCards = true;
const toggleJokerDiv = document.getElementById('toggleJokerBtn');
const toggleCardDiv = document.getElementById('toggleCardBtn');
const toggleTheFlintDiv = document.getElementById('toggleTheFintBtn');
const togglePlasmaDiv = document.getElementById('togglePlasmaBtn');
const toggleObservatoryDiv = document.getElementById('toggleObservatoryBtn');

let theFlint = false;
let plasmaDeck = false;
let observatory = false;

function toggleJoker() {
  optimizeJokers = !optimizeJokers;
  if(optimizeJokers) {
    if(optimizeCards && (Object.keys(playfieldJokers).length >= 8 || Object.keys(playfieldCards).length >= 10)) {
      toggleCard();
    }
  }
  redrawPlayfield();

  if(optimizeJokers) {
    toggleJokerDiv.innerText = 'X';
  }
  else {
    toggleJokerDiv.innerHTML = '&nbsp;';
  }
}

function toggleCard() {
  optimizeCards = !optimizeCards;
  if(optimizeCards) {
    if(optimizeJokers && (Object.keys(playfieldJokers).length >= 8 || Object.keys(playfieldCards).length >= 10)) {
      toggleJoker();
    }
  }
  redrawPlayfield();

  if(optimizeCards) {
    toggleCardDiv.innerText = 'X';
  }
  else {
    toggleCardDiv.innerHTML = '&nbsp;';
  }
}

function togglePlasma() {
  plasmaDeck = !plasmaDeck;
  redrawPlayfield();

  if(plasmaDeck) {
    togglePlasmaDiv.innerText = 'X';
  }
  else {
    togglePlasmaDiv.innerHTML = '&nbsp;';
  }
}

function toggleTheFlint() {
  theFlint = !theFlint;
  redrawPlayfield();

  if(theFlint) {
    toggleTheFlintDiv.innerText = 'X';
  }
  else {
    toggleTheFlintDiv.innerHTML = '&nbsp;';
  }
}

function toggleObservatory() {
  observatory = !observatory;
  redrawPlayfield();

  if(observatory) {
    toggleObservatoryDiv.innerText = 'X';
    consumables.style.display = 'block';
  }
  else {
    toggleObservatoryDiv.innerHTML = '&nbsp;';
    consumables.style.display = 'none';
  }
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

let cachedType = ['-1'];

const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

/*
breakdown info:
{
  cards: [],
  description: "",
  chips: 0,
  mult: 0,
}
*/

let breakdown = [];

function hasPair(cardsA) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(sortedCards.length >= 2) {
    if(sortedCards[0][0] === sortedCards[1][0]) {
      return true;
    }
    if(sortedCards.length >= 3) {
      if(sortedCards[1][0] === sortedCards[2][0]) {
        return true;
      }
      if(sortedCards.length >= 4) {
        if(sortedCards[2][0] === sortedCards[3][0]) {
          return true;
        }
        if(sortedCards.length >= 5 && sortedCards[3][0] === sortedCards[4][0]) {
          return true;
        }
      }
    }
  }

  return false;
}

function hasTwoPair(cardsA) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(sortedCards.length >= 4) {
    if(sortedCards[0][0] === sortedCards[1][0]) {
      if(sortedCards[2][0] === sortedCards[3][0]) {
        return true;
      }
      if(sortedCards.length >= 5 && sortedCards[3][0] === sortedCards[4][0]) {
        return true;
      }
    }
    if(sortedCards.length >= 5 && sortedCards[1][0] === sortedCards[2][0] && sortedCards[3][0] === sortedCards[4][0]) {
      return true;
    }
  }

  return false;
}

function hasThreeOfAKind(cardsA) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(sortedCards.length >= 3) {
    if(sortedCards[0][0] === sortedCards[1][0] && sortedCards[1][0] === sortedCards[2][0]) {
      return true;
    }
    if(sortedCards.length >= 4) {
      if(sortedCards[1][0] === sortedCards[2][0] && sortedCards[2][0] === sortedCards[3][0]) {
        return true;
      }
      if(sortedCards.length >= 5 && sortedCards[2][0] === sortedCards[3][0] && sortedCards[3][0] === sortedCards[4][0]) {
        return true;
      }
    }
  }

  return false;
}

function hasFourOfAKind(cardsA) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(sortedCards.length >= 4) {
    if(sortedCards[0][0] === sortedCards[3][0]) {
      return true;
    }
    if(sortedCards.length >= 5 && sortedCards[1][0] === sortedCards[4][0]) {
      return true;
    }
  }

  return false;
}

function hasStraight(cardsA, setFour = false, straightSkip = false) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  let straight = false;

  if(sortedCards.length >= (setFour ? 4 : 5)) {
    const lines = [
      [sortedCards[0]],
      [sortedCards[1]],
    ];
    if(setFour) {
      lines.push([sortedCards[2]]);
    }

    for(let i = 1; i < sortedCards.length; i++) {
      for(let l = 0; l < lines.length; l++) {
        const val = lines[l][lines[l].length - 1][0];
        if(sortedCards[i][0] + 1 === val) {
          lines.push([...lines[l], sortedCards[i]]);
        }
        else if(straightSkip && sortedCards[i][0] + 2 === val) {
          lines.push([...lines[l], sortedCards[i]]);
        }
      }
    }

    for(let i = 0; i < sortedCards.length; i++) {
      for(let l = 0; l < lines.length; l++) {
        const val = lines[l][lines[l].length - 1][0];
        if(val === 0 && sortedCards[i][0] === 12) {
          lines.push([...lines[l], sortedCards[i]]);
        }
        else if(straightSkip && val === 1 && sortedCards[i][0] === 12) {
          lines.push([...lines[l], sortedCards[i]]);
        }
      }
    }

    if(lines[lines.length - 1].length >= (setFour ? 4 : 5)) {
      straight = true;
    }
  }

  return straight;
}

function hasFlush(vampire, cardsA, setFour = false, smear = false) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: (playfieldCards[a].modifiers.wild && !vampire) ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));


  let flush = [];

  if(sortedCards.length >= (setFour ? 4 : 5)) {
    let flushes = [
      [],[],[],[]
    ];

    for(let c = 0; c < cards.length; c++) {
      const card = cards[c];
      for(let i = 0; i < 4; i++) {
        if(card.suit !== 'stone' && (card.suit === 'wild' || (smear ? card.suit % 2 == i : card.suit === i))) {
          flushes[i].push(card.id);
        }
      }
    }

    for(let i = 0; i < flushes.length; i++) {
      if(flushes[i].length > flush.length) {
        flush = flushes[i];
      }
    }
  }

  return flush.length >= (setFour ? 4 : 5);
}

function getTypeOfHand(vampire, cardsA, setFour = false, straightSkip = false, smear = false) {
  const cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: a,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: a,
      suit: (playfieldCards[a].modifiers.wild && !vampire) ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  const sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(cachedType[0] === sortedCards.toString()) {
    return cachedType[1];
  }

  cachedType[0] = sortedCards.toString();

  let flush = [];

  let straight = false;

  if(sortedCards.length >= (setFour ? 4 : 5)) {
    const lines = [
      [sortedCards[0]],
      [sortedCards[1]],
    ];
    if(setFour) {
      lines.push([sortedCards[2]]);
    }

    for(let i = 1; i < sortedCards.length; i++) {
      for(let l = 0; l < lines.length; l++) {
        const val = lines[l][lines[l].length - 1][0];
        if(sortedCards[i][0] + 1 === val) {
          lines.push([...lines[l], sortedCards[i]]);
        }
        else if(straightSkip && sortedCards[i][0] + 2 === val) {
          lines.push([...lines[l], sortedCards[i]]);
        }
      }
    }

    for(let i = 0; i < sortedCards.length; i++) {
      for(let l = 0; l < lines.length; l++) {
        const val = lines[l][lines[l].length - 1][0];
        if(val === 0 && sortedCards[i][0] === 12) {
          lines.push([...lines[l], sortedCards[i]]);
        }
        else if(straightSkip && val === 1 && sortedCards[i][0] === 12) {
          lines.push([...lines[l], sortedCards[i]]);
        }
      }
    }

    let flushes = [
      [],[],[],[]
    ];

    for(let c = 0; c < cards.length; c++) {
      const card = cards[c];
      for(let i = 0; i < 4; i++) {
        if(card.suit !== 'stone' && (card.suit === 'wild' || (smear ? card.suit % 2 == i : card.suit === i))) {
          flushes[i].push(card.id);
        }
      }
    }

    for(let i = 0; i < flushes.length; i++) {
      if(flushes[i].length > flush.length) {
        flush = flushes[i];
      }
    }

    if(lines[lines.length - 1].length >= (setFour ? 4 : 5)) {
      straight = lines[lines.length - 1].map(a => a[1]);
    }
  }

  if(flush.length < (setFour ? 4 : 5)) flush = false;

  // flush five
  if(flush && sortedCards.length === 5 && sortedCards[0][0] === sortedCards[4][0]) {
    return [0, cardsA];
  }

  // flush house
  if(flush && sortedCards.length === 5 && sortedCards[0][0] === sortedCards[1][0] && sortedCards[3][0] === sortedCards[4][0] && (sortedCards[1][0] === sortedCards[2][0] || sortedCards[2][0] === sortedCards[3][0])) {
    return [1, cardsA];
  }

  // five of a kind
  if(sortedCards.length === 5 && sortedCards[0][0] === sortedCards[4][0]) {
    return [2, cardsA];
  }

  // straight flush
  if(straight && flush) {
    return [3, [...new Set([...straight, ...flush])]];
  }

  // four of a kind
  if(sortedCards.length >= 4) {
    if(sortedCards[0][0] === sortedCards[3][0]) {
      return [4, [
        sortedCards[0][1],
        sortedCards[1][1],
        sortedCards[2][1],
        sortedCards[3][1],
      ]];
    }
    if(sortedCards.length >= 5 && sortedCards[1][0] === sortedCards[4][0]) {
      return [4, [
        sortedCards[1][1],
        sortedCards[2][1],
        sortedCards[3][1],
        sortedCards[4][1],
      ]];
    }
  }

  // full house
  if(sortedCards.length === 5 && sortedCards[0][0] === sortedCards[1][0] && sortedCards[3][0] === sortedCards[4][0] && (sortedCards[1][0] === sortedCards[2][0] || sortedCards[2][0] === sortedCards[3][0])) {
    return [5, cardsA];
  }

  // flush
  if(flush) {
    return [6, flush];
  }

  // straight
  if(straight) {
    return [7, straight];
  }

  // three of a kind
  if(sortedCards.length >= 3) {
    if(sortedCards[0][0] === sortedCards[1][0] && sortedCards[1][0] === sortedCards[2][0]) {
      return [8, [sortedCards[0][1], sortedCards[1][1], sortedCards[2][1]]];
    }
    if(sortedCards.length >= 4) {
      if(sortedCards[1][0] === sortedCards[2][0] && sortedCards[2][0] === sortedCards[3][0]) {
        return [8, [sortedCards[1][1], sortedCards[2][1], sortedCards[3][1]]];
      }
      if(sortedCards.length >= 5 && sortedCards[2][0] === sortedCards[3][0] && sortedCards[3][0] === sortedCards[4][0]) {
        return [8, [sortedCards[2][1], sortedCards[3][1], sortedCards[4][1]]];
      }
    }
  }

  // two pair
  if(sortedCards.length >= 4) {
    if(sortedCards[0][0] === sortedCards[1][0]) {
      if(sortedCards[2][0] === sortedCards[3][0]) {
        return [9, [sortedCards[0][1], sortedCards[1][1], sortedCards[2][1], sortedCards[3][1]]];
      }
      if(sortedCards.length >= 5 && sortedCards[3][0] === sortedCards[4][0]) {
        return [9, [sortedCards[0][1], sortedCards[1][1], sortedCards[3][1], sortedCards[4][1]]];
      }
    }
    if(sortedCards.length >= 5 && sortedCards[1][0] === sortedCards[2][0] && sortedCards[3][0] === sortedCards[4][0]) {
      return [9, [sortedCards[1][1], sortedCards[2][1], sortedCards[3][1], sortedCards[4][1]]];
    }
  }

  // pair
  if(sortedCards.length >= 2) {
    if(sortedCards[0][0] === sortedCards[1][0]) {
      return [10, [sortedCards[0][1], sortedCards[1][1]]];
    }
    if(sortedCards.length >= 3) {
      if(sortedCards[1][0] === sortedCards[2][0]) {
        return [10, [sortedCards[1][1], sortedCards[2][1]]];
      }
      if(sortedCards.length >= 4) {
        if(sortedCards[2][0] === sortedCards[3][0]) {
          return [10, [sortedCards[2][1], sortedCards[3][1]]];
        }
        if(sortedCards.length >= 5 && sortedCards[3][0] === sortedCards[4][0]) {
          return [10, [sortedCards[3][1], sortedCards[4][1]]];
        }
      }
    }
  }

  // none
  if(sortedCards.length === 0) {
    return [11, []];
  }

  // high-card
  return [11, [sortedCards[0][1]]];
}

function triggerCard(triggering, card, cards, jokers, score, retrigger = false, allFaces = false, vampire = false, bd, triggerer = false, stage = false) {
  if(!triggering) {
    if(playfieldCards[card].modifiers.disabled) {
      return;
    }
    if(playfieldCards[card].modifiers.stone) {
      score.minChips += 50;
      score.maxChips += 50;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${chipc}+50${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }
    else if(playfieldCards[card].type[1] === 12) {
      score.minChips += 11;
      score.maxChips += 11;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${chipc}+11${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }
    else {
      score.minChips += cardValues[playfieldCards[card].type[1]];
      score.maxChips += cardValues[playfieldCards[card].type[1]];

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${chipc}+${cardValues[playfieldCards[card].type[1]]}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }

    if(playfieldCards[card].modifiers.mult && !vampire) {
      score.minMult += 4;
      score.maxMult += 4;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${multc}+4${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
    else if(playfieldCards[card].modifiers.increment && !vampire) {
      score.minChips += 30;
      score.maxChips += 30;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${chipc}+30${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
    else if(playfieldCards[card].modifiers.glass && !vampire) {
      score.minMult *= 2;
      score.maxMult *= 2;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${prodc}2${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
    else if(playfieldCards[card].modifiers.chance && !vampire) {
      score.maxMult += 5;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `Lucky?`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }

    if(playfieldCards[card].modifiers.foil) {
      score.minChips += 50;
      score.maxChips += 50;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${chipc}+50${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
    else if(playfieldCards[card].modifiers.holographic) {
      score.minMult += 10;
      score.maxMult += 10;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${multc}+10${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
    else if(playfieldCards[card].modifiers.polychrome) {
      score.minMult *= 1.5;
      score.maxMult *= 1.5;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${prodc}1.5${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult,
          modifier: true
        });
      }
    }
  }

  const isFace = allFaces || (!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] >= 9 && playfieldCards[card].type[1] <= 11);

  // score joker on card
  for(let j = 0; j < jokers.length; j++) {
    const joker = jokers[j];
    if(playfieldJokers[joker].modifiers.disabled) continue;
    if(stage === 2) break;
    if(triggering && joker !== triggering) {
      continue;
    }
    switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '1,6':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 2 || (playfieldCards[card].modifiers.wild && !vampire))) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '1,7':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 0 || (playfieldCards[card].modifiers.wild && !vampire))) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '1,8':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 3 || (playfieldCards[card].modifiers.wild && !vampire))) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '1,9':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 1 || (playfieldCards[card].modifiers.wild && !vampire))) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '3,0':
        if(!triggerer) {
          if(jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, allFaces, vampire, bd, joker, 1);
          }
        }
        else {
          if(triggerer !== joker && jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, allFaces, vampire, bd, triggerer, 1);
          }
        }
        break;
      case '3,2':
        if(isFace) {
          score.minChips += 30;
          score.maxChips += 30;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${chipc}+30${endc} Chips`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '3,8':
        if(!playfieldCards[card].modifiers.stone && [8, 6, 4, 2, 0].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '3,9':
        if(!playfieldCards[card].modifiers.stone && [12, 7, 5, 3, 1].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minChips += 30;
          score.maxChips += 30;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${chipc}+30${endc} Chips`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '4,0':
        if(!triggering && !playfieldCards[card].modifiers.stone && [0].indexOf(playfieldCards[card].type[1]) >= 0) {
          playfieldJokers[joker].extraValue++;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Gain ${chipc}+4${endc} Chips`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '5,1':
        if(!playfieldCards[card].modifiers.stone && [0, 1, 3, 6, 12].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minMult += 8;
          score.maxMult += 8;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+8${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '6,3':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] === 12) {
          score.minChips += 20;
          score.maxChips += 20;
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${chipc}+20${endc} ${multc}+4${endc} Chips Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '7,7':
        if(!triggerer && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, retrigger, allFaces, vampire, bd, joker, 1);
        }
        else if(triggerer !== joker && triggerer !== jokers[0] && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, retrigger, allFaces, vampire, bd, triggerer, 1);
        }
        break;
      case '7,6':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === Math.abs(playfieldJokers[joker].value) % 4 && playfieldCards[card].type[1] === Math.floor(Math.abs(playfieldJokers[joker].value)/4) % 13) {
          score.minMult *= 2;
          score.maxMult *= 2;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${prodc}2${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '8,0':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === 0) {
          score.maxMult *= 2;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${probc}1 in 3${endc} chance for ${prodc}2${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '8,1':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === 3) {
          score.minChips += 50;
          score.maxChips += 50;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${chipc}+50${endc} Chips`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '8,2':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === 1) {
          score.minMult += 8;
          score.maxMult += 8;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+8${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '8,4':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[1] === 10 || playfieldCards[card].type[1] === 11)) {
          score.minMult *= 2;
          score.maxMult *= 2;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${prodc}2${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '13,2':
        if(isFace && playfieldJokers[joker].extraValue === 0) {
          score.minMult *= 2;
          score.maxMult *= 2;
          playfieldJokers[joker].extraValue = 1;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${prodc}2${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '14,5':
        if(!vampire && !playfieldCards[card].modifiers.stone && playfieldCards[card].modifiers.chance) {
          playfieldJokers[joker].extraValue++;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Gain ${prodc}0.2${endc} if ${numc}Lucky${endc} Mult triggers`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '14,7':
        if(!triggering && !vampire && !playfieldCards[card].modifiers.stone && playfieldCards[card].modifiers.chance) {
          playfieldJokers[joker].extraValue += 40;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Gain ${chipc}+40${endc} if ${numc}Lucky${endc} Chips triggers`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '15,6':
        if(isFace) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '15,7':
        if(playfieldCards[card].type[0] === Math.abs(playfieldJokers[joker].value) % 4) {
          score.minMult *= 1.5;
          score.maxMult *= 1.5;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${prodc}1.5${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '15,8':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[1] === 2 || playfieldCards[card].type[1] === 8)) {
          score.minChips += 10;
          score.maxChips += 10;
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `${chipc}+10${endc} ${multc}+4${endc} Chips Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
    }
  }

  // retriggers
  if(!triggering && !retrigger && playfieldCards[card].modifiers.double) {
    if(bd) {
      breakdown.push({
        cards: [card],
        description: `Retrigger`,
        chips: score.minChips,
        mult: score.minMult,
        retrigger: true
      });
    }

    triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
  }

  for(let j = 0; j < jokers.length; j++) {
    const joker = jokers[j];
    if(playfieldJokers[joker].modifiers.disabled) continue;
    if(stage === 1) break;
    if(triggering && joker !== triggering) {
      continue;
    }
    switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '1,3':
        if(!retrigger && isFace) {
          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '2,5':
        if(!retrigger && !playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] < 4) {

          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }
          triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '3,0':
        if(!triggerer) {
          if(jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, allFaces, vampire, bd, joker, 2);
          }
        }
        else {
          if(triggerer !== joker && jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, allFaces, vampire, bd, triggerer, 2);
          }
        }
        break;
      case '6,9':
        if(!retrigger && cards.indexOf(card) === 0) {
          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '7,4':
        if(!retrigger && playfieldJokers[joker].value) {
          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '7,7':
        if(!triggerer && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, retrigger, allFaces, vampire, bd, joker, 2);
        }
        else if(triggerer !== joker && triggerer !== jokers[0] && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, retrigger, allFaces, vampire, bd, triggerer, 2);
        }
        break;
      case '15,3':
        if(!retrigger) {
          if(bd) {
            breakdown.push({
              cards: [card, triggerer ? triggerer : joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(false, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
    }
  }
}

function triggerBaseball(uncommonJoker, cards, jokers, score, retrigger = false, triggerer = false, bd = false) {
  for(let j = 0; j < jokers.length; j++) {
    const joker = jokers[j];
    if(playfieldJokers[joker].modifiers.disabled) continue;
    if(retrigger && retrigger !== joker) continue;

    switch(playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '3,0':
        if(!triggerer) {
          if(jokers.indexOf(joker) < jokers.length - 1) {
            triggerBaseball(uncommonJoker, cards, jokers, score, jokers[jokers.indexOf(joker) + 1], joker, bd);
          }
        }
        else {
          if(triggerer !== joker && jokers.indexOf(joker) < jokers.length - 1) {
            triggerBaseball(uncommonJoker, cards, jokers, score, jokers[jokers.indexOf(joker) + 1], triggerer, bd);
          }
        }
        break;
      case '7,7':
        if(!triggerer && joker !== jokers[0]) {
          triggerBaseball(uncommonJoker, cards, jokers, score, jokers[0], joker, bd);
        }
        else if(triggerer !== joker && triggerer !== jokers[0] && joker !== jokers[0]) {
          triggerBaseball(uncommonJoker, cards, jokers, score, jokers[0], triggerer, bd);
        }
        break;
      case '14,6':
        score.minMult *= 1.5;
        score.maxMult *= 1.5;

        if(bd) {
          breakdown.push({
            cards: [triggerer ? triggerer : joker, uncommonJoker],
            description: `${prodc}1.5${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
        break;
    }
  }
}

function triggerJoker(baseball, joker, cards, jokers, score, setFour = false, straightSkip = false, allFaces = false, smear = false, retrigger = false, vampire = false, bd) {
  if(playfieldJokers[joker].modifiers.disabled) return;
  let heart = false;
  let diamond = false;
  let club = false;
  let spade = false;
  let nonClub = false;
  let wild = 0;
  let faces = 0;

  for(let c = 0; c < cards.length; c++) {
    const card = cards[c];
    if(!playfieldCards[card].modifiers.stone && !playfieldCards[card].modifiers.disabled) {
      if(playfieldCards[card].modifiers.wild && !vampire) {
        wild++;
      }
      if(playfieldCards[card].type[0] === 1) {
        club = true;
      }
      else {
        nonClub = true;
      }
      if(playfieldCards[card].type[0] === 0) {
        heart = true;
      }
      else if(playfieldCards[card].type[0] === 2) {
        diamond = true;
      }
      else if(playfieldCards[card].type[0] === 3) {
        spade = true;
      }

      if(allFaces || (playfieldCards[card].type[1] >= 9 && playfieldCards[card].type[1] <= 11)) {
        faces++;
      }
    }
  }

  if(!retrigger && playfieldJokers[joker].modifiers.foil) {
    score.minChips += 50;
    score.maxChips += 50;

    if(bd) {
      breakdown.push({
        cards: [retrigger ? retrigger : joker],
        description: `${chipc}+50${endc} Chips`,
        chips: score.minChips,
        mult: score.minMult,
        modifier: true
      });
    }
  }
  else if(!retrigger && playfieldJokers[joker].modifiers.holographic) {
    score.minMult += 10;
    score.maxMult += 10;

    if(bd) {
      breakdown.push({
        cards: [retrigger ? retrigger : joker],
        description: `${multc}+10${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult,
        modifier: true
      });
    }
  }

  switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
    case '0,0':
      score.minMult += 4;
      score.maxMult += 4;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+4${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '0,2':
      if(hasPair(cards)) {
        score.minMult += 8;
        score.maxMult += 8;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+8${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,3':
      if(hasThreeOfAKind(cards)) {
        score.minMult += 12;
        score.maxMult += 12;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+12${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,4':
      if(hasFourOfAKind(cards)) {
        score.minMult += 20;
        score.maxMult += 20;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+20${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,5':
      if(hasStraight(cards, setFour, straightSkip)) {
        score.minMult += 12;
        score.maxMult += 12;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+12${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,6':
      if(hasFlush(vampire, cards, setFour, smear)) {
        score.minMult += 10;
        score.maxMult += 10;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+10${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,7':
      if(cards.length <= 3) {
        score.minMult += 20;
        score.maxMult += 20;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+20${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,9':
      score.minChips += 25 * playfieldJokers[joker].value;
      score.maxChips += 25 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${25 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '1,2':
      if(playfieldJokers[joker].value) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '2,1':
      score.minChips += 40 * playfieldJokers[joker].value;
      score.maxChips += 40 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${40 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '2,2':
      if(playfieldJokers[joker].value) {
        score.minMult += 15;
        score.maxMult += 15;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+15${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '2,4':
      if(playfieldJokers[joker].value === 0) {
        score.minMult *= 4;
        score.maxMult *= 4;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+4${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '2,6':
      if(playfieldJokers[joker].value === 0) {
        score.maxMult += 23;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+0${endc} - ${multc}+23${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '2,7':
      score.minMult *= 1 + 0.25 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.25 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '3,0':
      if(!retrigger) {
        if(jokers.indexOf(joker) < jokers.length - 1) {
          triggerJoker(baseball, jokers[jokers.indexOf(joker) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, joker, vampire, bd);
        }
      }
      else {
        if(retrigger !== joker && jokers.indexOf(joker) < jokers.length - 1) {
          triggerJoker(baseball, jokers[jokers.indexOf(joker) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, retrigger, vampire, bd);
        }
      }
      break;
    case '3,1':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '3,3':
      score.minMult += 3 * playfieldJokers[joker].value;
      score.maxMult += 3 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${3 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '4,0':
      score.minChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));
      score.maxChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue))}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '4,2':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '4,4':
      if((club && nonClub) || (wild >= 2) || (wild === 1 && (club || nonClub))) {
        score.minMult *= 2;
        score.maxMult *= 2;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}2${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,5':
      if(hasPair(cards)) {
        score.minMult *= 2;
        score.maxMult *= 2;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}2${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,6':
      if(hasThreeOfAKind(cards)) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,7':
      if(hasFourOfAKind(cards)) {
        score.minMult *= 4;
        score.maxMult *= 4;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}4${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,8':
      if(hasStraight(cards, setFour, straightSkip)) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,9':
      if(hasFlush(vampire, cards, setFour, smear)) {
        score.minMult *= 2;
        score.maxMult *= 2;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}2${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '5,2':
      score.minMult *= 1 + playfieldJokers[joker].value;
      score.maxMult *= 1 + playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '5,5':
      score.minMult += 2 * playfieldJokers[joker].value;
      score.maxMult += 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '5,7':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '5,8':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '5,9':
      let val = 0;
      let index = jokers.indexOf(joker);
      for(let i = 0; i < index; i++) {
        val += playfieldJokers[jokers[i]].sell;
      }

      score.minMult += val;
      score.maxMult += val;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${val}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '6,0':
      if((heart?1:0)+(diamond?1:0)+(club?1:0)+(spade?1:0)+wild >= 4) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '6,1':
      if(faces === 0) {
        score.minMult += 1 + playfieldJokers[joker].value;
        score.maxMult += 1 + playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+${1 + playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '6,7':
      score.minMult += 15;
      score.maxMult += 15;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+15${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '6,8':
      score.minChips += 300;
      score.maxChips += 300;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+300${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '7,0':
      if(playfieldJokers[joker].value >= 16) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '7,5':
      score.minMult *= 1 + 0.25 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.25 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '7,7':
      if(!retrigger && joker !== jokers[0]) {
        triggerJoker(baseball, jokers[0], cards, jokers, score, setFour, straightSkip, allFaces, smear, joker, vampire, bd);
      }
      else if(retrigger !== joker && retrigger !== jokers[0] && joker !== jokers[0]) {
        triggerJoker(baseball, jokers[0], cards, jokers, score, setFour, straightSkip, allFaces, smear, retrigger, vampire, bd);
      }
      break;
    case '8,3':
      score.minMult *= 1 + playfieldJokers[joker].value + playfieldJokers[joker].extraValue;
      score.maxMult *= 1 + playfieldJokers[joker].value + playfieldJokers[joker].extraValue;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + playfieldJokers[joker].value + playfieldJokers[joker].extraValue}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '8,5':
      if(playfieldJokers[joker].value <= 0) {
        score.minMult *= 5;
        score.maxMult *= 5;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}5${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '8,9':
      score.minMult += 2 * playfieldJokers[joker].value;
      score.maxMult += 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '10,2':
      let allBlack = true;
      for(let card in playfieldCards) {
        if(cards.indexOf(card) < 0 && (playfieldCards[card].modifiers.stone || ((!playfieldCards[card].modifiers.wild || vampire) && playfieldCards[card].type[0] % 2 === 0))) {
          allBlack = false;
          break;
        }
      }
      if(allBlack) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '10,3':
      if(hasStraight(cards, setFour, straightSkip)) {
        score.minChips += 30 + 10 * playfieldJokers[joker].value;
        score.maxChips += 30 + 10 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `Gain ${chipc}+10${endc}, ${chipc}${30 + 10 * playfieldJokers[joker].value}${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      else {
        score.minChips += 20 + 10 * playfieldJokers[joker].value;
        score.maxChips += 20 + 10 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '10,4':
      score.minChips += Math.max(0, 100 - 5 * playfieldJokers[joker].value);
      score.maxChips += Math.max(0, 100 - 5 * playfieldJokers[joker].value);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${Math.max(0, 100 - 5 * playfieldJokers[joker].value)}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '10,7':
      score.minChips += 104 + 2 * playfieldJokers[joker].value;
      score.maxChips += 104 + 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${104 + 2 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '10,9':
      score.minMult *= 1 + 0.1 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.1 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.1 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '11,2':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '11,5':
      score.minMult *= 3;
      score.maxMult *= 3;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}3${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '11,6':
      if(playfieldJokers[joker].value) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${prodc}3${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '11,7':
      score.minMult += 3 * playfieldJokers[joker].value;
      score.maxMult += 3 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${3 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '11,8':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '11,9':
      if(cards.length === 4) {
        score.minChips += 20 + 4 * playfieldJokers[joker].value;
        score.maxChips += 20 + 4 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+${20 + 4 * playfieldJokers[joker].value}${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      else {
        score.minChips += 16 + 4 * playfieldJokers[joker].value;
        score.maxChips += 16 + 4 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+${16 + 4 * playfieldJokers[joker].value}${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '12,2':
      score.minMult *= (10 + 2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue)) / 10;
      score.maxMult *= (10 + 2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue)) / 10;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${(10 + 2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue)) / 10}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '12,4':
      score.minMult *= 1 + 0.25 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);
      score.maxMult *= 1 + 0.25 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '12,9':
      score.minMult *= 1 + 0.2 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '13,5':
      score.minMult += 4 * playfieldJokers[joker].value;
      score.maxMult += 4 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${4 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '14,0':
      if(hasPair(cards)) {
        score.minChips += 50;
        score.maxChips += 50;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+50${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '14,1':
      if(hasThreeOfAKind(cards)) {
        score.minChips += 100;
        score.maxChips += 100;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+100${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '14,2':
      if(hasFourOfAKind(cards)) {
        score.minChips += 150;
        score.maxChips += 150;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+150${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '14,3':
      if(hasStraight(cards, setFour, straightSkip)) {
        score.minChips += 100;
        score.maxChips += 100;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+100${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '14,4':
      if(hasFlush(vampire, cards, setFour, smear)) {
        score.minChips += 80;
        score.maxChips += 80;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${chipc}+80${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '14,5':
      score.minMult *= 1 + 0.2 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '14,7':
      score.minChips += 2 * Math.max(0, playfieldJokers[joker].value);
      score.maxChips += 2 * Math.max(0, playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${2 * Math.max(0, playfieldJokers[joker].value)}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '15,0':
      score.minMult += 2 * playfieldJokers[joker].value;
      score.maxMult += 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '15,1':
      score.minMult += Math.max(0, 20 - playfieldJokers[joker].value * 4);
      score.maxMult += Math.max(0, 20 - playfieldJokers[joker].value * 4);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${multc}+${Math.max(0, 20 - playfieldJokers[joker].value * 4)}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '15,2':
      score.minMult *= Math.max(0, 2 - 0.01 * playfieldJokers[joker].value);
      score.maxMult *= Math.max(0, 2 - 0.01 * playfieldJokers[joker].value);

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${Math.max(0, 2 - 0.01 * playfieldJokers[joker].value)}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '15,4':
      if(hasTwoPair(cards)) {
        score.minMult += 2 * playfieldJokers[joker].value;
        score.maxMult += 2 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [retrigger ? retrigger : joker],
            description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      else {
        score.minMult += 2 + 2 * playfieldJokers[joker].value;
        score.maxMult += 2 + 2 * playfieldJokers[joker].value;
      }
      break;
    case '15,5':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '15,9':
      score.minChips += 3 * playfieldJokers[joker].value;
      score.maxChips += 3 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [retrigger ? retrigger : joker],
          description: `${chipc}+${3 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
  }

  if(!retrigger && playfieldJokers[joker].modifiers.polychrome) {
    score.minMult *= 1.5;
    score.maxMult *= 1.5;

    if(bd) {
      breakdown.push({
        cards: [retrigger ? retrigger : joker],
        description: `${prodc}1.5${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult,
        modifier: true
      });
    }
  }

  if(!retrigger && baseball) {
    if(jokerRarity[playfieldJokers[joker].type[0]][playfieldJokers[joker].type[1]] === 1) {
      triggerBaseball(joker, cards, jokers, score, false, false, bd);
    }
  }
}

function triggerCardInHand(triggering, card, cards, jokers, score, retrigger, bd, triggerer = false, phase = 0) {
  // apply steel cards
  if(!triggering && !playfieldCards[card].modifiers.disabled && playfieldCards[card].modifiers.steel && cards.indexOf(card) < 0) {
    score.minMult *= 1.5;
    score.maxMult *= 1.5;

    if(bd) {
      breakdown.push({
        cards: triggerer ? [triggerer, card] : [card],
        description: `${prodc}1.5${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult,
        modifier: true
      });
    }
  }

  if(!triggering || phase === 0) {
    for(let j = 0; j < jokers.length; j++) {
      const joker = jokers[j];
      if(playfieldJokers[joker].modifiers.disabled) continue;
      if(triggering && joker !== triggering) continue;
      switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
        case '2,8':
          let lowest = 100;
          let lowestCards = [cards[0]];
          for(let card in playfieldCards) {
            if(!playfieldCards[card].modifiers.stone && cards.indexOf(card) < 0) {
              if(lowest > cardValues[playfieldCards[card].type[1]]) {
                lowest = cardValues[playfieldCards[card].type[1]];
                lowestCards = [card];
              }
              else if(lowest === cardValues[playfieldCards[card].type[1]]) {
                lowestCards.push(card);
              }
            }
          }
          let index = 0;
          let highScore = 0;
          for(let i = 0; i < lowestCards.length; i++) {
            const card = lowestCards[i];
            if(!playfieldCards[card].modifiers.disabled) {
              let thisScore = 1;
              if(playfieldCards[card].modifiers.steel) {
                thisScore += 2;
              }
              if(playfieldCards[card].modifiers.double) {
                thisScore += 4;
              }
              if(thisScore > highScore) {
                highScore = thisScore;
                index = i;
              }
            }
          }

          if(lowest > 0 && lowest < 100 && lowestCards[index] === card) {
            score.minMult += lowest * 2;
            score.maxMult += lowest * 2;

            if(bd) {
              breakdown.push({
                cards: [triggerer ? triggerer : joker, card],
                description: `${multc}+${lowest * 2}${endc} Mult`,
                chips: score.minChips,
                mult: score.minMult
              });
            }
          }
          break;
        case '3,0':
          if(!triggerer) {
            if(jokers.indexOf(joker) < jokers.length - 1) {
              triggerCardInHand(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, bd, joker);
            }
          }
          else {
            if(triggerer !== joker && jokers.indexOf(joker) < jokers.length - 1) {
              triggerCardInHand(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, bd, triggerer);
            }
          }
          break;
        case '6,2':
          if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] === 10) {
            score.minMult += 13;
            score.maxMult += 13;

            if(bd) {
              breakdown.push({
                cards: [triggerer ? triggerer : joker, card],
                description: `${multc}+${13}${endc} Mult`,
                chips: score.minChips,
                mult: score.minMult
              });
            }
          }
          break;
        case '7,7':
          if(!triggerer && joker !== jokers[0]) {
            triggerCardInHand(jokers[0], card, cards, jokers, score, retrigger, bd, joker);
          }
          else if(triggerer !== joker && triggerer !== jokers[0] && joker !== jokers[0]) {
            triggerCardInHand(jokers[0], card, cards, jokers, score, retrigger, bd, triggerer);
          }
          break;
        case '12,6':
          if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] === 11) {
            score.minMult *= 1.5;
            score.maxMult *= 1.5;

            if(bd) {
              breakdown.push({
                cards: [triggerer ? triggerer : joker, card],
                description: `${prodc}${1.5}${endc} Mult`,
                chips: score.minChips,
                mult: score.minMult
              });
            }
          }
          break;
      }
    }
  }

  if(!triggering || phase === 1) {
    for(let j = 0; j < jokers.length; j++) {
      const joker = jokers[j];
      if(playfieldJokers[joker].modifiers.disabled) continue;
      if(triggering && joker !== triggering) continue;
      switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
        case '1,4':
          if(!retrigger) {
            triggerCardInHand(false, card, cards, jokers, score, true, bd, false, 1);
          }
          break;
        case '3,0':
          if(!triggerer) {
            if(jokers.indexOf(joker) < jokers.length - 1) {
              triggerCardInHand(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, bd, joker, 1);
            }
          }
          else {
            if(triggerer !== joker && jokers.indexOf(joker) < jokers.length - 1) {
              triggerCardInHand(jokers[jokers.indexOf(joker) + 1], card, cards, jokers, score, retrigger, bd, triggerer, 1);
            }
          }
          break;
        case '7,7':
          if(!triggerer && joker !== jokers[0]) {
            triggerCardInHand(jokers[0], card, cards, jokers, score, retrigger, bd, joker, 1);
          }
          else if(triggerer !== joker && triggerer !== jokers[0] && joker !== jokers[0]) {
            triggerCardInHand(jokers[0], card, cards, jokers, score, retrigger, bd, triggerer, 1);
          }
          break;
      }
    }
  }

  if(!triggering && !retrigger && playfieldCards[card].modifiers.double) {
    triggerCardInHand(false, card, cards, jokers, score, true, bd, triggerer);
  }
}

function calculatePlayScore(cards, jokers, bd = false) {
  for(let j = 0; j < jokers.length; j++) {
    const joker = jokers[j];
    playfieldJokers[joker].extraValue = 0;
  }

  let score = {
    minChips: 1,
    maxChips: 1,
    minMult: 1,
    maxMult: 1
  };

  const setFour = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===6 && playfieldJokers[b].type[1]===6 && !playfieldJokers[b].modifiers.disabled), false);
  const straightSkip = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===12 && playfieldJokers[b].type[1]===3 && !playfieldJokers[b].modifiers.disabled), false);
  const allFaces = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===3 && playfieldJokers[b].type[1]===6 && !playfieldJokers[b].modifiers.disabled), false);
  const smear = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===6 && playfieldJokers[b].type[1]===4 && !playfieldJokers[b].modifiers.disabled), false);

  const scoreAll = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===10 && playfieldJokers[b].type[1]===6 && !playfieldJokers[b].modifiers.disabled), false);

  const vampire = Object.keys(playfieldJokers).reduce((a,b) => a || ((playfieldJokers[b].type[0]===12 && playfieldJokers[b].type[1]===2 && !playfieldJokers[b].modifiers.disabled) ? playfieldJokers[b] : false), false);
  const baseball = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===14 && playfieldJokers[b].type[1]===6 && !playfieldJokers[b].modifiers.disabled), false);

  const raisedFist = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0] === 2 && playfieldJokers[b].type[1] === 8 && !playfieldJokers[b].modifiers.disabled), false);

  const midas = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0] === 13 && playfieldJokers[b].type[1] === 0 && !playfieldJokers[b].modifiers.disabled), false);

  if(vampire) {
    const keys = [
      'mult',
      'increment',
      'glass',
      'chance',
      'foil',
      'wild',
      'steel'
    ];
    for(let c = 0; c < cards.length; c++) {
      const card = cards[c];
      if((midas && playfieldCards[card].type[1] >= 8 && playfieldCards[card].type[1] <= 10) || (midas && allFaces)) {
        vampire.extraValue++;
        if(bd) {
          breakdown.push({
            cards: [vampire.id, card],
            description: `Remove Midas ${numc}Gold${endc}, Vampire gains ${prodc}0.2${endc} Mult`,
            chips: 0,
            mult: 0,
          });
        }
      }
      else {
        for(let k = 0; k < keys.length; k++) {
          const key = keys[k];
          if(playfieldCards[card].modifiers[key]) {
            vampire.extraValue++;
            if(bd) {
              breakdown.push({
                cards: [vampire.id, card],
                description: `Remove ${numc}Enhancement${endc}, Vampire gains ${prodc}0.2${endc} Mult`,
                chips: 0,
                mult: 0,
              });
            }
            break;
          }
        }
      }
    }
  }

  // figure out type of hand
  cachedType[1] = getTypeOfHand(vampire, cards, setFour, straightSkip, smear);

  const [typeOfHand, involvedCards] = cachedType[1];

  if(typeOfHand >= 0) {
    score.minChips = hands[typeOfHand].chips;
    score.maxChips = score.minChips;
    score.minMult = hands[typeOfHand].mult;
    score.maxMult = score.minMult;

    if(bd) {
      breakdown.push({
        cards: involvedCards,
        description: hands[typeOfHand].name,
        chips: score.minChips,
        mult: score.minMult,
        newCard: true
      });
    }

    if(theFlint) {
      score.minChips /= 2;
      score.maxChips /= 2;
      score.minMult /= 2;
      score.maxMult /= 2;

      if(bd) {
        breakdown.push({
          cards: involvedCards,
          description: `The Flint`,
          chips: score.minChips,
          mult: score.minMult,
          newCard: true
        });
      }
    }
  }

  for(let c = 0; c < cards.length; c++) {
    const card = cards[c];
    // score card
    if(scoreAll || involvedCards.indexOf(card) >= 0 || playfieldCards[card].modifiers.stone) {
      if(bd) {
        breakdown.push({
          cards: [card],
          description: playfieldCards[card].modifiers.stone ? 'Stone' : `${rankNames[playfieldCards[card].type[1]]} of ${suitNames[playfieldCards[card].type[0]]}`,
          chips: score.minChips,
          mult: score.minMult,
          newCard: true
        });
      }
      triggerCard(false, card, cards, jokers, score, false, allFaces, vampire, bd);
    }
  }

  // trigger cards in hand
  let cardsInHand = [];
  let lowestCards = [];

  for(let id of Object.keys(playfieldCards).sort().reverse()) {
    if(involvedCards.indexOf(id) >= 0) continue;
    if(id.indexOf('99') !== 0) continue;
    cardsInHand.push(id);
  }

  if(raisedFist) {
    let ignoreCard = -1;

    let lowest = 100;
    for(let card in playfieldCards) {
      if(!playfieldCards[card].modifiers.stone && involvedCards.indexOf(card) < 0) {
        if(lowest > cardValues[playfieldCards[card].type[1]]) {
          lowest = cardValues[playfieldCards[card].type[1]];
          lowestCards = [card];
        }
        else if(lowest === cardValues[playfieldCards[card].type[1]]) {
          lowestCards.push(card);
        }
      }
    }

    let index = 0;
    let highScore = 0;
    for(let i = 0; i < lowestCards.length; i++) {
      const card = lowestCards[i];
      if(!playfieldCards[card].modifiers.disabled) {
        let thisScore = 1;
        if(playfieldCards[card].modifiers.steel) {
          thisScore += 2;
        }
        if(playfieldCards[card].modifiers.double) {
          thisScore += 4;
        }
        if(thisScore > highScore) {
          highScore = thisScore;
          index = i;
        }
      }
    }

    if(lowest > 0 && lowest < 100) {
      ignoreCard = lowestCards[index];

      for(let id of Object.keys(playfieldCards).sort().reverse()) {
        if(lowestCards.indexOf(id) < 0) continue;
        if(id === ignoreCard) continue;
        cardsInHand.push(id);
      }

      cardsInHand.push(ignoreCard);
    }
  }

  for(let id of Object.keys(playfieldCards).sort().reverse()) {
    if(involvedCards.indexOf(id) >= 0) continue;
    if(lowestCards.indexOf(id) >= 0) continue;
    if(id.indexOf('99') === 0) continue;
    cardsInHand.push(id);
  }

  for(let c = 0; c < cardsInHand.length; c++) {
    const card = cardsInHand[c];
    if(cards.indexOf(card) < 0) {
      triggerCardInHand(false, card, cards, jokers, score, false, bd);
    }
  }

  // score joker
  for(let j = 0; j < jokers.length; j++) {
    const joker = jokers[j];
    triggerJoker(baseball, joker, cards, jokers, score, setFour, straightSkip, allFaces, smear, false, vampire, bd);
  }

  // observatory
  if(observatory) {
    const observatoryScore = hands[typeOfHand].planets;
    score.minMult *= 1.5 ** observatoryScore;
    score.maxMult *= 1.5 ** observatoryScore;

    if(bd && observatoryScore > 0) {
      breakdown.push({
        cards: [],
        description: `Observatory: ${prodc}${numberWithCommas(1.5 ** observatoryScore)}${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult,
        modifier: true
      });
    }
  }

  if(score.minChips < 1) {
    score.minChips = 1;
  }
  if(score.minMult < 1) {
    score.minMult = 1;
  }
  if(score.maxChips < 1) {
    score.maxChips = 1;
  }
  if(score.maxMult < 1) {
    score.maxMult = 1;
  }

  if(plasmaDeck) {
    if(bd) {
      breakdown.push({
        cards: [],
        description: `Plasma Deck: Balance`,
        chips: (score.minChips + score.minMult) / 2,
        mult: (score.minChips + score.minMult) / 2
      });
    }
    return [Math.floor(((score.minChips+score.minMult)/2)**2), Math.floor(((score.maxChips+score.maxMult)/2)**2), score.minChips, score.minMult, typeOfHand];
  }
  else {
    return [Math.floor(score.minChips*score.minMult), Math.floor(score.maxChips*score.maxMult), score.minChips, score.minMult, typeOfHand];
  }
}

function calculator() {
  let cards = Object.keys(playfieldCards);
  let possibleHands = [];
  let chosen = [];
  let possibleJokers = [Object.keys(playfieldJokers)];
  if(optimizeJokers) {
    possibleJokers = permutations(Object.keys(playfieldJokers));
  }
  if(optimizeCards) {
    for(let i = 1; i < 6; i++) {
      let nextChosen = choose(cards, i);
      if(nextChosen.length > 0) {
        chosen = chosen.concat(nextChosen);
      }
    }
    for(let j = 0; j < chosen.length; j++) {
      possibleHands = possibleHands.concat(permutations(chosen[j]));
    }
    if(possibleHands.length === 0) {
      possibleHands = [[]];
    }
  }


  if(possibleJokers.length === 0) {
    possibleJokers = [[]];
  }

  if(possibleHands.length === 0) {
    for(let i = bestHand.length - 1; i >= 0; i--) {
      if(!playfieldCards.hasOwnProperty(bestHand[i])) {
        bestHand.splice(i, 1);
      }
    }

    possibleHands = [
      bestHand
    ];
  }

  let noHand = false;
  let bestScore = [0, 0, 0, 0, 0];
  bestHand = [];
  bestJokers = [];

  for(let i = 0; i < possibleHands.length; i++) {
    for(let j = 0; j < possibleJokers.length; j++) {
      const score = calculatePlayScore(possibleHands[i], possibleJokers[j]);

      if(score[0] > bestScore[0]) {
        bestScore = score;
        bestHand = possibleHands[i];
        bestJokers = possibleJokers[j];
      }
      else if(score[0] === bestScore[0]) {
        if(score[1] > bestScore[1]) {
          bestScore = score;
          bestHand = possibleHands[i];
          bestJokers = possibleJokers[j];
        }
      }
    }
  }

  if(bestScore[0] === bestScore[1]) {
    bestPlayScoreDiv.innerHTML = chipIcon + numberWithCommas(bestScore[0]);
    bestPlayNameDiv.innerHTML = hands[bestScore[4]].name + `<span class="nameLvl" style="color: ${hands[bestScore[4]].level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hands[bestScore[4]].level)/6)*6+hands[bestScore[4]].level+4)%6)+1]}"> lvl.${hands[bestScore[4]].level}</span>`;
    scoreChipsDiv.innerText = numberWithCommas(bestScore[2]);
    scoreMultDiv.innerText = numberWithCommas(bestScore[3]);
  }
  else {
    bestPlayScoreDiv.innerHTML = numberWithCommas(bestScore[0]) + ' &lt;' + chipIcon + '&lt; ' + numberWithCommas(bestScore[1]);
    bestPlayNameDiv.innerHTML = hands[bestScore[4]].name + `<span class="nameLvl" style="color: ${hands[bestScore[4]].level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hands[bestScore[4]].level)/6)*6+hands[bestScore[4]].level+4)%6)+1]}"> lvl.${hands[bestScore[4]].level}</span>`;
    scoreChipsDiv.innerText = '>' + numberWithCommas(bestScore[2]);
    scoreMultDiv.innerText = '>' + numberWithCommas(bestScore[3]);
  }

  breakdown = [];
  const b = calculatePlayScore(bestHand, bestJokers, true);

  breakdownHTML = '';
  let previousChips = 0;
  let previousMult = 0;
  for(let line of breakdown) {
    let breakdownScore = '<div class="levelStat" style="visibility: hidden;"><span id="scoreChips" class="levelStatB"></span>X<span id="scoreMult" class="levelStatR"></span></div>';
    let breakdownCards = '';
    for(let id of line.cards) {
      if(id[0] === 'j') {
        breakdownCards += `<div class='tooltip'><div class="playfieldCard" ${playfieldJokers[id].string}></div>` +
        `</div>`;
      }
      else {
        breakdownCards += `<div class="tooltip"><div class="playfieldCard" ${playfieldCards[id].string}></div>` +
        `</div>`;
      }
    }
    if(breakdownCards === '') {
      breakdownCards = '<div class="tooltip"></div>';
    }
    if(line.chips !== previousChips || line.mult !== previousMult) {
      breakdownScore = `<div class="levelStat">` +
        `<span id="scoreChips" class="levelStatB">${numberWithCommas(line.chips)}</span>X` +
        `<span id="scoreMult" class="levelStatR">${numberWithCommas(line.mult)}</span>` +
        `</div>`;
        previousChips = line.chips;
        previousMult = line.mult;
    }
    breakdownHTML += `<div class="breakdownLine"${line.hasOwnProperty('newCard') ? ' style="background-color: #fffa"' : (line.hasOwnProperty('retrigger') ? ' style="background-color: #fcc"' : (line.hasOwnProperty('modifier') ? ' style="background-color: #cdf"' : ''))}><div>` +
      breakdownCards +
      `</div><span>` +
      line.description +
      `</span>` +
      breakdownScore +
      `</div>`;
  }

  tabs[3].innerHTML = breakdownHTML;
}

function numberWithCommas(x) {
  if(x < 1e11) {
    if(x % 1 !== 0) {
      return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + (Math.floor(Math.round((x % 1) * 10000) / 10)+'').padStart(3, 0).replace(/0+$/, '');
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${Math.floor(x/(10**Math.floor(Math.log10(x)))*10000)/10000} X 10^${Math.floor(Math.log10(x))}`;
}
