"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A short video that plays only while it's on screen. Muted autoplay with
 * playsInline is the one combination phones allow without a tap, and pausing
 * off-screen clips keeps her battery and data from being eaten alive.
 * The speaker button turns the sound on, since that's what these were recorded with.
 */
export function Clip({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ratio, setRatio] = useState(3 / 4);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    // With reduced motion on, leave it paused and let her press play.
    if (!video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Autoplay refused (low power mode, say) — controls still work. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <figure
      className="deckle relative overflow-hidden rounded-sm bg-[#3b2b33]"
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        controls={reduceMotion === true}
        aria-label={label}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          // Adopt the clip's real shape so nothing gets cropped.
          if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
        }}
        className="h-full w-full object-cover"
      />

      <button
        type="button"
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          const next = !muted;
          setMuted(next);
          video.muted = next;
          if (!next) void video.play().catch(() => {});
        }}
        aria-label={muted ? `Turn sound on for ${label}` : `Mute ${label}`}
        className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-[#faf3ef]/85 text-[#3b2b33] backdrop-blur-sm transition hover:bg-[#faf3ef]"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path
            d="M4 9v6h4l5 4V5L8 9H4z"
            fill="currentColor"
          />
          {muted ? (
            <path
              d="M17 9l4 6M21 9l-4 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
    </figure>
  );
}
