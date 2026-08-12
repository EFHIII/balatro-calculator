'use strict';
// Fast search for the best joker order / card subset / card order.
//
// Replaces the factorial enumerations with exchange-argument sorting over
// empirically probed affine mult-maps, plus small structured enumerations for
// the position-referential jokers (Blueprint, Brainstorm, Photograph, Hanging
// Chad, duplicate Vampires, decayed negative/x<1 jokers). Every candidate is
// still evaluated by the unmodified simulator in balatro-sim.js, so scores
// are identical to brute force — only the set of orderings tried shrinks.
//
// The mathematics: chips are order-invariant (no xchips op exists), and every
// mult effect is an affine map m -> x*m + a. Optimally ordering monotone
// affine maps is a classically solved scheduling problem: unit i precedes
// unit j (maximizing) iff a_i*(x_j-1) >= a_j*(x_i-1), implemented as a sort
// by the scalar key a/(x-1) within sign classes of (x-1). Minimizing is the
// exact reverse. Each unit's (a, x) is recovered by running the instrumented
// scoring loop twice at two base mults and solving the line through both
// points — so jokers never need manual classification; only the
// position-referential ones listed above are special-cased.
//
// Loaded after balatro-sim.js (worker: importScripts; tests: concatenation).
// Everything lives under the BalatroOpt namespace.

const BalatroOpt = (() => {

// ---------- instrumented Hand ----------

// Transcription of Hand.simulate() with recording hooks around each scoring
// unit (played card / joker trigger). Must stay in sync with balatro-sim.js.
class ProbeHand extends Hand {
  simulateProbed() {
    const rec = { eye: false, cards: [], jokers: [] };

    this.chips = this.compiledChips;
    this.mult = [this.compiledMult[0], this.compiledMult[1]];
    this.jokersExtraValue = [];

    this.earnedMoney = 0;

    if(this.TheEye && this.hands[this.typeOfHand][PLAYED_THIS_ROUND]) {
      rec.eye = true;
      return rec;
    }

    for(let j = 0; j < this.jokers.length; j++) {
      this.jokersExtraValue.push(0);
    }

    // score cards
    for(let c = 0; c < this.cards.length; c++) {
      const card = this.cards[c];
      card[EXTRA_EXTRA_CHIPS] = 0;

      const mIn = this.mult[0] * Math.pow(10, this.mult[1]);
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
      rec.cards.push({ mIn, mOut: this.mult[0] * Math.pow(10, this.mult[1]) });
    }

    // score cards-in-hand (fixed middle map, not a sortable unit)
    this.mult = bigBigTimes(this.compiledInHandTimesMult, this.mult);
    this.mult = bigBigAdd(this.compiledInHandPlusMult, this.mult);

    // score jokers (Baseball Card's bonus fires inside the joker's unit)
    for(let j = 0; j < this.jokers.length; j++) {
      const mIn = this.mult[0] * Math.pow(10, this.mult[1]);
      this.triggerJoker(this.jokers[j], j);

      if(this.BaseballCard && this.jokerRarities[j] === 2 && !this.jokers[j][JOKER_DISABLED]) {
        for(let i = 0; i < this.BaseballCard; i++) {
          this.mult = bigTimes(1.5, this.mult);
        }
      }
      rec.jokers.push({ mIn, mOut: this.mult[0] * Math.pow(10, this.mult[1]) });
    }

    return rec;
  }
}

// Solve each unit's affine map from two probe recordings at different base mults.
function solveMaps(recA, recB) {
  if(recA.eye || recB.eye) return { ok: true, eye: true, cardMaps: [], jokerMaps: [] };

  const solveList = (la, lb) => {
    const out = [];
    for(let i = 0; i < la.length; i++) {
      const den = la[i].mIn - lb[i].mIn;
      let a, x;
      if(!isFinite(den) || Math.abs(den) < 1e-12) {
        x = 1;
        a = la[i].mOut - la[i].mIn;
      }
      else {
        x = (la[i].mOut - lb[i].mOut) / den;
        a = la[i].mOut - x * la[i].mIn;
      }
      if(!isFinite(a) || !isFinite(x)) return null;
      out.push({ a, x });
    }
    return out;
  };

  const cardMaps = solveList(recA.cards, recB.cards);
  const jokerMaps = solveList(recA.jokers, recB.jokers);
  if(cardMaps === null || jokerMaps === null) {
    return { ok: false, eye: false, cardMaps: [], jokerMaps: [] };
  }
  return { ok: true, eye: false, cardMaps, jokerMaps };
}

// ---------- enumeration helpers ----------

function range(n) {
  const r = [];
  for(let i = 0; i < n; i++) r.push(i);
  return r;
}

function allPermutations(arr) {
  // Heap's algorithm
  const a = arr.slice();
  const n = a.length;
  const out = [a.slice()];
  if(n === 0) return out;
  const c = new Array(n).fill(0);
  let i = 0;
  while(i < n) {
    if(c[i] < i) {
      if(i % 2 === 0) [a[0], a[i]] = [a[i], a[0]];
      else [a[c[i]], a[i]] = [a[i], a[c[i]]];
      out.push(a.slice());
      c[i]++;
      i = 0;
    }
    else {
      c[i] = 0;
      i++;
    }
  }
  return out;
}

// all index subsets of size 0..maxK (the same set worker.js enumerates)
function subsetsUpTo(n, maxK) {
  const out = [[]];
  const rec = (start, k, acc) => {
    if(k === 0) { out.push(acc.slice()); return; }
    for(let i = start; i <= n - k; i++) {
      acc.push(i);
      rec(i + 1, k - 1, acc);
      acc.pop();
    }
  };
  for(let k = 1; k <= Math.min(maxK, n); k++) rec(0, k, []);
  return out;
}

// ---------- affine-map ordering ----------

// per-card mult roles (from triggerCard): used for the within-card precedence
const PER_CARD_ADD = new Set([16, 17, 18, 19, 38, 51, 63, 82, 156, 158]);
const PER_CARD_MULT = new Set([76, 80, 84, 132, 157]);

// apply f then g (maps are m -> x*m + a)
function compose(f, g) {
  return { a: f.a * g.x + g.a, x: f.x * g.x };
}

function mapKey(m) {
  const xm1 = Math.abs(m.x - 1) < 1e-12 ? 0 : m.x - 1;
  const a = Math.abs(m.a) < 1e-12 ? 0 : m.a;
  if(xm1 === 0) return a > 0 ? Infinity : a < 0 ? -Infinity : 0;
  return a / xm1;
}

// dir=1: maximize; dir=-1: minimize (exact reverse). Contractors (x<1, e.g.
// a value-0 Yorick's x0) go first when maximizing; within a sign class the
// scalar key a/(x-1) implements the exchange relation as a total preorder.
function cmpKeyed(mapOf, dir) {
  return (u, w) => {
    const mu = mapOf(u), mw = mapOf(w);
    const cu = mu.x < 1 - 1e-12 ? 0 : 1;
    const cw = mw.x < 1 - 1e-12 ? 0 : 1;
    if(cu !== cw) return (cu - cw) * dir;
    const ku = mapKey(mu), kw = mapKey(mw);
    if(ku === kw) return 0;
    return (ku > kw ? -1 : 1) * dir;
  };
}

// Schedule units under chain precedence constraints (each chain keeps its
// relative order), optimally for the exchange objective: glue any chain block
// whose key outranks its predecessor into a composite (composed map), then
// merge all blocks and free units by key (stable sort keeps chains in order).
function scheduleWithChains(units, chains, cmp) {
  const inChain = new Set(chains.flat());
  const free = units.filter(u => !inChain.has(u));

  const blocks = free.map(u => ({ units: [u], map: u.map }));
  for(const chain of chains) {
    const chainBlocks = [];
    for(const u of chain) {
      let blk = { units: [u], map: u.map };
      while(chainBlocks.length) {
        const prev = chainBlocks[chainBlocks.length - 1];
        if(cmp({ map: prev.map }, { map: blk.map }) > 0) {
          chainBlocks.pop();
          blk = { units: [...prev.units, ...blk.units], map: compose(prev.map, blk.map) };
        }
        else break;
      }
      chainBlocks.push(blk);
    }
    blocks.push(...chainBlocks);
  }
  blocks.sort((x, y) => cmp({ map: x.map }, { map: y.map }));
  return blocks.flatMap(b => b.units);
}

// Chain for the within-card trigger order: per-card-add jokers must precede
// per-card-mult jokers (maximizing; reversed for minimizing). Null if not live.
function perCardChain(units, dir, cmp) {
  const A = units.filter(u => PER_CARD_ADD.has(u.id));
  const B = units.filter(u => PER_CARD_MULT.has(u.id));
  if(A.length === 0 || B.length === 0) return null;
  A.sort(cmp); B.sort(cmp);
  return dir === 1 ? [...A, ...B] : [...B, ...A];
}

// ---------- search context (drives the sim exactly like worker.js run()) ----------

class OptSearchCtx {
  // hand must be a ProbeHand with compileJokers() already run by the caller
  constructor(hand, cards, jokers, minimize) {
    this.hand = hand;
    this.cards = cards;
    this.jokers = jokers;
    this.minimize = minimize;
    this.randomMode = minimize ? 0 : 1;
  }

  setJokerOrder(jokerIdxOrder) {
    this.hand.jokers = jokerIdxOrder.map(i => this.jokers[i].slice());
    this.hand.compileJokerOrder();
  }

  // subsetIdxs: indices into cards. copyInHand mirrors worker.js: the
  // optimize-cards path holds fresh copies in hand, the fixed-play path holds
  // original references.
  setSubset(subsetIdxs, copyInHand = true) {
    this.playedRefs = subsetIdxs.map(i => this.cards[i]);
    const inSubset = new Set(subsetIdxs);
    this.inHand = this.cards
      .filter((c, i) => !inSubset.has(i))
      .map(a => copyInHand ? a.slice() : a);
    // pin randomMode before compileCards: Glass Joker's compiled value reads it
    this.hand.randomMode = this.randomMode;
    this.hand.cards = this.playedRefs.slice();
    this.hand.cardsInHand = this.inHand.slice();
    this.hand.actualCardsInHand = this.inHand.slice();
    this.hand.compileCards();
  }

  // orderIdxs: permutation of 0..k-1 into playedRefs
  setOrder(orderIdxs) {
    this.hand.cards = orderIdxs.map(i => this.playedRefs[i]);
    this.hand.cardsInHand = this.inHand.slice();
  }

  probeOrder(orderIdxs) {
    const saved = this.hand.compiledMult.slice();
    const recs = [];
    for(const bump of [0, 7]) {
      this.hand.compiledMult = [saved[0] + bump, saved[1]];
      this.setOrder(orderIdxs);
      this.hand.randomMode = this.randomMode;
      recs.push(this.hand.simulateProbed());
    }
    this.hand.compiledMult = saved;
    return solveMaps(recs[0], recs[1]);
  }

  resolvedJokerIds() {
    return this.hand.jokers.map(j => j[JOKER_DISABLED] ? -1 : j[JOKER]);
  }

  isFaceCard(card) {
    if(this.hand.Pareidolia) return true;
    return card[ENHANCEMENT] !== STONE && card[RANK] >= JACK && card[RANK] <= KING;
  }
}

// ---------- joker-order candidates ----------

// Structural variants driven by copier jokers. compileJokerOrder semantics:
// every Brainstorm resolves through slot 0 (all share one copy source) and
// every Blueprint resolves to the first non-copier reachable walking right.
// Enumerate (Brainstorm source Y | unresolved) x per-Blueprint (target X |
// unresolved | 'chain' = glued onto a loose Brainstorm so its copy floats).
function buildJokerVariants(jokers) {
  const n = jokers.length;
  const idxs = range(n);
  const isEnabledCopier = i =>
    !jokers[i][JOKER_DISABLED] && (jokers[i][JOKER] === 30 || jokers[i][JOKER] === 77);
  const bps = idxs.filter(i => isEnabledCopier(i) && jokers[i][JOKER] === 30);
  const bss = idxs.filter(i => isEnabledCopier(i) && jokers[i][JOKER] === 77);
  // resolution walks pass through copier ids (even disabled ones) and only
  // terminate on a non-copier, so only non-copiers can be copy targets
  const targets = idxs.filter(i => jokers[i][JOKER] !== 30 && jokers[i][JOKER] !== 77);

  if(bps.length === 0 && bss.length === 0) {
    return {
      fullEnum: false,
      variants: [{ rep: idxs.slice(), pinFirst: 0, pinLast: 0, glueGroups: [] }],
    };
  }

  const bsChoices = bss.length > 0 ? [...targets, -1] : [null];
  const bpChoices = bss.length > 0 ? [...targets, -1, 'chain'] : [...targets, -1];
  let bpAssignments = [[]];
  for(let b = 0; b < bps.length; b++) {
    const next = [];
    for(const partial of bpAssignments) {
      for(const t of bpChoices) next.push([...partial, t]);
    }
    bpAssignments = next;
  }
  if(bsChoices.length * bpAssignments.length > 200) {
    return { fullEnum: true, variants: [] };
  }

  const variants = [];
  for(const bsT of bsChoices) {
    for(const bpT of bpAssignments) {
      const used = new Set();
      let front = [];              // pinned slots at the very front
      const glueGroups = [];       // sortable glued blocks (original indices)
      const back = [];             // pinned slots at the very end

      if(bsT === -1) {
        // a Brainstorm holds slot 0: every Brainstorm is unresolved
        front.push(bss[0]);
        used.add(bss[0]);
      }
      else if(bsT !== null) {
        // Blueprints that target the Brainstorm source chain in FRONT of it:
        // the slot-0 walk passes through them, so both constraints hold
        const bpsOnY = bps.filter((bp, i) => bpT[i] === bsT);
        for(const bp of bpsOnY) { front.push(bp); used.add(bp); }
        front.push(bsT);
        used.add(bsT);
      }

      const chainHost = bsT === -1 ? bss[1] : (bsT !== null ? bss[0] : undefined);
      const byTarget = new Map();
      const chainBps = [];
      let invalid = false;
      bps.forEach((bp, i) => {
        if(used.has(bp)) return;
        const t = bpT[i];
        if(t === 'chain') {
          if(chainHost === undefined) { invalid = true; return; }
          chainBps.push(bp); used.add(bp);
          return;
        }
        if(t === -1) { back.push(bp); used.add(bp); return; }
        if(used.has(t)) { front = [bp, ...front]; used.add(bp); return; }
        if(!byTarget.has(t)) byTarget.set(t, []);
        byTarget.get(t).push(bp);
        used.add(bp);
      });
      if(invalid) continue;
      if(chainBps.length > 0) {
        glueGroups.push([...chainBps, chainHost]);
        used.add(chainHost);
      }
      for(const [t, list] of byTarget) {
        glueGroups.push([...list, t]);
        used.add(t);
      }
      const loose = idxs.filter(i => !used.has(i));

      // internal order of copiers inside glued blocks matters when their
      // editions differ (a Holographic Blueprint's +10 fires before its
      // copied effect) — emit a variant per internal permutation
      const frontPrefix = front.slice(0, Math.max(0, front.length - (bsT !== null ? 1 : 0)));
      const frontTail = front.slice(frontPrefix.length);
      const dims = [
        allPermutations(frontPrefix),
        ...glueGroups.map(g => allPermutations(g.slice(0, g.length - 1))),
        allPermutations(back),
      ];
      const emitVariant = (chosen) => {
        const fr = [...chosen[0], ...frontTail];
        const groups = glueGroups.map((g, gi) => [...chosen[1 + gi], g[g.length - 1]]);
        const bk = chosen[chosen.length - 1];
        const rep = [...fr, ...groups.flat(), ...loose, ...bk];
        const slotOf = new Map(rep.map((idx, sl) => [idx, sl]));
        variants.push({
          rep,
          pinFirst: fr.length,
          pinLast: bk.length,
          glueGroups: groups.map(g => g.map(idx => slotOf.get(idx))),
        });
      };
      const walk = (d, chosen) => {
        if(d === dims.length) { emitVariant(chosen); return; }
        for(const p of dims[d]) walk(d + 1, [...chosen, p]);
      };
      walk(0, []);
    }
  }
  if(variants.length > 400) return { fullEnum: true, variants: [] };
  return { fullEnum: false, variants };
}

// mode: 'max' | 'min'. Returns arrays of joker indices (orders to evaluate).
function jokerCandidatesForSubset(ctx, spec, subset, mode) {
  const nJokers = ctx.jokers.length;
  if(nJokers === 0) return [[]];
  const cands = new Map();
  const addCand = arr => cands.set(arr.join(','), arr);

  if(spec.fullEnum) {
    return allPermutations(range(nJokers));
  }

  const dir = mode === 'min' ? -1 : 1;

  // Vampire (122) is first-instance-wins: only the first Vampire in joker
  // order absorbs the played enhancements, so each relative order gives
  // different maps. Enumerate the vampire order pi, probe under pi, then
  // schedule with pi as a hard precedence chain.
  const vampSet = new Set(range(nJokers).filter(i =>
    ctx.jokers[i][JOKER] === 122 && !ctx.jokers[i][JOKER_DISABLED]));

  for(const v of spec.variants) {
    const nSlots = v.rep.length;
    const pinFirst = v.pinFirst || 0;
    const pinLast = v.pinLast || 0;
    const endFixedStart = nSlots - pinLast;
    const inGlue = new Set(v.glueGroups.flat());

    const freeVampSlots = [];
    for(let sl = pinFirst; sl < endFixedStart; sl++) {
      if(!inGlue.has(sl) && vampSet.has(v.rep[sl])) freeVampSlots.push(sl);
    }
    const vampOrders = freeVampSlots.length >= 2
      ? allPermutations(freeVampSlots.map(sl => v.rep[sl]))
      : [null];

    for(const pi of vampOrders) {
      let rep = v.rep;
      if(pi) {
        rep = v.rep.slice();
        freeVampSlots.forEach((sl, i) => { rep[sl] = pi[i]; });
      }

      ctx.setJokerOrder(rep);
      ctx.setSubset(subset);
      const probe = ctx.probeOrder(range(subset.length));
      if(!probe.ok || probe.eye) {
        // overflow / fixed score: keep the representative order as-is
        addCand(rep.slice());
        continue;
      }
      const resolvedIds = ctx.resolvedJokerIds();

      const units = [];
      for(const g of v.glueGroups) {
        let m = probe.jokerMaps[g[0]];
        for(let i = 1; i < g.length; i++) m = compose(m, probe.jokerMaps[g[i]]);
        units.push({ slots: g.slice(), map: m, id: resolvedIds[g[0]] });
      }
      for(let i = pinFirst; i < endFixedStart; i++) {
        if(inGlue.has(i)) continue;
        units.push({ slots: [i], map: probe.jokerMaps[i], id: resolvedIds[i] });
      }

      const phase = cmpKeyed(u => u.map, dir);
      const emit = sortedUnits => {
        const slots = [
          ...range(pinFirst),
          ...sortedUnits.flatMap(u => u.slots),
          ...range(pinLast).map(i => endFixedStart + i),
        ];
        return slots.map(sl => rep[sl]);
      };

      const vampChain = pi
        ? units.filter(u => u.slots.length === 1 && freeVampSlots.includes(u.slots[0]))
        : null;
      const pcChain = perCardChain(units, dir, phase);

      addCand(emit(units.slice().sort(phase)));
      if(vampChain) addCand(emit(scheduleWithChains(units, [vampChain], phase)));
      if(pcChain) addCand(emit(scheduleWithChains(units, [pcChain], phase)));
      if(vampChain && pcChain) {
        addCand(emit(scheduleWithChains(units, [vampChain, pcChain], phase)));
      }

      // Units with a < 0 (decayed Popcorn) or x < 1 (value-0 Yorick) break
      // the exchange relation's total order — enumerate their positions
      // among the key-sorted regular units instead.
      const irregular = units.filter(u =>
        u.map.a < -1e-12 || u.map.x < 1 - 1e-12);
      if(irregular.length >= 1 && irregular.length <= 2) {
        const irrSet = new Set(irregular);
        const regular = units.filter(u => !irrSet.has(u)).sort(phase);
        let seqs = [regular];
        for(const irr of irregular) {
          seqs = seqs.flatMap(s => {
            const outs = [];
            for(let g = 0; g <= s.length; g++) {
              outs.push([...s.slice(0, g), irr, ...s.slice(g)]);
            }
            return outs;
          });
        }
        for(const s of seqs) addCand(emit(s));
      }
      else if(irregular.length > 2) {
        for(const p of allPermutations(units)) addCand(emit(p));
      }
    }
  }
  return [...cands.values()];
}

// resolved-jokers signature: two orders with the same signature score
// identically for every card choice — evaluate one of them
function resolvedSignature(hand) {
  return JSON.stringify(hand.jokers.map(j => j.slice(0, 5)))
    + '|' + JSON.stringify(hand.jokerRarities);
}

// ---------- card-order candidates ----------

function cardOrderCandidates(ctx, k, cardMaps, mode) {
  if(k <= 1) return [range(k)];

  // Position-referential jokers make card maps depend on which card leads:
  // Hanging Chad retriggers the first *played* card; Photograph doubles the
  // first *scoring face* card (changing that face's map AND the other
  // faces'). When the ambiguity is live, be exact: enumerate all k! <= 120
  // orders for this subset. Everything else keeps the O(k log k) sort.
  const resolved = ctx.resolvedJokerIds();
  const hasChad = resolved.includes(69);
  const scoringFaces = ctx.playedRefs.filter(c =>
    (c[ENHANCEMENT] === STONE || ctx.hand.involvedCards.indexOf(c) >= 0)
    && ctx.isFaceCard(c)).length;
  const photoAmbiguous = resolved.includes(132) && scoringFaces >= 2;
  if(hasChad || photoAmbiguous) {
    return allPermutations(range(k));
  }

  const dir = mode === 'min' ? -1 : 1;
  const idx = range(k);
  const sorted = idx.slice().sort(cmpKeyed(i => cardMaps[i], dir));

  const set = new Map();
  const add = arr => set.set(arr.join(','), arr);
  add(idx);     // identity, as cheap insurance
  add(sorted);
  return [...set.values()];
}

return {
  ProbeHand, OptSearchCtx,
  buildJokerVariants, jokerCandidatesForSubset, cardOrderCandidates,
  resolvedSignature, subsetsUpTo, allPermutations, range,
};

})();
