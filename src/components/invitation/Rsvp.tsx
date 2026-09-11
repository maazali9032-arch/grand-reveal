import { useState } from "react";
import { STRINGS } from "@/lib/i18n";
import type { Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider, SealMonogram } from "./Ornaments";

/** Animation-only RSVP — nothing is stored, sent or counted. */
export function Rsvp({ lang, initials }: { lang: Lang; initials: string }) {
  const t = STRINGS[lang];
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section aria-label={t.rsvpTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-xl text-center">
        <p
          className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
        >
          {t.rsvpOverline}
        </p>
        <h2
          className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.7rem,6.5vw,2.7rem)] tracking-[0.1em] text-ink`}
          style={{ ["--veil-delay" as string]: "80ms" }}
        >
          {t.rsvpTitle}
        </h2>
        <div className="mt-6 flex justify-center">
          <Divider className="max-w-[200px]" />
        </div>

        <div className="relative mt-12 min-h-[13rem]">
          <div
            className="flex flex-col items-center gap-5 transition-all duration-700 sm:flex-row sm:justify-center sm:gap-8"
            style={{
              opacity: choice ? 0 : 1,
              transform: choice ? "translateY(-14px) scale(0.97)" : "none",
              pointerEvents: choice ? "none" : undefined,
            }}
          >
            <button
              type="button"
              onClick={() => setChoice("yes")}
              className="group relative w-full max-w-[17rem] overflow-hidden border border-[oklch(0.72_0.088_78/0.75)] px-8 py-4 font-serif text-[0.7rem] tracking-luxe text-gold-deep uppercase transition-colors hover:text-ink sm:w-auto"
            >
              <span className="absolute inset-0 -translate-y-full bg-[oklch(0.88_0.05_84/0.55)] transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative">{t.rsvpAccept}</span>
            </button>
            <button
              type="button"
              onClick={() => setChoice("no")}
              className="w-full max-w-[17rem] border-b border-[oklch(0.72_0.088_78/0.4)] px-6 py-4 font-serif text-[0.7rem] tracking-luxe text-ink-soft uppercase transition-colors hover:text-ink sm:w-auto"
            >
              {t.rsvpDecline}
            </button>
          </div>

          <div
            aria-live="polite"
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-all duration-1000"
            style={{
              opacity: choice ? 1 : 0,
              transform: choice ? "none" : "translateY(18px)",
              pointerEvents: choice ? undefined : "none",
            }}
          >
            {choice === "yes" ? (
              <SealMonogram initials={initials} className="h-24 w-24 warm-glow rounded-full" />
            ) : (
              <Divider className="max-w-[140px]" />
            )}
            <p className="mx-auto max-w-[24rem] font-script text-[clamp(1.25rem,5vw,1.8rem)] leading-snug text-gold-deep">
              {choice === "yes" ? t.rsvpThanks : t.rsvpSorry}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
