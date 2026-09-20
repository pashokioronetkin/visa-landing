import Image from "next/image";
import { copy, whyUs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath } from "@/lib/utils";

export function WhyUs() {
  return (
    <section id="why" className="section-pad bg-ink-soft text-paper">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-bronze-light">03 / Преимущества</p>
          <h2 className="display-title mt-4 max-w-[14ch] text-[clamp(1.8rem,5vw,3.4rem)]">
            {copy.whyTitle}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-paper/68">{copy.whyLead}</p>
          <div className="relative mt-8 hidden overflow-hidden lg:block lg:h-[320px]">
            <Image
              src={assetPath("/images/why.jpg")}
              alt="Тихий двор европейского отеля с аркадой"
              fill
              sizes="40vw"
              className="img-treat-dark object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <li className="grid gap-2 py-5 sm:grid-cols-[2.6rem_1fr] sm:gap-5 md:py-6">
                  <span className="font-display text-lg text-bronze-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight md:text-2xl">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-paper/62">{item.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
