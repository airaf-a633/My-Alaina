"use client";

import { Clip } from "@/components/Clip";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";
import { CLIPS } from "@/media";

const { clips } = content;

export function Clips() {
  return (
    <section className="px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Stagger className="text-center">
          <StaggerItem>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
              {clips.label}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.9rem,5vw,2.9rem)] font-light leading-tight text-[#3b2b33]">
              {clips.heading}
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#6e5a61]">
              {clips.intro}
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.12}
        >
          {CLIPS.map((clip, index) => (
            <StaggerItem key={clip.src}>
              <Clip src={clip.src} label={`${clips.clipAlt} ${index + 1}`} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
