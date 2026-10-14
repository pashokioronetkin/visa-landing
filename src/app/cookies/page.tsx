import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { contacts, legal } from "@/content/site";

export const metadata: Metadata = {
  title: "Политика cookie",
  description: "Какие файлы cookie использует сайт и как ими управлять.",
};

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Cookie" title="Политика использования cookie">
      <p>Редакция от {legal.documentsUpdated}.</p>
      <p>
        Cookie — небольшие файлы, которые сайт сохраняет в браузере. По 152-ФЗ и разъяснениям
        Роскомнадзора cookie, по которым можно определить пользователя, относятся к персональным
        данным. Сейчас у нас только технический cookie, без которого баннер не запомнит ваш выбор.
      </p>

      <h2>Какие cookie стоят сейчас</h2>
      <p>
        <strong>Необходимые.</strong> `meridian_cookie_consent` — запоминает, что вы ознакомились с
        этим уведомлением. Срок: 180 дней. Без него баннер показывается снова. Ставится только после
        нажатия «Понятно».
      </p>
      <p>
        <strong>Рекламные, аналитические, маркетинговые cookie.</strong> Не используются. Сторонние
        счётчики, пиксели и виджеты не подключаем.
      </p>

      <h2>Как управлять</h2>
      <p>
        В баннере нажмите «Понятно». Удалить cookie можно в настройках браузера — тогда уведомление
        появится снова. Общие правила обработки данных — в{" "}
        <Link href="/privacy">политике обработки персональных данных</Link>. Вопросы:{" "}
        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>.
      </p>
    </LegalLayout>
  );
}
