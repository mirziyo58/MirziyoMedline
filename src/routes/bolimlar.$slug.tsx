import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, ShieldCheck, Stethoscope } from "lucide-react";
import { BookCta, Container, DoctorCard, PageHero } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { bookingFields } from "@/components/site/Booking";
import { departments, doctors } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/bolimlar/$slug")({
  loader: ({ params }) => {
    const d = departments.find((x) => x.slug === params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData: d }) => (d ? seo(d.title.uz, `${d.title.uz} bo'limi — ${d.short.uz}. ${d.text.uz}`.slice(0, 160)) : seo("Bo'lim", "MirziyoMedline bo'limi")),
  component: Page,
});

function Page() {
  const d = Route.useLoaderData();
  const t = useT();
  const docs = doctors.filter((x) => x.dept === d.slug);
  return (
    <>
      <PageHero title={d.title} subtitle={d.short} crumbs={[[l("Bo'limlar", "Отделения"), "/bolimlar"]]} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">{t(d.text)}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t(l("Bo'limda diagnostika, konservativ va jarrohlik davolash hamda reabilitatsiya bir joyda amalga oshiriladi. Murakkab holatlar multidisiplinar konsiliumda muhokama qilinadi.", "В отделении диагностика, консервативное и хирургическое лечение и реабилитация проводятся в одном месте. Сложные случаи обсуждаются на мультидисциплинарном консилиуме."))}</p>
              <h2 className="mt-8 text-xl font-semibold">{t(l("Asosiy yo'nalishlar", "Основные направления"))}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.offers.map((o) => <div key={o.uz} className="flex items-center gap-2 rounded-2xl bg-secondary p-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{t(o)}</div>)}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[[Stethoscope, l("Tajribali jamoa", "Опытная команда")], [ShieldCheck, l("JCI standartlari", "Стандарты JCI")], [Clock, l("24/7 shoshilinch yordam", "Экстренная помощь 24/7")]].map(([I, x], i) => {
                const Icon = I as typeof Stethoscope;
                return <div key={i} className="rounded-2xl border border-border bg-card shadow-soft p-6"><Icon className="h-7 w-7 text-primary" /><div className="mt-4 font-semibold">{t(x as { uz: string; ru: string })}</div></div>;
              })}
            </div>
          </div>
          <div className="h-fit rounded-2xl border border-border bg-card shadow-soft p-6 lg:sticky lg:top-24">
            <div className="text-lg font-semibold">{t(l("Bo'limga yozilish", "Записаться в отделение"))}</div>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">{t(l("Ariza qoldiring — mutaxassis tanlashda yordam beramiz.", "Оставьте заявку — поможем выбрать специалиста."))}</p>
            <LeadForm compact type="booking" hidden={{ "Bo'lim": d.title.uz }} fields={bookingFields().slice(1)} />
          </div>
        </div>
        {docs.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-semibold">{t(l("Bo'lim shifokorlari", "Врачи отделения"))} <span className="text-muted-foreground">({docs.length})</span></h2>
              <Link to="/shifokorlar" search={{ dept: d.slug }} className="text-primary hover:underline">{t(l("Barchasi", "Все"))}</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{docs.slice(0, 10).map((x) => <DoctorCard key={x.id} d={x} />)}</div>
          </section>
        )}
        <BookCta />
      </Container>
    </>
  );
}
