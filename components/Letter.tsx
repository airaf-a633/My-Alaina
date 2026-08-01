import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { letter } = content;

export function Letter() {
  return (
    <section id="letter" className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl">
        <div className="deckle relative rounded-sm bg-[#fdf8f5] px-7 py-12 sm:px-14 sm:py-16">
          {/* Tape at the top corners, as if the letter were fixed to the page */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-8 h-6 w-20 -rotate-6 bg-[#c2a15b]/25"
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 right-8 h-6 w-20 rotate-6 bg-[#c2a15b]/25"
          />

          <Stagger gap={0.12}>
            <StaggerItem>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
                {letter.label}
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="font-display mt-4 text-[clamp(1.9rem,5vw,2.9rem)] font-light leading-tight text-[#3b2b33]">
                {letter.heading}
              </h2>
            </StaggerItem>

            <div className="mt-8 space-y-5">
              {letter.paragraphs.map((paragraph) => (
                <StaggerItem key={paragraph} as="p">
                  <span className="block text-[15.5px] leading-[1.75] text-[#4d3b43] sm:text-[17px]">
                    {paragraph}
                  </span>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </Reveal>
    </section>
  );
}
