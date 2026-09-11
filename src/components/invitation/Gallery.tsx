import { STRINGS } from "@/lib/i18n";
import type { GalleryImage, Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider } from "./Ornaments";

/** Arched gallery frames. Hidden entirely when no valid images exist. */
export function Gallery({ images, lang }: { images: GalleryImage[]; lang: Lang }) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();
  const list = (Array.isArray(images) ? images : []).filter((i) => i && typeof i.url === "string");

  if (!list.length) return null;

  return (
    <section aria-label={t.galleryTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="text-center">
          <p
            className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
          >
            {t.galleryOverline}
          </p>
          <h2
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.7rem,6.5vw,2.7rem)] tracking-[0.1em] text-ink`}
            style={{ ["--veil-delay" as string]: "80ms" }}
          >
            {t.galleryTitle}
          </h2>
          <div className="mt-6 flex justify-center">
            <Divider className="max-w-[200px]" />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((img, i) => (
            <figure
              key={img.url}
              className={`mask-rise ${shown ? "mask-rise-in" : ""} mx-auto w-full max-w-[22rem]`}
              style={{ ["--veil-delay" as string]: `${i * 90}ms` }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "50% 50% 5px 5px / 30% 30% 3px 3px",
                  boxShadow: "0 34px 60px -38px oklch(0.5 0.05 68 / 0.5)",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt ?? ""}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-[9px] border border-[oklch(0.9_0.05_88/0.5)]"
                  style={{ borderRadius: "50% 50% 4px 4px / 30% 30% 2px 2px" }}
                />
              </div>
              {img.caption && (
                <figcaption className="mt-4 text-center font-serif text-[0.78rem] text-ink-soft">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
