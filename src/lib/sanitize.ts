export function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
}

export function sanitizeText(value: string, max = 1000) {
  return stripTags(value).replace(/\s+/g, " ").trim().slice(0, max);
}

export function sanitizeApplication(data: {
  name: string;
  phone: string;
  email: string;
  destination: string;
  visaType: string;
  comment?: string;
}) {
  return {
    name: sanitizeText(data.name, 80),
    phone: sanitizeText(data.phone, 24),
    email: sanitizeText(data.email, 120).toLowerCase(),
    destination: sanitizeText(data.destination, 80),
    visaType: sanitizeText(data.visaType, 80),
    comment: data.comment ? sanitizeText(data.comment, 1000) : "",
  };
}
