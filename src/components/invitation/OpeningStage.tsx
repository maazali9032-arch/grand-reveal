import { useRef } from "react";
import archInterior from "@/assets/arch-interior.jpg";
import { useScrollProgress, mapRange } from "@/hooks/use-scroll-progress";
import { tr, type Invitation, type Lang } from "@/lib/invitation-types";
import { formatDateLine, STRINGS } from "@/lib/i18n";
import { Divider, SealMonogram } from "./Ornaments";

type Props = {
  invitation: Invitation;
  lang: Lang;
  onProgress?: (p: number) => void;
};

/**
 * Envelope → opening → architectural reveal, as one continuous sticky camera move.
 * All motion is derived from a single scroll progress value, so scrolling
 * upward reverses the experience exactly.
 */
export function OpeningStage({ invitation, lang, onProgress }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const p = useScrollProgress(sectionRef);
  const t = STRINGS[lang];

  onProgress?.(p);

  const initials = `${invitation.groomName.trim()[0] ?? ""}${invitation.brideName.trim()[0] ?? ""}` || "\u2726";

  // The wedding date/time is shown exactly once, here beneath the names.
  const parts: string[] = [];
  if (invitation.weddingDate) {
    const { day, date } = formatDateLine(invitation.weddingDate, lang);
    parts.push(`${day} \u00b7 ${date}`);
  }
  const timeRange = [invitation.startTime, invitation.endTime].filter(Boolean).join(" \u2013 ");
  if (timeRange) parts.push(timeRange);
  const dateLine = parts.join(" \u00b7 ");

  // --- envelope choreography ---
  const flapAngle = mapRange(p, 0.06, 0.36, 0, -179);
  const flapLifted = flapAngle < -92;
  const sealShift = mapRange(p, 0.05, 0.22, 0, 1);
  const sealFade = 1 - mapRange(p, 0.12, 0.26, 0, 1);
  const glow = mapRange(p, 0.14, 0.46, 0, 1);
  const letterRise = mapRange(p, 0.26, 0.66, 6, -62);
  const letterScale = mapRange(p, 0.26, 0.72, 0.97, 1.06);
  const envelopeScale = mapRange(p, 0.4, 0.86, 1, 2.5);
  const envelopeFade = 1 - mapRange(p, 0.52, 0.8, 0, 1);
  const envelopeLift = mapRange(p, 0.4, 0.86, 0, -8);

  // --- architectural camera push ---
  const archOpacity = mapRange(p, 0.42, 0.72, 0, 1);
  const archScale = mapRange(p, 0.42, 1, 1.42, 1.02);
  const archBlur = 14 * (1 - mapRange(p, 0.42, 0.68, 0, 1));
  const namesIn = mapRange(p, 0.76, 0.94, 0, 1);
  const namesRise = (1 - namesIn) * 40;
  const hintFade = 1 - mapRange(p, 0, 0.08, 0, 1);

  return (
    <section
      ref={sectionRef}
      aria-label="Invitation opening"
      className="relative h-[340svh] md:h-[380svh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Architectural interior — the camera pushes through the arch */}
        <div
          className="absolute inset-0"
          style={{
            opacity: archOpacity,
            transform: `scale(${archScale})`,
            filter: `blur(${archBlur}px)`,
            willChange: "transform, opacity",
          }}
        >
          <img
            src={archInterior}
            alt=""
            width={1536}
            height={1024}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_45%,transparent_20%,oklch(0.82_0.04_82/0.45)_72%,oklch(0.7_0.05_74/0.6)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--ivory),transparent)]" />
        </div>

        {/* Couple reveal inside the arch */}
        <div
          className="absolute inset-0 grid place-items-center px-6"
          style={{ opacity: namesIn, transform: `translateY(${namesRise}px)` }}
        >
          <div className="w-full max-w-[38rem] text-center">
            {invitation.invocation && (
              <p className="mx-auto mb-6 max-w-[26rem] font-script text-[clamp(1.05rem,4.4vw,1.5rem)] leading-snug text-gold-deep">
                {invitation.invocation}
              </p>
            )}
            <p className="font-serif text-[0.7rem] tracking-luxe text-ink-soft uppercase sm:text-xs">
              {tr(invitation.overline, lang) || t.weAreGettingMarried}
            </p>
            <div className="mt-6 flex justify-center">
              <Divider className="max-w-[220px]" />
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,9vw,4.4rem)] leading-[1.05] tracking-[0.06em] text-ink">
              {invitation.groomName && <span className="block">{invitation.groomName}</span>}
              {invitation.groomName && invitation.brideName && (
                <span className="my-1 block font-script text-gilded shimmer text-[clamp(2rem,8vw,3.2rem)] leading-none">
                  &amp;
                </span>
              )}
              {invitation.brideName && <span className="block">{invitation.brideName}</span>}
            </h1>
            <div className="mt-7 flex justify-center">
              <Divider className="max-w-[180px]" />
            </div>
            {tr(invitation.message, lang) && (
              <p className="mx-auto mt-6 max-w-[30rem] font-serif text-[0.95rem] leading-relaxed text-ink-soft sm:text-base">
                {tr(invitation.message, lang)}
              </p>
            )}
            {dateLine && (
              <p className="mt-6 font-display text-[0.82rem] tracking-wide-luxe text-gold-deep uppercase sm:text-sm">
                {dateLine}
              </p>
            )}
          </div>
        </div>

        {/* Envelope */}
        <div
          className="paper paper-grain absolute inset-0 grid place-items-center px-5"
          style={{
            opacity: envelopeFade,
            pointerEvents: envelopeFade < 0.05 ? "none" : undefined,
          }}
        >
          <div className="damask pointer-events-none absolute inset-0 opacity-60" />
          <div
            className="relative w-full max-w-[34rem]"
            style={{ perspective: "1500px", perspectiveOrigin: "50% 30%" }}
          >
            <div
              className="relative aspect-[1.52/1] w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `scale(${envelopeScale}) translateY(${envelopeLift}%)`,
                willChange: "transform",
              }}
            >
              {/* warm light escaping from inside */}
              <div
                className="absolute left-1/2 top-[6%] h-[70%] w-[86%] -translate-x-1/2 rounded-[50%] blur-2xl"
                style={{
                  opacity: glow * 0.9,
                  background:
                    "radial-gradient(circle at 50% 40%, oklch(0.95 0.08 88 / 0.95), oklch(0.86 0.1 82 / 0.55) 45%, transparent 72%)",
                }}
              />

              {/* letter rising out of the envelope */}
              <div
                className="absolute left-1/2 top-0 h-[96%] w-[86%] overflow-hidden rounded-[2px]"
                style={{
                  transform: `translate(-50%, ${letterRise}%) scale(${letterScale})`,
                  boxShadow: "0 24px 48px -24px oklch(0.5 0.05 68 / 0.45)",
                  background: "linear-gradient(165deg, oklch(0.99 0.008 88), oklch(0.95 0.02 84))",
                  willChange: "transform",
                }}
              >
                <div className="absolute inset-[7px] gold-hairline" />
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="font-script text-[clamp(1.3rem,5.5vw,2rem)] text-gold-deep">
                    You are invited
                  </p>
                  <Divider className="max-w-[150px]" />
                  <p className="font-display text-[clamp(0.95rem,3.4vw,1.3rem)] tracking-[0.22em] text-ink uppercase">
                    {invitation.groomName.split(" ")[0]} &amp; {invitation.brideName.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* envelope body */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[3px]"
                style={{
                  background:
                    "linear-gradient(155deg, oklch(0.96 0.018 86), oklch(0.93 0.026 82) 52%, oklch(0.89 0.032 80))",
                  boxShadow: "var(--shadow-paper)",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* inner side flaps for physical depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, oklch(0.9 0.03 80 / 0.85), transparent 22%, transparent 78%, oklch(0.9 0.03 80 / 0.85))",
                    clipPath: "polygon(0 0, 34% 52%, 0 100%, 100% 100%, 66% 52%, 100% 0)",
                    opacity: 0.9,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.94 0.024 84), oklch(0.9 0.03 80 / 0.4))",
                    clipPath: "polygon(0 100%, 50% 46%, 100% 100%)",
                    boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.7)",
                  }}
                />
                <div className="damask absolute inset-0 opacity-70" />
                <div className="absolute inset-[10px] gold-hairline emboss" />
                <div className="absolute inset-[18px] rounded-[2px] border border-[oklch(0.78_0.06_80/0.35)]" />
              </div>

              {/* top flap — lifts with real perspective */}
              <div
                className="absolute inset-x-0 top-0 h-[56%] origin-top"
                style={{
                  transform: `rotateX(${flapAngle}deg)`,
                  transformStyle: "preserve-3d",
                  zIndex: flapLifted ? 1 : 30,
                  willChange: "transform",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: flapLifted
                      ? "linear-gradient(to bottom, oklch(0.9 0.03 80), oklch(0.95 0.02 84))"
                      : "linear-gradient(to bottom, oklch(0.97 0.015 88), oklch(0.91 0.03 82))",
                    filter: `brightness(${1 - Math.abs(flapAngle) / 900})`,
                    boxShadow: "0 18px 30px -18px oklch(0.5 0.05 68 / 0.5)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background:
                      "linear-gradient(to bottom, oklch(0.72 0.088 78 / 0.22), transparent 42%)",
                  }}
                />
                <svg
                  viewBox="0 0 400 220"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full text-gold"
                  fill="none"
                >
                  <path d="M8 4 200 214 392 4" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                  <path d="M22 4 200 200 378 4" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
                  <path
                    d="M200 40c18 16 18 30 0 44-18-14-18-28 0-44z"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* wax seal — separates into halves as the flap lifts */}
              <div
                className="pointer-events-none absolute left-1/2 top-[46%] h-[26%] -translate-x-1/2 -translate-y-1/2 aspect-square"
                style={{ zIndex: 40, opacity: sealFade }}
              >
                <div
                  className="absolute inset-0 seal-breathe"
                  style={{
                    clipPath: "inset(0 50% 0 0)",
                    transform: `translateX(${-sealShift * 46}%) rotate(${-sealShift * 16}deg)`,
                  }}
                >
                  <SealMonogram initials={initials} className="h-full w-full" />
                </div>
                <div
                  className="absolute inset-0 seal-breathe"
                  style={{
                    clipPath: "inset(0 0 0 50%)",
                    transform: `translateX(${sealShift * 46}%) rotate(${sealShift * 16}deg)`,
                  }}
                >
                  <SealMonogram initials={initials} className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <div
            className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
            style={{ opacity: hintFade }}
          >
            <p className="font-display text-[0.68rem] tracking-luxe text-ink-soft uppercase">
              {t.openInvitation}
            </p>
            <span className="hint-drift block h-10 w-px bg-[linear-gradient(to_bottom,transparent,var(--gold))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
