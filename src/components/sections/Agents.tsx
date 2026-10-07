import { copy, agentBenefits } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Agents() {
  return (
    <section id="agents" className="section-pad bg-ivory">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">03 / Для агентов</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="display-title max-w-xl text-[clamp(1.8rem,5vw,3.5rem)]">
              {copy.agentsTitle}
            </h2>
            <p className="lede max-w-sm md:pb-1">{copy.agentsLead}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {agentBenefits.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <p className="text-[0.72rem] tracking-[0.16em] text-bronze uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-2xl tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-mist">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <a href="#apply" className="btn btn-primary mt-10 w-full sm:w-auto">
            {copy.agentsCta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
