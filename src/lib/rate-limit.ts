type Bucket = {
  count: number;
  resetAt: number;
};

const windows = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function prune(now: number) {
  for (const [key, bucket] of windows) {
    if (bucket.resetAt <= now) {
      windows.delete(key);
    }
  }
}

export function checkRateLimit(key: string) {
  const now = Date.now();
  prune(now);

  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, retryAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - current.count };
}

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "unknown";
}
