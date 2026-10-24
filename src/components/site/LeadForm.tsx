import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useLocation } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { sendLead } from "@/lib/leads.functions";
import type { LeadType } from "@/lib/lead-format";
import { l, useLang, useT, type L } from "@/lib/i18n";
import { PHONE } from "@/lib/data";

export type FormField = {
  /** Label shown in the Telegram message (Uzbek). */
  key: string;
  label: L;
  kind?: "text" | "textarea" | "select" | "date";
  options?: { value: string; label: L }[];
  required?: boolean;
  defaultValue?: string | undefined;
  placeholder?: L | undefined;
};

const input = "w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-card";

export function LeadForm({ type, fields = [], hidden = {}, submit, onDone, compact }: {
  type: LeadType;
  fields?: FormField[];
  /** Extra values always sent along (e.g. selected doctor). */
  hidden?: Record<string, string> | undefined;
  submit?: L | undefined;
  onDone?: (() => void) | undefined;
  compact?: boolean | undefined;
}) {
  const send = useServerFn(sendLead);
  const { lang } = useLang();
  const t = useT();
  const loc = useLocation();
  const [st, setSt] = useState<"idle" | "busy" | "ok" | "err">("idle");

  if (st === "ok")
    return (
      <div className="flex flex-col items-center rounded-2xl bg-accent p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <p className="mt-4 text-lg font-semibold">{t(l("Rahmat! Arizangiz qabul qilindi", "Спасибо! Заявка принята"))}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t(l("Operatorimiz tez orada siz bilan bog'lanadi.", "Наш оператор скоро свяжется с вами."))}</p>
        <button type="button" onClick={() => setSt("idle")} className="mt-5 text-sm text-primary underline-offset-4 hover:underline">
          {t(l("Yana ariza yuborish", "Отправить ещё одну заявку"))}
        </button>
      </div>
    );

  return (
    <form
      className={compact ? "space-y-3" : "space-y-4"}
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const extra: Record<string, string> = { ...hidden };
        for (const fl of fields) {
          const v = String(f.get(fl.key) ?? "").trim();
          if (v) extra[fl.key] = v;
        }
        setSt("busy");
        try {
          await send({
            data: { type, name: String(f.get("name") ?? ""), phone: String(f.get("phone") ?? ""), lang, page: loc.pathname, fields: extra, website: String(f.get("website") ?? "") },
          });
          setSt("ok");
          if (onDone) setTimeout(onDone, 2500);
        } catch {
          setSt("err");
        }
      }}
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t(l("Ism familiya", "Имя и фамилия"))} *</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={t(l("Masalan, Aziz Karimov", "Например, Азиз Каримов"))} className={input} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t(l("Telefon raqam", "Номер телефона"))} *</span>
          <input name="phone" type="tel" required defaultValue="+998 " autoComplete="tel" pattern=".*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*" title={t(l("Telefon raqamni to'liq kiriting", "Введите полный номер телефона"))} className={input} />
        </label>
      </div>
      {fields.map((fl) => (
        <label key={fl.key} className="block">
          <span className="mb-1.5 block text-sm font-medium">{t(fl.label)}{fl.required ? " *" : ""}</span>
          {fl.kind === "select" ? (
            <select name={fl.key} required={fl.required} defaultValue={fl.defaultValue ?? ""} className={input}>
              <option value="">{t(l("Tanlang", "Выберите"))}</option>
              {fl.options?.map((o) => <option key={o.value} value={o.value}>{t(o.label)}</option>)}
            </select>
          ) : fl.kind === "textarea" ? (
            <textarea name={fl.key} required={fl.required} maxLength={800} rows={3} defaultValue={fl.defaultValue} placeholder={fl.placeholder ? t(fl.placeholder) : undefined} className={input} />
          ) : (
            <input name={fl.key} type={fl.kind === "date" ? "date" : "text"} required={fl.required} maxLength={200} defaultValue={fl.defaultValue} placeholder={fl.placeholder ? t(fl.placeholder) : undefined} className={input} />
          )}
        </label>
      ))}
      {st === "err" && (
        <p className="rounded-xl bg-accent p-3 text-sm text-destructive">
          {t(l("Arizani yuborib bo'lmadi. Iltimos, qayta urinib ko'ring yoki qo'ng'iroq qiling:", "Не удалось отправить заявку. Попробуйте ещё раз или позвоните:"))} {PHONE}
        </p>
      )}
      <button disabled={st === "busy"} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
        {st === "busy" && <Loader2 className="h-4 w-4 animate-spin" />}
        {st === "busy" ? t(l("Yuborilmoqda...", "Отправка...")) : t(submit ?? l("Ariza yuborish", "Отправить заявку"))}
      </button>
      <p className="text-center text-xs text-muted-foreground">{t(l("Tugmani bosish orqali shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz.", "Нажимая кнопку, вы соглашаетесь на обработку персональных данных."))}</p>
    </form>
  );
}
