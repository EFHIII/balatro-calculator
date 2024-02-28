let bestHand = [];
let bestJokers = [];

let bestPlayScoreDiv = document.getElementById('bestPlayScore');
let bestPlayNameDiv = document.getElementById('bestPlayName');
let scoreChipsDiv = document.getElementById('scoreChips');
let scoreMultDiv = document.getElementById('scoreMult');
const chipIcon = '<span class="chipIcon"></span>';

let optimizeJokers = true;
let optimizeCards = true;
let toggleJokerDiv = document.getElementById('toggleJokerBtn');
let toggleCardDiv = document.getElementById('toggleCardBtn');
let togglePlasmaDiv = document.getElementById('togglePlasmaBtn');

let plasmaDeck = false;

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

let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

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
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

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
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

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
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

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
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

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
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: playfieldCards[a].modifiers.wild ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  let straight = false;

  if(straightSkip) {
    if(setFour) {
      straight = (
        sortedCards.length >= 4 &&
        (sortedCards[0][0] === sortedCards[1][0]+1 || sortedCards[0][0] === sortedCards[1][0]+2) &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2)
      ) || (
        sortedCards.length >= 5 &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2) &&
        (sortedCards[3][0] === sortedCards[4][0]+1 || sortedCards[3][0] === sortedCards[4][0]+2)
      );
    }
    else {
      straight = (
        sortedCards.length >= 5 &&
        (sortedCards[0][0] === sortedCards[1][0]+1 || sortedCards[0][0] === sortedCards[1][0]+2) &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2) &&
        (sortedCards[3][0] === sortedCards[4][0]+1 || sortedCards[3][0] === sortedCards[4][0]+2)
      );
    }
  }
  else {
    if(setFour) {
      straight = (
        sortedCards.length >= 4 &&
        sortedCards[0][0] === sortedCards[1][0]+1 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1
      ) || (
        sortedCards.length >= 5 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1 &&
        sortedCards[3][0] === sortedCards[4][0]+1
      );
    }
    else {
      straight = (
        sortedCards.length >= 5 &&
        sortedCards[0][0] === sortedCards[1][0]+1 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1 &&
        sortedCards[3][0] === sortedCards[4][0]+1
      );
    }
  }


  return straight;
}

function hasFlush(vampire, cardsA, setFour = false, smear = false) {
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: (playfieldCards[a].modifiers.wild && !vampire) ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  let flush = false;
  if(smear) {
    flush = cards.reduce((b, a) => {
      return [
        (b[0] === 'wild' || b[0] === 'stone') ? (a.suit === 'stone' ? 'wild' : a.suit % 2) : b[0],
        b[1] + (b[0] === 'stone' ? 1 : (b[0] === 'wild' ? 0 : (b[0] === a.suit % 2 ? 0 : 1)))
      ]
    }, ['wild', 0]);
  }
  else {
    flush = cards.reduce((b, a) => {
      return [
        (b[0] === 'wild' || b[0] === 'stone') ? (a.suit === 'stone' ? 'wild' : a.suit) : b[0],
        b[1] + (b[0] === 'stone' ? 1 : (b[0] === 'wild' ? 0 : (b[0] === a.suit ? 0 : 1)))
      ]
    }, ['wild', 0]);
  }

  if(setFour) {
    flush = flush[0] !== 'stone' && flush[1] <= -4 + sortedCards.length;
  }
  else {
    flush = sortedCards.length >= 5 && flush[0] !== 'stone' && flush[1] === 0;
  }

  return flush;
}

function getTypeOfHand(vampire, cardsA, setFour = false, straightSkip = false, smear = false) {
  let cards = cardsA.slice().map(a => {
    if(playfieldCards[a].modifiers.stone) {
      return {
        id: playfieldCards[a].id,
        suit: 'stone',
        value: 'stone'
      };
    }
    return {
      id: playfieldCards[a].id,
      suit: (playfieldCards[a].modifiers.wild && !vampire) ? 'wild' : playfieldCards[a].type[0],
      value: playfieldCards[a].type[1]
    };
  });

  let sortedCards = cards.filter(a => a.value !== 'stone').map(a => [a.value, a.id]).sort((a, b) => (b[0] + b[1].length/1000) - (a[0]+a[1].length/1000));

  if(cachedType[0] === sortedCards.toString()) {
    return cachedType[1];
  }

  cachedType[0] = sortedCards.toString();

  let flush = false;
  if(smear) {
    flush = cards.reduce((b, a) => {
      return [
        (b[0] === 'wild' || b[0] === 'stone') ? (a.suit === 'stone' ? 'wild' : a.suit % 2) : b[0],
        b[1] + (b[0] === 'stone' ? 1 : (b[0] === 'wild' ? 0 : (b[0] === a.suit % 2 ? 0 : 1)))
      ]
    }, ['wild', 0]);
  }
  else {
    flush = cards.reduce((b, a) => {
      return [
        (b[0] === 'wild' || b[0] === 'stone') ? (a.suit === 'stone' ? 'wild' : a.suit) : b[0],
        b[1] + (b[0] === 'stone' ? 1 : (b[0] === 'wild' ? 0 : (b[0] === a.suit ? 0 : 1)))
      ]
    }, ['wild', 0]);
  }

  let straight = false;

  if(straightSkip) {
    if(setFour) {
      straight = (
        sortedCards.length >= 4 &&
        (sortedCards[0][0] === sortedCards[1][0]+1 || sortedCards[0][0] === sortedCards[1][0]+2) &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2)
      ) || (
        sortedCards.length >= 5 &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2) &&
        (sortedCards[3][0] === sortedCards[4][0]+1 || sortedCards[3][0] === sortedCards[4][0]+2)
      );
    }
    else {
      straight = (
        sortedCards.length >= 5 &&
        (sortedCards[0][0] === sortedCards[1][0]+1 || sortedCards[0][0] === sortedCards[1][0]+2) &&
        (sortedCards[1][0] === sortedCards[2][0]+1 || sortedCards[1][0] === sortedCards[2][0]+2) &&
        (sortedCards[2][0] === sortedCards[3][0]+1 || sortedCards[2][0] === sortedCards[3][0]+2) &&
        (sortedCards[3][0] === sortedCards[4][0]+1 || sortedCards[3][0] === sortedCards[4][0]+2)
      );
    }
  }
  else {
    if(setFour) {
      straight = (
        sortedCards.length >= 4 &&
        sortedCards[0][0] === sortedCards[1][0]+1 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1
      ) || (
        sortedCards.length >= 5 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1 &&
        sortedCards[3][0] === sortedCards[4][0]+1
      );
    }
    else {
      straight = (
        sortedCards.length >= 5 &&
        sortedCards[0][0] === sortedCards[1][0]+1 &&
        sortedCards[1][0] === sortedCards[2][0]+1 &&
        sortedCards[2][0] === sortedCards[3][0]+1 &&
        sortedCards[3][0] === sortedCards[4][0]+1
      );
    }
  }

  if(setFour) {
    flush = flush[0] !== 'stone' && flush[1] <= -4 + sortedCards.length;
  }
  else {
    flush = sortedCards.length >= 5 && flush[0] !== 'stone' && flush[1] === 0;
  }

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
    return [3, cardsA];
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
    return [6, cardsA];
  }

  // straight
  if(straight) {
    return [7, cardsA];
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

function triggerCard(triggering, card, cards, jokers, score, retrigger = false, allFaces = false, vampire = false, bd) {
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
          mult: score.minMult
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
          mult: score.minMult
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
          mult: score.minMult
        });
      }
    }
    else if(playfieldCards[card].modifiers.chance && !vampire) {
      score.maxMult += 20;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `Lucky?`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
    }

    if(playfieldCards[card].modifiers.foil) {
      score.minChips += 50;
      score.maxChips += 50;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `Foil: ${chipc}+50${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }
    else if(playfieldCards[card].modifiers.holographic) {
      score.minMult += 10;
      score.maxMult += 10;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `Holographic: ${multc}+10${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }
    else if(playfieldCards[card].modifiers.polychrome) {
      score.minMult *= 1.5;
      score.maxMult *= 1.5;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `Polychrome: ${prodc}1.5${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
    }
  }

  let isFace = allFaces || (!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] >= 9 && playfieldCards[card].type[1] <= 11);

  // score joker on card
  for(let joker of jokers) {
    if(triggering && joker !== triggering) {
      continue;
    }
    switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '1,3':
        if(!retrigger && isFace) {
          if(bd) {
            breakdown.push({
              cards: [card, joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '1,6':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 2 || (playfieldCards[card].modifiers.wild && !vampire))) {
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
              description: `${multc}+4${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '3,0':
        if(!retrigger) {
          if(jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker, bd) + 1], card, cards, jokers, score, retrigger, allFaces, vampire);
          }
        }
        else {
          if(retrigger !== joker && jokers.indexOf(joker) < jokers.length - 1) {
            triggerCard(jokers[jokers.indexOf(joker, bd) + 1], card, cards, jokers, score, retrigger, allFaces, vampire);
          }
        }
        break;
      case '3,2':
        if(isFace) {
          score.minChips += 30;
          score.maxChips += 30;

          if(bd) {
            breakdown.push({
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
              description: `Gain ${chipc}+4${endc} Chips`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '5,1':
        if(!playfieldCards[card].modifiers.stone && [0, 1, 3, 6].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minMult += 8;
          score.maxMult += 8;

          if(bd) {
            breakdown.push({
              cards: [card, joker],
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
              cards: [card, joker],
              description: `${chipc}+20${endc} ${multc}+4${endc} Chips Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '7,7':
        if(!retrigger && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, joker, allFaces, vampire, bd);
        }
        else if(retrigger !== joker && retrigger !== jokers[0] && joker !== jokers[0]) {
          triggerCard(jokers[0], card, cards, jokers, score, retrigger, allFaces, vampire, bd);
        }
        break;
      case '7,6':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === Math.abs(playfieldJokers[joker].value) % 4 && playfieldCards[card].type[1] === Math.floor(Math.abs(playfieldJokers[joker].value)/4) % 13) {
          score.minMult *= 2;
          score.maxMult *= 2;

          if(bd) {
            breakdown.push({
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
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
              cards: [card, joker],
              description: `${prodc}1.5${endc} Mult`,
              chips: score.minChips,
              mult: score.minMult
            });
          }
        }
        break;
      case '15,8':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[1] === 4 || playfieldCards[card].type[1] === 10)) {
          score.minChips += 10;
          score.maxChips += 10;
          score.minMult += 4;
          score.maxMult += 4;

          if(bd) {
            breakdown.push({
              cards: [card, joker],
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
        description: `Red Seal: Retrigger`,
        chips: score.minChips,
        mult: score.minMult,
        retrigger: true
      });
    }

    triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
  }

  for(let joker of jokers) {
    if(triggering && joker !== triggering) {
      continue;
    }
    switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '2,5':
        if(!retrigger && !playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] < 4) {

          if(bd) {
            breakdown.push({
              cards: [card, joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }
          retrigger++;
          triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '6,9':
        if(!retrigger && cards.indexOf(card) === 0) {
          if(bd) {
            breakdown.push({
              cards: [card, joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '7,4':
        if(!retrigger && playfieldJokers[joker].value) {
          if(bd) {
            breakdown.push({
              cards: [card, joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
      case '15,3':
        if(!retrigger && playfieldJokers[joker].extraValue) {
          if(bd) {
            breakdown.push({
              cards: [card, joker],
              description: `Retrigger`,
              chips: score.minChips,
              mult: score.minMult,
              retrigger: true
            });
          }

          triggerCard(triggering, card, cards, jokers, score, true, allFaces, vampire, bd);
        }
        break;
    }
  }
}

function triggerJoker(baseball, joker, cards, jokers, score, setFour = false, straightSkip = false, allFaces = false, smear = false, retrigger = false, vampire = false, bd) {
  let heart = false;
  let diamond = false;
  let club = false;
  let spade = false;
  let nonClub = false;
  let wild = 0;
  let faces = 0;

  for(let card of cards) {
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

  switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
    case '0,0':
      score.minMult += 4;
      score.maxMult += 4;

      if(bd) {
        breakdown.push({
          cards: [joker],
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
            cards: [joker],
            description: `${multc}+8${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '0,3':
      if(hasPair(cards)) {
        score.minMult += 12;
        score.maxMult += 12;

        if(bd) {
          breakdown.push({
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
          description: `${chipc}+${25 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '1,2':
      if(playfieldJokers[joker].value) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [joker],
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
          cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
            description: `${multc}+23${endc} Mult`,
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
          cards: [joker],
          description: `${prodc}+${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '2,8':
      let lowest = 100;
      let lowestCard = cards[0];
      for(let card in playfieldCards) {
        if(playfieldCards[card].modifiers.disabled && cards.indexOf(playfieldCards[card].id) < 0) {
          lowest = 0;
          lowestCard = card;
        }
        else if(!playfieldCards[card].modifiers.stone && cards.indexOf(playfieldCards[card].id) < 0) {
          if(lowest > cardValues[playfieldCards[card].type[1]]) {
            lowest = cardValues[playfieldCards[card].type[1]];
            lowestCard = card;
          }
        }
      }
      if(lowest === 100) {
        lowest = 0;
      }
      score.minMult += lowest * 2;
      score.maxMult += lowest * 2;

      if(bd) {
        breakdown.push({
          cards: [joker, lowestCard],
          description: `${multc}+${lowest * 2}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '3,0':
      if(!retrigger) {
        if(jokers.indexOf(joker) < jokers.length - 1) {
          triggerJoker(baseball, jokers[jokers.indexOf(joker, bd) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, joker, vampire);
        }
      }
      else {
        if(retrigger !== joker && jokers.indexOf(joker) < jokers.length - 1) {
          triggerJoker(baseball, jokers[jokers.indexOf(joker, bd) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, retrigger, vampire);
        }
      }
      break;
    case '3,1':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '3,3':
      score.minMult += 3 * playfieldJokers[joker].value;
      score.maxMult += 3 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${3 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '4,0':
      score.minChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));
      score.maxChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue))}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '4,2':
      score.minChips += playfieldJokers[joker].value;
      score.maxChips += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      }
      break;
    case '4,4':
      if((club && notClub) || (wild >= 2) || (wild === 1 && (club || notClub))) {
        score.minMult *= 2;
        score.maxMult *= 2;

        if(bd) {
          breakdown.push({
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
            description: `${prodc}4${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '4,8':
      if(hasStraight(cards)) {
        score.minMult *= 3;
        score.maxMult *= 3;

        if(bd) {
          breakdown.push({
            cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
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
          cards: [joker],
          description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '5,7':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
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
          cards: [joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '5,9':
      // TODO: calculate properly
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
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
            cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
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
          cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
          description: `${prodc}${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
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
          cards: [joker],
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
            cards: [joker],
            description: `${prodc}5${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '8,9':
      score.minMult += 2 + 2 * playfieldJokers[joker].value;
      score.maxMult += 2 + 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${2 + 2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
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
            cards: [joker],
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
            cards: [joker],
            description: `Gain ${chipc}+10${endc}, ${chipc}${30 + 10 * playfieldJokers[joker].value}${endc} Chips`,
            chips: score.minChips,
            mult: score.minMult
          });
        };
      }
      else {
        score.minChips += 20 + 10 * playfieldJokers[joker].value;
        score.maxChips += 20 + 10 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [joker],
            description: `${multc}+${playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        }
      }
      break;
    case '10,4':
      score.minChips += 100 - 5 * playfieldJokers[joker].value;
      score.maxChips += 100 - 5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${100 - 5 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '10,7':
      score.minChips += 104 + 2 * playfieldJokers[joker].value;
      score.maxChips += 104 + 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${104 + 2 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '10,9':
      score.minMult *= 1 + 0.1 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.1 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 0.1 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '11,2':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
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
          cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
          description: `${multc}+${3 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '11,8':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '11,9':
      if(cards.length === 4) {
        score.minChips += 20 + 4 * playfieldJokers[joker].value;
        score.maxChips += 20 + 4 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [joker],
            description: `${multc}+${20 + 4 * playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        };
      }
      else {
        score.minChips += 16 + 4 * playfieldJokers[joker].value;
        score.maxChips += 16 + 4 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [joker],
            description: `${multc}+${16 + 4 * playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        };
      }
      break;
    case '12,2':
      score.minMult *= 1 + 0.2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);
      score.maxMult *= 1 + 0.2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}+${1 + 0.2 * playfieldJokers[joker].value + playfieldJokers[joker].extraValue}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '12,4':
      score.minMult *= 1 + 0.25 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);
      score.maxMult *= 1 + 0.25 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 0.25 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '12,6':
      let kingsinHand = Object.keys(playfieldCards).reduce((a,b) => a + (playfieldCards[b].modifiers.stone ? 0 : (playfieldCards[b].type[1] === 11 ? (cards.indexOf(b) < 0 ? 1 : 0) : 0)), 0);
      score.minMult *= 1 + 1.5 * kingsinHand;
      score.maxMult *= 1 + 1.5 * kingsinHand;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 1.5 * kingsinHand}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '12,9':
      score.minMult *= 1 + 0.2 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${1 + 0.2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '13,5':
      score.minMult += 4 * playfieldJokers[joker].value;
      score.maxMult += 4 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${4 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '14,0':
      if(hasPair(cards)) {
        score.minChips += 50;
        score.maxChips += 50;

        if(bd) {
          breakdown.push({
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
            cards: [joker],
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
          cards: [joker],
          description: `${prodc}${1 + 0.2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '14,7':
      score.minChips += 2 * playfieldJokers[joker].value;
      score.maxChips += 2 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue);

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${2 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '15,0':
      score.minMult += 2 * playfieldJokers[joker].value;
      score.maxMult += 2 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '15,1':
      score.minMult += 20 - playfieldJokers[joker].value;
      score.maxMult += 20 - playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${multc}+${20 - playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '15,2':
      score.minMult *= 2 - 0.01 * playfieldJokers[joker].value;
      score.maxMult *= 2 - 0.01 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${prodc}${2 - 0.01 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '15,4':
      if(hasTwoPair(cards)) {
        score.minMult += 2 * playfieldJokers[joker].value;
        score.maxMult += 2 * playfieldJokers[joker].value;

        if(bd) {
          breakdown.push({
            cards: [joker],
            description: `${multc}+${2 * playfieldJokers[joker].value}${endc} Mult`,
            chips: score.minChips,
            mult: score.minMult
          });
        };
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
          cards: [joker],
          description: `${prodc}${1 + 0.5 * playfieldJokers[joker].value}${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
    case '15,9':
      score.minChips += 3 * playfieldJokers[joker].value;
      score.maxChips += 3 * playfieldJokers[joker].value;

      if(bd) {
        breakdown.push({
          cards: [joker],
          description: `${chipc}+${3 * playfieldJokers[joker].value}${endc} Chips`,
          chips: score.minChips,
          mult: score.minMult
        });
      };
      break;
  }

  if(playfieldJokers[joker].modifiers.foil) {
    score.minChips += 50;
    score.maxChips += 50;

    if(bd) {
      breakdown.push({
        cards: [joker],
        description: `Foil: ${chipc}+50${endc} Chips`,
        chips: score.minChips,
        mult: score.minMult
      });
    }
  }
  else if(playfieldJokers[joker].modifiers.holographic) {
    score.minMult += 10;
    score.maxMult += 10;

    if(bd) {
      breakdown.push({
        cards: [joker],
        description: `Holographic: ${multc}+10${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult
      });
    }
  }
  else if(playfieldJokers[joker].modifiers.polychrome) {
    score.minMult *= 1.5;
    score.maxMult *= 1.5;

    if(bd) {
      breakdown.push({
        cards: [joker],
        description: `Polychrome: ${prodc}1.5${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult
      });
    }
  }

  if(baseball) {
    if(jokerRarity[playfieldJokers[joker].type[0]][playfieldJokers[joker].type[1]] === 1) {
      score.minMult *= 1.5;
      score.maxMult *= 1.5;
    }
  }
}

function calculatePlayScore(cards, jokers, bd = false) {
  for(let joker of jokers) {
    playfieldJokers[joker].extraValue = 0;
  }

  let score = {
    minChips: 1,
    maxChips: 1,
    minMult: 1,
    maxMult: 1
  };

  let setFour = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===6 && playfieldJokers[b].type[1]===6), false);
  let straightSkip = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===12 && playfieldJokers[b].type[1]===3), false);
  let allFaces = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===3 && playfieldJokers[b].type[1]===6), false);
  let smear = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===6 && playfieldJokers[b].type[1]===4), false);

  let scoreAll = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===10 && playfieldJokers[b].type[1]===6), false);

  let vampire = Object.keys(playfieldJokers).reduce((a,b) => a || ((playfieldJokers[b].type[0]===12 && playfieldJokers[b].type[1]===2) ? playfieldJokers[b] : false), false);
  let baseball = Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0]===14 && playfieldJokers[b].type[1]===6), false);
  let shootTheMoon = Object.keys(playfieldJokers).reduce((a,b) => a || ((playfieldJokers[b].type[0]===6 && playfieldJokers[b].type[1]===2) ? playfieldJokers[b] : false), false);

  if(vampire) {
    let keys = [
      'mult',
      'increment',
      'glass',
      'chance',
      'foil',
      'wild',
      'steel'
    ];
    for(let card of cards) {
      for(let key of keys) {
        if(playfieldCards[card].modifiers[key]) {
          vampire.extraValue++;
          if(bd) {
            breakdown.push({
              cards: [vampire.id, card],
              description: `Remove ${numc}Enhancement${endc}, vampire gains ${prodc}0.2${endc} Mult`,
              chips: 0,
              mult: 0,
            });
          }
          break;
        }
      }
    }
  }

  // figure out type of hand
  cachedType[1] = getTypeOfHand(vampire, cards, setFour, straightSkip, smear);

  let [typeOfHand, involvedCards] = cachedType[1];

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
  }

  for(let card of cards) {
    // score card
    if(scoreAll || involvedCards.indexOf(card) >= 0 || playfieldCards[card].modifiers.stone) {
      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${rankNames[playfieldCards[card].type[1]]} of ${suitNames[playfieldCards[card].type[0]]}`,
          chips: score.minChips,
          mult: score.minMult,
          newCard: true
        });
      }
      triggerCard(false, card, cards, jokers, score, false, allFaces, vampire, bd);
    }
  }

  // apply steel cards
  for(let card in playfieldCards) {
    if(playfieldCards[card].modifiers.steel && cards.indexOf(playfieldCards[card].id) < 0) {
      score.minMult *= 1.5;
      score.maxMult *= 1.5;

      if(bd) {
        breakdown.push({
          cards: [card],
          description: `${prodc}1.5${endc} Mult`,
          chips: score.minChips,
          mult: score.minMult
        });
      }

      for(let joker of jokers) {
        switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
          case '1,4':
            score.minMult *= 1.5;
            score.maxMult *= 1.5;

            if(bd) {
              breakdown.push({
                cards: [card, joker],
                description: `Retrigger: ${prodc}1.5${endc} Mult`,
                chips: score.minChips,
                mult: score.minMult,
                retrigger: true
              });
            }
            break;
        }
      }
    }
  }

  // shoot the moon
  if(shootTheMoon) {
    let queensinHand = Object.keys(playfieldCards).reduce((a,b) => a + (playfieldCards[b].modifiers.stone ? 0 : (playfieldCards[b].type[1] === 10 ? (cards.indexOf(b) < 0 ? 1 : 0) : 0)), 0);
    score.minMult += 13 * queensinHand;
    score.maxMult += 13 * queensinHand;

    if(bd) {
      breakdown.push({
        cards: [shootTheMoon.id],
        description: `${multc}+${13 * queensinHand}${endc} Mult`,
        chips: score.minChips,
        mult: score.minMult
      });
    }
  }

  // score joker
  for(let joker of jokers) {
    triggerJoker(baseball, joker, cards, jokers, score, setFour, straightSkip, allFaces, smear, false, vampire, bd);
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
        description: `Plasma Deck: even out`,
        chips: (score.minChips + score.minMult) / 2,
        mult: (score.minChips + score.minMult) / 2
      });
    };
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
        chosen = chosen.concat(nextChosen, i);
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
      let score = calculatePlayScore(possibleHands[i], possibleJokers[j]);
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
    scoreChipsDiv.innerText = '>' + numberWithCommas(bestScore[2]);
    scoreMultDiv.innerText = '>' + numberWithCommas(bestScore[3]);
  }

  breakdown = [];
  calculatePlayScore(bestHand, bestJokers, true);

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
    if(line.chips !== previousChips || line.mult !== previousMult) {
      breakdownScore = `<div class="levelStat">` +
        `<span id="scoreChips" class="levelStatB">${numberWithCommas(line.chips)}</span>X` +
        `<span id="scoreMult" class="levelStatR">${numberWithCommas(line.mult)}</span>` +
        `</div>`;
        previousChips = line.chips;
        previousMult = line.mult;
    }
    breakdownHTML += `<div class="breakdownLine"${line.hasOwnProperty('newCard') ? ' style="background-color: #fffa"' : (line.hasOwnProperty('retrigger') ? ' style="background-color: #fcc"' : '')}><div>` +
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
  if(x < 1e21) {
    if(x % 1 !== 0) {
      return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + (Math.floor((x % 1) * 1000)+'').padStart(3, 0).replace(/0+$/, '');
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${Math.floor(x/(10**Math.floor(Math.log10(x)))*10000)/10000} X 10^${Math.floor(Math.log10(x))}`;
}
