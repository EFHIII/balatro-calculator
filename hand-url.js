/*
hand binary format:

joker:
number of jokers - 16 bits
type[0] - 4 bits
type[1] - 4 bits
edition? - 1 bit
edition - 2 bits
non-zero value? - 1 bit
value - 16 bits

cards:
number of cards - 16 bits
number of cards in hand - 3 bits
suit - 2 bits
value - 4 bits
edition? - 1 bit
edition - 2 bits
modifier - 4 bits

hands:
non-zero hand? 1 bits
value - 16 bits

the flint - 1 bit
plasmaDeck - 1 bit
observatory? - 1 bit
planet cards:
non-zero - 1 bit
value - 16 bits

*/

function editionBinary(modifiers) {
  if(modifiers.foil || modifiers.holographic || modifiers.polychrome || modifiers.disabled) {
    // edition - 2 bits
    if(modifiers.foil) {
      return [1, 0, 0];
    }
    else if(modifiers.holographic) {
      return [1, 1, 0];
    }
    else if(modifiers.polychrome) {
      return [1, 0, 1];
    }
    else {
      return [1, 1, 1];
    }
  }
  else {
    return [0];
  }
}

function modifiersBinary(modifiers) {
  let double = modifiers.double ? 1 : 0;

  if(modifiers.chance) {
    return [1, 0, 0, double];
  }
  else if(modifiers.glass) {
    return [0, 1, 0, double];
  }
  else if(modifiers.increment) {
    return [1, 1, 0, double];
  }
  else if(modifiers.mult) {
    return [0, 0, 1, double];
  }
  else if(modifiers.steel) {
    return [1, 0, 1, double];
  }
  else if(modifiers.stone) {
    return [0, 1, 1, double];
  }
  else if(modifiers.wild) {
    return [1, 1, 1, double];
  }
  else {
    return [0, 0, 0, double];
  }
}

function intToBinary(num, bits) {
  let value = [];
  for(let i = 0; i < bits; i++) {
    value.push(num & (1 << i) ? 1 : 0);
  }
  return value;
}

function signed16(num) {
  return [num < 0 ? 1 : 0, ...intToBinary(Math.abs(num), 15)];
}

function bitsToBase64(bitsArray) {
    // Convert bits array to binary string
    const binaryString = bitsArray.join('');

    // Pad the binary string to make its length a multiple of 8
    const paddedBinaryString = binaryString.padEnd(Math.ceil(binaryString.length / 8) * 8, '0');

    // Convert binary string to bytes
    const bytes = [];
    for (let i = 0; i < paddedBinaryString.length; i += 8) {
        bytes.push(parseInt(paddedBinaryString.substr(i, 8), 2));
    }

    // Convert bytes to base64 string
    const base64String = btoa(String.fromCharCode.apply(null, bytes));

    return base64String.replace(/=/g, '');
}

function base64ToBits(base64String) {
    // Decode base64 string to bytes
    const binaryString = atob(base64String);

    // Convert bytes to binary
    let bits = [];
    for (let i = 0; i < binaryString.length; i++) {
        const byte = binaryString.charCodeAt(i).toString(2).padStart(8, '0').split('').map(a => a * 1);
        bits.push(...byte);
    }

    return bits;
}

function compileHand() {
  let binary = [];

  // number of jokers - 16 bits
  binary.push(...intToBinary(Object.keys(playfieldJokers).length, 16));

  for(let i = 0; i < bestJokers.length; i++) {
    let joker = playfieldJokers[bestJokers[i]];
    // type[0] - 4 bits
    binary.push(...intToBinary(joker.type[0], 4));
    // type[1] - 4 bits
    binary.push(...intToBinary(joker.type[1], 4));

    // edition? - 1 bit
    // edition - 2 bits
    binary.push(...editionBinary(joker.modifiers));

    // non-zero value? - 1 bit
    if(joker.value === 0) {
      binary.push(0);
    }
    else {
      binary.push(1);
      // value - 16 bits
      binary.push(...signed16(joker.value));
    }

    // non-expected sell value? - 1 bit
    if(joker.sell === Math.floor((jokerPrice[joker.type[0]][joker.type[1]] + ((joker.modifiers.foil || joker.modifiers.holographic || joker.modifiers.polychrome) ? 1 : 0)) / 2)) {
      binary.push(0);
    }
    else {
      binary.push(1);
      // value - 16 bits
      binary.push(...intToBinary(joker.sell, 16));
    }
  }

  // number of cards - 16 bits
  binary.push(...intToBinary(Object.keys(playfieldCards).length, 16));
  // number of cards in hand - 3 bits
  binary.push(...intToBinary(bestHand.length, 3));

  for(let i = 0; i < bestHand.length; i++) {
    let card = playfieldCards[bestHand[i]];
    if(!card) continue;
    // suit - 2 bits
    binary.push(...intToBinary(card.type[0], 2));
    // value - 4 bits
    binary.push(...intToBinary(card.type[1], 4));

    // edition? - 1 bit
    // edition - 2 bits
    binary.push(...editionBinary(card.modifiers));

    // modifier - 4 bits
    binary.push(...modifiersBinary(card.modifiers));
  }

  for(let id in playfieldCards) {
    if(bestHand.indexOf(id) >= 0) continue;
    let card = playfieldCards[id];

    // suit - 2 bits
    binary.push(...intToBinary(card.type[0], 2));
    // value - 4 bits
    binary.push(...intToBinary(card.type[1], 4));

    // edition? - 1 bit
    // edition - 2 bits
    binary.push(...editionBinary(card.modifiers));

    // modifier - 4 bits
    binary.push(...modifiersBinary(card.modifiers));
  }

  binary.push(theFlint ? 1 : 0);
  binary.push(plasmaDeck ? 1 : 0);

  for(let i = 0; i < hands.length; i++) {
    if(hands[i].level === 1) {
      binary.push(0);
    }
    else {
      binary.push(1);
      binary.push(...intToBinary(hands[i].level, 16));
    }
  }

  binary.push(observatory ? 1 : 0);

  if(observatory) {
    for(let i = 0; i < hands.length; i++) {
      if(hands[i].planets > 0) {
        binary.push(1);
        binary.push(...intToBinary(hands[i].planets, 16));
      }
      else {
        binary.push(0);
      }
    }
  }

  // hand counts (for supernova/obelisk/card sharp) - 1 bit
  let nonZeroedHand = false;
  for(let i = 0; i < hands.length; i++) {
    if(hands[i].playedThisRound || hands[i].played) {
      nonZeroedHand = true;
    }
  }
  if(nonZeroedHand) {
    binary.push(1);
    for(let i = 0; i < hands.length; i++) {
      binary.push(hands[i].playedThisRound ? 1 : 0);

      binary.push(hands[i].played ? 1 : 0);
      if(hands[i].played) {
        binary.push(...intToBinary(hands[i].played, 16));
      }
    }
  }
  else {
    binary.push(0);
  }

  // remove trailing 0s
  while(binary.length > 0 && binary[binary.length - 1] === 0) {
    binary.pop();
  }

  // set URL
  if(binary.length === 0) {
    history.replaceState(null, null, '?');
  }
  else {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("h", toUrlSafe(bitsToBase64(binary)));
    history.replaceState(null, null, '?' + queryParams.toString());
  }
}

let atBit = 0;

function nextBits(bits, binary) {
  let ans = [];
  for(let i = 0; i < bits; i++) {
    if(atBit >= binary.length) {
      ans.push(0);
    }
    else {
      ans.push(binary[atBit++]);
    }
  }
  return ans;
}

function intFromBits(bits, binary) {
  let subBits = nextBits(bits, binary);
  let ans = 0;
  for(let i = 0; i < bits; i++) {
    if(subBits[i]) ans += 1 << i;
  }
  return ans;
}

function toUrlSafe(str) {
  return str.replace(/\+/g,'-').replace(/\//g,'_');
}

function fromUrlSafe(str) {
  if(str.indexOf('/') > 0 || str.indexOf('+') > 0) return str;
  return str.replace(/_/g,'/').replace(/-/g,'+');
}

function parseOldHand(bits) {
  if(bits.length === 0) {
    return;
  }
  atBit = 0;

  if(optimizeJokers) toggleJoker();
  if(optimizeCards) toggleCard();

  // number of jokers - 16 bits
  let numberOfJokers = intFromBits(16, bits);

  for(let i = 0; i < numberOfJokers; i++) {
    const type = [intFromBits(4, bits), intFromBits(4, bits)];

    jmodifiers.foil = false;
    jmodifiers.holographic = false;
    jmodifiers.polychrome = false;
    jmodifiers.disabled = false;

    if(intFromBits(1, bits)) {
      switch(intFromBits(2, bits)) {
        case 0:
          jmodifiers.foil = true;
          break;
        case 1:
          jmodifiers.holographic = true;
          break;
        case 2:
          jmodifiers.polychrome = true;
          break;
        case 3:
          jmodifiers.disabled = true;
          break;
      }
    }

    jokerValue = 0;
    if(intFromBits(1, bits)) {
      let sign = intFromBits(1, bits) ? -1 : 1;
      jokerValue = sign * intFromBits(15, bits);
    }

    addJoker(...type);
  }

  jmodifiers.foil = false;
  jmodifiers.holographic = false;
  jmodifiers.polychrome = false;
  jmodifiers.disabled = false;
  jokerValue = 0;

  // number of cards - 16 bits
  let numberOfCards = intFromBits(16, bits);

  // number of cards in hand - 3 bits
  let numberOfCardsInHand = intFromBits(3, bits);

  for(let i = 0; i < numberOfCards; i++) {
    const type = [intFromBits(2, bits), intFromBits(4, bits)];

    modifiers.foil = false;
    modifiers.holographic = false;
    modifiers.polychrome = false;
    modifiers.disabled = false;

    modifiers.stone = false;
    modifiers.increment = false;
    modifiers.mult = false;
    modifiers.wild = false;
    modifiers.chance = false;
    modifiers.glass = false;
    modifiers.steel = false;

    if(intFromBits(1, bits)) {
      switch(intFromBits(2, bits)) {
        case 0:
          modifiers.foil = true;
          break;
        case 1:
          modifiers.holographic = true;
          break;
        case 2:
          modifiers.polychrome = true;
          break;
        case 3:
          modifiers.disabled = true;
          break;
      }
    }

    switch(intFromBits(3, bits)) {
      case 1: modifiers.chance = true; break;
      case 2: modifiers.glass = true; break;
      case 3: modifiers.increment = true; break;
      case 4: modifiers.mult = true; break;
      case 5: modifiers.steel = true; break;
      case 6: modifiers.stone = true; break;
      case 7: modifiers.wild = true; break;
    }

    modifiers.double = intFromBits(1, bits) ? true : false;

    setModifierString();

    addCard(...type);

    if(i < numberOfCardsInHand) {
      const keys = Object.keys(playfieldCards);
      bestHand.push(keys[keys.length - 1]);
    }
  }

  modifiers.foil = false;
  modifiers.holographic = false;
  modifiers.polychrome = false;
  modifiers.disabled = false;

  modifiers.stone = false;
  modifiers.increment = false;
  modifiers.mult = false;
  modifiers.wild = false;
  modifiers.chance = false;
  modifiers.glass = false;
  modifiers.steel = false;

  modifiers.double = false;

  if(theFlint != intFromBits(1, bits)) {
    toggleTheFlint();
  }

  if(plasmaDeck != intFromBits(1, bits)) {
    togglePlasma();
  }

  for(let i = 0; i < hands.length; i++) {
    if(intFromBits(1, bits) === 1) {
      hands[i].level = intFromBits(16, bits) + 1;
      incrementLevel(-1, i);
    }
  }

  if(observatory != intFromBits(1, bits)) {
    toggleObservatory();
  }

  if(observatory) {
    for(let i = 0; i < hands.length; i++) {
      if(intFromBits(1, bits) === 1) {
        hands[i].planets = intFromBits(16, bits) + 1;
        incrementPlanet(-1, i);
      }
    }
  }

  redrawPlayfield();
}

function parseHand(bits) {
  if(bits.length === 0) {
    return;
  }
  atBit = 0;

  if(optimizeJokers) toggleJoker();
  if(optimizeCards) toggleCard();

  // number of jokers - 16 bits
  let numberOfJokers = intFromBits(16, bits);

  for(let i = 0; i < numberOfJokers; i++) {
    const type = [intFromBits(4, bits), intFromBits(4, bits)];

    jmodifiers.foil = false;
    jmodifiers.holographic = false;
    jmodifiers.polychrome = false;
    jmodifiers.disabled = false;

    if(intFromBits(1, bits)) {
      switch(intFromBits(2, bits)) {
        case 0:
          jmodifiers.foil = true;
          break;
        case 1:
          jmodifiers.holographic = true;
          break;
        case 2:
          jmodifiers.polychrome = true;
          break;
        case 3:
          jmodifiers.disabled = true;
          break;
      }
    }

    jokerValue = 0;
    if(intFromBits(1, bits)) {
      let sign = intFromBits(1, bits) ? -1 : 1;
      jokerValue = sign * intFromBits(15, bits);
    }

    if(intFromBits(1, bits)) {
      addJoker(...type, intFromBits(16, bits));
    }
    else {
      addJoker(...type);
    }
  }

  jmodifiers.foil = false;
  jmodifiers.holographic = false;
  jmodifiers.polychrome = false;
  jmodifiers.disabled = false;
  jokerValue = 0;

  // number of cards - 16 bits
  let numberOfCards = intFromBits(16, bits);

  // number of cards in hand - 3 bits
  let numberOfCardsInHand = intFromBits(3, bits);

  for(let i = 0; i < numberOfCards; i++) {
    const type = [(intFromBits(2, bits) + 1) % 4, intFromBits(4, bits)];

    modifiers.foil = false;
    modifiers.holographic = false;
    modifiers.polychrome = false;
    modifiers.disabled = false;

    modifiers.stone = false;
    modifiers.increment = false;
    modifiers.mult = false;
    modifiers.wild = false;
    modifiers.chance = false;
    modifiers.glass = false;
    modifiers.steel = false;

    if(intFromBits(1, bits)) {
      switch(intFromBits(2, bits)) {
        case 0:
          modifiers.foil = true;
          break;
        case 1:
          modifiers.holographic = true;
          break;
        case 2:
          modifiers.polychrome = true;
          break;
        case 3:
          modifiers.disabled = true;
          break;
      }
    }

    switch(intFromBits(3, bits)) {
      case 1: modifiers.chance = true; break;
      case 2: modifiers.glass = true; break;
      case 3: modifiers.increment = true; break;
      case 4: modifiers.mult = true; break;
      case 5: modifiers.steel = true; break;
      case 6: modifiers.stone = true; break;
      case 7: modifiers.wild = true; break;
    }

    modifiers.double = intFromBits(1, bits) ? true : false;

    setModifierString();

    addCard(...type);

    if(i < numberOfCardsInHand) {
      const keys = Object.keys(playfieldCards);
      bestHand.push(keys[keys.length - 1]);
    }
  }

  modifiers.foil = false;
  modifiers.holographic = false;
  modifiers.polychrome = false;
  modifiers.disabled = false;

  modifiers.stone = false;
  modifiers.increment = false;
  modifiers.mult = false;
  modifiers.wild = false;
  modifiers.chance = false;
  modifiers.glass = false;
  modifiers.steel = false;

  modifiers.double = false;

  setModifierString();

  if(theFlint != intFromBits(1, bits)) {
    toggleTheFlint();
  }

  if(plasmaDeck != intFromBits(1, bits)) {
    togglePlasma();
  }

  for(let i = 0; i < hands.length; i++) {
    if(intFromBits(1, bits) === 1) {
      hands[i].level = intFromBits(16, bits) + 1;
      incrementLevel(-1, i);
    }
  }

  if(observatory != intFromBits(1, bits)) {
    toggleObservatory();
  }

  if(observatory) {
    for(let i = 0; i < hands.length; i++) {
      if(intFromBits(1, bits) === 1) {
        hands[i].planets = intFromBits(16, bits) + 1;
        incrementPlanet(-1, i);
      }
    }
  }

  // hand counts (for supernova/obelisk/card sharp) - 1 bit
  if(intFromBits(1, bits)) {
    for(let i = 0; i < hands.length; i++) {
      hands[i].playedThisRound = intFromBits(1, bits);
      if(hands[i].playedThisRound) {
        handLevels.children[i].children[0].innerText = 'X';
      }
      else {
        handLevels.children[i].children[0].innerHTML = '&nbsp;';
      }
      if(intFromBits(1, bits)) {
        hands[i].played = intFromBits(16, bits);
        handLevels.children[i].children[1].children[0].innerText = hands[i].played;
      }
    }
  }

  redrawPlayfield();
}

(new URL(window.location.href)).searchParams.forEach((x, y) => {
  if(y === 'hand') {
    parseOldHand(base64ToBits(fromUrlSafe(x)));
  }
  else if(y === 'h') {
    parseHand(base64ToBits(fromUrlSafe(x)));
  }
});
