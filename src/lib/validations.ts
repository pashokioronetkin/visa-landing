import { z } from "zod";
import { destinationOptions, visaTypes } from "@/content/site";

const destinationValues = destinationOptions.map((item) => item.value) as [
  string,
  ...string[],
];
const visaValues = visaTypes.map((item) => item.value) as [string, ...string[]];

const phonePattern = /^[+\d][\d\s()-]{5,22}$/;

export const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(80, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите телефон")
    .max(24, "Телефон слишком длинный")
    .regex(phonePattern, "Проверьте номер телефона"),
  email: z
    .string()
    .trim()
    .max(120, "Email слишком длинный")
    .email("Проверьте email"),
  destination: z.enum(destinationValues, {
    message: "Выберите направление",
  }),
  visaType: z.enum(visaValues, {
    message: "Выберите тип визы",
  }),
  comment: z.string().trim().max(1000, "Комментарий слишком длинный").optional(),
  consent: z.literal(true, {
    message: "Нужно согласие на обработку персональных данных",
  }),
});

export const applicationRequestSchema = applicationSchema.extend({
  website: z.string().max(80).optional().or(z.literal("")),
  startedAt: z.number().int().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
