import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Intro({ chapters, total, onEnter, onPickChapter }) {
  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-[rgba(5,9,13,0.95)] backdrop-blur-md atlas-scroll">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-14 md:px-12">
        <div className="grid gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
          <div>
            <div className="atlas-label text-[var(--ember)]">Kodiak Archipelago · Sugpiaq Alutiiq</div>
            <h1 className="atlas-serif mt-6 text-[54px] font-light leading-[0.94] tracking-[-0.02em] text-[var(--paper)] sm:text-[72px] md:text-[86px]">
              Sun&rsquo;aq
              <span className="mt-2 block text-[26px] leading-none tracking-[0.02em] text-[var(--paper)]/55 sm:text-[32px]">
                Atlas
              </span>
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.75] text-[var(--paper)]/75">
              Alutiiq people named every bay, cape, lake and village in this archipelago.{" "}
              {total} of those names are gathered here, fixed to the exact ground they describe.
              Fly to any one of them over satellite imagery, read what it means, and hear it
              spoken.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onEnter()}
                className="group flex items-center gap-3 bg-[var(--paper)] px-6 py-3.5 text-[var(--ink)] transition-colors hover:bg-[var(--ember)] hover:text-[var(--ink)]"
              >
                <span className="atlas-label">Enter the atlas</span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <button
                onClick={() => onPickChapter(chapters[0].id)}
                className="atlas-label border border-[var(--ink-line)] px-6 py-3.5 text-[var(--paper)]/80 transition-colors hover:border-[var(--paper)]/40 hover:text-[var(--paper)]"
              >
                Begin a journey
              </button>
            </div>

            <p className="mt-10 max-w-md text-[11.5px] leading-relaxed text-[var(--paper-dim)]/80">
              Place names and audio courtesy of the Alutiiq Museum, Kodiak, Alaska — recorded with
              Alutiiq Elders and culture bearers. Imagery © Esri, Maxar, Earthstar Geographics.
            </p>
            <Link
              to="/about"
              className="atlas-label mt-5 inline-block text-[var(--paper-dim)] underline decoration-[var(--paper-dim)]/30 underline-offset-4 transition-colors hover:text-[var(--paper)]"
            >
              About the names
            </Link>
          </div>

          <div className="md:pt-14">
            <div className="atlas-label mb-4 border-b border-[var(--ink-line)] pb-3 text-[var(--paper-dim)]">
              Seven journeys
            </div>
            <ul>
              {chapters.map((c, i) => (
                <li key={c.id} className="border-b border-[var(--ink-line)]">
                  <button
                    onClick={() => onPickChapter(c.id)}
                    className="group flex w-full items-baseline gap-3.5 py-3 text-left"
                  >
                    <span className="font-mono text-[9.5px] text-[var(--paper-dim)]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="atlas-serif block text-[18px] font-light text-[var(--paper)]/85 transition-colors group-hover:text-[var(--ember)]">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-[11.5px] text-[var(--paper-dim)]/80">
                        {c.gloss}
                      </span>
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-[var(--paper-dim)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
