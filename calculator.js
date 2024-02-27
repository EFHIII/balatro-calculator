let bestHand = [];
let bestJokers = [];

let bestPlayScoreDiv = document.getElementById('bestPlayScore');
let scoreChipsDiv = document.getElementById('scoreChips');
let scoreMultDiv = document.getElementById('scoreMult');
const chipIcon = '<span class="chipIcon"></span>';

let optimizeJokers = true;
let optimizeCards = true;
let toggleJokerDiv = document.getElementById('toggleJokerBtn');
let toggleCardDiv = document.getElementById('toggleCardBtn');

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

function hasFlush(cardsA, setFour = false, smear = false) {
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

function getTypeOfHand(cardsA, setFour = false, straightSkip = false, smear = false) {
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

function triggerCard(card, cards, jokers, score, retrigger = false, allFaces = false) {
  if(playfieldCards[card].modifiers.disabled) {
    return;
  }
  if(playfieldCards[card].modifiers.stone) {
    score.minChips += 50;
    score.maxChips += 50;
  }
  else if(playfieldCards[card].type[1] === 12) {
    score.minChips += 11;
    score.maxChips += 11;
  }
  else {
    score.minChips += cardValues[playfieldCards[card].type[1]];
    score.maxChips += cardValues[playfieldCards[card].type[1]];
  }

  if(playfieldCards[card].modifiers.mult) {
    score.minMult += 4;
    score.maxMult += 4;
  }
  else if(playfieldCards[card].modifiers.increment) {
    score.minChips += 30;
    score.maxChips += 30;
  }
  else if(playfieldCards[card].modifiers.glass) {
    score.minMult *= 2;
    score.maxMult *= 2;
  }
  else if(playfieldCards[card].modifiers.chance) {
    score.maxMult += 20;
  }

  if(playfieldCards[card].modifiers.foil) {
    score.minChips += 50;
    score.maxChips += 50;
  }
  else if(playfieldCards[card].modifiers.holographic) {
    score.minMult += 10;
    score.maxMult += 10;
  }
  else if(playfieldCards[card].modifiers.polychrome) {
    score.minMult *= 1.5;
    score.maxMult *= 1.5;
  }

  let isFace = allFaces || (!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] >= 9 && playfieldCards[card].type[1] <= 11);

  // score joker on card
  for(let joker of jokers) {
    switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
      case '1,3':
        if(!retrigger && isFace) {
          triggerCard(card, cards, jokers, score, true, allFaces);
        }
        break;
      case '1,6':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 2 || playfieldCards[card].modifiers.wild)) {
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '1,7':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 0 || playfieldCards[card].modifiers.wild)) {
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '1,8':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 3 || playfieldCards[card].modifiers.wild)) {
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '1,9':
        if(!playfieldCards[card].modifiers.stone && (playfieldCards[card].type[0] === 1 || playfieldCards[card].modifiers.wild)) {
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '2,5':
        if(!retrigger && !playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] < 4) {
          triggerCard(card, cards, jokers, score, true, allFaces);
        }
        break;
      case '3,2':
        if(isFace) {
          score.minChips += 30;
          score.maxChips += 30;
        }
        break;
      case '3,8':
        if(!playfieldCards[card].modifiers.stone && [8, 6, 4, 2, 0].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '3,9':
        if(!playfieldCards[card].modifiers.stone && [12, 7, 5, 3, 1].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minChips += 30;
          score.maxChips += 30;
        }
        break;
      case '4,0':
        if(!playfieldCards[card].modifiers.stone && [0].indexOf(playfieldCards[card].type[1]) >= 0) {
          playfieldJokers[joker].extraValue++;
        }
        break;
      case '5,1':
        if(!playfieldCards[card].modifiers.stone && [0, 1, 3, 6].indexOf(playfieldCards[card].type[1]) >= 0) {
          score.minMult += 8;
          score.maxMult += 8;
        }
        break;
      case '6,3':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[1] === 12) {
          score.minChips += 20;
          score.maxChips += 20;
          score.minMult += 4;
          score.maxMult += 4;
        }
        break;
      case '6,9':
        if(!retrigger && cards.indexOf(card) === 0) {
          triggerCard(card, cards, jokers, score, true, allFaces);
        }
        break;
      case '7,4':
        if(!retrigger && playfieldJokers[joker].value) {
          triggerCard(card, cards, jokers, score, true, allFaces);
        }
        break;
      case '7,6':
        if(!playfieldCards[card].modifiers.stone && playfieldCards[card].type[0] === Math.abs(playfieldJokers[joker].value) % 4 && playfieldCards[card].type[1] === Math.floor(Math.abs(playfieldJokers[joker].value)/4) % 13) {
          score.minMult *= 2;
          score.maxMult *= 2;
        }
        break;
    }
  }

  if(!retrigger && playfieldCards[card].modifiers.double) {
    triggerCard(card, cards, jokers, score, true, allFaces);
  }
}

function triggerJoker(joker, cards, jokers, score, setFour = false, straightSkip = false, allFaces = false, smear = false, retrigger = false) {
  let heart = false;
  let diamond = false;
  let club = false;
  let spade = false;
  let nonClub = false;
  let wild = 0;
  let faces = 0;

  for(let card of cards) {
    if(!playfieldCards[card].modifiers.stone && !playfieldCards[card].modifiers.disabled) {
      if(playfieldCards[card].modifiers.wild) {
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
      break;
    case '0,2':
      if(hasPair(cards)) {
        score.minMult += 8;
        score.maxMult += 8;
      }
      break;
    case '0,3':
      if(hasPair(cards)) {
        score.minMult += 12;
        score.maxMult += 12;
      }
      break;
    case '0,4':
      if(hasFourOfAKind(cards)) {
        score.minMult += 20;
        score.maxMult += 20;
      }
      break;
    case '0,5':
      if(hasStraight(cards, setFour, straightSkip)) {
        score.minMult += 12;
        score.maxMult += 12;
      }
      break;
    case '0,6':
      if(hasFlush(cards, setFour, smear)) {
        score.minMult += 10;
        score.maxMult += 10;
      }
      break;
    case '0,7':
      if(cards.length <= 3) {
        score.minMult += 20;
        score.maxMult += 20;
      }
      break;
    case '0,9':
      score.minChips += 25 * playfieldJokers[joker].value;
      score.maxChips += 25 * playfieldJokers[joker].value;
      break;
    case '1,2':
      if(playfieldJokers[joker].value) {
        score.minMult *= 3;
        score.maxMult *= 3;
      }
      break;
    case '2,1':
      score.minChips += 40 * playfieldJokers[joker].value;
      score.maxChips += 40 * playfieldJokers[joker].value;
      break;
    case '2,2':
      if(playfieldJokers[joker].value) {
        score.minMult += 15;
        score.maxMult += 15;
      }
      break;
    case '2,4':
      if(playfieldJokers[joker].value === 0) {
        score.minMult *= 4;
        score.maxMult *= 4;
      }
      break;
    case '2,6':
      if(playfieldJokers[joker].value === 0) {
        score.maxMult += 20;
      }
      break;
    case '2,7':
      score.minMult *= 1 + 0.25 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.25 * playfieldJokers[joker].value;
      break;
    case '2,8':
      let lowest = 0;
      for(let card in playfieldCards) {
        if(!playfieldCards[card].modifiers.stone && cards.indexOf(playfieldCards[card].id) < 0) {
          lowest = cardValues[playfieldCards[card].type[1]];
        }
      }
      score.minMult += lowest * 2;
      score.maxMult += lowest * 2;
      break;
    case '3,0':
      if(!retrigger) {
        if(jokers.indexOf(joker) < jokers.length - 1) {
          triggerJoker(jokers[jokers.indexOf(joker) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, joker);
        }
      }
      else {
        if(retrigger !== joker && jokers.indexOf(retrigger) < jokers.length - 1) {
          triggerJoker(jokers[jokers.indexOf(retrigger) + 1], cards, jokers, score, setFour, straightSkip, allFaces, smear, retrigger);
        }
      }
      break;
    case '3,1':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;
      break;
    case '3,3':
      score.minMult += 3 * playfieldJokers[joker].value;
      score.maxMult += 3 * playfieldJokers[joker].value;
      break;
    case '4,0':
      score.minChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));
      score.maxChips += 10 + (8 * (playfieldJokers[joker].value + playfieldJokers[joker].extraValue));
      break;
    case '4,2':
      score.minChips += playfieldJokers[joker].value;
      score.maxChips += playfieldJokers[joker].value;
      break;
    case '4,4':
      if((club && notClub) || (wild >= 2) || (wild === 1 && (club || notClub))) {
        score.minMult *= 2;
        score.maxMult *= 2;
      }
      break;
    case '4,5':
      if(hasPair(cards)) {
        score.minMult *= 2;
        score.maxMult *= 2;
      }
      break;
    case '4,6':
      if(hasThreeOfAKind(cards)) {
        score.minMult *= 3;
        score.maxMult *= 3;
      }
      break;
    case '4,7':
      if(hasFourOfAKind(cards)) {
        score.minMult *= 4;
        score.maxMult *= 4;
      }
      break;
    case '4,8':
      if(hasStraight(cards)) {
        score.minMult *= 3;
        score.maxMult *= 3;
      }
      break;
    case '4,9':
      if(hasFlush(cards, setFour, smear)) {
        score.minMult *= 2;
        score.maxMult *= 2;
      }
      break;
    case '5,2':
      score.minMult *= 1 + playfieldJokers[joker].value;
      score.maxMult *= 1 + playfieldJokers[joker].value;
      break;
    case '5,5':
      score.minMult += 2 * playfieldJokers[joker].value;
      score.maxMult += 2 * playfieldJokers[joker].value;
      break;
    case '5,7':
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;
      break;
    case '5,8':
      score.minMult *= 1 + 0.5 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.5 * playfieldJokers[joker].value;
      break;
    case '5,9':
      // TODO: calculate properly
      score.minMult += playfieldJokers[joker].value;
      score.maxMult += playfieldJokers[joker].value;
      break;
    case '6,0':
      if((heart?1:0)+(diamond?1:0)+(club?1:0)+(spade?1:0)+wild >= 4) {
        score.minMult *= 3;
        score.maxMult *= 3;
      }
      break;
    case '6,1':
      if(faces === 0) {
        score.minMult += 1 + playfieldJokers[joker].value;
        score.maxMult += 1 + playfieldJokers[joker].value;
      }
      break;
    case '6,2':
      if(faces === 0) {
        let queensinHand = Object.keys(playfieldCards).reduce((a,b) => a + (playfieldCards[b].modifiers.stone ? 0 : (playfieldCards[b].type[1] === 10 ? (bestHand.indexOf(b) < 0 ? 1 : 0) : 0)), 0);
        score.minMult += 13 * playfieldCards;
        score.maxMult += 13 * playfieldCards;
      }
      break;
    case '6,7':
      score.minMult += 15;
      score.maxMult += 15;
      break;
    case '6,8':
      score.minChips += 300;
      score.maxChips += 300;
      break;
    case '7,0':
      if(playfieldJokers[joker].value >= 16) {
        score.minMult *= 3;
        score.maxMult *= 3;
      }
      break;
    case '7,0':
      score.minMult *= 1 + 0.25 * playfieldJokers[joker].value;
      score.maxMult *= 1 + 0.25 * playfieldJokers[joker].value;
      break;
    case '7,7':
      if(!retrigger && joker !== jokers[0]) {
        triggerJoker(jokers[0], cards, jokers, score, setFour, straightSkip, allFaces, smear, joker);
      }
      else if(retrigger !== jokers[0] && joker !== jokers[0]) {
        triggerJoker(jokers[0], cards, jokers, score, setFour, straightSkip, allFaces, smear, retrigger);
      }
      break;
  }

  if(playfieldJokers[joker].modifiers.foil) {
    score.minChips += 50;
    score.maxChips += 50;
  }
  else if(playfieldJokers[joker].modifiers.holographic) {
    score.minMult += 10;
    score.maxMult += 10;
  }
  else if(playfieldJokers[joker].modifiers.polychrome) {
    score.minMult *= 1.5;
    score.maxMult *= 1.5;
  }
}

function calculatePlayScore(cards, jokers) {
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

  // figure out type of hand
  cachedType[1] = getTypeOfHand(cards, setFour, straightSkip, smear);

  let [typeOfHand, involvedCards] = cachedType[1];

  if(typeOfHand >= 0) {
    score.minChips = hands[typeOfHand].chips;
    score.maxChips = score.minChips;
    score.minMult = hands[typeOfHand].mult;
    score.maxMult = score.minMult;
  }

  for(let card of cards) {
    // score card
    if(involvedCards.indexOf(card) >= 0 || playfieldCards[card].modifiers.stone) {
      triggerCard(card, cards, jokers, score, false, allFaces);
    }
  }

  // apply steel cards
  for(let card in playfieldCards) {
    if(playfieldCards[card].modifiers.steel && cards.indexOf(playfieldCards[card].id) < 0) {
      score.minMult *= 1.5;
      score.maxMult *= 1.5;

      for(let joker of jokers) {
        switch (playfieldJokers[joker].type[0]+','+playfieldJokers[joker].type[1]) {
          case '1,4':
            score.minMult *= 1.5;
            score.maxMult *= 1.5;
            break;
        }
      }
    }
  }

  // score joker
  for(let joker of jokers) {
    triggerJoker(joker, cards, jokers, score, setFour, straightSkip, allFaces, smear);
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

  return [Math.floor(score.minChips)*Math.floor(score.minMult), Math.floor(score.maxChips)*Math.floor(score.maxMult), score.minChips, score.minMult];
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

  let bestScore = [0, 0, 0, 0];
  bestHand = [];
  bestJokers = [];

  for(let i = 0; i < possibleHands.length; i++) {
    for(let j = 0; j < possibleJokers.length; j++) {
      let score = calculatePlayScore(possibleHands[i], possibleJokers[j]);
      if(score[0]-1/(1+score[1]-score[0]) > bestScore[0]-1/(1+bestScore[1]-bestScore[0])) {
        bestScore = score;
        bestHand = possibleHands[i];
        bestJokers = possibleJokers[j];
      }
    }
  }

  if(bestScore[0] === bestScore[1]) {
    bestPlayScoreDiv.innerHTML = chipIcon + numberWithCommas(bestScore[0]);
    scoreChipsDiv.innerText = numberWithCommas(bestScore[2]);
    scoreMultDiv.innerText = numberWithCommas(bestScore[3]);
  }
  else {
    bestPlayScoreDiv.innerHTML = numberWithCommas(bestScore[0]) + ' &lt;' + chipIcon + '&lt; ' + numberWithCommas(bestScore[1]);
    scoreChipsDiv.innerText = '>' + numberWithCommas(bestScore[2]);
    scoreMultDiv.innerText = '>' + numberWithCommas(bestScore[3]);
  }
}

function numberWithCommas(x) {
  if(x < 1e21) {
    if(x % 1 !== 0) {
      return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + (Math.floor((x % 1) * 1000)+'').padStart(3, 0).replace(/0+$/, '');
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${x/(10**Math.floor(Math.log10(x)))} X 10^${Math.floor(Math.log10(x))}`;
}
