import { spell, soundGuide } from "@/lib/alutiiqSound";

export default function SoundSpelling({ name }) {
  const tokens = spell(name);
  const guide = soundGuide(name);

  return (
    <div>
      <div className="atlas-label mb-2.5 text-[var(--paper-dim)]">Say it</div>
      <div className="atlas-serif flex flex-wrap items-baseline text-[22px] leading-relaxed tracking-[0.01em]">
        {tokens.map((t, i) =>
          t.space ? (
            <span key={i} className="w-2" />
          ) : (
            <span
              key={i}
              title={t.sound || undefined}
              className={
                t.notable
                  ? "text-[var(--ember)] border-b border-[var(--ember)]/45 pb-[1px]"
                  : "text-[var(--paper)]/55"
              }
            >
              {t.text}
            </span>
          )
        )}
      </div>
      {guide.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {guide.map((g) => (
            <li key={g.key} className="text-[11px] leading-tight text-[var(--paper-dim)]">
              <span className="atlas-serif mr-1.5 text-[13px] text-[var(--ember)]">{g.key}</span>
              {g.sound}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
