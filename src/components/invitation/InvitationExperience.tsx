import { useEffect, useState } from "react";
import archInterior from "@/assets/arch-interior.jpg";
import { STRINGS } from "@/lib/i18n";
import { tr, type Invitation, type Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { OpeningStage } from "./OpeningStage";
import { Countdown } from "./Countdown";
import { CoupleProfiles } from "./CoupleProfiles";
import { Gallery } from "./Gallery";
import { Schedule } from "./Schedule";
import { VenueSection } from "./VenueSection";
import { Rsvp } from "./Rsvp";
import { ContactSocial } from "./ContactSocial";
import { MusicControl } from "./MusicControl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Divider, SealMonogram } from "./Ornaments";

/** Continuous architectural backdrop with slow parallax drift. */
function Backdrop() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setOffset(window.scrollY * 0.035);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="paper fixed inset-0 -z-10 overflow-hidden">
      <img
        src={archInterior}
        alt=""
        width={1536}
        height={1024}
        className="absolute inset-0 h-[118%] w-full object-cover object-top opacity-[0.22]"
        style={{ transform: `translateY(${-offset}px) scale(1.04)` }}
      />
      <div className="damask absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(115%_80%_at_50%_20%,oklch(0.99_0.008_88/0.85),oklch(0.95_0.02_84/0.72)_55%,oklch(0.9_0.03_80/0.8)_100%)]" />
    </div>
  );
}

function FinalNote({ invitation, lang }: { invitation: Invitation; lang: Lang }) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();
  const initials = `${invitation.groomName.trim()[0] ?? ""}${invitation.brideName.trim()[0] ?? ""}`;
  const first = (name: string) => name.trim().split(" ")[0] ?? "";

  return (
    <section aria-label={t.finalLine} className="relative px-5 pt-24 pb-24 sm:pt-32">
      <div ref={ref} className="mx-auto max-w-xl text-center">
        <div
          className={`stage-veil ${shown ? "stage-veil-in" : ""} mx-auto h-20 w-20 opacity-90 sm:h-24 sm:w-24`}
        >
          <SealMonogram initials={initials || "✦"} className="h-full w-full" />
        </div>
        <p
          className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-10 font-script text-[clamp(1.5rem,6vw,2.4rem)] leading-snug text-gold-deep`}
          style={{ ["--veil-delay" as string]: "90ms" }}
        >
          {t.finalLine}
        </p>
        <div className="mt-8 flex justify-center">
          <Divider className="max-w-[200px]" />
        </div>
        <p
          className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-8 font-display text-[0.72rem] tracking-luxe text-ink-soft uppercase`}
          style={{ ["--veil-delay" as string]: "160ms" }}
        >
          {t.finalNote}
        </p>
        <p className="mt-8 font-display text-[clamp(1.1rem,4.6vw,1.6rem)] tracking-[0.14em] text-ink">
          {invitation.groomName && invitation.brideName
            ? `${first(invitation.groomName)} & ${first(invitation.brideName)}`
            : first(invitation.groomName || invitation.brideName)}
        </p>
        {(invitation.groomFamily || invitation.brideFamily) && (
          <div className="mt-6 space-y-1 font-serif text-[0.8rem] text-ink-soft">
            {invitation.groomFamily && <p>{tr(invitation.groomFamily, lang)}</p>}
            {invitation.brideFamily && <p>{tr(invitation.brideFamily, lang)}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export function InvitationExperience({ invitation }: { invitation: Invitation }) {
  const [lang, setLang] = useState<Lang>("en");
  const initials = `${invitation.groomName.trim()[0] ?? ""}${invitation.brideName.trim()[0] ?? ""}`;

  const target = invitation.weddingDateTime
    ? new Date(invitation.weddingDateTime).getTime()
    : Number.NaN;
  const showCountdown = Number.isFinite(target) && target > Date.now();

  return (
    <main className="relative w-full">
      <Backdrop />

      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 sm:top-5 sm:right-5">
        <MusicControl src={invitation.musicUrl} lang={lang} />
        <LanguageSwitcher lang={lang} onChange={setLang} />
      </div>

      <OpeningStage invitation={invitation} lang={lang} />
      {showCountdown && invitation.weddingDateTime && (
        <Countdown dateTime={invitation.weddingDateTime} lang={lang} />
      )}
      <CoupleProfiles
        groom={invitation.groom}
        bride={invitation.bride}
        relatives={invitation.relatives}
        lang={lang}
      />
      <Schedule events={invitation.events} lang={lang} />
      {invitation.venue && <VenueSection venue={invitation.venue} lang={lang} />}
      <Gallery images={invitation.gallery} lang={lang} />
      <Rsvp lang={lang} initials={initials || "✦"} />
      <ContactSocial contacts={invitation.contacts} lang={lang} />
      <FinalNote invitation={invitation} lang={lang} />
    </main>
  );
}
