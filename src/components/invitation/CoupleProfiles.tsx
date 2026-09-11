import { STRINGS } from "@/lib/i18n";
import type { CoupleProfile, Lang } from "@/lib/invitation-types";
import { useReveal } from "@/hooks/use-scroll-progress";
import { Divider, Vine } from "./Ornaments";

function hasDetail(p?: CoupleProfile) {
  return Boolean(p && (p.photoUrl || p.qualification || p.occupation || p.parents));
}

function Profile({ profile }: { profile: CoupleProfile }) {
  return (
    <div className="flex flex-col items-center text-center">
      {profile.photoUrl && (
        <div
          className="relative w-full max-w-[16rem] overflow-hidden"
          style={{
            borderRadius: "50% 50% 5px 5px / 34% 34% 3px 3px",
            boxShadow: "0 30px 55px -34px oklch(0.5 0.05 68 / 0.5)",
          }}
        >
          <img
            src={profile.photoUrl}
            alt={profile.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-[9px] border border-[oklch(0.9_0.05_88/0.5)]"
            style={{ borderRadius: "50% 50% 4px 4px / 34% 34% 2px 2px" }}
          />
        </div>
      )}
      <h3 className="mt-7 font-display text-[clamp(1.3rem,5.2vw,1.9rem)] tracking-[0.1em] text-ink">
        {profile.name}
      </h3>
      {profile.qualification && (
        <p className="mt-3 font-serif text-[0.86rem] tracking-[0.1em] text-gold-deep uppercase">
          {profile.qualification}
        </p>
      )}
      {profile.occupation && (
        <p className="mt-2 font-serif text-[0.92rem] text-ink-soft">{profile.occupation}</p>
      )}
      {profile.parents && (
        <p className="mt-4 max-w-[22rem] font-serif text-[0.88rem] leading-relaxed text-ink-soft">
          {profile.parents}
        </p>
      )}
    </div>
  );
}

/** Optional couple profiles. Renders nothing when there is nothing to show. */
export function CoupleProfiles({
  groom,
  bride,
  relatives,
  lang,
}: {
  groom?: CoupleProfile | undefined;
  bride?: CoupleProfile | undefined;
  relatives?: string | undefined;
  lang: Lang;
}) {
  const t = STRINGS[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();
  const showGroom = hasDetail(groom);
  const showBride = hasDetail(bride);

  if (!showGroom && !showBride && !relatives) return null;

  return (
    <section aria-label={t.coupleTitle} className="relative px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="text-center">
          <p
            className={`stage-veil ${shown ? "stage-veil-in" : ""} font-serif text-[0.66rem] tracking-luxe text-ink-soft uppercase`}
          >
            {t.coupleOverline}
          </p>
          <h2
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-4 font-display text-[clamp(1.7rem,6.5vw,2.7rem)] tracking-[0.1em] text-ink`}
            style={{ ["--veil-delay" as string]: "80ms" }}
          >
            {t.coupleTitle}
          </h2>
          <div className="mt-6 flex justify-center">
            <Divider className="max-w-[200px]" />
          </div>
        </div>

        {(showGroom || showBride) && (
          <div
            className={`stage-veil ${shown ? "stage-veil-in" : ""} mt-14 grid gap-16 ${showGroom && showBride ? "sm:grid-cols-2" : "justify-items-center"}`}
            style={{ ["--veil-delay" as string]: "140ms" }}
          >
            {showGroom && groom && <Profile profile={groom} />}
            {showBride && bride && <Profile profile={bride} />}
          </div>
        )}

        {relatives && (
          <div className="mt-16 flex flex-col items-center">
            <Vine />
            <p className="mt-8 max-w-[34rem] text-center font-serif text-[0.95rem] leading-relaxed text-ink-soft">
              {relatives}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
