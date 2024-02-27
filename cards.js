/*
prices:
  common = +2
  uncommon =
  rare =
  legendary = +10
  foil/polychrome/holographic = +1
*/

/*
LUA joker definitions
----
j_joker=            {order = 1,  unlocked = true,   discovered = true,  blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 3, name = "Joker", pos = {x=0,y=0}, set = "Joker", effect = "Mult", cost_mult = 1.0, config = {mult = 4}},
j_greedy_joker=     {order = 2,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Greedy Joker", pos = {x=6,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 4, suit = 'Diamonds'}}},
j_lusty_joker=      {order = 3,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Lusty Joker", pos = {x=7,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 4, suit = 'Hearts'}}},
j_wrathful_joker=   {order = 4,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Wrathful Joker", pos = {x=8,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 4, suit = 'Spades'}}},
j_gluttenous_joker= {order = 5,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Gluttonous Joker", pos = {x=9,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 4, suit = 'Clubs'}}},
j_sly=              {order = 6,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Sly Joker",set = "Joker", config = {t_chips = 50, type = 'Pair'}, pos = {x=0,y=14}},
j_wily=             {order = 7,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Wily Joker",set = "Joker", config = {t_chips = 80, type = 'Three of a Kind'}, pos = {x=1,y=14}},
j_devious=          {order = 8,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Devious Joker",set = "Joker", config = {t_chips = 120, type = 'Straight'}, pos = {x=3,y=14}},
j_crafty=           {order = 9,  unlocked = true,   discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Crafty Joker",set = "Joker", config = {t_chips = 80, type = 'Flush'}, pos = {x=4,y=14}},
j_four_fingers=     {order = 10,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 2, cost = 7, name = "Four Fingers", pos = {x=6,y=6}, set = "Joker", effect = "", config = {}},
j_banner=           {order = 11,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Banner", pos = {x=1,y=2}, set = "Joker", effect = "Discard Chips", cost_mult = 1.0, config = {extra = 40}},
j_fibonacci=        {order = 12,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Fibonacci", pos = {x=1,y=5}, set = "Joker", effect = "Card Mult", cost_mult = 1.0, config = {extra = 8}},
j_hack=             {order = 13,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Hack", pos = {x=5,y=2}, set = "Joker", effect = "Low Card double", cost_mult = 1.0, config = {extra = 1}},
j_gift=             {order = 14,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Gift Card",set = "Joker", config = {extra = 1}, pos = {x=3,y=13}},
j_gros_michel=      {order = 15,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = false, rarity = 1, cost = 5, name = "Gros Michel", pos = {x=7,y=6}, set = "Joker", effect = "", config = {extra = {odds = 8, mult = 15}}, no_pool_flag = 'gros_michel_extinct'},
j_even_steven=      {order = 16,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Even Steven", pos = {x=8,y=3}, set = "Joker", effect = "Even Card Buff", cost_mult = 1.0, config = {extra = 4}},
j_odd_todd=         {order = 17,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Odd Todd", pos = {x=9,y=3}, set = "Joker", effect = "Odd Card Buff", cost_mult = 1.0, config = {extra = 30}},
j_trousers=         {order = 18,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Spare Trousers",set = "Joker", config = {extra = 2}, pos = {x=4,y=15}},
j_misprint=         {order = 19,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Misprint", pos = {x=6,y=2}, set = "Joker", effect = "Random Mult", cost_mult = 1.0, config = {extra = {max = 20, min = 0}}},
j_green_joker=      {order = 20,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = 'Green Joker', pos = {x = 2, y = 11}, set = 'Joker', config = {extra = {hand_add = 1, discard_sub = 1}}},
j_seance=           {order = 21,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Seance", pos = {x=0,y=12}, set = "Joker", cost_mult = 1.0, config = {extra = {poker_hand = 'Straight Flush'}}},
j_shortcut=         {order = 22,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Shortcut",set = "Joker", config = {},  pos = {x=3,y=12}},
j_hologram=         {order = 23,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Hologram",set = "Joker", config = {extra = 0.25, Xmult = 1},  pos = {x=4,y=12}, soul_pos = {x=2, y=9},},
j_vagabond=         {order = 24,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Vagabond",set = "Joker", config = {extra = 4}, pos = {x=5,y=12}},
j_obelisk=          {order = 25,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Obelisk",set = "Joker", config = {extra = 0.2, Xmult = 1}, pos = {x=9,y=12}},
j_photograph=       {order = 26,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Photograph",set = "Joker", config = {extra = 2}, pos = {x=2,y=13}},
j_ramen=            {order = 27,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Ramen",set = "Joker", config = {Xmult = 2, extra = 0.01}, pos = {x=2,y=15}},
j_reserved_parking= {order = 28,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Reserved Parking",set = "Joker", config = {extra = {odds = 2, dollars = 1}}, pos = {x=6,y=13}},
j_fortune_teller=   {order = 29,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Fortune Teller", pos = {x=7,y=5}, set = "Joker", effect = "", config = {extra = 1}},
j_drunkard=         {order = 30,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 1, cost = 4, name = "Drunkard", pos = {x=1,y=1}, set = "Joker", effect = "Discard Size", cost_mult = 1.0, config = {d_size = 1}},
j_baseball=         {order = 31,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Baseball Card",set = "Joker", config = {extra = 1.5}, pos = {x=6,y=14}},
j_bull=             {order = 32,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Bull",set = "Joker", config = {extra = 2}, pos = {x=7,y=14}},
j_diet_cola=        {order = 33,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Diet Cola",set = "Joker", config = {}, pos = {x=8,y=14}},
j_popcorn=          {order = 34,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = false, rarity = 1, cost = 5, name = "Popcorn",set = "Joker", config = {mult = 20, extra = 4}, pos = {x=1,y=15}},
j_swashbuckler=     {order = 35,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Swashbuckler", pos = {x=9,y=5}, set = "Joker", effect = "Set Mult", cost_mult = 1.0, config = {mult = 1}},
j_throwback=        {order = 36,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Throwback", pos = {x=5,y=7}, set = "Joker", effect = "", config = {extra = 0.25}},
j_credit_card=      {order = 37,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 1, cost = 1, name = "Credit Card", pos = {x=5,y=1}, set = "Joker", effect = "Credit", cost_mult = 1.0, config = {extra = 20}},
j_flower_pot=       {order = 38,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 2, cost = 8, name = "Flower Pot", pos = {x=0,y=6}, set = "Joker", effect = "", config = {extra = 3}},
j_superposition=    {order = 39,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = 'Superposition', pos = {x = 3, y = 11}, set = 'Joker', config = {}},
j_hit_the_road=     {order = 40,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 10, name = "Hit the Road", pos = {x=8,y=5}, set = "Joker", effect = "Jack Discard Effect", cost_mult = 1.0, config = {extra = 0.5}},
j_trio=             {order = 41,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 9, name = "The Trio", pos = {x=6,y=4}, set = "Joker", effect = "X2 Mult", cost_mult = 1.0, config = {Xmult = 2, type = 'Three of a Kind'}},
j_trading=          {order = 42,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = true, rarity = 2, cost = 5, name = "Trading Card",set = "Joker", config = {extra = 3}, pos = {x=9,y=14}},
j_raised_fist=      {order = 43,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Raised Fist", pos = {x=8,y=2}, set = "Joker", effect = "Socialized Mult", cost_mult = 1.0, config = {}},
j_invisible=        {order = 44,  unlocked = true,  discovered = false, blueprint_compat = false, eternal_compat = false, rarity = 3, cost = 10, name = "Invisible Joker", pos = {x=1,y=7}, set = "Joker", effect = "", config = {extra = 3}},
j_brainstorm=       {order = 45,  unlocked = true,  discovered = false, blueprint_compat = true, eternal_compat = true, rarity = 3, cost = 10, name = "Brainstorm", pos = {x=7,y=7}, set = "Joker", effect = "Copycat", config = {}},
*/

const endc = `</span>`;
const multc = `<span style='color: #ff4d40'>`;
const prodc = `<span style='color: #fff; background-color: #ff4d40; border-left: solid; border: solid; border-color: #ff4d40; border-width: 0px 2px 1px 2px; padding-left: 1px; border-radius: 3px;'>X`;
const chipc = `<span style='color: #009dff'>`;
const numc = `<span style='color: #ff8f00'>`;
const moneyc = `<span style='color: #f5b143'>`;
const probc = `<span style='color: #35bd87'>`;

const shadowc = `<span style='color: #ababab'>`;

const diamondc = `<span style='color: #f50'>Diamond</span>`;
const heartc = `<span style='color: #f00'>Heart</span>`;
const spadec = `<span style='color: #505'>Spade</span>`;
const clubc = `<span style='color: #050'>Club</span>`;

const diamondsc = `<span style='color: #f50'>Diamonds</span>`;
const heartsc = `<span style='color: #f00'>Hearts</span>`;
const spadesc = `<span style='color: #505'>Spades</span>`;
const clubsc = `<span style='color: #050'>Clubs</span>`;

const spectralc = `<span style='color: #00f'>Spectral</span>`;
const planetc = `<span style='color: #0af'>Planet</span>`;
const tarotc = `<span style='color: #f0f'>Tarot</span>`;

const celestialc = `<span style='color: #0af'>Celestial Packs</span>`;

const negativec = `<span style='color: #55a'>Negative</span>`;

const commonc = `<span style='color: #09f'>Common</span>`;

const roomc = `<br>${shadowc}(Must have room)${endc}`;

const rankNames = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'Jack', 'Queen', 'King', 'Ace'
];
const suitNames = [
  heartsc, clubsc, diamondsc, spadesc
];

const toggleJokerc = '<br>${shadowc}(Currently ${jokerValue ? `${probc}active${endc}` : `${multc}inactive${endc}`})${endc}';

const jokerTexts = [
  [
    ['Joker', '${multc}+4${endc} Mult'],
    ['Chaos the Clown', '${numc}1${endc} free ${probc}Reroll${endc}<br>per shop'],
    ['Jolly Joker', '${multc}+8${endc} Mult if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['Zany Joker', '${multc}+12${endc} Mult if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['Mad Joker', '${multc}+20${endc} Mult if played<br>hand contains<br>a ${numc}Four of a Kind${endc}'],
    ['Crazy Joker', '${multc}+12${endc} Mult if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['Droll Joker', '${multc}+10${endc} Mult if played<br>hand contains<br>a ${numc}Flush${endc}'],

    ['Half Joker', '${multc}+20${endc} Mult if played<br>hand contains<br>${numc}3${endc} or fewer cards'],
    ['Merry Andy', '${multc}+3${endc} discards,<br>${multc}-1${endc} hand size'],
    ['Stone Joker', 'This Joker gains ${chipc}+25${endc} Chips<br>for each ${numc}Stone Card${endc} in your full deck<br>${shadowc}(Currently ${chipc}+${25*jokerValue}${endc} Chips)${endc}']
  ],
  [
    ['Juggler', '${numc}+1${endc} hand size'],
    ['Drunkard', '${multc}+1${endc} discard'],
    ['Acrobat', '${prodc}3${endc} Mult on ${numc}final<br>hand${endc} of round' + toggleJokerc],
    ['Sock and Buskin', 'Retrigger all<br>played ${numc}face${endc} cards'],
    ['Mime', 'Retrigger all<br>card ${numc}held in<br>hand${endc} abilities'],
    ['Credit Card', 'Go up to<br>${multc}-$20${endc} in debt'],
    ['Greedy Joker', 'Played cards with<br>${diamondc} suit give<br>${multc}+4${endc} Mult when scored'],
    ['Lusty Joker', 'Played cards with<br>${heartc} suit give<br>${multc}+4${endc} Mult when scored'],
    ['Wrathful Joker', 'Played cards with<br>${spadec} suit give<br>${multc}+4${endc} Mult when scored'],
    ['Gluttonous Joker', 'Played cards with<br>${clubc} suit give<br>${multc}+4${endc} Mult when scored']
  ],
  [
    ['Troubadour', '${numc}+2${endc} hand size,<br>${multc}-1${endc} hands per round'],
    ['Banner', '${chipc}+40${endc} Chips for<br>each remaining<br>${numc}discard${endc}<br>${shadowc}(Currently ${chipc}+${jokerValue * 40}${endc} Chips)${endc}'],
    ['Mystic Summit', '${multc}+15${endc} Mult when<br>${numc}0${endc} discards<br>remaining' + toggleJokerc],
    ['Marble Joker', 'Adds one ${numc}Stone${endc} card<br>to deck when<br>${numc}Blind${endc} is selected'],
    ['Loyalty Card', '${prodc}4${endc} Mult every<br>${numc}6${endc} hands played<br>${shadowc}(${jokerValue % 6} remaining)${endc}'],
    ['Hack', 'Retrigger<br>each played<br>${numc}2${endc}, ${numc}3${endc}, ${numc}4${endc}, or ${numc}5${endc}'],
    ['Misprint', '${multc}+0${endc} - ${multc}+20${endc} Mult'],
    ['Steel Joker', 'This Joker gains ${prodc}0.25${endc} Mult<br>for each ${numc}Steel Card${endc}<br>in your full deck<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}'],
    ['Raised Fist', 'Adds ${numc}double${endc} the rank<br>of ${numc}lowest${endc} card held in hand to Mult'],
    ['Golden Joker', 'Earn ${moneyc}$4${endc} at<br>end of round']
  ],
  [
    ['Blueprint', 'Copies ability of<br>${numc}Joker${endc} to the right'],
    ['Glass Joker', 'Gains ${prodc}0.5${endc} Mult<br>for every ${numc}Glass Card${endc}<br>that is destroyed<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc} Mult)${endc}'],
    ['Scary Face', 'Played ${numc}face${endc} cards<br>give ${chipc}+30${endc} Chips<br>when scored'],
    ['Abstract Joker', '${multc}+3${endc} Mult for<br>each ${numc}Joker${endc} card<br>${shadowc}(Currently ${multc}+${jokerValue * 3}${endc} Mult)${endc}'],
    ['Delayed Gratification', 'Earn ${moneyc}$2${endc} per ${numc}discard${endc} if<br>no discards are used<br>by end of the round'],
    ['Golden Ticket', 'Played ${moneyc}Gold${endc} cards<br>earn ${moneyc}$3${endc} when scored'],
    ['Pareidolia', 'All cards are<br>considered<br>${numc}Face${endc} cards'],
    ['Cartonmancer', 'Create a ${tarotc} card<br>when ${numc}Blind${endc} is selected${roomc}'],
    ['Even Steven', 'Played cards with<br>${numc}even${endc} rank give<br>${multc}+4${endc} Mult when scored<br>${shadowc}(10, 8, 6, 4, 2)${endc}'],
    ['Odd Todd', 'Played cards with<br>${numc}odd${endc} rank give<br>${chipc}+30${endc} Chips when scored<br>${shadowc}(A, 9, 7, 5, 3)${endc}']
  ],
  [
    ['Wee Joker', 'This Joker gains<br>${chipc}+8${endc} Chips when each<br>played ${numc}2${endc} is scored<br>${shadowc}(Currently ${chipc}+${10 + jokerValue * 8}${endc} Chips)${endc}'],
    ['Business Card', 'Played ${numc}Face${endc} cards have<br>a ${probc}1 in 2${endc} chance to<br>give ${moneyc}$2${endc} when scored'],
    ['Supernova', 'Adds the number of<br>times ${numc}poker hand${endc} has<br>been played to Mult<br>${shadowc}(Currently ${multc}+${jokerValue}${endc} Mult)${endc}'],
    ['Mr. Bones', 'Prevents Death<br>if chips scored<br>are at least ${numc}25%${endc}<br>of required chips<br>${multc}self destructs${endc}'],
    ['Seeing Double', '${prodc}2${endc} Mult if played<br>hand has a scoring<br>Club card and a scoring<br>card of any other ${numc}suit${endc}'],
    ['The Duo', '${prodc}2${endc} Mult if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['The Trio', '${prodc}3${endc} Mult if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['The Family', '${prodc}4${endc} Mult if played<br>hand contains<br>a ${numc}Four of a Kind${endc}'],
    ['The Order', '${prodc}3${endc} Mult if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['The Tribe', '${prodc}2${endc} Mult if played<br>hand contains<br>a ${numc}Flush${endc}']
  ],
  [
    ['8 Ball', 'Create a ${planetc} card<br>if played hand contains<br>2 or more ${numc}8s${roomc}'],
    ['Fibonacci', 'Each plaed ${numc}Ace${endc},<br>${numc}2${endc}, ${numc}3${endc}, ${numc}5${endc}, or ${numc}8${endc} gives<br>${multc}+8${endc} Mult when scored'],
    ['Joker Stencil', '${prodc}1${endc} Mult for each<br>empty ${numc}Joker${endc} slot<br>Joker stencil included<br>${shadowc}(Currently ${prodc}${1 + jokerValue}${endc})${endc}'],
    ['Space Joker', '${probc}1 in 4${endc} chane to<br>upgrade level of<br>played ${numc}poker hand${endc}'],
    ['Matador', 'Earn ${moneyc}$8${endc} if played<br>hand triggers the<br>${numc}Boss Blind${endc} ability'],
    ['Ceremonial Dagger', 'When ${numc}Blind${endc} is selected,<br>destroy Joker to the right<br>and permanently add ${numc}double${endc}<br>its sell value to this ${multc}Mult${endc}<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}'],
    ['Showman', '${numc}Joker${endc}, ${tarotc}, ${planetc},<br>and ${spectralc} cards may<br>appear multiple times'],
    ['Fortune Teller', '${multc}+1${endc} Mult per ${tarotc}<br>card used this run<br>${shadowc}(Currently ${multc}${jokerValue}${endc})${endc}'],
    ['Hit the Road', 'Gains ${prodc}0.5${endc} Mult<br>per discarded<br>${numc}Jack${endc} this round<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc})${endc}'],
    ['Swashbuckler', 'Adds the sell value of<br>all owned ${numc}Jokers${endc} left<br>of this card to Mult<br>${shadowc}(Currently ${multc}+${jokerValue}${endc} Mult)${endc}'],
  ],
  [
    ['Flower Pot', '${prodc}3${endc} Mult if played<br>hand has a scoring<br>${diamondc} card, ${clubc} card,<br>${heartc} card, and ${spadec} card'],
    ['Ride the Bus', '${multc}+1${endc} Mult per<br>consecutive hand<br>played without a<br>scoring ${numc}face${endc} card<br>${shadowc}(Currently ${multc}+${jokerValue}${endc})${endc}'],
    ['Shoot the Moon', '${multc}+13${endc} Mult for<br>each ${numc}Queen${endc}<br>held in hand'],
    ['Scholar', 'Played ${numc}Aces${endc}<br>give ${chipc}+20${endc} Chips<br>and ${multc}+4${endc} Mult<br>when scored'],
    ['Smeared Joker', '${heartc} and ${diamondc}<br>count as the same suit,<br>${spadec} and ${clubc}<br>count as the same suit'],
    ['Opps! All 6s', 'Double all ${numc}listed${endc}<br>${probc}probabilities${endc}<br>${shadowc}(ex: ${probc}1 in 3${endc} -> ${probc}2 in 3${endc})${endc}'],
    ['Four Fingers', 'All ${numc}FLushes${endc} and<br>${numc}Straights${endc} can be<br>made with ${numc}4${endc} cards'],
    ['Gros Michel', '${multc}+15${endc} Mult<br>${probc}1 in 4${endc} chance this card is destroyed<br>at the end of the round'],
    ['Stuntman', '${chipc}+300${endc} Chips,<br>${numc}-2${endc} hand size'],
    ['Hanging Chad', 'Retrigger ${numc}first${endc} played<br>card used in scoring'],
  ],
  [
    ["Driver's License", '${prodc}3${endc} Mult if you have<br>at least ${numc}16${endc} Enhanced<br>cards in your full deck<br>${shadowc}(Currently ${numc}${jokerValue}${endc})${endc}'],
    ['Invisible Joker', 'After 3 rounds,<br>sell this card to<br>${numc}duplicate${endc} a random Joker<br>${shadowc}(Currently ${numc}${jokerValue}${endc}/3)${endc}'],
    ['Astronomer', 'All ${planetc} cards and<br>${celestialc} in<br>the shop are ${numc}free${endc}'],
    ['Burnt Joker', 'Upgrade the level of<br>the first ${numc}discarded${endc}<br>poker hand each round'],
    ['Dusk', 'Retrigger all played<br>cards in ${numc}final<br>hand${endc} of round' + toggleJokerc],
    ['Throwback', '${prodc}0.25${endc} Mult for each<br>${numc}Blind${endc} skipped this run<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}'],
    ['The Idol', 'Each played ${numc}${rankNames[Math.floor(Math.abs(jokerValue)/4) % 13]}${endc}<br>of ${suitNames[Math.abs(jokerValue) % 4]} gives<br>${prodc}2${endc} Mult when scored<br>${shadowc}Card changes every round${endc}'],
    ['Brainstorm', 'Copies the ability<br>of the leftmost Joker'],
    ['Satellite', 'Earn ${moneyc}$1${endc} at the end of<br>round per unique ${planetc}<br>card used this run<br>${shadowc}(Currently ${moneyc}$${jokerValue}${endc})${endc}'],
    ['Rough Gem', 'Played cards with<br>${diamondc} suit earn<br>${moneyc}$1${endc} when scored']
  ],
  [
    ['Bloodstone', '${probc}1 in 3${endc} chance for<br>played cards with<br>${heartc} suit to give<br>${prodc}2${endc} Mult when scored'],
    ['Arrowhead', 'Played cards with<br>${spadec} suit give<br>${chipc}+50${endc} Chips when scored'],
    ['Onyx Agate', 'Played cards with<br>${clubc} suit give<br>${multc}+8${endc} Mult when scored'],
    ['Canio', 'Gains ${prodc}1${endc} Mult when<br>a ${numc}face${endc} card<br>is destroyed<br>${shadowc}(Currently ${prodc}${1 + jokerValue}${endc} Mult)${endc}'],
    ['Triboulet', 'Played ${numc}Kings${endc} and<br>${numc}Queens${endc} each give<br>${prodc}2${endc} Mult when scored'],
    ['Yorick', '${prodc}5${endc} Mult only after<br>using 23 discards<br>${shadowc}(Discards left ${numc}${jokerValue}${endc})${endc}'],
    ['Chicot', 'Disables effect of<br>every ${numc}Boss Blind${endc}'],
    ['Perkeo', 'Creates a ${negativec} copy of<br>${numc}1${endc} random ${numc}consumable${endc}<br>card in your possession<br>at the end of the ${numc}shop${endc}'],
    ['Certificate', 'When round begins,<br>add a random ${numc}playing<br>card${endc} with a random<br>${numc}seal${endc} to your hand'],
    ['Bootstraps', '${multc}+2${endc} Mult for every<br>${moneyc}$5${endc} you have<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}']
  ],
  [],
  [
    ['Egg', 'Gains ${moneyc}$3${endc} of<br>${numc}sell value${endc} at<br>end of round<br>${shadowc}(Currently ${moneyc}+$${jokerValue * 3}${endc})${endc}'],
    ['Burglar', 'When ${numc}Blind${endc} is selected,<br>gain ${chipc}+3${endc} Hands and<br>${numc}lose all discards${endc}'],
    ['Blackboard', '${prodc}3${endc} Mult if all<br>cards held in hand<br>are ${spadec} or ${clubc}'],
    ['Runner', 'Gains ${chipc}+10${endc} Chips<br>if played hand<br>contains a ${numc}Straight${endc}<br>${shadowc}(Currently ${chipc}+${20 + jokerValue * 10}${endc} Chips)${endc}'],
    ['Icre Cream', '${chipc}+100${endc} Chips<br>${chipc}-5${endc} Chips for<br>every hand played<br>${shadowc}(Currently ${chipc}${jokerValue > 20 ? "" : "+"}${100 - jokerValue * 5}${endc} Chips)${endc}'],
    ['DNA', 'If ${numc}first hand${endc} of round<br>has only ${numc}1${endc} card, add a<br>permanent copy to deck<br>and draw it to ${numc}hand${endc}'],
    ['Splash', 'Every ${numc} played card${endc}<br>counts in scoring'],
    ['Blue Joker', '${chipc}+2${endc} Chips for each<br>remaining card in ${numc}Deck${endc}<br>${shadowc}(Currently ${chipc}+${104 + jokerValue * 2}${endc} Chips)${endc}'],
    ['Sixth Sense', 'If ${numc}first hand${endc} of round is<br>a single ${numc}6${endc}, destroy it and<br>create a ${spectralc} card${roomc}'],
    ['Constellation', 'Gains ${prodc}0.1${endc} Mult<br>per ${planetc} card used<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.1}${endc} Mult)${endc}']
  ],
  [
    ['Hiker', 'Every played ${numc}card${endc}<br>permanently gains<br>${chipc}+4${endc} Chips when scored'],
    ['Faceless Joker', 'Earn ${moneyc}$5${endc} if ${numc}3${endc} or<br>more ${numc}face cards${endc}<br>are discarded<br>at the same time'],
    ['Green Joker', '${multc}+1${endc} Mult per hand played<br>${multc}-1${endc} Mult per discard<br>${shadowc}(Currently ${multc}${jokerValue >= 0 ? "+" : ""}${jokerValue}${endc} Mult)${endc}'],
    ['Superposition', 'Create a ${tarotc} card if<br>poker hand contains an<br>${numc}Ace${endc} and a ${numc}Straight${endc}${roomc}'],
    ['To Do List', 'Earn ${moneyc}$5${endc} if ${numc}poker hand${endc}<br>is a ${numc}Pair${endc},<br>poker hand changes<br>on every payout'],
    ['Cavendish', '${prodc}3${endc} Mult<br>${probc}1 in 1000${endc} chance this<br>card is destroy<br>at end of round'],
    ['Card sharp', '${prodc}3${endc} Mult if played<br>${numc}poker hand${endc} has already<br>been played this round'],
    ['Red Card', 'Gains ${multc}+3${endc} Mult when any<br>${numc}Booster Pack${endc} is skipped<br>${shadowc}(Currently ${multc}+${jokerValue * 3}${endc} Mult)${endc}'],
    ['Madness', 'When ${numc}Blind${endc} is selected,<br>gain ${prodc}0.5${endc} Mult and<br>${numc}destroy${endc} a random Joker<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc})${endc}'],
    ['Square Joker', 'Gain ${chipc}+4${endc} Chips if<br>played hand has<br>exactly ${numc}4${endc} card<br>${shadowc}(Currently ${chipc}+${16 + jokerValue * 4}${endc} Chips)${endc}']
  ],
  [
    ['Séance', 'If ${numc}poker hand${endc} is a<br>${numc}Straight Flush${endc}, craeate a<br>random ${spectralc} card${roomc}'],
    ['Riff-Raff', 'When ${numc}Blind${endc} is selected,<br>create ${numc}2${endc} ${commonc} ${numc}Jokers${endc}${roomc}'],
    ['Vampire', 'Gains ${prodc}0.2${endc} Mult per<br>${numc}Enhanced card${endc} played,<br>removes card ${numc}Enhancement${endc}<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.2}${endc} Mult)${endc}'],
    ['Shortcut', 'Allows ${numc}Straights${endc} to be<br>made with gaps of ${numc}1 rank${endc}<br>${shadowc}(ex: ${numc}2 3 5 7 8${endc})${endc}'],
    ['Hologram', 'Gains ${prodc}0.25${endc} Mult<br> per ${numc}playing card${endc} added<br>to your deck<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}'],
    ['Vagabond', 'Creat a ${tarotc} card<br>if hand is played<br>with ${moneyc}$3${endc} or less'],
    ['Baron', 'Each ${numc}King${endc}<br>held in hand<br>gives ${prodc}1.5${endc} Mult'],
    ['Cloud 9', 'Earn ${moneyc}$1${endc} for each<br>${numc}9${endc} in your ${numc}full deck${endc}<br>at end of round<br>${shadowc}(Currently ${moneyc}$${jokerValue}${endc})${endc}'],
    ['Rocket', 'Earn ${moneyc}$${1 + jokerValue * 2}${endc} at end of<br>round. Gains ${moneyc}$2${endc} when<br>${numc}Boss Blind${endc} is defeated'],
    ['Obelisk', '${prodc}0.2${endc} Mult per<br>consecutive hand played<br>without playing your<br>must played ${numc}poker hand${endc}<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.2}${endc} Mult)${endc}']
  ],
  [
    ['Midas Mask', 'All ${numc}face${endc} cards<br>become ${numc}Gold${endc} cards<br>when played'],
    ['Luchador', 'Sell this card to<br>disable the current<br>${numc}Boss Blind${endc}'],
    ['Photograph', 'First played ${numc}face${endc}<br>card gives ${prodc}2${endc} Mult<br>when scored'],
    ['Gift Card', 'Add ${moneyc}$1${endc} of ${numc}sell value${endc}<br>to every ${numc}Joker${endc} and<br>${numc}Consumable${endc} card at<br>end of round'],
    ['Tutle Bean', '${numc}+5${endc} hand size,<br>reduces by<br>${multc}1${endc} every round'],
    ['Erosion', '${multc}+4${endc} Mult for each<br>card below ${numc}$52${endc}<br>in your full deck<br>${shadowc}(Currently ${multc}${jokerValue >= 0 ? "+" : ""}${jokerValue * 4}${endc})${endc}'],
    ['Reserved Parking', 'Each ${numc}face${endc} card<br>held in hand has<br>a ${probc}1 in 2${endc} chance<br>to give ${moneyc}$1${endc}'],
    ['Mail-In Rebate', 'Earn ${moneyc}$3${endc} for each<br>discarded ${numc}${rankNames[Math.abs(jokerValue % 13)]}${endc}, rank<br>changes every round'],
    ['To the Moon', 'Earn an extra ${moneyc}$1${endc} of<br>${numc}interest${endc} for every ${moneyc}$5${endc} you<br>have at end of round'],
    ['Hallucination', '${probc}1 in 2${endc} chance to create<br>a ${tarotc} card when any<br>${numc}Booster Pack${endc} is opened${roomc}']
  ],
  [
    ['Sly Joker',  '${chipc}+50${endc} Chips if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['Wily Joker',  '${chipc}+100${endc} Chips if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['Clever Joker',  '${chipc}+150${endc} Chips if played<br>hand contains<br>a ${numc}Four of a Kind${endc}'],
    ['Devious Joker',  '${chipc}+100${endc} Chips if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['Crafty Joker',  '${chipc}+80${endc} Chips if played<br>hand contains<br>a ${numc}Flush${endc}'],
    ['Lucky cat', 'Gains ${prodc}0.2${endc} Mult each<br>time a ${numc}Lucky${endc} card<br>${probc}successfully${endc} triggers<br>${shadowc}(currently ${prodc}${1 + jokerValue * 0.2}${endc} Mult)${endc}'],
    ['Baseball Card', '${probc}Uncommon${endc} Jokers<br>each give ${prodc}1.5${endc} Mult'],
    ['Bull', '${chipc}+2${endc} Chipps for each<br>${moneyc}dollar${endc} you have<br>${shadowc}(Currently ${chipc}+${jokerValue * 2}${endc} Chips)${endc}'],
    ['Diet Cola', 'Sell this card to<br>create a free<br>${numc}Double Tag${endc}'],
    ['Trading Card', 'If ${numc}first discard${endc} of round<br>has only ${numc}1${endc} card, destroy<br>it and earn ${moneyc}$3${endc}']
  ],
  [
    ['Flash Card', '${multc}+2${endc} Mult per<br>${numc}reroll${endc} in the shop<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}'],
    ['Popcorn', '${multc}${jokerValue <= 5 ? "+" : ""}${20 - jokerValue * 4}${endc} Mult<br>${multc}-4${endc} Mult per<br>round played'],
    ['Ramen', '${prodc}${Math.max(0, 2 - jokerValue * 0.01)}${endc} Mult,<br>loses ${prodc}0.01${endc} Mult<br>per ${numc}card${endc} discarded'],
    ['Seltzer', 'Retriger all<br>cards played for<br>the next ${numc}10${endc} hands'],
    ['Spare Trousers', 'Gain ${multc}+2${endc} Mult if<br>played hand contains<br>a ${numc}Two Pair${endc}<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}'],
    ['Campfire', 'This Joker gains ${prodc}0.5${endc} Mult<br>for each card ${numc}sold${endc}, resets<br>when ${numc}Boss Blind${endc} is defeated<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc} Mult)${endc}'],
    ['Smiley Face', 'Played ${numc}face${endc} cards<br>give ${multc}+4${endc} Mult<br>when scored'],
    ['Ancient Joker', 'Each played card with<br>${[heartc, clubc, diamondc, spadec][Math.abs(jokerValue) % 4]} suit gives<br>${prodc}1.5${endc} Mult when scored<br>${shadowc}suit changes at end of round${endc}'],
    ['Walkie Talkie', 'Each played ${numc}10${endc} or ${numc}4${endc}<br>gives ${chipc}+10${endc} Chips and<br>${multc}+4${endc} Mult when scored'],
    ['Castle', 'This Joker gains ${chipc}+3${endc} Chips<br>per discarded ${[heartc, clubc, diamondc, spadec][Math.abs(jokerValue) % 4]} card,<br>suit changes every round<br>${shadowc}(Currently ${chipc}+${jokerValue * 3}${endc} Chips)${endc}']
  ]
];

const jokerStats = [
  [
    {blueprint_compat: true, eternal_compat: true, cost: 3},
  ],
];
