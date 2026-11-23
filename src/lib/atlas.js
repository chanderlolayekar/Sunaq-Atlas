import dataset from "@/data/places.json";

export const PLACES = dataset.places;
export const SOURCE = dataset.source;

const norm = (s = "") =>
  s
    .replace(/[\u2018\u2019`´]/g, "'")
    .toLowerCase()
    .trim();

const byName = new Map();
PLACES.forEach((p) => {
  const key = norm(p.alutiiq);
  if (!byName.has(key)) byName.set(key, []);
  byName.get(key).push(p);
});

/** Look a place up by its Alutiiq name, optionally narrowed by an English hint. */
export function findPlace(alutiiq, english) {
  const candidates = byName.get(norm(alutiiq)) || [];
  if (!candidates.length) return null;
  if (!english) return candidates[0];
  const hit = candidates.find((p) =>
    norm(p.english || "").includes(norm(english))
  );
  return hit || candidates[0];
}

export function formatCoords(lat, lng) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(3)}° ${ns}   ${Math.abs(lng).toFixed(3)}° ${ew}`;
}

export const REGIONS = [
  "Shuyak",
  "Afognak",
  "Kodiak & Chiniak Bay",
  "Marmot Bay & Spruce Island",
  "East Coast & Chiniak",
  "West Side & Uyak",
  "South Island & Alitak",
  "Shelikof & Beyond",
];

export function searchPlaces(query, pool = PLACES) {
  const q = norm(query);
  if (!q) return pool;
  return pool.filter(
    (p) =>
      norm(p.alutiiq).includes(q) ||
      norm(p.english || "").includes(q) ||
      norm(p.meaning || "").includes(q)
  );
}
