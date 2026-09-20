import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { contacts, legal } from "@/content/site";

export const metadata: Metadata = {
  title: "Политика cookie",
  description: "Какие файлы cookie использует сайт и как отказаться от необязательных.",
};

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Cookie" title="Политика использования cookie">
      <p>Редакция от {legal.documentsUpdated}.</p>
      <p>
        Cookie — небольшие файлы, которые сайт сохраняет в браузере. По 152-ФЗ и разъяснениям
        Роскомнадзора cookie, по которым можно определить пользователя, относятся к персональным
        данным. Поэтому спрашиваем согласие, если используем такие файлы.
      </p>

      <h2>Какие cookie стоят сейчас</h2>
      <p>
        <strong>Необходимые.</strong> `meridian_cookie_consent` — запоминает, приняли вы cookie или
        отклонили необязательные. Срок: 180 дней. Без этого файла баннер будет показываться снова.
      </p>
      <p>
        <strong>Рекламные, аналитические, маркетинговые cookie.</strong> Не используются. Сторонние
        счётчики, пиксели и виджеты не подключаем.
      </p>

      <h2>Как управлять</h2>
      <p>
        В баннере можно нажать «Принять» или «Отклонить необязательные». Так как необязательных
        cookie нет, оба выбора сохраняют только необходимый файл с вашим решением. Удалить cookie
        можно в настройках браузера.
      </p>
      <p>
        Общие правила обработки данных — в{" "}
        <Link href="/privacy">политике обработки персональных данных</Link>. Вопросы:{" "}
        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>.
      </p>
    </LegalLayout>
  );
}
