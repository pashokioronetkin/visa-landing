"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { COOKIE_CONSENT_NAME, COOKIE_MAX_AGE, parseCookieConsent } from "@/lib/legal";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readConsent() {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_CONSENT_NAME}=`));

  return parseCookieConsent(match?.split("=")[1]);
}

function writeConsent(value: "all" | "necessary") {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  emit();
}

function getClientSnapshot() {
  return readConsent() === null;
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    document.body.style.paddingBottom = visible
      ? "calc(7.25rem + env(safe-area-inset-bottom, 0px))"
      : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-ink-soft pb-[env(safe-area-inset-bottom)] text-paper"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
    >
      <div className="container-page flex flex-col gap-3 py-3 md:flex-row md:items-end md:justify-between md:gap-4 md:py-5">
        <div className="max-w-2xl">
          <p id="cookie-title" className="text-sm font-semibold">
            Файлы cookie
          </p>
          <p id="cookie-text" className="mt-1.5 text-[0.8rem] leading-5 text-paper/75 md:mt-2 md:text-sm md:leading-6">
            Используем только необходимые cookie: запоминаем ваш выбор и защищаем форму заявки.
            Рекламных и аналитических cookie сейчас нет. Подробнее — в{" "}
            <Link href="/cookies" className="underline underline-offset-4">
              политике cookie
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            className="btn btn-ghost min-h-10 w-full border-paper/25 px-3 py-2 text-[0.8rem] text-paper sm:w-auto"
            onClick={() => writeConsent("necessary")}
          >
            Отклонить необязательные
          </button>
          <button
            type="button"
            className="btn btn-light min-h-10 w-full px-3 py-2 text-[0.8rem] sm:w-auto"
            onClick={() => writeConsent("all")}
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
