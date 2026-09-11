import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { STRINGS } from "@/lib/i18n";
import type { Lang } from "@/lib/invitation-types";
import localMusic from "@/leberch-romantic-584475.mp3";

/** Ambient music with autoplay attempt, background pause, and local fallback. */
export function MusicControl({ src, lang }: { src?: string | undefined; lang: Lang }) {
  const t = STRINGS[lang];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const userWantsPlaying = useRef(true); // Default to true for autoplay

  const actualSrc = src && src.trim() !== "" ? src : localMusic;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = 0.45;

    const playIfAllowed = async () => {
      if (userWantsPlaying.current && !document.hidden) {
        try {
          await el.play();
          setPlaying(true);
        } catch (e) {
          setPlaying(false);
        }
      }
    };

    // Attempt autoplay on mount
    playIfAllowed();

    // If autoplay was blocked, try to unlock on first interaction
    const handleFirstInteraction = () => {
      if (userWantsPlaying.current && el.paused) {
        playIfAllowed();
      }
    };
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        el.pause();
        setPlaying(false);
      } else {
        if (userWantsPlaying.current) {
          playIfAllowed();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      el.pause();
    };
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (playing) {
      userWantsPlaying.current = false;
      el.pause();
      setPlaying(false);
    } else {
      userWantsPlaying.current = true;
      try {
        el.volume = 0.45;
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={actualSrc} loop preload="auto" />
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
