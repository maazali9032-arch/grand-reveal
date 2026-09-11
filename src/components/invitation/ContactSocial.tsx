import { MessageCircle, Phone } from "lucide-react";
import { STRINGS } from "@/lib/i18n";
import type { ContactPerson, Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider } from "./Ornaments";

/**
 * Invitation contacts — at most two, and only when a phone number exists.
 * Never falls back to shop, venue or hardcoded numbers.
 */
export function ContactSocial({ contacts, lang }: { contacts: ContactPerson[]; lang: Lang }) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();

  const people = (Array.isArray(contacts) ? contacts : [])
    .slice(0, 2)
    .filter((c) => Boolean(c && typeof c.phone === "string" && c.phone.trim()));

  if (!people.length) return null;

  return (
    <section aria-label={t.contactTitle} className="relative px-5 py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-2xl text-center">
        <p
          className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
        >
          {t.contactOverline}
        </p>
        <h2
          className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.5rem,5.8vw,2.3rem)] tracking-[0.1em] text-ink`}
          style={{ ["--veil-delay" as string]: "80ms" }}
        >
          {t.contactTitle}
        </h2>
        <div className="mt-6 flex justify-center">
          <Divider className="max-w-[180px]" />
        </div>

        <ul className="mt-12 flex flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
          {people.map((person, i) => (
            <li
              key={`${person.phone}-${i}`}
              className={`stage-veil ${shown ? "stage-veil-in" : ""} flex flex-col items-center`}
              style={{ ["--veil-delay" as string]: `${i * 110}ms` }}
            >
              {person.name && (
                <p className="font-display text-[1rem] tracking-[0.14em] text-ink uppercase">
                  {person.name}
                </p>
              )}
              <p className="mt-3 font-serif text-[0.95rem] text-ink-soft">{person.phone}</p>
              <div className="mt-6 flex items-center gap-8">
                <a
                  href={`tel:${person.phone.replace(/\s+/g, "")}`}
                  className="group flex w-20 flex-col items-center gap-3"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-[oklch(0.78_0.06_80/0.6)] text-gold-deep transition-all duration-500 group-hover:border-[oklch(0.72_0.088_78)] group-hover:bg-[oklch(0.88_0.05_84/0.4)]">
                    <Phone strokeWidth={1.1} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-[0.62rem] tracking-wide-luxe text-ink-soft uppercase">
                    {t.call}
                  </span>
                </a>
                {person.whatsappUrl && (
                  <a
                    href={person.whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex w-20 flex-col items-center gap-3"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-[oklch(0.78_0.06_80/0.6)] text-gold-deep transition-all duration-500 group-hover:border-[oklch(0.72_0.088_78)] group-hover:bg-[oklch(0.88_0.05_84/0.4)]">
                      <MessageCircle strokeWidth={1.1} className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-[0.62rem] tracking-wide-luxe text-ink-soft uppercase">
                      {t.whatsapp}
                    </span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
