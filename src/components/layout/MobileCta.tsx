"use client";

import { useEffect, useState } from "react";
import { contacts } from "@/content/site";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const footer = document.querySelector("footer");
    if (!hero) return;

    const update = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const footerVisible = footerTop < window.innerHeight - 12;
      setVisible(heroBottom < 72 && !footerVisible);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={contacts.telegramBot}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary min-h-10 w-full px-3 py-2 text-[0.8rem]"
      >
        Получить консультацию
      </a>
    </div>
  );
}
