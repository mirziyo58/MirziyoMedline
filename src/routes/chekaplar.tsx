import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, ClipboardList, FlaskConical, MapPin, ScanLine, Stethoscope } from "lucide-react";
import { BookCta, Container, PageHero } from "@/components/site/Layout";
import { useBooking } from "@/components/site/Booking";
import { LeadForm } from "@/components/site/LeadForm";
import { checkups } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/chekaplar")({
  head: () => seo("Check-up dasturlari", "MirziyoMedline check-up dasturlari: erkaklar, ayollar, bolalar salomatligi, kardio, gastro, endokrinologiya va diabet. Bir kunda kompleks tekshiruv."),
  component: Page,
});

function Page() {
  const t = useT();
  const book = useBooking();
  const opts = checkups.map((c) => ({ value: c.title.uz, label: c.title }));
  return (
    <>
      <PageHero title={l("Check-up bir kunda", "Check-up за один день")} subtitle={l("Mutaxassislar maslahatlari, laboratoriya tahlillari va diagnostika — bitta dasturda, bitta klinikada.", "Консультации специалистов, анализы и диагностика — в одной программе, в одной клинике.")} />
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[CalendarClock, l("1 kunda", "За 1 день"), l("Ko'pchilik dasturlar uchun", "Для большинства программ")], [ClipboardList, l("Qulay vaqtda", "В удобное время"), l("Mos vaqtni tanlaymiz", "Подберём удобное время")], [MapPin, l("Bir joyda", "В одном месте"), l("Barcha tekshiruvlar klinikada", "Все обследования в клинике")], [Stethoscope, l("Tayyor dasturlar", "Готовые программы"), l("Shifokor xulosasi bilan", "С заключением врача")]].map(([I, a, b], i) => {
            const Icon = I as typeof Stethoscope;
            return (
              <div key={i} className="flex gap-4 rounded-2xl border border-border bg-card shadow-soft p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent"><Icon className="h-6 w-6 text-primary" /></span>
                <div><div className="font-semibold">{t(a as { uz: string; ru: string })}</div><div className="text-sm text-muted-foreground">{t(b as { uz: string; ru: string })}</div></div>
              </div>
            );
          })}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(l("Mos Check-up dasturini tanlang", "Выберите подходящую программу Check-up"))}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {checkups.map((c) => (
            <div key={c.slug} id={c.slug} className="flex scroll-mt-28 flex-col rounded-2xl border border-border bg-card shadow-soft p-6 md:p-7">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{t(l("1 kun", "1 день"))}</span>
              <h3 className="mt-4 text-xl font-semibold">{t(c.title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(c.desc)}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-2xl bg-secondary p-3"><Stethoscope className="mx-auto h-5 w-5 text-primary" /><div className="mt-1 text-lg font-bold">{c.consult}</div>{t(l("konsultatsiya", "консультаций"))}</div>
                <div className="rounded-2xl bg-secondary p-3"><FlaskConical className="mx-auto h-5 w-5 text-primary" /><div className="mt-1 text-lg font-bold">{c.lab}</div>{t(l("tahlil", "анализов"))}</div>
                <div className="rounded-2xl bg-secondary p-3"><ScanLine className="mx-auto h-5 w-5 text-primary" /><div className="mt-1 text-lg font-bold">{c.instr}</div>{t(l("diagnostika", "диагностик"))}</div>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {c.items.map((i) => <li key={i.uz} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t(i)}</li>)}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <div><div className="text-xs text-muted-foreground">{t(l("Narxi", "Цена"))}</div><div className="text-xl font-bold text-primary">{c.price ? `${c.price} UZS` : t(l("Narxni aniqlang", "Уточните цену"))}</div></div>
                <button onClick={() => book({ type: "checkup", title: c.title, hidden: { Dastur: c.title.uz }, fields: [{ key: "Qulay vaqt", label: l("Qulay sana", "Удобная дата"), kind: "date" }] })} className="rounded-lg bg-primary px-5 py-3 hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground">{t(l("Yozilish", "Записаться"))}</button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-14 grid gap-6 rounded-2xl border border-border bg-card shadow-soft p-6 md:p-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{t(l("Check-up uchun qulay vaqtni tanlang", "Выберите удобное время для Check-up"))}</h2>
            <p className="mt-3 text-muted-foreground">{t(l("Mutaxassislarimiz mos dasturni tanlashga yordam beradi, tayyorgarlik haqida tushuntiradi va tekshiruv vaqtini kelishadi.", "Наши специалисты помогут выбрать программу, расскажут о подготовке и согласуют время обследования."))}</p>
            <ul className="mt-6 space-y-3">
              {[l("Och qoringa keling (8–12 soat ovqatlanmaslik)", "Приходите натощак (8–12 часов без еды)"), l("Pasport va oldingi tekshiruv natijalarini oling", "Возьмите паспорт и прошлые результаты"), l("Natijalar va shifokor xulosasi shu kuni", "Результаты и заключение врача — в тот же день")].map((x) => (
                <li key={x.uz} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{t(x)}</li>
              ))}
            </ul>
          </div>
          <LeadForm type="checkup" fields={[{ key: "Dastur", label: l("Dastur", "Программа"), kind: "select", options: opts }, { key: "Qulay vaqt", label: l("Qulay sana", "Удобная дата"), kind: "date" }]} submit={l("Check-upga yozilish", "Записаться на Check-up")} />
        </section>
        <BookCta />
      </Container>
    </>
  );
}
