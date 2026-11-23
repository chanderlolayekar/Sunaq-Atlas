import { findPlace } from "@/lib/atlas";

export const CHAPTERS = [
  {
    id: "sunaq",
    name: "Sun'aq",
    gloss: "The town at the end of the island",
    blurb:
      "Kodiak city sits on the northeast corner of the island, where the Russian fur trade landed in 1784 and where the Alutiiq world met a new one. The bay around it holds the oldest names of all.",
    center: [57.66, -152.3],
    zoom: 8.6,
    stops: [
      ["Sun'aq", "Kodiak city"],
      ["Qik'rtaq", "Kodiak Island"],
      ["Cingiyaq", "Chiniak"],
      ["Pasersaq", "Pasagshak"],
      ["Masquq", "Muskomee Bay"],
      ["Siriq", "Humpy Cove"],
      ["Cuklluq", "Barclay Spit"],
    ],
  },
  {
    id: "nalik",
    name: "Nalik",
    gloss: "Spruce Island and the Marmot Bay world",
    blurb:
      "Across the strait lies Spruce Island, where Father Herman kept his hermitage and where Alutiiq families still gather each August. The waters between are named for the animals that cross them.",
    center: [57.75, -152.75],
    zoom: 9.2,
    stops: [
      ["Tangirnaq", "Woody Island"],
      ["Nalik", "Spruce Island"],
      ["Uusenkaaq", "Ouzinkie"],
      ["Amaguagwik", "Marmot Strait"],
      ["Nailiraq", "Marmot Island"],
      ["Kapegillra", "The Narrows"],
      ["Aq'iraq", "Shearwater Bay"],
      ["Kiswik", "Snug Cove"],
    ],
  },
  {
    id: "agwaneq",
    name: "Ag'waneq",
    gloss: "Afognak and Shuyak",
    blurb:
      "The northern islands — Afognak, Shuyak and their straits — were emptied by the 1964 earthquake and tsunami, and are still named place by place by the families who return each summer.",
    center: [58.2, -152.7],
    zoom: 8.4,
    stops: [
      ["Ag'waneq", "Afognak Is"],
      ["Suyuraq", "Shuyak Island"],
      ["Tuuwarsaq", "Shuyak Strait"],
      ["Carwanengcuk", "Afognak Strait"],
      ["Igwiq", "Little Afognak"],
      ["Nanwaq", "Afognak Lake"],
      ["Masiqsiraq", "Port Lions"],
      ["Aacungaq", "Anton Larsen Island"],
    ],
  },
  {
    id: "imarpiaq",
    name: "Imarpiaq",
    gloss: "The open sea and the outer coast",
    blurb:
      "Shelikof Strait is the great water. Beyond it lie the far islands where Alutiiq hunters followed sea otters, seals and birds — places named for what the water gives and what it takes away.",
    center: [56.9, -153.6],
    zoom: 7.3,
    stops: [
      ["Imarpiaq", "Shelikof"],
      ["Uqamaq", "Chirikof Island"],
      ["Tuiy'uq", "Tugidak Island"],
      ["Sigtunaq", "Sitkinak Island"],
      ["Uguaq", "Ugak Island"],
      ["Cingiyat", "Middle Cape"],
      ["Cuuqaq", "Cape Barnabas"],
      ["Nuuteqarpat", "Peril Cape"],
    ],
  },
  {
    id: "kangiyaq",
    name: "Kangiyaq",
    gloss: "Ugak Bay and the east coast",
    blurb:
      "Down the eastern shore the land opens into long fjord-like bays. These names record salmon runs, sheltered anchorages and the hazards a skipper had to know by heart.",
    center: [57.3, -152.9],
    zoom: 8.8,
    stops: [
      ["Kangiyaq", "Ugak Bay"],
      ["Kilutaq", "Kiliuda Bay"],
      ["Kasiiluq", "Duck Bay"],
      ["Itngaq", "Ocean Bay"],
      ["Kia'iwik", "Kiavak Bay"],
      ["Iterya'aq", "Bun Pt"],
      ["Cingigurluq", "Tonki Cape"],
      ["Sas'gaq", "Boulder Bay"],
    ],
  },
  {
    id: "salliitaq",
    name: "Salliitaq",
    gloss: "The south — Old Harbor to Alitak",
    blurb:
      "Sitkalidak Island, Three Saints Bay, Alitak and Akhiok: the southern districts hold the deepest archaeology on Kodiak, and names that remember battles, churches and the iron found in the sand.",
    center: [57.05, -153.4],
    zoom: 8.6,
    stops: [
      ["Salliitaq", "Sitkalidak Island"],
      ["Nuniaq", "Old Harbor"],
      ["Amaaruaq", null],
      ["Sun'alleq", "Three Saints Bay village"],
      ["All'itaq", "Alitak"],
      ["Aluwaqllit", "Cape Alitak"],
      ["Angyartalek", "Aiaktalik"],
      ["Kasukuak", "Akhiok village"],
    ],
  },
  {
    id: "uyaq",
    name: "Uyaq",
    gloss: "Karluk and the west side",
    blurb:
      "The west coast faces the strait. Karluk River, Uyak Bay and Viekoda Bay are among the richest subsistence grounds in the archipelago, and their names carry instructions for living there.",
    center: [57.5, -154.1],
    zoom: 8.5,
    stops: [
      ["Uyaqsaq", "Larsen Bay"],
      ["Uyaq", "Uyak Bay"],
      ["Kal'ut", "Karluk village"],
      ["Kuik", "Karluk River"],
      ["Kangruiq", "Viekoda Bay"],
      ["Unganuut", "Uganik"],
      ["Qungulek", "Cape Karluk"],
      ["Kangeq", "Red Lake"],
    ],
  },
];

export const RESOLVED_CHAPTERS = CHAPTERS.map((chapter) => {
  const stops = chapter.stops
    .map(([alutiiq, english]) => findPlace(alutiiq, english))
    .filter(Boolean);
  return { ...chapter, places: stops };
});

export function chapterById(id) {
  return RESOLVED_CHAPTERS.find((c) => c.id === id) || null;
}
