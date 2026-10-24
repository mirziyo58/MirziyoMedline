import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { LeadForm, type FormField } from "./LeadForm";
import type { LeadType } from "@/lib/lead-format";
import { l, useT, type L } from "@/lib/i18n";
import { specialties } from "@/lib/data";

type Opts = { type?: LeadType; title?: L; subtitle?: L; hidden?: Record<string, string>; fields?: FormField[] };
const Ctx = createContext<(o?: Opts) => void>(() => {});

/** Standard booking fields: specialty + comment. */
export function bookingFields(defSpec?: string): FormField[] {
  return [
    { key: "Yo'nalish", label: l("Yo'nalish / mutaxassis", "Направление / специалист"), kind: "select", defaultValue: defSpec, options: specialties.map((s) => ({ value: s.name.uz, label: s.name })) },
    { key: "Qulay vaqt", label: l("Qulay sana", "Удобная дата"), kind: "date" },
    { key: "Izoh", label: l("Izoh (ixtiyoriy)", "Комментарий (необязательно)"), kind: "textarea", placeholder: l("Shikoyatlaringiz yoki savolingiz", "Ваши жалобы или вопрос") },
  ];
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<Opts | null>(null);
  const t = useT();
  const open = useCallback((o?: Opts) => setOpts(o ?? {}), []);
  useEffect(() => {
    if (!opts) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpts(null);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [opts]);
  return (
    <Ctx.Provider value={open}>
      {children}
      {opts && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-foreground/50 p-4 backdrop-blur-sm" onClick={() => setOpts(null)}>
          <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="relative my-8 w-full max-w-lg rounded-2xl border border-border bg-card shadow-soft p-6 shadow-2xl sm:p-8">
            <button aria-label="Yopish" onClick={() => setOpts(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-accent">
              <X className="h-4 w-4" />
            </button>
            <h3 className="pr-10 text-2xl font-semibold">{t(opts.title ?? l("Qabulga yozilish", "Записаться на приём"))}</h3>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">{t(opts.subtitle ?? l("Ma'lumotlaringizni qoldiring — 15 daqiqa ichida bog'lanamiz.", "Оставьте данные — перезвоним в течение 15 минут."))}</p>
            <LeadForm compact type={opts.type ?? "booking"} hidden={opts.hidden} fields={opts.fields ?? bookingFields()} onDone={() => setOpts(null)} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export const useBooking = () => useContext(Ctx);
