"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.84rem] font-medium text-ink transition-colors hover:text-bronze"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#apply" className="btn btn-primary hidden px-3 md:inline-flex xl:px-4">
            Получить консультацию
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-line bg-paper xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper xl:hidden">
        <nav className="container-page flex max-h-[calc(100svh-var(--header-h))] flex-col overflow-y-auto py-5" aria-label="Мобильная навигация">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-line py-3.5 font-display text-[1.7rem] tracking-tight sm:text-3xl"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#apply" className="btn btn-primary mt-6" onClick={() => setOpen(false)}>
            Получить консультацию
          </a>
        </nav>
      </div>
    </header>
  );
}
