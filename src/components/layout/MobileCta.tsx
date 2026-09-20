"use client";

import { useEffect, useState } from "react";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const apply = document.getElementById("apply");
    if (!hero) return;

    const update = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const applyTop = apply?.getBoundingClientRect().top ?? 9999;
      const applyVisible = applyTop < window.innerHeight * 0.72;
      setVisible(heroBottom < 80 && !applyVisible);
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 py-2.5 backdrop-blur-md md:hidden">
      <a href="#apply" className="btn btn-primary w-full">
        Получить консультацию
      </a>
    </div>
  );
}
