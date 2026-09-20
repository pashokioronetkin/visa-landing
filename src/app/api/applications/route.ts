import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/lib/legal";
import { isSameOrigin } from "@/lib/origin";
import { getPrisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeApplication, sanitizeText } from "@/lib/sanitize";
import { applicationRequestSchema } from "@/lib/validations";

const MIN_FILL_MS = 2500;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Некорректный источник запроса." }, { status: 403 });
  }

  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(ip);

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Подождите несколько минут и попробуйте снова." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный формат запроса." }, { status: 400 });
  }

  const parsed = applicationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message || "Проверьте поля формы." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (parsed.data.startedAt && Date.now() - parsed.data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const data = sanitizeApplication(parsed.data);

  try {
    const prisma = getPrisma();
    await prisma.application.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        destination: data.destination,
        visaType: data.visaType,
        comment: data.comment,
        consentAccepted: true,
        consentVersion: CONSENT_VERSION,
        consentIp: ip === "unknown" ? "" : ip,
        userAgent: sanitizeText(request.headers.get("user-agent") || "", 240),
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Сервис временно недоступен. Попробуйте позже или напишите в Telegram." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
