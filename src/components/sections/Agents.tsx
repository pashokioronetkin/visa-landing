import { contacts, copy, agentBenefits } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Agents() {
  return (
    <section id="agents" className="section-pad bg-ivory">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">03 / Для агентов</p>
          <h2 className="display-title mt-4 max-w-[20ch] text-[clamp(1.8rem,5vw,3.5rem)]">
            {copy.agentsTitle}
          </h2>
          <p className="lede mt-5 max-w-md">{copy.agentsLead}</p>
        </Reveal>

        <div className="mt-10 grid max-w-3xl gap-8 sm:grid-cols-2 sm:gap-12">
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

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-full sm:w-auto"
            >
              {copy.agentsTelegramCta}
            </a>
            <a href={`mailto:${contacts.email}`} className="btn btn-ghost w-full sm:w-auto">
              {copy.agentsEmailCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
