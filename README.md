# Sunaq-Atlas

An interactive, full-screen map of the Kodiak Archipelago exploring **311 traditional Alutiiq place names** anchored to their exact coordinates over satellite imagery, paired with **302 authentic speaker recordings**.

Built on the Alutiiq Museum's public place-name dataset, Sunaq-Atlas connects Indigenous geography, language, and oral history in a guided, visual web experience.

---

## Features

- **Interactive Archipelago Map:** Full-screen satellite map pinning 311 Alutiiq place names across the Kodiak Archipelago to their exact geographic coordinates.
- **Seven Narrated Journeys:** Guided tours through **Sun'aq**, **Nalik**, **Ag'waneq**, **Imarpiaq**, **Kangiyaq**, **Salliitaq**, and **Uyaq**. Each journey flies from a regional district view into a two-stage descent onto each location, auto-advancing with full playback controls.
- **Detailed Place Panel:** Clicking any location opens an in-depth view containing:
  - Traditional Alutiiq name and English equivalent
  - **Letter-by-letter pronunciation guide** highlighting sounds English readers commonly misread (`q`, `r`, `ll`, `ng`, `c`, and the glottal stop `'`)
  - Authentic speaker audio recording
  - Museum translation, historical field notes, collection photos, and exact coordinates
- **Instant Search:** Search across all 311 Alutiiq names, English names, and translated meanings.
- **Credits & Provenance:** Dedicated About view honoring the Alutiiq Elders, researchers, and satellite imagery providers who made this dataset possible.

---

## Project Structure

```text
Sunaq-Atlas/
├── public/               # Static assets, audio files, or local datasets
├── src/
│   ├── components/       # Map view, journey player, place panel, and search UI
│   ├── data/             # Place-name dataset and journey definitions
│   └── lib/              # Audio helpers, pronunciation parser, and utilities
├── .gitignore
├── package.json
└── README.md

---
```
---

## Acknowledgments & Data Attribution

### Primary Dataset

* **Source:** [Alutiiq Museum & Archaeological Repository](https://alutiiqmuseum.org/) — *Kodiak Placenames* (2025), retrieved November 6, 2026 (`2026-11-06`).
* **Satellite & Aerial Imagery:** Public satellite basemap providers (full tile and imagery credits are listed in the in-app **About** view).

### Alutiiq Elders & Language Speakers

Deepest gratitude to the Alutiiq Elders and speakers whose voices, pronunciations, and traditional geographic knowledge preserved these place names:

* Ephraim Agnot, Sr.
* Nick Alokli
* Lawrence Ashouwak
* Sally Carlough
* Carl Christiansen
* John Chya
* Mary Haakanson
* Sven Haakanson, Sr.
* Sven Haakanson, Jr.
* George Inga
* Paul Kahutak
* Dennis Knagin
* Larry Matfay
* Herman Malutin
* Tania Malutin
* Florence Pestrikoff
* John Pestrikoff
* Phyllis Peterson
* Victor Peterson
* Sophie Shepherd
* Zoya Shugak
* Walter Simeonoff
* Bobby Stamp
* Anakenti Zeedar
* Senafont Zeedar

```

```
