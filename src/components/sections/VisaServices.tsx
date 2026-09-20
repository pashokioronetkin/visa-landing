import Image from "next/image";
import { copy, visaServices } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath } from "@/lib/utils";

export function VisaServices() {
  const featured = visaServices.find((item) => item.featured);
  const rest = visaServices.filter((item) => !item.featured);

  return (
    <section id="visas" className="section-pad">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">01 / Визы</p>
              <h2 className="display-title mt-4 max-w-[16ch] text-[clamp(1.8rem,5vw,3.5rem)]">
                {copy.servicesTitle}
              </h2>
            </div>
            <p className="lede max-w-sm md:pb-1">{copy.servicesLead}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {featured ? (
            <Reveal className="group relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:col-span-7 lg:min-h-[560px]">
              <Image
                src={assetPath(featured.image)}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-treat object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <p className="text-[0.7rem] tracking-[0.2em] text-bronze-light uppercase">
                  {featured.eyebrow} · {featured.title}
                </p>
                <h3 className="mt-3 font-display text-3xl text-paper md:text-5xl">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-paper/75">
                  {featured.summary}
                </p>
              </div>
            </Reveal>
          ) : null}

          <div className="grid gap-4 lg:col-span-5">
            {rest.slice(0, 2).map((item, index) => (
              <Reveal key={item.id} delay={0.08 * (index + 1)} className="group relative min-h-[200px] overflow-hidden sm:min-h-[220px]">
                <Image
                  src={assetPath(item.image)}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="img-treat object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.68rem] tracking-[0.18em] text-bronze-light uppercase">
                    {item.title}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-paper">{item.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-paper/72">{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {rest[2] ? (
            <Reveal className="border border-line bg-ivory p-7 md:p-10 lg:col-span-12">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="eyebrow">{rest[2].title}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
                    {rest[2].name}
                  </h3>
                  <p className="lede mt-3 max-w-xl">{rest[2].body}</p>
                </div>
                <a href="#apply" className="btn btn-ghost w-full shrink-0 sm:w-auto">
                  Спросить по направлению
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
