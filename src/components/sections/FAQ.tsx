import { copy, faq } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">05 / FAQ</p>
          <h2 className="display-title mt-4 text-[clamp(1.8rem,5vw,3.4rem)]">
            {copy.faqTitle}
          </h2>
          <p className="lede mt-5 max-w-sm">{copy.faqLead}</p>
        </Reveal>

        <div className="lg:col-span-7">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="faq-item group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 sm:gap-6">
                  <span className="font-display text-lg leading-snug tracking-tight md:text-2xl">
                    {item.question}
                  </span>
                  <span
                    className="faq-icon mt-1 grid h-7 w-7 shrink-0 place-items-center border border-line text-lg leading-none transition-transform duration-300"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-xl text-sm leading-7 text-stone">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
