// Alutiiq (Sugpiaq) sound-spelling. Values follow the Alutiiq alphabet taught by
// the Alutiiq Museum's language program, so a reader can sound a place name out.

export const SOUNDS = {
  a: "as in father",
  c: "as in cats",
  e: "as in bet",
  f: "as in loan words",
  g: "a soft g — between g and a French r",
  gw: "that soft g, lips rounded",
  h: "as in hat",
  hm: "breath through the nose",
  hn: "a whispered n",
  i: "as in feet",
  k: "as in kite",
  kw: "k, lips rounded",
  l: "as in leaf",
  ll: "a whispered l, air passing at the sides",
  m: "as in moon",
  n: "as in night",
  ng: "as in singer",
  ngw: "as in singer, lips rounded",
  p: "as in pipe",
  q: "a k made far back in the throat",
  qw: "that deep k, lips rounded",
  r: "a soft r, close to the s in measure",
  s: "as in sun",
  t: "as in tide",
  u: "as in boot",
  uw: "oo, lips rounded",
  w: "as in water",
  y: "as in yes",
  "'": "a glottal stop — the catch in uh-oh",
};

// Letters that carry a sound an English reader would not guess.
export const NOTABLE = new Set([
  "c", "g", "gw", "ll", "q", "qw", "r", "ng", "ngw", "hm", "hn", "uw", "'",
]);

const CLUSTERS = ["ngw", "hm", "hn", "gw", "kw", "qw", "uw", "ng", "ll"];

export function spell(name = "") {
  const s = name.replace(/[\u2018\u2019`´]/g, "'");
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === " ") {
      tokens.push({ text: " ", key: " ", space: true });
      i += 1;
      continue;
    }
    const rest = s.slice(i).toLowerCase();
    let key = CLUSTERS.find((c) => rest.startsWith(c));
    const length = key ? key.length : 1;
    if (!key) key = s[i].toLowerCase();
    tokens.push({
      text: s.slice(i, i + length),
      key,
      sound: SOUNDS[key] || null,
      notable: NOTABLE.has(key),
    });
    i += length;
  }
  return tokens;
}

export function soundGuide(name = "") {
  const seen = [];
  spell(name).forEach((t) => {
    if (t.notable && t.sound && !seen.some((x) => x.key === t.key)) {
      seen.push({ key: t.key, sound: t.sound });
    }
  });
  return seen;
}
