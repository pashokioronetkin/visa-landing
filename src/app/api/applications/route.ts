import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Заявки на сайте не принимаем. Напишите в Telegram." },
    { status: 410 },
  );
}
