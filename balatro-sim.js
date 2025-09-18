"use strict";

const handChips = [
  [160, 16, 50, 3],
  [140, 14, 40, 4],
  [120, 12, 35, 3],
  [100,  8, 40, 4],
  [ 60,  7, 30, 3],
  [ 40,  4, 25, 2],
  [ 35,  4, 15, 2],
  [ 30,  4, 30, 3],
  [ 30,  3, 20, 2],
  [ 20,  2, 20, 1],
  [ 10,  2, 15, 1],
  [  5,  1, 10, 1]
];

const jokerCosts = [
   2, 4, 3, 4, 4, 4, 4, 5, 7, 6,
   4, 4, 6, 6, 5, 1, 5, 5, 5, 5,
   6, 5, 5, 6, 5, 6, 4, 7, 5, 6,
  10, 6, 4, 4, 4, 5, 5, 6, 4, 4,
   8, 4, 5, 5, 6, 8, 8, 8, 8, 8,
   5, 8, 8, 5, 7, 6, 5, 6, 8, 4,
   6, 6, 5, 4, 7, 4, 7, 5, 7, 4,
   7, 8, 8, 6, 5, 6, 6,10, 6, 7,
   7, 7, 7,20,20,20,20,20, 6, 7,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   4, 6, 6, 5, 5, 8, 3, 5, 6, 6,
   5, 4, 4, 4, 4, 4, 6, 5, 7, 4,
   6, 6, 7, 7, 7, 8, 8, 7, 6, 8,
   7, 5, 5, 6, 6, 6, 6, 4, 5, 4,
   3, 4, 4, 4, 4, 6, 8, 6, 6, 6,
   5, 5, 6, 6, 6, 9, 4, 8, 4, 6
];

const jokerRarity = [
  1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
  1, 1, 2, 2, 2, 1, 1, 1, 1, 1,
  2, 1, 1, 2, 2, 2, 1, 2, 1, 1,
  3, 2, 1, 1, 1, 1, 2, 2, 1, 1,
  3, 1, 1, 2, 2, 3, 3, 3, 3, 3,
  1, 2, 2, 2, 2, 2, 2, 1, 3, 1,
  2, 1, 1, 1, 2, 2, 2, 1, 3, 1,
  3, 3, 2, 3, 2, 2, 2, 3, 2, 2,
  2, 2, 2, 4, 4, 4, 4, 4, 2, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 2, 2, 1, 1, 3, 1, 1, 2, 2,
  2, 1, 1, 1, 1, 1, 2, 1, 2, 1,
  2, 1, 2, 2, 2, 3, 3, 2, 2, 3,
  2, 2, 1, 2, 2, 2, 1, 1, 2, 1,
  1, 1, 1, 1, 1, 2, 3, 2, 2, 2,
  2, 1, 2, 2, 2, 3, 1, 3, 1, 2
];

const powersOfTen = [];
for(let i = 0; i < 632; i++) {
  powersOfTen.push(10 ** (i - 323));
}

// Lots of constants
const FLUSH_FIVE = 0;
const FLUSH_HOUSE = 1;
const FIVE_OF_A_KIND = 2;
const STRAIGHT_FLUSH = 3;
const FOUR_OF_A_KIND = 4;
const FULL_HOUSE = 5;
const FLUSH = 6;
const STRAIGHT = 7;
const THREE_OF_A_KIND = 8;
const TWO_PAIR = 9;
const PAIR = 10;
const HIGH_CARD = 11;

const _2 = 0;
const _3 = 1;
const _4 = 2;
const _5 = 3;
const _6 = 4;
const _7 = 5;
const _8 = 6;
const _9 = 7;
const _10 = 8;
const JACK = 9;
const QUEEN = 10;
const KING = 11;
const ACE = 12;

const HEARTS = 0;
const CLUBS = 1;
const DIAMONDS = 2;
const SPADES = 3;

const GOLD_SEAL = 1;
const RED_SEAL = 2;
const BLUE_SEAL = 3;
const PURPLE_SEAL = 4;

const FOIL = 1;
const HOLOGRAPHIC = 2;
const POLYCHROME = 3;
const NEGATIVE = 4;

const BOUNS = 1;
const MULT = 2;
const WILD = 3;
const GLASS = 4;
const STEEL = 5;
const STONE = 6;
const GOLD = 7;
const LUCKY = 8;

const RANK = 0;
const SUIT = 1;
const EDITION = 2;
const ENHANCEMENT = 3;
const SEAL = 4;
const EXTRA_CHIPS = 5;
const CARD_DISABLED = 6;
// const CARD_ID = 7;
const EXTRA_EXTRA_CHIPS = 8;

const JOKER = 0;
const VALUE = 1;
//const EDITION = 2;
const JOKER_DISABLED = 3;
const SELL_VALUE = 4;

const LEVEL = 0;
const PLANETS = 1;
const PLAYED = 2;
const PLAYED_THIS_ROUND = 3;

const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

function bigAdd(a, b) {
  if(b[1] > 308) {
    return b;
  }
  return [
    a / powersOfTen[b[1] + 323] + b[0],
    b[1]
  ];
}

function bigTimes(a, b) {
  const tempM = a * b[0];

  if(tempM > 1e13) {
    const tempE = Math.floor(Math.log10(Math.abs(tempM))) + 13;

    return [
      tempM / powersOfTen[tempE + 323],
      b[1] + tempE
    ];
  }
  else {
    return [
      tempM,
      b[1]
    ];
  }
}

function bigBigAdd(a, b) {
  if(b[1] > a[1]) {
    const diff = b[1] - a[1];
    if(diff >= 309) {
      return b;
    }
    return [
      a[0] / powersOfTen[diff + 323] + b[0],
      b[1]
    ];
  }
  else {
    const diff = a[1] - b[1];
    if(diff >= 309) {
      return a;
    }
    return [
      b[0] / powersOfTen[diff + 323] + a[0],
      a[1]
    ];
  }
}

function bigBigTimes(a, b) {
  return [
    a[0] * b[0],
    a[1] + b[1]
  ];
}

function normalizeBig(b) {
  const tempE = Math.floor(Math.log10(Math.abs(b[0])));

  return [
    b[0] / powersOfTen[tempE + 323],
    b[1] + tempE
  ];
}

/*
brute-force order of operations:

- compileJokers()
- all combinations of joker order
  - compileJokerOrder()
- all combinations of cards played
  - compileCards()
- all combinations of cards played order
  - simulate()
*/

class Hand {
  hands = [];
  jokersExtraValue = [];
  jokerRarities = [];

  randomMode = 0;
  chips = 0;
  mult = [1, 0]; // big-float

  chanceMultiplier = 1;

  FourFingers = false; // straights/flushes with 4 cards
  Shortcut = false; // straights can skip numbers
  Pareidolia = false; // all cards are faces
  SmearedJoker = false; // hearts = diamonds, clubs = spades
  Splash = false; // every card is counted in scoring

  hasVampire = false;
  Vampire = false;
  BaseballCard = 0;

  RaisedFist = false;

  MidasMaskas = false;

  compiledValues = [];

  handType = 11;
  involvedCards = [];

  hasPair = false;
  hasTwoPair = false;
  hasThreeOfAKind = false;
  hasFourOfAKind = false;
  hasStraight = false;
  hasFlush = false;

  compiledChips = 0;
  compiledMult = [1, 0];

  compiledInHandPlusMult = [0, 0];
  compiledInHandTimesMult = [1, 0];
  cardCast = [];
  cardExtraExtraChips = [];

  actualCardsInHand = [];

  constructor({
    cards = [],
    cardsInHand = [],
    jokers = [],
    hands = false,
    TheFlint = false,
    TheEye = false,
    PlasmaDeck = false,
    Observatory = false
  } = {}) {
    this.cards = cards;
    this.cardsInHand = cardsInHand;
    this.jokers = jokers;
    if(hands) {
      this.hands = hands;
    }
    else {
      for(let i = 0; i < handChips.length; i++) {
        this.hands.push([
          1, // level
          0, // planets
          0, // played
          0, // played this round
        ]);
      }
    }
    this.TheFlint = TheFlint;
    this.TheEye = TheEye;
    this.PlasmaDeck = PlasmaDeck;
    this.Observatory = Observatory;
  }

  triggerJoker(joker, j) {
    if(joker[JOKER_DISABLED]) return;

    if(joker[EDITION] === FOIL) {
      this.chips += 50;
    }
    else if(joker[EDITION] === HOLOGRAPHIC) {
      this.mult = bigAdd(10, this.mult);
    }

    switch(joker[JOKER]) {
      case 0:
        // Joker
        this.mult = bigAdd(4, this.mult);
        break;
      case 2:
        // Jolly Joker
        if(this.hasPair) {
          this.mult = bigAdd(8, this.mult);
        }
        break;
      case 3:
        // Zany Joker
        if(this.hasThreeOfAKind) {
          this.mult = bigAdd(12, this.mult);
        }
        break;
      case 4:
        // Mad Joker
        if(this.hasTwoPair) {
          this.mult = bigAdd(10, this.mult);
        }
        break;
      case 5:
        // Crazy Joker
        if(this.hasStraight) {
          this.mult = bigAdd(12, this.mult);
        }
        break;
      case 6:
        // Droll Joker
        if(this.hasFlush) {
          this.mult = bigAdd(10, this.mult);
        }
        break;
      case 7:
        // Half Joker
        if(this.cards.length <= 3) {
          this.mult = bigAdd(20, this.mult);
        }
        break;
      case 12:
        // Acrobat
        if(joker[VALUE] !== 0) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 22:
        // Mystic Summit
        if(joker[VALUE] !== 0) {
          this.mult = bigAdd(15, this.mult);
        }
        break;
      case 24:
        // Loyalty Card
        if(joker[VALUE] === 0) {
          this.mult = bigTimes(4, this.mult);
        }
        break;
      case 26:
        // Misprint
        switch(this.randomMode) {
          case 0:
            this.mult = bigAdd(23, this.mult);
            break;
          case 2:
            this.mult = bigAdd(Math.floor(Math.random() * 24), this.mult);
            break;
        }
        break;
      case 27:
        // Steel Joker
        this.mult = bigTimes(this.compiledValues[j], this.mult);
        break;
      case 31:
        // Glass Joker
        this.mult = bigTimes(this.compiledValues[j], this.mult);
        break;
      case 33:
        // Abstract Joker
          this.mult = bigAdd(this.jokers.length * 3, this.mult);
          break;
      case 42:
        // Supernova
        this.mult = bigAdd(this.hands[this.typeOfHand][PLAYED] + 1, this.mult);
        break;
      case 44:
        // Seeing Double
        if(this.compiledValues[j]) {
          this.mult = bigTimes(2, this.mult);
        }
        break;
      case 45:
        // The Duo
        if(this.hasPair) {
          this.mult = bigTimes(2, this.mult);
        }
        break;
      case 46:
        // The Trio
        if(this.hasThreeOfAKind) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 47:
        // The Family
        if(this.hasFourOfAKind) {
          this.mult = bigTimes(4, this.mult);
        }
        break;
      case 48:
        // The Order
        if(this.hasStraight) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 49:
        // The Tribe
        if(this.hasFlush) {
          this.mult = bigTimes(2, this.mult);
        }
        break;
      case 52:
        // Joker Stencil
        this.mult = bigTimes(1 + joker[VALUE], this.mult);
        break;
      case 55:
        // Ceremonial Dagger
        this.mult = bigAdd(joker[VALUE], this.mult);
        break;
      case 57:
        // Fortune Teller
        this.mult = bigAdd(joker[VALUE], this.mult);
        break;
      case 58:
        // Hit the Road
        this.mult = bigTimes(1 + joker[VALUE] * 0.5, this.mult);
        break;
      case 59:
        // Swashbuckler
        this.mult = bigAdd(this.compiledValues[j], this.mult);
        break;
      case 60:
        // Flower Pot
        if(this.compiledValues[j]) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 61:
        // Ride the Bus
        this.mult = bigAdd(this.compiledValues[j], this.mult);
        break;
      case 67:
        // Gros Michel
        this.mult = bigAdd(15, this.mult);
        break;
      case 70:
        // Driver's License
        if(joker[VALUE] >= 16) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 75:
        // Throwback
        this.mult = bigTimes(1 + joker[VALUE] * 0.25, this.mult);
        break;
      case 83:
        // Canio
        this.mult = bigTimes(1 + joker[VALUE], this.mult);
        break;
      case 85:
        // Yorick
        this.mult = bigTimes(joker[VALUE], this.mult);
        break;
      case 89:
        // Bootstraps
        this.mult = bigAdd(joker[VALUE] * 2, this.mult);
        break;
      case 102:
        // Blackboard
        if(this.compiledValues[j]) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 109:
        // Constellation
        this.mult = bigTimes(1 + joker[VALUE] / 10, this.mult);
        break;
      case 112:
        // Green Joker
        this.mult = bigAdd(1 + joker[VALUE], this.mult);
        break;
      case 115:
        // Cavendish
        this.mult = bigTimes(3, this.mult);
        break;
      case 116:
        // Card Sharp
        if(this.hands[this.typeOfHand][PLAYED_THIS_ROUND]) {
          this.mult = bigTimes(3, this.mult);
        }
        break;
      case 117:
        // Red Card
        this.mult = bigAdd(joker[VALUE] * 3, this.mult);
        break;
      case 118:
        // Madness
        this.mult = bigTimes(1 + joker[VALUE] * 0.5, this.mult);
        break;
      case 122:
        // Vampire
        this.mult = bigTimes(1 + this.compiledValues[j] / 10, this.mult);
        break;
      case 124:
        // Hologram
        this.mult = bigTimes(1 + joker[VALUE] * 0.25, this.mult);
        break;
      case 129:
        // Obelisk
        this.mult = bigTimes(this.compiledValues[j], this.mult);
        break;
      case 135:
        // Erosion
        this.mult = bigAdd(joker[VALUE] * 4, this.mult);
        break;
      case 145:
        // Lucky Cat
        this.mult = bigTimes(1 + (joker[VALUE] + this.jokersExtraValue[j]) / 4, this.mult);
        break;
      case 147:
        // Bull
        this.chips += 2 * joker[VALUE] + this.jokersExtraValue[j];
        break;
      case 150:
        // Flash Card
        this.mult = bigAdd(joker[VALUE] * 2, this.mult);
        break;
      case 151:
        // Popcorn
        this.mult = bigAdd(20 - joker[VALUE] * 4, this.mult);
        break;
      case 152:
        // Ramen
        this.mult = bigTimes(2 - joker[VALUE] / 100, this.mult);
        break;
      case 154:
        // Spare Trousers
        if(this.hasTwoPair) {
          this.compiledValues[j] = 1;
          this.mult = bigAdd(2 + joker[VALUE] * 2, this.mult);
        }
        else {
          this.mult = bigAdd(joker[VALUE] * 2, this.mult);
        }
        break;
      case 155:
        // Campfire
        this.mult = bigTimes(1 + joker[VALUE] * 0.25, this.mult);
        break;
    }

    if(joker[EDITION] === POLYCHROME) {
      this.mult = bigTimes(1.5, this.mult);
    }
  }

  triggerCard(card, retrigger = false) {
    if(card[CARD_DISABLED]) return;
    const notStone = card[ENHANCEMENT] !== STONE;

    if(notStone || this.hasVampire) {
      this.chips += cardValues[card[RANK]] + card[EXTRA_CHIPS] + card[EXTRA_EXTRA_CHIPS];
    }

    let luckyMult = 0;
    let luckyMoney = 0;
    let luckyTriggers = 0;

    if(!this.hasVampire) {
      switch(card[ENHANCEMENT]) {
        case BOUNS:
          this.chips += 30;
          break;
        case MULT:
          this.mult = bigAdd(4, this.mult);
          break;
        case GLASS:
          this.mult = bigTimes(2, this.mult);
          break;
        case STONE:
          this.chips += 50;
          break;
        case LUCKY:
          let triggered = false;
          switch(this.randomMode) {
            case 0:
              this.mult = bigAdd(20, this.mult);
              luckyMult++;
              luckyMoney++;
              luckyTriggers++;
              break;
            case 1:
              if(this.chanceMultiplier >= 5) {
                this.mult = bigAdd(20, this.mult);
                luckyMult++;
                triggered = true;
              }
              if(this.chanceMultiplier >= 20) {
                luckyMoney++;
                triggered = true;
              }
              if(triggered) {
                luckyTriggers++;
              }
              break;
            case 2:
              if(Math.random() < 0.2 * this.chanceMultiplier) {
                this.mult = bigAdd(20, this.mult);
                luckyMult++;
                triggered = true;
              }
              if(Math.random() < 1/15 * this.chanceMultiplier) {
                luckyMoney++;
                triggered = true;
              }
              if(triggered) {
                luckyTriggers++;
              }
              break;
          }
          break;
      }
    }

    switch(card[EDITION]) {
      case FOIL:
        this.chips += 50;
        break;
      case HOLOGRAPHIC:
        this.mult = bigAdd(10, this.mult);
        break;
      case POLYCHROME:
        this.mult = bigTimes(1.5, this.mult);
        break;
    }

    const isFace = this.Pareidolia || (notStone && card[RANK] >= JACK && card[RANK] <= KING);

    if(notStone) {
      for(let j = 0; j < this.jokers.length; j++) {
        const joker = this.jokers[j];
        if(joker[JOKER_DISABLED]) continue;
        switch(joker[JOKER]) {
          case 16:
            // Greedy Joker
            if(card[SUIT] === DIAMONDS || (this.SmearedJoker && card[SUIT] === HEARTS)) {
              this.mult = bigAdd(3, this.mult);
            }
            else if(card[SUIT] === true) {
              this.mult = bigAdd(3, this.mult);
            }
            break;
          case 17:
            // Lusty Joker
            if(card[SUIT] === HEARTS || (this.SmearedJoker && card[SUIT] === DIAMONDS)) {
              this.mult = bigAdd(3, this.mult);
            }
            else if(card[SUIT] === true) {
              this.mult = bigAdd(3, this.mult);
            }
            break;
          case 18:
            // Wrathful Joker
            if(card[SUIT] === SPADES || (this.SmearedJoker && card[SUIT] === CLUBS)) {
              this.mult = bigAdd(3, this.mult);
            }
            else if(card[SUIT] === true) {
              this.mult = bigAdd(3, this.mult);
            }
            break;
          case 19:
            // Gluttonous Joker
            if(card[SUIT] === CLUBS || (this.SmearedJoker && card[SUIT] === SPADES)) {
              this.mult = bigAdd(3, this.mult);
            }
            else if(card[SUIT] === true) {
              this.mult = bigAdd(3, this.mult);
            }
            break;
          case 32:
            // Scary Face
            if(isFace) {
              this.chips += 30;
            }
            break;
          case 38:
            // Even Steven
            if(card[RANK] % 2 === 0 && card[RANK] <= _10) {
              this.mult = bigAdd(4, this.mult);
            }
            break;
          case 39:
            // Odd Todd
            if((card[RANK] % 2 === 1 && card[RANK] <= _9) || card[RANK] === ACE) {
              this.chips += 31;
            }
            break;
          case 40:
            // Wee Joker
            if(card[RANK] === _2) {
              this.chips += 8;
            }
            break;
          case 51:
            // Fibonacci
            if(card[RANK] === ACE || card[RANK] === _8 || card[RANK] === _5 || card[RANK] === _3 || card[RANK] === _2) {
              this.mult = bigAdd(8, this.mult);
            }
            break;
          case 63:
            // Scholar
            if(card[RANK] === ACE) {
              this.chips += 20;
              this.mult = bigAdd(4, this.mult);
            }
            break;
          case 76:
            // The Idol
            if(card[SUIT] === Math.abs(joker[VALUE]) % 4 && card[RANK] === Math.floor(Math.abs(joker[VALUE]) / 4) % 13) {
              this.mult = bigTimes(2, this.mult);
            }
            break;
          case 80:
            // Bloodstone
            if(card[SUIT] === HEARTS || (this.SmearedJoker && card[SUIT] === DIAMONDS)) {
              switch(this.randomMode) {
                case 0:
                  this.mult = bigTimes(1.5, this.mult);
                  break;
                case 1:
                  if(this.chanceMultiplier >= 2) {
                    this.mult = bigTimes(1.5, this.mult);
                  }
                  break;
                case 2:
                  if(Math.random() < 1/2 * this.chanceMultiplier) {
                    this.mult = bigTimes(1.5, this.mult);
                  }
                  break;
              }
            }
            else if(card[SUIT] === true) {
              switch(this.randomMode) {
                case 0:
                  this.mult = bigTimes(1.5, this.mult);
                  break;
                case 1:
                  if(this.chanceMultiplier >= 2) {
                    this.mult = bigTimes(1.5, this.mult);
                  }
                  break;
                case 2:
                  if(Math.random() < 1/2 * this.chanceMultiplier) {
                    this.mult = bigTimes(1.5, this.mult);
                  }
                  break;
              }
            }
            break;
          case 81:
            // Arrowhead
            if(card[SUIT] === SPADES || (this.SmearedJoker && card[SUIT] === CLUBS)) {
              this.chips += 50;
            }
            else if(card[SUIT] === true) {
              this.chips += 50;
            }
            break;
          case 82:
            // Onyx Agate
            if(card[SUIT] === CLUBS || (this.SmearedJoker && card[SUIT] === SPADES)) {
              this.mult = bigAdd(7, this.mult);
            }
            else if(card[SUIT] === true) {
              this.mult = bigAdd(7, this.mult);
            }
            break;
          case 84:
            // Triboulet
            if(card[RANK] === KING || card[RANK] === QUEEN) {
              this.mult = bigTimes(2, this.mult);
            }
            break;
          case 110:
            // Hiker
            card[EXTRA_EXTRA_CHIPS] += 5;
            break;
          case 132:
            // Photograph
            if(isFace && (this.jokersExtraValue[j] === card || this.jokersExtraValue[j] === 0)) {
              this.jokersExtraValue[j] = card;
              this.mult = bigTimes(2, this.mult);
            }
            break;
          case 145:
            // Lucky Cat
            this.jokersExtraValue[j] += luckyTriggers;
            break;
          case 147:
            // Bull
            this.jokersExtraValue[j] += luckyMoney * 40;
            break;
          case 156:
            // Smiley Face
            if(isFace) {
              this.mult = bigAdd(5, this.mult);
            }
            break;
          case 157:
            // Ancient Joker
            if(card[ENHANCEMENT] === WILD || (this.SmearedJoker ? card[SUIT] % 2 === Math.abs(joker[VALUE]) % 2 : card[SUIT] === Math.abs(joker[VALUE]) % 4)) {
              this.mult = bigTimes(1.5, this.mult);
            }
            break;
          case 158:
            // Walkie Talkie
            if(card[RANK] === _4 || card[RANK] === _10) {
              this.chips += 10;
              this.mult = bigAdd(4, this.mult);
            }
            break;
        }
      }
    }
    else if(isFace) {
      for(let j = 0; j < this.jokers.length; j++) {
        const joker = this.jokers[j];
        if(joker[JOKER_DISABLED]) continue;
        switch(joker[JOKER]) {
          case 32:
            // Scary Face
            this.chips += 30;
            break;
          case 110:
            // Hiker
            card[EXTRA_EXTRA_CHIPS] += 5;
            break;
          case 132:
            // Photograph
            if(this.jokersExtraValue[j] === card || this.jokersExtraValue[j] === 0) {
              this.jokersExtraValue[j] = card;
              this.mult = bigTimes(2, this.mult);
            }
            break;
          case 156:
            // Smiley Face
            this.mult = bigAdd(5, this.mult);
            break;
        }
      }
    }
    else {
      for(let j = 0; j < this.jokers.length; j++) {
        const joker = this.jokers[j];
        if(joker[JOKER_DISABLED]) continue;
        switch(joker[JOKER]) {
          case 110:
            // Hiker
            card[EXTRA_EXTRA_CHIPS] += 4;
            break;
        }
      }
    }

    // retriggers
    if(!retrigger) {
      if(card[SEAL] === RED_SEAL) {
        this.triggerCard(card, true);
      }

      for(let j = 0; j < this.jokers.length; j++) {
        const joker = this.jokers[j];
        if(joker[JOKER_DISABLED]) continue;
        switch(joker[JOKER]) {
          case 13:
            // Sock and Buskin
            if(isFace) {
              this.triggerCard(card, true);
            }
            break;
          case 25:
            // Hack
            if(card[RANK] <= _5) {
              this.triggerCard(card, true);
            }
            break;
          case 69:
            // Hanging Chad
            if(this.jokersExtraValue[j] === 0) {
              this.jokersExtraValue[j]++;
              this.triggerCard(card, true);
              this.triggerCard(card, true);
            }
            break;
          case 74:
            // Dusk
            if(joker[VALUE] !== 0) {
              this.triggerCard(card, true);
            }
            break;
          case 153:
            // Seltzer
            this.triggerCard(card, true);
            break;
        }
      }
    }
  }

  triggerCardInHand(card, retrigger = false) {
    if(card[CARD_DISABLED]) return;

    // apply steel cards
    if(card[ENHANCEMENT] === STEEL && !card[CARD_DISABLED]) {
      this.compiledInHandPlusMult = bigTimes(1.5, this.compiledInHandPlusMult);
      this.compiledInHandTimesMult = bigTimes(1.5, this.compiledInHandTimesMult);
    }

    for(let j = 0; j < this.jokers.length; j++) {
      const joker = this.jokers[j];
      if(joker[JOKER_DISABLED]) continue;
      switch (joker[JOKER]) {
        case 28:
          // Raised Fist
          if(card === this.compiledValues[j] && card[ENHANCEMENT] !== STONE) {
            this.compiledInHandPlusMult = bigAdd(2 * (card[RANK] === ACE ? 11 : Math.min(10, card[RANK] + 2)), this.compiledInHandPlusMult);
          }
          break;
        case 62:
          // Shoot the Moon
          if(card[RANK] === QUEEN && card[ENHANCEMENT] !== STONE) {
            this.compiledInHandPlusMult = bigAdd(13, this.compiledInHandPlusMult);
          }
          break;
        case 126:
          // Baron
          if(card[RANK] === KING && card[ENHANCEMENT] !== STONE) {
            this.compiledInHandPlusMult = bigTimes(1.5, this.compiledInHandPlusMult);
            this.compiledInHandTimesMult = bigTimes(1.5, this.compiledInHandTimesMult);
          }
          break;
      }
    }

    // retriggers
    if(!retrigger) {
      if(card[SEAL] === RED_SEAL) {
        this.triggerCardInHand(card, true);
      }

      for(let j = 0; j < this.jokers.length; j++) {
        const joker = this.jokers[j];
        if(joker[JOKER_DISABLED]) continue;
        switch(joker[JOKER]) {
          case 14:
            this.triggerCardInHand(card, true);
            break;
        }
      }
    }
  }

  getTypeOfHand() {
    // ES2019 apparently mandates stable sort
    const sortedCards = this.cards.filter(a => a[ENHANCEMENT] !== STONE).sort((a, b) => b[RANK] - a[RANK]);

    let flush = [];

    let straight = false;

    if(sortedCards.length >= (this.FourFingers ? 4 : 5)) {
      const lines = [
        [sortedCards[0]],
        [sortedCards[1]],
      ];
      if(this.FourFingers) {
        lines.push([sortedCards[2]]);
      }

      for(let i = 1; i < sortedCards.length; i++) {
        for(let l = 0; l < lines.length; l++) {
          const val = lines[l][lines[l].length - 1][RANK];
          if(sortedCards[i][RANK] + 1 === val) {
            lines.push([...lines[l], sortedCards[i]]);
          }
          else if(this.Shortcut && sortedCards[i][RANK] + 2 === val) {
            lines.push([...lines[l], sortedCards[i]]);
          }
        }
      }

      for(let i = 0; i < sortedCards.length; i++) {
        for(let l = 0; l < lines.length; l++) {
          const val = lines[l][lines[l].length - 1][RANK];
          if(val === _2 && sortedCards[i][0] === ACE) {
            lines.push([...lines[l], sortedCards[i]]);
          }
          else if(this.Shortcut && val === _3 && sortedCards[i][0] === ACE) {
            lines.push([...lines[l], sortedCards[i]]);
          }
        }
      }

      let flushes = [
        [],[],[],[]
      ];

      for(let c = 0; c < this.cards.length; c++) {
        const card = this.cards[c];
        for(let i = 0; i < 4; i++) {
          if(card[ENHANCEMENT] !== STONE && (card[ENHANCEMENT] === WILD || (this.SmearedJoker ? card[SUIT] % 2 == i : card[SUIT] === i))) {
            flushes[i].push(card);
          }
        }
      }

      for(let i = 0; i < flushes.length; i++) {
        if(flushes[i].length > flush.length) {
          flush = flushes[i];
        }
      }

      if(lines[lines.length - 1].length >= (this.FourFingers ? 4 : 5)) {
        straight = lines[lines.length - 1];
      }
    }

    if(flush.length < (this.FourFingers ? 4 : 5)) flush = false;

    if(flush) {
      this.hasFlush = true;
    }

    if(straight) {
      this.hasStraight = true;
    }

    if(sortedCards.length >= 4 && (
      sortedCards[0][RANK] === sortedCards[3][RANK] ||
      (sortedCards.length >= 5 && sortedCards[1][RANK] === sortedCards[4][RANK])
    )) {
      this.hasPair = true;
      this.hasThreeOfAKind = true;
      this.hasFourOfAKind = true;
    }
    else if(sortedCards.length >= 3 && (
        (sortedCards[0][RANK] === sortedCards[1][RANK] && sortedCards[1][RANK] === sortedCards[2][RANK]) ||
        (sortedCards.length >= 4 && (
          (sortedCards[1][RANK] === sortedCards[2][RANK] && sortedCards[2][RANK] === sortedCards[3][RANK]) ||
          (sortedCards.length >= 5 && sortedCards[2][RANK] === sortedCards[3][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK])
        )))) {
      this.hasPair = true;
      this.hasThreeOfAKind = true;
    }
    else if(sortedCards.length >= 2 &&
      (sortedCards[0][RANK] === sortedCards[1][RANK] ||
      (sortedCards.length >= 3 &&
        (sortedCards[1][RANK] === sortedCards[2][RANK] ||
        (sortedCards.length >= 4 &&
          (sortedCards[2][RANK] === sortedCards[3][RANK] ||
          (sortedCards.length >= 5 && sortedCards[3][RANK] === sortedCards[4][RANK])
        )))))) {
      this.hasPair = true;
    }

    if(sortedCards.length >= 4) {
      if(sortedCards[0][RANK] === sortedCards[1][RANK]) {
        if(sortedCards[2][RANK] === sortedCards[3][RANK]) {
          this.hasTwoPair = true;
        }
        if(sortedCards.length >= 5 && sortedCards[3][RANK] === sortedCards[4][RANK]) {
          this.hasTwoPair = true;
        }
      }
      if(sortedCards.length >= 5 && sortedCards[1][RANK] === sortedCards[2][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK]) {
        this.hasTwoPair = true;
      }
    }

    // flush five
    if(flush && sortedCards.length === 5 && sortedCards[0][RANK] === sortedCards[4][RANK]) {
      return [FLUSH_FIVE, this.cards];
    }

    // flush house
    if(flush && sortedCards.length === 5 && sortedCards[0][RANK] === sortedCards[1][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK] && (sortedCards[1][RANK] === sortedCards[2][RANK] || sortedCards[2][RANK] === sortedCards[3][RANK])) {
      return [FLUSH_HOUSE, this.cards];
    }

    // five of a kind
    if(sortedCards.length === 5 && sortedCards[0][RANK] === sortedCards[4][RANK]) {
      return [FIVE_OF_A_KIND, this.cards];
    }

    // straight flush
    if(straight && flush) {
      return [STRAIGHT_FLUSH, [...new Set([...straight, ...flush])]];
    }

    // four of a kind
    if(sortedCards.length >= 4) {
      if(sortedCards[0][RANK] === sortedCards[3][RANK]) {
        return [FOUR_OF_A_KIND, [
          sortedCards[0],
          sortedCards[1],
          sortedCards[2],
          sortedCards[3]
        ]];
      }
      if(sortedCards.length >= 5 && sortedCards[1][RANK] === sortedCards[4][RANK]) {
        return [FOUR_OF_A_KIND, [
          sortedCards[1],
          sortedCards[2],
          sortedCards[3],
          sortedCards[4]
        ]];
      }
    }

    // full house
    if(sortedCards.length === 5 && sortedCards[0][RANK] === sortedCards[1][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK] && (sortedCards[1][RANK] === sortedCards[2][RANK] || sortedCards[2][RANK] === sortedCards[3][RANK])) {
      return [FULL_HOUSE, this.cards];
    }

    // flush
    if(flush) {
      return [FLUSH, flush];
    }

    // straight
    if(straight) {
      return [STRAIGHT, straight];
    }

    // three of a kind
    if(sortedCards.length >= 3) {
      if(sortedCards[0][RANK] === sortedCards[1][RANK] && sortedCards[1][RANK] === sortedCards[2][RANK]) {
        return [THREE_OF_A_KIND, [sortedCards[0], sortedCards[1], sortedCards[2]]];
      }
      if(sortedCards.length >= 4) {
        if(sortedCards[1][RANK] === sortedCards[2][RANK] && sortedCards[2][RANK] === sortedCards[3][RANK]) {
          return [THREE_OF_A_KIND, [sortedCards[1], sortedCards[2], sortedCards[3]]];
        }
        if(sortedCards.length >= 5 && sortedCards[2][RANK] === sortedCards[3][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK]) {
          return [THREE_OF_A_KIND, [sortedCards[2], sortedCards[3], sortedCards[4]]];
        }
      }
    }

    // two pair
    if(sortedCards.length >= 4) {
      if(sortedCards[0][RANK] === sortedCards[1][RANK]) {
        if(sortedCards[2][RANK] === sortedCards[3][RANK]) {
          return [TWO_PAIR, [sortedCards[0], sortedCards[1], sortedCards[2], sortedCards[3]]];
        }
        if(sortedCards.length >= 5 && sortedCards[3][RANK] === sortedCards[4][RANK]) {
          return [TWO_PAIR, [sortedCards[0], sortedCards[1], sortedCards[3], sortedCards[4]]];
        }
      }
      if(sortedCards.length >= 5 && sortedCards[1][RANK] === sortedCards[2][RANK] && sortedCards[3][RANK] === sortedCards[4][RANK]) {
        return [TWO_PAIR, [sortedCards[1], sortedCards[2], sortedCards[3], sortedCards[4]]];
      }
    }

    // pair
    if(sortedCards.length >= 2) {
      if(sortedCards[0][RANK] === sortedCards[1][RANK]) {
        return [PAIR, [sortedCards[0], sortedCards[1]]];
      }
      if(sortedCards.length >= 3) {
        if(sortedCards[1][RANK] === sortedCards[2][RANK]) {
          return [PAIR, [sortedCards[1], sortedCards[2]]];
        }
        if(sortedCards.length >= 4) {
          if(sortedCards[2][RANK] === sortedCards[3][RANK]) {
            return [PAIR, [sortedCards[2], sortedCards[3]]];
          }
          if(sortedCards.length >= 5 && sortedCards[3][RANK] === sortedCards[4][RANK]) {
            return [PAIR, [sortedCards[3], sortedCards[4]]];
          }
        }
      }
    }

    // none
    if(sortedCards.length === 0) {
      return [HIGH_CARD, []];
    }

    // high-card
    return [HIGH_CARD, [sortedCards[0]]];
  }

  // knowledge of joker order and cards-played (not their order)
  compileCards() {
    this.hasPair = false;
    this.hasTwoPair = false;
    this.hasThreeOfAKind = false;
    this.hasFourOfAKind = false;
    this.hasStraight = false;
    this.hasFlush = false;

    this.Vampire = false;

    this.compiledChips = 0;
    this.compiledMult = [1, 0];

    this.compiledInHandPlusMult = [0, 0];
    this.compiledInHandTimesMult = [1, 0];

    if(this.actualCardsInHand.length === 0) {
      this.actualCardsInHand = this.cardsInHand.slice();
    }
    else {
      this.cardsInHand = this.actualCardsInHand.slice();
    }

    this.lowestCard = false;

    for(let c = 0; c < this.cards.length; c++) {
      if(this.cards[c][ENHANCEMENT] === WILD) {
        this.cards[c][SUIT] = true;
      }
    }

    // get hand type
    [this.typeOfHand, this.involvedCards] = this.getTypeOfHand();

    if(this.Splash) {
      this.involvedCards = this.cards;
    }

    if(this.typeOfHand >= 0) {
      this.compiledChips = handChips[this.typeOfHand][0] + handChips[this.typeOfHand][2] * (this.hands[this.typeOfHand][LEVEL] - 1);
      this.compiledMult = [handChips[this.typeOfHand][1] + handChips[this.typeOfHand][3] * (this.hands[this.typeOfHand][LEVEL] - 1), 0];

      if(this.TheFlint) {
        this.compiledChips /= 2;
        this.compiledMult[0] /= 2;
      }
    }

    // resolve jokers that require knowledge of hand
    for(let j = 0; j < this.jokers.length; j++) {
      const joker = this.jokers[j];
      if(joker[JOKER_DISABLED]) continue;

      const oldCompiledValue = this.compiledValues[j];
      this.compiledValues[j] = 0;

      switch(joker[JOKER]) {
        case 9:
          // Stone Joker
          this.compiledChips += joker[VALUE] * 25;
          if(this.hasVampire) {
            for(let c = 0; c < this.involvedCards.length; c++) {
              if(this.involvedCards[c][ENHANCEMENT] === STONE) {
                this.compiledChips -= 25;
              }
            }
          }
          break;
        case 21:
          // Banner
          this.compiledChips += joker[VALUE] * 30;
          break;
        case 27:
          // Steel Joker
          if(this.hasVampire) {
            let amount = joker[VALUE];
            for(let c = 0; c < this.involvedCards.length; c++) {
              if(this.involvedCards[c][ENHANCEMENT] === STEEL) {
                amount++;
              }
            }
            this.compiledValues[j] = 1 + (joker[VALUE] - amount) * 0.2;
          }
          else {
            this.compiledValues[j] = 1 + joker[VALUE] * 0.2;
          }
          break;
        case 28:
          // Raised Fist
          // find lowest card
          let lowest = 100;
          let lowestCards = [];
          for(let c = 0; c < this.cardsInHand.length; c++) {
            const card = this.cardsInHand[c];
            if(card[ENHANCEMENT] !== STONE) {
              if(lowest > card[RANK]) {
                lowest = card[RANK];
                lowestCards = [card];
              }
              else if(lowest === card[RANK]) {
                lowestCards.push(card);
              }
            }
          }

          if(lowestCards.length > 0) {
            this.compiledValues[j] = lowestCards[lowestCards.length - 1];
          }
          break;
        case 31:
          // Glass Joker
          if(this.hasVampire) {
            let amount = joker[VALUE];
            for(let c = 0; c < this.cards.length; c++) {
              if(this.cards[c][ENHANCEMENT] === GLASS) {
                switch(this.randomMode) {
                  case 0:
                    amount++;
                    break;
                  case 1:
                    if(this.chanceMultiplier >= 4) {
                      amount++;
                    }
                    break;
                  case 2:
                    if(Math.random() < 0.25 * this.chanceMultiplier) {
                      amount++;
                    }
                    break;
                }
              }
            }
            this.compiledValues[j] = 1 + (joker[VALUE] - amount) * 0.75;
          }
          else {
            this.compiledValues[j] = 1 + joker[VALUE] * 0.75;
          }
          break;
        case 40:
          // Wee Joker
          this.compiledChips += joker[VALUE] * 8;
          break;
        case 44:
          // Seeing Double
          if(this.SmearedJoker) {
            let club = 0;
            let nonClub = 0;
            for(let c = 0; c < this.involvedCards.length; c++) {
              if(this.involvedCards[c][CARD_DISABLED]) continue;
              if(this.involvedCards[c][ENHANCEMENT] === STONE) continue;
              if(this.involvedCards[c][ENHANCEMENT] === WILD ||
                this.involvedCards[c][SUIT] === CLUBS ||
                this.involvedCards[c][SUIT] === SPADES) {
                club++;
              }
              else {
                nonClub++;
              }
            }

            if(club > 0 && (club > 1 || nonClub > 0)) {
              this.compiledValues[j] = true;
            }
          }
          else {
            let club = false;
            let nonClub = false;
            let wildC = 0;
            for(let c = 0; c < this.involvedCards.length; c++) {
              if(this.involvedCards[c][CARD_DISABLED]) continue;
              if(this.involvedCards[c][ENHANCEMENT] === STONE) continue;
              if(this.involvedCards[c][ENHANCEMENT] === WILD) {
                wildC++;
              }
              else if(this.involvedCards[c][SUIT] === CLUBS) {
                club = true;
              }
              else {
                nonClub = true;
              }
            }
            for(let i = 0; i < wildC; i++) {
              if(!club) club = true;
              else nonClub = true;
            }

            if(club && nonClub) {
              this.compiledValues[j] = true;
            }
          }
          break;
        case 60:
          // Flower Pot
          let hearts = 0;
          let diamonds = 0;
          let clubs = 0;
          let spades = 0;
          let wild = 0;
          for(let c = 0; c < this.involvedCards.length; c++) {
            if(this.involvedCards[c][CARD_DISABLED] && this.involvedCards[c][ENHANCEMENT] === WILD) continue;// seems to be a bug in balatro itself, remove when fixed?
            if(this.involvedCards[c][ENHANCEMENT] !== STONE) {
              if(this.involvedCards[c][ENHANCEMENT] === WILD && !this.involvedCards[c][CARD_DISABLED]) {
                wild++;
              }
              else if(this.involvedCards[c][SUIT] === HEARTS) {
                hearts = 1;
              }
              else if(this.involvedCards[c][SUIT] === DIAMONDS) {
                diamonds = 1;
              }
              else if(this.involvedCards[c][SUIT] === CLUBS) {
                clubs = 1;
              }
              else if(this.involvedCards[c][SUIT] === SPADES) {
                spades = 1;
              }
            }
          }
          if(hearts + diamonds + clubs + spades + wild >= 4) {
            this.compiledValues[j] = true;
          }
          break;
        case 61:
          // Ride the Bus
          if(!this.Pareidolia) {
            let playedFace = false;
            for(let c = 0; c < this.involvedCards.length; c++) {
              if(this.involvedCards[c][CARD_DISABLED]) continue;
              if(this.involvedCards[c][ENHANCEMENT] !== STONE && this.involvedCards[c][RANK] >= JACK && this.involvedCards[c][RANK] <= KING) {
                playedFace = true;
                break;
              }
            }
            if(!playedFace) {
              this.compiledValues[j] = joker[VALUE] + 1;
            }
          }
          break;
        case 68:
          // Stuntman
          this.compiledChips += 250;
          break;
        case 102:
          // Blackboard
          let allBlack = true;
          for(let c = 0; c < this.cardsInHand.length; c++) {
            if(this.cardsInHand[c][ENHANCEMENT] === STONE || (this.cardsInHand[c][ENHANCEMENT] !== WILD && (this.cardsInHand[c][SUIT] === HEARTS || this.cardsInHand[c][SUIT] === DIAMONDS))) {
              allBlack = false;
              break;
            }
          }
          if(allBlack) {
            this.compiledValues[j] = true;
          }
          break;
        case 103:
          // Runner
          if(this.hasStraight) {
            this.compiledChips += 15 * (joker[VALUE] + 1);
          }
          else {
            this.compiledChips += 15 * joker[VALUE];
          }
          break;
        case 104:
          // Ice Cream
          this.compiledChips += 100 - 5 * joker[VALUE];
          break;
        case 105:
          // DNA
          if(this.cards.length === 1) {
            this.cardsInHand.push(this.cards[0]);
          }
          break;
        case 107:
          //Blue joker
          this.compiledChips += 104 + 2 * joker[VALUE];
          break;
        case 119:
          // Square Joker
          if(this.cards.length === 4) {
            this.compiledChips += 4 * (joker[VALUE] + 1);
          }
          else {
            this.compiledChips += 4 * joker[VALUE];
          }
          break;
        case 122:
          // Vampire
          this.compiledValues[j] = joker[VALUE];
          if(this.Vampire) {
            break;
          }
          this.Vampire = true;
          for(let c = 0; c < this.involvedCards.length; c++) {
            const card = this.involvedCards[c];
            if((this.MidasMaskas && card[RANK] >= JACK && card[RANK] <= KING) || (this.MidasMaskas && this.Pareidolia)) {
              this.compiledValues[j]++;
            }
            else {
              if(card[ENHANCEMENT] > 0) {
                this.compiledValues[j]++;
              }
            }
          }
          break;
        case 129:
          // Obelisk
          let mostPlayed = 0;
          for(let h = 0; h < this.hands.length; h++) {
            if(this.hands[h][PLAYED] > mostPlayed) {
              mostPlayed = this.hands[h][PLAYED];
            }
          }
          if(this.hands[this.typeOfHand][PLAYED] === mostPlayed) {
            this.compiledValues[j] = 1;
          }
          else {
            this.compiledValues[j] = 1 + (joker[VALUE] + 1) / 5;
          }
          break;
        case 140:
          // Sly Joker
          if(this.hasPair) {
            this.compiledChips += 50;
          }
          break;
        case 141:
          // Wily Joker
          if(this.hasThreeOfAKind) {
            this.compiledChips += 100;
          }
          break;
        case 142:
          // Clever Joker
          if(this.hasTwoPair && !this.hasFourOfAKind) {
            this.compiledChips += 80;
          }
          break;
        case 143:
          // Devious Joker
          if(this.hasStraight) {
            this.compiledChips += 100;
          }
          break;
        case 144:
          // Crafty Joker
          if(this.hasFlush) {
            this.compiledChips += 80;
          }
          break;
        case 159:
          // Castle
          this.compiledChips += joker[VALUE] * 3;
          break;
        default:
          this.compiledValues[j] = oldCompiledValue;
      }
    }

    // Blueprint or Brainstorm compiled value
    for(let j = 0; j < this.actualJokers.length; j++) {
      const joker = this.actualJokers[j];
      if(joker[JOKER_DISABLED]) continue;

      switch(joker[JOKER]) {
        case 30:
        case 77:
          // Blueprint
          this.compiledValues[j] = this.compiledValues[this.cardCast[j]];
          break;
      }
    }

    // trigger cards-in-hand
    for(let c = 0; c < this.cardsInHand.length; c++) {
      this.triggerCardInHand(this.cardsInHand[c]);
    }
  }

  // knowledge of joker order, not cards-played
  compileJokerOrder() {
    this.jokerRarities = [];
    this.compiledValues = [];
    this.cardCast = [];

    this.BaseballCard = 0;

    this.actualJokers = this.jokers.map(a => a.slice());

    // resolve jokers that are card but not joker order agnostic
    for(let j = 0; j < this.jokers.length; j++) {
      const joker = this.jokers[j];

      this.compiledValues.push(0);
      this.jokerRarities.push(jokerRarity[this.actualJokers[j][JOKER]]);

      if(joker[JOKER_DISABLED]) continue;

      let resolved = false;
      switch(joker[JOKER]) {
        case 30:
          // resolve Blueprint
          if(j + 1 < this.jokers.length) {
            let at = j + 1;
            let t = 0;
            while(!resolved && t++ < this.jokers.length) {
              switch(this.jokers[at][JOKER]) {
                case 30:
                  if(at + 1 < this.jokers.length) {
                    at++;
                  }
                  break;
                case 77:
                  if(at !== 0 && this.jokers[0][0] !== 77) {
                    at = 0;
                  }
                  break;
                default:
                  resolved = true;
              }
            }
            if(resolved) {
              this.jokers[j][JOKER] = this.jokers[at][JOKER];
              this.jokers[j][VALUE] = this.jokers[at][VALUE];
              this.jokers[j][JOKER_DISABLED] = this.jokers[at][JOKER_DISABLED];
              this.cardCast[j] = at;
              j--;
              this.compiledValues.pop();
              this.jokerRarities.pop();
            }
          }
          break;
        case 59:
          // resolve Swashbuckler
          for(let k = 0; k < this.jokers.length; k++) {
            if(k == j){
              continue;
            }
            this.compiledValues[j] += this.jokers[k][SELL_VALUE];
          }
          break;
        case 77:
          // resolve Brainstorm
          if(j > 0 && this.jokers[0][0] !== 77) {
            let at = 0;
            let t = 0;
            while(!resolved && t++ < this.jokers.length) {
              switch(this.jokers[at][JOKER]) {
                case 30:
                  if(at + 1 < this.jokers.length) {
                    at++;
                  }
                  break;
                case 77:
                  if(at !== 0 && this.jokers[0][0] !== 77) {
                    at = 0;
                  }
                  break;
                default:
                  resolved = true;
              }
            }
            if(resolved) {
              this.jokers[j][JOKER] = this.jokers[at][JOKER];
              this.jokers[j][VALUE] = this.jokers[at][VALUE];
              this.jokers[j][JOKER_DISABLED] = this.jokers[at][JOKER_DISABLED];
              this.cardCast[j] = at;
              j--;
              this.compiledValues.pop();
              this.jokerRarities.pop();
            }
          }
          break;
        case 146:
          // Baseball Card
          this.BaseballCard++;
          break;
      }
    }
  }

  // knowledge of jokers, not joker order or cards-played
  compileJokers() {
    // set standard values; probability modifier (Oops! All 6s), vampire, etc.

    // set global variables' default values
    this.actualCardsInHand = [];

    this.chanceMultiplier = 1;

    this.FourFingers = false;
    this.Shortcut = false;
    this.Pareidolia = false;
    this.SmearedJoker = false;

    this.RaisedFist = false;
    this.Splash = false;
    this.MidasMaskas = false;

    this.hasVampire = false;

    // resolve joker global effects that are card and joker order agnostic
    for(let j = 0; j < this.jokers.length; j++) {
      const joker = this.jokers[j];
      if(joker[JOKER_DISABLED]) continue;
      switch(joker[JOKER]) {
        case 28:
          this.RaisedFist = true;
          break;
        case 36:
          this.Pareidolia = true;
          break;
        case 64:
          this.SmearedJoker = true;
          break;
        case 65:
          this.chanceMultiplier *= 2;
          break;
        case 66:
          this.FourFingers = true;
          break;
        case 106:
          this.Splash = true;
          break;
        case 122:
          this.hasVampire = true;
          break;
        case 123:
          this.Shortcut = true;
          break;
        case 130:
          this.MidasMaskas = true;
          break;
      }
    }
  }

  compileAll() {
    this.compileJokers();
    this.compileJokerOrder();
    this.compileCards();
  }

  // simulate what wasn't compiled
  simulate() {
    this.chips = this.compiledChips;
    this.mult = [this.compiledMult[0], this.compiledMult[1]];
    this.jokersExtraValue = [];

    if(this.TheEye && this.hands[this.typeOfHand][PLAYED_THIS_ROUND]) {
      return [1, -10, 0, [0,0]];
    }

    for(let j = 0; j < this.jokers.length; j++) {
      this.jokersExtraValue.push(0);
    }

    // score cards
    for(let c = 0; c < this.cards.length; c++) {
      const card = this.cards[c];
      card[EXTRA_EXTRA_CHIPS] = 0;

      if(card[ENHANCEMENT] === STONE || this.involvedCards.indexOf(card) >= 0) {
        this.triggerCard(card);
      }
      else {
        for(let j = 0; j < this.jokers.length; j++) {
          const joker = this.jokers[j];
          if(joker[JOKER_DISABLED]) continue;
          switch(joker[JOKER]) {
            // Hanging Chad
            case 69:
              this.jokersExtraValue[j]++;
            break;
          }
        }
      }
    }

    // score cards-in-hand
    this.mult = bigBigTimes(this.compiledInHandTimesMult, this.mult);
    this.mult = bigBigAdd(this.compiledInHandPlusMult, this.mult);

    // score jokers
    for(let j = 0; j < this.jokers.length; j++) {
      this.triggerJoker(this.jokers[j], j);

      if(this.BaseballCard && this.jokerRarities[j] === 2 && !this.jokers[j][JOKER_DISABLED]) {
        for(let i = 0; i < this.BaseballCard; i++) {
          this.mult = bigTimes(1.5, this.mult);
        }
      }
    }

    // Observatory
    if(this.Observatory) {
      const ObservatoryScore = this.hands[this.typeOfHand][PLANETS];
      this.mult = bigTimes(1.5 ** ObservatoryScore, this.mult);
    }

    if(this.PlasmaDeck) {
      this.mult = bigAdd(this.chips, this.mult);
      this.mult = bigTimes(0.5, this.mult);

      if(this.mult[1] === 0) {
        this.mult[0] = Math.floor(this.mult[0]);
      }
      return [...normalizeBig(bigBigTimes(this.mult, this.mult)), normalizeBig(this.mult), normalizeBig(this.mult)];
    }

    return [...normalizeBig(bigTimes(this.chips, this.mult)), this.chips, normalizeBig(this.mult)];
  }

  simulateBestHand() {
    this.randomMode = 0;
    return this.simulate();
  }

  simulateWorstHand() {
    this.randomMode = 1;
    return this.simulate();
  }

  simulateRandomHand() {
    this.randomMode = 2;
    return this.simulate();
  }
};
