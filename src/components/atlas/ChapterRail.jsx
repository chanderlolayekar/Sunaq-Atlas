import { Play } from "lucide-react";

export default function ChapterRail({ chapters, activeId, onSelect, onPlay, total }) {
  return (
    <div className="pointer-events-auto">
      <div className="mb-3 flex items-baseline justify-between md:mb-4">
        <span className="atlas-label text-[var(--paper-dim)]">Chapters</span>
        <button
          onClick={() => onSelect(null)}
          className={`atlas-label transition-colors ${
            activeId ? "text-[var(--paper-dim)] hover:text-[var(--paper)]" : "text-[var(--ember)]"
          }`}
        >
          All {total}
        </button>
      </div>

      <ul className="flex gap-2 overflow-x-auto pb-2 atlas-scroll md:flex-col md:gap-0 md:overflow-visible md:pb-0">
        {chapters.map((c, i) => {
          const active = c.id === activeId;
          return (
            <li
              key={c.id}
              className="shrink-0 md:shrink md:border-t md:border-[var(--ink-line)] md:first:border-t-0"
            >
              <div
                className={`group flex items-center gap-3 px-3 py-2.5 transition-colors md:px-0 md:py-3.5 ${
                  active ? "bg-[rgba(243,237,227,0.06)] md:bg-transparent" : ""
                }`}
              >
                <button
                  onClick={() => onSelect(c.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className={`font-mono text-[9.5px] ${
                        active ? "text-[var(--ember)]" : "text-[var(--paper-dim)]/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`atlas-serif truncate text-[17px] font-light transition-colors ${
                        active
                          ? "text-[var(--paper)]"
                          : "text-[var(--paper)]/70 group-hover:text-[var(--paper)]"
                      }`}
                    >
                      {c.name}
                    </span>
                  </div>
                  <p className="mt-0.5 hidden truncate pl-[26px] text-[11.5px] text-[var(--paper-dim)]/80 md:block">
                    {c.gloss}
                  </p>
                </button>
                <button
                  onClick={() => onPlay(c.id)}
                  aria-label={`Play journey: ${c.name}`}
                  className={`shrink-0 p-1.5 transition-opacity ${
                    active
                      ? "text-[var(--ember)] opacity-100"
                      : "text-[var(--paper-dim)] opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Play size={12} strokeWidth={2} fill="currentColor" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
