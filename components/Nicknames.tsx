"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { content } from "@/content";

const { nicknames } = content;

/**
 * The two of them, drawn. The cap falls into place as the section comes into
 * view — the animation *is* the sentence, so it's the one place on the page
 * where motion carries meaning rather than decorating it.
 */
export function Nicknames() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
            {nicknames.label}
          </p>
        </Reveal>

        <motion.svg
          viewBox="0 0 200 270"
          className="mx-auto mt-12 h-[240px] w-auto sm:h-[280px]"
          role="img"
          aria-label="A bottle and its cap, together"
          initial="rest"
          whileInView="joined"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          {/* The dhakkan, arriving */}
          <motion.g
            variants={{
              rest: reduceMotion
                ? { y: 0, opacity: 0 }
                : { y: -58, opacity: 0, rotate: -9 },
              joined: { y: 0, opacity: 1, rotate: 0 },
            }}
            transition={
              reduceMotion
                ? { duration: 0.5 }
                : { type: "spring", stiffness: 150, damping: 12, delay: 0.45 }
            }
            style={{ transformOrigin: "100px 40px" }}
          >
            <rect
              x="77"
              y="24"
              width="46"
              height="28"
              rx="7"
              fill="#c9748a"
              stroke="#a8556c"
              strokeWidth="2"
            />
            {[85, 93, 101, 109, 117].map((x) => (
              <line
                key={x}
                x1={x}
                y1="30"
                x2={x}
                y2="46"
                stroke="#a8556c"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.55"
              />
            ))}
          </motion.g>

          {/* The bottle, waiting */}
          <motion.g
            variants={{
              rest: { opacity: 0, y: 10 },
              joined: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <path
              d="M70 122 C70 97 82 90 82 72 L82 54 L118 54 L118 72 C118 90 130 97 130 122 L130 226 C130 239 122 246 110 246 L90 246 C78 246 70 239 70 226 Z"
              fill="#faf3ef"
              stroke="#6d7f68"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* A little something still in it */}
            <path
              d="M72 176 L128 176 L128 226 C128 237 121 243 110 243 L90 243 C79 243 72 237 72 226 Z"
              fill="#f0c4cc"
              opacity="0.75"
            />
            <line
              x1="82"
              y1="60"
              x2="118"
              y2="60"
              stroke="#6d7f68"
              strokeWidth="2"
              opacity="0.6"
            />
          </motion.g>
        </motion.svg>

        <Reveal delay={0.15}>
          <p className="font-display mt-12 text-[clamp(1.7rem,4.8vw,2.7rem)] font-light leading-[1.25] text-[#3b2b33]">
            {nicknames.heading}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-8 block h-px w-16 bg-[#c2a15b]/70"
          />
          <p className="font-[family-name:var(--font-hand)] mx-auto mt-8 max-w-lg text-[clamp(1.5rem,3.8vw,2.1rem)] leading-[1.35] text-[#a8556c]">
            {nicknames.line}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
