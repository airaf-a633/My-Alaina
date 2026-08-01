import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { wallet } = content;

/**
 * Deliberately the smallest image on the page. It's a wallet photo — showing it
 * at hero size would break the spell. The creases and worn edges are the point.
 */
export function Wallet() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
            {wallet.label}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          <Reveal className="shrink-0" y={20}>
            <div className="relative w-[260px] -rotate-2 sm:w-[300px]">
              <div className="deckle relative bg-[#fdf8f5] p-2.5 pb-8">
                {/* Shown at its own proportions: this is a photo *of* the
                    wallet, and the worn leather does the work no CSS crease
                    could fake. */}
                <div className="relative w-full overflow-hidden">
                  <Photo
                    src={wallet.image}
                    alt={wallet.alt}
                    index={2}
                    mode="natural"
                    sizes="(max-width: 768px) 80vw, 300px"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 62%, rgba(59,43,51,0.18) 100%)",
                    }}
                  />
                </div>
                <p className="font-[family-name:var(--font-hand)] absolute bottom-1.5 left-0 right-0 text-center text-lg leading-tight text-[#6e5a61]">
                  {wallet.caption}
                </p>
              </div>
            </div>
          </Reveal>

          <Stagger className="flex-1" gap={0.14} delay={0.1}>
            <StaggerItem>
              <h2 className="font-display text-[clamp(1.7rem,4.6vw,2.6rem)] font-light leading-[1.2] text-[#3b2b33]">
                {wallet.heading}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <span
                aria-hidden="true"
                className="mt-7 block h-px w-16 bg-[#c2a15b]/70"
              />
            </StaggerItem>
            <StaggerItem>
              <p className="font-[family-name:var(--font-hand)] mt-7 text-[clamp(1.5rem,3.6vw,2rem)] leading-[1.35] text-[#a8556c]">
                {wallet.line}
              </p>
            </StaggerItem>
            {wallet.after && (
              <StaggerItem>
                <p className="mt-6 max-w-md text-[15.5px] leading-[1.75] text-[#4d3b43] sm:text-[17px]">
                  {wallet.after}
                </p>
              </StaggerItem>
            )}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
