import { useCallback, useEffect, useRef } from "react";

export function useSound(src: string, volume = 0.25) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {
      // Ignore autoplay errors.
    });
  }, []);

  return play;
}
