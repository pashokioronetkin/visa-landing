import Image from "next/image";
import { copy } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/cta.jpg")}
          alt="Вечерняя улица Парижа с тёплым светом окон"
          fill
          sizes="100vw"
          className="img-treat-dark object-cover"
        />
        <div className="absolute inset-0 bg-ink/62" />
      </div>

      <div className="container-page relative py-16 md:py-32">
        <Reveal>
          <p className="eyebrow text-bronze-light">Следующий шаг</p>
          <h2 className="display-title mt-4 max-w-[14ch] text-[clamp(1.9rem,6vw,4.2rem)] text-paper">
            {copy.finalTitle}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-paper/70">{copy.finalLead}</p>
          <a href="#apply" className="btn btn-light mt-8 w-full sm:w-auto">
            Получить консультацию
          </a>
        </Reveal>
      </div>
    </section>
  );
}
