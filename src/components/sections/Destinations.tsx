import Image from "next/image";
import { copy, destinations } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const spanClass: Record<string, string> = {
  large: "min-h-[210px] sm:min-h-[280px] md:col-span-8 md:row-span-2 md:min-h-[520px]",
  tall: "min-h-[200px] sm:min-h-[240px] md:col-span-4 md:row-span-2 md:min-h-[520px]",
  wide: "min-h-[190px] md:col-span-8 md:min-h-[280px]",
  normal: "min-h-[190px] md:col-span-4 md:min-h-[260px]",
};

export function Destinations() {
  return (
    <section id="destinations" className="section-pad bg-ivory">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">02 / Направления</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="display-title max-w-[12ch] text-[clamp(1.8rem,5vw,3.5rem)]">
              {copy.destinationsTitle}
            </h2>
            <p className="lede max-w-sm">{copy.destinationsLead}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-3 md:grid-cols-12">
          {destinations.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.04}
              className={cn("dest-card relative overflow-hidden", spanClass[item.span])}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="img-treat object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="dest-meta absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.68rem] tracking-[0.18em] text-paper/70 uppercase">
                  {item.name}
                </p>
                <p className="mt-1 font-display text-2xl text-paper">{item.nameRu}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
