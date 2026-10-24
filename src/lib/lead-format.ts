import { z } from "zod";

export const leadTypes = ["booking", "doctor", "checkup", "career", "insurance", "results", "tourism", "robot", "callback"] as const;
export type LeadType = (typeof leadTypes)[number];

export const leadSchema = z.object({
  type: z.enum(leadTypes),
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 9, "phone"),
  lang: z.enum(["uz", "ru"]).default("uz"),
  page: z.string().trim().max(200).optional(),
  /** Extra labelled fields (doctor, programme, comment …). */
  fields: z.record(z.string().max(60), z.string().trim().max(800)).default({}),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});
export type Lead = z.infer<typeof leadSchema>;

const titles: Record<LeadType, string> = {
  booking: "🩺 Yangi ariza — qabulga yozilish",
  doctor: "👨‍⚕️ Shifokorga yozilish",
  checkup: "📋 Check-up buyurtmasi",
  career: "💼 Ishga ariza (karyera)",
  insurance: "🛡 Korporativ sug'urta so'rovi",
  results: "🧪 Tahlil natijalari so'rovi",
  tourism: "✈️ Tibbiy turizm so'rovi",
  robot: "🤖 Robot-jarrohlik konsultatsiyasi",
  callback: "📞 Qayta qo'ng'iroq so'rovi",
};

export const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

/** Builds the Telegram HTML message sent to the clinic's chat. */
export function formatLead(d: Lead, now = new Date()): string {
  const lines = [`<b>${titles[d.type]}</b>`, "", `👤 <b>Ism:</b> ${esc(d.name)}`, `📞 <b>Telefon:</b> ${esc(d.phone)}`];
  for (const [k, v] of Object.entries(d.fields)) if (v) lines.push(`• <b>${esc(k)}:</b> ${esc(v)}`);
  lines.push("", `🌐 Til: ${d.lang.toUpperCase()}${d.page ? ` · Sahifa: ${esc(d.page)}` : ""}`);
  lines.push(`🕒 ${now.toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`);
  return lines.join("\n");
}

/** TELEGRAM_CHAT_ID may hold several chats separated by commas. */
export function parseChatIds(raw: string | undefined): string[] {
  return (raw ?? "").split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
}
