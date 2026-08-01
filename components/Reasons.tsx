"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Head, kindFor } from "@/components/Flower";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { reasons } = content;

export function Reasons() {
  const [opened, setOpened] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();

  const toggle = (index: number) =>
    setOpened((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Stagger className="text-center">
          <StaggerItem>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
              {reasons.label}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.9rem,5vw,2.9rem)] font-light leading-tight text-[#3b2b33]">
              {reasons.heading}
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#6e5a61]">
              {reasons.intro}
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger as="ul" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {reasons.items.map((reason, index) => {
            const isOpen = opened.includes(index);

            return (
              <StaggerItem key={reason} as="li" className="h-full">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className={`flex h-full w-full items-start gap-4 rounded-sm border px-5 py-5 text-left transition-colors duration-300 ${
                      isOpen
                        ? "border-[#c9748a]/45 bg-[#fdf8f5]"
                        : "border-[#e6d3cc] bg-[#fdf8f5]/55 hover:border-[#c9748a]/35 hover:bg-[#fdf8f5]"
                    }`}
                  >
                    <motion.span
                      className="shrink-0"
                      animate={
                        reduceMotion
                          ? {}
                          : { scale: isOpen ? 1 : 0.72, rotate: isOpen ? 0 : -12 }
                      }
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Head
                        kind={kindFor(index)}
                        tone={isOpen ? "deep" : "light"}
                        size={62}
                        className={isOpen ? "" : "opacity-60"}
                      />
                    </motion.span>

                    <span className="min-w-0 flex-1 pt-3">
                      <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                          <motion.span
                            key="reason"
                            className="block font-[family-name:var(--font-hand)] text-[1.35rem] leading-snug text-[#3b2b33]"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.32 }}
                          >
                            {reason}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="prompt"
                            className="block text-[11px] uppercase tracking-[0.24em] text-[#8c9e86]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            Open this one
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
