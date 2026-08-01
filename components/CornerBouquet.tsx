"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { kindFor, Stem } from "@/components/Flower";
import { useBouquet } from "@/components/BouquetContext";
import { content } from "@/content";

const TOTAL = content.memories.length;

/**
 * The signature: a bouquet pinned to the corner that gains one stem for every
 * memory she reads. It steps aside at the closing section, where the finished
 * bouquet is handed over at full size.
 */
export function CornerBouquet() {
  const { collected, finale } = useBouquet();
  const reduceMotion = useReducedMotion();

  // Fan the stems out over an arc so the bouquet opens as it fills.
  const spread = 54;
  const step = TOTAL > 1 ? spread / (TOTAL - 1) : 0;

  return (
    <AnimatePresence>
      {!finale && collected > 0 && (
        <motion.div
          key="corner-bouquet"
          className="pointer-events-none fixed bottom-0 left-2 z-30 hidden select-none md:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          aria-hidden="true"
        >
          <svg width="190" height="230" viewBox="-95 -40 190 230">
            <g>
              {Array.from({ length: collected }, (_, i) => {
                const angle = -spread / 2 + step * i;
                return (
                  // Static outer rotation fans the stem; the inner group only
                  // animates scale/opacity so the two transforms never fight.
                  <g key={i} transform={`rotate(${angle} 0 170)`}>
                    <motion.g
                      initial={
                        reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.35 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.3 }
                          : { type: "spring", stiffness: 120, damping: 14, mass: 0.8 }
                      }
                      style={{ transformOrigin: "0px 170px" }}
                    >
                      <Stem
                        kind={kindFor(i)}
                        tone={i % 3 === 1 ? "deep" : "light"}
                        curve={i % 2 === 0 ? 12 : -12}
                        length={168}
                      />
                    </motion.g>
                  </g>
                );
              })}
            </g>

            {/* Kraft wrap holding the stems together */}
            <path
              d="M-26 150 L26 150 L17 196 L-17 196 Z"
              fill="#e6d3cc"
              stroke="#c2a15b"
              strokeWidth="1.5"
            />
            <path d="M-26 150 L0 168 L26 150" fill="none" stroke="#c2a15b" strokeWidth="1.5" />
            <path
              d="M-19 168 C -6 174, 6 174, 19 168"
              fill="none"
              stroke="#c9748a"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mt-1 pl-4 font-[family-name:var(--font-hand)] text-lg text-[#a8556c]">
            {collected} of {TOTAL} picked
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
