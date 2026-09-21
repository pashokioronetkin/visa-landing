import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex min-w-0 items-center gap-2 sm:gap-3",
        inverted ? "text-paper" : "text-ink",
        className,
      )}
      aria-label={`${siteConfig.name} — на главную`}
    >
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-[2px] border",
          inverted ? "border-paper/25" : "border-ink/15",
        )}
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="6.2"
            stroke="currentColor"
            strokeWidth="1"
            className={inverted ? "opacity-70" : "opacity-50"}
          />
          <path
            d="M8 1.6v12.8M3.1 4.6c2.1 1.3 7.7 1.3 9.8 0M3.1 11.4c2.1-1.3 7.7-1.3 9.8 0"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="8" cy="8" r="1.15" fill="currentColor" className="text-bronze" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] tracking-[0.14em] sm:text-[1.2rem]">
          {siteConfig.name.toUpperCase()}
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.62rem] tracking-[0.18em] uppercase sm:block",
            inverted ? "text-paper/55" : "text-mist",
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </a>
  );
}
