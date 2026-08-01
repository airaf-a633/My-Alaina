"use client";

import { useState } from "react";
import Image from "next/image";
import { Head, kindFor } from "@/components/Flower";
import { photoBySrc } from "@/media";

/**
 * Photos go through next/image so they're served as WebP/AVIF at the size the
 * device actually needs — the difference between a 1 MB and a 90 KB download on
 * her phone. If a file isn't there yet, it falls back to a labelled placeholder
 * naming the exact path it's waiting for.
 *
 * mode="crop"    fills a parent that sets the aspect ratio (memory specimens)
 * mode="natural" keeps the photo's own proportions (the masonry gallery)
 */
export function Photo({
  src,
  alt,
  index = 0,
  mode = "crop",
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  index?: number;
  mode?: "crop" | "natural";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [missing, setMissing] = useState(false);
  const asset = photoBySrc(src);

  if (missing) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-[#f3e7e1] px-4 py-12 text-center ${className}`}
        role="img"
        aria-label={`Placeholder for ${alt}`}
      >
        <Head kind={kindFor(index)} size={54} className="opacity-45" />
        <p className="font-[family-name:var(--font-hand)] text-lg leading-tight text-[#6e5a61]">
          your photo goes here
        </p>
        <code className="rounded bg-[#e6d3cc] px-2 py-0.5 text-[11px] tracking-tight text-[#6e5a61]">
          {src}
        </code>
      </div>
    );
  }

  if (mode === "natural") {
    return (
      <Image
        src={src}
        alt={alt}
        width={asset?.w ?? 1080}
        height={asset?.h ?? 1440}
        sizes={sizes}
        priority={priority}
        onError={() => setMissing(true)}
        className={`h-auto w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setMissing(true)}
      className={`object-cover ${className}`}
    />
  );
}
