import { useEffect, useState } from "react";
import { STRINGS } from "@/lib/i18n";
import type { Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider } from "./Ornaments";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ dateTime, lang }: { dateTime: string; lang: Lang }) {
  const t = STRINGS[lang];
  const target = new Date(dateTime).getTime();
  const [parts, setParts] = useState<Parts | null>(null);
  const [ready, setReady] = useState(false);
  const { ref, shown } = useReveal<HTMLDivElement>();

  useEffect(() => {
    setParts(diff(target));
    setReady(true);
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: { label: string; value: number }[] = [
    { label: t.days, value: parts?.days ?? 0 },
    { label: t.hours, value: parts?.hours ?? 0 },
    { label: t.minutes, value: parts?.minutes ?? 0 },
    { label: t.seconds, value: parts?.seconds ?? 0 },
  ];

  return (
    <section aria-label={t.countdownTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <p
          className={`stage-veil ${shown ? "stage-veil-in" : ""} font-display text-[0.68rem] tracking-luxe text-ink-soft uppercase sm:text-xs`}
        >
          {t.countdownTitle}
        </p>
        <div className="mt-6 flex justify-center">
          <Divider className="max-w-[200px]" />
        </div>

        {ready && !parts ? (
          <p
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-10 font-script text-[clamp(1.6rem,6vw,2.6rem)] text-gold-deep`}
          >
            {t.celebrationBegun}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
            {cells.map((cell, i) => (
              <div
                key={cell.label}
                className={`stage-veil ${shown ? "stage-veil-in" : ""} relative flex flex-col items-center px-2`}
                style={{ ["--veil-delay" as string]: `${i * 110}ms` }}
              >
                {i > 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent,oklch(0.72_0.088_78/0.5),transparent)] sm:block" />
                )}
                <span className="font-display text-[clamp(2.6rem,11vw,4.2rem)] leading-none tabular-nums text-ink">
                  {String(cell.value).padStart(2, "0")}
                </span>
                <span className="mt-4 font-serif text-[0.62rem] tracking-luxe text-gold-deep uppercase sm:text-[0.68rem]">
                  {cell.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
