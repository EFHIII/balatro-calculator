const THREADS = navigator.hardwareConcurrency;

const threads = [];

let taskID = Math.random();
let tasks = 0;

let bestScore;
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

let minimize = false;
let optimizeMode = 0;

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

    for (let i = 0; i < arr.length; i++) {
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

function getEdition(modifiers) {
  if(modifiers.foil) return 1;
  if(modifiers.holographic) return 2;
  if(modifiers.polychrome) return 3;
  //if(modifiers.negative) return 4;
  return 0;
}

function getEnhancement(modifiers) {
  if(modifiers.increment) return 1;
  if(modifiers.mult) return 2;
  if(modifiers.wild) return 3;
  if(modifiers.glass) return 4;
  if(modifiers.steel) return 5;
  if(modifiers.stone) return 6;
  //if(modifiers.gold) return 7;
  if(modifiers.chance) return 8;
  return 0;
}

let breakdownHand = new Hand();

function terminateThreads() {
  for(let i = 0; i < threads.length; i++) {
    threads[i].terminate();
  }

  let state = {
    cards: Object.keys(playfieldCards).map((a, index) => {
      return [
        playfieldCards[a].type[1],
        playfieldCards[a].type[0],
        getEdition(playfieldCards[a].modifiers),
        getEnhancement(playfieldCards[a].modifiers),
        playfieldCards[a].modifiers.double ? 2 : 0,
        0, // extra chips
        playfieldCards[a].modifiers.disabled,
        index
      ];
    }),
    hands: hands.map(a => {
      return [
        a.level,
        a.planets,
        a.played,
        a.playedThisRound
      ];
    }),
    TheFlint: theFlint,
    PlasmaDeck: plasmaDeck,
    Observatory: observatory,
    taskID,
    optimizeCards,
    minimize,
    optimizeMode,
    bestHand: bestHand.map(a => {
      return Object.keys(playfieldCards).indexOf(a);
    }),
    jokers: Object.keys(playfieldJokers).map((a, index) => {
      return [
        playfieldJokers[a].type[0] * 10 + playfieldJokers[a].type[1],
        playfieldJokers[a].value,
        getEdition(playfieldJokers[a].modifiers),
        playfieldJokers[a].modifiers.disabled,
        playfieldJokers[a].sell,
        index
      ];
    })
  };

  breakdownHand.TheFlint = theFlint;
  breakdownHand.PlasmaDeck = plasmaDeck;
  breakdownHand.Observatory = observatory;
  breakdownHand.hands = state.hands;

  for(let i = 0; i < THREADS; i++) {
    threads[i] = new Worker('worker.js');
    threads[i].onmessage = workerMessage;
    threads[i].postMessage(['start', state]);
  }
}

let tmpBestJokers;
let tmpBestCards;
let tmpBestHighHand;
let tmpBestLowHand;
let tmpTypeOfHand;

function workerMessage(msg) {
  if(msg.data[0] === taskID) {
    tasks--;
    // id, bestScore, bestJokers, bestCards, high, low
    if(!bestScore) {
      bestScore = msg.data[1];
      tmpBestJokers = msg.data[2];
      tmpBestCards = msg.data[3];
      tmpBestHighHand = msg.data[4];
      tmpBestLowHand = msg.data[5];
      tmpTypeOfHand = msg.data[6];
    }
    if(msg.data[1][1] > bestScore[1] || (msg.data[1][1] === bestScore[1] && msg.data[1][0] > bestScore[0])) {
      bestScore = msg.data[1];
      tmpBestJokers = msg.data[2];
      tmpBestCards = msg.data[3];
      tmpBestHighHand = msg.data[4];
      tmpBestLowHand = msg.data[5];
      tmpTypeOfHand = msg.data[6];
    }
    if(tasks === 0) {
      bestJokers = tmpBestJokers.map(a => {
        return Object.keys(playfieldJokers)[a[5]];
      });
      bestHand = tmpBestCards.map(a => {
        return Object.keys(playfieldCards)[a[7]];
      });

      if(tmpBestHighHand[0] === tmpBestLowHand[0] && tmpBestHighHand[1] === tmpBestLowHand[1]) {
        bestPlayScoreDiv.innerHTML = chipIcon + bigNumberWithCommas(tmpBestHighHand, true);
        bestPlayNameDiv.innerHTML = hands[tmpTypeOfHand].name + `<span class="nameLvl" style="color: ${hands[tmpTypeOfHand].level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hands[tmpTypeOfHand].level)/6)*6+hands[tmpTypeOfHand].level+4)%6)+1]}"> lvl.${hands[tmpTypeOfHand].level}</span>`;
        scoreChipsDiv.innerText = numberWithCommas(tmpBestLowHand[2]);
        scoreMultDiv.innerText = bigNumberWithCommas(tmpBestLowHand[3]);
      }
      else {
        bestPlayScoreDiv.innerHTML = bigNumberWithCommas(tmpBestLowHand, true) + ' &lt;' + chipIcon + '&lt; ' + bigNumberWithCommas(tmpBestHighHand, true);
        bestPlayNameDiv.innerHTML = hands[tmpTypeOfHand].name + `<span class="nameLvl" style="color: ${hands[tmpTypeOfHand].level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hands[tmpTypeOfHand].level)/6)*6+hands[tmpTypeOfHand].level+4)%6)+1]}"> lvl.${hands[tmpTypeOfHand].level}</span>`;
        scoreChipsDiv.innerText = '>' + numberWithCommas(tmpBestLowHand[2]);
        scoreMultDiv.innerText = '>' + bigNumberWithCommas(tmpBestLowHand[3]);
      }

      redrawPlayfieldHTML();

      document.body.style.cursor = '';

      breakdownHand.jokers = tmpBestJokers;
      breakdownHand.cards = tmpBestCards;
      breakdownHand.compileAll();
      breakdownHand.simulateWorstHand();
      updateBreakdown(breakdownHand.breakdown.map(a => {
        return {
          ...a,
          cards: a.cards.map(b => b[7] === undefined ? Object.keys(playfieldJokers)[b[5]] : Object.keys(playfieldCards)[b[7]])
        }
      }));
    }
  }
}

function updateBreakdown(breakdown) {
  breakdownHTML = '';
  let previousChips = 0;
  let previousMult = 0;
  for(let line of breakdown) {
    let breakdownScore = '<div class="levelStat" style="visibility: hidden;"><span id="scoreChips" class="levelStatB"></span>X<span id="scoreMult" class="levelStatR"></span></div>';
    let breakdownCards = '';
    for(let id of line.cards) {
      if(id[0] === 'j') {
        breakdownCards += `<div class='tooltip'><div class="playfieldCard${playfieldJokers[id].string}></div>` +
        `</div>`;
      }
      else {
        breakdownCards += `<div class="tooltip"><div class="playfieldCard${playfieldCards[id].string}></div>` +
        `</div>`;
      }
    }
    if(breakdownCards === '') {
      breakdownCards = '<div class="tooltip"></div>';
    }
    if(line.chips !== previousChips || line.mult !== previousMult) {
      breakdownScore = `<div class="levelStat">` +
        `<span id="scoreChips" class="levelStatB">${numberWithCommas(line.chips)}</span>X` +
        `<span id="scoreMult" class="levelStatR">${bigNumberWithCommas(normalizeBig(line.mult))}</span>` +
        `</div>`;
        previousChips = line.chips;
        previousMult = line.mult;
    }
    breakdownHTML += `<div class="breakdownLine"${line.hasOwnProperty('newCard') ? ' style="background-color: #fffa"' : (line.hasOwnProperty('retrigger') ? ' style="background-color: #fcc"' : ((line.hasOwnProperty('modifier') && line.modifier) ? ' style="background-color: #cdf"' : ''))}><div>` +
      breakdownCards +
      `</div><span>` +
      line.description +
      `</span>` +
      breakdownScore +
      `</div>`;
  }

  tabs[3].innerHTML = breakdownHTML;
}

function factorial(n) {
  let ans = 1;
  for(let i = 2; i <= n; i++) {
    ans *= i;
  }
  return ans;
}

function calculator() {
  document.body.style.cursor = 'wait';

  tmpBestCards = [];
  tmpBestHighHand = [0, 0, 0, 0, 0];
  tmpBestLowHand = [0, 0, 0, 0, 0];
  tmpTypeOfHand = 11;
  bestScore = false;

  taskID = Math.random();
  let possibleHands = [];
  let chosen = [];
  tmpBestJokers = [];

  tasks = 0;

  terminateThreads();

  if(Object.keys(playfieldJokers).length === 0) {
    threads[0].postMessage(['once']);
    tasks = 1;
  }
  else if(!optimizeJokers) {
    threads[0].postMessage(['dontOptimizeJokers']);
    tasks = 1;
  }
  else {
    let possibleJokers = factorial(Object.keys(playfieldJokers).length);
    let tasksPerThread = Math.ceil(possibleJokers / THREADS);

    for(let i = 0; i < THREADS; i++) {
      threads[i].postMessage(['optimizeJokers', i * tasksPerThread, (i + 1) * tasksPerThread]);
      tasks++;
      possibleJokers -= tasksPerThread;
      if(possibleJokers <= 0) {
        break;
      }
    }
  }

  bestJokers = Object.keys(playfieldJokers);
}

function numberWithCommas(x) {
  if(x < 1e11) {
    if((Math.floor(x * 10000) / 10000) % 1 !== 0) {
      return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + (Math.floor(Math.round((x % 1) * 10000) / 10)+'').padStart(3, 0).replace(/0+$/, '');
    }
    return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${Math.floor(x/(10**Math.floor(Math.log10(x)))*10000)/10000} X 10^${Math.floor(Math.log10(x))}`;
}

function bigNumberWithCommas(num, whole = false) {
  if(num[1] > 11) {
    return `${Math.floor(num[0] * 10000) / 10000}e${num[1]}`;
  }

  const x = num[0] * (10 ** num[1]);
  if((Math.floor(x * 10000) / 10000) % 1 !== 0) {
    if(whole) {
      return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + (Math.floor(Math.round((x % 1) * 10000) / 10)+'').padStart(3, 0).replace(/0+$/, '');
  }
  return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
