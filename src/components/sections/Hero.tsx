import Image from "next/image";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="container-page flex flex-col justify-center py-12 pt-24 md:py-20 md:pt-28 lg:min-h-[100svh] lg:max-w-none lg:pr-12 lg:pl-[max(1.25rem,calc((100vw-1180px)/2+1.25rem))]">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="display-title mt-4 max-w-[18ch] text-[clamp(1.75rem,6vw,3.1rem)]">
            {hero.titleLead} {hero.titleEmphasis}
          </h1>
          <p className="lede mt-5 max-w-md">{hero.subtitle}</p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href="#apply" className="btn btn-primary w-full sm:w-auto">
              {hero.primaryCta}
            </a>
            <a href="#visas" className="btn btn-ghost w-full sm:w-auto">
              {hero.secondaryCta}
            </a>
          </div>
          <p className="mt-7 text-[0.72rem] leading-5 font-medium tracking-[0.06em] text-mist uppercase md:text-[0.78rem]">
            Шенген · Великобритания · США · другие направления
          </p>
        </div>

        <div className="relative mx-3 mb-6 h-[38vh] min-h-[240px] overflow-hidden border border-line sm:mx-5 sm:h-[44vh] md:mx-8 lg:mx-0 lg:mb-0 lg:h-auto lg:min-h-[100svh] lg:border-y-0 lg:border-r-0">
          <Image
            src="/images/hero.jpg"
            alt="Колоннада собора Святого Петра в Риме"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="img-treat object-cover"
          />
          <div className="absolute inset-0 bg-ink/10" />

          <aside className="dossier absolute right-3 bottom-3 left-3 p-4 sm:right-5 sm:bottom-5 sm:left-5 md:right-auto md:bottom-10 md:left-8 md:w-[260px] md:p-5">
            <div className="flex items-center justify-between text-[0.68rem] tracking-[0.14em] text-ink uppercase">
              <span>{hero.dossier.label}</span>
              <span>{hero.dossier.code}</span>
            </div>
            <div className="mt-3 font-display text-[1.7rem] leading-tight md:text-[2rem]">
              {hero.dossier.country}
            </div>
            <p className="mt-2 text-sm text-mist">{hero.dossier.type}</p>
            <div className="hairline my-3 bg-line-strong" />
            <p className="text-[0.72rem] tracking-[0.12em] text-bronze uppercase">
              {hero.dossier.status}
            </p>
            <p className="mt-2 text-sm text-ink">{hero.dossier.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
