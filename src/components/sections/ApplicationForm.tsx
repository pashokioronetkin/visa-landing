"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { copy, destinationOptions, visaTypes } from "@/content/site";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";

type FormState = {
  name: string;
  phone: string;
  email: string;
  destination: string;
  visaType: string;
  comment: string;
  website: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  visaType: "",
  comment: "",
  website: "",
  consent: false,
};

export function ApplicationForm() {
  const startedAt = useRef(0);
  const [values, setValues] = useState<FormState>(initial);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "website") {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const parsed = applicationSchema.safeParse({
      ...values,
      comment: values.comment || undefined,
      consent: values.consent || undefined,
    });

    if (!parsed.success) {
      const next: Partial<Record<keyof ApplicationInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key as keyof ApplicationInput]) {
          next[key as keyof ApplicationInput] = issue.message;
        }
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
      setStatus("success");
      setValues(initial);
      return;
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          website: values.website,
          startedAt: startedAt.current,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
        return;
      }

      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
      setMessage("Сеть недоступна. Проверьте соединение и отправьте форму снова.");
    }
  }

  if (status === "success") {
    return (
      <section id="apply" className="section-pad bg-ink-soft text-paper">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-bronze-light">06 / Заявка</p>
            <h2 className="display-title mt-4 text-[clamp(2.1rem,4vw,3.4rem)]">
              {copy.formSuccessTitle}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-paper/62">
              {copy.formSuccessText}
            </p>
            <button
              type="button"
              className="btn btn-light mt-8"
              onClick={() => setStatus("idle")}
            >
              Отправить ещё одну заявку
            </button>
          </div>
          <div className="border border-white/10 bg-ink-soft p-8 lg:col-span-7 lg:p-12">
            <p className="font-display text-3xl tracking-tight">Заявка принята</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-paper/55">
              Мы напишем или позвоним в рабочее время. Если вопрос срочный — используйте
              Telegram или WhatsApp в подвале сайта.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-pad bg-ink-soft text-paper">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-bronze-light">06 / Заявка</p>
          <h2 className="display-title mt-4 text-[clamp(2.1rem,4vw,3.4rem)]">
            {copy.formTitle}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-paper/62">{copy.formLead}</p>
          <p className="mt-10 max-w-sm text-sm leading-7 text-paper/42">
            Консультация ни к чему не обязывает. Мы не обещаем одобрение визы — решение
            принимает консульство.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-paper p-5 text-ink sm:p-6 md:p-10 lg:col-span-7"
          noValidate
        >
          <div className="grid gap-7 md:grid-cols-2">
            <Field
              label="Имя"
              error={errors.name}
              value={values.name}
              onChange={(value) => update("name", value)}
              autoComplete="name"
            />
            <Field
              label="Телефон"
              error={errors.phone}
              value={values.phone}
              onChange={(value) => update("phone", value)}
              autoComplete="tel"
              type="tel"
            />
            <Field
              label="Email"
              error={errors.email}
              value={values.email}
              onChange={(value) => update("email", value)}
              autoComplete="email"
              type="email"
              className="md:col-span-2"
            />
            <SelectField
              label="Куда хотите поехать?"
              error={errors.destination}
              value={values.destination}
              onChange={(value) => update("destination", value)}
              options={destinationOptions}
            />
            <SelectField
              label="Тип визы"
              error={errors.visaType}
              value={values.visaType}
              onChange={(value) => update("visaType", value)}
              options={visaTypes}
            />
            <label className="block md:col-span-2">
              <span className="text-[0.72rem] tracking-[0.16em] text-stone uppercase">
                Комментарий
              </span>
              <textarea
                className="field mt-1"
                rows={4}
                value={values.comment}
                onChange={(event) => update("comment", event.target.value)}
                placeholder="Даты поездки, предыдущие визы или отказ — если есть"
              />
              {errors.comment ? (
                <span className="mt-2 block text-sm text-bronze">{errors.comment}</span>
              ) : null}
            </label>
          </div>

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label>
              Сайт
              <input
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </label>
          </div>

          {status === "error" ? (
            <p className="mt-6 text-sm text-bronze" role="alert">
              {message}
            </p>
          ) : null}

          <label className="mt-8 flex items-start gap-3 text-sm leading-6 text-mist">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-bronze"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
            />
            <span>
              Даю{" "}
              <Link href="/consent" className="text-ink underline underline-offset-4">
                согласие на обработку персональных данных
              </Link>{" "}
              и принимаю{" "}
              <Link href="/privacy" className="text-ink underline underline-offset-4">
                политику обработки ПДн
              </Link>
              . Чекбокс не отмечен заранее.
            </span>
          </label>
          {errors.consent ? (
            <p className="mt-2 text-sm text-bronze">{errors.consent}</p>
          ) : null}

          <button type="submit" className="btn btn-primary mt-6 w-full md:w-auto" disabled={status === "submitting"}>
            {status === "submitting" ? "Отправляем…" : "Получить консультацию"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="text-[0.72rem] tracking-[0.16em] text-stone uppercase">{label}</span>
      <input
        type={type}
        className="field mt-1"
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className="mt-2 block text-sm text-bronze">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  error,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label>
      <span className="text-[0.72rem] tracking-[0.16em] text-stone uppercase">{label}</span>
      <select className="field mt-1" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Выберите</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="mt-2 block text-sm text-bronze">{error}</span> : null}
    </label>
  );
}
