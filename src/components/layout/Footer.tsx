import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { contacts, navigation, siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-7 text-paper/58">
            Визовый сервис для спокойной подготовки документов. Помогаем
            разобраться в требованиях и довести заявку до подачи.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-bronze-light">Навигация</p>
          <ul className="mt-5 space-y-3 text-sm text-paper/72">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-bronze-light">Контакты</p>
          <ul className="mt-5 space-y-3 text-sm text-paper/72">
            <li>
              <a href={contacts.phoneHref} className="hover:text-paper">
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className="hover:text-paper">
                {contacts.email}
              </a>
            </li>
            <li>
              <a href={contacts.telegram} className="hover:text-paper">
                Telegram · {contacts.telegramLabel}
              </a>
            </li>
            <li>
              <a href={contacts.whatsapp} className="hover:text-paper">
                {contacts.whatsappLabel}
              </a>
            </li>
            <li className="text-paper/45">{contacts.address}</li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-white/8 py-6 text-[0.75rem] text-paper/40 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.legalName}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>
            {contacts.inn} · {contacts.ogrn}
          </span>
          <Link href="/privacy" className="hover:text-paper/70">
            Политика ПДн
          </Link>
          <Link href="/consent" className="hover:text-paper/70">
            Согласие
          </Link>
          <Link href="/cookies" className="hover:text-paper/70">
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
}
