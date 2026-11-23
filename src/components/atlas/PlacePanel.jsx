import { X, Volume2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import SoundSpelling from "@/components/atlas/SoundSpelling";
import { formatCoords } from "@/lib/atlas";

function AudioButton({ place, playing, onListen }) {
  if (!place.audio) return null;
  return (
    <button
      onClick={() => onListen(place)}
      className="group flex w-full items-center gap-3 border border-[rgba(232,131,74,0.4)] bg-[rgba(232,131,74,0.07)] px-4 py-3 text-left transition-colors hover:bg-[rgba(232,131,74,0.15)]"
    >
      <Volume2 size={16} className="shrink-0 text-[var(--ember)]" strokeWidth={1.6} />
      <span className="atlas-label text-[var(--paper)]">
        {playing ? "Playing the name" : "Hear it spoken"}
      </span>
      <span className="ml-auto flex h-4 items-end gap-[2px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={
              playing
                ? "atlas-pulse w-[2px] bg-[var(--ember)]"
                : "w-[2px] bg-[var(--paper-dim)]/40"
            }
            style={{
              height: `${[10, 16, 7, 14, 9][i]}px`,
              animationDelay: `${i * 130}ms`,
            }}
          />
        ))}
      </span>
    </button>
  );
}

export default function PlacePanel({ place, playing, onListen, onClose, hiddenOnMobile }) {
  if (!place) return null;

  return (
    <aside
      key={place.id}
      className={`atlas-rise pointer-events-auto fixed inset-x-0 bottom-0 z-30 max-h-[74vh] overflow-y-auto border-t border-[var(--ink-line)] bg-[rgba(10,17,25,0.97)] backdrop-blur-xl atlas-scroll md:inset-x-auto md:bottom-auto md:right-7 md:top-24 md:max-h-[calc(100vh-8rem)] md:w-[404px] md:border md:border-[var(--ink-line)] ${
        hiddenOnMobile ? "hidden md:block" : ""
      }`}
    >
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="atlas-label text-[var(--paper-dim)]">
            {place.english ? place.type : "Place name"}{" "}
            <span className="mx-1 opacity-40">·</span> {place.region}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 shrink-0 p-1 text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
          >
            <X size={16} strokeWidth={1.6} />
          </button>
        </div>

        <h2 className="atlas-serif mt-4 text-[38px] font-light leading-[1.05] tracking-[-0.01em] text-[var(--paper)] md:text-[42px]">
          {place.alutiiq}
        </h2>
        {place.english && (
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--paper-dim)]">
            {place.english}
          </p>
        )}

        <div className="mt-6">
          <SoundSpelling name={place.alutiiq} />
        </div>

        <div className="mt-6">
          <AudioButton place={place} playing={playing} onListen={onListen} />
        </div>

        {place.meaning && (
          <div className="mt-7 border-l border-[var(--ember)]/50 pl-4">
            <div className="atlas-label mb-1.5 text-[var(--paper-dim)]">What it means</div>
            <p className="atlas-serif text-[17px] font-light italic leading-snug text-[var(--paper)]/90">
              {place.meaning}
            </p>
          </div>
        )}

        {place.note && (
          <div className="mt-6">
            <div className="atlas-label mb-1.5 text-[var(--paper-dim)]">On the land</div>
            <p className="text-[13.5px] leading-[1.75] text-[var(--paper)]/80">{place.note}</p>
          </div>
        )}

        {place.photo && (
          <div className="mt-6">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--ink)]">
              <Image
                src={place.photo}
                alt={place.english || place.alutiiq}
                className="h-full w-full"
                fittingType="fill"
              />
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[var(--paper-dim)]/70">
              Alutiiq Museum collection
            </p>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between border-t border-[var(--ink-line)] pt-4">
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-[var(--paper-dim)]/80">
            {formatCoords(place.lat, place.lng)}
          </span>
          <a
            href="https://alutiiqmuseum.org/alutiiq-people/language/kodiak-alutiiq-place-names/"
            target="_blank"
            rel="noreferrer"
            className="atlas-label text-[var(--paper-dim)] underline decoration-[var(--paper-dim)]/30 underline-offset-4 transition-colors hover:text-[var(--paper)]"
          >
            Museum record
          </a>
        </div>
      </div>
    </aside>
  );
}
