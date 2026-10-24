import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, Building2, CalendarCheck, Clock, Languages, ShieldCheck } from "lucide-react";
import { Container, DoctorCard, PageHero } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { deptBySlug, doctors } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shifokorlar/$id")({
  loader: ({ params }) => {
    const d = doctors.find((x) => x.id === params.id);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData: d }) => (d ? seo(`${d.name.uz} — ${d.spec.uz}`, `${d.name.uz}, ${d.spec.uz}${d.exp ? `, ${d.exp} yillik tajriba` : ""}. MirziyoMedline klinikasida onlayn qabulga yoziling.`, d.photo) : seo("Shifokor", "MirziyoMedline shifokori")),
  component: Page,
});

function Page() {
  const d = Route.useLoaderData();
  const t = useT();
  const dept = deptBySlug(d.dept);
  const same = doctors.filter((x) => x.id !== d.id && (x.specSlug === d.specSlug || (d.dept && x.dept === d.dept))).slice(0, 4);
  const facts = [
    [Award, l("Tajriba", "Стаж"), d.exp ? l(`${d.exp} yil`, `${d.exp} лет`) : l("Tajribali mutaxassis", "Опытный специалист")],
    [Building2, l("Bo'lim", "Отделение"), dept ? dept.title : l("Ko'p tarmoqli klinika", "Многопрофильная клиника")],
    [Languages, l("Qabul tillari", "Языки приёма"), l("O'zbek, rus", "Узбекский, русский")],
    [Clock, l("Qabul vaqti", "Время приёма"), l("Du–Ju 08:30–17:00, Sh 09:00–14:00", "Пн–Пт 08:30–17:00, Сб 09:00–14:00")],
  ] as const;
  return (
    <>
      <PageHero title={d.name} crumbs={[[l("Shifokorlar", "Врачи"), "/shifokorlar"]]} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr_380px]">
          <div className="relative h-fit self-start overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:sticky lg:top-28">
            <img src={d.photo} alt={t(d.name)} className="aspect-[262/300] w-full object-cover object-top" />
            <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur"><span className="text-primary">Mirziyo</span>Medline</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
              <Link to="/shifokorlar" search={{ spec: d.specSlug }} className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-primary">{t(d.spec)}</Link>
              {d.head && <span className="ml-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">{t(l("Bo'lim mudiri", "Заведующий отделением"))}</span>}
              <h2 className="mt-4 text-2xl font-semibold">{t(d.name)}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t(l(`${d.name.uz} — MirziyoMedline University Hospital klinikasining ${d.spec.uz.toLowerCase()} mutaxassisi. Shifokor xalqaro klinik protokollar asosida ishlaydi, har bir bemorga individual davolash rejasini tuzadi va zarur bo'lsa, klinikaning boshqa mutaxassislari bilan konsilium o'tkazadi.`,
                  `${d.name.ru} — специалист (${d.spec.ru.toLowerCase()}) MirziyoMedline University Hospital. Врач работает по международным клиническим протоколам, составляет индивидуальный план лечения для каждого пациента и при необходимости проводит консилиум с другими специалистами клиники.`))}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {facts.map(([I, k, v]) => (
                  <div key={k.uz} className="flex gap-3 rounded-2xl bg-secondary p-4">
                    <I className="h-5 w-5 shrink-0 text-primary" />
                    <div><div className="text-xs text-muted-foreground">{t(k)}</div><div className="text-sm font-medium">{t(v)}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
              <h3 className="text-lg font-semibold">{t(l("Qabulda nima bo'ladi", "Что будет на приёме"))}</h3>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                {[l("Shikoyatlar va kasallik tarixini batafsil o'rganish", "Подробный сбор жалоб и анамнеза"), l("Ko'rik va oldingi tekshiruv natijalarini baholash", "Осмотр и оценка прошлых обследований"), l("Zarur tahlil va diagnostikaga yo'llanma — shu kunning o'zida", "Направление на анализы и диагностику — в тот же день"), l("Tushunarli davolash rejasi va tavsiyalar", "Понятный план лечения и рекомендации")].map((x) => (
                  <li key={x.uz} className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{t(x)}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-fit rounded-2xl border border-border bg-card shadow-soft p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-lg font-semibold"><CalendarCheck className="h-5 w-5 text-primary" />{t(l("Qabulga yozilish", "Записаться на приём"))}</div>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">{t(l("Operator 15 daqiqa ichida qo'ng'iroq qilib, vaqtni tasdiqlaydi.", "Оператор перезвонит в течение 15 минут и подтвердит время."))}</p>
            <LeadForm compact type="doctor" hidden={{ Shifokor: `${d.name.uz} (${d.spec.uz})` }} fields={[{ key: "Qulay vaqt", label: l("Qulay sana", "Удобная дата"), kind: "date" }, { key: "Izoh", label: l("Izoh (ixtiyoriy)", "Комментарий"), kind: "textarea" }]} />
          </div>
        </div>
        {same.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-semibold">{t(l("Shu yo'nalishdagi boshqa shifokorlar", "Другие врачи этого направления"))}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{same.map((x) => <DoctorCard key={x.id} d={x} />)}</div>
          </section>
        )}
      </Container>
    </>
  );
}
