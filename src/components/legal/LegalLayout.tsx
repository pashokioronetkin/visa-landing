import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function LegalLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container-page section-pad max-w-3xl pt-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-title mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.12]">{title}</h1>
        <div className="legal-prose mt-10 space-y-5 text-sm leading-7 text-mist [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
