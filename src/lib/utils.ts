export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function assetPath(path: string) {
  const base = process.env.PAGES_BASE_PATH || "";
  return `${base}${path}`;
}
