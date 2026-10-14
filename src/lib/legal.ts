export const CONSENT_VERSION = "2026-10-14";
export const COOKIE_CONSENT_NAME = "meridian_cookie_consent";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export type CookieConsentValue = "all" | "necessary";

export function parseCookieConsent(value: string | undefined | null): CookieConsentValue | null {
  if (!value) {
    return null;
  }

  try {
    value = decodeURIComponent(value);
  } catch {
    return null;
  }

  if (value === "all" || value === "necessary") {
    return value;
  }

  return null;
}
