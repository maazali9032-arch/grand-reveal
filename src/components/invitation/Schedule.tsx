import { useMemo, useState } from "react";
import { formatDateLine, STRINGS } from "@/lib/i18n";
import { tr, type Lang, type WeddingEvent } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider, Vine } from "./Ornaments";

export function Schedule({ events, lang }: { events: WeddingEvent[]; lang: Lang }) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();

  const days = useMemo(() => {
    const map = new Map<string, WeddingEvent[]>();
    for (const e of [...events].sort((a, b) => a.date.localeCompare(b.date))) {
      map.set(e.date, [...(map.get(e.date) ?? []), e]);
    }
    return [...map.entries()].map(([date, items]) => ({ date, items }));
  }, [events]);

  const firstDate = days[0]?.date ?? "";
  const [activeDate, setActiveDate] = useState(firstDate);
  const multiDay = days.length > 1;
  const currentDate = activeDate || firstDate;
  const visible = multiDay ? days.filter((d) => d.date === currentDate) : days;

  if (!events.length) return null;

  return (
    <section aria-label={t.scheduleTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-2xl">
        <div className="text-center">
          <p
            className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
          >
            {t.scheduleOverline}
          </p>
          <h2
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.7rem,6.5vw,2.7rem)] tracking-[0.1em] text-ink`}
            style={{ ["--veil-delay" as string]: "80ms" }}
          >
            {t.scheduleTitle}
          </h2>
          <div className="mt-6 flex justify-center">
            <Divider className="max-w-[220px]" />
          </div>
        </div>

        {multiDay && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {days.map((d, i) => {
              const isActive = currentDate === d.date;
              const { date } = formatDateLine(d.date, lang);
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setActiveDate(d.date)}
                  aria-pressed={isActive}
                  className={`group flex flex-col items-center px-1 pb-2 font-serif text-[0.72rem] tracking-wide-luxe uppercase transition-colors ${
                    isActive ? "text-gold-deep" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span>
                    {t.dayLabel} {i + 1}
                  </span>
                  <span className="mt-1 text-[0.62rem] normal-case tracking-normal opacity-75">
                    {date}
                  </span>
                  <span
                    className={`mt-2 h-px w-10 transition-all ${isActive ? "bg-gold" : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-14 space-y-14">
          {visible.map((day) => {
            const { day: dayName, date } = formatDateLine(day.date, lang);
            return (
              <div key={day.date}>
                {!multiDay && (
                  <p className="text-center font-display text-[0.78rem] tracking-wide-luxe text-gold-deep uppercase">
                    {dayName} · {date}
                  </p>
                )}
                <ol className="mt-8">
                  {day.items.map((e, i) => (
                    <li key={e.id}>
                      {i > 0 && (
                        <div className="flex justify-center py-8">
                          <Vine />
                        </div>
                      )}
                      <article
                        className={`stage-veil ${shown ? "stage-veil-in" : ""} text-center`}
                        style={{ ["--veil-delay" as string]: `${i * 120}ms` }}
                      >
                        <h3 className="font-display text-[clamp(1.25rem,5.2vw,1.9rem)] tracking-[0.12em] text-ink">
                          {tr(e.name, lang)}
                        </h3>
                        <p className="mt-3 font-script text-[clamp(1.1rem,4.4vw,1.5rem)] text-gold-deep">
                          {tr(e.time, lang)}
                        </p>
                        {multiDay && (
                          <p className="mt-2 font-serif text-[0.68rem] tracking-wide-luxe text-ink-soft uppercase">
                            {dayName} · {date}
                          </p>
                        )}
                        {e.place && (
                          <p className="mt-2 font-serif text-[0.78rem] tracking-[0.14em] text-ink-soft uppercase">
                            {e.place}
                          </p>
                        )}
                        {e.description && (
                          <p className="mx-auto mt-4 max-w-[28rem] font-serif text-[0.95rem] leading-relaxed text-ink-soft">
                            {tr(e.description, lang)}
                          </p>
                        )}
                      </article>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
