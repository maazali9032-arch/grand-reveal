import { LANGS } from "@/lib/i18n";
import type { Lang } from "@/lib/invitation-types";

/** Discreet language switcher — pure state, no reload and no scroll reset. */
export function LanguageSwitcher({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-[oklch(0.78_0.06_80/0.55)] bg-[oklch(0.97_0.012_86/0.72)] px-1 backdrop-blur-md">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="h-3 w-px bg-[oklch(0.78_0.06_80/0.6)]" aria-hidden="true" />}
          <button
            type="button"
            onClick={() => onChange(l.code)}
            aria-pressed={lang === l.code}
            className={`px-2.5 py-1.5 font-serif text-[0.66rem] tracking-wide-luxe transition-colors sm:text-[0.7rem] ${
              lang === l.code ? "text-gold-deep" : "text-ink-soft hover:text-ink"
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
