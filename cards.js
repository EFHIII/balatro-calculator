/*
LUA joker definitions
--Jokers
j_joker=            {order = 1,  unlocked = true,   start_alerted = true, discovered = true,  blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 2, name = "Joker", pos = {x=0,y=0}, set = "Joker", effect = "Mult", cost_mult = 1.0, config = {mult = 4}},
j_greedy_joker=     {order = 2,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Greedy Joker", pos = {x=6,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 3, suit = 'Diamonds'}}},
j_lusty_joker=      {order = 3,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Lusty Joker", pos = {x=7,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 3, suit = 'Hearts'}}},
j_wrathful_joker=   {order = 4,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Wrathful Joker", pos = {x=8,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 3, suit = 'Spades'}}},
j_gluttenous_joker= {order = 5,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Gluttonous Joker", pos = {x=9,y=1}, set = "Joker", effect = "Suit Mult", cost_mult = 1.0, config = {extra = {s_mult = 3, suit = 'Clubs'}}},
j_jolly=            {order = 6,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 3, name = "Jolly Joker", pos = {x=2,y=0}, set = "Joker", effect = "Type Mult", cost_mult = 1.0, config = {t_mult = 8, type = 'Pair'}},
j_zany=             {order = 7,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Zany Joker", pos = {x=3,y=0}, set = "Joker", effect = "Type Mult", cost_mult = 1.0, config = {t_mult = 12, type = 'Three of a Kind'}},
j_mad=              {order = 8,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Mad Joker", pos = {x=4,y=0}, set = "Joker", effect = "Type Mult", cost_mult = 1.0, config = {t_mult = 10, type = 'Two Pair'}},
j_crazy=            {order = 9,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Crazy Joker", pos = {x=5,y=0}, set = "Joker", effect = "Type Mult", cost_mult = 1.0, config = {t_mult = 12, type = 'Straight'}},
j_droll=            {order = 10,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Droll Joker", pos = {x=6,y=0}, set = "Joker", effect = "Type Mult", cost_mult = 1.0, config = {t_mult = 10, type = 'Flush'}},
j_sly=              {order = 11,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 3, name = "Sly Joker",set = "Joker", config = {t_chips = 50, type = 'Pair'}, pos = {x=0,y=14}},
j_wily=             {order = 12,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Wily Joker",set = "Joker", config = {t_chips = 100, type = 'Three of a Kind'}, pos = {x=1,y=14}},
j_clever=           {order = 13,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Clever Joker",set = "Joker", config = {t_chips = 80, type = 'Two Pair'}, pos = {x=2,y=14}},
j_devious=          {order = 14,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Devious Joker",set = "Joker", config = {t_chips = 100, type = 'Straight'}, pos = {x=3,y=14}},
j_crafty=           {order = 15,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Crafty Joker",set = "Joker", config = {t_chips = 80, type = 'Flush'}, pos = {x=4,y=14}},

j_half=             {order = 16,  unlocked = true,   discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Half Joker", pos = {x=7,y=0}, set = "Joker", effect = "Hand Size Mult", cost_mult = 1.0, config = {extra = {mult = 20, size = 3}}},
j_stencil=          {order = 17,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 8, name = "Joker Stencil", pos = {x=2,y=5}, set = "Joker", effect = "Hand Size Mult", cost_mult = 1.0, config = {}},
j_four_fingers=     {order = 18,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Four Fingers", pos = {x=6,y=6}, set = "Joker", effect = "", config = {}},
j_mime=             {order = 19,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Mime", pos = {x=4,y=1}, set = "Joker", effect = "Hand card double", cost_mult = 1.0, config = {extra = 1}},
j_credit_card=      {order = 20,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 1, name = "Credit Card", pos = {x=5,y=1}, set = "Joker", effect = "Credit", cost_mult = 1.0, config = {extra = 20}},
j_ceremonial=       {order = 21,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Ceremonial Dagger", pos = {x=5,y=5}, set = "Joker", effect = "", config = {mult = 0}},
j_banner=           {order = 22,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Banner", pos = {x=1,y=2}, set = "Joker", effect = "Discard Chips", cost_mult = 1.0, config = {extra = 30}},
j_mystic_summit=    {order = 23,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Mystic Summit", pos = {x=2,y=2}, set = "Joker", effect = "No Discard Mult", cost_mult = 1.0, config = {extra = {mult = 15, d_remaining = 0}}},
j_marble=           {order = 24,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Marble Joker", pos = {x=3,y=2}, set = "Joker", effect = "Stone card hands", cost_mult = 1.0, config = {extra = 1}},
j_loyalty_card=     {order = 25,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Loyalty Card", pos = {x=4,y=2}, set = "Joker", effect = "1 in 10 mult", cost_mult = 1.0, config = {extra = {Xmult = 4, every = 5, remaining = "5 remaining"}}},
j_8_ball=           {order = 26,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "8 Ball", pos = {x=0,y=5}, set = "Joker", effect = "Spawn Tarot", cost_mult = 1.0, config = {extra=4}},
j_misprint=         {order = 27,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Misprint", pos = {x=6,y=2}, set = "Joker", effect = "Random Mult", cost_mult = 1.0, config = {extra = {max = 23, min = 0}}},
j_dusk=             {order = 28,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Dusk", pos = {x=4,y=7}, set = "Joker", effect = "", config = {extra = 1}, unlock_condition = {type = '', extra = '', hidden = true}},
j_raised_fist=      {order = 29,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Raised Fist", pos = {x=8,y=2}, set = "Joker", effect = "Socialized Mult", cost_mult = 1.0, config = {}},
j_chaos=            {order = 30,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Chaos the Clown", pos = {x=1,y=0}, set = "Joker", effect = "Bonus Rerolls", cost_mult = 1.0, config = {extra = 1}},

j_fibonacci=        {order = 31,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 8, name = "Fibonacci", pos = {x=1,y=5}, set = "Joker", effect = "Card Mult", cost_mult = 1.0, config = {extra = 8}},
j_steel_joker=      {order = 32,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Steel Joker", pos = {x=7,y=2}, set = "Joker", effect = "Steel Card Buff", cost_mult = 1.0, config = {extra = 0.2}, enhancement_gate = 'm_steel'},
j_scary_face=       {order = 33,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Scary Face", pos = {x=2,y=3}, set = "Joker", effect = "Scary Face Cards", cost_mult = 1.0, config = {extra = 30}},
j_abstract=         {order = 34,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Abstract Joker", pos = {x=3,y=3}, set = "Joker", effect = "Joker Mult", cost_mult = 1.0, config = {extra = 3}},
j_delayed_grat=     {order = 35,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Delayed Gratification", pos = {x=4,y=3}, set = "Joker", effect = "Discard dollars", cost_mult = 1.0, config = {extra = 2}},
j_hack=             {order = 36,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Hack", pos = {x=5,y=2}, set = "Joker", effect = "Low Card double", cost_mult = 1.0, config = {extra = 1}},
j_pareidolia=       {order = 37,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Pareidolia", pos = {x=6,y=3}, set = "Joker", effect = "All face cards", cost_mult = 1.0, config = {}},
j_gros_michel=      {order = 38,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 1, cost = 5, name = "Gros Michel", pos = {x=7,y=6}, set = "Joker", effect = "", config = {extra = {odds = 6, mult = 15}}, no_pool_flag = 'gros_michel_extinct'},
j_even_steven=      {order = 39,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Even Steven", pos = {x=8,y=3}, set = "Joker", effect = "Even Card Buff", cost_mult = 1.0, config = {extra = 4}},
j_odd_todd=         {order = 40,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Odd Todd", pos = {x=9,y=3}, set = "Joker", effect = "Odd Card Buff", cost_mult = 1.0, config = {extra = 31}},
j_scholar=          {order = 41,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Scholar", pos = {x=0,y=4}, set = "Joker", effect = "Ace Buff", cost_mult = 1.0, config = {extra = {mult = 4, chips = 20}}},
j_business=         {order = 42,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Business Card", pos = {x=1,y=4}, set = "Joker", effect = "Face Card dollar Chance", cost_mult = 1.0, config = {extra = 2}},
j_supernova=        {order = 43,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Supernova", pos = {x=2,y=4}, set = "Joker", effect = "Hand played mult", cost_mult = 1.0, config = {extra = 1}},
j_ride_the_bus=     {order = 44,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 1, cost = 6, name = "Ride the Bus", pos = {x=1,y=6}, set = "Joker", effect = "", config = {extra = 1}, unlock_condition = {type = 'discard_custom'}},
j_space=            {order = 45,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Space Joker", pos = {x=3,y=5}, set = "Joker", effect = "Upgrade Hand chance", cost_mult = 1.0, config = {extra = 4}},

j_egg=              {order = 46,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = 'Egg', pos = {x = 0, y = 10}, set = 'Joker', config = {extra = 3}},
j_burglar=          {order = 47,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = 'Burglar', pos = {x = 1, y = 10}, set = 'Joker', config = {extra = 3}},
j_blackboard=       {order = 48,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = 'Blackboard', pos = {x = 2, y = 10}, set = 'Joker', config = {extra = 3}},
j_runner=           {order = 49,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 1, cost = 5, name = 'Runner', pos = {x = 3, y = 10}, set = 'Joker', config = {extra = {chips = 0, chip_mod = 15}}},
j_ice_cream=        {order = 50,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 1, cost = 5, name = 'Ice Cream', pos = {x = 4, y = 10}, set = 'Joker', config = {extra = {chips = 100, chip_mod = 5}}},
j_dna=              {order = 51,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = 'DNA', pos = {x = 5, y = 10}, set = 'Joker', config = {}},
j_splash=           {order = 52,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 3, name = 'Splash', pos = {x = 6, y = 10}, set = 'Joker', config = {}},
j_blue_joker=       {order = 53,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = 'Blue Joker', pos = {x = 7, y = 10}, set = 'Joker', config = {extra = 2}},
j_sixth_sense=      {order = 54,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = 'Sixth Sense', pos = {x = 8, y = 10}, set = 'Joker', config = {}},
j_constellation=    {order = 55,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = 'Constellation', pos = {x = 9, y = 10}, set = 'Joker', config = {extra = 0.1, Xmult = 1}},
j_hiker=            {order = 56,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = 'Hiker', pos = {x = 0, y = 11}, set = 'Joker', config = {extra = 5}},
j_faceless=         {order = 57,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = 'Faceless Joker', pos = {x = 1, y = 11}, set = 'Joker', config = {extra = {dollars = 5, faces = 3}}},
j_green_joker=      {order = 58,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 1, cost = 4, name = 'Green Joker', pos = {x = 2, y = 11}, set = 'Joker', config = {extra = {hand_add = 1, discard_sub = 1}}},
j_superposition=    {order = 59,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = 'Superposition', pos = {x = 3, y = 11}, set = 'Joker', config = {}},
j_todo_list=        {order = 60,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = 'To Do List', pos = {x = 4, y = 11}, set = 'Joker', config = {extra = {dollars = 4, poker_hand = 'High Card'}}},

j_cavendish=        {order = 61,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 1, cost = 4, name = "Cavendish", pos = {x=5,y=11}, set = "Joker", cost_mult = 1.0, config = {extra = {odds = 1000, Xmult = 3}}, yes_pool_flag = 'gros_michel_extinct'},
j_card_sharp=       {order = 62,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Card Sharp", pos = {x=6,y=11}, set = "Joker", cost_mult = 1.0, config = {extra = {Xmult = 3}}},
j_red_card=         {order = 63,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 1, cost = 5, name = "Red Card", pos = {x=7,y=11}, set = "Joker", cost_mult = 1.0, config = {extra = 3}},
j_madness=          {order = 64,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 7, name = "Madness", pos = {x=8,y=11}, set = "Joker", cost_mult = 1.0, config = {extra = 0.5}},
j_square=           {order = 65,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 1, cost = 4, name = "Square Joker", pos = {x=9,y=11}, set = "Joker", cost_mult = 1.0, config = {extra = {chips = 0, chip_mod = 4}}},
j_seance=           {order = 66,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Seance", pos = {x=0,y=12}, set = "Joker", cost_mult = 1.0, config = {extra = {poker_hand = 'Straight Flush'}}},
j_riff_raff=        {order = 67,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 6, name = "Riff-raff", pos = {x=1,y=12}, set = "Joker", cost_mult = 1.0, config = {extra = 2}},
j_vampire=          {order = 68,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 7, name = "Vampire",set = "Joker", config = {extra = 0.1, Xmult = 1},  pos = {x=2,y=12}},
j_shortcut=         {order = 69,  unlocked = true, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Shortcut",set = "Joker", config = {},  pos = {x=3,y=12}},
j_hologram=         {order = 70,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 7, name = "Hologram",set = "Joker", config = {extra = 0.25, Xmult = 1},  pos = {x=4,y=12}, soul_pos = {x=2, y=9},},
j_vagabond=         {order = 71,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Vagabond",set = "Joker", config = {extra = 4}, pos = {x=5,y=12}},
j_baron=            {order = 72,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Baron",set = "Joker", config = {extra = 1.5}, pos = {x=6,y=12}},
j_cloud_9=          {order = 73,  unlocked = true, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Cloud 9",set = "Joker", config = {extra = 1}, pos = {x=7,y=12}},
j_rocket=           {order = 74,  unlocked = true, discovered = false, blueprint_compat = false, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Rocket",set = "Joker", config = {extra = {dollars = 1, increase = 2}}, pos = {x=8,y=12}},
j_obelisk=          {order = 75,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 3, cost = 8, name = "Obelisk",set = "Joker", config = {extra = 0.2, Xmult = 1}, pos = {x=9,y=12}},

j_midas_mask=       {order = 76,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Midas Mask",set = "Joker", config = {}, pos = {x=0,y=13}},
j_luchador=         {order = 77,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 5, name = "Luchador",set = "Joker", config = {}, pos = {x=1,y=13}},
j_photograph=       {order = 78,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Photograph",set = "Joker", config = {extra = 2}, pos = {x=2,y=13}},
j_gift=             {order = 79,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Gift Card",set = "Joker", config = {extra = 1}, pos = {x=3,y=13}},
j_turtle_bean=      {order = 80,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Turtle Bean",set = "Joker", config = {extra = {h_size = 5, h_mod = 1}}, pos = {x=4,y=13}},
j_erosion=          {order = 81,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Erosion",set = "Joker", config = {extra = 4}, pos = {x=5,y=13}},
j_reserved_parking= {order = 82,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 6, name = "Reserved Parking",set = "Joker", config = {extra = {odds = 2, dollars = 1}}, pos = {x=6,y=13}},
j_mail=             {order = 83,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Mail-In Rebate",set = "Joker", config = {extra = 5}, pos = {x=7,y=13}},
j_to_the_moon=      {order = 84,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "To the Moon",set = "Joker", config = {extra = 1}, pos = {x=8,y=13}},
j_hallucination=    {order = 85,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Hallucination",set = "Joker", config = {extra = 2}, pos = {x=9,y=13}},
j_fortune_teller=   {order = 86,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 6, name = "Fortune Teller", pos = {x=7,y=5}, set = "Joker", effect = "", config = {extra = 1}},
j_juggler=          {order = 87,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Juggler", pos = {x=0,y=1}, set = "Joker", effect = "Hand Size", cost_mult = 1.0, config = {h_size = 1}},
j_drunkard=         {order = 88,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Drunkard", pos = {x=1,y=1}, set = "Joker", effect = "Discard Size", cost_mult = 1.0, config = {d_size = 1}},
j_stone=            {order = 89,  unlocked = true,  discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Stone Joker", pos = {x=9,y=0}, set = "Joker", effect = "Stone Card Buff", cost_mult = 1.0, config = {extra = 25}, enhancement_gate = 'm_stone'},
j_golden=           {order = 90,  unlocked = true,  discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 6, name = "Golden Joker", pos = {x=9,y=2}, set = "Joker", effect = "Bonus dollars", cost_mult = 1.0, config = {extra = 4}},

j_lucky_cat=        {order = 91,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Lucky Cat",set = "Joker", config = {Xmult = 1, extra = 0.25}, pos = {x=5,y=14}, enhancement_gate = 'm_lucky'},
j_baseball=         {order = 92,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Baseball Card",set = "Joker", config = {extra = 1.5}, pos = {x=6,y=14}},
j_bull=             {order = 93,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Bull",set = "Joker", config = {extra = 2}, pos = {x=7,y=14}},
j_diet_cola=        {order = 94,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Diet Cola",set = "Joker", config = {}, pos = {x=8,y=14}},
j_trading=          {order = 95,   unlocked = true, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Trading Card",set = "Joker", config = {extra = 3}, pos = {x=9,y=14}},
j_flash=            {order = 96,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 5, name = "Flash Card",set = "Joker", config = {extra = 2, mult = 0}, pos = {x=0,y=15}},
j_popcorn=          {order = 97,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 1, cost = 5, name = "Popcorn",set = "Joker", config = {mult = 20, extra = 4}, pos = {x=1,y=15}},
j_trousers=         {order = 98,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Spare Trousers",set = "Joker", config = {extra = 2}, pos = {x=4,y=15}},
j_ancient=          {order = 99,   unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Ancient Joker",set = "Joker", config = {extra = 1.5}, pos = {x=7,y=15}},
j_ramen=            {order = 100,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Ramen",set = "Joker", config = {Xmult = 2, extra = 0.01}, pos = {x=2,y=15}},
j_walkie_talkie=    {order = 101,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Walkie Talkie",set = "Joker", config = {extra = {chips = 10, mult = 4}}, pos = {x=8,y=15}},
j_selzer=           {order = 102,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 6, name = "Seltzer",set = "Joker", config = {extra = 10}, pos = {x=3,y=15}},
j_castle=           {order = 103,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Castle",set = "Joker", config = {extra = {chips = 0, chip_mod = 3}}, pos = {x=9,y=15}},
j_smiley=           {order = 104,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Smiley Face",set = "Joker", config = {extra = 5}, pos = {x=6,y=15}},
j_campfire=         {order = 105,  unlocked = true, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 9, name = "Campfire",set = "Joker", config = {extra = 0.25}, pos = {x=5,y=15}},

j_ticket=           {order = 106,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Golden Ticket", pos = {x=5,y=3}, set = "Joker", effect = "dollars for Gold cards", cost_mult = 1.0, config = {extra = 4},unlock_condition = {type = 'hand_contents', extra = 'Gold'}, enhancement_gate = 'm_gold'},
j_mr_bones=         {order = 107,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = false, rarity = 2, cost = 5, name = "Mr. Bones", pos = {x=3,y=4}, set = "Joker", effect = "Prevent Death", cost_mult = 1.0, config = {},unlock_condition = {type = 'c_losses', extra = 5}},
j_acrobat=          {order = 108,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Acrobat", pos = {x=2,y=1}, set = "Joker", effect = "Shop size", cost_mult = 1.0, config = {extra = 3},unlock_condition = {type = 'c_hands_played', extra = 200}},
j_sock_and_buskin=  {order = 109,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Sock and Buskin", pos = {x=3,y=1}, set = "Joker", effect = "Face card double", cost_mult = 1.0, config = {extra = 1},unlock_condition = {type = 'c_face_cards_played', extra = 300}},
j_swashbuckler=     {order = 110,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Swashbuckler", pos = {x=9,y=5}, set = "Joker", effect = "Set Mult", cost_mult = 1.0, config = {mult = 1},unlock_condition = {type = 'c_jokers_sold', extra = 20}},
j_troubadour=       {order = 111,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Troubadour", pos = {x=0,y=2}, set = "Joker", effect = "Hand Size, Plays", cost_mult = 1.0, config = {extra = {h_size = 2, h_plays = -1}}, unlock_condition = {type = 'round_win', extra = 5}},
j_certificate=      {order = 112,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Certificate", pos = {x=8,y=8}, set = "Joker", effect = "", config = {}, unlock_condition = {type = 'double_gold'}},
j_smeared=          {order = 113,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Smeared Joker", pos = {x=4,y=6}, set = "Joker", effect = "", config = {}, unlock_condition = {type = 'modify_deck', extra = {count = 3, enhancement = 'Wild Card', e_key = 'm_wild'}}},
j_throwback=        {order = 114,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Throwback", pos = {x=5,y=7}, set = "Joker", effect = "", config = {extra = 0.25}, unlock_condition = {type = 'continue_game'}},
j_hanging_chad=     {order = 115,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 4, name = "Hanging Chad", pos = {x=9,y=6}, set = "Joker", effect = "", config = {extra = 2}, unlock_condition = {type = 'round_win', extra = 'High Card'}},
j_rough_gem=        {order = 116,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Rough Gem", pos = {x=9,y=7}, set = "Joker", effect = "", config = {extra = 1}, unlock_condition = {type = 'modify_deck', extra = {count = 30, suit = 'Diamonds'}}},
j_bloodstone=       {order = 117,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Bloodstone", pos = {x=0,y=8}, set = "Joker", effect = "", config = {extra = {odds = 2, Xmult = 1.5}}, unlock_condition = {type = 'modify_deck', extra = {count = 30, suit = 'Hearts'}}},
j_arrowhead=        {order = 118,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Arrowhead", pos = {x=1,y=8}, set = "Joker", effect = "", config = {extra = 50}, unlock_condition = {type = 'modify_deck', extra = {count = 30, suit = 'Spades'}}},
j_onyx_agate=       {order = 119,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Onyx Agate", pos = {x=2,y=8}, set = "Joker", effect = "", config = {extra = 7}, unlock_condition = {type = 'modify_deck', extra = {count = 30, suit = 'Clubs'}}},
j_glass=            {order = 120,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 2, cost = 6, name = "Glass Joker", pos = {x=1,y=3}, set = "Joker", effect = "Glass Card", cost_mult = 1.0, config = {extra = 0.75, Xmult = 1}, unlock_condition = {type = 'modify_deck', extra = {count = 5, enhancement = 'Glass Card', e_key = 'm_glass'}}, enhancement_gate = 'm_glass'},

j_ring_master=      {order = 121,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 5, name = "Showman", pos = {x=6,y=5}, set = "Joker", effect = "", config = {}, unlock_condition = {type = 'ante_up', ante = 4}},
j_flower_pot=       {order = 122,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Flower Pot", pos = {x=0,y=6}, set = "Joker", effect = "", config = {extra = 3}, unlock_condition = {type = 'ante_up', ante = 8}},
j_blueprint=        {order = 123,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 10,name = "Blueprint", pos = {x=0,y=3}, set = "Joker", effect = "Copycat", cost_mult = 1.0, config = {},unlock_condition = {type = 'win_custom'}},
j_wee=              {order = 124,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = false, eternal_compat = true, rarity = 3, cost = 8, name = "Wee Joker", pos = {x=0,y=0}, set = "Joker", effect = "", config = {extra = {chips = 0, chip_mod = 8}}, unlock_condition = {type = 'win', n_rounds = 18}},
j_merry_andy=       {order = 125,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Merry Andy", pos = {x=8,y=0}, set = "Joker", effect = "", cost_mult = 1.0, config = {d_size = 3, h_size = -1}, unlock_condition = {type = 'win', n_rounds = 12}},
j_oops=             {order = 126,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 4, name = "Oops! All 6s", pos = {x=5,y=6}, set = "Joker", effect = "", config = {}, unlock_condition = {type = 'chip_score', chips = 10000}},
j_idol=             {order = 127,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "The Idol", pos = {x=6,y=7}, set = "Joker", effect = "", config = {extra = 2}, unlock_condition = {type = 'chip_score', chips = 1000000}},
j_seeing_double=    {order = 128,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Seeing Double", pos = {x=4,y=4}, set = "Joker", effect = "X1.5 Mult club 7", cost_mult = 1.0, config = {extra = 2},unlock_condition = {type = 'hand_contents', extra = 'four 7 of Clubs'}},
j_matador=          {order = 129,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Matador", pos = {x=4,y=5}, set = "Joker", effect = "", config = {extra = 8}, unlock_condition = {type = 'round_win'}},
j_hit_the_road=     {order = 130,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Hit the Road", pos = {x=8,y=5}, set = "Joker", effect = "Jack Discard Effect", cost_mult = 1.0, config = {extra = 0.5}, unlock_condition = {type = 'discard_custom'}},
j_duo=              {order = 131,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "The Duo", pos = {x=5,y=4}, set = "Joker", effect = "X1.5 Mult", cost_mult = 1.0, config = {Xmult = 2, type = 'Pair'}, unlock_condition = {type = 'win_no_hand', extra = 'Pair'}},
j_trio=             {order = 132,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "The Trio", pos = {x=6,y=4}, set = "Joker", effect = "X2 Mult", cost_mult = 1.0, config = {Xmult = 3, type = 'Three of a Kind'}, unlock_condition = {type = 'win_no_hand', extra = 'Three of a Kind'}},
j_family=           {order = 133,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "The Family", pos = {x=7,y=4}, set = "Joker", effect = "X3 Mult", cost_mult = 1.0, config = {Xmult = 4, type = 'Four of a Kind'}, unlock_condition = {type = 'win_no_hand', extra = 'Four of a Kind'}},
j_order=            {order = 134,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "The Order", pos = {x=8,y=4}, set = "Joker", effect = "X3 Mult", cost_mult = 1.0, config = {Xmult = 3, type = 'Straight'}, unlock_condition = {type = 'win_no_hand', extra = 'Straight'}},
j_tribe=            {order = 135,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "The Tribe", pos = {x=9,y=4}, set = "Joker", effect = "X3 Mult", cost_mult = 1.0, config = {Xmult = 2, type = 'Flush'}, unlock_condition = {type = 'win_no_hand', extra = 'Flush'}},

j_stuntman=         {order = 136,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 7, name = "Stuntman", pos = {x=8,y=6}, set = "Joker", effect = "", config = {extra = {h_size = 2, chip_mod = 250}}, unlock_condition = {type = 'chip_score', chips = 100000000}},
j_invisible=        {order = 137,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = false, rarity = 3, cost = 8, name = "Invisible Joker", pos = {x=1,y=7}, set = "Joker", effect = "", config = {extra = 2}, unlock_condition = {type = 'win_custom'}},
j_brainstorm=       {order = 138,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 10, name = "Brainstorm", pos = {x=7,y=7}, set = "Joker", effect = "Copycat", config = {}, unlock_condition = {type = 'discard_custom'}},
j_satellite=        {order = 139,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Satellite", pos = {x=8,y=7}, set = "Joker", effect = "", config = {extra = 1}, unlock_condition = {type = 'money', extra = 400}},
j_shoot_the_moon=   {order = 140,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 1, cost = 5, name = "Shoot the Moon", pos = {x=2,y=6}, set = "Joker", effect = "", config = {extra = 13}, unlock_condition = {type = 'play_all_hearts'}},
j_drivers_license=  {order = 141,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 7, name = "Driver's License", pos = {x=0,y=7}, set = "Joker", effect = "", config = {extra = 3}, unlock_condition = {type = 'modify_deck', extra = {count = 16, tally = 'total'}}},
j_cartomancer=      {order = 142,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 6, name = "Cartomancer", pos = {x=7,y=3}, set = "Joker", effect = "Tarot Buff", cost_mult = 1.0, config = {}, unlock_condition = {type = 'discover_amount', tarot_count = 22}},
j_astronomer=       {order = 143,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 8, name = "Astronomer", pos = {x=2,y=7}, set = "Joker", effect = "", config = {}, unlock_condition = {type = 'discover_amount', planet_count = 12}},
j_burnt=            {order = 144,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 3, cost = 8, name = "Burnt Joker", pos = {x=3,y=7}, set = "Joker", effect = "", config = {h_size = 0, extra = 4}, unlock_condition = {type = 'c_cards_sold', extra = 50}},
j_bootstraps=       {order = 145,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 2, cost = 7, name = "Bootstraps", pos = {x=9,y=8}, set = "Joker", effect = "", config = {extra = {mult = 2, dollars = 5}}, unlock_condition = {type = 'modify_jokers', extra = {polychrome = true, count = 2}}},
j_Canio=            {order = 146,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 4, cost = 20, name = "Canio", pos = {x=3,y=8}, soul_pos = {x=3, y=9}, set = "Joker", effect = "", config = {extra = 1}, unlock_condition = {type = '', extra = '', hidden = true}},
j_triboulet=        {order = 147,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 4, cost = 20, name = "Triboulet", pos = {x=4,y=8}, soul_pos = {x=4, y=9}, set = "Joker", effect = "", config = {extra = 2}, unlock_condition = {type = '', extra = '', hidden = true}},
j_yorick=           {order = 148,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 4, cost = 20, name = "Yorick", pos = {x=5,y=8}, soul_pos = {x=5, y=9}, set = "Joker", effect = "", config = {extra = {xmult = 1, discards = 23}}, unlock_condition = {type = '', extra = '', hidden = true}},
j_chicot=           {order = 149,  unlocked = false, discovered = false, blueprint_compat = false, perishable_compat = true, eternal_compat = true, rarity = 4, cost = 20, name = "Chicot", pos = {x=6,y=8}, soul_pos = {x=6, y=9}, set = "Joker", effect = "", config = {}, unlock_condition = {type = '', extra = '', hidden = true}},
j_perkeo=           {order = 150,  unlocked = false, discovered = false, blueprint_compat = true, perishable_compat = true, eternal_compat = true, rarity = 4, cost = 20, name = "Perkeo", pos = {x=7,y=8}, soul_pos = {x=7, y=9}, set = "Joker", effect = "", config = {}, unlock_condition = {type = '', extra = '', hidden = true}},

*/

const endc = `</span>`;
const multc = `<span style='color: #ff4d40'>`;
const prodc = `<span style='color: #fff; background-color: #ff4d40; border-left: solid; border: solid; border-color: #ff4d40; border-width: 0px 2px 1px 2px; padding-left: 1px; border-radius: 3px;'>X`;
const chipc = `<span style='color: #009dff'>`;
const numc = `<span style='color: #ff8f00'>`;
const moneyc = `<span style='color: #f5b143'>`;
const probc = `<span style='color: #35bd87'>`;

const shadowc = `<span style='color: #ababab'>`;

const diamondc = `<span style='color: #f15a27'>Diamond</span>`;
const heartc = `<span style='color: #f11b51'>Heart</span>`;
const spadec = `<span style='color: #242c56'>Spade</span>`;
const clubc = `<span style='color: #074540'>Club</span>`;

const diamondsc = `<span style='color: #f15a27'>Diamonds</span>`;
const heartsc = `<span style='color: #f11b51'>Hearts</span>`;
const spadesc = `<span style='color: #242c56'>Spades</span>`;
const clubsc = `<span style='color: #074540'>Clubs</span>`;

const spectralc = `<span style='color: #2e76fd'>Spectral</span>`;
const planetc = `<span style='color: #00a7ca'>Planet</span>`;
const tarotc = `<span style='color: #9e74ce'>Tarot</span>`;

const celestialc = `<span style='color: #00a7ca'>Celestial Packs</span>`;

const negativec = `<span style='color: #55a'>Negative</span>`;

const commonc = `<span style='color: #0095ff'>Common</span>`;

const roomc = `<br>${shadowc}(Must have room)${endc}`;

const rankNames = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'Jack', 'Queen', 'King', 'Ace'
];
const suitNames = [
  heartsc, clubsc, diamondsc, spadesc
];

const toggleJokerc = '<br>${shadowc}(Currently ${jokerValue ? `${probc}active${endc}` : `${multc}inactive${endc}`})${endc}';

const rarityNames = [
  'Common',
  'Uncommon',
  'Rare',
  'Legendary'
];





const jokerPrice = [
  [ 2, 4, 3, 4, 4, 4, 4, 5, 7, 6],
  [ 4, 4, 6, 6, 5, 1, 5, 5, 5, 5],
  [ 6, 5, 5, 6, 5, 6, 4, 7, 5, 6],
  [10, 6, 4, 4, 4, 5, 5, 6, 4, 4],
  [ 8, 4, 5, 5, 6, 8, 8, 8, 8, 8],
  [ 5, 8, 8, 5, 7, 6, 5, 6, 8, 4],
  [ 6, 6, 5, 4, 7, 4, 7, 5, 7, 4],
  [ 7, 8, 8, 6, 5, 6, 6,10, 6, 7],
  [ 7, 7, 7,20,20,20,20,20, 6, 7],
  [],
  [ 4, 6, 6, 5, 5, 8, 3, 5, 6, 6],
  [ 5, 4, 4, 4, 4, 4, 6, 5, 7, 4],
  [ 6, 6, 7, 7, 7, 8, 8, 7, 6, 8],
  [ 7, 5, 5, 6, 6, 6, 6, 4, 5, 4],
  [ 3, 4, 4, 4, 4, 6, 8, 6, 6, 6],
  [ 5, 5, 6, 6, 6, 9, 4, 8, 4, 6]
];

const jokerRarity = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [2, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [2, 0, 0, 1, 1, 2, 2, 2, 2, 2],
  [0, 1, 1, 1, 1, 1, 1, 0, 2, 0],
  [1, 0, 0, 0, 1, 1, 1, 0, 2, 0],
  [2, 2, 1, 2, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 3, 3, 3, 3, 3, 1, 1],
  [],
  [0, 1, 1, 0, 0, 2, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 2, 2, 1, 1, 2],
  [1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 2, 1, 1, 1],
  [1, 0, 1, 1, 1, 2, 0, 2, 0, 1],
];

let playfieldJokers = {};

const jokerTexts = [
  [
    ['Joker', '${multc}+4${endc} Mult'],
    ['Chaos the Clown', '${numc}1${endc} free ${probc}Reroll${endc}<br>per shop'],
    ['Jolly Joker', '${multc}+8${endc} Mult if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['Zany Joker', '${multc}+12${endc} Mult if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['Mad Joker', '${multc}+10${endc} Mult if played<br>hand contains<br>a ${numc}Two Pair${endc}'],
    ['Crazy Joker', '${multc}+12${endc} Mult if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['Droll Joker', '${multc}+10${endc} Mult if played<br>hand contains<br>a ${numc}Flush${endc}'],

    ['Half Joker', '${multc}+20${endc} Mult if played<br>hand contains<br>${numc}3${endc} or fewer cards'],
    ['Merry Andy', '${multc}+3${endc} discards,<br>${multc}-1${endc} hand size'],
    ['Stone Joker', 'This Joker gains ${chipc}+25${endc} Chips<br>for each ${numc}Stone Card${endc} in your full deck<br>${shadowc}(Currently ${chipc}+${25*jokerValue}${endc} Chips)${endc}', 'Stone Cards']
  ],
  [
    ['Juggler', '${numc}+1${endc} hand size'],
    ['Drunkard', '${multc}+1${endc} discard'],
    ['Acrobat', '${prodc}3${endc} Mult on ${numc}final<br>hand${endc} of round' + toggleJokerc, 'Active?'],
    ['Sock and Buskin', 'Retrigger all<br>played ${numc}face${endc} cards'],
    ['Mime', 'Retrigger all<br>card ${numc}held in<br>hand${endc} abilities'],
    ['Credit Card', 'Go up to<br>${multc}-$20${endc} in debt'],
    ['Greedy Joker', 'Played cards with<br>${diamondc} suit give<br>${multc}+3${endc} Mult when scored'],
    ['Lusty Joker', 'Played cards with<br>${heartc} suit give<br>${multc}+3${endc} Mult when scored'],
    ['Wrathful Joker', 'Played cards with<br>${spadec} suit give<br>${multc}+3${endc} Mult when scored'],
    ['Gluttonous Joker', 'Played cards with<br>${clubc} suit give<br>${multc}+3${endc} Mult when scored']
  ],
  [
    ['Troubadour', '${numc}+2${endc} hand size,<br>${multc}-1${endc} hands per round'],
    ['Banner', '${chipc}+30${endc} Chips for<br>each remaining<br>${numc}discard${endc}<br>${shadowc}(Currently ${chipc}+${jokerValue * 30}${endc} Chips)${endc}', 'Discards'],
    ['Mystic Summit', '${multc}+15${endc} Mult when<br>${numc}0${endc} discards<br>remaining' + toggleJokerc, 'Active?'],
    ['Marble Joker', 'Adds one ${numc}Stone${endc} card<br>to deck when<br>${numc}Blind${endc} is selected'],
    ['Loyalty Card', '${prodc}4${endc} Mult every<br>${numc}6${endc} hands played<br>${shadowc}(${jokerValue % 6} remaining)${endc}', 'Remaining'],
    ['Hack', 'Retrigger<br>each played<br>${numc}2${endc}, ${numc}3${endc}, ${numc}4${endc}, or ${numc}5${endc}'],
    ['Misprint', '${multc}+0${endc} - ${multc}+23${endc} Mult'],
    ['Steel Joker', 'This Joker gains ${prodc}0.2${endc} Mult<br>for each ${numc}Steel Card${endc}<br>in your full deck<br>${shadowc}(Currently ${prodc}${Math.round((1 + jokerValue * 0.2) * 10) / 10}${endc} Mult)${endc}', 'Steel Cards'],
    ['Raised Fist', 'Adds ${numc}double${endc} the rank<br>of ${numc}lowest${endc} card held in hand to Mult'],
    ['Golden Joker', 'Earn ${moneyc}$4${endc} at<br>end of round']
  ],
  [
    ['Blueprint', 'Copies ability of<br>${numc}Joker${endc} to the right'],
    ['Glass Joker', 'This Joker gains ${prodc}0.75${endc} Mult<br>for every ${numc}Glass Card${endc}<br>that is destroyed<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.75}${endc} Mult)${endc}', 'Glass Cards Destroyed'],
    ['Scary Face', 'Played ${numc}face${endc} cards<br>give ${chipc}+30${endc} Chips<br>when scored'],
    ['Abstract Joker', '${multc}+3${endc} Mult for<br>each ${numc}Joker${endc} card'],
    ['Delayed Gratification', 'Earn ${moneyc}$2${endc} per ${numc}discard${endc} if<br>no discards are used<br>by end of the round'],
    ['Golden Ticket', 'Played ${moneyc}Gold${endc} cards<br>earn ${moneyc}$4${endc} when scored'],
    ['Pareidolia', 'All cards are<br>considered<br>${numc}Face${endc} cards'],
    ['Cartomancer', 'Create a ${tarotc} card<br>when ${numc}Blind${endc} is selected${roomc}'],
    ['Even Steven', 'Played cards with<br>${numc}even${endc} rank give<br>${multc}+4${endc} Mult when scored<br>${shadowc}(10, 8, 6, 4, 2)${endc}'],
    ['Odd Todd', 'Played cards with<br>${numc}odd${endc} rank give<br>${chipc}+31${endc} Chips when scored<br>${shadowc}(A, 9, 7, 5, 3)${endc}']
  ],
  [
    ['Wee Joker', 'This Joker gains<br>${chipc}+8${endc} Chips when each<br>played ${numc}2${endc} is scored<br>${shadowc}(Currently ${chipc}+${jokerValue * 8}${endc} Chips)${endc}', 'Scored 2s'],
    ['Business Card', 'Played ${numc}Face${endc} cards have<br>a ${probc}1 in 2${endc} chance to<br>give ${moneyc}$2${endc} when scored'],
    ['Supernova', 'Adds the number of<br>times ${numc}poker hand${endc} has<br>been played to Mult'],
    ['Mr. Bones', 'Prevents Death<br>if chips scored<br>are at least ${numc}25%${endc}<br>of required chips<br>${multc}self destructs${endc}'],
    ['Seeing Double', '${prodc}2${endc} Mult if played<br>hand has a scoring<br>Club card and a scoring<br>card of any other ${numc}suit${endc}'],
    ['The Duo', '${prodc}2${endc} Mult if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['The Trio', '${prodc}3${endc} Mult if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['The Family', '${prodc}4${endc} Mult if played<br>hand contains<br>a ${numc}Four of a Kind${endc}'],
    ['The Order', '${prodc}3${endc} Mult if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['The Tribe', '${prodc}2${endc} Mult if played<br>hand contains<br>a ${numc}Flush${endc}']
  ],
  [
    ['8 Ball', '${probc}1 in 4${endc} chance for each<br>played ${numc}8s${endc} to create a<br>${tarotc} when scored${roomc}'],
    ['Fibonacci', 'Each plaed ${numc}Ace${endc},<br>${numc}2${endc}, ${numc}3${endc}, ${numc}5${endc}, or ${numc}8${endc} gives<br>${multc}+8${endc} Mult when scored'],
    ['Joker Stencil', '${prodc}1${endc} Mult for each<br>empty ${numc}Joker${endc} slot<br>Joker stencil included<br>${shadowc}(Currently ${prodc}${1 + jokerValue}${endc})${endc}', 'Other Empty Slots'],
    ['Space Joker', '${probc}1 in 4${endc} chance to<br>upgrade level of<br>played ${numc}poker hand${endc}'],
    ['Matador', 'Earn ${moneyc}$8${endc} if played<br>hand triggers the<br>${numc}Boss Blind${endc} ability'],
    ['Ceremonial Dagger', 'When ${numc}Blind${endc} is selected,<br>destroy Joker to the right<br>and permanently add ${numc}double${endc}<br>its sell value to this ${multc}Mult${endc}<br>${shadowc}(Currently ${multc}+${jokerValue}${endc} Mult)${endc}', 'Mult'],
    ['Showman', '${numc}Joker${endc}, ${tarotc}, ${planetc},<br>and ${spectralc} cards may<br>appear multiple times'],
    ['Fortune Teller', '${multc}+1${endc} Mult per ${tarotc}<br>card used this run<br>${shadowc}(Currently ${multc}${jokerValue}${endc})${endc}', 'Tarots Used'],
    ['Hit the Road', 'This Joker gains ${prodc}0.5${endc} Mult<br>for every ${numc}Jack${endc}<br>discarded this round<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc})${endc}', 'Jacks Discarded'],
    ['Swashbuckler', 'Adds the sell value<br>of all other owned<br>${numc}Jokers${endc} to Mult'],
  ],
  [
    ['Flower Pot', '${prodc}3${endc} Mult if poker<br>hand contains a<br>${diamondc} card, ${clubc} card,<br>${heartc} card, and ${spadec} card'],
    ['Ride the Bus', 'This Joker gains ${multc}+1${endc} Mult<br>per consecutive hand<br>played without a<br>scoring ${numc}face${endc} card<br>${shadowc}(Currently ${multc}+${jokerValue}${endc})${endc}', 'Consecutive Hands Played'],
    ['Shoot the Moon', '${multc}+13${endc} Mult for<br>each ${numc}Queen${endc}<br>held in hand'],
    ['Scholar', 'Played ${numc}Aces${endc}<br>give ${chipc}+20${endc} Chips<br>and ${multc}+4${endc} Mult<br>when scored'],
    ['Smeared Joker', '${heartc} and ${diamondc}<br>count as the same suit,<br>${spadec} and ${clubc}<br>count as the same suit'],
    ['Oops! All 6s', 'Double all ${numc}listed${endc}<br>${probc}probabilities${endc}<br>${shadowc}(ex: ${probc}1 in 3${endc} -> ${probc}2 in 3${endc})${endc}'],
    ['Four Fingers', 'All ${numc}Flushes${endc} and<br>${numc}Straights${endc} can be<br>made with ${numc}4${endc} cards'],
    ['Gros Michel', '${multc}+15${endc} Mult<br>${probc}1 in 6${endc} chance this card is destroyed<br>at the end of the round'],
    ['Stuntman', '${chipc}+250${endc} Chips,<br>${numc}-2${endc} hand size'],
    ['Hanging Chad', 'Retrigger ${numc}first${endc} played<br>card used in scoring<br>${numc}2${endc} additional times'],
  ],
  [
    ["Driver's License", '${prodc}3${endc} Mult if you have<br>at least ${numc}16${endc} Enhanced<br>cards in your full deck<br>${shadowc}(Currently ${numc}${jokerValue}${endc})${endc}', 'Enhanced Cards'],
    ['Invisible Joker', 'After 2 rounds,<br>sell this card to<br>${numc}duplicate${endc} a random Joker<br>${shadowc}(Currently ${numc}${jokerValue}${endc}/2)${endc}', 'Rounds'],
    ['Astronomer', 'All ${planetc} cards and<br>${celestialc} in<br>the shop are ${numc}free${endc}'],
    ['Burnt Joker', 'Upgrade the level of<br>the first ${numc}discarded${endc}<br>poker hand each round'],
    ['Dusk', 'Retrigger all played<br>cards in ${numc}final<br>hand${endc} of round' + toggleJokerc, 'Active?'],
    ['Throwback', '${prodc}0.25${endc} Mult for each<br>${numc}Blind${endc} skipped this run<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}', 'Skipped Blinds'],
    ['The Idol', 'Each played ${numc}${rankNames[Math.floor(Math.abs(jokerValue)/4) % 13]}${endc}<br>of ${suitNames[Math.abs(jokerValue) % 4]} gives<br>${prodc}2${endc} Mult when scored<br>${shadowc}Card changes every round${endc}', 'Card ID'],
    ['Brainstorm', 'Copies the ability<br>of the leftmost Joker'],
    ['Satellite', 'Earn ${moneyc}$1${endc} at the end of<br>round per unique ${planetc}<br>card used this run<br>${shadowc}(Currently ${moneyc}$${jokerValue}${endc})${endc}', 'Unique Planet Cards'],
    ['Rough Gem', 'Played cards with<br>${diamondc} suit earn<br>${moneyc}$1${endc} when scored']
  ],
  [
    ['Bloodstone', '${probc}${!playfieldJokers?1:Object.keys(playfieldJokers).reduceRight((b,a)=>b||(playfieldJokers[a].modifiers.disabled?false:playfieldJokers[a].type+"" === "6,5"), false) ? 2 : 1} in 2${endc} chance for<br>played cards with<br>${heartc} suit to give<br>${prodc}1.5${endc} Mult when scored'],
    ['Arrowhead', 'Played cards with<br>${spadec} suit give<br>${chipc}+50${endc} Chips when scored'],
    ['Onyx Agate', 'Played cards with<br>${clubc} suit give<br>${multc}+7${endc} Mult when scored'],
    ['Canio', 'This Joker gains ${prodc}1${endc} Mult<br>when a ${numc}face${endc} card<br>is destroyed<br>${shadowc}(Currently ${prodc}${1 + jokerValue}${endc} Mult)${endc}', 'Destroyed Face Cards'],
    ['Triboulet', 'Played ${numc}Kings${endc} and<br>${numc}Queens${endc} each give<br>${prodc}2${endc} Mult when scored'],
    ['Yorick', 'This Joker gains<br>${prodc}1${endc} Mult every ${numc}23${endc} ${shadowc}[23]${endc}<br>cards discarded<br>${shadowc}(Currently ${prodc}${jokerValue}${endc} Mult)${endc}', 'X Mult'],
    ['Chicot', 'Disables effect of<br>every ${numc}Boss Blind${endc}'],
    ['Perkeo', 'Creates a ${negativec} copy of<br>${numc}1${endc} random ${numc}consumable${endc}<br>card in your possession<br>at the end of the ${numc}shop${endc}'],
    ['Certificate', 'When round begins,<br>add a random ${numc}playing<br>card${endc} with a random<br>${numc}seal${endc} to your hand'],
    ['Bootstraps', '${multc}+2${endc} Mult for every<br>${moneyc}$5${endc} you have<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}', 'Mult of $5']
  ],
  [],
  [
    ['Egg', 'Gains ${moneyc}$3${endc} of<br>${numc}sell value${endc} at<br>end of round'],
    ['Burglar', 'When ${numc}Blind${endc} is selected,<br>gain ${chipc}+3${endc} Hands and<br>${numc}lose all discards${endc}'],
    ['Blackboard', '${prodc}3${endc} Mult if all<br>cards held in hand<br>are ${spadec} or ${clubc}'],
    ['Runner', 'Gains ${chipc}+15${endc} Chips<br>if played hand<br>contains a ${numc}Straight${endc}<br>${shadowc}(Currently ${chipc}+${jokerValue * 15}${endc} Chips)${endc}', 'Straights Played'],
    ['Ice Cream', '${chipc}${jokerValue > 20 ? "" : "+"}${Math.max(0, 100 - jokerValue * 5)}${endc} Chips<br>${chipc}-5${endc} Chips for<br>every hand played', 'Hands Played'],
    ['DNA', 'If ${numc}first hand${endc} of round<br>has only ${numc}1${endc} card, add a<br>permanent copy to deck<br>and draw it to ${numc}hand${endc}'],
    ['Splash', 'Every ${numc} played card${endc}<br>counts in scoring'],
    ['Blue Joker', '${chipc}+2${endc} Chips for each<br>remaining card in ${numc}Deck${endc}<br>${shadowc}(Currently ${chipc}+${104 + jokerValue * 2}${endc} Chips)${endc}', 'Cards Remaining'],
    ['Sixth Sense', 'If ${numc}first hand${endc} of round is<br>a single ${numc}6${endc}, destroy it and<br>create a ${spectralc} card${roomc}'],
    ['Constellation', 'This Joker gains<br>${prodc}0.1${endc} Mult every time<br>a ${planetc} card is used<br>${shadowc}(Currently ${prodc}${(10 + jokerValue)/10}${endc} Mult)${endc}', 'Planet Cards']
  ],
  [
    ['Hiker', 'Every played ${numc}card${endc}<br>permanently gains<br>${chipc}+5${endc} Chips when scored'],
    ['Faceless Joker', 'Earn ${moneyc}$5${endc} if ${numc}3${endc} or<br>more ${numc}face cards${endc}<br>are discarded<br>at the same time'],
    ['Green Joker', '${multc}+1${endc} Mult per hand played<br>${multc}-1${endc} Mult per discard<br>${shadowc}(Currently ${multc}${jokerValue >= 0 ? "+" : ""}${jokerValue}${endc} Mult)${endc}', 'Mult'],
    ['Superposition', 'Create a ${tarotc} card if<br>poker hand contains an<br>${numc}Ace${endc} and a ${numc}Straight${endc}${roomc}'],
    ['To Do List', 'Earn ${moneyc}$4${endc} if ${numc}poker hand${endc}<br>is a ${numc}${hands[11 - (Math.abs(jokerValue) % 12)].name}${endc},<br>poker hand changes<br>at end of round', 'Hand Type'],
    ['Cavendish', '${prodc}3${endc} Mult<br>${probc}1 in 1000${endc} chance this<br>card is destroy<br>at end of round'],
    ['Card Sharp', '${prodc}3${endc} Mult if played<br>${numc}poker hand${endc} has already<br>been played this round'],
    ['Red Card', 'This Joker gains<br>${multc}+3${endc} Mult when any<br>${numc}Booster Pack${endc} is skipped<br>${shadowc}(Currently ${multc}+${jokerValue * 3}${endc} Mult)${endc}', 'Skipped Packs'],
    ['Madness', 'When ${numc}Small Blind${endc} or ${numc}Big Blind${endc}<br>is selected, gain ${prodc}0.5${endc} Mult<br>and ${numc}destroy${endc} a random Joker<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.5}${endc})${endc}', 'Blinds Selected'],
    ['Square Joker', 'This Joker gains ${chipc}+4${endc} Chips<br>if played hand has<br>exactly ${numc}4${endc} cards<br>${shadowc}(Currently ${chipc}+${jokerValue * 4}${endc} Chips)${endc}', '4 Card Hands']
  ],
  [
    ['Séance', 'If ${numc}poker hand${endc} is a<br>${numc}Straight Flush${endc}, craeate a<br>random ${spectralc} card${roomc}'],
    ['Riff-raff', 'When ${numc}Blind${endc} is selected,<br>create ${numc}2${endc} ${commonc} ${numc}Jokers${endc}${roomc}'],
    ['Vampire', 'This Joker gains ${prodc}0.1${endc} Mult<br>per scoring ${numc}Enhanced card${endc} played,<br>removes card ${numc}Enhancement${endc}<br>${shadowc}(Currently ${prodc}${(10 + jokerValue) / 10}${endc} Mult)${endc}', 'Enhanced Cards Played'],
    ['Shortcut', 'Allows ${numc}Straights${endc} to be<br>made with gaps of ${numc}1 rank${endc}<br>${shadowc}(ex: ${numc}10 8 6 5 3${endc})${endc}'],
    ['Hologram', 'This Joker gains ${prodc}0.25${endc} Mult<br>every time a ${numc}playing card${endc}<br>is added to your deck<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}', 'Cards Added'],
    ['Vagabond', 'Create a ${tarotc} card<br>if hand is played<br>with ${moneyc}$4${endc} or less'],
    ['Baron', 'Each ${numc}King${endc}<br>held in hand<br>gives ${prodc}1.5${endc} Mult'],
    ['Cloud 9', 'Earn ${moneyc}$1${endc} for each<br>${numc}9${endc} in your ${numc}full deck${endc}<br>at end of round<br>${shadowc}(Currently ${moneyc}$${jokerValue}${endc})${endc}', '9s in Deck'],
    ['Rocket', 'Earn ${moneyc}$${1 + jokerValue * 2}${endc} at end of<br>round. Gains ${moneyc}$2${endc} when<br>${numc}Boss Blind${endc} is defeated'],
    ['Obelisk', 'This Joker gains ${prodc}0.2${endc} Mult<br>per consecutive hand played<br>without playing your<br>most played ${numc}poker hand${endc}<br>${shadowc}(Currently ${prodc}${(10 + jokerValue * 2) / 10}${endc} Mult)${endc}', 'Consecutive Hands Played']
  ],
  [
    ['Midas Mask', 'All played ${numc}face${endc} cards<br>become ${numc}Gold${endc} cards<br>when scored'],
    ['Luchador', 'Sell this card to<br>disable the current<br>${numc}Boss Blind${endc}'],
    ['Photograph', 'First played ${numc}face${endc}<br>card gives ${prodc}2${endc} Mult<br>when scored'],
    ['Gift Card', 'Add ${moneyc}$1${endc} of ${numc}sell value${endc}<br>to every ${numc}Joker${endc} and<br>${numc}Consumable${endc} card at<br>end of round'],
    ['Turtle Bean', '${numc}${5 - jokerValue >= 0 ? "+" : ""}${5 - jokerValue}${endc} hand size,<br>reduces by<br>${multc}1${endc} every round'],
    ['Erosion', '${multc}+4${endc} Mult for each<br>card below ${numc}52${endc}<br>in your full deck<br>${shadowc}(Currently ${multc}${jokerValue >= 0 ? "+" : ""}${jokerValue * 4}${endc})${endc}', 'Cards Below 52'],
    ['Reserved Parking', 'Each ${numc}face${endc} card<br>held in hand has<br>a ${probc}1 in 2${endc} chance<br>to give ${moneyc}$1${endc}'],
    ['Mail-In Rebate', 'Earn ${moneyc}$5${endc} for each<br>discarded ${numc}${rankNames[Math.abs(jokerValue % 13)]}${endc}, rank<br>changes every round'],
    ['To the Moon', 'Earn an extra ${moneyc}$1${endc} of<br>${numc}interest${endc} for every ${moneyc}$5${endc} you<br>have at end of round'],
    ['Hallucination', '${probc}1 in 2${endc} chance to create<br>a ${tarotc} card when any<br>${numc}Booster Pack${endc} is opened${roomc}']
  ],
  [
    ['Sly Joker',  '${chipc}+50${endc} Chips if played<br>hand contains<br>a ${numc}Pair${endc}'],
    ['Wily Joker',  '${chipc}+100${endc} Chips if played<br>hand contains<br>a ${numc}Three of a Kind${endc}'],
    ['Clever Joker',  '${chipc}+80${endc} Chips if played<br>hand contains<br>a ${numc}Two Pair${endc}'],
    ['Devious Joker',  '${chipc}+100${endc} Chips if played<br>hand contains<br>a ${numc}Straight${endc}'],
    ['Crafty Joker',  '${chipc}+80${endc} Chips if played<br>hand contains<br>a ${numc}Flush${endc}'],
    ['Lucky Cat', 'This Joker gains ${prodc}0.25${endc} Mult every<br>time a ${numc}Lucky${endc} card<br>${probc}successfully${endc} triggers<br>${shadowc}(Currently ${prodc}${(10 + jokerValue * 2.5) / 10}${endc} Mult)${endc}', 'Lucky Triggers'],
    ['Baseball Card', '${probc}Uncommon${endc} Jokers<br>each give ${prodc}1.5${endc} Mult'],
    ['Bull', '${chipc}+2${endc} Chips for each<br>${moneyc}dollar${endc} you have<br>${shadowc}(Currently ${chipc}+${jokerValue * 2}${endc} Chips)${endc}', 'Money'],
    ['Diet Cola', 'Sell this card to<br>create a free<br>${numc}Double Tag${endc}'],
    ['Trading Card', 'If ${numc}first discard${endc} of round<br>has only ${numc}1${endc} card, destroy<br>it and earn ${moneyc}$3${endc}']
  ],
  [
    ['Flash Card', 'This Joker gains ${multc}+2${endc} Mult<br>per ${numc}reroll${endc} in the shop<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}', 'Rerolls'],
    ['Popcorn', '${multc}${jokerValue <= 5 ? "+" : ""}${Math.max(0, 20 - jokerValue * 4)}${endc} Mult<br>${multc}-4${endc} Mult per<br>round played', 'Rounds Played'],
    ['Ramen', '${prodc}${(Math.max(0, 200 - jokerValue)) / 100}${endc} Mult,<br>loses ${prodc}0.01${endc} Mult<br>per ${numc}card${endc} discarded', 'Cards Discarded'],
    ['Seltzer', 'Retrigger all<br>cards played for<br>the next ${numc}${Math.max(0, 10 - jokerValue)}${endc} hands', 'Hands Played'],
    ['Spare Trousers', 'This Joker gains ${multc}+2${endc} Mult<br>if played hand contains<br>a ${numc}Two Pair${endc}<br>${shadowc}(Currently ${multc}+${jokerValue * 2}${endc} Mult)${endc}', 'Two Pairs Played'],
    ['Campfire', 'This Joker gains ${prodc}0.25${endc} Mult<br>for each card ${numc}sold${endc}, resets<br>when ${numc}Boss Blind${endc} is defeated<br>${shadowc}(Currently ${prodc}${1 + jokerValue * 0.25}${endc} Mult)${endc}', 'Cards Sold'],
    ['Smiley Face', 'Played ${numc}face${endc} cards<br>give ${multc}+5${endc} Mult<br>when scored'],
    ['Ancient Joker', 'Each played card with<br>${[heartc, clubc, diamondc, spadec][Math.abs(jokerValue) % 4]} suit gives<br>${prodc}1.5${endc} Mult when scored<br>${shadowc}suit changes at end of round${endc}', 'Suit ID'],
    ['Walkie Talkie', 'Each played ${numc}10${endc} or ${numc}4${endc}<br>gives ${chipc}+10${endc} Chips and<br>${multc}+4${endc} Mult when scored'],
    ['Castle', 'This Joker gains ${chipc}+3${endc} Chips<br>per discarded ${[heartc, clubc, diamondc, spadec][Math.abs(jokerValue) % 4]} card,<br>suit changes every round<br>${shadowc}(Currently ${chipc}+${jokerValue * 3}${endc} Chips)${endc}', 'Matching Discarded Cards']
  ]
];
