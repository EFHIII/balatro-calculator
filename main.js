const menuBtns = [
  document.getElementById('JokersBtn'),
  document.getElementById('CardsBtn'),
  document.getElementById('HandsBtn'),
  document.getElementById('BreakdownBtn'),
  document.getElementById('ModifyJokerBtn'),
];

const tabs = [
  document.getElementById('Jokers'),
  document.getElementById('Cards'),
  document.getElementById('Hands'),
  document.getElementById('Breakdown'),
  document.getElementById('ModifyJoker'),
];

let searchVal = '';

for(let i = 0; i < menuBtns.length; i++) {
  menuBtns[i].addEventListener('click', changeTab(i));
  tabs[i].style.display = "none";
}

let revertToTab = 0;
let modifyingJoker = false;
let modifyingJokerValue = 0;

let modifyingJokerValTxt = document.getElementById('modValue');
let modifyingJokerValueDiv = document.getElementById('modifyJokerValue');
let modifyingJokerValDiv = document.getElementById('modifyJokerVal');
let modifyingJokerSellValDiv = document.getElementById('modifyJokerSellVal');
let modifyJokerDiv = document.getElementById('modifyJoker');
let highContrastDiv = document.getElementById('highContrastBtn');

function changeTab(tab) {
  return () => {
    revertToTab = tab === 4 ? revertToTab : tab;
    for(let i = 0; i < menuBtns.length; i++) {
      menuBtns[i].classList.remove('active');
      tabs[i].style.display = "none";
    }
    menuBtns[tab].classList.add('active');
    tabs[tab].style.display = "block";

    modifyingJoker = false;
  }
}

changeTab(0)();

const hands = [
  {
    name: "Flush Five",
    planet: "Eris",
    mult: 16,
    chips: 160,
    s_mult: 16,
    s_chips: 160,
    l_mult: 3,
    l_chips: 50
  },
  {
    name: "Flush House",
    planet: "Ceres",
    mult: 14,
    chips: 140,
    s_mult: 14,
    s_chips: 140,
    l_mult: 4,
    l_chips: 40
  },
  {
    name: "Five of a Kind",
    planet: "Planet X",
    mult: 12,
    chips: 120,
    s_mult: 12,
    s_chips: 120,
    l_mult: 3,
    l_chips: 35
  },
  {
    name: "Straight Flush",
    planet: "Neptune",
    mult: 8,
    chips: 100,
    s_mult: 8,
    s_chips: 100,
    l_mult: 4,
    l_chips: 40
  },
  {
    name: "Four of a Kind",
    planet: "Mars",
    mult: 7,
    chips: 60,
    s_mult: 7,
    s_chips: 60,
    l_mult: 3,
    l_chips: 30
  },
  {
    name: "Full House",
    planet: "Earth",
    mult: 4,
    chips: 40,
    s_mult: 4,
    s_chips: 40,
    l_mult: 2,
    l_chips: 25
  },
  {
    name: "Flush",
    planet: "Jupiter",
    mult: 4,
    chips: 35,
    s_mult: 4,
    s_chips: 35,
    l_mult: 2,
    l_chips: 15
  },
  {
    name: "Straight",
    planet: "Saturn",
    mult: 4,
    chips: 30,
    s_mult: 4,
    s_chips: 30,
    l_mult: 3,
    l_chips: 30
  },
  {
    name: "Three of a Kind",
    planet: "Venus",
    mult: 3,
    chips: 30,
    s_mult: 3,
    s_chips: 30,
    l_mult: 2,
    l_chips: 20
  },
  {
    name: "Two Pair",
    planet: "Uranus",
    mult: 2,
    chips: 20,
    s_mult: 2,
    s_chips: 20,
    l_mult: 1,
    l_chips: 20
  },
  {
    name: "Pair",
    planet: "Mercury",
    mult: 2,
    chips: 10,
    s_mult: 2,
    s_chips: 10,
    l_mult: 1,
    l_chips: 15
  },
  {
    name: "High Card",
    planet: "Pluto",
    mult: 1,
    chips: 5,
    s_mult: 1,
    s_chips: 5,
    l_mult: 1,
    l_chips: 10
  }
];

const handColors = [
  '#efefef',
  '#95acff',
  '#65efaf',
  '#fae37e',
  '#ffc052',
  '#f87d75',
  '#caa0ef'
];

const handLevels = document.getElementById('hands');
const consumables = document.getElementById('consumables');

function incrementLevel(inc, handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  hand.level += inc;
  if(hand.level < 0) hand.level = 0;
  hand.mult = Math.max(1, hand.s_mult + (hand.level-1) * hand.l_mult);
  hand.chips = Math.max(0, hand.s_chips + (hand.level-1) * hand.l_chips);
  div.children[2].innerText = 'lvl.'+hand.level;
  div.children[2].style.backgroundColor = hand.level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hand.level)/6)*6+hand.level+4)%6)+1];
  div.children[4].children[0].innerText = numberWithCommas(hand.chips);
  div.children[4].children[1].innerText = numberWithCommas(hand.mult);

  redrawPlayfield();
}

function incrementPlanet(inc, handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById('planets-' + hand.id);
  hand.planets += inc;
  if(hand.planets < 0 || inc === 0) hand.planets = 0;
  div.children[3].innerText = hand.planets;

  redrawPlayfield();
}

function setPlanet(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById('planets-' + hand.id);
  let willBlur = false;

  if(div.children[3].innerText.indexOf('\n') >= 0) {
    div.children[3].innerText = div.children[3].innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }
  if(1 * div.children[3].innerText > 0) {
    hand.planets = Math.round(1 * div.children[3].innerText);
  }
  else {
    hand.planets = 0;
  }

  if(willBlur) div.children[3].blur();

  redrawPlayfield();
}

function setLevel(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  let willBlur = false;

  if(div.children[2].innerText.indexOf('\n') >= 0) {
    div.children[2].innerText = div.children[2].innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }
  if(1 * div.children[2].innerText > 0) {
    hand.level = Math.round(1 * div.children[2].innerText);
  }
  else {
    hand.level = 0;
  }

  hand.mult = Math.max(1, hand.s_mult + (hand.level-1) * hand.l_mult);
  hand.chips = Math.max(0, hand.s_chips + (hand.level-1) * hand.l_chips);
  div.children[2].style.backgroundColor = hand.level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hand.level)/6)*6+hand.level+4)%6)+1];
  div.children[4].children[0].innerText = numberWithCommas(hand.chips);
  div.children[4].children[1].innerText = numberWithCommas(hand.mult);

  if(willBlur) div.children[2].blur();

  redrawPlayfield();
}

function setPlayed(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  let willBlur = false;

  if(div.children[1].children[0].innerText.indexOf('\n') >= 0) {
    div.children[1].children[0].innerText = div.children[1].children[0].innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }

  if(1 * div.children[1].children[0].innerText > 0) {
    hand.played = Math.round(1 * div.children[1].children[0].innerText);
  }
  else {
    hand.played = 0;
  }

  if(willBlur) div.children[1].children[0].blur();

  redrawPlayfield();
}

function removeLvlText (handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  div.children[2].innerText = hand.level;

  selectAll(div.children[2])
}

function selectAll(div) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(div);
  selection.removeAllRanges();
  selection.addRange(range);
}

function addLvlText(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  div.children[2].innerText = 'lvl.'+hand.level;
}

const jokerValueHTML = document.getElementById('jokerVal');
let jokerValue = 0;

const jokerCountHTML = document.getElementById('jokerCnt');
let jokerCount = 1;

const cardCountHTML = document.getElementById('cardCnt');
let cardCount = 1;

function incrementJokerValue(inc) {
  jokerValue += inc;
  if(inc === 0) {
    jokerValue = 0;
  }
  jokerValueHTML.innerText = jokerValue;
  jredrawCards();
}

function setJokerValue() {
  let willBlur = false;

  if(jokerValueHTML.innerText.indexOf('\n') >= 0) {
    jokerValueHTML.innerText = jokerValueHTML.innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }
  if(!isNaN(jokerValueHTML.innerText)) {
    jokerValue = Math.round(jokerValueHTML.innerText * 1);
  }
  else {
    jokerValue = 0;
  }

  if(willBlur) {
    jokerValueHTML.blur();
    jokerValueHTML.innerText = jokerValue;
  }

  jredrawCards();
}

function incrementJokerCount(inc) {
  jokerCount += inc;
  if(inc === 0) {
    jokerCount = 1;
  }
  jokerCountHTML.innerText = Math.max(1, jokerCount);
}

function setJokerCount() {
  console.log(jokerCountHTML.innerText);
  let willBlur = false;

  if(jokerCountHTML.innerText.indexOf('\n') >= 0) {
    jokerCountHTML.innerText = jokerCountHTML.innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }
  if(!isNaN(jokerCountHTML.innerText)) {
    jokerCount = Math.max(1, Math.round(jokerCountHTML.innerText * 1));
  }
  else {
    jokerCount = 1;
  }

  if(willBlur) {
    jokerCountHTML.blur();
    jokerCountHTML.innerText = jokerCount;
  }
}

function incrementCardCount(inc) {
  cardCount += inc;
  if(inc === 0) {
    cardCount = 1;
  }
  cardCountHTML.innerText = Math.max(1, cardCount);
}

function setCardCount() {
  console.log(cardCountHTML.innerText);
  let willBlur = false;

  if(cardCountHTML.innerText.indexOf('\n') >= 0) {
    cardCountHTML.innerText = cardCountHTML.innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }
  if(!isNaN(cardCountHTML.innerText)) {
    cardCount = Math.max(1, Math.round(cardCountHTML.innerText * 1));
  }
  else {
    cardCount = 1;
  }

  if(willBlur) {
    cardCountHTML.blur();
    cardCountHTML.innerText = cardCount;
  }
}

handLevels.innerHTML = '';

for(let i = 0; i < hands.length; i++) {
  hands[i].level = 1;
  hands[i].planets = 0;
  hands[i].id = hands[i].name.replace(/ /g,'');
  hands[i].played = 0;
  hands[i].playedThisRound = 0;
  handLevels.innerHTML += `<div class="handLevel" id="${hands[i].id}">
    <span class="lvlBtn" title="played this round" onclick="togglePlayed(${i})">&nbsp;</span>
    <div style="float: left;">&nbsp;#<span contenteditable="true" class="handCount" onfocus="selectAll(this)" oninput="setPlayed(${i})">0</span></div>
    <span contenteditable="true" class="handLvl" onfocus="removeLvlText(${i})" onblur="addLvlText(${i})" oninput="setLevel(${i})">lvl.1</span>
    <span class="handName">${hands[i].name}</span>
    <span class="levelStat">
      <span class="levelStatB">${hands[i].chips}</span>X<span class="levelStatR">${hands[i].mult}</span>
    </span>
  </div>`;

  consumables.innerHTML += `<div class="handLevel" id="planets-${hands[i].id}" style="background-color: #89b; text-align: center;">
    <span class="lvlBtn" onclick="incrementPlanet(-1, ${i})">-</span>
    <span class="lvlBtn" onclick="incrementPlanet( 0, ${i})">0</span>
    <span class="lvlBtn" onclick="incrementPlanet( 1, ${i})">+</span>
    <span contenteditable="true" class="handLvl" oninput="setPlanet(${i})" onfocus="selectAll(this)">0</span>
    <div style="display: flex;"><div style="color: #cef; width: 100%;">${hands[i].planet}</div><div style="width: 100%;">${hands[i].name}</div></dpv>
  </div>`;
}

const modifiers = {
  foil: false,
  holographic: false,
  polychrome: false,
  stone: false,
  increment: false,
  mult: false,
  wild: false,
  chance: false,
  glass: false,
  steel: false,
  gold: false,
  double: false,
  disabled: false
};

let modifierString = ', url(assets/Enhancers.png) -71px 0px';
let modifierPostString = '';

let modifierClass = '';

const jmodifiers = {
  foil: false,
  holographic: false,
  polychrome: false,
  disabled: false
};

function jtoggleCardModifier(name) {
  if(('foil holographic polychrome disabled'.indexOf(name) >= 0) && !jmodifiers[name]) {
    jmodifiers.foil = false;
    jmodifiers.holographic = false;
    jmodifiers.polychrome = false;
    jmodifiers.disabled = false;
  }
  jmodifiers[name] = !jmodifiers[name];

  jredrawCards();
}

function setModifierString() {
  modifierClass = '';

  if(modifiers.stone) {
    modifierString = ', url(assets/Enhancers.png) 142px 0';
  }
  else if(modifiers.increment) {
    modifierString = ', url(assets/Enhancers.png) -71px -95px';
  }
  else if(modifiers.mult) {
    modifierString = ', url(assets/Enhancers.png) -142px -95px';
  }
  else if(modifiers.wild) {
    modifierString = ', url(assets/Enhancers.png) -213px -95px';
  }
  else if(modifiers.chance) {
    modifierString = ', url(assets/Enhancers.png) -284px -95px';
  }
  else if(modifiers.glass) {
    modifierString = ', url(assets/Enhancers.png) -355px -95px';
  }
  else if(modifiers.steel) {
    modifierString = ', url(assets/Enhancers.png) -426px -95px';
  }
  else if(modifiers.gold) {
    modifierString = ', url(assets/Enhancers.png) 71px 0px';
  }
  else {
    modifierString = ', url(assets/Enhancers.png) -71px 0px';
  }

  if(modifiers.double) {
    modifierPostString = 'url(assets/Enhancers.png) 142px 95px, ';
  }
  else {
    modifierPostString = 'url(assets/Jokers.png) 0px -855px, ';
  }

  if(modifiers.foil) {
    modifierPostString += 'url(assets/Editions.png) -71px 0, ';
  }
  else if(modifiers.holographic) {
    modifierPostString += 'url(assets/Editions.png) -142px 0, ';
  }
  else if(modifiers.polychrome) {
    modifierClass = ' polychrome';
    modifierPostString += 'url(assets/Editions.png) -213px 0, ';
  }
  else if(modifiers.disabled) {
    modifierPostString += 'url(assets/Editions.png) 71px 0, ';
  }
}

function toggleCardModifier(name) {
  if(('gold stone increment mult wild chance glass steel'.indexOf(name) >= 0) && !modifiers[name]) {
    modifiers.stone = false;
    modifiers.increment = false;
    modifiers.mult = false;
    modifiers.wild = false;
    modifiers.chance = false;
    modifiers.glass = false;
    modifiers.steel = false;
    modifiers.gold = false;
  }

  if(('foil holographic polychrome disabled'.indexOf(name) >= 0) && !modifiers[name]) {
    modifiers.foil = false;
    modifiers.holographic = false;
    modifiers.polychrome = false;
    modifiers.disabled = false;
  }
  modifiers[name] = !modifiers[name];

  setModifierString();

  redrawCards();
}

const cardsDiv = document.getElementById('cards');
const jcardsDiv = document.getElementById('jokers');

let highContrast = window.localStorage.hc === '1';
if(highContrast) {
  highContrastDiv.innerText = 'X';
}

function cardString(i, j, hc = 0) {
  if(modifiers.stone) {
    return `${modifierClass}" style="background: ` +
    `${modifierPostString}${modifierString.slice(2)}"`;
  }
  else {
    return `${modifierClass}" style="background: ` +
    `${modifierPostString}url(assets/8BitDeck${(hc === 2 || (hc === 0 && highContrast))?'_opt2':''}.png) ` +
    `-${71*j}px -${95*i}px${modifierString}"`;
  }
}

function redrawCards() {
  let txt = '';
  for(let i = 0; i < 4; i++) {
    txt += '<div>';
    for(let j = 0; j < 13; j++) {
      txt += `<div class="tooltip"><div class="playingCard${cardString((i+3) % 4, j)} onclick="addCard(${i}, ${j})" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div></div>`;
    }
    txt += '</div>';
  }
  cardsDiv.innerHTML = txt;
}

function toggleContrast() {
    highContrast = !highContrast;
    window.localStorage.setItem('hc', highContrast?1:0);
    if(highContrast) {
      highContrastDiv.innerText = 'X';
    }
    else {
      highContrastDiv.innerHTML = '&nbsp;';
    }

    redrawCards();
    redrawPlayfieldHTML();
}

document.getElementById('highContrastBtn').addEventListener('click', toggleContrast);

function jokerString(i, j, modifiers) {
  let jmodifierClass = '';

  let jmodifierString = 'url(assets/Jokers.png) 0px -855px, ';
  let jmodifierPostString = '';

  if(modifiers.foil) {
    jmodifierPostString = 'url(assets/Editions.png) -71px 0, ';
  }
  else if(modifiers.holographic) {
    jmodifierPostString = 'url(assets/Editions.png) -142px 0, ';
  }
  else if(modifiers.polychrome) {
    jmodifierClass = ' polychrome';
    jmodifierPostString = 'url(assets/Editions.png) -213px 0, ';
  }
  else if(modifiers.disabled) {
    jmodifierPostString = 'url(assets/Editions.png) 71px 0, ';
  }
  else {
    jmodifierPostString = '';
  }

  switch(`${i},${j}`) {
    case '8,3': jmodifierString = `url(assets/Jokers.png) -${71*3}px -${95*9}px, `; break;
    case '8,4': jmodifierString = `url(assets/Jokers.png) -${71*4}px -${95*9}px, `; break;
    case '8,5': jmodifierString = `url(assets/Jokers.png) -${71*5}px -${95*9}px, `; break;
    case '8,6': jmodifierString = `url(assets/Jokers.png) -${71*6}px -${95*9}px, `; break;
    case '8,7': jmodifierString = `url(assets/Jokers.png) -${71*7}px -${95*9}px, `; break;
    case '12,4': jmodifierString = `url(assets/Jokers.png) -${71*2}px -${95*9}px, `; break;
  }
  return `${jmodifierClass}" style="mask-position:  -${71*j}px -${95*i}px; background: ${jmodifierPostString}${jmodifierString}url(assets/Jokers.png) -${71*j}px -${95*i}px"`;
}

function jredrawCards() {
  let txt = '<div>';
  let count = 0;
  for(let i = 0; i < 16; i++) {
    if(i === 9) {i++;}
    for(let j = 0; j < 10; j++) {
      const title = (jokerTexts.length > i && jokerTexts[i].length > j) ? jokerTexts[i][j][0] : 'WIP';
      const description = (jokerTexts.length > i && jokerTexts[i].length > j) ? eval('`' + jokerTexts[i][j][1] + '`') : 'WIP';
      if(title.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0 || description.replace(/\<[^\>]+\>/g,'').toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) {
        txt += `<div class='tooltip'><div class="jokerCard${jokerString(i, j, jmodifiers)} onclick="addJoker(${i}, ${j})" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div><span class='tooltiptext'>` +
        `<div class='title'>${title}</div><br style="display: none">` +
        `<div class='desc'><span class='descContent'>${description}</span></span>` +
        `</div></div>`;
        count++;
        if(count >= 10) {
          count = 0;
          txt += '</div><div>';
        }
      }
    }
  }
  txt += '</div>';
  jcardsDiv.innerHTML = txt;
}

redrawCards();
jredrawCards();

const jokerAreaDiv = document.getElementById('jokerArea');
const bestPlayDiv = document.getElementById('bestPlay');
const cardsInHandDiv = document.getElementById('cardsInHand');

const jokerLimitDiv = document.getElementById('jokerLimit');
const handLimitDiv = document.getElementById('handLimit');

let playfieldCards = {};

function updateTooltips() {
  for(let joker in playfieldJokers) {
    let i = playfieldJokers[joker].type[0];
    let j = playfieldJokers[joker].type[1];
    let jokerValue = playfieldJokers[joker].value;
    playfieldJokers[joker].tooltip = (jokerTexts.length > i && jokerTexts[i].length > j) ? [jokerTexts[i][j][0], eval('`' + jokerTexts[i][j][1] + '`')] : ['WIP', 'WIP'];
  }
}

function addJoker(i, j, sell = false) {
  for(let k = 0; k < jokerCount; k++) {
    let id = 'j'+(Math.random()+'').slice(2);
    while(playfieldJokers.hasOwnProperty(id)) {
      id = 'j'+(Math.random()+'').slice(2);
    }

    playfieldJokers[id] = {
      id,
      type: [i, j],
      modifiers: {...jmodifiers},
      value: jokerValue,
      sell: sell !== false ? sell : Math.floor((jokerPrice[i][j] + ((jmodifiers.foil || jmodifiers.holographic || jmodifiers.polychrome) ? 1 : 0)) / 2),
      string: jokerString(i, j, jmodifiers),
      tooltip: (jokerTexts.length > i && jokerTexts[i].length > j) ? [jokerTexts[i][j][0], eval('`' + jokerTexts[i][j][1] + '`')] : ['WIP', 'WIP']
    };
  }

  jokerLimitDiv.innerText = Object.keys(playfieldJokers).length;

  if(Object.keys(playfieldJokers).length >= 8 && optimizeJokers) {
    toggleJoker();
  }

  updateTooltips();
  redrawPlayfield();
}

function removeJoker(id) {
  delete playfieldJokers[id];

  jokerLimitDiv.innerText = Object.keys(playfieldJokers).length;

  updateTooltips();
  redrawPlayfield();

  changeTab(revertToTab)();
}

function addCard(i, j) {
  for(let k = 0; k < cardCount; k++) {
    let id = ((j === 10 && !modifiers.stone) ? (!modifiers.steel ? '993' : '992') : '') + (''+j).padStart(2, 0)+(4-i)+Object.keys(modifiers).map(a=>modifiers[a]?'1':'0').join('');
    while(playfieldCards.hasOwnProperty(id)) {
      id += '#';
    }

    playfieldCards[id] = {
      id,
      type: [(i + 3) % 4, j],
      modifiers: {...modifiers},
      string: cardString((i + 3) % 4, j, 1),
      HCString: cardString((i + 3) % 4, j, 2),
    };
  }

  handLimitDiv.innerText = Object.keys(playfieldCards).length;

  if(Object.keys(playfieldCards).length >= 9 && optimizeJokers) {
    toggleCard();
  }

  redrawPlayfield();
}

function removeCard(id) {
  if(bestHand.indexOf(id) >= 0) {
    bestHand.splice(bestHand.indexOf(id), 1);
  }

  delete playfieldCards[id];

  handLimitDiv.innerText = Object.keys(playfieldCards).length;

  redrawPlayfield();
}

function redrawPlayfield() {
  calculator();
}

function redrawPlayfieldHTML() {
  compileHand();

  let txt = '';
  for(let id of bestJokers) {
    txt += `<div class='tooltip'><div id="${id}" class="jokerCard${playfieldJokers[id].string} ` +
    `onclick="modifyJoker('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div class="removeJoker" onclick="removeJoker('${id}')">X</div>` +
    `<span class='tooltiptext'>` +
    `<span class='title'>${playfieldJokers[id].tooltip[0]}</span>` +
    `<span class='desc'><span class='descContent'>${playfieldJokers[id].tooltip[1]}</span></span>` +
    `</span>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveJokerLeft('${id}')">&lt;</div>` +
    `<div class="lvlBtn" onclick="moveJokerRight('${id}')">&gt;</div>` +
    `</div>` +
    `</div>` +
    `</div>`;
  }
  jokerAreaDiv.innerHTML = txt;

  txt = '';
  for(let id of bestHand) {
    txt += `<div class="tooltip"><div id="p${id}" ` +
    `class="playfieldCard${highContrast ? playfieldCards[id].HCString : playfieldCards[id].string} ` +
    `onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveHandCardLeft('${id}')">&lt;</div>` +
    `<div class="lvlBtn" onclick="moveHandCardDown('${id}')">v</div>` +
    `<div class="lvlBtn" onclick="moveHandCardRight('${id}')">&gt;</div>` +
    `</div></div>` +
    `</div>`;
  }
  bestPlayDiv.innerHTML = txt;

  txt = '';

  let lowestCards = [];

  for(let id of Object.keys(playfieldCards).sort().reverse()) {
    if(bestHand.indexOf(id) >= 0) continue;
    if(id.indexOf('99') !== 0) continue;
    txt += `<div class="tooltip"><div id="${id}" class="playfieldCard${highContrast ? playfieldCards[id].HCString : playfieldCards[id].string} onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveCardUp('${id}')">^</div>` +
    `</div></div>` +
    `</div>`;
  }

  // if Raised Fist, move the lowest cards to the left
  if(Object.keys(playfieldJokers).reduce((a,b) => a || (playfieldJokers[b].type[0] === 2 && playfieldJokers[b].type[1] === 8 && !playfieldJokers[b].modifiers.disabled), false)) {
    let lowest = 100;
    let isQueen = true;
    let type = 0;
    for(let card in playfieldCards) {
      if(!playfieldCards[card].modifiers.stone && bestHand.indexOf(card) < 0) {
        if(lowest > cardValues[playfieldCards[card].type[1]] + (playfieldCards[card].type[1] === QUEEN ? 10 : 0)) {
          isQueen = playfieldCards[card].type[1] === QUEEN;
          lowest = cardValues[playfieldCards[card].type[1]] + (isQueen ? 10 : 0);
          lowestCards = [card];
          type = playfieldCards[card].type[1];
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

    ignoreCard = -1;

    // only add cards if there is a valid lowest card
    if(lowest > 0 && lowest < 100 && !isQueen) {
      ignoreCard = lowestCards[index];

      for(let id of Object.keys(playfieldCards).sort().reverse()) {
        if(lowestCards.indexOf(id) < 0) continue;
        if(id === ignoreCard) continue;
        if(id.indexOf('99') === 0) continue;
        txt += `<div class="tooltip"><div id="${id}" class="playfieldCard${highContrast ? playfieldCards[id].HCString : playfieldCards[id].string} onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
        `<div style="position: absolute; top: 100%; width: 100%;">` +
        `<div class="positionButtons">` +
        `<div class="lvlBtn" onclick="moveCardUp('${id}')">^</div>` +
        `</div></div>` +
        `</div>`;
      }

      txt += `<div class="tooltip"><div id="${ignoreCard}" class="playfieldCard${highContrast ? playfieldCards[ignoreCard].HCString : playfieldCards[ignoreCard].string} onclick="removeCard('${ignoreCard}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
      `<div style="position: absolute; top: 100%; width: 100%;">` +
      `<div class="positionButtons">` +
      `<div class="lvlBtn" onclick="moveCardUp('${ignoreCard}')">^</div>` +
      `</div></div>` +
      `</div>`;
    }
    //console.log(txt);
  }

  for(let id of Object.keys(playfieldCards).sort().reverse()) {
    if(bestHand.indexOf(id) >= 0) continue;
    if(lowestCards.indexOf(id) >= 0) continue;
    if(id.indexOf('99') === 0) continue;
    txt += `<div class="tooltip"><div id="${id}" class="playfieldCard${highContrast ? playfieldCards[id].HCString : playfieldCards[id].string} onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveCardUp('${id}')">^</div>` +
    `</div></div>` +
    `</div>`;
  }
  cardsInHandDiv.innerHTML = txt;
}

function moveJokerLeft(id) {
  if(optimizeJokers) toggleJoker();
  const index = bestJokers.indexOf(id);
  if(index > 0) {
    bestJokers.splice(index, 1);
    bestJokers.splice(index - 1, 0, id);
  }
  let newPlayfield = {};
  for(joker of bestJokers) {
    newPlayfield[joker] = playfieldJokers[joker];
  }
  playfieldJokers = newPlayfield;
  redrawPlayfield();
}

function moveJokerRight(id) {
  let index = bestJokers.indexOf(id);
  if(index < bestJokers.length) {
    bestJokers.splice(index, 1);
    bestJokers.splice(index + 1, 0, id);
  }
  let newPlayfield = {};
  for(let i = 0; i < bestJokers.length; i++) {
    let joker = bestJokers[i];
    newPlayfield[joker] = playfieldJokers[joker];
  }
  playfieldJokers = newPlayfield;

  if(optimizeJokers) {
    toggleJoker();
  }
  else {
    redrawPlayfield();
  }
}

function moveHandCardLeft(id) {
  if(optimizeCards) toggleCard();
  let index = bestHand.indexOf(id);
  if(index > 0) {
    bestHand.splice(index, 1);
    bestHand.splice(index - 1, 0, id);
  }
  redrawPlayfield();
}
function moveHandCardRight(id) {
  if(optimizeCards) toggleCard();
  let index = bestHand.indexOf(id);
  if(index < bestHand.length) {
    bestHand.splice(index, 1);
    bestHand.splice(index + 1, 0, id);
  }
  redrawPlayfield();
}

function moveHandCardDown(id) {
  if(optimizeCards) toggleCard();
  bestHand.splice(bestHand.indexOf(id), 1);
  redrawPlayfield();
}

function moveCardUp(id) {
  if(optimizeCards) toggleCard();
  if(bestHand.length < 5) {
    bestHand.push(id);
  }
  redrawPlayfield();
}

const searchDiv = document.getElementById('SearchVal');

function searchJoker() {
  searchVal = searchDiv.value;
  jredrawCards();
}

let modifyTab = changeTab(4);

function modifyJoker(id) {
  modifyTab();
  modifyingJoker = id;
  modifyingJokerValDiv.innerText = playfieldJokers[modifyingJoker].value;
  modifyingJokerSellValDiv.innerText = playfieldJokers[modifyingJoker].sell;

  const type = playfieldJokers[modifyingJoker].type;
  if(jokerTexts[type[0]][type[1]][2]) {
    modifyingJokerValueDiv.style.display = 'inline-block';
    modifyingJokerValTxt.innerText = jokerTexts[type[0]][type[1]][2];
  }
  else {
    modifyingJokerValueDiv.style.display = 'none';
  }

  updateModifyingJoker();
}

function updateModifyingJoker() {
  if(!playfieldJokers.hasOwnProperty(modifyingJoker)) return;

  modifyJokerDiv.innerHTML = `<div><div class='tooltip'><div data-scale='2' class="jokerCard${playfieldJokers[modifyingJoker].string} onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
  `<span class='tooltiptext'>` +
  `<span class='title'>${playfieldJokers[modifyingJoker].tooltip[0]}</span>` +
  `<span class='desc'><span class='descContent'>${playfieldJokers[modifyingJoker].tooltip[1]}</span></span>` +
  `</span>` +
  `</div></div>`;

}

function mjtoggleCardModifier(name) {
  if(!modifyingJoker) return;
  let joker = playfieldJokers[modifyingJoker];
  if(('foil holographic polychrome disabled'.indexOf(name) >= 0) && !joker.modifiers[name]) {
    joker.modifiers.foil = false;
    joker.modifiers.holographic = false;
    joker.modifiers.polychrome = false;
    joker.modifiers.disabled = false;
  }
  joker.modifiers[name] = !joker.modifiers[name];
  joker.string = jokerString(joker.type[0], joker.type[1], joker.modifiers);


  updateTooltips();
  redrawPlayfield();
  updateModifyingJoker();
}

function incrementModifyJokerValue(inc) {
  if(!modifyingJoker) return;
  let joker = playfieldJokers[modifyingJoker];
  joker.value += inc;
  if(inc === 0) {
    joker.value = 0;
  }
  modifyingJokerValDiv.innerText = joker.value;

  let tmp = jokerValue;
  jokerValue = joker.value;
  joker.tooltip[1] = (jokerTexts.length > joker.type[0] && jokerTexts[joker.type[0]].length > joker.type[1]) ? eval('`' + jokerTexts[joker.type[0]][joker.type[1]][1] + '`') : 'WIP'
  jokerValue = tmp;

  redrawPlayfield();
  updateModifyingJoker();
}

function setModifyJokerValue() {
  let joker = playfieldJokers[modifyingJoker];
  let willBlur = false;

  if(modifyingJokerValDiv.innerText.indexOf('\n') >= 0) {
    modifyingJokerValDiv.innerText = modifyingJokerValDiv.innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }

  if(!isNaN(modifyingJokerValDiv.innerText)) {
    joker.value = Math.round(modifyingJokerValDiv.innerText * 1);
  }
  else {
    joker.value = 0;
  }

  let tmp = jokerValue;
  jokerValue = joker.value;
  joker.tooltip[1] = (jokerTexts.length > joker.type[0] && jokerTexts[joker.type[0]].length > joker.type[1]) ? eval('`' + jokerTexts[joker.type[0]][joker.type[1]][1] + '`') : 'WIP'
  jokerValue = tmp;

  if(willBlur) modifyingJokerValDiv.blur();

  redrawPlayfield();
  updateModifyingJoker();
}

function incrementModifyJokerSellValue(inc) {
  if(!modifyingJoker) return;
  let joker = playfieldJokers[modifyingJoker];
  joker.sell += inc;
  if(inc === 0 || joker.sell < 0) {
    joker.sell = 0;
  }
  modifyingJokerSellValDiv.innerText = joker.sell;

  redrawPlayfield();
  updateModifyingJoker();
}

function setModifyJokerSellValue() {
  let joker = playfieldJokers[modifyingJoker];
  let willBlur = false;

  if(modifyingJokerSellValDiv.innerText.indexOf('\n') >= 0) {
    modifyingJokerSellValDiv.innerText = modifyingJokerSellValDiv.innerText.replace(/[\r\n]/g, '');
    willBlur = true;
  }

  if(!isNaN(modifyingJokerSellValDiv.innerText)) {
    joker.sell = Math.max(0, Math.round(modifyingJokerSellValDiv.innerText * 1));
  }
  else {
    joker.sell = 0;
  }

  if(willBlur) modifyingJokerSellValDiv.blur();

  redrawPlayfield();
  updateModifyingJoker();
}


function updateJokerValue(joker) {
  let tmp = jokerValue;
  jokerValue = joker.value;
  joker.string = jokerString(joker.type[0], joker.type[1], joker.modifiers);
  joker.tooltip[1] = (jokerTexts.length > joker.type[0] && jokerTexts[joker.type[0]].length > joker.type[1]) ? eval('`' + jokerTexts[joker.type[0]][joker.type[1]][1] + '`') : 'WIP';
  jokerValue = tmp;
}

function playHand() {
  for(let j = 0; j < bestJokers.length; j++) {
    const joker = playfieldJokers[bestJokers[j]];
    if(joker.modifiers.disabled) continue;
    switch(''+joker.type[0]+joker.type[1]) {
      case '24':
        // Loyalty Card
        if(joker.value === 0) {
          joker.value = 5;
        }
        else {
          joker.value--;
        }
        break;
      case '40':
        // Wee Joker
        if(bestHand.length === 4) {
          joker.value++;
        }
        break;
      case '61':
        // Ride the Bus
        joker.value = tmpCompiledValues[j];
        break;
      case '103':
        // Runner
        if(tmpTypeOfHand === 3 || tmpTypeOfHand === 7) {
          joker.value++;
        }
        break;
      case '104':
        // Ice cream
        joker.value++;
        if(joker.value >= 20) {
          joker.modifiers.foil = false;
          joker.modifiers.holographic = false;
          joker.modifiers.polychrome = false;
          joker.modifiers.disabled = true;
        }
        break;
      case '107':
        // Blue Joker
        joker.value -= bestHand.length;
        break;
      case '112':
        // Green Joker
        joker.value++;
        break;
      case '119':
        // Square Joker
        if(bestHand.length === 4) {
          joker.value++;
        }
        break;
      case '122':
        // Vampire
        joker.value = tmpCompiledValues[j];
        break;
      case '129':
        // Obelisk
        joker.value = tmpCompiledValues[j] * 5 - 5;
        break;
      case '134':
        // Turtle Bean
        joker.value++;
        if(joker.value >= 5) {
          joker.modifiers.foil = false;
          joker.modifiers.holographic = false;
          joker.modifiers.polychrome = false;
          joker.modifiers.disabled = true;
        }
        break;
      case '151':
        // Popcorn
        joker.value++;
        if(joker.value >= 5) {
          joker.modifiers.foil = false;
          joker.modifiers.holographic = false;
          joker.modifiers.polychrome = false;
          joker.modifiers.disabled = true;
        }
        break;
      case '153':
        joker.value++;
        if(joker.value >= 10) {
          joker.modifiers.foil = false;
          joker.modifiers.holographic = false;
          joker.modifiers.polychrome = false;
          joker.modifiers.disabled = true;
        }
        break;
      case '154':
        // Spare Trousers
        joker.value += tmpCompiledValues[j];
        break;
    }
    updateJokerValue(joker);
  }

  for(let c in playfieldCards) {
    if(bestHand.indexOf(c) >= 0) {
      delete playfieldCards[c];
    }
  }
  hands[tmpTypeOfHand].playedThisRound = 1;
  handLevels.children[tmpTypeOfHand].children[0].innerText = 'X';
  hands[tmpTypeOfHand].played++;
  handLevels.children[tmpTypeOfHand].children[1].children[0].innerText = hands[tmpTypeOfHand].played;

  bestHand = [];

  redrawPlayfield();

  if(modifyingJoker) {
    modifyJoker(modifyingJoker);
  }
}

function clearHand() {
  playfieldCards = {};
  bestHand = [];

  handLimitDiv.innerText = Object.keys(playfieldCards).length;

  for(let i = 0; i < hands.length; i++) {
    hands[i].playedThisRound = 0;
    handLevels.children[i].children[0].innerHTML = '&nbsp;';
  }

  redrawPlayfield();
}

function resetHand() {
  window.location.replace('/balatro-calculator');
}

function setupWheelHandlers() {
    function wheelHandler(e) {
        e.preventDefault(); // Prevent page scrolling

        if (this.onfocus) { // Apply logic similar to when user makes a change (namely affects Hands)
            this.onfocus.call(this);
        }

        let currentValue = parseInt(this.textContent) || 0;
        if (e.deltaY < 0) {
            currentValue++;
        } else {
            currentValue = Math.max(0, currentValue - 1);
        }
        this.textContent = currentValue;

        if (this.oninput) { // Trigger recalculations if they exist
            this.oninput.call(this);
        }

        if (this.onblur) { // Apply logic similar to when user makes a change (namely affects Hands)
            this.onblur.call(this); // Note: Important that this is triggered after `oninput`
        }
    }

    const spans = document.querySelectorAll('span.handLvl, span.handCount');
    spans.forEach(span => {
        span.addEventListener('wheel', wheelHandler);
    });
}

setupWheelHandlers();