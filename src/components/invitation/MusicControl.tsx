import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { STRINGS } from "@/lib/i18n";
import type { Lang } from "@/lib/invitation-types";

/** Optional ambient music. Never autoplays — playback starts only on a tap. */
export function MusicControl({ src, lang }: { src?: string | undefined; lang: Lang }) {
  const t = STRINGS[lang];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  if (!src || !src.trim()) return null;

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      el.volume = 0.45;
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.pauseMusic : t.playMusic}
        className="grid h-9 w-9 place-items-center rounded-full border border-[oklch(0.78_0.06_80/0.6)] bg-[oklch(0.97_0.012_86/0.72)] text-gold-deep backdrop-blur-md transition-colors hover:bg-[oklch(0.9_0.04_84/0.85)]"
      >
        {playing ? (
          <Pause strokeWidth={1.2} className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Play strokeWidth={1.2} className="h-3.5 w-3.5 translate-x-[1px]" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
