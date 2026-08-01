"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Photo } from "@/components/Photo";
import { useBouquet } from "@/components/BouquetContext";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content, type Memory } from "@/content";

const { memories } = content;

/** Corner mounts, the little paper triangles that hold a photo into an album. */
function CornerMounts() {
  return (
    <>
      {[
        "left-0 top-0",
        "right-0 top-0 rotate-90",
        "right-0 bottom-0 rotate-180",
        "left-0 bottom-0 -rotate-90",
      ].map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute ${position} h-6 w-6`}
          style={{
            background: "#3b2b33",
            opacity: 0.22,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      ))}
    </>
  );
}

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const { collect } = useBouquet();
  const reduceMotion = useReducedMotion();

  // Reading this memory is what adds its flower to the corner bouquet.
  useEffect(() => {
    if (inView) collect(index + 1);
  }, [inView, collect, index]);

  const flipped = index % 2 === 1;
  const tilt = flipped ? 1.6 : -1.6;

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      className={`flex flex-col items-center gap-10 md:gap-16 ${
        flipped ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* The specimen: photo mounted on card stock */}
      <div className="w-full shrink-0 md:w-[46%]">
        <div
          className="deckle relative bg-[#fdf8f5] p-3 pb-5 sm:p-4 sm:pb-7"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {/* Natural proportions, not a forced crop — these are phone photos in
              a mix of shapes and cropping them to match would cut faces. */}
          <div className="relative w-full overflow-hidden">
            <Photo
              src={memory.image}
              alt={memory.title}
              index={index}
              mode="natural"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
            <CornerMounts />
          </div>
          <p className="font-[family-name:var(--font-hand)] mt-3 text-center text-xl leading-tight text-[#6e5a61]">
            {memory.caption}
          </p>
        </div>
      </div>

      {/* The label, read the way a specimen card actually reads: number and
          date first, then the name, then the story. */}
      <Stagger className="w-full md:w-[54%]" gap={0.11} delay={0.15}>
        <StaggerItem>
          <div className="inline-flex items-center gap-3 border-b border-[#e6d3cc] pb-2 text-[11px] uppercase tracking-[0.24em] text-[#8c9e86]">
            <span className="text-[#c2a15b]">
              Specimen {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-5 bg-[#e6d3cc]" />
            <span>{memory.date}</span>
          </div>
        </StaggerItem>

        <StaggerItem>
          <h3 className="font-display mt-5 text-[clamp(1.6rem,4.2vw,2.4rem)] font-light leading-tight text-[#3b2b33]">
            {memory.title}
          </h3>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-2 text-sm italic text-[#8c9e86]">{memory.place}</p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-5 max-w-md text-[15.5px] leading-[1.75] text-[#4d3b43] sm:text-[17px]">
            {memory.note}
          </p>
        </StaggerItem>
      </Stagger>
    </motion.article>
  );
}

export function Memories() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-24 sm:gap-36">
        {memories.map((memory, index) => (
          <MemoryCard key={memory.title} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
}
