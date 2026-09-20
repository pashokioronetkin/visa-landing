import { copy, trustFacts } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function TrustBar() {
  return (
    <section className="border-y border-line bg-ivory">
      <div className="container-page py-10 md:py-16">
        <Reveal>
          <p className="max-w-2xl font-display text-[1.35rem] leading-snug tracking-tight md:text-[1.85rem]">
            {copy.trustLine}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustFacts.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <p className="text-[0.72rem] tracking-[0.16em] text-bronze uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-2xl tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-mist">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
