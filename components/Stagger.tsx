"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Container for a cascade. Children wrapped in <StaggerItem> arrive one after
 * another instead of the whole block appearing at once — the eyebrow, then the
 * heading, then the line under it, the way someone would actually read it.
 */
export function Stagger({
  children,
  className,
  gap = 0.1,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: {},
        shown: {
          transition: {
            staggerChildren: reduceMotion ? 0 : gap,
            delayChildren: reduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "p";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y },
        shown: { opacity: 1, y: 0 },
      }}
      transition={{ duration: reduceMotion ? 0.4 : 0.8, ease: EASE }}
    >
      {children}
    </Component>
  );
}
