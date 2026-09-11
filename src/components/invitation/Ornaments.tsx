type SvgProps = { className?: string };

/** Thin ornamental divider — hairline rules with a centred lozenge flourish. */
export function Divider({ className = "" }: SvgProps) {
  return (
    <svg
      viewBox="0 0 320 20"
      aria-hidden="true"
      className={`w-full max-w-[320px] text-gold ${className}`}
      fill="none"
    >
      <path d="M0 10h118" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <path d="M202 10h118" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <path d="M126 10h14M180 10h14" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
      <path d="M160 3.5 166.5 10 160 16.5 153.5 10z" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="146" cy="10" r="1.4" fill="currentColor" opacity="0.8" />
      <circle cx="174" cy="10" r="1.4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/** Small vine motif used between timeline entries. */
export function Vine({ className = "" }: SvgProps) {
  return (
    <svg
      viewBox="0 0 120 24"
      aria-hidden="true"
      className={`w-[110px] text-gold ${className}`}
      fill="none"
    >
      <path
        d="M4 12c14 0 20-8 30-8s12 16 26 16 16-16 26-16 12 8 30 8"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.7"
      />
      <circle cx="60" cy="12" r="1.6" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/** Ornamental circular wax-seal monogram. */
export function SealMonogram({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
        <defs>
          <radialGradient id="sealFill" cx="38%" cy="30%" r="78%">
            <stop offset="0%" stopColor="oklch(0.93 0.05 88)" />
            <stop offset="55%" stopColor="oklch(0.82 0.075 82)" />
            <stop offset="100%" stopColor="oklch(0.61 0.075 70)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#sealFill)" />
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="oklch(0.98 0.02 90 / 0.65)"
          strokeWidth="0.9"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="oklch(0.45 0.05 66 / 0.35)"
          strokeWidth="0.7"
        />
        <g stroke="oklch(0.45 0.05 66 / 0.4)" strokeWidth="0.7" fill="none">
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const r1 = 88;
            const r2 = 94;
            const r = (n: number) => Math.round(n * 1000) / 1000;
            return (
              <line
                key={i}
                x1={r(100 + Math.cos(a) * r1)}
                y1={r(100 + Math.sin(a) * r1)}
                x2={r(100 + Math.cos(a) * r2)}
                y2={r(100 + Math.sin(a) * r2)}
              />
            );
          })}
        </g>
        <g fill="none" stroke="oklch(0.4 0.05 64 / 0.5)" strokeWidth="0.8">
          <path d="M100 34c14 12 14 22 0 32-14-10-14-20 0-32z" />
          <path d="M100 166c-14-12-14-22 0-32 14 10 14 20 0 32z" />
          <path d="M34 100c12-14 22-14 32 0-10 14-20 14-32 0z" />
          <path d="M166 100c-12 14-22 14-32 0 10-14 20-14 32 0z" />
        </g>
      </svg>
      <span className="pointer-events-none absolute font-display text-[clamp(1.5rem,4.5vw,2.4rem)] tracking-[0.12em] text-[oklch(0.36_0.05_62)]">
        {initials}
      </span>
    </div>
  );
}

/** Thin ornamental arch frame drawn around content blocks. */
export function ArchFrame({ className = "" }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 620"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full text-gold ${className}`}
      fill="none"
    >
      <path
        d="M14 616V208C14 100 96 14 200 14s186 86 186 194v408"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M26 616V210C26 108 104 26 200 26s174 82 174 184v406"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />
    </svg>
  );
}

/** Corner flourish for card-free ornamental framing. */
export function Corner({ className = "" }: SvgProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      aria-hidden="true"
      className={`h-10 w-10 text-gold ${className}`}
      fill="none"
    >
      <path d="M2 58V22C2 10 10 2 22 2h36" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path d="M10 58V26c0-9 7-16 16-16h32" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" opacity="0.75" />
    </svg>
  );
}
