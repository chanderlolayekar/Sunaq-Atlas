import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ELDERS = [
  "Ephraim Agnot, Sr.",
  "Nick Alokli",
  "Lawrence Ashouwak",
  "Sally Carlough",
  "Carl Christiansen",
  "John Chya",
  "Mary Haakanson",
  "Sven Haakanson, Sr.",
  "Sven Haakanson, Jr.",
  "George Inga",
  "Paul Kahutak",
  "Dennis Knagin",
  "Larry Matfay",
  "Herman Malutin",
  "Tania Malutin",
  "Florence Pestrikoff",
  "John Pestrikoff",
  "Phyllis Peterson",
  "Victor Peterson",
  "Sophie Shepherd",
  "Zoya Shugak",
  "Walter Simeonoff",
  "Bobby Stamp",
  "Anakenti Zeedar",
  "Senafont Zeedar",
];

export default function About() {
  return (
    <div className="min-h-full bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-20">
        <Link
          to="/"
          className="atlas-label inline-flex items-center gap-2 text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
        >
          <ArrowLeft size={13} /> Back to the atlas
        </Link>

        <h1 className="atlas-serif mt-10 text-[40px] font-light leading-[1.02] tracking-[-0.015em] md:text-[54px]">
          About the names
        </h1>
        <p className="mt-6 text-[15px] leading-[1.8] text-[var(--paper)]/75">
          Alutiiq people have lived on Kodiak for more than 7,500 years, naming the places they
          lived, harvested and travelled. The names gathered in this atlas were recorded over the
          past two centuries, many of them in interviews with Elder Alutiiq speakers. They preserve
          cultural knowledge: they identify harvesting grounds, warn of dangerous rocks and strong
          currents, and recall past events — the discovery of an iron source, a battle, a church
          built on a certain shore.
        </p>

        <div className="mt-12 grid gap-10 border-t border-[var(--ink-line)] pt-10 md:grid-cols-2">
          <div>
            <h2 className="atlas-label text-[var(--ember)]">Source</h2>
            <p className="mt-3 text-[13.5px] leading-[1.8] text-[var(--paper)]/75">
              Place names, meanings, and the recorded pronunciations of Alutiiq speakers come from
              the Alutiiq Museum&rsquo;s{" "}
              <a
                href="https://alutiiqmuseum.org/alutiiq-people/language/kodiak-alutiiq-place-names/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--paper)] underline decoration-[var(--paper)]/30 underline-offset-4"
              >
                Kodiak Alutiiq Place Names
              </a>{" "}
              project, based on research by Dehrich Chya, the Museum&rsquo;s Director of Language and
              Living Culture. The project was produced with support from the Native Village of
              Afognak and the U.S. Bureau of Indian Affairs.
            </p>
          </div>
          <div>
            <h2 className="atlas-label text-[var(--ember)]">Imagery</h2>
            <p className="mt-3 text-[13.5px] leading-[1.8] text-[var(--paper)]/75">
              The fly-throughs use public satellite imagery of the Kodiak Archipelago (Esri World
              Imagery, with imagery contributors including Maxar and Earthstar Geographics). Every
              name is pinned to the coordinate held in the museum&rsquo;s public place-name dataset,
              so the camera arrives at the exact feature the name describes.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="atlas-label text-[var(--ember)]">How to read the sound guide</h2>
          <p className="mt-3 text-[13.5px] leading-[1.8] text-[var(--paper)]/75">
            Names are written in the Alutiiq alphabet used by the museum. Letters that an English
            reader would not guess are marked in orange and explained beneath the name. The most
            important of these: <span className="text-[var(--paper)]">q</span> is a k made far back
            in the throat, <span className="text-[var(--paper)]">r</span> is a soft sound close to
            the s in <em>measure</em>, <span className="text-[var(--paper)]">ll</span> is a whispered
            l, and <span className="text-[var(--paper)]">c</span> is ts. Nothing written here
            replaces the recording — where a recording exists, it is the authority.
          </p>
        </div>

        <div className="mt-12 border-t border-[var(--ink-line)] pt-10">
          <h2 className="atlas-label text-[var(--ember)]">With thanks</h2>
          <p className="mt-3 text-[13.5px] leading-[1.8] text-[var(--paper)]/75">
            These names were shared by Alutiiq community members, who worked with researchers and
            linguists including Jeff Leer, Linda Yarborough, Laurie Mulcahy, Fred Clark, Dennis
            Griffin and Matthew O&rsquo;Leary.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {ELDERS.map((name) => (
              <li key={name} className="text-[12.5px] text-[var(--paper)]/70">
                {name}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 border-t border-[var(--ink-line)] pt-8 text-[12px] leading-relaxed text-[var(--paper-dim)]">
          This atlas is an independent presentation built on the museum&rsquo;s public place-name
          data. For the authoritative record — including the full dataset, photographs, the place
          names poster and village histories — visit the{" "}
          <a
            href="https://alutiiqmuseum.org/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--paper)] underline decoration-[var(--paper)]/30 underline-offset-4"
          >
            Alutiiq Museum
          </a>
          . Cama&rsquo;i — hello.
        </p>
      </div>
    </div>
  );
}
