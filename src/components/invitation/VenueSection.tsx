import { STRINGS } from "@/lib/i18n";
import type { Lang, Venue } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Corner, Divider } from "./Ornaments";

export function VenueSection({ venue, lang }: { venue: Venue; lang: Lang }) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();
  const hasImage = Boolean(venue.imageUrl && venue.imageUrl.trim());

  return (
    <section aria-label={t.venueTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="text-center">
          <p
            className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
          >
            {t.venueOverline}
          </p>
          <h2
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.7rem,6.5vw,2.7rem)] tracking-[0.1em] text-ink`}
            style={{ ["--veil-delay" as string]: "80ms" }}
          >
            {t.venueTitle}
          </h2>
          <div className="mt-6 flex justify-center">
            <Divider className="max-w-[200px]" />
          </div>
        </div>

        <div
          className={`mt-14 grid gap-12 ${hasImage ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}
        >
          {hasImage && (
            <figure
              className={`mask-rise ${shown ? "mask-rise-in" : ""} relative mx-auto w-full max-w-[34rem]`}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "50% 50% 6px 6px / 34% 34% 3px 3px",
                  boxShadow: "0 40px 70px -40px oklch(0.5 0.05 68 / 0.55)",
                }}
              >
                <img
                  src={venue.imageUrl}
                  alt={venue.name}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[4/4.4]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.86_0.04_82/0.35),transparent_45%)]" />
                <div
                  className="pointer-events-none absolute inset-[10px] border border-[oklch(0.9_0.05_88/0.55)]"
                  style={{ borderRadius: "50% 50% 4px 4px / 34% 34% 2px 2px" }}
                />
              </div>
            </figure>
          )}

          <div
            className={`stage-veil ${shown ? "stage-veil-in" : ""} relative mx-auto max-w-[30rem] px-2 text-center ${hasImage ? "lg:text-left" : ""}`}
            style={{ ["--veil-delay" as string]: "160ms" }}
          >
            <Corner
              className={`absolute -top-6 left-1/2 -translate-x-1/2 opacity-70 ${hasImage ? "lg:left-0 lg:translate-x-0" : ""}`}
            />
            <h3 className="mt-8 font-display text-[clamp(1.5rem,6vw,2.2rem)] leading-tight tracking-[0.08em] text-ink">
              {venue.name}
            </h3>
            {(venue.address || venue.city) && (
              <p className="mt-5 font-serif text-[1rem] leading-relaxed text-ink-soft">
                {[venue.address, venue.city].filter(Boolean).join(", ")}
              </p>
            )}
            {venue.mapsUrl && (
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-3 border border-[oklch(0.78_0.06_80/0.7)] px-8 py-3.5 font-serif text-[0.7rem] tracking-luxe text-gold-deep uppercase transition-colors hover:bg-[oklch(0.86_0.048_82/0.35)]"
              >
                {t.getDirections}
                <span className="h-px w-6 bg-gold transition-all group-hover:w-9" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
