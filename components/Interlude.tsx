import { Reveal } from "@/components/Reveal";
import { content } from "@/content";

const { interlude } = content;

/**
 * The one tonal shift on the page. Everything else is blush paper; this single
 * line gets the lights turned down, so it lands as the emotional peak rather
 * than as another card in a grid.
 */
export function Interlude() {
  return (
    <section className="relative overflow-hidden bg-[#3b2b33] px-6 py-32 sm:py-44">
      {/* Warm bloom behind the line so the plum doesn't read as flat black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,116,138,0.55), transparent 68%)",
        }}
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <p
          lang={interlude.lang}
          className="font-display text-[clamp(2.2rem,7.5vw,4.4rem)] font-light leading-[1.08] text-[#f0c4cc]"
        >
          {interlude.line}
        </p>

        <span
          aria-hidden="true"
          className="mx-auto mt-10 block h-px w-24 bg-[#c2a15b]/70"
        />

        <p className="mx-auto mt-10 max-w-md text-[15.5px] leading-[1.8] text-[#e6d3cc]/85 sm:text-[17px]">
          {interlude.meaning}
        </p>
      </Reveal>
    </section>
  );
}
