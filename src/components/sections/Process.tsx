import { copy, processSteps } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="section-pad">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">04 / Как работаем</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="display-title text-[clamp(1.8rem,5vw,3.5rem)]">
              {copy.processTitle}
            </h2>
            <p className="lede max-w-sm">{copy.processLead}</p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute top-[2.15rem] right-0 left-0 hidden h-px bg-line lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.08} className="relative">
                <div className="mb-6 flex items-center gap-4 md:mb-8">
                  <span className="grid h-[4.3rem] w-[4.3rem] place-items-center border border-line bg-paper font-display text-2xl">
                    {step.id}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span className="h-px flex-1 bg-line md:hidden" />
                  ) : null}
                </div>
                <h3 className="font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
