"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadHand(sourceFile) {
  const context = vm.createContext({});
  const source = fs.readFileSync(path.join(__dirname, "..", sourceFile), "utf8");
  vm.runInContext(source, context, { filename: sourceFile });
  return vm.runInContext("Hand", context);
}

function card(rank, suit) {
  return [rank, suit, 0, 0, 0, 0, false, 0, 0];
}

for(const sourceFile of ["balatro-sim.js", "breakdown.js"]) {
  test(`${sourceFile} scores duplicate ranks in a Four Fingers straight`, () => {
    const Hand = loadHand(sourceFile);
    const cards = [
      card(0, 0),
      card(1, 1),
      card(1, 2),
      card(2, 3),
      card(3, 0)
    ];
    const hand = new Hand({ cards });
    hand.FourFingers = true;

    const [handType, involvedCards] = hand.getTypeOfHand();
    const involvedRanks = Array.from(involvedCards, involvedCard => involvedCard[0]).sort((a, b) => a - b);

    assert.equal(handType, 7);
    assert.deepEqual(involvedRanks, [0, 1, 1, 2, 3]);
  });
}
