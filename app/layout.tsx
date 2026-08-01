import type { Metadata } from "next";
import { Caveat, Fraunces, Karla } from "next/font/google";
import { content } from "@/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Display: Fraunces, with the soft + wonk axes loaded so it reads warm
// rather than editorial. See the .font-display rule in globals.css.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Scroll reveals start at opacity 0 and are animated in by JS. If JS
            never runs, show everything rather than a blank page. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "main [style*='opacity']{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
